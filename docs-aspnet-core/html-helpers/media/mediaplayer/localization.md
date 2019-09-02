---
title: Localization
page_title: MediaPlayer Localization | Telerik UI for ASP.NET Core HTML Helpers
description: "You can localize the tooltip messages in the Telerik UI MediaPlayer for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_mediaplayer_localization_aspnetcore
position: 5
---

# MediaPlayer Localization

You can localize the tooltip texts from the Media Player interface through the `Messages` configuration options.

```
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .Messages(messages =>
    {
        messages.Play("Wiedergabe");
        messages.Pause("Pausieren");
    })
    .Media(m => m
         .Title("Mein Video")
         .Source("Video/video1.mp4")
    )
    .HtmlAttributes(new { style = "height:360px; width:640px" })
)
```

For a complete list of localizable messages, refer to the [MediaPlayer Messages API reference](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/MediaPlayerMessagesSettingsBuilder).


## See Also

* [Media Player Overview]({%slug htmlhelpers_mediaplayer_aspnetcore %})
* [Live Demos: Media Player](https://demos.telerik.com/aspnet-core/mediaplayer/index)
* [HtmlHelper API Reference](https://docs.telerik.com/aspnet-core/api/mediaplayer)

