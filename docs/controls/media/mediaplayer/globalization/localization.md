---
title: Localization
page_title: jQuery MediaPlayer Documentation | MediaPlayer Localization
description: "Get started with the jQuery MediaPlayer by Kendo UI and translate its messages for different culture locales."
slug: localization_mediaplayer_jquery
position: 2
---

# Localization

You can localize the tooltip texts from the MediaPlayer interface through the `messages` configuration options.

For a complete list of [localizable messages](/api/javascript/ui/mediaplayer/configuration/messages), refer to the [MediaPlayer API documentation](/api/javascript/ui/mediaplayer).

Similar to all Kendo UI widgets, the MediaPlayer allows you to add script files and implement [global localization]({% slug overview_localization_kendoui %}) for your application.

```dojo
<div id="mediaplayer1" style="width:640px; height: 360px;"></div>
<script>
    $("#mediaplayer1").kendoMediaPlayer({
        autoPlay: true,
        messages: {
            play: "Wiedergabe",
            pause: "Pausieren"
        },
        media: {
            title: "Herbert Grönemeyer - Der Weg",
            source: "Video/video1.mp4"
        }
    });
</script>
```

## See Also

* [Globalization in Kendo UI for jQuery]({% slug overview_kendoui_globalization %})
* [JavaScript API Reference of the MediaPlayer](/api/javascript/ui/mediaplayer)
