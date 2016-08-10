---
title: Overview
page_title: Overview | Kendo UI MediaPlayer
description: "Learn how to initialize the Kendo UI MediaPlayer widget and apply its other options."
slug: overview_kendoui_mediaplayer_widget
position: 1
---

# MediaPlayer Overview

The [Kendo UI MediaPlayer widget](http://demos.telerik.com/kendo-ui/mediaplayer/index)   can be used for presenting video files from static sources or streaming online YouTube clips to enrich your web site with dynamic content in a user-friendly interface. It provides a styled video UI functionality using the HTML5 `<video>` element to bring powerful media capabilities to your apps without the necessity of installing additional plug-ins.

 The player also offers tight integration with YouTube media provider.  It comes with the familiar and straightforward way to use Kendo UI widgets to deliver rich media web experience for websites, blogs, online TV channels, e-commerce pages, etc. In addition to the consistent and elegant built-in skins, this new addition to the bundle possesses the main feature of every Kendo UI widget - arms the developer with a useful and convenient tool designed for achieving fascinating results in a sharp time frame.  

![Media Player](/images/mediaplayer-overview1.png)

**Key Features**
* Play HTML5 video
* Play YouTube video
* Elegant Skins
* Timeline slider with buffer indicator allowing users to navigate the video
* Title bar
* Volume control and FullScreen button
* HD source support

The Kendo MediaPlayer widget allows users to play any HTML5-supported video format. Users can take advantage of the rich built-in toolbar to play or pause the video, control the volume, switch to FullScreen mode and more.

Note that the content of this article necessitates your understanding of the [fundamental Kendo UI widget concepts]({% slug initialize_widgets_using_jquery_plugins_installation %}).

## Getting Started

When using local sources, you will need to take into consideration the supported video formats by the different browsers. You can check various sources over the net about the [current supported HTML5 video formats](http://www.w3schools.com/html/html5_video.asp).

### Initialize the MediaPlayer

Once the video files are ready, you can proceed with creating the MediaPlayer widget. You will just need a div element.

```html
<div id="mediaplayer1" style="width:640px; height: 360px;"></div>
<script>
    $("#mediaplayer1").kendoMediaPlayer({
        autoPlay: true,
        media: {
            title: "Our Company Culture - Lesson 1",
            source: "Video/video1.mp4"
        }
    });
</script>
```

Adding multiple sources for the same video is available only for the quality dependent [HD feature]({% slug overview_kendoui_mediaplayer_widget#configuration-adding %}).

>note
The example above uses the `autoPlay` property. Per these [Mobile Considerations](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations), embedded media cannot be played automatically in Safari on iOS. This is to prevent unsolicited downloads over cellular networks at the user’s expense. The user always has to initiate playback. Further information can be found [here](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html).


## Keyboard support

The player supports keyboard navigation. You can enable it using the [navigatable](/api/javascript/ui/mediaplayer#configuration-navigatable) property. You can find a list of the built-in keyboard commands below.

*	`Enter` – opens the video in FullScreen
*	`Esc` – exits FullScreen mode
*	`Space` – toggles play / pause
*	`M` – toggles mute / unmute


## Localization

The player provides a way to localize the tooltip texts in its interface by using configuration options.

```html
<div id="mediaplayer1" style="width:640px; height: 360px;"></div>
<script>
    $("#mediaplayer1").kendoMediaPlayer({
        autoPlay: true,
        messages: {
            play: "Wiedergabe",
            pause: "Pausieren"
        },
        media: {
            title: "Herbert Grönemeyer - Der Weg",
            source: "Video/video1.mp4"
        }
    });
</script>
```

You can find a complete list of [localizable messages](/api/javascript/ui/mediaplayer#configuration-messages) in the configuration API page.

For convenience, Kendo widgets also offer the possibility of adding script files to implement [global localization](http://docs.telerik.com/kendo-ui/framework/localization/overview) for your application. The available options for the MediaPlayer are the same messages.

## Configuration

The MediaPlayer widget provides straightforward properties, methods and events to match your specific preferences. For a full list of options, please refer to the [MediaPlayer JavaScript API](/api/javascript/ui/mediaplayer).

### Adding Multiple Sources for Quality HD Feature

Adding multiple sources for the video will automatically display an HD button in the bottom right corner, right next to the FullScreen button. This will enable the users to choose their preferred quality.

```html
<div id="mediaplayer1" style="width:640px; height: 360px;"></div>
<script>
    $("#mediaplayer1").kendoMediaPlayer({
        autoPlay: true,
        media: {
            title: "Our Company Culture - Lesson 1",
            source: [
                { quality: "480p", url: "Video/video1.mp4" },
                { quality: "720p", url: "Video/video2.mp4" }]
        }
    });
</script>
```

### Changing the Source Dynamically

It is a common scenario for the player to feature a different video based on some user action. Please refer to the [Creating Playlist]({% slug overview_kendoui_mediaplayer_widget#creating %}) section for a basic example, as well as, real-time implementation.

### Prevent Seeking Forward

Often application or business logic enforces the user to watch only the currently loaded content, without jumping forward. The MediaPlayer provides the [forwardSeek](/api/javascript/ui/mediaplayer.md#forwardseek-boolean-default-true), which helps with achieving this requirement.

### Accessing Existing Instances

Similar to all other Kendo UI widgets, you can access an existing MediaPlayer instance via the `.data()` jQuery method, executed by the jQuery object of the originating element. The example below demonstrates how to access a MediaPlayer instance.


```html
<button onclick="buttonClick();">Pause Video</button>
<div id="mediaplayer1" style="width:640px; height: 360px;"></div>
<script>
    $("#mediaplayer1").kendoMediaPlayer({
        autoPlay: true,
        media: {
            title: "Our Company Culture - Lesson 1",
            source: "Video/video1.mp4"
        }
    });
    function buttonClick() {
        var player = $("#mediaplayer1").data("kendoMediaPlayer");
        player.pause();
    }
</script>
```

## Creating a Playlist

By changing the source of the MediaPlayer dynamically, you can implement your own Playlist structures. Please check the [MediaPlayer Playlist](http://demos.telerik.com/kendo-ui/mediaplayer/playlist) live sample as a starting reference. It uses the Kendo UI ListView widget to create a list to hold the videos just next to the player element.

Here is a basic way of changing the source of the player.
```javascript
function buttonClick() {
    var player = $("#mediaplayer1").data("kendoMediaPlayer");
    player.media({
        title: "Our Company Culture - Lesson 2",
        source: "Video/video2.mp4"
    });
}
```

## See Also

* [MediaPlayer Live Sample](http://demos.telerik.com/kendo-ui/mediaplayer/index)
* [MediaPlayer JavaScript API Reference](/api/javascript/ui/mediaplayer)
* [Overview of the ASP.NET MVC HtmlHelper Extension for the MediaPlayer Widget]({% slug overview_mediaplayerhelper_aspnetmvc %})
* [Overview of the MediaPlayer JSP Tag]({% slug overview_mediaplayer_uiforjsp %})
* [Overview of the MediaPlayer PHP Class]({% slug overview_mediaplayer_uiforphp %})
