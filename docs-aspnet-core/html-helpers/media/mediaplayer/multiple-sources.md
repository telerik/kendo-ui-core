---
title: Multiple Sources
page_title: Multiple Sources | Telerik UI MediaPlayer HtmlHelper for ASP.NET Core
description: "Add multiple sources to the same video in the Telerik UI MediaPlayer for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /html-helpers/media/mediaplayer/features
slug: htmlhelpers_mediaplayer_multiplesources_aspnetcore
position: 2
---

# Multiple Sources

To add multiple sources for the same video, you have to configure the quality-dependent [client-side HD feature](http://docs.telerik.com/kendo-ui/controls/media/mediaplayer/overview#configuration-Add).

When you add multiple sources for the video, an **HD** button is automatically displayed in the bottom right corner next to the **FullScreen** button. This behavior enables you to select your preferred quality.

```
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
```


## See Also

* [Basic Usage of the MediaPlayer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/mediaplayer/index)
* [Using the API of the MediaPlayer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/mediaplayer/api)
* [Server-Side API](/api/mediaplayer)
