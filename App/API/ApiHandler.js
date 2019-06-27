import axios from 'react-native-axios';
const LocalHost = require('../../LocalHost').default
export default class ApiHandler {
    static getAxios() {
        return axios.create({
            baseURL: LocalHost
        })
    }
    static getLocation() {
        return axios.create({
            baseURL: "https://nominatim.openstreetmap.org/"
        })
    }
    static login = async (name, password) => {
        try {
            let apiResponse = await ApiHandler.getAxios().post("/login", { name, password })
            return apiResponse.data;
        } catch (error) {
            throw error;
        }
    }
    static signIn = async (name, password, type, adress = null, companyName = null, KRSNumber = null, NIPNumber = null, REGONNumber = null) => {
        try {
            let apiResponse = await ApiHandler.getAxios().post("/users", { name, password, type, adress, companyName, KRSNumber, NIPNumber, REGONNumber })
            console.log(apiResponse.data)
            return apiResponse.data;
        } catch (err) {
            console.log("signIn Error.");
            throw err;
        }
    }
    static addEvent = async (title, date, organizer, city, street, lon, lat, description, tags, link) => {
        let apiResponse = await ApiHandler.getAxios().post("/Event", { title, date, organizer, city, street, lon, lat, description, tags, link })
        return apiResponse.data;
    }
    static getEvents = async (token) => {
        try {
            let apiResponse = await ApiHandler.getAxios().get("/Event", { headers: { authorization: 'Bearer ' + token } })
            return apiResponse.data;
        } catch (err) {
            console.log("GetEvents Error.", err);
            throw err;
        }
    }
    static getCityPosition = async (city, street) => {
        try {
            let apiResponse = await ApiHandler.getLocation().get("search/" + street + "," + city + "?format=json&polygon=1&addressdetails=1")
            return apiResponse.data
        } catch (e) {
            throw e;
        }
    }
    static deleteEvent = async (id) => {
        console.log("ID of API HANDLER:", id)
        try {
            let apiResponse = await ApiHandler.getAxios().delete("/Event", { data: { id } })
            return apiResponse.data;
        } catch (err) {
            console.log("DeleteEvents Error.", err);
            throw err;
        }
    }
}