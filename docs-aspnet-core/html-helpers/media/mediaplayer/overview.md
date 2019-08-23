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

Among the key features of the MediaPlayer are the ability to play any HTML5-supported video formats, YouTube videos, sets of skins, rich built-in toolbar, **FullScreen** mode, timeline slider with a buffer indicator, and title bar.

* [Demo page for the MediaPlayer](https://demos.telerik.com/aspnet-core/mediaplayer/index)

## Initializing the MediaPlayer

Once the video files are ready, initialize the MediaPlayer HtmlHelper. It will render a `div` element as its wrapper container.

```
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source("Video/video1.mp4")
    )
)
```

## Referencing Existing Instances

To access an existing MediaPlayer instance, use the `.data()` jQuery method, executed by the jQuery object of the originating element.

```
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source("Video/video1.mp4")
    )
)
<button onclick="buttonClick();">Pause Video</button>
<script>
    function buttonClick() {
        var player = $("#mediaplayer1").data("kendoMediaPlayer");
        player.pause();
    }
</script>
```

## Events

You can subscribe to all MediaPlayer event. For a complete example on basic MediaPlayer events, refer to the [demo on using the events of the MediaPlayer](https://demos.telerik.com/aspnet-core/mediaplayer/events).

### Handling Events by Handler Name

The following example demonstrates how to subscribe to events by using a handler name.

```
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer")
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
```

## See Also

* [Basic Usage of the ScrollView HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/scrollview/index)
* [Using the API of the MediaPlayer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/mediaplayer/api)
* [Server-Side API](/api/treeview)
