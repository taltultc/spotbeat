#import "ACR.h"
#import <Foundation/Foundation.h>
#import "RCTEventDispatcher.h"
#import "ACRCloudConfig.h"
#import "ACRCloudRecognition.h"

@implementation ACR
{
    ACRCloudRecognition         *_client;
    ACRCloudConfig          *_config;
    __block BOOL    _start;
    NSTimeInterval          startTime;
}
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(startDetect)
{
    _start = NO;
  // Your implementation here
    _config = [[ACRCloudConfig alloc] init];

    _config.accessKey = @"be1e9220586e7117cc5cce04c2e7004a";
    _config.accessSecret = @"0NGR6EU4b2s1VAJ3D89uoG7vLapHFd8SVrxPs5PS";
    _config.host = @"ap-southeast-1.api.acrcloud.com";

    //if you want to identify your offline db, set the recMode to "rec_mode_local"
    _config.recMode = rec_mode_remote;
    _config.audioType = @"recording";
    _config.requestTimeout = 10;

    /* used for local model */
    if (_config.recMode == rec_mode_local)
        _config.homedir = [[[NSBundle mainBundle] resourcePath] stringByAppendingPathComponent:@"acrcloud_local_db"];


    _config.stateBlock = ^(NSString *state) {
        //[weakSelf handleState:state];
    };
    _config.volumeBlock = ^(float volume) {
        //do some animations with volume
        //[weakSelf handleVolume:volume];
    };

    _config.resultBlock = ^(NSString *result, ACRCloudResultType resType) {
        [self handleResult:result resultType:resType];
    };

    _client = [[ACRCloudRecognition alloc] initWithConfig:_config];

    //start pre-record
    [_client startPreRecord:3000];
    [self startRecognition];
     NSLog(@"Hello, World! \n");
}
- (void)startRecognition {
    if (_start) {
        return;
    }

    NSLog(@"startRecordRec \n");
    [_client startRecordRec];
    _start = YES;

    startTime = [[NSDate date] timeIntervalSince1970];
}
- (void)stopRecognition:(id)sender {
    if(_client) {
        [_client stopRecordRec];
    }
    _start = NO;
}
-(void)handleResult:(NSString *)result
         resultType:(ACRCloudResultType)resType
{


    dispatch_async(dispatch_get_main_queue(), ^{
        NSError *error = nil;

        NSData *jsonData = [result dataUsingEncoding:NSUTF8StringEncoding];
        NSDictionary* jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&error];

        NSString *r = nil;

        NSLog(@"%@", result);

        if ([[jsonObject valueForKeyPath: @"status.code"] integerValue] == 0) {
            if ([jsonObject valueForKeyPath: @"metadata.music"]) {
                NSDictionary *meta = [jsonObject valueForKeyPath: @"metadata.music"][0];
                NSString *title = [meta objectForKey:@"title"];
                NSString *artist = [meta objectForKey:@"artists"][0][@"name"];
                NSString *album = [meta objectForKey:@"album"][@"name"];
                NSString *play_offset_ms = [meta objectForKey:@"play_offset_ms"];
                NSString *duration = [meta objectForKey:@"duration_ms"];

                NSArray *ra = @[[NSString stringWithFormat:@"title:%@", title],
                                [NSString stringWithFormat:@"artist:%@", artist],
                                [NSString stringWithFormat:@"album:%@", album],
                                [NSString stringWithFormat:@"play_offset_ms:%@", play_offset_ms],
                                [NSString stringWithFormat:@"duration_ms:%@", duration]];
                r = [ra componentsJoinedByString:@"\n"];
            }
            if ([jsonObject valueForKeyPath: @"metadata.custom_files"]) {
                NSDictionary *meta = [jsonObject valueForKeyPath: @"metadata.custom_files"][0];
                NSString *title = [meta objectForKey:@"title"];
                NSString *audio_id = [meta objectForKey:@"audio_id"];

                r = [NSString stringWithFormat:@"title : %@\naudio_id : %@", title, audio_id];
            }
            if ([jsonObject valueForKeyPath: @"metadata.streams"]) {
                NSDictionary *meta = [jsonObject valueForKeyPath: @"metadata.streams"][0];
                NSString *title = [meta objectForKey:@"title"];
                NSString *title_en = [meta objectForKey:@"title_en"];

                r = [NSString stringWithFormat:@"title : %@\ntitle_en : %@", title,title_en];
            }
            if ([jsonObject valueForKeyPath: @"metadata.custom_streams"]) {
                NSDictionary *meta = [jsonObject valueForKeyPath: @"metadata.custom_streams"][0];
                NSString *title = [meta objectForKey:@"title"];

                r = [NSString stringWithFormat:@"title : %@", title];
            }
            if ([jsonObject valueForKeyPath: @"metadata.humming"]) {
                NSArray *metas = [jsonObject valueForKeyPath: @"metadata.humming"];
                NSMutableArray *ra = [NSMutableArray arrayWithCapacity:6];
                for (id d in metas) {
                    NSString *title = [d objectForKey:@"title"];
                    NSString *score = [d objectForKey:@"score"];
                    NSString *sh = [NSString stringWithFormat:@"title : %@  score : %@", title, score];

                    [ra addObject:sh];
                }
                r = [ra componentsJoinedByString:@"\n"];
            }

           // self.resultView.text = r;
            //NSLog(@"%@", r);

        } else {
            //self.resultView.text = result;
            //NSLog(@"%@", result);
            r = result;
        }
        [self.bridge.eventDispatcher
         sendAppEventWithName:@"ACREvent"
         body:@{@"message": @"Found", @"data": r}];

    });
}
-(void)handleVolume:(float)volume
{
//    dispatch_async(dispatch_get_main_queue(), ^{
//        self.volumeLabel.text = [NSString stringWithFormat:@"Volume : %f",volume];
//
//    });
}
-(void)handleState:(NSString *)state
{
//    dispatch_async(dispatch_get_main_queue(), ^{
//        self.stateLabel.text = [NSString stringWithFormat:@"State : %@",state];
//    });
}
@end