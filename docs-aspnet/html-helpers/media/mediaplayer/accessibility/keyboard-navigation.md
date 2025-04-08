---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} MediaPlayer by Telerik UI and learn about the accessibility support it provides through its keyboard navigation functionality."
previous_url: /helpers/media/mediaplayer/accessibility/keyboard-navigation
slug: htmlhelpers_mediaplayer_accessibility_keyboard_navigation_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the MediaPlayer is disabled by default.

To enable it, use the [`Navigatable(true)`](/api/kendo.mvc.ui.fluent/mediaplayerbuilder#navigatablesystemboolean) configuration. 

```HtmlHelper
    @(Html.Kendo().MediaPlayer()
        .Name("mediaPlayer")
        .Navigatable(true)
        /* Other configuration. */
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-mediaplayer name="mediaPlayer" navigatable="true">
        <!-- Other configuration. -->
    </kendo-mediaplayer>
```
{% endif %}

For a complete example, refer to the [demo on using the keyboard navigation of the MediaPlayer](https://demos.telerik.com/{{ site.platform }}/mediaplayer/keyboard-navigation).

The MediaPlayer supports the following keyboard shortcuts:

|Shortcut       |Description
|:---           |:---
|`Enter`        |Opens the video in the full-screen mode.
|`Esc`          |Exits the full-screen mode.
|`Space`        |Toggles the play and pause state.
|`M`            |Toggles the mute and unmute state.
|`Right Arrow`  |Seeks forward.
|`Left Arrow`   |Seels backward.
|`Up Arrow`     | Increases the volume.
|`Down Arrow`   | Decreases the volume.
|`Ctrl`  + `1`  | Decreases the video quality.
|`Ctrl`  + `2`  | Increases the video quality.


## See Also

* [Keyboard Navigation by the MediaPlayer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
