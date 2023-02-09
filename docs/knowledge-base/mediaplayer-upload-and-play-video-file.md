---
title: Upload and Play Video Files with Media Player
description: "The following example demonstrates how to upload and play a video file directly with the Kendo UI for jQuery MediaPlayer."
type: how-to
page_title: Upload and Play Video Files with Media Player - Kendo UI MediaPlayer for jQuery
slug: mediaplayer-upload-and-play-video-file
tags: mediaplayer, media, video, upload, play, player
ticketid: 1360372
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® MediaPlayer for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I upload a video file by using the [Kendo UI Upload](https://demos.telerik.com/kendo-ui/upload/index) and then play it with the [Kendo UI MediaPlayer](https://demos.telerik.com/kendo-ui/mediaplayer/index)?

## Solution

To upload and play a video file by using the Kendo UI Upload and Kendo UI MediaPlayer, follow these steps:

1. Initialize the Media Player widget.
1. Initialize the Upload widget.
1. Handle the [`select`](/api/javascript/ui/upload/events/upload) event of the Upload.
1. Load the video file by using the [`media`](/api/javascript/ui/mediaplayer/methods/media) method of the MediaPlayer.

```dojo
<div style="width: 720px; position: absolute; left: 120px;">
  <input name="files" id="files" type="file" aria-label="files" />
  <div id="mediaplayer" style="height: 480px;"></div>
</div>

<script>
    var URL = window.URL || window.webkitURL;

    $(document).ready(function () {
        // Initialize the Media Player.
        $("#mediaplayer").kendoMediaPlayer();
		let mediaPlayer = $("#mediaplayer").data("kendoMediaPlayer");
      
        // Initialize the Upload.
        $("#files").kendoUpload({
            // Allow only the HTML5 supported video formats.
          	validation: {
                allowedExtensions: [".mp4", ".ogg", ".webm"]
            },
            // Allow only 1 file to be uploaded a time.
          	multiple: false,
            // Utilize the Select event to obtain the file.
            select: function(e) {
                let file = e.files[0].rawFile;
                let name = e.files[0].name;
                // Create an objectUrl using the selected file.
                let url = URL.createObjectURL(file);
                
                // Play the video through the url.
                mediaPlayer.media({
                    title: name,
                    source: url
                })
            }
        });
    });
</script>
``` 
