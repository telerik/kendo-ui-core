---
title: Overview
page_title: Overview | Kendo UI MediaPlayer HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI MediaPlayer widget for ASP.NET MVC."
slug: overview_mediaplayerhelper_aspnetmvc
position: 1
---

# MediaPlayer Overview

The MediaPlayer HtmlHelper extension is a server-side wrapper for the [Kendo UI MediaPlayer](https://demos.telerik.com/kendo-ui/mediaplayer/index) widget.

The [Kendo UI MediaPlayer widget](http://demos.telerik.com/kendo-ui/mediaplayer/index) plays video files from static sources or streams online YouTube videos and enriches your website with dynamic content in a user-friendly interface. It provides a styled video UI functionality by using the HTML5 `<video>` element and brings powerful media capabilities to your applications without the necessity of installing additional plug-ins.

The MediaPlayer also offers tight integration with the YouTube media provider. The MediaPlayer comes with the familiar and straightforward way to use Kendo UI widgets and delivers rich media web experience for websites, blogs, online TV channels, e-commerce pages, and others. In addition to the consistent and elegant built-in skins, this new addition to the bundle possesses the main feature of every Kendo UI widget&mdash;it is a useful and convenient tool designed for achieving fascinating results in a sharp time frame.

To respond to cutting-end design practices and trends, the MediaPlayer component provides a *responsive* layout. This means that its size adapts depending on the capabilities of the client (end user) device and browser. The component automatically resizes its area to display the video in the most suitable possible way within the provided dimensions. The responsive web design of the MediaPlayer is shipped out-of-the-box and intends to save you time and efforts when developing your responsive applications.

 **Figure 1: A template of the MediaPlayer**

![Template of the MediaPlayer](images/mediaplayer-overview1.png)

**Key Features**

The Kendo UI MediaPlayer widget:

* Plays any HTML5-supported video formats.
* Plays YouTube videos.
* Delivers a set of elegant skins.
* Delivers a rich built-in toolbar to play or pause the video, control the volume, switch to **FullScreen** mode, and others.
* Displays a timeline slider with a buffer indicator allowing you to navigate the video.
* Displays a title bar.
* Ships HD source support.

Before reading on, make sure you are familiar with the fundamental Kendo UI widget concepts and that the [Kendo UI MVC wrappers]({% slug overview_aspnetmvc %}) are set up correctly.

## Getting Started

When using local sources, consider the video formats supported by the different browsers. For more information on the current supported HTML5 video formats, refer to [this article](http://www.w3schools.com/html/html5_video.asp) and to other resources on the Web.

### Initialize the MediaPlayer

Once the video files are ready, initialize the MediaPlayer HtmlHelper. It will render a `div` element as its wrapper container.

###### Example

```tab-Razor
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
```tab-ASPX
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

To add multiple sources for the same video, configure the quality-dependent [HD feature](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview#configuration-Add).

> **Important**
>
> The example on initializing the MediaPlayer above uses the `autoPlay` property. Because of the [mobile considerations listed in this article](https://developers.google.com/youtube/iframe_api_reference#Mobile_considerations), browsers on iOS do not automatically play embedded media. This limitation prevents unsolicited downloads over cellular networks at the expense of the user. The user always has to initiate a playback. For more information on this behavior, refer to [the article on audio and video HTML](https://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html). There are other functionalities which may be limited due to iOS restrictions. For more information on this topic, refer to [this article](http://blog.millermedeiros.com/unsolved-html5-video-issues-on-ios/) and to other available resources on the Web.

## Configuration

The MediaPlayer provides properties, methods, and events to match your specific preferences. For more information on its configuration options, refer to the [MediaPlayer API documentation](http://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer).

### Add Multiple Sources for Quality HD Feature

When you add multiple sources for the video, an **HD** button is automatically displayed in the bottom right corner, right next to the **FullScreen** one. This enables you to select your preferred quality.

###### Example

```tab-Razor
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source(new[] {
            new { quality = "480p", url = "Video/video1.mp4" },
            new { quality = "720p", url = "Video/video2.mp4" }
        })
    )
)
```
```tab-ASPX
<%= Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source(new[] {
            new { quality = "480p", url = "Video/video1.mp4" },
            new { quality = "720p", url = "Video/video2.mp4" }
        })
    )
%>
```

### Change the Source Dynamically

Players usually feature a different video based on user action. For a basic example and real-time implementation, refer to the [section on creating playlists](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview#configuration-Create).

### Prevent Seeking Forward

Application or business logic usually enforces the user to watch only the currently loaded content without the option to jump forward. The MediaPlayer provides the [`forwardSeek`](/kendo-ui/api/javascript/ui/mediaplayer#configuration-forwardSeek) configuration, which helps to achieve this requirement.

### Access Existing Instances

To access an existing MediaPlayer instance, use the `.data()` jQuery method, executed by the jQuery object of the originating element.

The following example demonstrates how to access an existing MediaPlayer instance.

###### Example

```tab-Razor
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
```tab-ASPX
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

### Create Playlists

To implement your own **Playlist** structures, change the source of the MediaPlayer dynamically. For more information on how to do this, refer to the [introductory article on the MediaPlayer widget](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview#configuration-Create).

## Event Handling

You can subscribe to all [MediaPlayer events](/kendo-ui/api/javascript/ui/mediaplayer#events).

### By Handler Name

The examples below demonstrates how to subscribe to events using a handler name.

###### Example

```tab-Razor
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
```tab-ASPX
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

### By Template Delegate

The following example demonstrates how to subscribe to events using a template delegate.

###### Example

```tab-Razor
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
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

## Keyboard Navigation

The MediaPlayer supports keyboard navigation. To enable it, use the [`navigatable`](/kendo-ui/api/javascript/ui/mediaplayer#configuration-navigatable) property.

The following list provides the built-in keyboard commands of the MediaPlayer:

*	`Enter`&mdash;Opens the video in the **FullScreen** mode.
*	`Esc`&mdash;Exits the **FullScreen** mode.
*	`Space`&mdash;Toggles **Play** / **Pause**.
*	`M`&mdash;Toggles **Mute** / **Unmute**.

## Localization

To localize the tooltip texts from the interface, use the configuration options of the MediaPlayer.

###### Example

```tab-Razor
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Messages(messages =>
    {
        messages.Play("Wiedergabe");
        messages.Pause("Pausieren");
    })
    .Media(m => m
         .Title("Herbert Grönemeyer - Der Weg")
         .Source("Video/video1.mp4")
    )
)
```
```tab-ASPX
<%= Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Messages(messages =>
    {
        messages.Play("Wiedergabe");
        messages.Pause("Pausieren");
    })
    .Media(m => m
         .Title("Herbert Grönemeyer - Der Weg")
         .Source("Video/video1.mp4")
    )
%>
```

For a complete list of [localizable messages](/kendo-ui/api/javascript/ui/mediaplayer#configuration-messages), refer to the [MediaPlayer API documentation](/kendo-ui/api/javascript/ui/mediaplayer).

All Kendo UI widgets, including the MediaPlayer, also allow you to add script files and implement [global localization](http://docs.telerik.com/kendo-ui/framework/localization/overview) for your application.

## See Also

* [MediaPlayer Live Sample](http://demos.telerik.com/aspnet-mvc/mediaplayer/index)
* [Overview of the Kendo UI MediaPlayer Widget](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview)
* [MediaPlayer JavaScript API Reference](/kendo-ui/api/javascript/ui/mediaplayer)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
