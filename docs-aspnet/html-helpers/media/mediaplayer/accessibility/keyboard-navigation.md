---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} MediaPlayer by Telerik UI and learn about the accessibility support it provides through its keyboard navigation functionality."
previous_url: /helpers/media/mediaplayer/accessibility/keyboard-navigation
slug: htmlhelpers_mediaplayer_accessibility_keyboard_navigation_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the MediaPlayer is always available.

To enable it, use the `Navigatable(true)` configuration. For a complete example, refer to the [demo on using the keyboard navigation of the MediaPlayer](https://demos.telerik.com/{{ site.platform }}/mediaplayer/keyboard-navigation).

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

* [Keyboard Navigation by the MediaPlayer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
