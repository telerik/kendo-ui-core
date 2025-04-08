---
title: Resizing the Grid to Match the Visible Column Widths
description: How can I resize the Grid to match the visible column widths when hiding or showing columns while the sum of the column widths is less than the initial width of the Grid?
type: how-to
page_title: Resizing When Hiding or Showing Columns
slug: grid-auto-resize-when-hiding-showing-columns
tags: grid, auto, resize, when, hiding, showing, columns, match, width
res_type: kb
---

## Environment 

<table>
	<tbody>
        <tr>
			<td>Product</td>
			<td>Progress® Telerik® UI Grid for {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I resize the Grid to match the visible column widths when hiding or showing columns while the sum of the column widths is less than the initial width of the Grid?

## Solution 1

Enforce a `min-width` style to the table element using only CSS:
```
  <style>
    #grid table {
      min-width:100%;
    }
  </style>
```

## Solution 2

1. Create a function to calculate the sum of widths of all visible columns `getAllColumnsWidth(e)`.

1. Call a method that sets the Grid's width, use [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound), [`columnShow`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnshow), and [`columnHide`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnhide) events.

```View

@(Html.Kendo().Grid<AutoResizeGridRemovingColumns.Models.OrderViewModel>()
     .Name("grid")
     .Columns(columns =>
     {
         columns.Bound(p => p.OrderID).Width(100).Filterable(false);
         columns.Bound(p => p.Freight).Width(200);
         columns.Bound(p => p.OrderDate).Width(200).Format("{0:MM/dd/yyyy}");
         columns.Bound(p => p.ShipName).Width(200);
         columns.Bound(p => p.ShipCity).Width(100);
     })
     .Pageable()
     .Scrollable()
     .ColumnMenu()
     .Events(ev=>
     {
         ev.DataBound("onDataBound");
         ev.ColumnHide("onColumnHide");
         ev.ColumnShow("onColumnShow");
     })
     .HtmlAttributes(new { style = "height:200px;" })
     .DataSource(dataSource => dataSource
         .Ajax()
         .PageSize(10)
         .Read(read => read.Action("Orders_Read", "Grid"))
     )
 )
```
```JS script.js
function onDataBound(e) {
        setGridWidth(e)
    }
    function onColumnHide(e) {
        setGridWidth(e)
    }
        
    function onColumnShow(e) {
        setGridWidth(e)
      
    }
    
    function setGridWidth(e) {
        e.sender.wrapper.width(getAllColumnsWidth(e))
    }

    function getAllColumnsWidth(e) {
        var columns = e.sender.columns;
        var columnWidthSum = 0;
        columns.forEach(col => {
            if (!col.hidden) {
                var removedPX = col.width.slice(0, -2); // remove px
                columnWidthSum += Number(removedPX)
            }
        })
        return columnWidthSum + kendo.support.scrollbar();
    }
```
```Controller
	public partial class GridController : Controller
    {
		public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
		{
			var result = Enumerable.Range(0, 50).Select(i => new OrderViewModel
			{
				OrderID = i,
				Freight = i * 10,
				OrderDate = DateTime.Now.AddDays(i),
				ShipName = "ShipName " + i,
				ShipCity = "ShipCity " + i
			});

			return Json(result.ToDataSourceResult(request));
		}
	}
```
```Model
    public class OrderViewModel
    {
        public int OrderID { get; internal set; }
        public int Freight { get; internal set; }
        public DateTime OrderDate { get; internal set; }
        public string ShipName { get; internal set; }
        public string ShipCity { get; internal set; }
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
