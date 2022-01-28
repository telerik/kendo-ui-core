---
title: Multiple Sources
page_title: Multiple Sources
description: "Add multiple sources to the same video in the Telerik UI MediaPlayer for {{ site.framework }}."
previous_url: /html-helpers/media/mediaplayer/features, /helpers/media/mediaplayer/multiple-sources
slug: htmlhelpers_mediaplayer_multiplesources_aspnetcore
position: 2
---

# Multiple Sources

To add multiple sources for the same video, you have to configure the quality-dependent client-side HD feature.

When you add multiple sources for the video, an **HD** button is automatically displayed in the bottom right corner next to the **FullScreen** button. This behavior enables you to select your preferred quality.

* To implement your own playlist structures, refer to the [client-side implementation of creating playlists](https://docs.telerik.com/kendo-ui/controls/media/mediaplayer/playlists).
* To prevent the seeking forward and allow players to watch only the currently loaded content, use the client-side [`ForwardSeek()`](/api/Kendo.Mvc.UI.Fluent/MediaPlayerBuilder#forwardseeksystemboolean) method.


		@(Html.Kendo().MediaPlayer()
			.AutoPlay(true)
			.Media(m => m
				.Title("Our Company Culture - Lesson 1")
				.Source(new[] { // define the media files for different quality options
					new { quality = "480p", url = "Video/videoLQ.mp4" },
					new { quality = "720p", url = "Video/videoHD.mp4" },
					new { quality = "1080p", url = "Video/videoFHD.mp4" },
				})
			)
			.Name("mediaPlayer")
			.HtmlAttributes(new { style = "height:360px; width:640px" })
		)

## See Also

* [Basic Usage of the MediaPlayer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/index)
* [Using the API of the MediaPlayer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/mediaplayer/api)
* [Server-Side API](/api/mediaplayer)
