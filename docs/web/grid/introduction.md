---
title: Introduction
page_title: Overview of Grid UI widget | Kendo UI Documentation
description: Quick steps to help you create Kendo UI Grid
position: 1
---

# Grid Introduction

The Grid is a powerful widget for displaying data in a tabular format. It provides many options, such as paging, sorting, filtering, grouping, and editing, which determine the way data is presented and manipulated. The Grid can be bound to local or remote data by using the Kendo UI DataSource component.

## Getting Started

There are two primary ways to create a Kendo UI Grid:

* From an empty `div` element. In this case all Grid settings are provided in the initialization script statement.
* From an existing HTML `table` element. In this case some of the Grid settings can be inferred from the table structure and the HTML attributes of the elements.

### Create a Grid from an Еmpty `div`

    // define the HTML div that will contain the Grid 
    <div id="grid"></div>

    // initialize the Grid
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

### Create a Grid from an Existing HTML Table

When creating the Grid from a table, it is usually already populated with data. This improves the accessibility and search engine optimization,
and ensures that the user will see data even if JavaScript is disabled or there is a JavaScript error on the page.

    // define the HTML table with rows, columns, and data 
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

    // initialize the Grid
    <script>

        $(document).ready(function(){
          $("#grid").kendoGrid({
            sortable: true,
            filterable: true
          });
        });

    </script>

It is important for you to know that the Grid uses a Kendo UI DataSource instance even when it is created from a table. The cell content is extracted and populates the DataSource in this way.
The data field names in the DataSource are either created from the header cell content, or from the `data-field` attributes of the header cells.
The data field names must be valid JavaScript identifiers, therefore it is recommended to use `data-field` attributes. Otherwise the header cell content must comply with several limitations:

* No spaces
* No special characters
* The first character must be a letter

If the Grid is created from a `<table>`, but the DataSource widget is configured to use transport and remote operations, a remote request will be made for the initial Grid state,
even though the `<table>` may already be populated. This behavior is by design and cannot be avoided, except when using the Grid MVC wrapper.

When creating the Grid from an existing table, you can define the following **column** settings via HTML attributes:

* Data field names via the `data-field` attributes
* Column widths via the `width` styles applied to the respective `<col>` elements
* Data types via the `data-type` attributes
* Column templates via the `data-template` attributes
* Enable or disable the column menu via the `data-menu` attributes
* Enable or disable sorting via the `data-sortable` attributes
* Enable or disable filtering via the `data-filterable` attributes
* Enable or disable grouping via the `data-groupable` attributes

All attributes must be applied to the `<th>` elements, except for the column width styles.

Other column-related settings cannot be defined via HTML attributes in the `<table>`. If such settings must be used (e.g., commands, locking, editors, custom row or cell CSS classes, etc.), the above attribute configuration should be abandoned and all settings should be included in the Grid's JavaScript initialization statement. Note that when using a declarative widget initialization, you must set the column properties via the `data-columns` attribute.

As seen from the code snippets above, in the first case the Grid client object is attached to a `div`, while in the second one the object is attached to a `table`.
However, the generated HTML output of the Grid depends entirely on the widget settings and it will always be the same, no matter how the widget is initialized.
