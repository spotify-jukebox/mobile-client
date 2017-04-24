//
//  EventManager.h
//  Spotily
//
//  Created by Olli Rauramo on 23/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#ifndef EventManager_h
#define EventManager_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <Spotify/Spotify.h>

@interface SpotifyEventManager : RCTEventEmitter <RCTBridgeModule, SPTAudioStreamingDelegate, SPTAudioStreamingPlaybackDelegate>

@end

#endif /* EventManager_h */

