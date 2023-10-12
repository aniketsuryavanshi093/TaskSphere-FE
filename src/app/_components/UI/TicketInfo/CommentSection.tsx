import React, { useEffect, useState, useTransition, } from "react";
import { createCommentaction, replytoCommentaction } from "@/actions/authactions/ticketadminactions";
import { comment } from "@/commontypes";
import useGetComments from "@/hooks/UseQuery/ticketmanagementhooks/useGetComments";
import enqueSnackBar from "@/lib/enqueSnackBar";
import { useAppDispatch, useAppSelector } from "@/redux/dashboardstore/hook";
import { useQueryClient } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Form, Formik, FormikState } from "formik";
import moment from "moment";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { addComment, addCommentreply, setCommentsInfo, setPagination } from "@/redux/dashboardstore/reducer/comments/comments";

const Commentsection: React.FC<{ ticketId: string }> = ({ ticketId }) => {
    const { pagination, CommentsInfo } = useAppSelector(state => state.commentreducer)
    const { data: commentsData, isLoading } = useGetComments({
        id: ticketId, pagination
    })

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (commentsData?.data?.data?.comments.length) {
            dispatch(setCommentsInfo({ comments: [...CommentsInfo, ...commentsData?.data?.data?.comments] }))
        }
    }, [commentsData?.data?.data?.comments, isLoading])

    const fetchMoreData = () => {
        if (pagination.pageNumber < commentsData?.data?.data?.totalPages) {
            dispatch(setPagination({
                pageNumber: pagination.pageNumber + 1, pageSize: 10
            }))
        }
    };


    const { data } = useSession()
    return (
        <div>
            <FormInput type="comment" ticketId={ticketId} isCommentEmpty={!!commentsData?.data?.data?.comments?.length} />
            <div id="scrollableDiv" className="commentslayout scrollableDiv scrollbar" >
                {
                    !!CommentsInfo?.length ? (
                        <InfiniteScroll
                            dataLength={commentsData?.data?.data?.totalCommentCount || 10}
                            next={fetchMoreData}
                            scrollableTarget="scrollableDiv"
                            hasMore={pagination.pageNumber <= commentsData?.data?.data?.totalPages}
                        >
                            {CommentsInfo?.map((comment: comment) => (
                                <Comment user={data?.user} key={comment._id} comment={comment} ticketId={ticketId} />
                            ))}
                        </InfiniteScroll>
                    ) : (
                        <p className="text_muted text-center my-5 ">No comments here be the first one to comment!</p>
                    )
                }

            </div>
        </div>
    );
};

export default Commentsection;

