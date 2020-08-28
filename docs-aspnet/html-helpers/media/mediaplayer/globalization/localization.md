---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI MediaPlayer HtmlHelper for {{ site.framework }} and translate its tooltip messages for different culture locales."
previous_url: /html-helpers/media/mediaplayer/localization, /helpers/media/mediaplayer/globalization/localization
slug: htmlhelpers_mediaplayer_localization_aspnetcore
position: 2
---

# Localization

You can localize the tooltip texts from the MediaPlayer interface through the `Messages` configuration options.

For a complete list of localizable messages, refer to the [MediaPlayer server-side API](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/{% if site.core %}MediaPlayerMessagesSettingsBuilder{% else %}MediaPlayerMessagesBuilder{% endif %}).

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

* [Globalization in {{ site.product }}]({% slug overview_globalization_core %})
* [Server-Side API](/api/mediaplayer)
