---
title: Localization
page_title: Localization | Telerik UI MediaPlayer HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI MediaPlayer HtmlHelper for ASP.NET MVC and translate its tooltip messages for different culture locales."
slug: mediaplayer_localization_aspnetmvc
position: 2
---

# Localization

You can localize the tooltip texts from the MediaPlayer interface through the `Messages` configuration options.

For a complete list of localizable messages, refer to the [MediaPlayer server-side API](/api/mediaplayer).

```Razor
@(Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Messages(messages =>
    {
        messages.Play("Wiedergabe");
        messages.Pause("Pausieren");
    })
    .Media(m => m
         .Title("Herbert Grönemeyer - Der Weg")
         .Source("Video/video1.mp4")
    )
)
```
```ASPX
<%= Html.Kendo().MediaPlayer()
    .Name("mediaplayer1")
    .AutoPlay(true)
    .HtmlAttributes(new { style = "height:360px; width:640px" })
    .Messages(messages =>
    {
        messages.Play("Wiedergabe");
        messages.Pause("Pausieren");
    })
    .Media(m => m
         .Title("Herbert Grönemeyer - Der Weg")
         .Source("Video/video1.mp4")
    )
%>
```

## See Also

* [Server-Side API](/api/mediaplayer)
