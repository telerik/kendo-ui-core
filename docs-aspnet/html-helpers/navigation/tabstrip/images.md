---
title: Images
page_title: Images
description: "Learn how to include images and sprite icons in the Telerik UI TabStrip HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_tabstrip_images_aspnetcore
position: 7
---

# Images 

The TabStrip allows you to include images or sprite icons in its tabs.

## Images

To include images in the Telerik UI for {{ site.framework }} TabStrip items, use the `.ImageUrl()` configuration option and pass the image Url as a parameter:

```
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

## Sprites

To include sprites in the Telerik UI for {{ site.framework }} TabStrip items, use the `.SpriteCssClasses()` configuration option and specify the sprite CSS class:  

```
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

## See Also

* [Images in the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/images)
* [TabStrip Server-Side API](/api/tabstrip)
