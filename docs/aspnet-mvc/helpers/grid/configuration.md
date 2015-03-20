---
title: Configuration
page_title: DataSource Configuration of Kendo UI Grid for ASP.NET MVC | Kendo UI Documentation
description: Kendo UI DataSource documentation guides you how to configure DataSource to use Ajax binding, add grid columns.
---

# Grid Configuration Settings

This help topic explains the various configuration options exposed via the Kendo UI Grid fluent API.

All code examples assume the following model:

    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int UnitsInStock { get; set; }
        public int UnitsOnOrder { get; set; }
        public double UnitPrice { get; set; }
    }

The Kendo UI Grid fluent API is exposed via the [Kendo.Mvc.UI.Fluent.GridBuilder](/api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder) class.
You don't need to instantiate that class though. You need to use the `Grid` HtmlHelper extension method instead:

    @(Html.Kendo().Grid<Product>().Name("grid"))

## Common DataSource Settings

The [DataSource](/api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder#methods-DataSource(System.Action<Kendo.Mvc.UI.Fluent.DataSourceBuilder<T>>))
method of Kendo UI Grid for ASP.NET MVC configures the [data source](/api/web/grid#configuration-dataSource).

### Aggregates

Sets the aggregates.

#### Example - set the aggregates

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Read(read => read.Action("Products_Read", "Home"))
            .Aggregates(aggregates =>
            {
                aggregates.Add(product => product.UnitsInStock).Min().Max().Count();
                aggregates.Add(product => product.UnitsOnOrder).Average();
                aggregates.Add(product => product.ProductName).Count();
                aggregates.Add(product => product.UnitPrice).Sum();
            })
        )
    )

### Create

Sets the action method which is responsible for saving new data items.

#### Example - set the create action

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.Create())
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Model(model => model.Id(product => product.ProductID))
            .Create(create => create.Action(/* action */"Products_Create", /* controller */ "Home"))
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

### Destroy

Sets the action method which is responsible for destroying data items.

#### Example - set the destroy action

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.ProductName);
            columns.Command(command => command.Destroy());
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Model(model => model.Id(product => product.ProductID))
            .Destroy(destroy => destroy.Action(/* action */"Products_Destroy", /* controller */ "Home"))
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

### Events

Specifies the event handlers for the data source [events](/api/framework/datasource#events).

#### Example - handle data source events

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
            .Events(events => events
                // Subscribe to the "change" event.
                .Change("dataSource_change")
                // Subscribe to the "error" event.
                .Error("dataSource_error")
                // Subscribe to the "requestStart" event.
                .RequestStart("dataSource_requestStart")
            )
        )
    )
    <script>
    function dataSource_change(e) {
        // handle the "change" event
    }
    function dataSource_error(e) {
        // handle the "error" event
    }
    function dataSource_requestStart(e) {
        // handle the "requestStart" event
    }
    </script>

### Filter

Sets the initial filter of the data source.

#### Example - set the filter

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
            .Filter(filters =>
            {
                // Show products whose ProductName property contains "C"
                filters.Add(product => product.ProductName).Contains("C");
                // and UnitsInStock is greater than 10
                filters.Add(product => product.UnitsInStock).IsGreaterThan(10);
            })
        )
    )

### Group

Sets the initial grouping configuration of the data source.

#### Example - set the grouping configuration

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
            .Group(groups =>
            {
                groups.Add(product => product.UnitPrice);
                groups.Add(product => product.ProductName);
            })
        )
    )

### Model

Configures the model of the data source.

#### Example - configure the model

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
            .Model(model =>
            {
                //The unique identifier (primary key) of the model is the ProductID property
                model.Id(product => product.ProductID);

                // Declare a model field and optionally specify its default value (used when a new model instance is created)
                model.Field(product => product.ProductName).DefaultValue("N/A");

                // Declare a model field and make it readonly
                model.Field(product => product.UnitPrice).Editable(false);
            })
        )
    )

###  PageSize

Set the page size used during paging. The default page size is 10.

#### Example - set the page size
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Read(read => read.Action("Products_Read", "Home"))
            .PageSize(20)
        )
    )

### Read

Sets the action method which is responsible for reading data items and returning them as JSON.

#### Example - set the read action

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Read(read => read.Action(/* action */"Products_Read", /* controller */"Home"))
        )
    )

