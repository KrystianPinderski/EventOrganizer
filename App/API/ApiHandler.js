import axios from 'react-native-axios';
const LocalHost = require('../../LocalHost')
export default class ApiHandler {
    static getAxios(){
        return axios.create({
            baseURL: LocalHost
        })
    }
    static login = async ()=>{
        try{
            let apiResponse = await ApiHandler.getAxios().get("/mobile/login")
            console.log("Got response",apiResponse.data)
            return apiResponse.data;
        }catch(error){
            console.log("login Error")
            throw error;
        }
    }
}