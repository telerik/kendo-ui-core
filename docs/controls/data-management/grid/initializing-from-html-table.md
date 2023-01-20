---
title: Initializing from an HTML Table
page_title: jQuery Data Grid Documentation - Initializing from an HTML Table
description: "Get started with the jQuery Grid by Kendo UI and learn about the alternative way to initialize the component from an HTML table."
slug: html_table_kendoui_grid_widget
position: 2
---

# Initializing the Grid from an HTML Table

Apart from [creating the Grid from an empty `div` element]({% slug getting_started_kendoui_grid_widget %}), you can initialize it from an HTML table. 

When you initialize the Grid from an HTML table, you can infer some of its settings from the table structure and the HTML attributes of the elements. This means that you can describe the layout of the Grid entirely in the HTML of the table. 

The HTML table is usually already populated with data which improves the accessibility and search-engine optimization, and ensures that the user will see data even if JavaScript is disabled or if there is a JavaScript error on the page.

When you initialize the Grid from an HTML table, the component uses a Kendo UI DataSource instance. The content of the cell is extracted and populates the DataSource in the following way:

1. The names of the data fields in the DataSource are either created from the content of the header cells or from the `data-field` attributes of the header cells.
2. The names of the data fields have to be valid JavaScript identifiers. Therefore, it is recommended to use the `data-field` attributes. Otherwise, the cell content of the header has to meet the following requirements:
   * No spaces
   * No special characters
   * The first character has to be a letter

If you create the Grid from an HTML table but the DataSource is configured to use transport and remote operations, a remote request is made for the initial Grid state even though the table may be already populated. This behavior is defined by design and cannot be avoided except when using the MVC wrapper of the Grid.

When the Grid is created from an existing table, the Grid provides `column` settings that can be defined through the HTML attributes. Except for the width column styles, you have to apply all attributes to the `<th>` elements:
* The `id` attributes define the id of the columns.
* The `data-field` attributes define the names of the data fields.
* The `width` styles when applied to the respective `<col>` elements set the width of the columns.
* The [`data-type`]({% slug editing_kendoui_grid_widget %}#configuring-the-data-source) attributes define the data types.
* The `data-template` attributes set the column templates.
* The `data-menu` attributes enable or disable the column menu.
* The `data-sortable` attributes enable or disable sorting.
* The `data-filterable` attributes enable or disable filtering.
* The `data-groupable` attributes enable or disable grouping.
* The `data-index` attributes define a zero-based number indicator for the columns.

> To associate the `aria-describedby` attribute of the cells to the corresponding column header in a navigable Kendo UI Grid, define the `id` and `data-index` attributes for each `<th>` element.

It is not possible to define other column-related settings through HTML attributes in the `<table>`. If you have to use settings, such as commands, locking, editors, custom rows, cell CSS classes, and others, skip the above attribute configuration and include all settings in the JavaScript initialization statement of the Grid. Note that you have to set the column properties through the `data-columns` attribute when using the declarative component initialization.

As the following example demonstrates, the client object of the Grid is attached to a `<table>` element. However, the generated HTML output of the Grid entirely depends on the settings of the component and it will always be the same regardless of the way the component is initialized. For the complete example, refer to the [demo on initializing the Grid from an HTML table](https://demos.telerik.com/kendo-ui/grid/from-table).

```dojo
    // Define the HTML table with rows, columns, and data.
    <table id="grid">
        <colgroup>
            <col />
            <col style="width:100px" />
        </colgroup>
        <thead>
            <tr>
                <th data-field="title" data-filterable="false">Title</th>
                <th data-field="year" data-type="number" data-template="<strong>#=year#</strong>">Year</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Star Wars: A New Hope</td>
                <td>1977</td>
            </tr>
            <tr>
                <td>Star Wars: The Empire Strikes Back</td>
                <td>1980</td>
            </tr>
        </tbody>
    </table>

    // Initialize the Grid.
    <script>

        $(document).ready(function(){
          $("#grid").kendoGrid({
            sortable: true,
            filterable: true
          });
        });

    </script>
```


## See Also 

* [Getting Started with the Grid]({% slug getting_started_kendoui_grid_widget %})
* [Demo Page for the Grid](https://demos.telerik.com/kendo-ui/grid/index)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)