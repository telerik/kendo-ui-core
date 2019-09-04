---
title: Keyboard Navigation
page_title: Keyboard Navigation | Telerik UI MediaPlayer HtmlHelper for ASP.NET Core
description: "Get started with the UI for ASP.NET Core MediaPlayer by Telerik UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: htmlhelpers_mediaplayer_accessibility_keyboard_navigation_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the MediaPlayer is always available.

To enable it, use the `Navigatable(true)` configuration. For a complete example, refer to the [demo on using the keyboard navigation of the MediaPlayer](https://demos.telerik.com/aspnet-core/mediaplayer/keyboard-navigation).

The MediaPlayer supports the following keyboard shortcuts:

|Shortcut |Description
|:---     |:---
|`Enter`  |Opens the video in the full-screen mode.
|`Esc`    |Exits the full-screen mode.
|`Space`  |Toggles the play and pause state.
|`M`      |Toggles the mute and unmute state.

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

* [Keyboard Navigation by the MediaPlayer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/mediaplayer/keyboard-navigation)
* [Accessibility in Telerik UI for ASP.NET Core]({% slug overview_accessibility %})
