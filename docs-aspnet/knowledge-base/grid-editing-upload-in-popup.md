---
title: Grid Upload in Custom Popup Edit Template
description: An example on how to use the Upload as an editor in the Grid for ASP.NET Core.
type: how-to
page_title: Use Upload in Grid
slug: grid-editing-upload-in-popup
tags: aspnet, core,  kendo, kendo-ui, grid, edit, popup, upload, custom, files
ticketid: 1364607
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>

## Description

When adding an Upload component to a grid, using EditorTemplateName, the component seems to work, however, when I check my Save method on , it is always receiving an empty list. The origin of the problem is that the payload is not automatically bound to the `IEnumerable<IFormFile> files` but it is sent to the server.

## Solution

The expected parameter is `files` and the sent one from the Kendo UI Upload initialized as an editor has another name - `FileUploads.files`. This occurs because of the `Html.EditorFor()` syntax. 

Instead:

1. Do not use the `@Html.EditorFor()` syntax to call the Upload in the form. Include it in the custom PopUp editor, to avoid the issue with the name:
    - the `Upload` event handler passes the model Id so it can be intercepted in the controller
    - the `Success` handler ensures that the grid column template will reflect the change instantly and show the name of the file:

    ```
       @model CoreEditableGrid.Models.OrderViewModel
 
        @Html.HiddenFor(m => m.OrderID)
        @(Html.Kendo().TextBoxFor(model => model.ShipName))

        @(Html.Kendo().Upload()
           .Name("files")
           .Multiple(true)
           .HtmlAttributes(new { aria_label = "files" })
           .Events(e => e
           .Upload(@<text>
               function(e) {
                 e.data = { id: $("#OrderID").val() };
               }
           </text>).Success(@<text>
               function(e) {
                var grid = $("#grid").data("kendoGrid");
                var dataItem = grid.dataSource.get($("#OrderID").val());
                dataItem.FileUploads = e.files;
               }
           </text>))
              .Async(a => a
              .Save("Post", "Grid")
              .AutoUpload(true))
        )
    ```

1. Add a `ClientTemplate` which caters for the difference in the file names sent by the success handler and the `IFormFile`:

    ```
        columns.Bound(p => p.FileUploads).ClientTemplate("#=getFileTemplate(data)#");
        <script>
            function getFileTemplate(data) {
                    var fileNames = data.FileUploads.map(function (file) {
                        return file.FileName ? file.FileName : file.name + " ";
                    });
                    return fileNames;
            }
        </script>
    ```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
