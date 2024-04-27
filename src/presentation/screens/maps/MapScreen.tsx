import { View, StyleSheet } from "react-native"
import { Map } from "../../components/maps/Map";

export const MapScreen = () => {
    return (
        <View style={styles.container}>
            <Map initialLocation={{latitude: 3, longiute: 3}}/>
            {/* <Map/> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    }
});