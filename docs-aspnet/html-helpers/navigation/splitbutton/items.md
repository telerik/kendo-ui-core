---
title: Items
page_title: Items
description: "Learn how to configure the items of the widget."
slug: htmlhelpers_splitbutton_aspnetcore_items
position: 2
---

# Items

The {{ site.product }} SplitButton provides a various set of options for its `Items`.

The following example demonstrates how to configure the SplitButton items.

```HtmlHelper
    @(Html.Kendo().SplitButton()
        .Name("splitButton")
        .Icon("clipboard")
        .Items(items =>
        {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code").Hidden(true);
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown").Enabled(false);
            items.Add().Id("favourite").Text("Mark As Favourite").ImageUrl(Url.Content("~/content/shared/icons/16/star.png"));
        })
    )
```
{% if site.core %}
```TagHelper
   <kendo-splitbutton name="splitButton" text="Paste" icon="paste">
        <splitbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html" hidden="true"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown" enabled="false"></item>
            <item id="favourite" text="Mark As Favourite" image-url="@Url.Content("~/content/shared/icons/16/star.png")"></item>
        </splitbutton-items>
   </kendo-splitbutton>
```
{% endif %}

## See Also

* [Items of the SplitButton (Demo)](https://demos.telerik.com/{{site.platform}}/splitbutton/items)
* [Server-Side API](/api/splitbutton)