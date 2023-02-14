---
title: Overview
page_title: Overview
description: "Get started with the {{ site.framework }} GridLayout and learn about its features and how to initialize the component."
slug: htmlhelpers_aspnet_gridlayout_overview
position: 1
---

# GridLayout Overview

The {{ site.framework }} GridLayout component allows you to arrange the contents of the component in rows and columns in a grid structure. The arrangement of content relies on the CSS Grid functionality. For more information on the CSS Grid, refer to [the official CSS Grid documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).

> The GridLayout is supported only when you use [Kendo UI Sass themes]({% slug sassbasedthemes_overview%}).

## Initializing the GridLayout

Use the Grid HtmlHelper {% if site.core %}or TagHelper {% endif %}to add the component and set the desired options:

* Use the `Rows` confiuguration option to define the number of rows and set individual row height, if desired.
* Use the `Columns` confiuguration option to define the number of columns and set individual column width, if desired.
* Use the `Items` configuration to position the items. Set the `Row`, `Column`,`RowSpan`, and `ColumnSpan` options to adjust the position of an item. Refer to the [Items]({% slug htmlhelpers_aspnet_gridlayout_items %}) article for further details on the configuration options for the GridLayout items.

The following example demonstrates how to initialize a GridLayout with three rows and three columns:

```HtmlHelper
@(Html.Kendo().GridLayout()
        .Name("gridlayout")
        .RowSpacing("6px")
        .ColumnSpacing("10px")
        .Rows(c=>{
            c.Add().Height("20px");
            c.Add().Height("100px");
            c.Add().Height("100px");
        })
        .Columns(c=>{
            c.Add().Width("300px");
            c.Add().Width("300px");
            c.Add().Width("300px");
        })
        .Items(i=>{
            i.Add().Row(1).Column(1).ColumnSpan(3)
                .Content("Header");
            i.Add().Row(2).Column(1).ColumnSpan(2).RowSpan(2).Content("Some content here"));
            i.Add().Row(2).Column(3)
                .Content("<div class='myClass'>Other content here</div>");
            i.Add().Row(3).Column(3).Content(
                Html.Kendo().Calendar()
                .Name("calendar")
                .ToHtmlString());
            )
        })
        )
```
{% if site.core %}
```TagHelper
    <kendo-gridlayout name="gridlayout" row-spacing="6px" column-spacing="10px">
        <gridlayout-rows>
            <gridlayout-row height="20px" />
            <gridlayout-row height="100px" />
            <gridlayout-row height="100px" />
        </gridlayout-rows>
        <gridlayout-columns>
            <gridlayout-column width="300px" />
            <gridlayout-column width="300px" />
            <gridlayout-column width="300px" />
        </gridlayout-columns>
        <gridlayout-items>
            <gridlayout-item row=1 column=1 column-span=1>
                Header
            </gridlayout-item>
            <gridlayout-item row=2 column=2 column-span=2 row-span=2>
                Some content here
            </gridlayout-item>
            <gridlayout-item row=2 column=3>
                <div class='myClass'>Some other content here</div>
            </gridlayout-item>
            <gridlayout-item row=3 column=3>
                <kendo-calendar name="calendar" >
                </kendo-calendar>
            </gridlayout-item>
        </gridlayout-items>
    </kendo-gridlayout>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_aspnet_gridlayout_items %})—the `Items` configuration allows you to adjust each Item's position in the defined GridLayout.
* Rows and columns—To configure the appearance of the GridLayout, you can use the `Rows` and `Columns` configuration properties.

## See Also

* [GridLayout Items]({% slug htmlhelpers_aspnet_gridlayout_items %})
* [Overview of the GridLayout (Demo)](https://demos.telerik.com/{{ site.platform }}/gridlayout/index)
* [Adaptive Rendering of the GridLayout (Demo)](https://demos.telerik.com/{{ site.platform }}/gridlayout/adaptive)
