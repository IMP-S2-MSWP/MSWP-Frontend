import React from 'react';
import { Text, View, ScrollView} from 'react-native';

interface DeviceListProps {
  devices: Array<any>;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => (

  <View>
    <ScrollView>
    {devices.map((device: any) => (
      <Text key={device.id}>
        Name: {device.name}, ID: {device.id}, RSSI: {device.rssi}
      </Text>
    ))}
    </ScrollView>
  </View>
  
);

export default DeviceList;