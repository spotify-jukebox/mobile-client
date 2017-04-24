//
//  EventManager.m
//  Spotily
//
//  Created by Olli Rauramo on 23/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "SpotifyEventManager.h"
#import <React/RCTLog.h>

@implementation SpotifyEventManager

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"audioStreamingDidChangeToTrack",
           @"audioStreamingDidStartPlayingTrack"];
}

- (void)audioStreaming:(SPTAudioStreamingController *)audioStreaming didChangeToTrack:(NSDictionary *)metadata
{
  RCTLog(@"Event didChangeToTrack sent.");
  [self sendEventWithName:@"audioStreamingDidChangeToTrack" body: metadata];
}

- (void)audioStreaming:(SPTAudioStreamingController *)audioStreaming didStartPlayingTrack:(NSURL *)trackUri
{
  RCTLog(@"Event didStartPlayingTrack sent.");
  [self sendEventWithName:@"audioStreamingDidStartPlayingTrack" body: trackUri];
}

@end
