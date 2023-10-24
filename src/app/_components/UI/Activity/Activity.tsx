import { ActivityType } from '@/commontypes'
import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar';
import moment from 'moment';
import { generateInitials } from '@/lib';
type activityprops = {
    assignedetail?: undefined | {
        _id: string
        email: string
        name: string
        userName: string
        profilePic: string
    }
    actionperformedtext: string
    tickettitle?: string
    secondrytext?: string
    creatordetail: undefined | {
        _id: string
        email: string
        name: string
        userName: string
        profilePic: string
    }
}

const Activity: React.FC<{ activityInfo: ActivityType, key: string }> = ({ activityInfo, key }) => {

    const [ActivityDetail, setActivityDetail] = useState<activityprops>({
        assignedetail: undefined, actionperformedtext: "", tickettitle: "", creatordetail: undefined, secondrytext: ""
    })
    useEffect(() => {
        switch (activityInfo.type) {
            case "Ticket":
                switch (activityInfo.action) {
                    case "assign":
                        setActivityDetail({
                            creatordetail: activityInfo?.createdByData || activityInfo?.createdByOrgData,
                            assignedetail: activityInfo?.assignedTo,
                            actionperformedtext: "assigned",
                            secondrytext: "to",
                            tickettitle: activityInfo?.ticketData?.title
                        })
                        break;
                    case "update":
                        setActivityDetail({
                            creatordetail: activityInfo?.createdByData || activityInfo?.createdByOrgData,
                            actionperformedtext: "updated",
                            secondrytext: activityInfo.ticketUpdatetext,
                            tickettitle: activityInfo?.ticketData?.title
                        })
                        break;
                    case "create":
                        setActivityDetail({
                            creatordetail: activityInfo?.createdByData || activityInfo?.createdByOrgData,
                            actionperformedtext: "created",
                            tickettitle: activityInfo?.ticketData?.title
                        })
                        break;
                    default:
                        break;
                }
                break;
            case "Project":
                console.log("hello", activityInfo);
                switch (activityInfo.action) {
                    case "added":
                        setActivityDetail({
                            creatordetail: activityInfo?.assignedTo,
                            assignedetail: activityInfo?.createdByData || activityInfo.createdByOrgData,
                            actionperformedtext: "has been added to project",
                            secondrytext: `${activityInfo?.projectData.title} by`,
                        })
                        break;
                }
                break;
            case "Member":

                break;
            default:
                break;
        }
    }, [activityInfo])
    console.log(ActivityDetail);
    return (
        ActivityDetail.creatordetail && (
            <div key={key} className='wrapper mb-3 justify-start'>
                <Avatar initials={generateInitials(ActivityDetail?.creatordetail?.userName)} image={ActivityDetail?.creatordetail?.profilePic} />
                <div className='ms-3 wrapper flex-column align-start'>
                    <p className='activitytext wrapper mb-0'><span className='assignename'>{ActivityDetail?.creatordetail?.userName}</span> &nbsp; {ActivityDetail?.actionperformedtext} {ActivityDetail.tickettitle && <a href='#' >&nbsp;{ActivityDetail.tickettitle} &nbsp;</a>} {ActivityDetail.secondrytext ? ActivityDetail.secondrytext : null}
                        {ActivityDetail.assignedetail && <span className='mx-2 assignename wrapper'> <Avatar size={24} initials={generateInitials(ActivityDetail?.assignedetail?.userName)} image={ActivityDetail?.assignedetail?.profilePic} /> &nbsp; {ActivityDetail?.assignedetail?.userName} </span>}
                    </p>
                    <p className='activity-date mb-0'>{moment(activityInfo.createdAt).format('MMMM Do YYYY, h:mm:ss a')}. on board <span className='activityproject'>{activityInfo?.projectData.title}</span> </p>
                </div>
            </div >
        )
    )
}

export default Activity

// from todo to in progress