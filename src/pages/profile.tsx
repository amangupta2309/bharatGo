import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useSelector } from "react-redux";

const Profile = ()=>{
    const user = useSelector((state:any)=> state.user);
    return(
        <div className='flex justify-center pt-8 w-full'>
        <Card className='flex w-[40rem]'>
            {/* <div className='flex items-center justify-center w-[10rem] bg-blue-300 rounded-md'>
                <Avatar />
            </div> */}
            <div>
                <CardHeader>
                    <CardTitle>{user.email}</CardTitle>
                </CardHeader>
            </div>
        </Card>
    </div>
    )
}

export default Profile;