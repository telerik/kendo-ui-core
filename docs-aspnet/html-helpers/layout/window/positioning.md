---
title: Positioning
page_title: Positioning
description: "Learn how to position and where to open the Telerik UI Window HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_window_positioning_aspnetcore
position: 3
---

# Positioning

You can dynamically adjust the position of the Window by using its [API](/api/window).

Usually, it is preferable to center the Window rather than open it near the HTML element which is used to define its content. Often, the Window is opened as a result of a user action rather than of the `load` event of the page. Basically, the widget can be initialized as non-visible and can be opened when needed.

The following example demonstrates how to center and open a Kendo UI for jQuery Window on a button click. If the content is loaded through Ajax, [centering occurs after the request is complete]({% slug htmlhelpers_window_loadingcontent_aspnetcore %}#load-on-demand-content).

    @(Html.Kendo().Window()
        .Name("window")
        .Title("Centered Window")
        .Visible(false)
        .Width(200)
        .Height(200)
        .Content(@<text>
                Window content here.
        </text>)
    )

    @(Html.Kendo().Button()
        .Name("button")
        .Content("Open Window")
        .Events(e => e.Click("onClick"))
    )

The following example demonstrates how to center and open the Window upon button click.

    function onClick(e) {
        var win = $("#window").data("kendoWindow");
        win.center().open();
    }

## See Also

* [Server-Side API](/api/window)
