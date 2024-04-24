import { PERMISSIONS, PermissionStatus as ReactNativePermissionStatus, check, openSettings, request } from "react-native-permissions"
import type { PermissionStatus } from "../../infrastructure/interfaces/permissions"
import { Platform } from "react-native";

export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    let status: ReactNativePermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error('Plataforma no soportada');
    }

    if (status === 'blocked') {
        await openSettings();
    }

    const permissionMapper: Record<ReactNativePermissionStatus, PermissionStatus> = {
        unavailable: "unavailable",
        blocked: "blocked",
        denied: "denied",
        granted: "granted",
        limited: "limited"
    };

    return permissionMapper[status] ?? 'undetermined';
}

export const checkLocationPermission = async (): Promise<PermissionStatus> => {
    let status: ReactNativePermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error('Plataforma no soportada');
    }

    const permissionMapper: Record<ReactNativePermissionStatus, PermissionStatus> = {
        unavailable: "unavailable",
        blocked: "blocked",
        denied: "denied",
        granted: "granted",
        limited: "limited"
    };

    return permissionMapper[status] ?? 'undetermined';
}