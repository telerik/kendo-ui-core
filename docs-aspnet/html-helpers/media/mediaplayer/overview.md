---
title: Overview
page_title: MediaPlayer Overview
description: "The Telerik UI MediaPlayer component for {{ site.framework }} provides a styled UI video and audio player."
previous_url: /helpers/html-helpers/mediaplayer, /helpers/media/mediaplayer/overview
slug: htmlhelpers_mediaplayer_aspnetcore
position: 0
---

# {{ site.framework }} MediaPlayer Overview

{% if site.core %}
The Telerik UI MediaPlayer TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI MediaPlayer widget.
{% else %}
The Telerik UI MediaPlayer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MediaPlayer widget.
{% endif %}

The MediaPlayer plays video files from static sources or streams online YouTube videos and enriches your website with dynamic content in a user-friendly interface. It provides a styled video UI functionality by using the HTML5 `<video>` element and brings powerful media capabilities to your applications without the necessity of installing additional plug-ins.

To respond to cutting-end design practices and trends, the MediaPlayer component provides a responsive layout. This means that its size adapts depending on the capabilities of the client (end user) device and browser. The component automatically resizes its area to display the video in the most suitable possible way within the provided dimensions. The responsive web design of the MediaPlayer is shipped out-of-the-box and intends to save you time and efforts when developing your responsive applications.

