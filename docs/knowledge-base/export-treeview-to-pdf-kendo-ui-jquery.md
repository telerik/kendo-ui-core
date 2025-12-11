---
title: Exporting TreeView to PDF in Kendo UI for jQuery
description: Learn how to export the Kendo UI for jQuery TreeView component data to a PDF file.
type: how-to
page_title: How to Export Kendo UI for jQuery TreeView Data to PDF
slug: export-treeview-to-pdf-kendo-ui-jquery
tags: kendo, treeview, export, pdf, drawing, drawdom
res_type: kb
components: ["treeview"]
ticketid: 1679577
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® for jQuery TreeView</td>
</tr>
</tbody>
</table>

## Description
I want to export the data displayed in the Kendo UI for jQuery TreeView to a PDF file. However, I can't find a method or sample code in the TreeView documentation for exporting data to PDF. How can I achieve this functionality?

This knowledge base article also answers the following questions:
- How to generate a PDF from Kendo UI for jQuery TreeView component?
- What method can be used to export TreeView data to PDF in Kendo UI for jQuery?
- Can the Kendo UI Drawing library be used to export TreeView content to PDF?

## Solution
The Kendo UI for jQuery TreeView component does not have a built-in feature for exporting data to PDF directly. However, you can achieve this functionality by using the Kendo Drawing library. Follow the steps below to export the TreeView data to a PDF file:

1. Ensure that all nodes of the TreeView you wish to export are expanded. This is necessary because the export process requires all elements to be visible in the DOM.

2. Utilize the `kendo.drawing.drawDOM` method to convert the TreeView's DOM element into a drawing scene. Refer to the [Kendo Drawing documentation](https://docs.telerik.com/kendo-ui/api/javascript/drawing/methods/drawdom) for more details on this method.

3. Use the [`kendo.saveAs`](/api/javascript/kendo/methods/saveas) function to save the generated drawing scene as a PDF file.

Below is a sample runnable example demonstrating how to export the TreeView to PDF:

```dojo
  <div class="content-wrapper">
      <button id="btnPDF">Export PDF</button>     
      <div id="treeview"></div>
    </div>

    <script>
      $(document).ready(function () {
        var rows = [];
        var isPDFExport = false;

        function onPDFExport(e) {         
          var tree = $("#treeview").data("kendoTreeView");
          isPDFExport = true;
          tree.trigger("dataBound");

          //Handle Exporting to PDF
          setTimeout(function () {
            // Convert the DOM element to a drawing using kendo.drawing.drawDOM
            kendo.drawing
              .drawDOM($(".content-wrapper"))
              .then(function (group) {
                // Render the result as a PDF file
                return kendo.drawing.exportPDF(group, {
                  paperSize: "auto",
                  margin: {
                    left: "1cm",
                    top: "1cm",
                    right: "1cm",
                    bottom: "1cm",
                  },
                });
              })
              .done(function (data) {
                // Save the PDF file
                kendo.saveAs({
                  dataURI: data,
                  fileName: "TreeView.pdf",
                  // proxyURL: "Save",
                  //forceProxy: true, //use Server Proxy for files over 1MB
                });
              });

            $("#treeview").data("kendoTreeView").collapse(".k-treeview-item");

          }, 1000);
        }

        $("#btnPDF").kendoButton({
          click: onPDFExport,
          themeColor: 'success'
        });

        var serviceRoot = "https://demos.telerik.com/service/v2/core";
        homogeneous = new kendo.data.HierarchicalDataSource({
          transport: {
            read: {
              url: serviceRoot + "/Employees"
            },
          },
          schema: {
            model: {
              id: "EmployeeId",
              hasChildren: "HasEmployees",
            },
          },
        });

        $("#treeview").kendoTreeView({
          dataSource: homogeneous,
          dataTextField: "FullName",
          dataBound: function (e) {
            if (isPDFExport) {
              e.sender.expand(".k-treeview-item");
            }
          },
        });
      });
    </script>
```


## See Also

- [Kendo UI for jQuery TreeView Overview](https://docs.telerik.com/kendo-ui/controls/treeview/overview)
- [Kendo UI Drawing Overview](https://docs.telerik.com/kendo-ui/framework/drawing/overview)
- [Kendo UI Drawing API](https://docs.telerik.com/kendo-ui/api/javascript/drawing)
- [Kendo UI TreeView API](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview)
