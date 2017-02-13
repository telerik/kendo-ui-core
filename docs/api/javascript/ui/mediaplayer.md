---
title: MediaPlayer
page_title: Configuration, methods and events of Kendo UI MediaPlayer
description: Code examples and tips how to configure MediaPlayer widget, use available methods and events.
---

# kendo.ui.MediaPlayer

Represents the Kendo UI MediaPlayer widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoPlay `Boolean` *(default: false)*

If set to `true`, the widget will start playing the video or videos after initializing.

#### Example - enable automatic play

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### autoRepeat `Boolean` *(default: false)*

If set to `true`, the widget will start playing the video or videos after initializing.

#### Example - enable automatic play

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoRepeat: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### forwardSeek `Boolean` *(default: true)*

If set to `false`, the user will be prevented from seeking the video forward.

#### Example - enable fullscreen

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        forwardSeek: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### fullScreen `Boolean` *(default: false)*

If set to `true`, the widget will enter fullscreen mode.

#### Example - enable fullscreen

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        fullScreen: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### media `Object`

The object which holds the information about the media that will be played by the control.

#### Example - specify a video

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### media.source `String`

String or an array of objects that hold the URL or URLs of the videos.

#### Example - specify a video

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

#### Example - specify a video with alternative sources

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: {
            title: "Digital Transformation: A New Way of Thinking",
            source: [ { quality: "480p", url: "The480pVideoURL" }, { quality: "720p", url: "The720pVideoURL" } ]
        }
    });
    </script>

### media.title `String`

Specifies the title of the media that will be played.

#### Example - specify a video

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### messages `Object`

The object which holds the localization strings.

### messages.pause `String`

**Pause** button tooltip message.

### messages.play `String`

**Play** button tooltip message.

### messages.mute `String`

**Mute** button tooltip message.

### messages.unmute `String`

**Unmute** button tooltip message.

### messages.quality `String`

**Quality** button tooltip message.

### messages.fullscreen `String`

**Fullscreen** button tooltip message.

### mute `Boolean` *(default: false)*

If set to `true`, the video will be played without sound.

#### Example - enable fullscreen

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        mute: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true`, the option enables the keyboard navigation for the widget.

#### Example - keyboard navigation

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        navigatable: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### volume `Number` *(default: 100)*

A value between 0 and 100 that specifies the volume of the video.

#### Example - set volume

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        volume: 50,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

## Methods

### fullScreen

Gets or sets the fullscreen mode of the widget.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // check if the media player is currently in fullscreen mode
    mediaPlayer.fullScreen();
    // force the widget to enter fullscreen
    mediaPlayer.fullScreen(true);
    </script>

#### Parameters

##### value `Boolean`

The value that indicates whether the widget should enter or exit fullscreen.

### volume

Gets or sets a value between 0 and 100 that specifies the volume of the video.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // check the current volume of the player
    mediaPlayer.volume();
    // sets the current volume to 50
    mediaPlayer.volume(50);
    </script>

#### Parameters

##### value `Number`

The value between 0 and 100 that specifies the volume of the player.

### mute

The value that indicates whether the player is muted.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");

    // mute the audio
    mediaPlayer.mute(true);
    //gets if the player is currently muted
    mediaPlayer.mute();
    // unmute the audio
    mediaPlayer.mute(false);
    </script>

#### Parameters

##### value `Boolean`

The value indicates if the sound has to be muted.

### isEnded

Gets a value indicating whether the media has finished playing.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // check if the video has finished
    mediaPlayer.isEnded();
    </script>

### isPaused

Gets a value indicating whether the media is paused, stopped, or ended.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // check if the video has paused
    mediaPlayer.isPaused();
    </script>

### isPlaying

Gets a value indicating whether the media is currently playing.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // check if the video is playing
    mediaPlayer.isPlaying();
    </script>

### pause

Pauses the currently played video.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // pauses the video
    mediaPlayer.pause();
    </script>

### play

Forces the video to start playing.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Starts the playing of the video
    mediaPlayer.play();
    </script>

### seek

Proceeds the video to a certain time.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Starts playing the video at the first second
    mediaPlayer.seek(1000);
    </script>

#### Parameters

##### milliseconds `Number`

The time offset in milliseconds.

### stop

Stops the currently played video.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // Stop the video
    mediaPlayer.stop();
    </script>

### titlebar

Gets a reference to the title bar.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    // get a reference to the media player widget
    var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
    // get a reference to the title bar
    mediaPlayer.titlebar();
    </script>

### toolbar

Gets a reference to the toolbar.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
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

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" },
        end: function(){
            //handle event
        }
    });
    </script>

### pause

Fires when the media is paused.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" },
        pause: function(){
            //handle event
        }
    });
    </script>

### play

Fires when the media begins playing.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" },
        play: function(){
            //handle event
        }
    });
    </script>

### ready

Fires when loading is over and the widget is ready to start playing the media.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" },
        ready: function(){
            //handle event
        }
    });
    </script>

### timeChange

Fires when the user selects a new play time.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" },
        timeChange: function(){
            //handle event
        }
    });
    </script>

### volumeChange

This event is fired upon changing the volume level.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Example

    <div id="mediaplayer" />
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        autoPlay: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" },
        volumeChange: function(){
            //handle event
        }
    });
    </script>
