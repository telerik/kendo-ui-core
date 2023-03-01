---
title: Items
page_title: Items
description: "Learn how to configure the items of the widget."
slug: htmlhelpers_dropdownbutton_aspnetcore_items
position: 2
---

# Items

The {{ site.product }} DropDownButton provides a various set of options for its `Items`.

The following example demonstrates how to configure the DropDownButton items.

```HtmlHelper
    @(Html.Kendo().DropDownButton()
        .Name("DropDownButton")
        .Icon("clipboard")
        .Items(items =>
        {
            items.Add().Id("keep-text").Text("Keep Text Only").Icon("clipboard-text");
            items.Add().Id("paste-html").Text("Paste as HTML").Icon("clipboard-code").Hidden(true);
            items.Add().Id("paste-markdown").Text("Paste Markdown").Icon("clipboard-markdown").Enabled(false);
            items.Add().Id("favorite").Text("Mark As Favorite").ImageUrl(Url.Content("~/content/shared/icons/16/star.png"));
        })
    )
```
{% if site.core %}
```TagHelper
   <kendo-dropdownbutton name="DropDownButton" text="Paste" icon="paste">
        <dropdownbutton-items>
            <item id="keep-text" text="Keep Text Only" icon="paste-plain-text"></item>
            <item id="paste-html" text="Paste as HTML" icon="paste-as-html" hidden="true"></item>
            <item id="paste-markdown" text="Paste Markdown" icon="paste-markdown" enabled="false"></item>
            <item id="favourite" text="Mark As Favourite" image-url="@Url.Content("~/content/shared/icons/16/star.png")"></item>
        </dropdownbutton-items>
   </kendo-dropdownbutton>
```
{% endif %}

## See Also

* [Items of the DropDownButton (Demo)](https://demos.telerik.com/{{site.platform}}/dropdownbutton/items)
* [Server-Side API](/api/dropdownbutton)