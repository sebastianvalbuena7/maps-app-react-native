import { useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Map } from "../../components/maps/Map";
import { useLocationStore } from "../../stores/location/useLocationStore";
import { LoadingScreen } from "../loading/LoadingScreen";

export const MapScreen = () => {

    const { lastKnownLocation, getLocation } = useLocationStore();

    useEffect(() => {
        if (lastKnownLocation === null) {
            getLocation();
        }
    }, []);

    if (lastKnownLocation === null) {
        return (<LoadingScreen />)
    }

    return (
        <View style={styles.container}>
            <Map initialLocation={lastKnownLocation} />
            {/* <Map/> */}
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    }
});