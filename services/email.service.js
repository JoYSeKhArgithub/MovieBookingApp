import axios from 'axios';
import User from '../models/user.model.js';

const sendMail = async(subject,id,content)=>{
    const user = await User.findById(id)
    axios.post(process.env.NOTI_SERVICE + '/notiService/api/v1/notification/', {
        subject: subject,
        recepientEmails: [user.email],
        content: content
    })
}

export default sendMail