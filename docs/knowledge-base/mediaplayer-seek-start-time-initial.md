---
title: Start at a Specific Place on the Seek-Bar
description: An example on how to configure the initial starting point of a video when working with the Kendo UI MediaPlayer.
type: how-to
page_title: Set the Initial Start Time | Kendo UI MediaPlayer for jQuery
slug: mediaplayer-seek-start-time-initial
tags: mediaplayer, seek, start, time, initial
ticketid: 1386652
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>MediaPlayer for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.1.115</td>
 </tr>
</table>

## Description

How can I programmatically start my video at a specific place the first time it is played?

## Solution

To have a different start time when a video loads in a Kendo UI MediaPlayer:

1. Use the [`seek` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/methods/seek) the first time the [`play` event](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/events/play) is fired.
1. Utilize the [`one` method](https://docs.telerik.com/kendo-ui/api/javascript/observable/methods/one) of the Kendo UI observable to attach a handler for one-time execution.

```dojo
    <div id="mediaplayer" style="height:360px"></div>

    <script type="text/javascript">
      $(document).ready(function(){
        $("#mediaplayer").kendoMediaPlayer({
          autoPlay: true,
          navigatable: true,
          media: {
            title: "ProgressNEXT 2018 Highlights",
            source: "https://www.youtube.com/watch?v=Gp7tcOcSKAU"
          }
        });

        var mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
        mediaPlayer.one("play", function(){
          mediaPlayer.seek(50000);
        });

      });
    </script>
```

## See Also

* [API Reference of the seek Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/methods/seek)
* [API Reference of the play Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/events/play)
* [API Reference of the one Method](https://docs.telerik.com/kendo-ui/api/javascript/observable/methods/one)
