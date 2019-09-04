---
title: Overview
page_title: MediaPlayer Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI MediaPlayer for ASP.NET MVC."
slug: overview_mediaplayerhelper_aspnetmvc
position: 1
---

# MediaPlayer Overview

The Telerik UI MediaPlayer HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MediaPlayer widget.

The MediaPlayer plays video files from static sources or streams online YouTube videos and enriches your website with dynamic content in a user-friendly interface. It provides a styled video UI functionality by using the HTML5 `<video>` element and brings powerful media capabilities to your applications without the necessity of installing additional plug-ins.

To respond to cutting-end design practices and trends, the MediaPlayer component provides a responsive layout. This means that its size adapts depending on the capabilities of the client (end user) device and browser. The component automatically resizes its area to display the video in the most suitable possible way within the provided dimensions. The responsive web design of the MediaPlayer is shipped out-of-the-box and intends to save you time and efforts when developing your responsive applications.

* [Demo page for the MediaPlayer](https://demos.telerik.com/aspnet-mvc/mediaplayer)

## Initializing the MediaPlayer

Once your video files are ready, initialize the MediaPlayer HtmlHelper. It will render a `div` element as its wrapper container.

The following example uses the `autoPlay` property:
* Because of the [mobile considerations](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations), browsers on iOS do not automatically play embedded media. This limitation prevents unsolicited downloads over cellular networks at the expense of the user. The user always has to initiate a playback. For more information, refer to the article on [audio and video HTML](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html).
* Other functionalities may also be limited due to iOS restrictions. For more information, refer to [this article](http://blog.millermedeiros.com/unsolved-html5-video-issues-on-ios/) and to other available resources on the Web.

```Razor
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source("Video/video1.mp4")
    )
)
```
```ASPX
<%= Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source("Video/video1.mp4")
    )
%>
```

## Functionality and Features

* [Adding multiple sources]({% slug multiplesources_mediaplayer_aspnetcore %})
* [Globalization]({% slug globalization_mediaplayer_aspnetmvc %})
* [Accessibility]({% slug mediaplayer_accessibility_aspnetmvc %})

## Events

You can subscribe to all MediaPlayer [events](/api/mediaplayer). For a complete example on basic MediaPlayer events, refer to the [demo on using the events of the MediaPlayer](https://demos.telerik.com/aspnet-mvc/mediaplayer/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events using a handler name.

```Razor
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Events(e =>
    {
        e.Pause("playerPause");
        e.VolumeChange("playerVolumeChange");
    })
    .Media(m => m
         .Title("Our Company Culture - Lesson 1")
         .Source("Video/video1.mp4")
    )
)
```
```ASPX
<%= Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Events(e =>
    {
        e.Pause("playerPause");
        e.VolumeChange("playerVolumeChange");
    })
    .Media(m => m
         .Title("Our Company Culture - Lesson 1")
         .Source("Video/video1.mp4")
    )
%>
```
```html
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

The following example demonstrates how to subscribe to events using a template delegate.

    @(Html.Kendo().MediaPlayer()
        .Name("mediaplayer1")
        .AutoPlay(true)
        .HtmlAttributes(new { style = "height:360px; width:640px" })
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
    )

## Referencing Existing Instances

To reference an existing MediaPlayer instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MediaPlayer client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer#methods) to control its behavior.

```Razor
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source("Video/video1.mp4")
    )
)
```
```ASPX
<%= Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source("Video/video1.mp4")
    )
%>
```
```html
<button onclick="buttonClick();">Pause Video</button>
<script>
    function buttonClick() {
        var player = $("#mediaplayer1").data("kendoMediaPlayer");
        player.pause();
    }
</script>
```

## See Also

* [Basic Usage of the MediaPlayer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/mediaplayer/index)
* [Using the API of the MediaPlayer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/mediaplayer/api)
* [Server-Side API](/api/mediaplayer)
