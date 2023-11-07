"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUserActivity } from "@/apiServices/admin/adminservices";
import { FormGroup, Input, Label, Placeholder, Spinner } from "reactstrap";
import { ActivityType } from "@/commontypes";
import Activity from "@/app/_components/UI/Activity/Activity";
import "../profile.scss";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import InfiniteScroll from "react-infinite-scroll-component";
import { setPagination, setactivitystateInfo } from "@/redux/dashboardstore/reducer/activity/activity";
import Avatar from "@/app/_components/UI/Avatar";

const ProfileActivity = () => {
    const { data } = useSession();
    const { pagination, activitystateInfo } = useAppSelector(
        (state) => state.activityreducer
    );
    const [isForme, setshowforme] = useState<boolean>(false);
    const {
        data: activitydata,
        isLoading,
        refetch,
        isError,
        error,
    } = useQuery({
        queryKey: [
            "activity",
            `?pageNumber=${pagination.offset}&pageSize=${pagination.limit}${isForme ? "isForme" : ""
            }`,
        ],
        enabled: data?.user?.id ? true : false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnmount: true,
        queryFn: () => getUserActivity(data?.user, isForme, pagination),
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (activitydata?.data.data.activities.list?.length) {
            dispatch(
                setactivitystateInfo({
                    comments: [
                        ...activitystateInfo,
                        ...activitydata?.data.data.activities.list,
                    ],
                })
            );
        }
    }, [activitydata?.data.data.activities.list]);

    const fetchMoreData = () => {
        if (pagination.offset < activitydata?.data.data.activities?.totalPages) {
            dispatch(setPagination({
                offset: pagination.offset + 1, limit: 10
            }))
        }
    };

    return (
        <div className="activitywrapper px-3 py-2">
            <div className="wrapper mt-3 justify-between">
                <div className="wrapper justify-start">
                    <div className="wrapper ">
                        <i className="fa-solid fa-list-ul"></i>
                        <p className="header-title mx-3">Activity</p>
                    </div>
                    <FormGroup check className="mb-0">
                        <Input
                            id="exampleCheck"
                            onChange={(e) => {
                                dispatch(setactivitystateInfo({
                                    isClear: true,
                                    comments: []
                                }))
                                setshowforme(!isForme);
                            }}
                            checked={isForme}
                            name="check"
                            style={{ border: "1px solid " }}
                            type="checkbox"
                        />
                        <Label check className="no-wrap" for="exampleCheck">
                            Show Activity related to me
                        </Label>
                    </FormGroup>
                </div>
                <div className="wrapper">
                    <i className="fa-solid fa-rotate-right fa-rotate-270 me-3" style={{ fontSize: "20px" }} onClick={() => refetch()}></i>
                </div>
            </div>
            <div id="scrollableDiv" className="w-100 mb-3 mt-4 scrollbar activitylayout">
                {
                    isLoading && !activitystateInfo.length ?
                        Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <Placeholder key={index} animation="wave" className="wrapper my-3 w-100">
                                    <Placeholder
                                        typeof="img"
                                        style={{
                                            height: "40px",
                                            width: "40px",
                                        }}
                                        className="rounded-pill position-relative"
                                    ></Placeholder>
                                    <div className='ms-3 w-100 wrapper flex-column align-start'>
                                        <Placeholder typeof="p" className="activitytextloader wrapper mb-2"></Placeholder>
                                        <Placeholder typeof="p" className="activity-dateloader "></Placeholder>
                                    </div>
                                </Placeholder>
                            ))
                        :
                        activitystateInfo.length > 0 ? (
                            <InfiniteScroll
                                loader={<Spinner size="sm"></Spinner>}
                                dataLength={activitydata?.data?.data?.activities?.count || 10}
                                next={fetchMoreData}
                                scrollableTarget="scrollableDiv"
                                hasMore={
                                    pagination.offset < activitydata?.data?.data?.activities?.totalPages
                                }
                            >
                                {activitystateInfo.map((elem: ActivityType) => (
                                    <Activity key={elem._id} activityInfo={elem} />
                                ))}
                            </InfiniteScroll>
                        ) : (
                            <div className="my-5 wrapper">
                                <p className="mb-0">No Actvities found</p>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default ProfileActivity;
