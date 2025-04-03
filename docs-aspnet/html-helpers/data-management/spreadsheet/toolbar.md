---
title: Toolbar
page_title: Toolbar
description: "Learn how to configure the Toolbar of the Telerik UI Spreadsheet component for {{ site.framework }}."
slug: spreadsheet_toolbar_aspnetcore
position: 12
---

# Toolbar

The Telerik {{ site.product_short }} Spreadsheet component supports a variety of options for customizing its Toolbar. 
In this article, you will find information about the available options and the tools that you can configure in the Toolbar of the Spreadsheet component.

## Options

The Toolbar of the Spreadsheet supports the following options:

* [`File`](#file)&mdash;Configures the tools displayed in the `File` tab.
* [`Home`](#home)&mdash;Configures the `Home` tab of the toolbar in the component.
* [`Insert`](#home)&mdash;Configures the `Insert` tab of the toolbar in the component.
* [`Format`](#format)&mdash;Configures the `Format` tab of the toolbar in the component.
* [`Data`](#data)&mdash;Configures the `Data` tab of the toolbar in the component.
* [`View`](#view)&mdash;Configures the `View` tab of the toolbar in the component.

You can enable or disable each Toolbar's tab by setting its option to a boolean value.

### File

The `File` option accepts a boolean or a configuration of tools that will be available in the `File` tab in the Toolbar.

You can configure any of the following options in the `File` configuration:

* `Open`&mdash;Opens an existing spreadsheet file.
* `ExportAs`&mdash;Exports the spreadsheet content in various formats.

The following example demonstrates how to set the `File` option in the Toolbar declaration of the Spreadsheet:

```HtmlHelper
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Toolbar(t => t.File(f => f.Open()))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
    
    <kendo-spreadsheet name="spreadsheet">
        <toolbar>
            <file><tool name="open"></tool></file>
        </toolbar>
    </kendo-spreadsheet>
```
{% endif %}

### Home

The `Home` option receives a boolean or a configuration of tools that will be available in the Spreadsheet for this option. 

You can configure any of the following options in the `Home` configuration:

* `Cut`&mdash;Cuts the selected content.
* `Copy`&mdash;Copies the selected content.
* `Paste`&mdash;Pastes copied content.
* `Bold`&mdash;Makes text bold.
* `Italic`&mdash;Makes text italic.
* `Underline`&mdash;Underlines text.
* `BackgroundColor`&mdash;Changes the background color of selected cells.
* `TextColor`&mdash;Changes the text color.
* `Borders`&mdash;Applies borders to cells.
* `FontSize`&mdash;Changes the font size.
* `FontFamily`&mdash;Changes the font family.
* `Alignment`&mdash;Aligns cell content.
* `TextWrap`&mdash;Wraps text within a cell.

The following example demonstrates how to set the Home option in the toolbar declaration of the Spreadsheet:

```HtmlHelper
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Toolbar(t => t.Home(h => h.Italic()))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
    
    <kendo-spreadsheet name="spreadsheet">
        <toolbar>
            <home><tool name="italic"></tool></home>
        </toolbar>
    </kendo-spreadsheet>
```
{% endif %}

### Insert

The `Insert` option receives a boolean or a configuration of tools that will be available in the Spreadsheet for this option. 

You can configure any of the following options in the `Insert` configuration:

* `InsertComment`&mdash;Adds a comment to a cell.
* `Hyperlink`&mdash;Inserts a hyperlink.
* `InsertImage`&mdash;Inserts an image.
* `AddColumnLeft`&mdash;Adds a column to the left of the selected column.
* `AddColumnRight`&mdash;Adds a column to the right of the selected column.
* `AddRowBelow`&mdash;Adds a row below the selected row.
* `AddRowAbove`&mdash;Adds a row above the selected row.
* `DeleteColumn`&mdash;Deletes the selected column.
* `DeleteRow`&mdash;Deletes the selected row.

The following example demonstrates how to set the Insert option in the toolbar declaration of the Spreadsheet:

```HtmlHelper
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Toolbar(t => t.Insert(i => i.DeleteRow()))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    <kendo-spreadsheet name="spreadsheet">
        <toolbar>
            <insert><tool name="deleteRow"></tool></insert>
        </toolbar>
    </kendo-spreadsheet>
```
{% endif %}

### Format

The `Format` option receives a boolean or a configuration of tools that will be available in the Spreadsheet for this option. 

You can configure any of the following options in the `Format` configuration:

* `Format`&mdash;Applies a predefined number format.
* `FormatDecreaseDecimal`&mdash;Decreases the number of decimal places.
* `FormatIncreaseDecimal`&mdash;Increases the number of decimal places.

The following example demonstrates how to set the Format option in the toolbar declaration of the Spreadsheet:

```HtmlHelper
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Toolbar(t => t.Format(f => f.Format()))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    <kendo-spreadsheet name="spreadsheet">
        <toolbar>
            <format><tool name="format"></tool></format>
        </toolbar>
    </kendo-spreadsheet>
```
{% endif %}

### Data

The `Data` option receives a boolean or a configuration of tools that will be available in the Spreadsheet for this option. 

You can configure any of the following options in the `Data` configuration:

* `Sort`&mdash;Sorts the selected data.
* `Filter`&mdash;Applies a filter to the data.
* `Validation`&mdash;Defines data validation rules.

The following example demonstrates how to set the Data option in the toolbar declaration of the Spreadsheet:

```HtmlHelper
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Toolbar(t => t.Data(d => d.Sort()))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    <kendo-spreadsheet name="spreadsheet">
        <toolbar>
            <data><tool name="sort"></tool></data>
        </toolbar>
    </kendo-spreadsheet>
```
{% endif %}

### View

The `View` option receives a boolean or a configuration of tools that will be available in the Spreadsheet for this option. 

You can configure any of the following options in the `View` configuration:

* `Freeze`&mdash;Freezes rows or columns to keep them visible while scrolling.
* `Merge`&mdash;Merges selected cells.
* `ToggleGridlines`&mdash;Shows or hides gridlines.

The following example demonstrates how to set the View option in the toolbar declaration of the Spreadsheet:

```HtmlHelper
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Toolbar(t => t.View(v => v.Merge()))
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    <kendo-spreadsheet name="spreadsheet">
        <toolbar>
            <view><tool name="merge"></tool></view>
        </toolbar>
    </kendo-spreadsheet>
```
{% endif %}

### Grouping 

Every option of the ToolBar can implement the configurations as a group. The following example demonstrates how to set a group of configurations for an option:

```HtmlHelper
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    @(Html.Kendo().Spreadsheet()
        .Name("spreadsheet")
        .Toolbar(toolbar => toolbar
            .Insert(home => home
                .Group(group =>
                {
                    group.Bold();
                    group.Italic();
                    group.Underline();
                })
            )
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    <script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>

    <kendo-spreadsheet name="spreadsheet">
        <toolbar>
            <insert enabled="true">
                <group>
                    <tool name="bold" />
                    <tool name="italic" />
                    <tool name="underline" />
                </group>
            </insert>
        </toolbar>
    </kendo-spreadsheet>
```
{% endif %}


## See Also

* [Basic Usage of the Spreadsheet HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/spreadsheet/index)
* [API Reference of the Spreadsheet HtmlHelper for {{ site.framework }}](/api/spreadsheet)
{% if site.core %}
* [API Reference of the Spreadsheet TagHelper for {{ site.framework }}](/api/taghelpers/spreadsheet)
{% endif %}






