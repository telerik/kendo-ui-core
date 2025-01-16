---
title: Toolbar and Tools
page_title: Toolbar and Tools
description: "Get started with the Telerik UI PDFViewer component for {{ site.framework }} and learn how to use and define the tools in its toolbar."
previous_url: /helpers/pdf/pdfviewer/toolbar
slug: htmlhelpers_pdfviewer_toolbar_aspnetcore
position: 4
---

# Toolbar and Tools

Internally, the PDFViewer uses the [{{ site.product }} Toolbar]({% slug htmlhelpers_toolbar_aspnetcore %}) and provides a set of default tools and corresponding commands in its toolbar.

You can also define [custom tools](#custom-tools) in the toolbar that trigger custom logic.

## Built-In Tools

You can control the number and type of the rendered tools by adding only the desired tools in the [`Items()`](/api/kendo.mvc.ui.fluent/pdfviewertoolbarsettingsbuilder#itemssystemaction) configuration of the `Toolbar`. For the full list of configuration options, refer to the [client-side API of the ToolBar items](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer/configuration/toolbar.items).

The toolbar of the PDFViewer supports the following built-in tools:

* `pager`
* `zoom`
* `zoomInOut`
* `toggleSelection`
* `search` 
* `open` 
* `download`
* `print`
* `annotations`

> Running an Adblock extension in Chrome might treat the new browser tab for the print dialog as a potential ad and block it.

The `zoom`, `zoomInOut`, `toggleSelection`, `search`, and `print` tools are available only with [PDFjs processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore%}).

The following example demonstrates basic configuration options for the PDFViewer toolbar tools. You can also add `spacer` elements to group a specific set of tools. 

```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .Toolbar(toolbar =>
            toolbar.Items(items =>
            {
                items.Add().Name("pager");
                items.Add().Name("spacer");
                items.Add().Name("zoom");
                items.Add().Name("zoomInOut");
                items.Add().Name("toggleSelection");
                items.Add().Name("search");
                items.Add().Name("open");
                items.Add().Name("download");
                items.Add().Name("print");
            })
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-pdfviewer name="pdfviewer">
        <toolbar enabled="true">
            <pdfviewer-toolbar-items>
                <pdfviewer-toolbar-item name="pager">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="spacer">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="zoom">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="zoomInOut">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="toggleSelection">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="search">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="open">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="download">
                </pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item name="print">
                </pdfviewer-toolbar-item>
            </pdfviewer-toolbar-items>
        </toolbar>
    </kendo-pdfviewer>
```
{% endif %}

The `open`, `download`, and `print` built-in tools are displayed on the right-side of the toolbar (next to the `search` tool) by default. To update the default appearance of these tools and display them as options of a [DropDownList]({% slug htmlhelpers_dropdownlist_aspnetcore%}), which is added as first item in the toolbar, enable the [`ContextMenu`](/api/kendo.mvc.ui.fluent/pdfviewertoolbarsettingsbuilder#contextmenu) option of the `Toolbar` configuration.

```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .Toolbar(toolbar => toolbar.ContextMenu(true))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-pdfviewer name="pdfviewer">
        <toolbar enabled="true" context-menu="true">
        </toolbar>
    </kendo-pdfviewer>
```
{% endif %}

You can also use the [`add()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar/methods/add) and [`remove()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar/methods/remove) client-side API methods to programmatically manage the rendered tools in the PDFViewer.

```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")     
    )
```
{% if site.core %}
```TagHelper
    <kendo-pdfviewer name="pdfviewer">
    </kendo-pdfviewer>
```
{% endif %}
```JS
    <script>    
      var pdfviewer = $("#pdfviewer").getKendoPDFViewer(); // Get a reference to the PDFViewer.
      var printToolElement = $(".k-toolbar").find('button[data-command="PrintCommand"]'); // Select the 'print' tool button with jQuery.
      pdfviewer.toolbar.remove(printToolElement); // Remove the 'print' tool.
      pdfviewer.toolbar.add({ // Add a custom tool in the toolbar.
        type: "button",
        text: "Custom tool", 
        click: function() { 
            console.log("Cuatom tool button is clicked.");
        },
        togglable: true
      });
    </script>
```

## Custom Tools

The toolbar of the PDFViewer component supports custom tools.

The following example demonstrates how to add a custom tool to the toolbar.

```HtmlHelper
    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")
        .Toolbar(toolbar =>
            toolbar.Items(items =>
            {
                items.Add().Text("Custom tool").Click("customToolClick").Type("button");
            })  
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

     <kendo-pdfviewer name="pdfviewer">
        <toolbar enabled="true">
            <pdfviewer-toolbar-items>
                <pdfviewer-toolbar-item text="Custom tool" click="customToolClick" type="button">
                </pdfviewer-toolbar-item>
            </pdfviewer-toolbar-items>
        </toolbar>
    </kendo-pdfviewer>
```
{% endif %}
```JS
    <script>
        function customToolClick() {
            // Execute the desired custom logic when the custom tool is clicked.
        }
    </script>
```

## See Also

* [Basic Usage of the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)
* [Client-Side API Reference of the ToolBar for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar)
* [Server-Side API Reference of the PDFViewer for {{ site.framework }}](/api/pdfviewer)
{% if site.core %}
* [Server-Side TagHelper API Reference of the PDFViewer for {{ site.framework }}](/api/taghelpers/pdfviewer)
{% endif %}
