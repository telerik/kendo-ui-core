---
title: MediaPlayer
page_title: Configuration, methods and events of Kendo UI MediaPlayer
description: Code examples and tips how to configure MediaPlayer widget, use available methods and events.
res_type: api
component: mediaplayer
---

# kendo.ui.MediaPlayer

Represents the Kendo UI MediaPlayer widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoPlay `Boolean` *(default: false)*

If set to `true`, the widget will start playing the video or videos after initializing.

**Note** Some browser do not allow autoplay and will block this feature. A common solution is to mute the video or disable the browser's autoplay policy.

<div class="meta-api-description">
How do I enable autoplay in Kendo UI MediaPlayer? Automatically initiate video or audio playback as soon as the media player loads or initializes without requiring manual start commands, enabling instant play, autoplay, auto-start, or immediate streaming upon component or player setup, useful for seamless media experiences, auto-triggered playback, play-on-load, or starting content without user interaction.
</div>

#### Example - enable automatic play

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### autoRepeat `Boolean` *(default: false)*

If set to `true`, the widget will start playing the video or videos after initializing.


<div class="meta-api-description">
How do I configure Kendo UI MediaPlayer to automatically repeat playing a video or audio? Control automatic media playback behavior by enabling continuous or immediate start of video or audio when the player component initializes, configure autoplay to begin playing content right away without user interaction, set playback to loop or auto-repeat so media restarts seamlessly after finishing, manage media start timing on load or component mount, and enable instant playback of loaded videos or audio automatically upon initialization for hands-free continuous viewing or listening experiences.
</div>

#### Example - enable automatic play

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoRepeat: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### forwardSeek `Boolean` *(default: true)*

If set to `false`, the user will be prevented from seeking the video forward.


<div class="meta-api-description">
How do I prevent users from fast-forwarding during video playback in Kendo UI MediaPlayer? Enable or disable the ability to skip forward or jump ahead during media playback, controlling whether users can fast-forward or seek forward in a video or audio stream. Adjust settings to allow or block users from moving ahead beyond the current playback position, manage forward navigation through content, restrict or permit forward scrubbing, and configure seek behavior to limit or enable jumping forward within the media timeline for customized playback control.
</div>

#### Example - enable forward seek

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        forwardSeek: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### fullScreen `Boolean` *(default: false)*

If set to `true`, the widget will enter fullscreen mode.


<div class="meta-api-description">
How to enable fullscreen mode in Kendo UI MediaPlayer for video playback? Control and configure immersive fullscreen video playback modes, toggle between embedded and native fullscreen viewing experiences, enable or disable fullscreen display for media content, switch video player to occupy the entire screen for enhanced viewing, activate fullscreen mode for media sessions, set the media player's display state to fullscreen or embedded, manage screen presentation for video playback, configure player to expand to full viewport or stay inline, adjust viewing mode between fullscreen and windowed, and enable a seamless immersive display environment for videos.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        fullScreen: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### media `Object`

The object which holds the information about the media that will be played by the control.


<div class="meta-api-description">
How do I configure the media source URL and type for playback in Kendo UI MediaPlayer? Set or configure the media content for playback by specifying an object that includes the media source URL, type or MIME format, poster image, subtitle or caption tracks, and any custom metadata needed to define or control the media item within a player component; this enables selecting, updating, or managing the media asset details, such as streaming links, file paths, media attributes, and associated descriptive or control information for video, audio, or other multimedia playback scenarios.
</div>

#### Example - specify a video

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### media.source `String`

String or an array of objects that hold the URL or URLs of the videos.


<div class="meta-api-description">
How do I configure multiple video sources for playback in Kendo UI MediaPlayer? Configure the video content or playlist to load and play by specifying one or multiple video URLs, enabling control over media sources, streaming links, or local video file paths; set or update single videos, multiple media entries, playlists, or collections by providing a URL string or an array of video objects representing individual or grouped sources for seamless playback management and dynamic content loading.
</div>

#### Example - specify a video

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

#### Example - specify a video with alternative sources

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: {
            title: "Kendo UI for jQuery: Welcome and Overview",
            source: [ { quality: "480p", url: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }, { quality: "720p", url: "https://www.youtube.com/watch?v=UbkbVBNYZMc" } ]
        }
    });
    </script>

