---
title: Multiple Sources
page_title: Multiple Sources | Telerik UI MediaPlayer HtmlHelper for ASP.NET MVC
description: "Add multiple sources to the same video in the Telerik UI MediaPlayer for ASP.NET MVC."
slug: multiplesources_mediaplayer_aspnetcore
position: 2
---

# Multiple Sources

To add multiple sources for the same video, you have to configure the quality-dependent [client-side HD feature](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview#configuration-Add).

When you add multiple sources for the video, an **HD** button is automatically displayed in the bottom right corner next to the **FullScreen** button. This behavior enables you to select your preferred quality.

* To enable players to feature a different video based on user action, refer to the [client-side implementation of creating playlists](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview#configuration-Create).
* To implement your own playlist structures, refer to the [client-side implementation of creating playlists](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview#configuration-Create).
* To prevent the seeking forward and allow players to watch only the currently loaded content, use the client-side [`forwardSeek`](http://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer#configuration-forwardSeek) configuration.

```Razor
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
```ASPX
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

## See Also

* [Basic Usage of the MediaPlayer HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/mediaplayer)
* [Using the API of the MediaPlayer HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/mediaplayer/api)
* [Server-Side API](/api/mediaplayer)
