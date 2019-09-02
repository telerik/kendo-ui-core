---
title: Features
page_title: MediaPlayer Features | Telerik UI for ASP.NET Core HTML Helpers
description: "The main features and functionality of the Telerik UI MediaPlayer for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_mediaplayer_features_aspnetcore
position: 2
---

# MediaPlayer Features

Key features of the MediaPlayer component are:

* Plays any HTML5-supported video formats.
* Supports [multiple sources](#multiple-sources) the user can choose from. You can configure them by providing an array to the `.Sources()` option.
* Plays YouTube videos by URL - just set the YouTube video address to the `Source()` setting.
* Delivers a set of elegant skins.
* Delivers a rich built-in toolbar to play or pause the video, control the volume, switch to FullScreen mode, and others.
* Displays a timeline slider with a buffer indicator allowing you to navigate the video.
* Displays a title bar.
* FullScreen mode that the player can enter by default when playback starts through the `FullScreen(true)` setting.
* Detailed control over the video behavior - you can prevent forward navigation (`ForwardSee(false)`), loop the video (`AutoRepeat(true)`), preset volume (`Volume()` and `Mute(true)`) and even start automatically upon load (`AutoPlay(true)`)
* Responsive layout.
* Keyboard support.
* Accessible interface.
* [Localization]({%slug htmlhelpers_mediaplayer_localization_aspnetcore%}).

## Main Features

The following snippet shows how to configure the basic features of the Medial Player and their effects.

```
@(Html.Kendo().MediaPlayer()
			.AutoPlay(true) // start playing the video as soon as it loads
			.Navigatable(true) // enable keyboard navigation
			.AutoRepeat(true) // loop the video
			.ForwardSeek(false) // disable forward seeking to ensure viewers will watch the entire video
			.FullScreen(false) // when set to true, the player will enter full screen automatically
			.Mute(true) // start without sound
			.Volume(20) // preset the volume level (0 - 100)
			.Media(m => m // define the media file - a YouTube video in this case
				.Title("Getting Started with Telerik UI for ASP.NET Core on Windows")
				.Source("https://www.youtube.com/watch?v=AIFNeWrZCdM")
			)
			.Name("mediaPlayer") // the name of the widget, useed for ID and for referencing it at runtime
			.HtmlAttributes(new { style = "height:360px; width:640px" })
)
```

## Multiple Sources

When you add multiple sources for the video, an `HD` button is automatically displayed in the bottom right corner, right next to the `FullScreen` button. This enables you to select your preferred quality.

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

* [Live Demos: MediaPlayer](https://demos.telerik.com/aspnet-core/mediaplayer/index)
* [HtmlHelper API Reference](https://docs.telerik.com/aspnet-core/api/mediaplayer)

