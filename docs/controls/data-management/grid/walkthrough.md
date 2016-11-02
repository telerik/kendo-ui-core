---
title: Walkthrough
page_title: Walkthrough | Kendo UI Grid
description: "Learn how to create a grid, add an HTML table and control the features of the Kendo UI Grid widget."
slug: walkthrough_kendoui_grid_widget
position: 2
---

# Walkthrough

The [Kendo UI Grid widget](http://demos.telerik.com/kendo-ui/grid/index) is a powerful component of the Kendo UI toolkit and an essential part of almost any user interface. The Grid control is quick to set up and is packed with features such as [sorting](/api/javascript/ui/grid#configuration-sortable), [grouping](/api/javascript/ui/grid#configuration-groupable), [paging](/api/javascript/ui/grid#configuration-pageable), and [editing](/api/javascript/ui/grid#events-edit).

## Data Binding

### Configure Auto Binding

By default, the Grid is set to automatically bind to data&mdash;as soon as it is loaded, it causes the [DataSource]({% slug overview_kendoui_datasourcecomponent %}) to query, and the data is loaded to the Grid.

To disable this behavior, set the `autoBind` option of the widget to `false`, as shown below.

###### Example

    $("#grid").kendoGrid({
        autoBind: false,
        // other configuration
    });

### Bind to Local Arrays

To bind the Grid to local data, set the `dataSource` option of the `kendoGrid` object.

###### Example

    var people = [ { firstName: "John",
                     lastName: "Smith",
                     email: "john.smith@telerik.com" },
                   { firstName: "Jane",
                     lastName: "Smith",
                     email: "jane.smith@telerik.com" },
                   { firstName: "Josh",
                     lastName: "Davis",
                     email: "josh.davis@telerik.com" },
                   { firstName: "Cindy",
                     lastName: "Jones",
                     email: "cindy.jones@telerik.com" } ];

     $("#grid").kendoGrid({
         dataSource: people
     });

**Figure 1. Grid bound to a local data array**

![Kendo UI Grid bound to a local data array](/controls/data-management/grid/grid2_1.png)

### Bind to Remote Data

To bind the Grid to remote data, specify the `dataSource` option. It is possible to either create the data source outside the widget, or to pass it in it.

If multiple widgets are bound to the same data set, you have to create the data source as an object that you can refer to in different widgets. If the Grid is the only item bound to the data, create it inline.

###### Example

    $("#grid").kendoGrid({
         dataSource: {
             transport: {
                 read: "/Home/People.json"
             },
             schema: {
                 data: "data"
             }
         }
    });

For more information on binding the Grid to a remote data source, refer to the article on [remote data binding of the widget]({% slug remote_data_binding_grid %}).

## Configuration

### Selection

To enable selection in the Grid, set the [`selectable`](/api/javascript/ui/grid#configuration-selectable) option to `true`. This enables the default single-row selection option.

###### Example

        $("#grid").kendoGrid({
            selectable: true,
            // other configuration
         });

**Figure 2. Grid with enabled row selection**

![Grid with enabled row selection](/controls/data-management/grid/grid4_1.png)

It is also possible to set the `selectable` option to any of the following values:
* `row`
* `cell`
* `multiple row`
* `multiple cell`

#### The row Value

The `row` value is set by default and enables a single row selection. It functions in the same way as the `selectable: true` configuration.

###### Example

    $("#grid").kendoGrid({
        selectable: "row",
        // other configuration
    });

#### The cell Value

The `cell` value enables the selection of individual cells within the Grid.

###### Example

    $("#grid").kendoGrid({
        selectable: "cell",
        // other configuration
    });

#### The multiple row Value

The `multiple row` value allows users to select multiple rows within the Grid.

###### Example

    $("#grid").kendoGrid({
        selectable: "multiple row",
        // other configuration
    });

#### The multiple cell Value

The `multiple cell` value enables the selection of multiple cells within the Grid.

###### Example

    $("#grid").kendoGrid({
        selectable: "multiple cell",
        // other configuration
    });

When the multiple selection is enabled, it is possible to select multiple rows or cells by dragging the mouse cursor and select them in a similar way to a block of text.

> **Important**  
> * Selection is not persisted when the Grid is rebound, that is, when paging, filtering, sorting, editing, or virtual scrolling occurs. To achieve such behavior, [use this custom implementation]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %}).
> * Selection performance may decrease when the page size is too large, or if no paging is used, and the Grid is rendering hundreds or thousands of items. This behavior is most frequently seen in Internet Explorer. Grouping, hierarchy, and frozen columns also have a negative impact on the selection performance, because these features make the HTML output of the Grid more complex. Therefore, it is recommended to use paging and a reasonable page size.

