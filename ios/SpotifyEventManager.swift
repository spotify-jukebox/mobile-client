//
//  SpotifyEventManager.swift
//  Spotily
//
//  Created by Olli Rauramo on 24/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation


@objc(SpotifyEventManager)
class SpotifyEventManager: RCTEventEmitter, SPTAudioStreamingDelegate, SPTAudioStreamingPlaybackDelegate {

  var player: SPTAudioStreamingController?

  override init() {
    super.init()

    player = SPTAudioStreamingController.sharedInstance()
    player?.playbackDelegate = self
  }

  override func supportedEvents() -> [String]! {
    return ["audioStreamingDidChangeToTrack",
            "audioStreamingDidStartPlayingTrack",
            "audioStreamingDidSkipToNextTrack",
            "audioStreamingDidStopPlayingTrack",]
  }

  func audioStreamingDidSkip(toNextTrack audioStreaming: SPTAudioStreamingController!) {
    print("EVENT - audioStreamingDidSkipToNextTrack")
  }

  func audioStreaming(_ audioStreaming: SPTAudioStreamingController!, didStartPlayingTrack trackUri: URL!) {
    print("EVENT - didStartPlayingTrack")
  }

  func audioStreaming(_ audioStreaming: SPTAudioStreamingController!, didStopPlayingTrack trackUri: URL!) {
    self.sendEvent(withName: "audioStreamingDidStopPlayingTrack", body: trackUri)
  }

  func audioStreaming(_ audioStreaming: SPTAudioStreamingController, didChangeToTrack metadata: [AnyHashable : Any]) {
    self.sendEvent(withName: "audioStreamingDidChangeToTrack", body: metadata)
  }
}