### media.title `String`

Specifies the title of the media that will be played.


<div class="meta-api-description">
How do I change the title of an audio file in a Kendo UI MediaPlayer? Set or update the display name or label for the current audio or video content, configure the visible media track title, assign or bind a custom title string for the playing media item, control metadata display names, define or modify the now-playing text shown in media players, and manage the title information that identifies the active media file or stream.
</div>

#### Example - specify a video

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### messages `Object`

The object which holds the localization strings.


<div class="meta-api-description">
How do I customize media player language settings in Kendo UI for jQuery? Configure or customize media player language settings by supplying a collection of localized text strings, translation data, or internationalization resources to adapt interface messages, prompts, labels, and controls for different languages and regional preferences. Enable or set the media player's user-facing text content through dynamic message dictionaries or language packs to support multilingual environments, localization, message overrides, or custom wording for various locales, ensuring that playback notifications, error messages, and UI elements reflect the desired language and terminology.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            pause: "Pause",
            play: "Play",
            mute: "Mute",
            unmute: "Unmute",
            quality: "Quality",
            fullscreen: "Fullscreen"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### messages.pause `String`

**Pause** button tooltip message.


<div class="meta-api-description">
How do I customize the pause button tooltip in Kendo UI MediaPlayer? Customize and translate the tooltip text shown on the pause button in media playback controls, enabling localization and adaptation of the pause label for different languages, regions, or user preferences. This setting helps configure, update, or override the default pause tooltip message displayed on media player interfaces, supporting internationalization, accessibility, and user interface customization for pause actions across various contexts and platforms.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            pause: "Pause Video"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### messages.play `String`

**Play** button tooltip message.


<div class="meta-api-description">
How do I change the tooltip text for the Play button in a Kendo UI media player? Customize or localize the Play button tooltip text in a media player interface, enabling control label adjustments, setting or changing button hover text, configuring accessible descriptions, modifying playback control tooltips, or updating UI hints for play functionality. This supports various language settings, user interface personalization, control text overrides, and accessibility enhancements related to the play action tooltip.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            play: "Play Video"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### messages.mute `String`

**Mute** button tooltip message.


<div class="meta-api-description">
How do I customize the tooltip for the mute button in a Kendo UI MediaPlayer? Set or customize the tooltip, hover text, or label that appears when users mouse over or interact with the mute button in a media player interface, enabling control over the accessible description, localization, or user guidance text related to muting audio, silencing sound, toggling mute state, adjusting volume muting, or providing contextual hints on the mute control within media playback.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            mute: "Mute Audio"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### messages.unmute `String`

**Unmute** button tooltip message.


<div class="meta-api-description">
How do I customize the tooltip for the unmute button in Kendo UI MediaPlayer? Set, customize, or configure the tooltip, hover text, label, or accessible description for the unmute button in a media player interface, enabling control over the text displayed when users hover over or focus on the unmute icon, useful for localization, accessibility, UI customization, or adjusting the prompt that appears to indicate sound unmuting functionality.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            unmute: "Unmute Audio"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### messages.quality `String`

**Quality** button tooltip message.


<div class="meta-api-description">
How do I change the text on the quality button in Kendo UI's MediaPlayer widget? Customize or set the tooltip text, label, or description for the media player's quality button, enabling localization, translation, or modification of the quality selector's hover message, title, or accessible name in different languages or contexts, controlling how the quality toggle or video resolution option is presented to users across interfaces.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            quality: "Video Quality"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### messages.fullscreen `String`

**Fullscreen** button tooltip message.


<div class="meta-api-description">
How do I customize the tooltip for the fullscreen button in a Kendo UI media player? Set or customize the tooltip, hover text, or button label for the fullscreen control in a media player interface, allowing customization of the message that appears when users mouse over or focus on the fullscreen toggle button. Adjust, configure, or override the display text that indicates entering or exiting full screen mode, enabling control over accessibility labels, user interface hints, or descriptive tooltips related to full screen functionality in video or audio player components.
</div>

