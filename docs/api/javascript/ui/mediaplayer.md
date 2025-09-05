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

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        fullScreen: true,
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

#### Enable fullscreen

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

#### Example - specify a video

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### media.source `String`

String or an array of objects that hold the URL or URLs of the videos.

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

#### Example - specify a video

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### messages `Object`

The object which holds the localization strings.

#### Example

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

### messages.pause `String`

**Pause** button tooltip message.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            pause: "Pause Video"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### messages.play `String`

**Play** button tooltip message.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            play: "Play Video"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### messages.mute `String`

**Mute** button tooltip message.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            mute: "Mute Audio"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### messages.unmute `String`

**Unmute** button tooltip message.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            unmute: "Unmute Audio"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### messages.quality `String`

**Quality** button tooltip message.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            quality: "Video Quality"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### messages.fullscreen `String`

**Fullscreen** button tooltip message.

#### Example

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        messages: {
            fullscreen: "Enter Fullscreen"
        },
        media: { title: "Kendo UI for jQuery: Welcome and Overview", source: "https://www.youtube.com/watch?v=UbkbVBNYZMc" }
    });
    </script>

### mute `Boolean` *(default: false)*

If set to `true`, the video will be played without sound.

#### Example - enable fullscreen

    <div id="mediaplayer"></div>
    <script>
    $("#mediaplayer").kendoMediaPlayer({
        mute: true,
        media: { title: "Digital Transformation: A New Way of Thinking", source: "https://www.youtube.com/watch?v=gNlya720gbk" }
    });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true`, the option enables the keyboard navigation for the widget.

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
      mediaPlayer.media({
                    title: "Responsive Website Delivers for Reeves Import Motorcars",
                    poster: "http://img.youtube.com/vi/DYsiJRmIQZw/1.jpg",
                    source: "https://www.youtube.com/watch?v=DYsiJRmIQZw"
                });
    </script>

#### Parameters

##### value `Object`

The media configuration to load in the MediaPlayer. Accepts the same values as the [`media`](/api/javascript/ui/mediaplayer/configuration/media) option.

#### Returns

`Object` The current media configuration.

### volume

Gets or sets a value between 0 and 100 that specifies the volume of the video.

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
