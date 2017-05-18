//
//  EventSender.h
//  safay
//
//  Created by Jessadaporn on 5/6/2560 BE.
//  Copyright © 2560 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>

@interface EventSender : NSObject <RCTBridgeModule>
@property (strong, nonatomic) NSTimer *timer;
- (void)update;
- (void)startSending;
- (void)setInterval:(double) interval;
@end