#### Example

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            fullscreen: "Enter Fullscreen"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>
```

### mute `Boolean` *(default: false)*

If set to `true`, the video will be played without sound.


<div class="meta-api-description">
How to mute audio while playing video in Kendo UI MediaPlayer? Manage audio output settings to enable or disable sound during media playback, such as muting or silencing video and audio streams, configuring the media to start or continue playing without any audio, controlling volume by toggling sound off or on at the start or while running, setting playback to silent mode, muting audio programmatically or through configuration, ensuring videos run with no sound, and adjusting media behavior for silent or muted playback scenarios in applications that handle video or audio content.
</div>

#### Example - enable fullscreen

```pseudo
    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        mute: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>
```

### navigatable `Boolean` *(default: false)*

If set to `true`, the option enables the keyboard navigation for the widget.


<div class="meta-api-description">
How do I enable keyboard navigation for Kendo UI media players? Enable or configure keyboard navigation and control for media playback components to allow users to operate the player via keyboard input, supporting accessibility, focus management, and keyboard-driven interaction patterns such as tabbing, arrow key navigation, and hotkey control. This setting lets developers activate keyboard focus and input handling for media controls, enabling operation without mouse interaction, improving usability for assistive technologies, and ensuring the media player can respond to key events for play, pause, seeking, and other navigation scenarios. Adjust keyboard navigation capabilities during setup to optimize user experience in environments requiring non-pointer input or improved accessibility compliance.
</div>

#### Example - keyboard navigation

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        navigatable: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### volume `Number` *(default: 100)*

A value between 0 and 100 that specifies the volume of the video.


<div class="meta-api-description">
How can I dynamically adjust the volume of media content in a Kendo UI MediaPlayer widget? Control and set audio loudness or playback sound level for media content by configuring the audio output volume percentage, allowing dynamic adjustment of media playback audio intensity from silent (0) to full scale (100), enabling developers to fine-tune sound levels, manage volume settings programmatically, adjust media player loudness, and customize audio experience during video or audio playback by specifying numeric volume levels within a defined range.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        volume: 50,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

#### Example - set volume

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        volume: 50,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

## Methods

### fullScreen

Gets or sets the fullscreen mode of the widget.


<div class="meta-api-description">
How do I programmatically enable fullscreen mode in Kendo UI MediaPlayer? Manage fullscreen mode for video or media playback by checking if the player is currently fullscreen or by programmatically enabling, disabling, toggling, setting, or querying fullscreen state. Control immersive viewing experiences by entering or exiting fullscreen display via code, determine fullscreen status with boolean responses, configure fullscreen behavior dynamically, and handle user interface adjustments related to fullscreen video or media content in applications.
</div>

#### Example

    <div id="mediaplayer"></div> 
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });

    setTimeout(function(){ 
        // get a reference to the media player widget
        var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
        // check if the media player is currently in fullscreen mode
        mediaPlayer.fullScreen();
        // force the widget to enter fullscreen
        mediaPlayer.fullScreen(true);
    }, 1000)    

    </script> 

#### Parameters

##### value `Boolean`

The value that indicates whether the widget should enter or exit fullscreen.

#### Returns

`Boolean` The current fullscreen configuration.

### media

Gets or sets the information about the media that is loaded in the widget.


<div class="meta-api-description">
How do I update the media information in a Kendo UI MediaPlayer widget? Retrieve or update the media information associated with the media player, enabling developers to get current media metadata, set new media sources, modify playback content dynamically, load media programmatically, inspect or change media details such as URLs, titles, and metadata within the component, control or bind media data during runtime, and manage media state by fetching or applying updated media information objects.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
      $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
      });
      // get a reference to the media player widget
      var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
      // check the currently loaded media
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(mediaPlayer.media());
      // change the media loaded in the widget
      setTimeout(function () {
            mediaPlayer.media({
                title: "Responsive Website Delivers for Reeves Import Motorcars",
                poster: "http://img.youtube.com/vi/DYsiJRmIQZw/1.jpg",
                source: "https://www.youtube.com/watch?v=DYsiJRmIQZw"
            });
      }, 1000);      
    </script>

#### Parameters

##### value `Object`

The media configuration to load in the MediaPlayer. Accepts the same values as the [`media`](/api/javascript/ui/mediaplayer/configuration/media) option.

#### Returns

`Object` The current media configuration.

### volume

Gets or sets a value between 0 and 100 that specifies the volume of the video.


<div class="meta-api-description">
How do I adjust the volume in Kendo UI MediaPlayer? Control audio output levels by retrieving or specifying the playback volume, allowing you to set sound intensity from silent to maximum or query current sound settings, adjust media volume dynamically, change audio levels on the fly, modify sound output strength, manage loudness settings, and fine-tune or monitor video or audio playback volume using numerical values or commands to increase, decrease, or check audio intensity during media playback operations.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    
    setTimeout(function () {
        // get a reference to the media player widget
        var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
        // check the current volume of the player
        mediaPlayer.volume();
        // sets the current volume to 50
        mediaPlayer.volume(50);
      }, 1000);
    </script>

#### Parameters

##### value `Number`

The value between 0 and 100 that specifies the volume of the player.

#### Returns

`Number` The current volume configuration.

### mute

The value that indicates whether the player is muted.


<div class="meta-api-description">
How do I programmatically mute or unmute audio in Kendo UI MediaPlayer? Control or query the audio output silence state by toggling mute on or off, enabling programmatic muting, unmuting, silencing, or restoring sound in media playback scenarios, syncing mute status with user interface elements like mute buttons or volume sliders, detecting if audio is currently suppressed for conditional behavior, managing audio output muting dynamically, and adjusting media player sound settings through boolean flags indicating muted or unmuted conditions.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    setTimeout(function () {
        var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");

        // mute the audio
        mediaPlayer.mute(true);
        //gets if the player is currently muted
        mediaPlayer.mute();
        // unmute the audio
        mediaPlayer.mute(false);
      }, 1000);
    </script>

#### Parameters

##### value `Boolean`

The value indicates if the sound has to be muted.

#### Returns

`Boolean` The current mute configuration.

### isEnded

Gets a value indicating whether the media has finished playing.


<div class="meta-api-description">
How to check if Kendo UI media player has finished playing? Check if media playback is complete or has reached the end by using a method that returns a true/false status indicating whether the video or audio has fully finished playing. Developers often need to detect playback completion for triggering next steps like loading new content, updating user interface elements, or synchronizing media sequences. This enables queries to determine if the media is still playing, paused, or has completed, supporting polling loops, event conditions, or state checks in media player components and applications. Use this boolean check to control playback flow, validate media end status, or conditionally execute code based on whether the current track or video has ended.
</div>

#### Example

    <div id="mediaplayer"></div>
    <button id="checkEnded">Check if ended</button>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    
    $("#checkEnded").click(function() {
        var mediaplayer = $("#mediaplayer").data("kendoMediaPlayer");
        console.log("Media ended: " + mediaplayer.isEnded());
    });
    </script>

#### Returns

`Boolean` A value indicating whether the media has finished playing.


```
    <div id="mediaplayer" />
    <script>
          $("#mediaplayer").kendoMediaPlayer({
            autoPlay: true,
            media: {
              title: "Kendo UI for jQuery: Welcome and Overview",
              source: "https://www.youtube.com/watch?v=UbkbVBNYZMc",
            },
          });
          setTimeout(function () {
            var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
            // check if the video has finished
            console.log(mediaPlayer.isEnded());
          },1000);         
    </script>
