---
title: Images
page_title: Images
description: "Learn how to include images and sprite icons in the Telerik UI TabStrip component for {{ site.framework }}."
components: ["tabstrip"]
slug: htmlhelpers_tabstrip_images_aspnetcore
position: 4
---

# Images 

The TabStrip allows you to include images or sprite icons in its tabs.

## Images

To include images in the Telerik UI for {{ site.framework }} TabStrip items, use the `.ImageUrl()` configuration option and pass the image Url as a parameter:

```HtmlHelper
@(Html.Kendo().TabStrip()
        .Name("tabstrip-images")
        .Items(tabstrip =>
        {
            tabstrip.Add().Text("Baseball")
                .ImageUrl(Url.Content("~/shared/icons/sports/baseball.png"))
                .Content(@<text>
                    Baseball content
                  </text>);
            tabstrip.Add().Text("Football")
                .ImageUrl(Url.Content("~/shared/icons/sports/football.png"))
                .Content(@<text>
                    Football content
                  </text>);
            tabstrip.Add().Text("Basketball")
                .ImageUrl(Url.Content("~/shared/icons/sports/basketball.png"))
                .Content(@<text>
                    Basketball content
                  </text>);
        })
    )
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip-images">
    <items>
        <tabstrip-item text="Baseball"
                       image-url="~/shared/icons/sports/baseball.png">
            <content>
                Baseball content
            </content>
        </tabstrip-item>
        <tabstrip-item text="Baseball"
                       image-url="~/shared/icons/sports/football.png">
            <content>
                Football content
            </content>
        </tabstrip-item>
        <tabstrip-item text="Baseball"
                       image-url="~/shared/icons/sports/basketball.png">
            <content>
                Basketball content
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
{% endif %}

## Sprites

To include sprites in the Telerik UI for {{ site.framework }} TabStrip items, use the `.SpriteCssClasses()` configuration option and specify the sprite CSS class:

```HtmlHelper
@(Html.Kendo().TabStrip()
          .Name("tabstrip-sprites")
          .Items(tabstrip =>
          {
              tabstrip.Add().Text("Brazil")
                  .SpriteCssClasses("brazilFlag")
                  .Content(@<text>
                    Brazil, officially the Federative Republic of Brazil, is the largest country in South America. 
                  </text>);

              tabstrip.Add().Text("India")
                  .SpriteCssClasses("indiaFlag")
                  .Content(@<text>
                        India, officially the Republic of India, is a country in South Asia. 
                  </text>);

              tabstrip.Add().Text("Netherlands")
                  .SpriteCssClasses("netherlandsFlag")
                  .Content(@<text>
                        The Netherlands is a constituent country of the Kingdom of the Netherlands, located mainly in North-West Europe and with several islands in the Caribbean. 
                  </text>);
          })
          .SelectedIndex(0)
    )
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip-sprites">
    <items>
        <tabstrip-item text="Brazil" sprite-css-classes='new string[] {"brazilFlag"}'>
            <content>
                Brazil, officially the Federative Republic of Brazil, is the largest country in South America.
            </content>
        </tabstrip-item>
        <tabstrip-item text="India" sprite-css-classes='new string[] {"indiaFlag"}'>
            <content>
                India, officially the Republic of India, is a country in South Asia.
            </content>
        </tabstrip-item>
        <tabstrip-item text="Netherlands" sprite-css-classes='new string[] {"netherlandsFlag"}'>
            <content>
                The Netherlands is a constituent country of the Kingdom of the Netherlands, located mainly in North-West Europe and with several islands in the Caribbean.
            </content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```

> Note: In versions before 2025 Q3, the `icon-class` configuration option sets a sprite CSS class in the items of the TabStrip TagHelper. Starting with version 2025 Q3, the `icon-class` attribute applies a custom CSS class to the default SVG tab icon element. The `sprite-css-classes` attribute sets sprite icons to the TabStrip tabs.
{% endif %}

## See Also

* [Images in the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/images)
* [TabStrip Server-Side API](/api/tabstrip)
