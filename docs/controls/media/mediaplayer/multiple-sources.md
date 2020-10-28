---
title: Multiple Sources
page_title: jQuery MediaPlayer Documentation | Multiple Sources
description: "Get started with the jQuery MediaPlayer by Kendo UI and add multiple sources to the same video."
slug: multiplesources_kendoui_mediaplayer
position: 2
---

# Multiple Sources

To add multiple sources for the same video, you have to configure the quality-dependent HD feature.

When you add multiple sources for the video, an **HD** button is automatically displayed in the bottom right corner next to the **FullScreen** button. This behavior enables you to select your preferred quality.

```dojo
<div id="mediaplayer1" style="width:640px; height: 360px;"></div>
<script>
    $("#mediaplayer1").kendoMediaPlayer({
        autoPlay: true,
        media: {
            title: "Our Company Culture - Lesson 1",
            source: [
                { quality: "480p", url: "Video/video1.mp4" },
                { quality: "720p", url: "Video/video2.mp4" }]
        }
    });
</script>
```

## See Also

* [Basic Usage of the MediaPlayer (Demo)](https://demos.telerik.com/kendo-ui/mediaplayer/index)
* [Using the API of the MediaPlayer (Demo)](https://demos.telerik.com/kendo-ui/mediaplayer/api)
* [JavaScript API Reference of the MediaPlayer](/api/javascript/ui/mediaplayer)