### Paging

By default, paging is disabled.

The paging functionality of the Grid is controlled by the `pageable` option. To configure it, use Boolean parameters.

Additionally, you have to indicate to the Grid the number of records to display on each page as well as the total number of records in the dataset. Specify the `pageSize` on the data source and the field in the dataset that will contain the total count of records.

###### Example

    $("#grid").kendoGrid({
         pageable: true
         // other configuration
    });

Try to do paging operations on the server to keep away from including too much data in the HTML, which might slow down page performance. To accomplish this, set the `serverPaging` option on the data source to `true`.

If you decide to use server paging, be prepared to handle the requests to the server, and respond appropriately. When `serverPaging` is enabled, the data source will send the following default parameters to the server:

* The `top` parameter defines the number of records to send back in the response.
* The `skip` parameter defines the number of records to skip from the start of the dataset.

For example, if you want to show page 3 out of a 60-record dataset split into 10 records per page, the Grid will send `skip: 20`, `top: 10`.

In general, the Grid is platform-agnostic. This means that it works with HTTP requests sending and receiving JSON payload. For example, to bind the widget to a specific data subset (only to a particular page), instruct the dataSource to use [`serverPaging`](/api/javascript/data/datasource#configuration-serverPaging). In this way, it will directly use the received data. The same rule applies to the filtering, grouping, aggregation, and sorting operations.

###### Example

       $(document).ready(function(){
          $("#grid").kendoGrid({
             groupable: true,
             scrollable: true,
             sortable: true,
             pageable: true
          });
      });

### Grouping

By default, grouping is disabled.

To enable the grouping functionality of the Grid, set the `groupable` option to `true`. This exposes a new area in the header, which informs that it is possible for the user to drop a column on it and in this way to group the Grid data by that column. It is also possible to do grouping by multiple columns by dragging a second column onto the grouping header.

###### Example

    $("#grid").kendoGrid({
         groupable: true
         // other configuration
    });

**Figure 3. Grid with its grouping functionality enabled**

![Grid With Grouping Enabled](/controls/data-management/grid/grid5_1.png)

**Figure 4. Grid with its data grouped by last name**

![Grid Grouped By Last Name](/controls/data-management/grid/grid6_1.png)

It is also possible to sort the grouped content by clicking on the grouping tab. In the previous example, click on **lastName** to sort the grouped data in descending order. Click it again to toggle to ascending order. Each of the individual groups themselves can be toggled from expanded to collapsed states by clicking on the arrow next to the respective header grouping.

Grouping can be configured to work also with:
* Row templates
* Paging

#### Grouping with Row Templates

By definition, a row template explicitly defines the row markup, while grouping requires changing the row markup. As a result, the two features can be used at the same time only if the row template includes a script which, depending on the number of existing groups, adds additional cells.

###### Example

    $(document).ready(function () {
        // "window." can be omitted if the function is defined outside the document.ready closure
        window.getGridGroupCells = function(id) {
            var cnt = $("#" + id).data("kendoGrid").dataSource.group().length,
                result = "";

            for (var j = 0; j < cnt; j++) {
                result += "<td class='k-group-cell'>&nbsp;</td>";
            }

            return result;
        }

        $("#GridID").kendoGrid({
            groupable: true,
            rowTemplate: "<tr>" +
                "#= getGridGroupCells('GridID') #" +
                "<td>...</td><td>...</td><td>...</td></tr>",
            altRowTemplate: "<tr class='k-alt'>" +
                "#= getGridGroupCells('GridID') #" +
                "<td>...</td><td>...</td><td>...</td></tr>"
        });
    });

#### Grouping with Paging

Paging occurs before grouping. As a result, the following behavior is exhibited:

* The dataSource instance of the Grid is not aware if there are items from the displayed groups on other pages.
* If the groups are collapsed, it is not possible to display additional items and groups from other pages below the rendered items and groups. The only workaround is to increase the page size.

To configure the Grid so that grouping occurs before paging, you need to group the whole dataSource. However, this setup is not recommended because it leads to a greatly reduced performance.

### Sorting

By default, sorting is disabled.

**Figure 5. Grid with its sorting functionality enabled**

![Grid with Sorting Enabled](/controls/data-management/grid/grid7_1.png)

Sorting is also a function that can be pushed to the server for increased performance. This is done through the data source itself and by setting the `serverSorting` option on the data source to `true`. When you delegate the sorting to the server, you will receive the default `orderBy` parameter. This field will contain the field name of the column to sort by in the dataset.

Sorting is supported in two formats:  
* Single-column sorting
* Multi-column sorting

#### Single-Column Sorting

To enable the single-column sorting, set the `sortable` option of the Grid to `true`. This enables the default single-column sorting.

###### Example

    $("#grid").kendoGrid({
         sortable: true
         // other configuration
    });

#### Multi-Column Sorting

To enable the single-column sorting, set the `mode` option to `multiple`.

###### Example

    $("#grid").kendoGrid({
        sortable: {
            mode: "multiple"
        },
        // other configuration
    });

### Keyboard Navigation

Keyboard navigation within the Grid is configured through the `navigatable` option. When set to `true`, it is possible to initially select a row or a cell and then move through the Grid by using the `Arrow` keys.

The navigation occurs at a cell level regardless of what the `selectable` mode is. To select the current row or cell, press the space bar.

The example below demonstrates how to enable the key navigation in the Grid.

###### Example

    $("#grid").kendoGrid({
         navigatable: true
         // other configuration
    });

The keyboard navigation of the Grid works by listening to the `keydown` events on the wrapper element of the widget. It is assumed that everything the user does is in accordance with the currently focused Grid cell, not the focused element of the browser.

If the data cells of the Grid contain hyperlinks and you want to activate them through the keyboard, navigate to the respective Grid cell by using the `Arrow` keys, then press `Enter` to focus the hyperlink inside the cell, and press `Enter` again. To return the focus on the table cell, press `Esc`. In order for the hyperlinks to be inaccessible through tabbing, set the `tabindex="-1"` attribute to the custom hyperlinks.

It is also possible to avoid the described procedure. The custom hyperlinks can be accessed through tabbing and activated through `Enter` by hacking and bypassing the keyboard navigation of the Grid. To achieve this, prevent the event bubbling of the `keydown` event of the custom hyperlinks. In this way, the `Enter` key-presses go unnoticed by the Grid.

## Templates

### Row Templates

It is possible to format any cell within the Grid by using templates within a script tag or within the template option on the column object if the Grid is initialized from a `<div>` element.

The example below demonstrates how to use a template to format the email address as a hyperlink by using a template declared in a script block.

###### Example

    <script id="template" type="text/x-kendo-tmpl">
        <tr>
            <td>
                #= firstName #
            </td>
            <td>
                #= lastName #
            </td>
            <td>
                <a href="mailto:#= email #">#= email #</a>
            </td>
        </tr>
    </script>

Specify this as a template for each row by passing it in to the `rowTemplate` option on the Grid and initializing it with the `kendo.template` function, as demonstrated in the following example.

###### Example

    $("#grid").kendoGrid({
        rowTemplate: kendo.template($("#template").html()),
       // other configuration
    });

In the resulting Grid, the email address is an interactive hyperlink which opens a new email message when clicked.

**Figure 6. Grid with a row template applied**

![Grid with row template](/controls/data-management/grid/grid8_1.png)

For more information on the templating features in Kendo UI, refer to the [introductory article on templates in ASP.NET MVC applications]({% slug overview_kendoui_templatescomponent %}).

### Column Templates

Columns need additional specific templating when they represent complex displays and not single fields.

For more information on configuring columns by using templates in the Grid, refer to the article on [binding the Grid to a remote data source]({% slug remote_data_binding_grid %}#set-the-column-template).

## Other Options

The Grid provides other configuration options as well. The basic ones deliver the possibility to:

* [Edit the Grid]({% slug editing_kendoui_grid_widget %})
* [Configure its height and width]({% slug appearance_kendoui_grid_widget %}#height)
* [Configure its columns and rows]({% slug appearance_kendoui_grid_widget %}#columns)
* [Configure scrolling and virtual scrolling]({% slug appearance_kendoui_grid_widget %}#scrolling)
* [Initialize it in hidden containers]({% slug appearance_kendoui_grid_widget %}#hidden-containers)
* [Render it adaptively]({% slug adaptive_rendering_kendoui_grid_widget %})
* [Localize its messages]({% slug localization_kendoui_grid_widget %})
* [Export it to Excel]({% slug exporting_excel_kendoui_grid_widget %})
* [Export it in PDF]({% slug exporting_pdf_kendoui_grid_widget %})
* [Print the Grid]({% slug printing_kendoui_grid %})

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Client Detail Templates](http://docs.telerik.com/aspnet-mvc/helpers/grid/templating/client-detail-template)
* [Server Detail Templates](http://docs.telerik.com/aspnet-mvc/helpers/grid/templating/server-detail-template)
* [Editor Templates](http://docs.telerik.com/aspnet-mvc/helpers/grid/templating/editor-templates)

For how-to examples on the Kendo UI Grid widget, browse its [**How To** documentation folder]({% slug howto_bindto_telerik_backend_services_grid %}).
