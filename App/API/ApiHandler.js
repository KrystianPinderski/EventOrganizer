import axios from 'react-native-axios';
export default class ApiHandler {
    static getAxios(){
        return axios.create({
            baseURL:'http://62.133.134.122:3000'
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