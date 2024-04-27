import { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps"
import { Location } from "../../../infrastructure/interfaces/location";
import { FAB } from "../ui/FAB";
import { useLocationStore } from "../../stores/location/useLocationStore";

interface Props {
    showUserLocation?: boolean;
    initialLocation: Location
}

export const Map = ({ showUserLocation = true, initialLocation }: Props) => {
    const mapRef = useRef<MapView | null | undefined>();
    const cameraLocation = useRef<Location>(initialLocation);

    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowPolyline] = useState(true);

    const {
        getLocation,
        lastKnownLocation,
        watchLocation,
        clearWatchLocation,
        userLocationList
    } = useLocationStore();

    const moveCameraToLocation = (location: Location) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: location
        });
    }

    const moveToCurrentLocation = async () => {
        if (!lastKnownLocation) {
            moveCameraToLocation(initialLocation);
        }

        const location = await getLocation();
        if (!location) return;
        moveCameraToLocation(location);
    }

    useEffect(() => {
        watchLocation();

        return () => {
            clearWatchLocation();
        }
    }, []);

    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser]);

    return (
        <>
            <MapView
                ref={(map) => mapRef.current = map!}
                showsUserLocation={showUserLocation}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onTouchStart={() => setIsFollowingUser(false)}
            >
                {
                    isShowingPolyline && (
                        <Polyline
                            coordinates={userLocationList}
                            strokeColor="red"
                            strokeWidth={5}
                        />
                    )
                }
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

            <FAB
                iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => setIsShowPolyline(!isShowingPolyline)}
                style={{
                    bottom: 140,
                    right: 20
                }}
            />

            <FAB
                iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={{
                    bottom: 80,
                    right: 20
                }}
            />

            <FAB
                iconName="compass-outline"
                onPress={moveToCurrentLocation}
                style={{
                    bottom: 20,
                    right: 20
                }}
            />
        </>
    )
}