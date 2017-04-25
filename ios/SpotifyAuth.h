//
//  SpotifyAuth.h
//  spotifyModule
//
//  Created by Jack on 8/8/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface SpotifyAuth : NSObject <RCTBridgeModule>
@property (nonatomic, strong) NSString *myScheme;
-(void)urlCallback: (NSURL *)url;
+ (id)sharedManager;
@end
