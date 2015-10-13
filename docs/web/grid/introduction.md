---
title: Introduction
page_title: Overview of Grid UI widget | Kendo UI Documentation
description: Quick steps to help you create Kendo UI Grid
position: 1
---

# Grid Introduction

The Grid is a powerful widget for displaying data in a tabular format. It provides many options that define the way the data is presented and manipulated, such as paging, sorting, filtering, grouping, and editing. The Grid can be bound to local or remote data using the Kendo DataSource component.

## Getting Started

There are two primary ways to create a Kendo UI Grid:

* From an empty `div` element. In this case all the Grid settings are provided in the initialization script statement.
* From an existing HTML `table` element. In this case some of the Grid settings can be inferred from the table structure and elements' HTML attributes.

### Create a Grid from an empty div

    <!-- Define the HTML div that will hold the Grid -->
    <div id="grid"></div>

    <!-- Initialize the Grid -->
    <script>

        $(document).ready(function(){
            $("#grid").kendoGrid({
                columns: [{
                    field: "FirstName",
                    title: "First Name"
                },
                {
                    field: "LastName",
                    title: "Last Name"
                }],
                dataSource: {
                    data: [{
                        FirstName: "Joe",
                        LastName: "Smith"
                    },
                    {
                        FirstName: "Jane",
                        LastName: "Smith"
                    }]
                }
            });
        });

    </script>

### Create a Grid from an existing HTML table

When creating the Grid from a table, it is usually already populated with data. This improves the accessibility and search engine optimization,
and ensures that the user will see data even if JavaScript is disabled or there is a JavaScript error on the page.

    <!-- Define the HTML table, with rows, columns, and data -->
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

    <!-- Initialize the Grid -->
    <script>

        $(document).ready(function(){
          $("#grid").kendoGrid({
            sortable: true,
            filterable: true
          });
        });

    </script>

It is important to know that the Grid uses a Kendo UI DataSource instance even when it is created from a table. The cell content is extracted and thus the DataSource is populated.
The data field names in the DataSource are either created from the header cell content or the `data-field` attributes of the header cells.
The data field names should be valid JavaScript identifiers, that's why it is recommended to use `data-field` attributes, otherwise the header cell content must obey several limitations:

* no spaces
* no special characters
* the first character should be a letter

If the Grid is created from a `<table>`, but the widget dataSource is configured to use a transport and remote operations, a remote request will be made for the initial Grid state,
even though the `<table>` may already be populated. This behavior is by design and cannot be avoided, except when using the Grid's MVC wrapper.

When creating the Grid from an existing table, the following **column** settings can be defined via HTML attributes:

* data field names via `data-field` attributes
* column widths via `width` styles applied to the respective `<col>` elements
* define data type via `data-type` attributes
* define a column template via `data-template` attributes
* enable or disable the column menu via `data-menu` attributes
* enable or disable sorting via `data-sortable` attributes
* enable or disable filtering via `data-filterable` attributes
* enable or disable grouping via `data-groupable` attributes

All attributes should be applied to the `<th>` elements, except the column width styles.

All other column-related settings cannot be defined via HTML attributes in the `<table>`. If such settings must be used (e.g. commands, locking, editors, custom row or cell CSS classes, etc.)
then the above attribute configuration should be abandoned and all settings should be included in the Grid's JavaScript initialization statement
(when using declarative widget initialization, the column properties should be set via the `data-columns` attribute).

As seen from the above code snippets, in one case the Grid client object is attached to a `div`, while in the other case, the object is attached to a `table`.
However, the generated resulting HTML output of the Grid depends entirely on the widget settings and it will always be the same, no matter how the widget is initialized.
