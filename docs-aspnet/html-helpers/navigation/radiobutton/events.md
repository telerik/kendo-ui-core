---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI RadioButton component for {{ site.framework }}."
components: ["radiobutton"]
slug: events_radiobutton_aspnetcore
position: 6
---

# Events

The Telerik UI for {{ site.framework }} RadioButton component exposes [events](/api/kendo.mvc.ui.fluent/radiobuttonbuilder) that allow you to control and customize the behavior of the UI component.

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

## See Also

* [Basic Usage of the RadioButton for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/radiobutton)
* [PDFViewer Server-Side API](/api/radiobutton)
* [PDFViewer Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/radiobutton)
