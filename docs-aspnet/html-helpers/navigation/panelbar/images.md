---
title: Images
page_title: Images
description: "Learn how to include images and sprite icons in the Telerik UI PanelBar component for {{ site.framework }}."
slug: htmlhelpers_panelbar_images_aspnetcore
position: 4
---

# Images 

The PanelBar allows you to include images or sprite icons inside its items.

## Images

You can include images in the Telerik UI for {{ site.framework }} PanelBar items using the `.ImageUrl()` configuration option and passing the image Url as a parameter:

```HtmlHelper
@(Html.Kendo().PanelBar()
        .Name("panelbar-images")
        .Items(panelbar =>
        {
            panelbar.Add().Text("Baseball")
                .ImageUrl(Url.Content("~/shared/icons/sports/baseball.png"))
                .Items(baseball =>
                {
                    baseball.Add().Text("Top News")
                        .ImageUrl(Url.Content("~/shared/icons/16/star.png"));
                    baseball.Add().Text("Photo Galleries")
                        .ImageUrl(Url.Content("~/shared/icons/16/photo.png"));
                    baseball.Add().Text("Video Records")
                        .ImageUrl(Url.Content("~/shared/icons/16/video.png"));
                    baseball.Add().Text("Radio Records")
                        .ImageUrl(Url.Content("~/shared/icons/16/speaker.png"));
                });
        })
    )

```
{% if site.core %}
```TagHelper
<kendo-panelbar name="panelbar-images">
    <items>
        <panelbar-item text="Baseball" image-url="@Url.Content("~/shared/icons/sports/baseball.png")">
            <items>
                <panelbar-item text="Top News" image-url="@Url.Content("~/shared/icons/16/star.png")">
                </panelbar-item>
                <panelbar-item text="Photo Galleries" image-url="@Url.Content("~/shared/icons/16/photo.png")">
                </panelbar-item>
                <panelbar-item text="Video Records" image-url="@Url.Content("~/shared/icons/16/video.png")">
                </panelbar-item>
                <panelbar-item text="Radio Records" image-url="@Url.Content("~/shared/icons/16/speaker.png")">
                </panelbar-item>
            </items>
        </panelbar-item>
    </items>
</kendo-panelbar>
```
{% endif %}

## Sprites

You can also set sprites the the Telerik UI for {{ site.framework }} PanelBar items using the `.SpriteCssClasses()` configuration option and specifying the sprite CSS class: 

```HtmlHelper
@(Html.Kendo().PanelBar()
        .Name("panelbar-sprites")
        .Items(panelbar =>
        {
            panelbar.Add().Text("Brazil")
                .SpriteCssClasses("brazilFlag")
                .Items(brazil =>
                {
                    brazil.Add().Text("History")
                        .SpriteCssClasses("historyIcon");
                    brazil.Add().Text("Geography")
                        .SpriteCssClasses("geographyIcon");
                });
        })
    )
```
{% if site.core %}
```TagHelper
<kendo-panelbar name="panelbar-sprites">
    <items>
            <panelbar-item text="Brazil" icon-class="k-sprite brazilFlag">
                <items>
                    <panelbar-item text="History" icon-class="k-sprite historyIcon"></panelbar-item>
                    <panelbar-item text="Geography" icon-class="k-sprite geographyIcon"></panelbar-item>
                </items>
            </panelbar-item>
        </items>
</kendo-panelbar>
```
{% endif %}

## See Also

* [Images in the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar/images)
* [PanelBar Server-Side API](/api/panelbar)
