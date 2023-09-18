import DeviceInfo from 'react-native-device-info';

export const getDeviceId = async (): Promise<string> => {
  try {
    const deviceId = await DeviceInfo.getUniqueId();
    return deviceId;
  } catch (error) {
    throw new Error('Error getting device ID');
  }
};