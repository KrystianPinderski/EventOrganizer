import axios from 'react-native-axios';
export default class ApiHandler {
    static getAxios(baseURL){
        return axios.create({
            baseURL:baseURL||'http://localhost:3000'
        })
    }
    static login = async (userName,password)=>{
        try{
            //let apiResponse = await ApiHandler.getAxios().get("/login?q="+userName+"&password="+password)
            let apiResponse = {
                Message:"Success"
            }
            return apiResponse;
        }catch(error){
            throw error;
        }
    }
}