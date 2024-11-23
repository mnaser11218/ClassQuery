import { useParams } from "react-router-dom";
function Profile(){
    const params = useParams();
    const userProfileId = params.id;
    return(<>
    Profile Page id : {userProfileId}
    </>)
}
export default Profile;