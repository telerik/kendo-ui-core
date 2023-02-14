---
title: Overview
page_title: Overview
description: "Get started with the {{ site.framework }} StackLayout and learn about its features and how to initialize the component."
slug: htmlhelpers_aspnet_stacklayout_overview
position: 1
---

# StackLayout Overview

The {{ site.framework }} StackLayout is a component that easily aligns multiple elements in a vertical or horizontal order.

> The StackLayout is supported only when you use [Kendo UI Sass themes]({% slug sassbasedthemes_overview%}).

## Initializing the StackLayout

Use the Stack HtmlHelper {% if site.core %}or TagHelper {% endif %}to add the component and set the desired options:

* Set the `Width` and `Height` for the component.
* Set the `Orientation` to control the layout of the component.
* Add the desired content. Each immediate child element will represent one stack layout item.

The following example demonstrates how to initialize a StackLayout component:

```HTMLHelper
    @(Html.Kendo().StackLayout()
        .Name("stacklayout")
        .Width("100%")
        .Height("100%")
        .Orientation(StackLayoutOrientation.Horizontal)
        .Items(i=>{
            i.Add().Content(@<text>
                    <div style="background-color: aqua;">
                        Aqua colored stack item
                    </div>
                </text>);
            i.Add().Content(@<text>
                    <div style="background-color: cornflowerblue;">
                        Cornflowerblue colored stack item
                    </div>
                </text>);
            i.Add().Content(@<text>
                    <div style="background-color: blue;">
                        Blue colored stack item
                    </div>
                </text>);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-stacklayout name="stacklayout"
        width="100%"
        height="100%"
        orientation="Horizontal">
            <container>
                <div style="background-color: aqua;">
                    Aqua colored stack item
                </div>
            </container>
            <container>
                <div style="background-color: cornflowerblue;">
                    Cornflowerblue colored stack item
                </div>
            </container>
            <container>
                <div style="background-color: blue;">
                    Blue colored stack item
                </div>
            </container>
    </kendo-stacklayout>
```
{% endif %}

## Functionality and Features

* [Layout]({% slug htmlhelpers_aspnet_stacklayout_layout %})—To control the appearance of the component, you can use the built-in layout configuration.
* Width and Height—The `Width` and `Height` configuration properties allow you to adjust the dimensions of the StackLayout component.

## Next Steps

* [Configure the orientation, spacing and alignment of the StackLayout]({% slug htmlhelpers_aspnet_stacklayout_layout %})
