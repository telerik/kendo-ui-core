---
title: Get Current Time in MediaPlayer
description: An example on how to get the elapsed time in MediaPlayer.
type: how-to
page_title: Get the current time in MediaPlayer | Kendo UI MediaPlayer
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

I want to get the current time that is reached when playing media file. 

## Solution

1. Get reference of the `.k-mediaplayer-currenttime` span element showing the current time and extract the text from it.
1. Split the text and push in an array
1. Iterate over the array and convert the time in seconds

The example below illustrates the approach:


```html
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

