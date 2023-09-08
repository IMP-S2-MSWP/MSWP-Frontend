import React, { useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

//
import { getDeviceId } from '../components/DeviceInfo';
import useBluetoothScanner from '../components/BluetoothScanner';
//

const DeviceScreen = () => {
  
   const [deviceId,setdeviceId] = useState<string | null>(null);
   const { devices,startScan} = useBluetoothScanner();

   const handleCheckDeviceInfo=async()=>{
     let id=await getDeviceId();
     setdeviceId(id);
   }

   return (
     <View>
       <Button title="Check device info" onPress={handleCheckDeviceInfo} />

       {deviceId && (
         <View>
           <Text>Device ID:</Text>
           <Text>{deviceId}</Text>
         </View>
       )}

       <Button title="Scan devices" onPress={()=>{
         startScan(); // Start a new scan when button is pressed
        }}/>
        
        {/* Display list of scanned devices */}
        <ScrollView>
          {devices.map((device, index) => (
            <Text key={index}>{device.id}</Text>
          ))}
        </ScrollView>
     </View>
   );
};

export default DeviceScreen;