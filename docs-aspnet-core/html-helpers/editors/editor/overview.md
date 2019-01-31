---
title: Overview
page_title: Editor | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI Editor HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/editor
slug: htmlhelpers_editor_aspnetcore
position: 1
---

# Editor HtmlHelper Overview

The Editor HtmlHelper extension is a server-side wrapper for the [Kendo UI Editor](http://demos.telerik.com/kendo-ui/editor/index) widget.

It enables you to configure the Editor from server-side code. The [Editor](http://docs.telerik.com/kendo-ui/controls/editors/editor/overview) allows you to create rich textual content through a What-You-See-Is-What-You-Get (WYSIWYG) interface. The generated widget value is an XHTML markup.

For more information on the HtmlHelper, refer to the article on the [Editor HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/editor/overview).

## Basic Usage

The following example demonstrates how to define the Editor by using the Editor HtmlHelper.

###### Example

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

The following example demonstrates the basic configuration of the Editor HtmlHelper and how to get the Editor instance.

###### Example

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
        //Notice that the Name() of the Editor is used to get its client-side instance.
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

The following example demonstrates Editor HTML helper events, which could be handled on the client-side.

###### Example

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

* [JavaScript API Reference of the Editor](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
* [Editor HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/editor/overview)
* [Editor Official Demos](http://demos.telerik.com/aspnet-core/editor/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
