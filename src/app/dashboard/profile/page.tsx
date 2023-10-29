'use server'
import Image from "next/image"
import "./profile.scss"
import ProfileForm from "./components/ProfileForm"



const MyProfile = () => {
    return (
        <div className="profilewrapper ">
            <Image alt={"icon"} src="https://trello.com/assets/eff3d701a9c3a71105ea.svg" className="w-100" width={500} height={100} />
            <h4 className="my-2">Manage your personal information</h4>
            <div className="p-2 profileinfobox">
                <p className="mb-3">
                    This is an TaskSphere account. Edit your personal information and visibility settings through your TaskSphere profile.
                </p>
                <p className="mb-0">To learn more, view our Terms of Service or Privacy Policy.</p>
            </div>
            <h4 className="w-100 profileborder mt-3">About</h4>
            <ProfileForm />
        </div>
    )
}

export default MyProfile