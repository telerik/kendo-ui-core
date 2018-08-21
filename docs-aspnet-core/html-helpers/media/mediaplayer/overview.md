---
title: Overview
page_title: MediaPlayer | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI MediaPlayer for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/mediaplayer
slug: htmlhelpers_mediaplayer_aspnetcore
position: 1
---

# MediaPlayer Overview

The MediaPlayer HtmlHelper extension is a server-side wrapper for the [Kendo UI MediaPlayer](https://demos.telerik.com/kendo-ui/mediaplayer/index) widget.

It plays video files from static sources or streams online YouTube videos and enriches your website with dynamic content in a user-friendly interface. It provides a styled video UI functionality by using the HTML5 `<video>` element and brings powerful media capabilities to your applications without the necessity of installing additional plug-ins.

To respond to cutting-end design practices and trends, the MediaPlayer component provides a responsive layout. This means that its size adapts depending on the capabilities of the client (end user) device and browser. The component automatically resizes its area to display the video in the most suitable possible way within the provided dimensions. The responsive web design of the MediaPlayer is shipped out-of-the-box and intends to save you time and efforts when developing your responsive applications.

For more information on the HtmlHelper, refer to the article on the [MediaPlayer HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/mediaplayer/overview).

## Key Features

The Kendo UI MediaPlayer widget:

* Plays any HTML5-supported video formats.
* Plays YouTube videos.
* Delivers a set of elegant skins.
* Delivers a rich built-in toolbar to play or pause the video, control the volume, switch to **FullScreen** mode, and others.
* Displays a timeline slider with a buffer indicator allowing you to navigate the video.
* Displays a title bar.
* Ships HD source support.

## Getting Started

When using local sources, consider the video formats supported by the different browsers. For more information on the current supported HTML5 video formats, refer to [this article](http://www.w3schools.com/html/html5_video.asp) and to other resources on the Web.

### Initialize the MediaPlayer

Once the video files are ready, initialize the MediaPlayer HtmlHelper. It will render a `div` element as its wrapper container.

###### Example

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

## Configuration

The MediaPlayer provides properties, methods, and events to match your specific preferences. For more information on its configuration options, refer to the [MediaPlayer API documentation](http://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer).

### Access Existing Instances

To access an existing MediaPlayer instance, use the `.data()` jQuery method, executed by the jQuery object of the originating element.

The following example demonstrates how to access an existing MediaPlayer instance.

###### Example

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

## Event Handling

You can subscribe to all [MediaPlayer events](http://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer#events).

### By Handler Name

The examples below demonstrates how to subscribe to events using a handler name.

###### Example

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

### By Template Delegate

The following example demonstrates how to subscribe to events using a template delegate.

###### Example

```
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Events(e =>
        e.Pause(@<text>
            function(e) {
            //Handle the pause event inline.
            }
        </text>)
       .VolumeChange(@<text>
            function(e) {
            //Handle the volumeChange event inline.
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

* [MediaPlayer HtmlHelper for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/mediaplayer/overview)
* [MediaPlayer Official Demos](http://demos.telerik.com/aspnet-core/mediaplayer/index)
* [Overview of the Kendo UI MediaPlayer Widget](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview)
* [MediaPlayer JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
