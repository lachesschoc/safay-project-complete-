//
//  EventSender.m
//  safay
//
//  Created by Jessadaporn on 5/6/2560 BE.
//  Copyright © 2560 Facebook. All rights reserved.
//

#import "EventSender.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@implementation EventSender
  double _interval;
  bool _isStop = false;


@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

+ (id)allocWithZone:(NSZone *) zone
{
  static EventSender *sharedInstance = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    sharedInstance = [super allocWithZone:zone];
  });
  return sharedInstance;
}

- (NSTimer *) timer {
  if (!_timer) {
    _timer = [NSTimer timerWithTimeInterval:_interval target:self selector:@selector(update:) userInfo:nil repeats:YES];
  }
  return _timer;
}

-(void)update:(NSTimer*)timer
{
  if(!_isStop){
    NSLog(@"Update time!");
  }
  
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"SafaySetTimeEvent" body:@{@"name": @"eventName"}];
 

}

RCT_EXPORT_METHOD(startSending)
{
  
  NSLog(@"Start update time!");
  
   [[NSRunLoop mainRunLoop] addTimer:self.timer forMode:NSRunLoopCommonModes];
  
}


RCT_EXPORT_METHOD(setInterval:(double)interval)
{
  
  _interval = interval;
  NSLog(@"Set interval : %f", _interval);
  
}

RCT_EXPORT_METHOD(stopSending)
{
  _isStop = true;
  NSLog(@"Stop update time!");
  [_timer invalidate];
}

@end
