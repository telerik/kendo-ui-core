---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Editor HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/editor, /helpers/editors/editor/overview
slug: htmlhelpers_editor_aspnetcore
position: 1
---

# Editor HtmlHelper Overview

The Telerik UI Editor HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Editor widget.

The Editor allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface and generate widget value as an XHTML markup.

* [Demo page for the Editor](https://demos.telerik.com/{{ site.platform }}/editor/index)

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
* [CRUD operations]({% slug htmlhelpers_crud_editor_aspnetcore %})
* [Styling the content]({% slug htmlhelpers_editor_styling_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_editor %})

## Events

The following example demonstrates Editor HTML helper events, which could be handled on the client-side. For a complete example on basic Editor events, refer to the [demo on using the events of the Editor](https://demos.telerik.com/{{ site.platform }}/editor/events).

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

* [Basic Usage of the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor)
* [Using the API of the Editor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/editor/api)
* [Server-Side API](/api/editor)
