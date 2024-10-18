---
title: Scrolling to a Specific Item
page_title: Scrolling to a Specific Item
description: "Learn more about the programmatic scrolling to specific items with the Telerik UI Grid component for {{ site.framework }}."
slug: scrolling_to_item_aspnetcore_grid
position: 4
---

# Scrolling to a Specific Item

In many scenarios where the Grid handles large datasets, it may be necessary to automatically scroll to a specific row (data item) based on external JavaScript logic or user input.

The Grid component supports the client-side [`scrollToItem()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/scrolltoitem) method that allows you to programmatically scroll to a specific row.

The `scrollToItem()` method requires the following:

* Specify the unique Model identifier to the [`Id()` option of the `Model()` configuration]({% slug htmlhelper_datasourcemodel %}) of the DataSource.
* Ensure the target data item appears in the current Grid data items. If the Grid is pageable, the item must be available on the current page.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.OrderID))
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
        ... // Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax">
            <schema data="Data" total="Total" errors="Errors">
                <model id="ProductID">
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read", "Grid")"/>
            </transport>
        </datasource>
        <!-- Additional configuration.-->
    </kendo-grid>
```
{% endif %}

## Scrolling to an Item by Passing the Id of the Item

To scroll the Grid programmatically to a specific data item, pass the `Id` of the item to the `scrollToItem()` method. 

The following example shows how to scroll to the last row of the Grid when a button is clicked.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("btn")
        .Content("Scroll to last item")
        .Events(ev => ev.Click("onBtnClick"))
    )

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()    
        .Name("grid")
        .Columns(columns => {
            columns.Bound(p => p.OrderID);
            columns.Bound(p => p.ShipName);
            columns.Bound(p => p.ShipCity);
        })
        .Scrollable()
        .Height(400)
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.OrderID))
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-button name="btn" on-click="onBtnClick">
        Scroll to last item
    </kendo-button>

    <kendo-grid name="grid" height="400">
        <datasource type="DataSourceTagHelperType.Ajax">
            <schema data="Data" total="Total" errors="Errors">
                <model id="OrderID"></model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="OrderID"/>
            <column field="ShipName"/>
            <column field="ShipCity"/>
        </columns>
        <scrollable enabled="true"/>
    </kendo-grid>
```
{% endif %}
```JavaScript
    <script>
        function onBtnClick() {
            const grid = $("#grid").data("kendoGrid"); // Get an instance of the Grid.
            const gridDataSoruce = grid.dataSource; // Access the Grid's DataSouce.
            let lastRowItem = gridDataSoruce.at(gridDataSoruce.view().length - 1); // Use the at() method of the DataSource to get the data item that corresponds to the last row.
            grid.scrollToItem(lastRowItem.OrderID); // Pass the "OrderID" value of the last data item to scroll the Grid to the last row.
        }
    </script>
```

## Scrolling to an Item in Virtual Scrolling Grid

When the Grid is set up in [virtual scrolling mode]({% slug virtual_scrolling_aspnetcore_grid %}), you can scroll to an item that is not loaded yet using the `callback` parameter of the `scrollToItem()` method.

The `callback` is a function that executes when virtual scrolling is enabled. It returns the index of the target item in the dataset.

The following example shows how to scroll to an item that is not loaded yet when a button is clicked. The item's **OrderID** is equal to **10403** and it comes from `ViewData`.

```HtmlHelper
    @{
        var initialItemId = ViewData["initialItemId"];
    }

    @(Html.Kendo().Button()
        .Name("btn")
        .Content("Scroll to item")
        .Events(ev => ev.Click("onBtnClick"))
    )

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()    
        .Name("grid")
        .Columns(columns => {
            columns.Bound(p => p.OrderID);
            columns.Bound(p => p.ShipName);
            columns.Bound(p => p.ShipCity);
        })
        .Scrollable(scrollable => scrollable.Virtual(true))
        .Height(400)
        .Pageable(p =>
            p.Info(true)
            .Numeric(false)
            .PreviousNext(false)
            .Messages(m=>m.Display("Showing {2} data items"))
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(50)
            .Model(model => model.Id(p => p.OrderID))
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var initialItemId = ViewData["initialItemId"];
    }

    <kendo-button name="btn" on-click="onBtnClick">
        Scroll to item
    </kendo-button>

    <kendo-grid name="grid" height="400">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="50">
            <schema data="Data" total="Total" errors="Errors">
                <model id="OrderID"></model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="OrderID"/>
            <column field="ShipName"/>
            <column field="ShipCity"/>
        </columns>
        <pageable enabled="true" info="true" numeric="false" previous-next="false">
            <messages display="Showing {2} data items"/>
        </pageable>
        <scrollable enabled="true" virtual="true"/>
    </kendo-grid>
```
```GridController
    public IActionResult Index()
    {
        ViewData["initialItemId"] = 10403;
        return View();
    }

    public IActionResult GetItemIndex(int? id)
    {
        var itemIndex = -1;
        if (id != null)
        {
            // Retrieve the data item from the Grid's data collection based on the received Id value.
            var dataItem = GetGridData().Select((item, i) => new { Item = item, Index = i }).FirstOrDefault(x => x.Item.OrderID == id);
            if(dataItem != null)
            {
                itemIndex = dataItem.Index;
            }
        }
        return Json(itemIndex); // Return the index of the data item.
    }
```
{% else %}
```GridController
    public ActionResult Index()
    {
        ViewData["initialItemId"] = 10403;
        return View();
    }

    public ActionResult GetItemIndex(int? id)
    {
        var itemIndex = -1;
        if (id != null)
        {
            // Retrieve the data item from the Grid's data collection based on the received Id value.
            var dataItem = GetGridData().Select((item, i) => new { Item = item, Index = i }).FirstOrDefault(x => x.Item.OrderID == id);
            if(dataItem != null)
            {
                itemIndex = dataItem.Index;
            }
        }
        return Json(itemIndex, JsonRequestBehavior.AllowGet); // Return the index of the data item.
    }
```
{% endif %}
```JavaScript
    <script>
        function onBtnClick() {
            const grid = $("#grid").data("kendoGrid"); // Get an instance of the Grid.
            var itemId = '@initialItemId'; // Access the "OrderID" value through the ViewData.

            grid.scrollToItem(itemId, function (options) { // Pass the id and a callback returning the index of the item.
                // Trigger an AJAX request that will request the index of the data item with "OrderID" equal to 10403.
                $.ajax({
                    type: "POST",
                    url: "@Url.Action("GetItemIndex", "Grid")",
                    data: { id: itemId },
                    success: function (index) {
                        if(index != -1) {
                            options.success(index);
                        }
                    }
                });
            });
        }
    </script>
```

## Known Limitations

* Scrolling to an item in a Grid with enabled [group paging functionality]({% slug htmlhelpers_grid_aspnet_grouping %}) is not supported.
* Scrolling to an item in a Gird that uses [endless scrolling mode]({% slug endless_scrolling_aspnetcore_grid %}) is not supported.
* When the sum of the specified row's height and the height of all rows afterward is less than the Grid's height, the row that must be scrolled to the top will not appear at the top. In non-virtualized Grids, the Grid will be scrolled to its bottom, but the specified row will not appear at the top. In Grids with enabled virtual scrolling, the Grid will be scrolled to the bottom of the current data set, but the scroller will not be positioned at the bottom, and the row will not be positioned at the top. 

## See Also

* [Scrolling to Specific Item by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/scroll-to-item)
* [Client-Side Grid API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side Grid HtmlHelper API](/api/grid)
{% if site.core %}
* [Server-Side Grid TagHelper API](/api/taghelpers/grid)
{% endif %}