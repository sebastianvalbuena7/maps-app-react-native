import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { Location } from "../../../infrastructure/interfaces/location";

interface Props {
    showUserLocation?: boolean;
    initialLocation: Location
}

export const Map = ({ showUserLocation = true, initialLocation }: Props) => {
    return (
        <>
            <MapView
                showsUserLocation={showUserLocation}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longiute,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                {/* Marcadores */}
                {/* <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Este es el titulo del marcado"
                    description="Este es el cuerpo del marcador"
                    image={require('../../../assets/custom-marker.png')}
                /> */}
            </MapView>
        </>
    )
}