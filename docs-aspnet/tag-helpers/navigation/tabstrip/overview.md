---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TabStrip TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_tabstrip_aspnetcore
previous_url: /helpers/tag-helpers/tabstrip
position: 1
---

# TabStrip TagHelper Overview

The Telerik UI TabStrip TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TabStrip widget.

The TabStrip displays a collection of tabs with associated content. It is composed of an unordered list of items which represent tabs, and a collection of `div` elements, which contain the content for each tab.

* [Demo page for the TabStrip](https://demos.telerik.com/aspnet-core/tabstrip/tag-helper)

## Initializing the TabStrip

The following example demonstrates how to define the TabStrip by using the TabStrip TagHelper.

		<kendo-tabstrip name="tabstrip">
		</kendo-tabstrip>

## Basic Configuration

To pass the TabStrip items collection, either:

* Use the nested `<items>` tag, or
* Add `<li>` tags. This approach will not include the `tabstrip-item` tag helper attributes. And you will need to also include `<div>` tags for the content of the tabs.

```tagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab 1">
            <content><p>Content 1</p></content>
        </tabstrip-item>
        <tabstrip-item text="Tab 2">
            <content><p>Content 2</p></content>
        </tabstrip-item>
    </items>
</kendo-tabstrip>
```
```tagHelper=li
<kendo-tabstrip name="tabstrip">
    <li>Tab 1</li>
    <li>Tab 2</li>
    <div>
        <p>Content 1</p>
    </div>
    <div>
        <p>Content 2</p>
    </div>
</kendo-tabstrip>
```
```cshtml
@(Html.Kendo().TabStrip()
		.Name("tabstrip")
		.Items(items => {
				items.Add().Text("Tab 1").Content(@<text>
                    <p>Content 1</p>
                </text>);
				items.Add().Text("Tab 2").Content(@<text>
                    <p>Content 2</p>
                </text>);
		})
)
```

To further configure the TabStrip TagHelper, use its other options&mdash;`<popup-animation>`, and `<scrollable>`.

```tagHelper
<kendo-tabstrip name="tabstrip">
    <items>
        <tabstrip-item text="Tab 1">
            <content><p>Content 1</p></content>
        </tabstrip-item>
        <tabstrip-item text="Tab 2">
            <content><p>Content 2</p></content>
        </tabstrip-item>
    </items>
    <popup-animation>
        <open duration="500" />
        <close duration="300" />
    </popup-animation>
    <scrollable enabled="false" />
</kendo-tabstrip>
```
```cshtml
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(items => {
        items.Add().Text("Tab 1").Content(@<text>
            <p>Content 1</p>
        </text>);
        items.Add().Text("Tab 2").Content(@<text>
            <p>Content 2</p>
        </text>);
    })
    .Animation(animation =>
        animation.Open(open => open.Duration(500))
                 .Close(close => close.Duration(300))
    )
    .Scrollable(true)
)
```

## Functionality and Features

The TabStrip provides options for [setting up its items]({% slug items_tabstrip_aspnetcoretaghelper %}).

## See Also

* [Basic Usage of the TabStrip TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/tabstrip/tag-helper)
* [Server-Side API](/api/tabstrip)