### Sort

Sets the initial sorting.

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Read(read => read.Action("Products_Read", "Home"))
            .Sort(sort =>
            {
                // Sort by UnitsInStock in descending order
                sort.Add(product => product.UnitsInStock).Descending();
                // then by ProductName in ascending order
                sort.Add(product => product.ProductName);
            })
        )
    )

### Update

Sets the action method which is responsible for saving updated data items

#### Example - set the update action

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.ProductName);
            columns.Command(command => command.Edit());
        })
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Model(model => model.Id(product => product.ProductID))
            .Update(update => update.Action(/* action */"Products_Update", /* controller */ "Home"))
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

## Ajax DataSource Settings

### Batch

Enable or disable batch create, update and destroy operations. By default batch operations are disabled.

#### Example - enable batch mode

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.ProductName);
            columns.Command(command => command.Edit());
        })
        .DataSource(dataSource => dataSource
            .Ajax() // or .Server()
            .Batch(true)
            .Model(model => model.Id(product => product.ProductID))
            .Update(update => update.Action(/* action */"Products_Update", /* controller */ "Home"))
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

## Column Configuration

The [Columns](/api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder#methods-Columns(System.Action<Kendo.Mvc.UI.Fluent.GridColumnFactory<T>>)) method configures the grid columns. If not used the grid will create a column for every public property of the model.

### Example - configure the grid columns (WebForms)

    <% Html.Kendo().Grid<Product>()
       .Name("grid")
       .Columns(columns =>
       {
           // Define a column which will display the value of the ProductID property
           columns.Bound(product => product.ProductID);

           // Define a column and set a column setting
           columns.Bound(product => product.ProductName).Title("Product Name");

           // Define a template column - it needs a server side code block <% %>
           columns.Template(product =>
           {
                %>
                    <%: Html.ActionLink("Edit", "Home", new { id = p.ProductID }) %>
                <%
           });

           // Define a command column with a "Destroy" button

           columns.Command(commands =>
           {
                commands.Destroy();
           });
       })
       // The Render method is used because of the server side code blocks
       .Render();
    %>

### Example - configure the grid columns (Razor)

    @( Html.Kendo().Grid<Product>()
       .Name("grid")
       .Columns(columns =>
       {
           // Define a column which will display the value of the ProductID property
           columns.Bound(product => product.ProductID);

           // Define a column and set a column setting
           columns.Bound(product => product.ProductName).Title("Product Name");

           // Define a template column - it needs a templated razor delegate
           columns.Template(@<text>
                @Html.ActionLink("Edit", "Home", new { id = item.ProductID })
           </text>);

           // Define a command column with a "Destroy" button

           columns.Command(commands =>
           {
                commands.Destroy();
           });
       })
    )

## Bound Column Settings

A bound column is declared via the `Bound` method. It has the following settings:

### ClientTemplate

A [Kendo UI template](/framework/templates/overview) which specifies the way the column is displayed.

> The `ClientTemplate` is used when he grid is configured for **[ajax binding](/aspnet-mvc/helpers/grid/ajax-binding)**.

Client templates defined in server-side code are URL encoded before sent to the client.
As a result, a plus sign, which is used **inside a binding expression**, will be lost (e.g. `"#= 3 + 5 #"`).
There are two possible workarounds - use an auxiliary Javascript function in the global scope, which returns the desired value (e.g. `"#= auxFunction(3, 5) #"`),
or encode the plus sign (e.g. `"#= 3 %2b 5 #"`)

#### Example - set the column client template

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Bound(product => product.ProductName).ClientTemplate("<strong>#: ProductName #</strong>");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

### Encoded
Enables or disables the HTML encoding of the bound property value. By default is set to `true` which means that
column values are encoded.

#### Example - prevent html encoding

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            // Stop encoding the value of the bound field
            columns.Bound(product => product.ProductName).Encoded(false);
        })
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

### Filterable

Enables or disables the filtering UI. By default set to `true` which means that bound grid columns can be filtered using
the filtering UI.

#### Example - disable filtering

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Bound(product => product.ProductID).Filterable(false);
            columns.Bound(product => product.ProductName);
        })
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

###  Format

Specifies the format used when displaying the value of the bound property. Empty by default.

#### Example - specify the column format string

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            // Format the value as currency
            columns.Bound(product => product.UnitPrice).Format("{0:C}");
        })
        .Filterable()
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

