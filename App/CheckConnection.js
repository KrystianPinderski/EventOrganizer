
import NetInfo from "@react-native-community/netinfo";

module.exports = {
    getStatus: function () {
        let res = NetInfo.fetch().then(state => {
            return state.isConnected
        });
        return res
    },

}