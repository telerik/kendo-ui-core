---
title: HTML Structure and DOM Placement
page_title: HTML Structure and DOM Placement
description: "Learn about the HTML Structure and DOM Placement of the Telerik UI Dialog HtmlHelper for {{ site.framework }}."
slug: structure_and_placement_dialoghelper_aspnetcore
position: 2
---

# HTML Structure and DOM Placement

Independently on where it is initialized, the HTML of the Dialog will be appended as a child of the document `<body>` element.

The following example demonstrates the possible markup and a possible placement of the Dialog HTML helper.

    <body>
        <div id="container1">
            @(Html.Kendo().Dialog()
                .Name("dialog")
                .Content("Content of the Dialog")
            )
            ...
        </div>
        <div id="container2">
            ...
        </div>
    </body>

The following example demonstrates how the markup of the page from the previous example changes after the initialization of the Dialog when the widget is moved to become a child of the `<body>` and its additional markup (the wrapper and the title bar) is generated.

    <body>
        <div id="container1">
            ...
        </div>
        <div id="container2">
            ...
        </div>
        <div class="k-widget k-dialog k-window">
            <div class="k-window-titlebar">...</div>
            <div id="dialog" class="k-content">
                Content of the Dialog
            </div>
        </div>
    </body>

## See Also

* [Server-Side API](/api/dialog)
