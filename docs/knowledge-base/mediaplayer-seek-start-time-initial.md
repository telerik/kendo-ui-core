---
title: Start at a Specific Place on Seekbar
description: An example demonstrating how to configure the initial starting point of a video
type: how-to
page_title: Set Initial Start Time | Kendo UI MediaPlayer
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

In order to have a different start time when a video loads in a Kendo UI MediaPlayer, use the [seek method](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/methods/seek) the first time the [play event](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/events/play) is fired.  Utilize the Kendo Observable's [one method](https://docs.telerik.com/kendo-ui/api/javascript/observable/methods/one) to attach a handler for one-time execution.

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

* [seek - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/methods/seek)
* [play - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/mediaplayer/events/play)
* [one - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/observable/methods/one)
