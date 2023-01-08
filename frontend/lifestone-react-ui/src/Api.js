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