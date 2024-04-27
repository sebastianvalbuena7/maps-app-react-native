import Geolocation from "@react-native-community/geolocation";
import { Location } from "../../infrastructure/interfaces/location";

export const getCurrentLocation = async (): Promise<Location> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => {
            resolve({
                latitude: info.coords.latitude ?? 0,
                longitude: info.coords.longitude ?? 0
            });
        }, (error) => {
            console.log(error);
            reject(error);
        }, {
            enableHighAccuracy: true
        });
    })
}

export const watchCurrentLocation = (
    locationCallBack: (location: Location) => void
): number => {
    return Geolocation.watchPosition(info => (
        locationCallBack({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
        })
    ), (error) => {
        throw new Error('error' + error);
    }, {
        enableHighAccuracy: true
    });
}

export const clearWatchLocation = (watchId: number) => {
    Geolocation.clearWatch(watchId);
}