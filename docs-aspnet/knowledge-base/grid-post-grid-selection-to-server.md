---
title: Post Selected Grid Rows to Server
page_title: Post Selected Grid Rows to Server
description: "Post the selected {{ site.product }} Grid rows to the server by using an AJAX request."
previous_url: /helpers/grid/how-to/post-grid-selection-to-server, /helpers/data-management/grid/how-to/Selection/post-grid-selection-to-server, /html-helpers/data-management/grid/how-to/Selection/post-grid-selection-to-server
slug: howto_postselectiontoserver_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I post the selected Grid rows to the server?

## Solution

You can achieve this requirement using the following implementation:

1. Define the Grid and enable its selectable feature:

    ```HtmlHelper
    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridSelectionByField.Models.Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(120).Format("{0:c}");
            columns.Bound(p => p.UnitsInStock).Width(120);
            columns.Bound(p => p.Discontinued)
            .ClientTemplate(@"# if (Discontinued) { #
                                <input type='checkbox' checked='checked' class='checkbox' />
                            # } else { #
                                <input type='checkbox' class='checkbox' />
                            # } #")
            .HeaderTemplate("<input type='checkbox' class='checkAll' />").Width(120);
        })
        .Selectable(s => s.Mode(GridSelectionMode.Multiple))
        .Pageable(p => p.Responsive(false))
        .Scrollable()
        .Filterable()
        .Events(ev => ev
            .DataBound("dataBound")
            .Change("changed")
        )
        .HtmlAttributes(new { style = "height:550px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model => model.Id(p => p.ProductID))
            .Read(read => read.Action("Get_Products", "Home"))
        )
    )
    ```

1. Add the custom JavaScript logic that processes and posts the selected rows:

    ```JS
        var allChecked = @Html.Raw(Json.Encode(Model)),
        bound = false;

        function changed(e)
        {
            if(!bound)
            {
                var grid = e.sender,
                    selected = grid.select(),
                    data= {productsList : []}

                selected.each(function(){
                    var dataItem = grid.dataItem(this),
                        checked = $(this).find("input:checkbox").prop("checked");

                    data.productsList.push({
                        ProductId: dataItem.ProductID,
                        ProductName: dataItem.ProductName,
                        UnitPrice: dataItem.UnitPrice,
                        UnitsInStock: dataItem.UnitsInStock,
                        Discontinued: !checked
                    })
                });

                updateData(grid, data);
            }
        }

        function dataBound(e) {
            bound = true;
            var rows = this.tbody.find("tr");
            var grid = e.sender;
            rows.each(function () {
                var row = $(this);
                if (row.find("input[checked='checked']").length > 0) {
                    grid.select(row);
                }
            });
            bound = false;
        }

        function updateData(grid, data){
            $.ajax({
                url: '@Url.Action("Select_Products", "Home")',
                data: data,
                type: "POST",
                success: function (res) {
                    checkHeader(res);
                    grid.dataSource.fetch();
                }
            });
        }

        function checkHeader(res) {
            if(res) {
                grid.thead.find(".checkAll").prop('checked', 'checked');
            }
            else {
                grid.thead.find(".checkAll").removeProp("checked");
            }
        }

        function selectRow() {
            var checked = this.checked,
            row = $(this).closest("tr"),
            dataItem = grid.dataItem(row);

            var data = {productsList:[{
                ProductId: dataItem.ProductID,
                ProductName: dataItem.ProductName,
                UnitPrice: dataItem.UnitPrice,
                UnitsInStock: dataItem.UnitsInStock,
                Discontinued: checked}]
            };

            updateData(grid, data);
        }

        function selectAll() {
            var checked = this.checked;
            $.ajax({
                url: '@Url.Action("Select_AllProducts", "Home")',
                data: {
                    checkAll:checked
                },
                type: "POST",
                success: function () {
                    grid.dataSource.fetch();
                }
            });
        }

        $(document).ready(function () {
            grid = $("#grid").data("kendoGrid");
            grid.table.on("click", ".checkbox", selectRow);
            grid.thead.on("click", ".checkAll", selectAll);

            checkHeader(allChecked);
        });
    ```

To see the complete example, refer to the [project on how to post the selected Grid rows to the server](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridSelectionByField).

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)


