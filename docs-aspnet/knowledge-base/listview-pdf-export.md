---
title: Export All ListView Pages to PDF
description: An example on how to export all pages of the Telerik UI for {{ site.framework }} ListView to PDF.
type: how-to
page_title: Export All ListView Pages to PDF
slug: listview-pdf-export
tags: listview, pdf, export, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} ListView</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.829 version</td>
 </tr>
</table>

## Description

How can I use the [Kendo UI Drawing](https://docs.telerik.com/kendo-ui/framework/drawing/overview) library to export all ListView pages to PDF?

## Solution

1. Add a button above the ListView that will be used for the PDF export.

    ```HtmlHelper
        @(Html.Kendo().Button()
        .Name("pdfExportBtn")
        .Content("Export to PDF")
        .HtmlAttributes(new { type = "button" })
        .Events(ev => ev.Click("onClick")))
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        <kendo-button name="pdfExportBtn" on-click="onClick">
            Export to PDF
        </kendo-button>
    ```
    {% endif %}

1. Within the button `click` event handler, get a reference to the ListView, store its page size into a global variable, and calculate the total records.
1. Call the [`pageSize()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/pagesize) method of the DataSource to update the current page size with all available records to export them into the PDF file. Otherwise, the exported file will contain only the current page records.
1. Subscribe only once to the `DataBound` event of the ListView to ensure that all records are loaded.
1. Use the Kendo UI Drawing API to export the ListView content.
1. Change back the page size of the ListView.

```
    <script>
        function onClick() {
            var listView = $("#listView").data("kendoListView"); // Get a reference to the ListView.
            var currentPageSize = listView.dataSource.pageSize(); // Get the page size of the DataSource.
            var total = currentPageSize * listView.dataSource.totalPages(); // Calculate the total ListView records.

            listView.dataSource.pageSize(total); // Update the page size to display all records in a single page.
            listView.one("dataBound", function(){ // Subscribe once to the "dataBound" event of the ListView.
                kendo.drawing.drawDOM($(".listview-container"), { // Initialize the PDF export.
                    paperSize: "A4",
                    multiPage: true,
                    margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
                })
                .then(function (group) {
                    return kendo.drawing.exportPDF(group);
                })
                .done(function (data) {
                    kendo.saveAs({
                        dataURI: data,
                        fileName: "TestPrint.pdf"
                    });
                });
            });
            listView.dataSource.pageSize(currentPageSize); // Change back the page size.
        }
    </script>
```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the ListView HtmlHelper](https://netcorerepl.telerik.com/woORnlvw17pZ1uXr21)
* [Sample code with the ListView TagHelper](https://netcorerepl.telerik.com/cykdHllQ19PjpwAT33)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on exporting all ListView pages to PDF](https://netcorerepl.telerik.com/woORnlvw17pZ1uXr21).
{% endif %}


## More {{ site.framework }} ListView Resources

* [{{ site.framework }} ListView Documentation]({%slug htmlhelpers_listview_aspnetcore%})

* [{{ site.framework }} ListView Demos](https://demos.telerik.com/{{ site.platform }}/listview/index)

{% if site.core %}
* [{{ site.framework }} ListView Product Page](https://www.telerik.com/aspnet-core-ui/listview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} ListView Product Page](https://www.telerik.com/aspnet-mvc/listview)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the ListView for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/listview)
* [Server-Side API Reference of the ListView for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/listview)
{% if site.core %}
* [Server-Side TagHelper API Reference of the ListView for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/listview)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)