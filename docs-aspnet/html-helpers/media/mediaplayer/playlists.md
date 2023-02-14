---
title: Playlists
page_title: Playlists
description: "Learn how to configure the playlist of the Telerik UI MediaPlayer component for {{ site.framework }}."
slug: htmlhelpers_mediaplayer_playlists_aspnetcore
position: 4
---

# Playlists

The Telerik UI for {{ site.framework }} MediaPlayer enables you to create your own playlists and to enable or disable the seeking forward.

## Creating Playlists

Players usually feature a different video based on user action. To implement your own **Playlist** structures, change the source of the MediaPlayer dynamically. For a runnable example, refer to the [demo on creating your own playlists in the MediaPlayer](https://demos.telerik.com/{{ site.platform }}/mediaplayer/playlist) which uses the ListView to create a list that holds the videos right next to the MediaPlayer element.

To change the existing source of the MediaPlayer, use the MediaPlayer client-side [`media()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/methods/media) method.

```
    <script>
        function buttonClick() {
            var player = $("#mediaplayer").data("kendoMediaPlayer");
            player.media({
                title: "Our Company Culture - Lesson 2",
                source: "Video/video2.mp4"
            });
        }
    </script>    
```

## Seeking Forward

Some applications enforce the user to watch only the currently loaded content without the option to jump forward. The MediaPlayer provides the [`ForwardSeek()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/MediaPlayerBuilder#forwardseeksystemboolean) configuration method, which helps you to achieve this requirement.

```HtmlHelper
    @(Html.Kendo().MediaPlayer()
        .Name("mediaPlayer")
        .ForwardSeek(true)
    )
```
## See Also

* [Adding Custom Playlists to the MediaPlayer HTML Helper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/playlist)
* [Server-Side API of the MediaPlayer for {{ site.framework }}](/api/mediaplayer)