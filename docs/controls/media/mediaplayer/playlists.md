---
title: Playlists
page_title: jQuery MediaPlayer Documentation | Playlists
description: "Get started with the jQuery MediaPlayer by Kendo UI and create your own playlist or prevent the user from seeking forward."
slug: playlists_kendoui_mediaplayer
position: 3
---

# Playlists

The MediaPlayer enables you to create your own playlists and to enable or disable the seeking forward.

## Creating Playlists

Players usually feature a different video based on user action. To implement your own **Playlist** structures, change the source of the MediaPlayer dynamically. For a runnable example, refer to the [demo on creating your own playlists in the MediaPlayer](https://demos.telerik.com/kendo-ui/mediaplayer/playlist) which uses the ListView to create a list that holds the videos right next to the MediaPlayer element.

The following example demonstrates how to change the source of the MediaPlayer.

```javascript
function buttonClick() {
    var player = $("#mediaplayer1").data("kendoMediaPlayer");
    player.media({
        title: "Our Company Culture - Lesson 2",
        source: "Video/video2.mp4"
    });
}
```

## Seeking Forward

Some applications enforce the user to watch only the currently loaded content without the option to jump forward. The MediaPlayer provides the [`forwardSeek`](/api/javascript/ui/mediaplayer#forwardseek-boolean-default-true) configuration, which helps to achieve this requirement.

## See Also

* [Adding Custom Playlists to the MediaPlayer (Demo)](https://demos.telerik.com/kendo-ui/mediaplayer/playlist)
* [JavaScript API Reference of the MediaPlayer](/api/javascript/ui/mediaplayer)
