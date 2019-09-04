---
title: Localization
page_title: Localization | Telerik UI MediaPlayer HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI MediaPlayer HtmlHelper for ASP.NET Core and translate its tooltip messages for different culture locales."
previous_url: /html-helpers/media/mediaplayer/localization
slug: htmlhelpers_mediaplayer_localization_aspnetcore
position: 2
---

# Localization

You can localize the tooltip texts from the MediaPlayer interface through the `Messages` configuration options.

For a complete list of localizable messages, refer to the [MediaPlayer server-side API](https://docs.telerik.com/aspnet-core/api//Kendo.Mvc.UI.Fluent/MediaPlayerMessagesSettingsBuilder).

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

## See Also

* [Globalization in Telerik UI for ASP.NET Core]({% slug overview_globalization_core %})
* [Server-Side API](/api/mediaplayer)
