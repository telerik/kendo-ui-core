---
title: Formatting Cell Height to scale dynamically when Exporting the Grid to Excel
description: How can I format the cell height to scale dynamically during the export of the {{ site.product }} Grid to Excel?
page_title: Auto Height for rows of Excel Export
slug: grid-export-cell-auto-height
tags: grid, export, excel, format, cells, height, auto-height, core, mvc, telerik
res_type: kb
component: grid
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2023.2.829</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

How can I format the cell height to scale dynamically  during the export of the {{ site.product }} Grid to Excel?

## Solution

To achieve the desired scenario:

1. Handle the [`ExcelExport`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#excelexportsystemstring) event of the Grid.
1. Convert all the Grid items to a sanitized JSON format by using the [`toJSON`](https://docs.telerik.com/kendo-ui/api/javascript/data/observableobject/methods/tojson) client-side method.
1. Parse the model from the Excel Export's event data to a JSON object.
1. Generate the column cells by using the previously obtained property names in a valid workbook format.
1. Iterate through the JSON data and manually construct each of the row cells in a valid workbook format.
1. Use the `rowHeight` formula to calculate the resizing.
1. The `rowHeight` formula checks if the length of the `contentToWrap` string is bigger than a given number (27 in this case), and if it is, `rowHeight` is set to a number that we get from rounding up `(contentToWrap.length / 27) * 20` in order to get a dynamic resizing value, otherwise set the `rowHeight` to 20. 
1. Create a [`Workbook`](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook) and add the already created data to its sheets.
1. Export.


```Index.cshtml
    @(Html.Kendo().Grid<wrap_text_in_Export_excel.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductID);
            columns.Bound(p => p.ProductName);
        })
        .ToolBar(tb => tb.Excel())
        .Events(ev => ev.ExcelExport("onExcelExport")) // Bind to the onExcelExport() function.
        .Pageable()
        .Sortable()
        .Scrollable()
        .Filterable()
        .HtmlAttributes(new { style = "height:550px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Read", "Grid"))
        )
    )   
```

```Model
    namespace wrap_text_in_Export_excel.Models
    {
        public class OrderViewModel
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }   
        }
    }   
```

```Controller
    namespace wrap_text_in_Export_excel.Controllers
    {
        public partial class GridController : Controller
        {
            public ActionResult Read([DataSourceRequest]DataSourceRequest request)
            {
                var result = Enumerable.Range(0, 50).Select(i => new OrderViewModel
                {
                    ProductID = i,
                    ProductName = $"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut lacus mattis, congue nunc sed, " +
                    $"accumsan erat. Duis ac finibus massa. Duis eleifend venenatis nibh, quis consectetur lacus laoreet nec. Nunc " +
                    $"posuere nisl sem, eu maximus velit pulvinar eget. Aliquam gravida ipsum vitae interdum sodales. Quisque dictum " +
                    $"ac lectus auctor porttitor. Proin viverra lacus eget tortor iaculis, id bibendum lectus lobortis. {i}"
                });

                return Json(result.ToDataSourceResult(request));
            }
        }
    }
```

```JavaScript
<script>
    function onExcelExport(e) {
        e.preventDefault();

        var sanitizedJsonData = e.data.map(function (dataItem) {
            return dataItem.toJSON(); // Get the sanitized JSON data.
        })

        var modelProps = generateModel(sanitizedJsonData); // Generate the model.

        var columns = modelProps.map(function (name) {
            return {
                value: name // Get the columns.
            };
        });

        var rows = [{
            cells: columns // Get the rows.
        }];

        for (var i = 0; i < sanitizedJsonData.length; i++) {
            var rowCells = [];
            var contentToWrap = "";

            for (var j = 0; j < modelProps.length; j++) {
                var cellValue = sanitizedJsonData[i][modelProps[j]];

                if (modelProps[j] === "ProductName") { // When we are in the ProductName column, get all the text and wrap it. 
                    contentToWrap = cellValue;
                    rowCells.push({
                        value: cellValue,
                        wrap: true
                    });
                } else {
                    rowCells.push({
                        value: cellValue
                    });
                }
            }

            var rowHeight = contentToWrap.length > 27 ? Math.ceil(contentToWrap.length / 27) * 20 : 20 // This formula is used for calculating the resizing for auto height.

            rows.push({
                cells: rowCells, // Push the data into the rows and add the auto height (rowHeight) property we've created. 
                height: rowHeight 
            });
        }

        var columnSettings = modelProps.map(function () {
            return {
                width: 200 // Static width of each column
            };
        });

        var workbook = new kendo.ooxml.Workbook({ // Create the Woorkbook and add the rows and columns.
            sheets: [{
                columns: columnSettings,
                title: "Products",
                rows: rows
            }]
        });
        kendo.saveAs({ // Save it as a .xlsx file.
            dataURI: workbook.toDataURL(),
            fileName: "Test.xlsx"
        }); 
    }

    function generateModel(data) { // Generate the model that we'll use. 
        var sampleDataItem = data[0];
        var model = Object.keys(sampleDataItem);
        return model;
    }
</script>
```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Exporting to Excel (Overview)](https://docs.telerik.com/{{ site.platform }}/html-helpers/data-management/grid/export/excel-export)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* {% if site.core %} [Server-Side TagHelper API Reference of the Grid for ASP.NET Core](https://docs.telerik.com/aspnet-core/api/taghelpers/grid) {% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)