import React, { useContext, useState, useEffect } from 'react';
import Context from './context';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const ProfilesList = () => {
    const { fetchProfile } = useContext(Context);
    const [profilePerson, setProfilePerson] = useState([])
    const params = useParams()

    useEffect(() => {
        const getProfile = async (id) => {
            let profileFromServer = await fetchProfile(id)
            setProfilePerson(profileFromServer)
        }
        getProfile(params.id)
    }, [])

    return (
        <div >
            <Card sx={{ width: 275, marginBottom: 2 }}>
                <Typography variant='h6'>
                    General info
                </Typography>
                <CardContent>
                    <img src={profilePerson.image} alt="" />
                    <Typography >
                        Profile name: {profilePerson.profileName}
                    </Typography>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Profile status: {profilePerson.profileStatus}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text">
                        Creation date: {profilePerson.creationDate}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfilesList;