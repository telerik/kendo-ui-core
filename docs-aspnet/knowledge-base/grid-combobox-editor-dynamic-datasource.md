---
title: Grid ComboBox DataSource Based on Model Property
description: How to pass data into editor template in order to dynamically determine what it binds to
type: how-to
page_title: Dynamic ComboBox Editor DataSource
slug: grid-combobox-editor-dynamic-datasource
tags: aspnet, mvc, ComboBox, editor, kendo-ui, grid, datasource, model, dynamic, value
res_type: kb
ticketid: 1142217
component: grid, datasource
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Product</td>
  <td>ComboBox for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
</table>

## Description

I have a grid with where one of the columns requires a combobox editor template. What the combobox will be populated with, however, depends on a property of the item that generated the grid. Is there a way to pass this property to the editor template and then have it dynamically bind to the correct list based on the passed in property?

## Solution

The desired behaviour can be accomplished by using:

- А separate data source for the Kendo UI ComboBox with a Read action and `Data()`:

```
    @model int
    
    @(Html.Kendo().DropDownList()
       .Name("ContentId")
       .DataValueField("ContentId")
       .DataTextField("CreatedBy")
       .DataSource(dataSource =>
       {
           dataSource.Read(read =>
           {
               read.Action("GetList", "Home").Data("getContentId");
           });
       })
    )
```

- The `getContentId` is a JavaScript function, you can place in the view where the Kendo UI Grid is located in a script tag. It obtains the currently edited item and passes it to the read action of the editor as additional data:

```
    <script>
        function getContentId() {
            var row = $(".k-grid-update").closest("tr");
            var grid = $(".k-grid-update").closest("[data-role=grid]").data("kendoGrid");
            var dataItem = grid.dataItem(row);
            return { ContentId: dataItem.ContentId }
        }
    </script>
```

- Finally, the read action method can look something like this:

```
    public ActionResult GetList(int? ContentId)
    {
        if (ContentId != null && ContentId == 1)
        {
            var res = new List<ContentAssignment>()
            {
                new ContentAssignment(){ ContentAssignmentId = 1, ContentId = 1, CreatedBy = "One"},
                new ContentAssignment(){ ContentAssignmentId = 2, ContentId = 2, CreatedBy = "Two"}
            };
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        else
        {
            var res = new List<ContentAssignment>()
            {
                new ContentAssignment(){ ContentAssignmentId = 2, ContentId = 2, CreatedBy = "Two"}
            };
            return Json(res, JsonRequestBehavior.AllowGet);
        }
    }
```

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [API Reference of the DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
