---
title: Keyboard Navigation
page_title: MediaPlayer Keyboard Navigation | Telerik UI for ASP.NET Core HTML Helpers
description: "Keyboard Navigation in the Telerik UI MediaPlayer for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_mediaplayer_accessibility_keyboard_navigation_aspnetcore
position: 2
---

# MediaPlayer Keyboard Navigation

The MediaPlayer supports keyboard navigation. To enable it, use the `Navigatable(true)` configuration.

The following list provides the built-in keyboard commands of the MediaPlayer:

* `Enter`—Opens the video in the FullScreen mode.
* `Esc`—Exits the FullScreen mode.
* `Space`—Toggles Play / Pause.
* `M`—Toggles Mute / Unmute.

```
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer")
    .Navigatable(true)
    .Media(m => m
        .Title("Our Company Culture - Lesson 1")
        .Source("Video/video1.mp4")
    )
    .HtmlAttributes(new { style = "height:360px; width:640px" })
)
```

## See Also

* [Media Player Overview]({%slug htmlhelpers_mediaplayer_aspnetcore %})
* [Live Demos: MediaPlayer](https://demos.telerik.com/aspnet-core/mediaplayer/index)
* [HtmlHelper API Reference](https://docs.telerik.com/aspnet-core/api/mediaplayer)

