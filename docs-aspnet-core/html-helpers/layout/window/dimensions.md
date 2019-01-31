---
title: Dimensions
page_title: Dimensions | Kendo UI Window HtmlHelper for ASP.NET Core
description: "Learn how to configure the dimensions of the Kendo UI Window HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_window_dimensions_aspnetcore
position: 2
---

# Dimensions

By default, the Window HtmlHelper does not have any pre-set dimensions and its size depends on its content.

## Manual Size Control

Apart from the automatic size calculation, you can explicitly set the `Width()` and the `Height()` of the HtmlHelper in pixels.

###### Example

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Alvar Aalto")
        .Width(300)
        .Height(250)
        .Content(@<text>
            <p>
                Alvar Aalto is one of the greatest names in modern architecture and design.
                Glassblowers at the iittala factory still meticulously handcraft the legendary vases
                that are variations on one theme, fluid organic shapes that let the end user decide the use.
            </p>
        </text>)
    )

The Window HTML helper also allows configuration for its `min` and `max` dimensions (height and width).

###### Example

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Alvar Aalto")
        .MinWidth(150)
        .MaxWidth(450)
        .MinHeight(200)
        .MaxHeight(300)
        .Content(@<text>
            <p>
                Alvar Aalto is one of the greatest names in modern architecture and design.
                Glassblowers at the iittala factory still meticulously handcraft the legendary vases
                that are variations on one theme, fluid organic shapes that let the end user decide the use.
            </p>
        </text>)
    )

## Size Adjustment Based on Content

If the Window contains horizontally expandable block-level elements&mdash;including other HtmlHelpers such as the Grid, Editor, and others&mdash;the widget can expand horizontally to the point of touching the right edge of the browser viewport. In such cases, the widget sticks to the right viewport edge and cannot be separated from it. This issue occurs because the Window is absolutely positioned with CSS. To avoid such behavior, set an appropriate width to the widget, or a (max-)width to its content.

The lack of restrictions over the dimensions for vertical expanding of the Window and its content might result in undesired behavior&mdash;for example, the rendition of a popup which is higher than the browser viewport.

If the Window uses an `iframe` element, it does not resize automatically according to the iframe content, because there is no relationship between the content and size of the iframe. However, iOS devices do not support iframe scrolling and expand iframes according to their content, which might increase the Window height too much. That is why it is not recommended to use the Window in an iframe mode on Apple touch devices.

## See Also

* [Overview of Window HTML helper]({% slug htmlhelpers_window_aspnetcore %})
* [Positioning]({% slug htmlhelpers_window_positioning_aspnetcore %})
* [Constraining Position]({% slug htmlhelpers_window_constrain_aspnetcore %})
* [Loading Content]({% slug htmlhelpers_window_loadingcontent_aspnetcore %})
* [Using iframe]({% slug htmlhelpers_window_iframe_aspnetcore %})
* [Integration with Forms]({% slug htmlhelpers_window_forms_aspnetcore %})
