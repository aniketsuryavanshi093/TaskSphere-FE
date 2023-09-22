import { createCommentaction } from '@/actions/authactions/ticketadminactions';
import { comment } from '@/commontypes';
import useGetComments from '@/hooks/UseQuery/ticketmanagementhooks/useGetComments'
import enqueSnackBar from '@/lib/enqueSnackBar';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik,  FormikState } from 'formik';
import moment from 'moment';
import { Session } from 'next-auth';
import { useSession, } from 'next-auth/react';
import Image from 'next/image';
import React , {useTransition} from 'react'

const Commentsection: React.FC<{ticketId: string}> = ({ticketId}) => {
    const {data} = useSession()
  const {data: commentsData , isLoading} = useGetComments({id: ticketId});
  console.log(commentsData);
  
  return (
   <div>
        <FormInput ticketId = {ticketId} userdata={data}/>
        {
            isLoading ? (
                null
            )
            :(
            !!commentsData?.data?.data?.comments.length ? (
                commentsData?.data?.data?.comments?.map((comment: comment)=>(
                    <Comment key={comment._id} comment={comment}/>
                ))
            )
            :
            (<p>No comments added</p>))
        }
       
   
   </div>
  )
}

export default Commentsection

const Comment: React.FC<{comment: comment, key: string}> = ({comment, key})=>{
    return (
         <div key={key} className='wrapper justify-between align-start  commentwrapper'>
            <div className='wrapper justify-start align-start'>
                <Image className='userimage mt-1' width={40} height={40} src={(comment.author || comment.orgMember).profilePic || "/images/icons/userdummy.avif"} alt='commentuser'/>
                <div className='wrapper flex-column align-start ms-3 '>
                    <div className='wrapper justify-start'>
                        <p className='mb-0 commnetname'>{(comment.author || comment.orgMember).name}</p>
                        <p className='text_muted mb-0 commenttimestamp'>{moment(new Date(comment?.createdAt).toLocaleString()).fromNow()}</p>
                    </div>
                    <p className='mb-1 commentpara' >{comment.text}</p>
                    <button className='replybtn '>
                            <div className='wrapper'>
                                <i className="fa-solid fa-reply me-2"></i>
                                <p className='mb-0'> Reply</p>
                            </div>
                    </button>
                </div>
            </div>
            <div className='wrapper commentsetting mt-2'>
                <i className="fa-solid fa-ellipsis-vertical "></i>
            </div>
        </div>
    )
}

const FormInput: React.FC<{ticketId: string ,userdata:Session | null}> = ({ticketId, userdata})=>{
    console.log(userdata);
    
    const [pending , setTransition] = useTransition()
    const  initialstate: initialType = {
        commenttext : ""
    }
    type initialType = {
            commenttext : ""
    }
    const queryClient = useQueryClient()
    const handlCreatecomment = async(data:{text: string}, resetForm:any)=>{
        console.log({...data , ticketId, author: userdata?.user.id});
        try {
            const result = await createCommentaction({...data , ticketId, author: userdata?.user.id}) as { status: string, message: string }
            if (result?.status === "fail") {
                enqueSnackBar({ type: "error", message: result.message, })
                return
            }
            enqueSnackBar({ type: "success", message: "Commnet created Successfully!" })
            queryClient.invalidateQueries({queryKey: ["comments" , ticketId]})
            resetForm()
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = (values: initialType, resetForm: (nextState?: Partial<FormikState<initialType>>) => void)=>{
         setTransition(() => handlCreatecomment({text: values.commenttext  }, resetForm))
    }
    return (
        <Formik initialValues={initialstate} onSubmit={(value: initialType, { resetForm }) => {
                    handleSubmit(value, resetForm)
                }}>
             {({ values, setFieldValue, errors, touched , handleChange}) => (
                 <Form className='commentform wrapper justify-between align-start'>
                        <Image className='userimage mt-2' width={40} height={40} src={"/images/icons/userdummy.avif"} alt='commentuser'/>
                        <div className='w-100 mx-3'>
                            <textarea rows={2} cols={5} className='commnetinput'  placeholder='Type your reply here' onChange={handleChange}  name='commenttext' value={values.commenttext}/>
                        </div>
                        <button className='postbutton mt-2'>Post</button>
                </Form>
             )}
        </Formik>
    )
}