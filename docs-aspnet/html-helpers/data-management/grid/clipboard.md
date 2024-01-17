---
title: Clipboard
page_title: Clipboard Support
description: "Learn how to enable the clipboard functionality of the Telerik UI Grid for {{ site.framework }} that allows you to copy and paste content from Excel to the Grid and vice-versa."
slug: htmlhelpers_grid_clipboard
position: 17
---

# Clipboard

By using the Grid clipboard functionality, you enable the user to perform the following copy and paste operations:

* Copy and paste cells from Excel to the Grid.
* Copy and paste cells both between different Grids and within the same Grid.
* Copy and paste cells from the Grid to Excel.

The paste operation supports two interaction modes:

* [Replace](#replace-mode)&mdash;Replaces the Grid cell content with the copied content.
* [Insert](#insert-mode)&mdash;Inserts the copied content as a new Grid row.

## Getting Started

To enable the clipboard feature, configure the Grid with the following settings:

* Add the `AllowCopy(true)` option to allow copying the selected cells into the clipboard.
* Add the `AllowPaste(true)` option enable the paste operation.
* Make the Grid [selectable]({% slug htmlhelpers_grid_aspnetcore_selection %}). For example, `Selectable(selectable => selectable.Mode(GridSelectionMode.Multiple).Type(GridSelectionType.Cell))`.
* Enable the Grid keyboard navigation (add the `Navigatable()` option) because the pasting works through the `CTRL+V` keyboard shortcut.
* Include the `Paste()` Toolbar command to display a dropdown control with the paste modes.

The following example demonstrates how to configure the Grid clipboard functionality that allows you to copy and paste content from Excel to the Grid and the other way around.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .Columns(columns => {
            columns.Bound(o => o.ShipCountry);
            columns.Bound(p => p.Freight);
            columns.Bound(p => p.OrderDate).Format("{0:dd/MM/yyyy}");
        })
        .ToolBar(toolBar => toolBar.Paste())
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        .AllowCopy(true)
        .AllowPaste(true)
        .Navigatable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(10)
            .Read(read => read.Action("Orders_Read", "Grid"))
        )
        .Pageable()
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" navigatable="true" selectable="multiple, cell" allow-paste="true">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
            <schema>
                <model>
                    <fields>
                        <field name="ShipCountry" type="string"></field>
                        <field name="Freight" type="number"></field>
                        <field name="OrderDate" type="date"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read", "Grid")"/>
            </transport>
        </datasource>
        <columns>
            <column field="ShipCountry"/>
            <column field="Freight"/>
            <column field="OrderDate" format="{0:dd/MM/yyyy}"/>
        </columns>
        <toolbar>
            <toolbar-button name="paste"></toolbar-button>
        </toolbar>
        <pageable enabled="true"/>
        <allow-copy enabled="true"/>
    </kendo-grid>
```
{% endif %}

When pasting content to the Grid, the value of each cell will be parsed based on the data type of the respective column field. For example, if a `string` value must be pasted into a cell, whose column binds to a numeric field, the result will be an empty cell (the parser returns `null`).

If you enable the Grid [ContextMenu]({% slug grid_aspnetcore_contextmenu %}), the **Paste (use CTRL/⌘ + V)** will appear in the menu as a disabled option to inform the users they must use the `CTRL+V` key combination to trigger the paste operation.

## Replace Mode

To activate the Replace mode, select the **Paste (Replace)** option in the Toolbar command of the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .ToolBar(toolBar => toolBar.Paste())
        ...
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="paste"></toolbar-button>
        </toolbar>
        <!-- Other configuration -->
    </kendo-grid>
```
{% endif %}

When the Replace mode is enabled, the paste operation will execute as follows:

* If a single cell is pasted into the Grid, it will replace the content of all currently selected Grid cells. For example, if the copied value is `ABC` and three Grid cells are selected, pressing `CTRL+V` will replace the content of the three cells with `ABC`.
* If multiple cells are pasted into the Grid, the component will replace the content of the same number of Grid cells. The update always starts from the first selected cell. For example, when copying two cells from Excel and selecting ten cells in the Grid, pressing `CTRL+V` will replace the content of the first two selected cells.
* At least one Grid cell must be selected to execute the paste operation. Based on the number of the copied cells, the Grid will automatically update the cells whose content must be replaced.

## Insert Mode

To activate the Insert mode select the **Paste (Insert)** option in the Toolbar command of the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .ToolBar(toolBar => toolBar.Paste())
        ...
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <toolbar>
            <toolbar-button name="paste"></toolbar-button>
        </toolbar>
        <!-- Other configuration -->
    </kendo-grid>
```
{% endif %}

When the Insert mode is enabled, the paste operation will create a new Grid row with the copied content. The row will be inserted after the first selected Grid cell.

## Events

The Data Grid exposes a `Paste` event. The event fires after the user pastes data by using the built-in paste functionality and it contains the following event fields:

* `items`&mdash;The pasted data from the last paste operation.
* `type`&mdash;The Replace or Insert paste mode.

The following example demonstrates how to subscribe to the `Paste` event.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("grid")
        .ToolBar(toolBar => toolBar.Paste())
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        .AllowPaste(true)
        .Navigatable()
        .Events(e => e.Paste("onPaste"))
        ...
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" on-paste="onPaste" navigatable="true" selectable="multiple, cell" allow-paste="true">
        <toolbar>
            <toolbar-button name="paste"></toolbar-button>
        </toolbar>
        <!-- Other configuration -->
    </kendo-grid>
```
{% endif %}
```Script
    <script>
        function onPaste(e){
            // Handle the Paste event.
            console.log(e.items);
            console.log(e.type);
        }
    </script>
```

## See Also

* [Copy to Excel by using the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/copy-to-excel)
* [Paste from Excel by using the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/paste-from-excel)
* [Select and Export to Excel by using the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/selection-export)
* [Server-Side API of the Grid for {{ site.framework }}](/api/grid)
{% if site.core %}
* [Server-Side TagHelper API of the Grid for {{ site.framework }}](/api/taghelpers/grid)
{% endif %}
