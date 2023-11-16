// YourApp/ios/YourApp/BleAdvertiser.swift

import CoreBluetooth

@objc(BleAdvertiser)
class BleAdvertiser: NSObject, CBPeripheralManagerDelegate {

    private var peripheralManager: CBPeripheralManager?

   @objc
func startAdvertising(_ uuidString: String) {
    let serviceUUID = CBUUID(string: uuidString)
    let advertisementData = [CBAdvertisementDataServiceUUIDsKey: [serviceUUID]]

    self.peripheralManager?.startAdvertising(advertisementData)
}


    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
        if peripheral.state == .poweredOn {
            let advertisementData = [CBAdvertisementDataLocalNameKey: "YourDeviceName"]
            self.peripheralManager?.startAdvertising(advertisementData)
        }
    }
}
