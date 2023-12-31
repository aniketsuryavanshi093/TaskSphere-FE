import React, { useState, useEffect, memo, useRef, useTransition } from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import "./ticketinfo.scss";
import { CurrentUserObjectType, TaskType } from "@/commontypes";
import CustomDropDownButton from "../../CustomDropDownButton/CustomDropDownButton";
import { label, priority, statusoptions } from "@/constants";
import useGetProjectUsers from "@/hooks/UseQuery/UsersQueryHook/useGetProjectUsers";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import HtmlConverter from "@/app/_components/HTMLparser/HtmlConverter";
import moment from "moment";
import Commentsection from "./CommentSection";
import { setCommentsInfo } from "@/redux/dashboardstore/reducer/comments/comments";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateTicketHook from "@/hooks/useUpdateTicketHook";
import enqueSnackBar from "@/lib/enqueSnackBar";

type pageprops = {
  isopen: boolean;
  ticketData: TaskType | null;
  onClosed: () => void;
  projectId?: string | undefined
};

const TicketInfo: React.FC<pageprops> = ({ isopen, onClosed, ticketData, projectId }) => {
  const { isUpdated } = useAppSelector(state => state.commentreducer)
  const [pending, startTransition] = useTransition();
  const { id } = useParams();
  const [isFull, setisFull] = useState(false);
  const queryClient = useQueryClient()
  const { handleUpdateTicket } = useUpdateTicketHook(id || projectId || ticketData?.projectId);
  const dispatch = useAppDispatch()
  const ticketInfoWrapperStyle: React.CSSProperties = {
    width: isFull ? "77%" : "37%",
    transition: "width ease 0.3s",
  };
  const [UsersList, setUsersList] = useState<
    [{ value: string; img?: string; label: string; name?: string }] | []
  >([]);
  const { data } = useSession();

  const { data: usersData } = useGetProjectUsers(data, id || projectId || ticketData?.projectId, true);
  useEffect(() => {
    if (usersData?.data?.data?.members?.length) {
      const { members, organizationId } = usersData?.data?.data;
      const temp: [
        { value: string; img?: string; label: string; name?: string }
      ] = members?.map((_user: CurrentUserObjectType) => ({
        value: _user._id,
        label: _user.userName,
        name: _user.userName,
        img: _user.profilePic || "/images/icons/userdummy.avif",
      }));
      temp.push({
        value: organizationId?._id,
        img: organizationId?.profilePic || "/images/icons/userdummy.avif",
        label: organizationId?.userName,
        name: organizationId?.userName,
      });
      setUsersList(temp);
    }
  }, [usersData]);
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ["comments"] })
      dispatch(setCommentsInfo({ comments: [], isClear: true }))
    }
  }, [])
  const getUsernamefromlist = (val: string) => {
    return UsersList?.find(
      ({ value: tempval, img, name }) => (
        val === tempval
      ))?.name
  }
  const handleChange = (type: string, value: string) => {
    if (data?.user?.ticketAdministrator || data?.user.id === ticketData?.assignedTo || data?.user.role === "organization") {
      startTransition(() => handleUpdateTicket({
        status: type === "status" ? value : ticketData?.status,
        updatedBy: data?.user.id,
        currentstatus: ticketData?.status,
        assignedTo: type === "assignedTo" ? value : ticketData?.assignedTo,
        projectId: ticketData?.projectId,
        ticketId: ticketData?._id,
        priority: type === 'priority' ? value : ticketData?.priority,
        ticketDatachanged: `${type === "assignedTo" ? "assigned" : type} ${type === "assignedTo" ? "ticket" : ticketData[type]} to ${type === "assignedTo" ? getUsernamefromlist(value) : value}`
      }))
    }
  }
  console.log(UsersList, ticketData, ticketData?.createdByOrg);

  return (
    <Offcanvas
      direction="end"
      style={ticketInfoWrapperStyle}
      isOpen={isopen}
      onClosed={onClosed}
      fade={false}
    >
      <OffcanvasHeader toggle={onClosed}>
        <div className="wrapper w-100 justify-between">
          <p className="mb-0">{ticketData?.ticketTag}({ticketData?.project.title})</p>
          {isFull ? (
            <i
              onClick={() => setisFull(!isFull)}
              className=" cp fa-solid fa-down-left-and-up-right-to-center"
            ></i>
          ) : (
            <i
              onClick={() => setisFull(!isFull)}
              className=" cp fa-solid fa-up-right-and-down-left-from-center"
            ></i>
          )}
        </div>
      </OffcanvasHeader>
      <OffcanvasBody>
        <div
          className={`wrapper  ${isFull ? "flex-row-reverse" : "flex-column"
            }  align-start w-100 `}
        >
          <div className={`ticketinfodiv ${isFull && "ps-4"} w-100 `}>
            <p className="tickettitle">{ticketData?.title}</p>
            <div className="ticketinfostack w-100">
              <div className="wrapper justify-start my-3 w-100">
                <div className="labelticketinfo">Status</div>
                <div className="w-100 ticketinfoproperty">
                  <CustomDropDownButton
                    classname="statusselect"
                    disabled={!(data?.user?.ticketAdministrator || data?.user.id === ticketData?.assignedTo || data?.user.role === "organization")}
                    selectedvalue={ticketData?.status}
                    defaultValue={ticketData?.status}
                    onDropdownSelect={(value) => handleChange("status", value)}
                    options={statusoptions}
                  />
                </div>
              </div>
              <div className="wrapper my-3 justify-start w-100">
                <div className="labelticketinfo">Assignee</div>
                {
                  !!UsersList?.length && (
                    <div className="w-100 ticketinfoproperty">
                      <CustomDropDownButton
                        classname="statusselect"
                        disabled={!(data?.user?.ticketAdministrator || data?.user.id === ticketData?.assignedTo || data?.user.role === "organization")}
                        selectedvalue={ticketData?.assignedTo}
                        defaultValue={ticketData?.assignedTo}
                        onDropdownSelect={(value) => handleChange("assignedTo", value)}
                        options={UsersList}
                        onselectIcon
                      />
                    </div>
                  )
                }
              </div>
              <div className="wrapper justify-start my-3 w-100">
                <div className="labelticketinfo">Priority</div>
                <div className="w-100 ticketinfoproperty">
                  <CustomDropDownButton
                    defaultValue={ticketData?.priority}
                    classname="statusselect"
                    disabled={!(data?.user?.ticketAdministrator || data?.user.id === ticketData?.assignedTo || data?.user.role === "organization")}
                    onselectIcon
                    onDropdownSelect={(value) => {
                      handleChange('priority', value);
                    }}
                    options={priority}
                  />
                </div>
              </div>
              <div className="wrapper justif~y-start my-3 w-100">
                <div className="labelticketinfo">Label</div>
                <div className="w-100 ticketinfoproperty">
                  <CustomDropDownButton
                    defaultValue={ticketData?.label}
                    classname="statusselect"
                    onDropdownSelect={(value) => console.log(value)}
                    disabled={!(data?.user?.ticketAdministrator || data?.user.id === ticketData?.assignedTo || data?.user.role === "organization")}
                    options={[...label]}
                  />
                </div>
              </div>
              <div className="wrapper justify-start my-3 w-100">
                <div className="labelticketinfo">Reporter</div>
                <div className="w-100 ticketinfoproperty">
                  <div className="wrapper justify-start">
                    {UsersList?.map(
                      ({ value, img, name }) =>
                        value ===
                        (ticketData?.createdBy || ticketData?.createdByOrg) && (
                          <>
                            <Image width={30} height={30} src={img} alt={""} />
                            <p className="mb-0 ms-3"> {name} </p>
                          </>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper flex-column mt-2 p justify-start align-start">
              <p className="text_muted datetext mb-1">
                Created{" "}
                {moment(
                  new Date(ticketData?.createdAt).toLocaleString()
                ).fromNow()}
              </p>
              <p className="text_muted datetext mb-0">
                Updated{" "}
                {moment(
                  new Date(ticketData?.updatedAt).toLocaleString()
                ).fromNow()}
              </p>
            </div>
          </div>
          <div
            style={isFull ? {} : { borderTop: "2px solid var(--border-color)" }}
            className={`ticketdescomments ${isFull && "commentdescscrollbar"
              }  mt-2`}
          >
            <div className="w-100 mt-2">
              <p className="descriptionsub">Description</p>
            </div>
            <div className="w-100">
              <HtmlConverter htmlString={ticketData?.description} />
            </div>
            <div className="w-100 mt-2">
              <p className="descriptionsub">Comments</p>
            </div>
            <div className="w-100">
              <Commentsection ticketId={ticketData?._id} />
            </div>
          </div>
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default memo(TicketInfo);
