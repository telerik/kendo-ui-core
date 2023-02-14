---
title: Layout
page_title: Setting Up the Layout of the {{ site.framework }} StackLayout
description: "Learn how to configure the {{ site.framework }} StackLayout and control its appearance."
slug: htmlhelpers_aspnet_stacklayout_layout
position: 2
---

# Layout

The StackLayout component provides the following parameters that control its appearance:

* [Orientation](#orientation)
* [Spacing](#spacing)
* [HorizontalAlign](#horizontalalign)
* [VerticalAlign](#verticalalign)

```HTMLHelper
    @(Html.Kendo().StackLayout()
        .Name("stacklayout")
        .Width("100%")
        .Height("100%")
        .Spacing("15px")
        .Orientation(StackLayoutOrientation.Horizontal)
        .HorizontalAlign(HorizontalAlign.Stretch)
        .VerticalAlign(VerticalAlign.Stretch)
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
        spacing="15px"
        orientation="Horizontal"
        vertical-align="Stretch"
        horizontal-align="Stretch">
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

## Orientation

The `Orientation` configuration option controls whether the items nested inside the {{ site.framework }} StackLayout will be aligned horizontally or vertically. The configuration option takes a member of the `StackLayoutOrientation` enum as a parameter:

* `Horizontal`&mdash;By default, the items will be aligned horizontally.
* `Vertical`&mdash;Allows you to align the items vertically.

## Spacing

The `Spacing` configuration controls the spacing of the elements nested inside the StackLayout component. This parameter is mapped to the [gap](https://css-tricks.com/almanac/properties/g/gap/) CSS rule and accepts each value you can pass to the gap CSS rule.

## HorizontalAlign

The `HorizontalAlign` configuration option controls the alignment of the items in the {{ site.framework }} StackLayout based on the X axis. The configuration option takes a member of the `HorizontalAlign` enum:

* `Left`
* `Right`
* `Center`
* `Stretch` (default)

By default, the items will be stretched, taking all the available space.

## VerticalAlign

The `VerticalAlign` configuraiton controls the alignment of the items in the StackLayout based on the Y axis. Takes a member of the `VerticalAlign` enum:

* `Top`
* `Bottom`
* `Center`
* `Stretch` (default)

By default, the items will be stretched, taking all the available space.

## See Also

* [Overview of the StackLayout (Demo)](https://demos.telerik.com/{{ site.platform }}/stacklayout/index)
