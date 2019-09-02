---
title: Overview
page_title: MediaPlayer Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI MediaPlayer for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/mediaplayer
slug: htmlhelpers_mediaplayer_aspnetcore
position: 1
---

# MediaPlayer Overview

The Telerik UI MediaPlayer HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MediaPlayer widget.

The MediaPlayer plays video files from static sources or streams online YouTube videos and enriches your website with dynamic content in a user-friendly interface. It provides a styled video UI functionality by using the HTML5 `<video>` element and brings powerful media capabilities to your applications without the necessity of installing additional plug-ins.

To respond to cutting-end design practices and trends, the MediaPlayer component provides a responsive layout. This means that its size adapts depending on the capabilities of the client (end user) device and browser. The component automatically resizes its area to display the video in the most suitable possible way within the provided dimensions. The responsive web design of the MediaPlayer is shipped out-of-the-box and intends to save you time and efforts when developing your responsive applications.

You can find the following sections in this article:

* [Initializing the MediaPlayer](#initializing-the-mediaplayer)
* [Events](#events)
	* [Handling Events by Handler Name](#handling-events-by-handler-name)
	* [Handling Events by Template Delegate](#handling-events-by-template-delegate)
* [Referencing Existing Instances](#referencing-existing-instances)


## Initializing the MediaPlayer

Once your video files are ready, initialize the MediaPlayer HtmlHelper. It will render a `div` element as its wrapper container.

```
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

> **Important**
>
> The example on initializing the MediaPlayer above uses the `AutoPlay` property. Because of the [mobile considerations listed in this article](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations), browsers on iOS do not automatically play embedded media. This limitation prevents unsolicited downloads over cellular networks at the expense of the user. The user always has to initiate a playback. For more information on this behavior, refer to [the article on audio and video HTML](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html). There are other functionalities which may be limited due to iOS restrictions. For more information on this topic, refer to [this article](http://blog.millermedeiros.com/unsolved-html5-video-issues-on-ios/) and to other available resources on the Web.



## Events

You can subscribe to all [events the underlying widget exposes](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer#events). For a complete example on hooking the MediaPlayer events through the HtmlHelper, refer to the [demo on using the events of the MediaPlayer](https://demos.telerik.com/aspnet-core/mediaplayer/events).

### Handling Events by Handler Name

The following example demonstrates how to subscribe to events by using a handler name.

```
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
<script>
    function playerPause(e) {
        // Handle the pause event.
    }
    function playerVolumeChange(e) {
        // Handle the volumeChange event.
    }
</script>
```

### Handling Events by Template Delegate

The following example demonstrates how to subscribe to events by using a template delegate.

```
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

To access an existing MediaPlayer instance, use the `.data()` jQuery method, executed by the jQuery object of the originating element. Once you have the reference, you can use the [client-side methods the widget exposes](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer#methods).

```
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
        var player = $("#mediaplayer1").data("kendoMediaPlayer");
        player.pause();
    }
</script>
```

## See Also

* [Live Demos: MediaPlayer](https://demos.telerik.com/aspnet-core/mediaplayer/index)
* [HtmlHelper API Reference](https://docs.telerik.com/aspnet-core/api/mediaplayer)

