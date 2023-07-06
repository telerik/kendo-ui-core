---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI MediaPlayer component for {{ site.framework }} and translate its tooltip messages for different culture locales."
previous_url: /html-helpers/media/mediaplayer/localization, /helpers/media/mediaplayer/globalization/localization
slug: htmlhelpers_mediaplayer_localization_aspnetcore
position: 2
---

# Localization

You can localize the tooltip texts from the MediaPlayer interface through the `Messages` configuration options.

For a complete list of localizable messages, refer to the [MediaPlayer server-side API](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/{% if site.core %}mediaplayermessagessettingsbuilder{% else %}mediaplayermessagesbuilder{% endif %}).

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-mediaplayer name="mediaplayer1"
        style = "height:360px; width:640px">
        <messages play="Wiedergabe" pause="Pausieren"/>
        <media title="Mein Video" source="Video/video1.mp4" />
    </kendo-mediaplayer>
```
{% endif %}


## See Also

* [Globalization in {{ site.product }}]({% slug overview_globalization_core %})
* [Server-Side API](/api/mediaplayer)