The supported formats are described in the [globalization](/framework/globalization/overview)
help topic.

### Groupable
Enables or disables dragging the column header to group by its bound property. By default set to `true` which means that bound
grid columns can be dragged for grouping.

#### Example - disable grouping
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Bound(product => product.ProductID).Groupable(false);
            columns.Bound(product => product.ProductName);
        })
        .Groupable()
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

### Sortable

Enables or disables sorting by that column.

#### Example - disable sorting
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Bound(product => product.ProductID).Sortable(false);
            columns.Bound(product => product.ProductName);
        })
        .Groupable()
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

###  Template
Sets the server template which will be used when displaying the bound field.
> The `Template` is used when he grid is configured for [server binding](/aspnet-mvc/helpers/grid/ajax-binding).

In WebForms the template is a [server side code block](http://msdn.microsoft.com/en-us/library/ms178135%28vs.80%29.aspx).
In Razor the template is a [templated razor delegate](http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx).

#### Example - set the column template (WebForms)

    <% Html.Kendo().Grid(Model)
        .Name("grid")
        .Columns(columns =>
        {
            // Template is a server side code block <% %>
            columns.Bound(product => product.ProductID).Template(product =>
            {
                %>
                    <strong><%: p.ProductID %></strong>
                <%
            });
        })
        // The Render method is used because of the server side code blocks
        .Render();
    %>

#### Example - set the column template (Razor)

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Columns(columns =>
        {
             // Template is a templated razor delegate - the argument of the delegate is called "item"
             columns.Bound(product => product.ProductID).Template(@<text>
                 <strong>@item.ProductID</strong>
             </text>);
        })
     )

### Title

Sets the text displayed in the header of the column. By default the property name is used.

#### Example - set the column title

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Bound(product => product.ProductName).Title("Product Name");
        })
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

### Width

Sets the width of the column in pixels or other units. By default the width is not set and the column would try to accomodate its content.

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            // Set the column width in pixels
            columns.Bound(product => product.ProductID).Width(200);
            // Set the column width in em
            columns.Bound(product => product.ProductName).Width("10em");
        })
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

## Template Column Settings

A template column is declared via the `Template` method. It has the following settings:

### ClientTemplate

A [Kendo template](/framework/templates/overview) which specifies the way the column is displayed.
> The `ClientTemplate` is used when he grid is configured for [ajax binding](/aspnet-mvc/helpers/grid/ajax-binding).

#### Example - set the template column client template

    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Template(@<text>
                        <strong>@item.ProductName</strong>
                    </text>)
                   .ClientTemplate("<strong>#: ProductName #</strong>");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

###  Title

Sets the text displayed in the header of the column. Empty by default.

#### Example - set the template column title
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Template(@<text>
                        <strong>@item.ProductName</strong>
                    </text>)
                   .Title("Product Name")
                   .ClientTemplate("<strong>#: ProductName #</strong>");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )
###   Width
Sets the width of the column in pixels or other units. By default the width is not set and the column would try to accomodate its content.

#### Example - set the template column width
    @(Html.Kendo().Grid<Product>()
        .Name("grid")
        .Columns(
        {
            columns.Template(@<text>
                        <strong>@item.ProductName</strong>
                    </text>)
                   .Width(200)
                   .ClientTemplate("<strong>#: ProductName #</strong>");
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    )

## Paging

To configure paging use the `Pageable` method.

### Enable paging

To enable paging with default settings call the `Paegable` method without arguments.

#### Example - enable paging (WebForms)

    <%: Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable() // Enable paging
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
    %>

#### Example - enable paging (Razor)

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable() // Enable paging
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### ButtonCount

The `ButtonCount` method specifies how many numeric buttons should be displayed in the pager. By default 10 buttons are shown.

#### Example - specify custom button count

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager.ButtonCount(15))
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### Enabled

The `Enabled` method enables or disables paging. Use when paging should be enabled based on a condition:

#### Example - conditionally enable paging

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager.Enabled((bool)ViewData["EnablePager"]))
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### Info

The `Info` method specifies whether to show additional paging info. By default the pager will display the total number of
items in the grid and the first and last item number e.g. "1-50 of 50 items".
If the grid is empty the pager would show "No items to display". Paging info is displayed by default.

