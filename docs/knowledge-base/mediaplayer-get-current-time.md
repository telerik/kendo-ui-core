---
title: Get Current Time in MediaPlayer
description: An example on how to get the elapsed time in the Kendo UI MediaPlayer.
type: how-to
page_title: Get the Current Time | Kendo UI MediaPlayer for jQuery
slug: mediaplayer-get-current-time
tags: mediaplayer, current, time, seek, get, position, seconds, played, elapsed
res_type: kb
component: menu
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MediaPlayer</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

How can I get the current time which is reached when playing a media file?

## Solution

1. Get a reference of the `.k-mediaplayer-currenttime` span element, which shows the current time, and extract the text from it.
1. Split the text and push in an array.
1. Iterate over the array and convert the time in seconds.

```dojo
<div id="mediaplayer" style="height:360px"></div>

<button id="getTimeButton">Get current time</button>


<script type="text/javascript">
    $(document).ready(function () {

        $("#mediaplayer").kendoMediaPlayer({
            autoPlay: true,
            media: {
                title: "Take a Tour of the Telerik Platform",
                source: "https://www.youtube.com/watch?v=rLtTuFbuf1c"
            }
        });

        $("#getTimeButton").on("click", function (e) {
            var player = $("#mediaplayer").getKendoMediaPlayer();
            var timeHTML = $(".k-mediaplayer-currenttime").text();
            var timeParts = timeHTML.split(":").reverse();

            var seconds = 0;

            for (var i = 0; i < timeParts.length; i++) {
                seconds = seconds + (parseInt(timeParts[i]) * Math.pow(60, i));
            }

            alert("Current time is at " + seconds + " seconds.");

        });
    });

</script>
```
