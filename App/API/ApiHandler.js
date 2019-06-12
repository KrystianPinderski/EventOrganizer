import axios from 'react-native-axios';
const LocalHost = require('../../LocalHost').default
export default class ApiHandler {
    static getAxios() {
        return axios.create({
            baseURL: LocalHost
        })
    }
    static login = async (name, password) => {
        try {
            let apiResponse = await ApiHandler.getAxios().post("/login", { name, password })
            return apiResponse.data;
        } catch (error) {
            console.log("login Error", error.response.data)
            throw error;
        }
    }
    static signIn = async (name, password, type,adress=null, companyName=null, KRSNumber=null, NIPNumber=null, REGONNumber=null) => {
        try {
            let apiResponse = await ApiHandler.getAxios().post("/users", { name, password, type,adress,companyName,KRSNumber,NIPNumber,REGONNumber })
            console.log(apiResponse.data)
            return apiResponse.data;
        } catch (err) {
            console.log("signIn Error.");
            throw err;
        }
    }
    static addEvent = async (title,date,organizer,city,description,tags,link)=>{
        try{
            let apiResponse = await ApiHandler.getAxios().post("/Event",{title,date,organizer,city,description,tags,link})
            console.log(apiResponse.data)
            return apiResponse.data;
        }catch(err){
            console.log("AddEvent Error.",err);
            throw err;
        }
    }
    static getEvents = async (token)=>{
        try{
            let apiResponse = await ApiHandler.getAxios().get("/Event",{headers:{authorization:'Bearer '+token}})
            return apiResponse.data;
        }catch(err){
            console.log("GetEvents Error.",err);
            throw err;
        }
    }
}