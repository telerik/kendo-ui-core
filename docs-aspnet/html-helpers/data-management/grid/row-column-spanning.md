---
title: Row and Column Spanning
page_title: Row and Column Spanning
description: "Learn how to implement row and column spanning for cells of the Telerik UI Grid for {{ site.framework }}."
slug: grid_aspnetcore_spanning
position: 21
---

# Row and Column Spanning

The Row and Column spanning functionality provides the option to customize the appearance of the Grid and span cells between multiple row or columns. This feature is equal to 'cell merging' in Excel or 'row spanning' and 'column spanning' in HTML tables.

## Row Spanning

The Row spanning functionality of the Grid enables you to span a cell between multiple rows. You can use one of the [`Columns.HtmlAttributes`](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#htmlattributessystemstring) overload and pass the name of the JavaScript handler function that will set the attributes for the column. The function will receive the dataItem as a parameter and you use tha data to calculate the span of each cell. In the attributes function you can apply the rowSpan and hidden attributes to the cells.

The [`rowspan`](https://www.w3schools.com/tags/att_rowspan.asp) attribute defines the number of rows a table cell needs to span. The [`hidden`](https://www.w3schools.com/tags/att_hidden.asp) attribute must be added to cells that should not be displayed when a condition or hiding a cell is met.

The example below demonstrates how to implement row spanning when the ShipCity field for consequtive cells has the same value:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns => {
            columns.Bound(p => p.OrderID).Filterable(false).Width(100);
            columns.Bound(p => p.Freight).Width(100);
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}").Width(140);
            columns.Bound(p => p.ShipName);
            columns.Bound(p => p.ShipCity).HtmlAttributes("setRowSpan").Width(150);
        })
        .Pageable()
        .Sortable()
        .Scrollable()
        .Filterable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Orders_Read", "Grid"))
            .Sort(s=>s.Add(f=>f.ShipName).Ascending())
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" height="430">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="OrderID">
                    <fields>
                        <field name="OrderID" type="number"></field>
                        <field name="Freight" type="number"></field>
                        <field name="OrderDate" type="date"></field>
                        <field name="ShipName" type="string"></field>
                        <field name="ShipCity" type="string"></field>
                    </fields>
                </model>
            </schema>
            <sorts>
                <sort field="ShipName" typeof="string" direction="asc" />
            </sorts>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="OrderID" width="100">
                <filterable enabled="false"/>
            </column>
            <column field="Freight" width="100"/>
            <column field="OrderDate" width="140" format="{0:MM/dd/yyyy}"/>
            <column field="ShipName"/>
            <column field="ShipCity" width="150" html-attributes-handler="setRowSpan"/>
        </columns>
        <pageable enabled="true"/>
        <sortable enabled="true"/>
        <scrollable enabled="true"/>
        <filterable enabled="true"/>
    </kendo-grid>
```
{% endif %}
```JavaScript
    function setRowSpan(dataItem) {
        let grid = $("#grid").getKendoGrid();
        const dataView = grid.dataItems();
        let currentIndex = dataView.indexOf(dataItem);
        const prevDataItem = currentIndex === 0 ? null : dataView.at(currentIndex - 1);
        let nextDataItem = dataView.at(++currentIndex);
        let rowSpan = 1;

        if (prevDataItem && dataItem.ShipCity === prevDataItem.ShipCity) {
            // Add 'hidden' attribute to hide the cell if the previous item has the same value.
            return {
                hidden: 'hidden'
            }
        }

        // Calculate the rowspan for a cell.
        while (nextDataItem) {
            if (dataItem.ShipCity === nextDataItem.ShipCity) {
            rowSpan++;
            } else {
            break;
            }

            nextDataItem = dataView.at(++currentIndex);
        }

        // The styling attributes to set on the <td> element of the cell.
        let resultAttributes = { rowSpan, style: "text-align: center" };
        return resultAttributes;
    }
