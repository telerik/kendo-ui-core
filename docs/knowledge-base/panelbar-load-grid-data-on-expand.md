---
title: Load the Grid When the PanelBar Is Selected
page_title: Load the Grid When Its PanelBar Is Expanded | Kendo UI Grid and PanelBar for jQuery
type: how-to
description: An example on how to load the Kendo UI Grid for jQuery when its PanelBar item is activated.
slug: panelbar-load-grid-data-on-expand
tags: grid, panelbar, item, expanded, selected
ticketid: 1401786, 1386928
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® PanelBar, Progress® Kendo UI® PanelBar for ASP.NET MVC, Progress® Kendo UI® Grid, Progress® Kendo UI® Grid for ASP.NET MVC</td>
	</tr>
</table>


## Description

I have a Kendo UI Grid within a Kendo UI PanelBar and I want to load the data on each Grid when the specific panel is expanded.

How can I load the Grid when the PanelBar is activated for the first time? How can I trigger the `load` event of the Grid from the panel header expansion?

## Solution

1. Set the Grids [not to bind automatically](/api/javascript/ui/grid/configuration/autobind) so they do not request data upon initialization.
1. In the [`expand` event of the PanelBar](/api/javascript/ui/panelbar/events/expand), call their [`dataSource.read()` method](/api/javascript/data/datasource/methods/read).
1. Keep a flag (for example, in the DOM as a `data` attribute on the Grid or PanelBar element) to know if you need to read the data source.

Another option is to use the [`expand`](/api/javascript/ui/panelbar/events/expand) event of the PanelBar to add the Grid to the DOM dynamically and instantiate the jQuery widget only then. By doing this, you avoid creating the Grid with the initial page load thereby making the page more lightweight. This approach is useful if this item from the PanelBar is not expected to be used often by the end user. In this case, you will not be able to use the Kendo UI helpers for ASP.NET MVC, though, and you will need to rely on the jQuery widget syntax only.

The following example is jQuery-based.

```dojo
<ul id="panelbar">
  <li class="k-state-active">
    First item
  </li>
  <li>
    The grid is here, expand to bind
    <div id="grid"></div>
  </li>
</ul>


<script>
function onExpand(e) {
  if ($(e.item).find("span.k-header").first().text().trim() == "The grid is here, expand to bind") { //or otherwise detect the item - e.g., if you have attributes or classes on it
    bindGrid();//of course, you can use a DOM traversal and pass the grid element to the method, or othewise refactor the code
  }
}

function bindGrid() {
  var gridElem = $("#grid");
  if (!gridElem.data("alreadyBound")) {
    gridElem.data("kendoGrid").dataSource.read();
    gridElem.data("alreadyBound", true);
  }
}

$(document).ready(function() {

  $("#panelbar").kendoPanelBar({
    expandMode: "single",
    expand: onExpand,//this is how you hook to the event that will be used to bind the grid
  });


  $("#grid").kendoGrid({
    autoBind: false,//this is how you prevent the initial bind
    //the rest of the properties are not really relevant, they just set up a grid

    dataSource: {
      type: "odata",
      transport: {
        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
      },
      schema: {
        model: {
          fields: {
            OrderID: { type: "number" },
            Freight: { type: "number" },
            ShipName: { type: "string" },
            OrderDate: { type: "date" },
            ShipCity: { type: "string" }
          }
        }
      },
      pageSize: 20,
      serverPaging: true,
      serverFiltering: true,
      serverSorting: true
    },
    height: 550,
    filterable: true,
    sortable: true,
    pageable: true,
    columns: [{
      field:"OrderID",
      filterable: false
    },
              "Freight",
              {
                field: "OrderDate",
                title: "Order Date",
                format: "{0:MM/dd/yyyy}"
              }, {
                field: "ShipName",
                title: "Ship Name"
              }, {
                field: "ShipCity",
                title: "Ship City"
              }
             ]
  });
});
</script>
```

 The following example is MVC-based.

```View
@{
	ViewBag.Title = "Home Page";
}


@(Html.Kendo().PanelBar()
					.Name("panelbar")
					.ExpandMode(PanelBarExpandMode.Single)
					.Events(ev => ev.Expand("pbExpandHandler"))
					.Items(panelbar =>
					{
						panelbar.Add().Text("First tab to showcase things").Expanded(true);

						panelbar.Add().Text("The tab with the grid")
							.Content(@<div>@RenderStatusGrid()</div>);

					})
)

@helper RenderStatusGrid()
{
	@(Html.Kendo().Grid<SampleMvcApp.Models.SampleData>()
							.Name("grid")
							.Columns(columns =>
							{
								columns.Bound(c => c.theValue);
								columns.Bound(c => c.theText);
							})
							.HtmlAttributes(new { style = "height: 550px;" })
							.Scrollable()
							.Groupable()
							.Sortable()
							.AutoBind(false)//here's how to stop the grid from binding automatically
							.Pageable(pageable => pageable
								.Refresh(true)
								.PageSizes(true)
								.ButtonCount(5))
							.DataSource(dataSource => dataSource
								.Ajax()
								.Read(read => read.Action("GetData", "Home"))
								.PageSize(20)
							)
	)

}

<script>
	function bindGrid() {
		var gridElem = $("#grid");
		if (!gridElem.data("alreadyBound")) {
			gridElem.data("kendoGrid").dataSource.read();
			gridElem.data("alreadyBound", true);
		}
	}

	function pbExpandHandler(e) {
		if ($(e.item).find("a.k-header ").first().text() == "The tab with the grid") { //or otherwise detect the item - e.g., if you have attributes or classes on it
			bindGrid();//of course, you can use a DOM traversal and pass the grid element to the method, or othewise refactor the code
		}
	}
</script>
```
```Controller
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SampleMvcApp.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult GetData([DataSourceRequest] DataSourceRequest request)
		{
			var data = Enumerable.Range(1, 200).Select(x => new SampleMvcApp.Models.SampleData {
				theValue = x,
				theText = "item " + x
			});
			return Json(data.ToDataSourceResult(request));
		}
	}
}
```
```Model
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SampleMvcApp.Models
{
	public class SampleData
	{
		public int theValue { get; set; }
		public string theText { get; set; }
	}
}
```