#### Example - hide the paging info

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager.Info(false))
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### Input

The `Input` method specifies whether to show a textbox for typing in a page number. By default such a textbox is not shown.

#### Example - show a textbox for the page number

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager.Input(true))
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### Messages

The `Messages` method configures all messages displayed by the pager. Use this setting to override the default messages or localize the pager.
The available messages are:

#### Display

The pager info messge. By default set to `"{0} - {1} of {2} items"`. The placeholders represent the first item in the page, the last item in the page and the total number of items in the grid.

##### Example - set the display message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Messages(messages => messages.Display("Showing items from {0} to {1}. Total items: {2}"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Empty

The pager info message displayed when there are no items in the grid. By default set to `"No items to display"`.

##### Example - set the empty message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Messages(messages => messages.Empty("No data"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### First

The tooltip displayed when the user hovers the "first" button of the pager. Clicking that button navigates to the first page.
By default set to `"Go to the first page"`.

##### Example - set the first message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Messages(messages => messages.First("First page"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### ItemsPerPage

The label displayed when page sizes dropdown is displayed. By default set to `"items per page`".

##### Example - set the items per page message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .PageSizes(true)
            .Messages(messages => messages.ItemsPerPage("items are currently displayed"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Last

The tooltip displayed when the user hovers the "last" button of the pager. Clicking that button navigates to the last page.
By default set to `"Go to the last page"`.

##### Example - set the last message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Messages(messages => messages.Last("Last page"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Next

The tooltip displayed when the user hovers the "next" button of the pager. Clicking that button navigates to the next page.
By default set to `"Go to the next page"`.

##### Example - set the next message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Messages(messages => messages.Next("Next page"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Of

The label displayed after the page textbox. By default set to `"of {0}"`. The placeholder will contain the total number of pages.

##### Example - set the "of" message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Input(true)
            .Messages(messages => messages.Of("of {0} pages"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Page

The label displayed before the page textbox. By default set to `"Page"`.

##### Example - set the "page" message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Input(true)
            .Messages(messages => messages.Page("Current page:"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Previous

The tooltip displayed when the user hovers the "previous" button of the pager. Clicking that button navigates to the previous page.
By default set to `"Go to the previous page"`.

##### Example - set the "previous" message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Messages(messages => messages.Previous("Previous page"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Refresh

The tooltip displayed when the user hovers the "refresh" button of the pager. Clicking that button refreshes the current page.
By default set to `"Refresh"`.

##### Example - set the "refresh" message

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Refresh(true)
            .Messages(messages => messages.Refresh("Click to refresh"))
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### Numeric

The `Numeric` method enables or disables the numeric pager. When enabled the pager will display
numeric pager buttons. Numeric paging is enabled by default.

#### Example - disable the numeric pager

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Numeric(false)
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### PageSizes

The `PageSizes` method enables or disables the page size dropdown. When enabled the pager displays a dropdown which allows the user to
change the page size to a predefined value. The page size dropdown is disabled by default.

#### Example - enable page size dropdown

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .PageSizes(true) // Default page sizes are 5, 10 and 20
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

#### Example - enable page size dropdown with custom page sizes

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .PageSizes(new [] { 10, 20, 30 }) // Default page sizes are 5, 10 and 20
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### PreviousNext

The `PreviousNext` method enables or disables the previous/next/first/last pager buttons. Those buttons navigate to the corresponding page when clicked.
Enabled by default.

#### Example - disable previous and next pager buttons

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .PreviousNext(false)
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

### Refresh

The `Refresh` method enables or disables the refresh pager button. Clicking that button will reload the current page. Disabled by default.

#### Example - show the refresh button

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Pageable(pager => pager
            .Refresh(true)
        )
        .DataSource(dataSource => dataSource
            .Ajax() // or Server()
            .Read(read => read.Action("Products_Read", "Home"))
        )
     )

## Scrolling
 
By default, the Kendo UI MVC Grid is not scrollable. If scrolling is enabled, the widget will apply a default height of 200px to its data area.
That can be changed or removed by setting an optional height style in the Grid's `Scrollable` settings:

    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Scrollable(s => s.Height(400)) // set 400px height style
     )
     
     // or
     
    @(Html.Kendo().Grid(Model)
        .Name("grid")
        .Scrollable(s => s.Height("auto")) // remove default height
     )
