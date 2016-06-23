#import "RCTBridgeModule.h"

@interface ACR : NSObject <RCTBridgeModule>

- (void)startRecognition:(id)sender;

- (void)stopRecognition:(id)sender;

@end
