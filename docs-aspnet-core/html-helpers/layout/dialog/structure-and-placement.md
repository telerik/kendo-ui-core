---
title: HTML Structure and DOM Placement
page_title: Dialog HTML Structure and DOM Placement | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn about the HTML Structure and DOM Placement of the Kendo UI Dialog HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: structure_and_placement_dialoghelper_aspnetcore
position: 2
---

# HTML Structure and DOM Placement

Independent from where it is initialized (defined), the HTML of the Dialog will be appended as a child of the document `<body>` element.

The following example demonstrates the possible markup and a possible placement of the Dialog HTML helper.

###### Example

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

###### Example

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

* [Overview of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug overview_dialoghelper_aspnetcore %})
* [Action Buttons of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug action_buttons_dialoghelper_aspnetcore %})
* [Dimensions of the Telerik UI for ASP.NET Core Dialog HTML Helper]({% slug dimensions_dialoghelper_aspnetcore %})