```

### isPaused

Gets a value indicating whether the media is paused, stopped, or ended.


<div class="meta-api-description">
How to check if Kendo UI MediaPlayer is currently paused in real-time? Check if media playback is currently inactive, paused, stopped, or ended by querying the playback state synchronously to instantly determine whether to update UI elements like play/pause buttons, control playback flow, manage resume or cleanup operations, or handle playback state-dependent logic in real time.
</div>

#### Returns

`Boolean` A value indicating whether the media is paused, stopped, or ended.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // check if the video has paused
    mediaPlayer.isPaused();
    </script>

### isPlaying

Gets a value indicating whether the media is currently playing.


<div class="meta-api-description">
How to check if media is currently playing in Kendo UI for jQuery MediaPlayer? Check whether audio or video playback is currently active, playing, running, or ongoing by querying the media player's state to determine if media is paused, stopped, idle, or buffering. Use this to detect playback status, monitor if media is currently streaming or halted, enable UI elements for play/pause toggles, trigger conditional logic based on active playback, perform analytics on whether content is live or inactive, and confirm if media has started without controlling or altering the playback itself. This method returns a true/false boolean indicating whether media is actively playing versus paused or not loaded.
</div>

#### Returns

`Boolean` A value indicating whether the media is currently playing.

#### Example

    <div id="mediaplayer"></div>
    <script>
          $("#mediaplayer").kendoMediaPlayer({
            autoPlay: true,
            media: {
              title: "Kendo UI for jQuery: Welcome and Overview",
              source: "https://www.youtube.com/watch?v=UbkbVBNYZMc",
            },
          });
          setTimeout(function () {
            var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
            // check if the video is playing
            console.log(mediaPlayer.isPlaying());
          },1000);
    </script>

### pause

Pauses the currently played video.


<div class="meta-api-description">
How do I pause video playback in Kendo UI for jQuery? Halt or suspend video or audio playback temporarily while keeping the current playback position intact, enabling resuming from the exact point later; implement programmatic or user-driven pausing of media streams, video players, or audio content to control playback flow or handle interruptions without losing your spot, allowing seamless transition between play and pause states in media components or applications.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    setTimeout(function(){
        // get a reference to the media player widget
        var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
        // pauses the video
        mediaPlayer.pause();        
    },1000)
    </script>

### play

Forces the video to start playing.


<div class="meta-api-description">
How do I programmatically start playing a video with Kendo UI MediaPlayer? Trigger or initiate media playback on a video or audio player component by starting, resuming, or continuing the current playback session from a paused or stopped state. Enable, set, or control the media player to begin playing content programmatically, including starting videos, resuming paused streams, activating autoplay sequences, or responding to user commands and custom interface controls that manage play and pause states, ensuring seamless media streaming or playback control within applications.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    
    setTimeout(function () {
        // get a reference to the media player widget
        var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
        // Starts the playing of the video
        mediaPlayer.play();
    }, 1000);
    </script>

### seek

Proceeds the video to a certain time.


<div class="meta-api-description">
How do I change the playback position of a video in a Kendo UI MediaPlayer control? Control video playback position by jumping, seeking, or scrubbing to a specific timestamp; set or update the current playback time whether the video is playing or paused, enabling rewind, fast-forward, skip to a given timecode, or precise navigation within the media timeline to customize where playback starts or resumes.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    setTimeout(function(){
        // get a reference to the media player widget
        var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
        // Starts playing the video at the first second
        mediaPlayer.seek(1000);
    },1000)
    
    </script>

#### Parameters

##### milliseconds `Number`

The time offset in milliseconds.

#### Returns

`Number` The current seek configuration.

### stop

Stops the currently played video.


<div class="meta-api-description">
How can I programmatically stop Kendo UI MediaPlayer playback instantly? Halt or terminate current video playback instantly, stop the media stream from playing, cease rendering frames immediately, end active media output during runtime, control or interrupt video playback programmatically, disable ongoing playback on demand, cancel media stream execution in response to user input or app events, pause and prevent further video frame display, enforce immediate video stop without delay, and manage playback flow by stopping active media output dynamically.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Stop the video
    mediaPlayer.stop();
    </script>

### titlebar

Gets a reference to the title bar.


<div class="meta-api-description">
How do I customize the title bar of a Kendo UI MediaPlayer? Retrieve and control the media player’s title bar element to dynamically update text, change styling or CSS classes, toggle display visibility, add or remove event listeners, insert custom buttons or controls, modify accessibility attributes, and adjust layout or behavior programmatically after initialization, enabling fine-grained customization of the header area including text content changes, style overrides, interaction handling, visibility toggling, and UI enhancements.
</div>

#### Returns

`jQuery` The title bar of the media player.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // get a reference to the title bar
    mediaPlayer.titlebar();
    </script>

### toolbar

Gets a reference to the toolbar.


<div class="meta-api-description">
How do I customize the toolbar in Kendo UI MediaPlayer? Configure, customize, or retrieve the media player's toolbar interface to add or remove buttons, modify layouts, update toolbar items dynamically, control visibility toggling, and attach event listeners or handlers for interaction. Enable querying and manipulation of toolbar elements or API references to adjust controls, customize user interface components, and manage toolbar behavior during runtime or initialization. Ideal for developers seeking to programmatically set up, extend, or interact with toolbar features and elements within media playback environments.
</div>

#### Returns

`kendo.ui.ToolBar` The tool bar of the media player.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // get a reference to the toolbar
    mediaPlayer.toolbar();
    </script>

## Events

### end

Fires when the media finishes playing.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect when media playback is complete in Kendo UI for jQuery Mediaplayer? Detect when media playback completes to trigger actions such as cleaning up resources, updating user interfaces, advancing to the next track, resetting playback controls, logging analytics, and managing end-of-media workflows. Capture, listen for, or handle completion events to orchestrate seamless transitions between media items, synchronize state changes, execute custom code at the end of playback, or perform any finalization logic when audio or video finishes playing in a media component.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" },
        end: function(){
            //handle event
        }
    });
    </script>

### pause

Fires when the media is paused.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when media playback is paused in Kendo UI for jQuery? Detect when media playback is paused through event listeners that trigger on play stoppage, whether caused by user actions or programmatic commands, enabling handling of pause state changes for updating user interfaces, controlling timers, managing playback progress, saving current playback position, or executing custom pause-related functions; event handlers can access the media player instance context to interact with its methods and properties, supporting scenarios such as detecting playback interruptions, responding to user pause inputs, synchronizing UI elements with pause state, or implementing conditional logic when the video or audio is halted.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" },
        pause: function(){
            //handle event
        }
    });
    </script>

### play

Fires when the media begins playing.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I trigger an action when a video starts playing with Kendo UI MediaPlayer? Detect when media playback starts by listening for the media player’s play event or playback start trigger to execute code at the moment video or audio begins playing, enabling actions such as initiating timers, firing analytics tracking, updating UI elements, synchronizing linked components, or handling playback state changes immediately as media starts. Capture and respond to playback initiation events, playback started callbacks, or play signals from media components to run functions when streaming, audio, video, or media content commences, ensuring integration with other interface elements or tracking mechanisms at the exact instant of play.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" },
        play: function(){
            //handle event
        }
    });
    </script>

### ready

Fires when loading is over and the widget is ready to start playing the media.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when media loading is complete in Kendo UI MediaPlayer? Detect when media loading is complete, trigger playback start, initialize related processes, update user interfaces, respond to media readiness, handle events signaling that media content is fully buffered and the player is ready to play, manage loading completion callbacks, enable timed actions once media is prepared, control playback triggering post-load, and listen for readiness events to synchronize UI components or start media automatically after loading finishes.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" },
        ready: function(){
            //handle event
        }
    });
    </script>

### timeChange

Fires when the user selects a new play time.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect user-driven changes in media playback position with Kendo UI MediaPlayer? Detect and handle user-driven changes in playback position during media playback, capturing events triggered when users seek, scrub, or adjust the playhead via progress bars, sliders, or time selectors. Enable synchronizing captions, updating playback interfaces, persisting or restoring playback progress, triggering analytics or logging playback time jumps, controlling media timing dynamically, and responding immediately to user interactions that shift the current media timestamp. React to time change events to monitor or manipulate playback advancement, implement custom seek behaviors, or coordinate timed media features based on user-initiated position updates within video or audio content.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" },
        timeChange: function(){
            //handle event
        }
    });
    </script>

### volumeChange

This event is fired upon changing the volume level.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I detect changes in volume levels when using Kendo UI for jQuery's MediaPlayer control? Monitor and react to changes in audio volume levels by capturing events that trigger when sound output is adjusted either manually by users or programmatically through code, enabling synchronization with user interface components, updating volume indicators, saving audio preferences, implementing dynamic audio control features, and responding instantly to real-time volume shifts during playback on media players.
</div>

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" },
        volumeChange: function(){
            //handle event
        }
    });
    </script>
