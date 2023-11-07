// YourApp/ios/YourApp.m

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BleAdvertiser, NSObject)

RCT_EXTERN_METHOD(startAdvertising:(NSString *)uuidString)

@end
