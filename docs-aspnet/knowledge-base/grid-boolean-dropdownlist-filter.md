---
title: Using DropDownList as Boolean Filter in Grid
description: How can I set up a custom filter for a Boolean column in the {{ site.product }} Grid and have a DropDownList which lists true, false, all?
type: how-to
page_title: Filtering Boolean Grid Column with DropDownList
slug: grid-boolean-dropdownlist-filter
tags: grid, dropdownlist, filter, boolean, column, true, false
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

How can I set up a custom filter for a Boolean column in the Grid and have a DropDownList which lists true, false, all?

## Solution

1. Create a template function to initialize the DropDownList.
```JS
function boolFilterTemplate(input) {
            input.kendoDropDownList({
                dataSource: {
                    data: [
                        { text: "True", value: true },
                        { text: "False", value: false }
                    ]
                },
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                optionLabel: "All"
            });
        }
```

2. Use the [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit) event of the Grid to replace the default filter label with more appropriate text.

```JS
function onFilterMenuInit(e) {
            if (e.field == "Discontinued") {
                // replace default text in filter menu
                e.container.find(".k-filter-help-text").text("Show items with value:");
            }
        }
```

3. Use the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filter) event of the Grid to replace the string value in the generated filter expression with its Boolean equivalent.

```JS
function onFilter(e) {
            if (e.field === "Discontinued") {
                var filter = e.filter;
                if (filter && filter.filters && filter.filters.length > 0) {
                    var filters = filter.filters;
                    // convert the filter string value to a boolean one
                    filters[0].value = (filters[0].value === "true");
                }
            }
        }
```
Example:

```View
@(Html.Kendo().Grid<BooleanFilterGrid.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID).Filterable(false);
        columns.Bound(p => p.Freight);
        columns.Bound(p => p.IsTrue);
        
    })
    .Pageable()
    .Scrollable()
    .Filterable()
    .Events(ev=>ev.Filter("onFilter"))
    .HtmlAttributes(new { style = "height:440px;" })
    .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(10)
        .Read(read => read.Action("Orders_Read", "Grid"))
    )
)
```
```JS script.js
        $(document).ready(function () {
        var grid = $("#grid").data('kendoGrid');
        var options = grid.getOptions();
        options.columns[2].filterable = { ui: boolFilterTemplate };
        options.filterMenuOpen = onFilterMenuInit;
        grid.setOptions(options);

        function boolFilterTemplate(input) {
            input.kendoDropDownList({
                dataSource: {
                    data: [
                        { text: "True", value: true },
                        { text: "False", value: false }
                    ]
                },
                dataTextField: "text",
                dataValueField: "value",
                valuePrimitive: true,
                optionLabel: "All"
            });
        }

        function onFilterMenuInit(e) {
            if (e.field == "IsTrue") {
                // replace default text in filter menu
                e.container.find(".k-filter-help-text").text("Show items with value:");
            }
        }
    });

    function onFilter(e) {
        if (e.field === "IsTrue") {
            var filter = e.filter;
            if (filter && filter.filters && filter.filters.length > 0) {
                var filters = filter.filters;
                // convert the filter string value to a boolean one
                filters[0].value = (filters[0].value === "true");
            }
        }
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
				ShipCity = "ShipCity " + i,
				IsTrue = i % 2 == 0
			}) ;

			return Json(result.ToDataSourceResult(request));
		}
	}
```
```Model
    public class OrderViewModel
    {
        public int OrderID { get; set; }
        public bool IsTrue { get; set; }
        public decimal? Freight { get; set; }
        [Required]
        public DateTime? OrderDate { get; set; }
        public string ShipCity { get; set; }

        public string ShipName{ get; set; }
  
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
