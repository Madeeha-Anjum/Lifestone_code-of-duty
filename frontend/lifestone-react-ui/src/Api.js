const axios = require('axios').default;

axios.defaults.baseURL = 'http://127.0.0.1:8000';

export const addUserToDb = async userDetails => {
    try {
        await axios.post('/users/create', userDetails);
        return "Success"
    } catch (err) {
        return "Not sucessful";
    }
}

export const addMilestoneToDb = async milestoneDetails => {
    let config = {
        headers:{
            'content-type':'multipart/form-data'
        }
    }
    try {
        await axios.post('/milestones/create', milestoneDetails, config);
        return "Success"
    } catch (err) {
        return "Not sucessful";
    }
}
export const getMilestonesForUser = async userId => {
    try {
        const result = await axios.get('/milestones/user?owner_id='+userId)
        return result.data
    } catch (err) {
        console.log("No milestones found. Something might have gone wrong")
        return [];
    }
}