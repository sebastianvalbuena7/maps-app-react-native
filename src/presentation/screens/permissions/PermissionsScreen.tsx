import { View, Text, Pressable } from "react-native"
import { globalStyles } from "../../../config/theme/styles"
import { usePermissionStore } from "../../stores/permissions/usePermissionStore"

export const PermissionsScreen = () => {
    const { locationStatus, requestLocationPermission } = usePermissionStore();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Text>Habilitar ubicacion</Text>

            <Pressable
                style={[globalStyles.btnPrimary]}
                onPress={requestLocationPermission}
            >
                <Text style={{ color: 'white' }}>Habilitar localizacion</Text>
            </Pressable>

            <Text>Estado actual: {locationStatus}</Text>
        </View>
    )
}
