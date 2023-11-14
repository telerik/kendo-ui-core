---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI PDFViewer component for {{ site.framework }}."
slug: events_pdfviewer_aspnetcore
position: 6
---

# Events

The Telerik UI PDFViewer for {{ site.framework }} exposes [events](/api/kendo.mvc.ui.fluent/pdfviewerbuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic PDFViewer events, refer to the [demo on using the events of the PDFViewer](https://demos.telerik.com/{{ site.platform }}/pdfviewer/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
@using Kendo.Mvc.UI

<h4>PDFViewer</h4>
<div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>

    <h4>PDFViewer</h4>
    <div>
        @(Html.Kendo().PDFViewer()
            .Name("pdfviewer")
            .Height(400)
            .Events(events => events
                .Render("onRender")
                .Open("onOpen")
                .Error("onError")
            )
        )
    </div>

    <script>
        function onRender(e) {
            console.log("page rendered: " + e.page.pageNumber);
        }

        function onOpen(e) {
            console.log("file open: " + e.file.name);
        }

        function onError(e) {
            console.log("error message: " + e.message);
        }
    </script>


    <style>
        html body #pdfviewer {
            width: 100% !important;
        }
    </style>
</div>

```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>

<div id="example">
    <kendo-pdfviewer name="pdfviewer"
        height="400"
        on-render="onRender"
        on-open="onOpen"
        on-error="onError">
    </kendo-pdfviewer>
</div>

<script>
    function onRender(e) {
        console.log("page rendered: " + e.page.pageNumber);
    }

    function onOpen(e) {
        console.log("file open: " + e.file.name);
    }

    function onError(e) {
        console.log("error message: " + e.message);
    }
</script>


<style>
    html body #pdfviewer {
        width: 100% !important;
    }
</style>

```
{% endif %}

## Next Steps

* [Using the PDFViewer Events (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/events)

## See Also

* [Using the API of the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/api)
* [PDFViewer Server-Side API](/api/pdfviewer)
* [PDFViewer Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
