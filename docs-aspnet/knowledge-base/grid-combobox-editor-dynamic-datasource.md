---
title: Implementing a Dynamic ComboBox in the Grid
description: How to pass data to the ComboBox editor template in order to dynamically determine what it binds to. The ComboBox is used in one of the {{ site.product }} Grid columns.
type: how-to
page_title: Implementing a Dynamic ComboBox Editor in the Grid
slug: grid-combobox-editor-dynamic-datasource
tags: aspnet, mvc, ComboBox, editor, kendo-ui, grid, datasource, model, dynamic, value
res_type: kb
components: ["general"]
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

I have a Grid where one of the columns requires a ComboBox editor template. What the ComboBox will be populated with, however, depends on a property of the item that generated the Grid. Is there a way to pass this property to the editor template and then have it dynamically bind to the correct list based on the passed in property?

## Solution

The desired behavior can be accomplished by using:

- A separate data source for the Kendo UI ComboBox with a Read action and `Data()`:

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
            var row = $(".k-grid-save-command").closest("tr");
            var grid = $(".k-grid-save-command").closest("[data-role=grid]").data("kendoGrid");
            var dataItem = grid.dataItem(row);
            return { ContentId: dataItem.ContentId }
        }
    </script>
```

- Finally, the read action method can look something like this:

```C#
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

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