```

## Column Spanning

The Column spanning functionality enables you to span multiple columns in the Grid. To implement Column spanning use one of the [`Columns.HtmlAttributes`](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#htmlattributessystemstring) overload and pass the name of the JavaScript handler function that will set the attributes for the column. You can then set the colSpan and hidden attributes to the cells.

The [`colspan`](https://www.w3schools.com/tags/att_colspan.asp) attribute defines the number of columns a table cell needs to span. The [`hidden`](https://www.w3schools.com/tags/att_hidden.asp) attribute must be added to cells that should not be displayed when a condition is met. Additionally, you can also add different styling attributes or CSS classes to the `<td>` element of the cell. This allows you to style the spanned cells.

The following example demonstrates how you can implement row spanning for products that are discontinued:

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModelGridPopUp>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).HtmlAttributes("hiddenHandler").Width(100);
            columns.Bound(p => p.UnitsInStock).HtmlAttributes("hiddenHandler").Width(100);
            columns.Bound(p => p.Discontinued).HtmlAttributes("discontinuedHandler").ClientTemplate("#=Discontinued ? 'Product is Not Available' : 'Available'#").Width(100);
            columns.Command(command => { command.Edit(); command.Destroy(); }).Width(200);
        })
        .ToolBar(toolbar => toolbar.Create())
        .Editable(editable => editable.Mode(GridEditMode.PopUp))
        .Pageable()
        .Sortable()
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model => model.Id(p => p.ProductID))
            .Create(update => update.Action("EditingPopup_Create", "Grid"))
            .Read(read => read.Action("EditingPopup_Read", "Grid"))
            .Update(update => update.Action("EditingPopup_Update", "Grid"))
            .Destroy(update => update.Action("EditingPopup_Destroy", "Grid"))
        )
    )
```
{% if site.core %}
```TagHelper
    addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" height="430">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema data="Data" total="Total">
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number" editable="false"></field>
                        <field name="ProductName" type="string"></field>
                        <field name="UnitPrice" type="number"></field>
                        <field name="UnitsInStock" type="number"></field>
                        <field name="Discontinued" type="boolean"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("EditingPopup_Read", "Grid")"/>
                <update url="@Url.Action("EditingPopup_Update", "Grid")"/>
                <create url="@Url.Action("EditingPopup_Create", "Grid")"/>
                <destroy url="@Url.Action("EditingPopup_Destroy", "Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="ProductName"/>
            <column field="UnitPrice" width="100" html-attributes-handler="hiddenHandler" />
            <column field="UnitsInStock" width="100" html-attributes-handler="hiddenHandler" />
            <column field="Discontinued" width="100" html-attributes-handler="discontinuedHandler" />
            <column width="200">
                <commands>
                    <column-command text="Edit" name="edit"></column-command>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <toolbar>
            <toolbar-button name="create"></toolbar-button>
        </toolbar>
        <editable mode="popup"/>
        <pageable enabled="true"/>
        <sortable enabled="true"/>
        <scrollable enabled="true"/>
    </kendo-grid>

```
{% endif %}
```JavaScript
    function discontinuedAttributesHandler(dataItem) {
        if (dataItem.Discontinued) {
            return {
                colSpan: 3,
                "class": "!k-text-center"
            };
        } else {
            return {
                "class": "!k-text-center"
            };
        }
    };

    function hiddenHandler(dataItem) {
        if (dataItem.Discontinued) {
            return { hidden: "hidden" };
        }
    };
```

{% if site.mvc %}
## Column Spanning with Server Binding

When the Telerik UI for ASP.NET MVC Grid is configured for [Server Binding]({% slug serverbinding_grid_aspnetmvc %}) only column spanning is supported. If you need to use row spannig use [Ajax binding]({% slug htmlhelpers_grid_aspnetcore_ajaxbinding %}).

When implementing column spannig for Server bound Grid you can use the `AddServerAttribute` configuration method. Define the attribute that should be added and the condition based on which the attribute's value will be assigned:

The example below demonstrates how to define the conditions based on which the value of the `colspan` attribute should be set and the `k-hidden` class added to Grid cells. Adding additional styling is also supported:

```HtmlHelper
    @model IEnumerable<Kendo.Mvc.Examples.Models.Product>

    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .Columns(columns => {
            columns.Bound(p => p.ProductID).Groupable(false);
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice)
                        .AddServerAttribute("class", (p) => p.Discontinued == true ? "k-hidden" : "");
            columns.Bound(p => p.UnitsInStock)
                        .AddServerAttribute("colSpan", (p) => p.Discontinued == true ? "3" : "1")
                        .AddServerAttribute("class", (p) => p.Discontinued == true ? "!k-text-center" : "")
                        .AddServerAttribute("style", (p) => p.Discontinued == true ? "color: red;" : "")
                        .Template(@<text>
                                @if(item.Discontinued)
                                    {
                                        <span>Product Not Available</span>
                                    }
                                    else
                                    {
                                        @item.UnitsInStock
                                    }
                            </text>);
            columns.Bound(p => p.Discontinued).AddServerAttribute("class", (p) => p.Discontinued == true ? "k-hidden" : "");
                    })
        .Pageable()
        .Sortable()
        .Filterable()
        .Groupable()
    )
```


{% endif %}

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Row and Column Spanning of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/row-column-spanning)
* [Server-Side API](/api/grid)