const Comment: React.FC<{ comment: comment, key: string, ticketId: string, isreply?: boolean, user: any }> = ({
    comment,
    user,
    key,
    isreply,
    ticketId
}) => {
    const [ReplyMode, setReplyMode] = useState<boolean>(false)
    const [showReplyMode, setshowReplyMode] = useState<boolean>(false)

    return (
        <>
            <div
                key={key}
                className="wrapper justify-between align-start  commentwrapper"
            >
                <div className="wrapper justify-start align-start">
                    <Image
                        className="userimage mt-1"
                        width={40}
                        height={40}
                        src={
                            (comment.author || comment.orgMember)?.profilePic ||
                            "/images/icons/userdummy.avif"
                        }
                        alt="commentuser"
                    />
                    <div className="wrapper flex-column align-start ms-3 ">
                        <div className="wrapper justify-start">
                            <p className="mb-0 commnetname">
                                {comment.author._id === user.id ? "You" : (comment.author || comment.orgMember).name}
                            </p>
                            <p className="text_muted mb-0 commenttimestamp">
                                {moment(new Date(comment?.createdAt).toLocaleString()).fromNow()}
                            </p>
                        </div>
                        <p className="mb-1 commentpara">{comment.text}</p>
                        <div>
                            {
                                !isreply && (
                                    <button className="replybtn ">
                                        <div className="wrapper" onClick={() => setReplyMode(!ReplyMode)}>
                                            <i className="fa-solid fa-reply me-2"></i>
                                            <p className="mb-0" >Reply</p>
                                        </div>
                                    </button>
                                )
                            }
                            {
                                !!comment?.repliesData?.length && (
                                    <button className="replybtn ms-3">
                                        <div className="wrapper" onClick={() => setshowReplyMode(!showReplyMode)}>
                                            <i className="fa-regular fa-eye me-2"></i>
                                            <p className="mb-0 no-wrap" >View  {comment?.repliesData?.length} Replies</p>
                                        </div>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    (comment.author || comment.orgMember)._id === user?.id && (
                        <div className="wrapper commentsetting mt-2">
                            <i className="fa-solid fa-ellipsis-vertical "></i>
                        </div>
                    )
                }

            </div>
            {
                ReplyMode && (
                    <div className="w-100 my-2 justify-end wrapper">
                        <FormInput cancelreply={() => setReplyMode(false)} type="reply" ticketId={ticketId} commentId={comment._id} />
                    </div>
                )
            }
            {
                showReplyMode && (
                    <div className="replycontainer">
                        {comment?.repliesData?.map((reply) => (
                            <div key={reply._id} className="my-2">
                                <Comment key={reply._id} comment={reply} ticketId={ticketId} isreply user={user} />
                            </div>
                        ))}
                    </div>
                )
            }
        </>
    );
};

const FormInput: React.FC<{ ticketId: string, isCommentEmpty?: boolean, cancelreply?: () => void | undefined, commentId?: string, userdata?: Session | null, type: string }> = ({
    ticketId,
    isCommentEmpty,
    type,
    cancelreply,
    commentId
}) => {
    const [pending, setTransition] = useTransition();
    const { pageNumber, pageSize } = useAppSelector(state => state.commentreducer.pagination)
    const { data } = useSession()
    const dispatch = useAppDispatch()
    const initialstate: initialType = {
        commenttext: "",
    };
    type initialType = {
        commenttext: "";
    };
    const queryClient = useQueryClient();
    const handlCreatecomment = async (commentvalue: { text: string }, resetForm: any) => {
        try {
            let result;
            if (type === "comment") {
                result = (await createCommentaction({
                    ...commentvalue,
                    ticketId,
                })) as { status: string; message: string }
            } else {
                result = (await replytoCommentaction({
                    ...commentvalue,
                    ticketId,
                }, commentId)) as { status: string; message: string }
            }

            if (type === "comment") {
                dispatch(addComment({
                    ...result.data, author: { ...data?.user, _id: data?.user.id }
                }));
            } else {
                dispatch(addCommentreply({
                    ...result.data, author: { ...data?.user, _id: data?.user.id }
                }));
            }

            console.log(result);
            if (result?.status === "fail") {
                enqueSnackBar({ type: "error", message: result.message });
                return;
            }
            enqueSnackBar({
                type: "success",
                message: type === "comment" ? "Comment created Successfully!" : 'reply added successfully!',
            });
            if (!isCommentEmpty) {
                queryClient.invalidateQueries({ queryKey: ["comments", `${ticketId}?pageNumber=${pageNumber}&pageSize=${pageSize}`] });
            }
            resetForm();
            if (cancelreply) {
                cancelreply()
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleSubmit = (
        values: initialType,
        resetForm: (nextState?: Partial<FormikState<initialType>>) => void
    ) => {
        if (values.commenttext.length > 0) {
            setTransition(() =>
                handlCreatecomment({ text: values.commenttext }, resetForm)
            );
        }
    };
    return (
        <Formik
            initialValues={initialstate}
            onSubmit={(value: initialType, { resetForm }) => {
                handleSubmit(value, resetForm);
            }}
        >
            {({ values, setFieldValue, errors, touched, handleChange }) => (
                <Form className={`${type === "comment" ? "commentform" : 'replyform'} wrapper justify-between align-start`}>
                    <Image
                        className={`userimage ${type === "comment" && "mt-2"}`}
                        width={40}
                        height={40}
                        src={data?.user?.profilePic || "/images/icons/userdummy.avif"}
                        alt="commentuser"
                    />
                    <div className={`w-100 ${type === "comment" ? "mx-3" : 'mx-2'}`}>
                        {
                            type === "comment" ? (
                                <textarea
                                    className="commnetinput"
                                    placeholder="Type your reply here"
                                    onChange={handleChange}
                                    name="commenttext"
                                    value={values.commenttext}
                                />
                            ) :
                                (
                                    <input
                                        className="commnetinput"
                                        placeholder="Type your reply here"
                                        onChange={handleChange}
                                        name="commenttext"
                                        value={values.commenttext}
                                    />
                                )
                        }

                    </div>
                    {
                        type !== "comment" && (
                            <button className="cancelbtn me-2" onClick={cancelreply}>Cancel</button>
                        )
                    }
                    <button className={`postbutton ${type === "comment" && "mt-2"}`}>{type === "comment" ? "Post" : 'Reply'}</button>
                </Form>
            )}
        </Formik>
    );
};
