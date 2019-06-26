---
title: Overview
page_title: Editor Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/editor
slug: htmlhelpers_editor_aspnetcore
position: 1
---

# Editor HtmlHelper Overview

The [Editor](http://docs.telerik.com/kendo-ui/controls/editors/editor/overview) allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface.

The generated widget value is an XHTML markup.

The Editor HtmlHelper extension is a server-side wrapper for the [Kendo UI Editor](http://demos.telerik.com/kendo-ui/editor/index) widget. For more information on the Editor HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](http://docs.telerik.com/aspnet-mvc/helpers/editor/overview).

## Initializing the Editor

The following example demonstrates how to define the Editor by using the Editor HtmlHelper.

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Value(@<text>
        <p>
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.
        </p>
    </text>)
)
```

## Basic Configuration

The following example demonstrates the basic configuration of the Editor HtmlHelper.

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Encoded(true)
    .HtmlAttributes(new { style = "width: 100%;height:440px" })
    .Value(@<text>
        <p>
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.
        </p>
    </text>)
)

<script type="text/javascript">
    $(function() {
        // The Name() of the Editor is used to get its client-side instance.
        var editor = $("#editor").data("kendoEditor");
    });
</script>
```

## Functionality and Features

* [Modes of operation]({% slug htmlhelpers_editor_modes_aspnetcore %})
* [Tools]({% slug htmlhelpers_editor_tools_aspnetcore %})
* [Pasting content]({% slug htmlhelpers_editor_pasting_aspnetcore %})
* [Serializing and deserializing content]({% slug htmlhelpers_editor_serialize_aspnetcore %})
* [Image browser]({% slug htmlhelpers_editor_image_browser_aspnetcore %})
* [Immutable elements]({% slug htmlhelpers_editor_immutable_aspnetcore %})
* [Styling the content]({% slug htmlhelpers_editor_styling_aspnetcore %})

## Events

The following example demonstrates Editor HTML helper events, which could be handled on the client-side. For a complete example on basic Editor events, refer to the [demo on using the events of the Editor](https://demos.telerik.com/aspnet-core/editor/events).

```
@(Html.Kendo().Editor()
    .Name("editor")
    .Events(e => e
        .Change("onChange")
        .Execute("onExecute")
        .Keydown("onKeydown")
        .Keyup("onKeyup")
        .Paste("onPaste")
        .PdfExport("onPdfExport")
        .Select("onSelect")
    )
)

<script>
    function onChange(e) {
        kendoConsole.log("value change");
    }

    function onExecute(e) {
        kendoConsole.log("command :: " + e.name);
    }

    function onKeydown(e) {
        kendoConsole.log("key down");
    }

    function onKeyup(e) {
        kendoConsole.log("key up");
    }

    function onPaste(e) {
        kendoConsole.log("paste :: " + kendo.htmlEncode(e.html));
    }

    function onPdfExport(e) {
        kendoConsole.log("PDF export");
    }

    function onSelect(e) {
        kendoConsole.log("selection  change");
    }
</script>
```

## See Also

* [Basic Usage of the Editor HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/editor)
* [Using the API of the Editor HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/editor/api)
* [JavaScript API Reference of the Editor](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