* [Demo page for the MediaPlayer](https://demos.telerik.com/{{ site.platform }}/mediaplayer/index)

The following image demonstrates a template of the MediaPlayer.

![{{ site.product_short }} Template of the MediaPlayer](images/mediaplayer-template.png)

## Initializing the MediaPlayer

Once your video files are ready, initialize the MediaPlayer. It will render a `div` element as its wrapper container.

The following example uses the `autoPlay` property:
* Because of the [mobile considerations](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations), browsers on iOS do not automatically play embedded media. This limitation prevents unsolicited downloads over cellular networks at the expense of the user. The user always has to initiate a playback. For more information, refer to the article on [audio and video HTML](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html).
* Other functionalities may also be limited due to iOS restrictions. For more information, refer to [this article](http://blog.millermedeiros.com/unsolved-html5-video-issues-on-ios/) and to other available resources on the Web.

```HtmlHelper
    @(Html.Kendo().MediaPlayer()
        .Name("mediaplayer")
        .AutoPlay(true)
        .Navigatable(true)
        .Media(m => m
            .Title("Our Company Culture - Lesson 1")
            .Source("Video/video1.mp4")
        )
        .HtmlAttributes(new { style = "height:360px; width:640px" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-mediaplayer name="mediaplayer"
        auto-play="true"
        navigatable="true"
        style = "height:360px; width:640px">
        <media title="Our Company Culture - Lesson 1" source="Video/video1.mp4" />
    </kendo-mediaplayer>
```
{% endif %}


## Basic Configuration

The following example demonstrates the basic configuration of the MediaPlayer.

```HtmlHelper
    @(Html.Kendo().MediaPlayer()
                .AutoPlay(true) // Start playing the video as soon as it loads.
                .Navigatable(true) // Enable the keyboard navigation.
                .AutoRepeat(true) // Loop the video.
                .ForwardSeek(false) // Disable forward seeking to ensure viewers will watch the entire video.
                .FullScreen(false) // When set to true, the player will automatically enter the full-screen mode.
                .Mute(true) // Start without sound.
                .Volume(20) // Preset the volume level (0 - 100).
                .Media(m => m // Define the media file - a YouTube video in this case.
                    .Title("Getting Started with {{ site.product }} on Windows")
                    .Source("https://www.youtube.com/watch?v=AIFNeWrZCdM")
                )
                .Name("mediaPlayer") // The name of the widget that is used for the ID and for referencing it at runtime.
                .HtmlAttributes(new { style = "height:360px; width:640px" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-mediaplayer 
        name="mediaplayer"
        auto-play="true"
        navigatable="true"
        auto-repeat="true"
        forward-seek="false"
        full-screen="false"
        mute="true"
        volume="20"
        style = "height:360px; width:640px">
        <media title="Our Company Culture - Lesson 1" source="Video/video1.mp4" />
    </kendo-mediaplayer>
```
{% endif %}


## Functionality and Features

* [Adding multiple sources]({% slug htmlhelpers_mediaplayer_multiplesources_aspnetcore %})&mdash;You can set different sources to the component simultaneously.
* [Globalization]({% slug globalization_mediaplayer_aspnetcore %})&mdash;The MediaPlayer provides localization capability.
* [Accessibility]({% slug htmlhelpers_mediaplayer_accessibility_overview_aspnetcore %})&mdash;The component was designed with accessibility in mind.

## Events

You can subscribe to all MediaPlayer [events](/api/mediaplayer). For a complete example on basic MediaPlayer events, refer to the [demo on using the events of the MediaPlayer](https://demos.telerik.com/{{ site.platform }}/mediaplayer/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by using a handler name.

```HtmlHelper
    @(Html.Kendo().MediaPlayer()
        .Name("mediaplayer")
        .AutoPlay(true)
        .Events(e =>
        {
            e.Pause("playerPause");
            e.VolumeChange("playerVolumeChange");
        })
        .Media(m => m
            .Title("Our Company Culture - Lesson 1")
            .Source("Video/video1.mp4")
        )
        .HtmlAttributes(new { style = "height:360px; width:640px" })
    )
```
{% if site.core %}
```TagHelper
    <kendo-mediaplayer name="mediaplayer"
        auto-play="true"
        on-pause="playerPause"
        on-volume-change="playerVolumeChange"
        style = "height:360px; width:640px">
        <media title="Our Company Culture - Lesson 1" source="Video/video1.mp4" />
    </kendo-mediaplayer>
```
{% endif %}
```JavaScript
    <script>
        function playerPause(e) {
            // Handle the pause event.
        }
        function playerVolumeChange(e) {
            // Handle the volumeChange event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```HtmlHelper
    @(Html.Kendo().MediaPlayer()
        .Name("mediaplayer")
        .AutoPlay(true)
        .Events(e =>
            e.Pause(@<text>
                function(e) {
                // Handle the pause event inline.
                }
            </text>)
        .VolumeChange(@<text>
                function(e) {
                // Handle the volumeChange event inline.
                }
            </text>)
        )
        .Media(m => m
            .Title("Our Company Culture - Lesson 1")
            .Source("Video/video1.mp4")
        )
        .HtmlAttributes(new { style = "height:360px; width:640px" })
    )
```

## Referencing Existing Instances

To reference an existing MediaPlayer instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MediaPlayer client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer#methods) to control its behavior.

```HtmlHelper
    @(Html.Kendo().MediaPlayer()
        .Name("mediaplayer")
        .AutoPlay(true)
        .Media(m => m
            .Title("Our Company Culture - Lesson 1")
            .Source("Video/video1.mp4")
        )
        .HtmlAttributes(new { style = "height:360px; width:640px" })
    )
    <button onclick="buttonClick();">Pause Video</button>
    <script>
        function buttonClick() {
            var player = $("#mediaplayer").data("kendoMediaPlayer");
            player.pause();
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-mediaplayer name="mediaplayer"
        auto-play="true"
        style = "height:360px; width:640px">
        <media title="Our Company Culture - Lesson 1" source="Video/video1.mp4" />
    </kendo-mediaplayer>
    <button onclick="buttonClick();">Pause Video</button>
    <script>
        function buttonClick() {
            var player = $("#mediaplayer1").data("kendoMediaPlayer");
            player.pause();
        }
    </script>
```
{% endif %}


## Next Steps

* [Getting Started with the MediaPlayer]({% slug aspnetcore_mediaplayer_getting_started %})
* [Basic Usage of the MediaPlayer for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/index)
{% if site.core %}
* [MediaPlayer in Razor Pages]({% slug razorpages_mediaplayer_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the MediaPlayer (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/api)
* [Knowledge Base Section](/knowledge-base)
