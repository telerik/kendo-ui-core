---
title: Configuration
page_title: Configuration | Kendo UI Grid HtmlHelper
description: "Configure the DataSource of the Kendo UI Grid HtmlHelper to use Ajax binding and add Grid columns in ASP.NET MVC applications."
slug: configuration_gridhelper_aspnetmvc
position: 2
---

# Configuration

This article explains the configuration options exposed by the fluent API of the Kendo UI Grid.

All code examples assume the model demonstrated in the example below.

###### Example

        public class Product
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public int UnitsInStock { get; set; }
            public int UnitsOnOrder { get; set; }
            public double UnitPrice { get; set; }
        }

The Kendo UI Grid API is exposed via the [`Kendo.Mvc.UI.Fluent.GridBuilder`](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder) class. However, you do not have to instantiate that class. Use the `Grid` HtmlHelper extension method instead.

###### Example

        @(Html.Kendo().Grid<Product>().Name("grid"))

## Common DataSource Settings

The [`DataSource`](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder#methods-Columns(System.Action<Kendo.Mvc.UI.Fluent.GridColumnFactory<T>>)) method of Kendo UI Grid for ASP.NET MVC configures the [data source](/api/javascript/ui/grid#configuration-dataSource).

### Aggregates

The `Aggregates` method sets the aggregates, as demonstrated in the example below.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax() //Or .Server()
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

The `Create` method sets the action method which is responsible for saving new data items.

The example below demonstrates how to set the `create` action.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .ToolBar(toolbar => toolbar.Create())
            .DataSource(dataSource => dataSource
                .Ajax() //Or .Server()
                .Model(model => model.Id(product => product.ProductID))
                .Create(create => create.Action(/* action */"Products_Create", /* controller */ "Home"))
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
<!--*-->
### Destroy

The `Destroy` method sets the action method which is responsible for destroying data items.

The example below demonstrates how to set the `destroy` action.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(product => product.ProductName);
                columns.Command(command => command.Destroy());
            })
            .Editable(editable => editable.Mode(GridEditMode.InLine))
            .DataSource(dataSource => dataSource
                .Ajax() //Or .Server()
                .Model(model => model.Id(product => product.ProductID))
                .Destroy(destroy => destroy.Action(/* action */"Products_Destroy", /* controller */ "Home"))
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
<!--*-->
### Events

The `Events` method specifies the event handlers for the data source [events](/api/javascript/data/datasource#events).

The example below demonstrates how to handle data source events.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
                .Events(events => events
                    //Subscribe to the "change" event.
                    .Change("dataSource_change")
                    //Subscribe to the "error" event.
                    .Error("dataSource_error")
                    //Subscribe to the "requestStart" event.
                    .RequestStart("dataSource_requestStart")
                )
            )
        )
        <script>
        function dataSource_change(e) {
            //Handle the "change" event.
        }
        function dataSource_error(e) {
            //Handle the "error" event.
        }
        function dataSource_requestStart(e) {
            //Handle the "requestStart" event.
        }
        </script>

### Filter

The `Filter` method sets the initial filter of the data source, as demonstrated in the example below.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
                .Filter(filters =>
                {
                    //Show products whose ProductName property contains a "C".
                    filters.Add(product => product.ProductName).Contains("C");
                    //Show products whose UnitsInStock is greater than 10.
                    filters.Add(product => product.UnitsInStock).IsGreaterThan(10);
                })
            )
        )

### Group

The `Group` method sets the initial grouping configuration of the data source, as demonstrated in the example below.

###### Example

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

The `Model` method configures the model of the data source.

The data field names must be valid Javascript identifiers and contain neither spaces, nor special characters. The first character should be a letter.

The example below demonstrates how to configure the model.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Read(read => read.Action("Products_Read", "Home"))
                .Model(model =>
                {
                    //The unique identifier (primary key) of the model is the ProductID property.
                    model.Id(product => product.ProductID);

                    //Declare a model field and optionally specify its default value (used when a new model instance is created).
                    model.Field(product => product.ProductName).DefaultValue("N/A");

                    //Declare a model field and make it readonly.
                    model.Field(product => product.UnitPrice).Editable(false);
                })
            )
        )

###  PageSize

The `PageSize` method sets the page size used during paging. The default page size is `10`.

The example below demonstrates how to set the page size.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax() //Or .Server()
                .Read(read => read.Action("Products_Read", "Home"))
                .PageSize(20)
            )
        )

### Read

The `Read` method sets the action method which is responsible for reading data items and for returning them as JSON.

The example below demonstrates how to set the `read` action.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax() //Or .Server()
                .Read(read => read.Action(/* action */"Products_Read", /* controller */"Home"))
            )
        )
<!--*-->
### Sort

The `Sort` method sets the initial sorting, as demonstrated in the example below.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .DataSource(dataSource => dataSource
                .Ajax() //Or .Server()
                .Read(read => read.Action("Products_Read", "Home"))
                .Sort(sort =>
                {
                    //Sort by the UnitsInStock in descending order.
                    sort.Add(product => product.UnitsInStock).Descending();
                    //Then sort by the ProductName in ascending order.
                    sort.Add(product => product.ProductName);
                })
            )
        )

### Update

The `Update` method sets the action method which is responsible for saving updated data items.

The example below demonstrates how to set the `update` action.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(product => product.ProductName);
                columns.Command(command => command.Edit());
            })
            .Editable(editable => editable.Mode(GridEditMode.InLine))
            .DataSource(dataSource => dataSource
                .Ajax() //Or .Server()
                .Model(model => model.Id(product => product.ProductID))
                .Update(update => update.Action(/* action */"Products_Update", /* controller */ "Home"))
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )
<!--*-->
## Ajax DataSource Settings

### Batch

The `Batch` method configures the batch `create`, `update` and `destroy` operations. By default, the batch operations are disabled.

The example below demonstrates how to enable the batch mode.

###### Example

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
<!--*-->
## Bound Column Settings

### Configuration

The [`Columns`](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder#methods-Columns) method configures the Grid columns. If not used, the Grid creates a column for every public property of the model.

The example below demonstrates how to configure the Grid columns.

###### Example

```tab-ASPX

        <% Html.Kendo().Grid<Product>()
           .Name("grid")
           .Columns(columns =>
           {
               //Define a column which will display the value of the ProductID property.
               columns.Bound(product => product.ProductID);

               //Define a column and set a column setting.
               columns.Bound(product => product.ProductName).Title("Product Name");

               //Define a template column. It needs a server-side code block (<% %>).
               columns.Template(product =>
               {
                    %>
                        <%: Html.ActionLink("Edit", "Home", new { id = p.ProductID }) %>
                    <%
               });

               //Define a command column with a "Destroy" button.

               columns.Command(commands =>
               {
                    commands.Destroy();
               });
           })
           //The Render method is used because of the server-side code blocks.
           .Render();
        %>
```
```tab-Razor

        @( Html.Kendo().Grid<Product>()
           .Name("grid")
           .Columns(columns =>
           {
               //Define a column which will display the value of the ProductID property.
               columns.Bound(product => product.ProductID);

               //Define a column and set a column setting.
               columns.Bound(product => product.ProductName).Title("Product Name");

               //Define a template column. It needs a templated razor delegate.
               columns.Template(@<text>
                    @Html.ActionLink("Edit", "Home", new { id = item.ProductID })
               </text>);

               //Define a command column with a "Destroy" button.

               columns.Command(commands =>
               {
                    commands.Destroy();
               });
           })
        )
```

### Bound Column Overview

A bound column is declared through the `Bound` method, which specifies a data field.

> **Important**
>
> The data field names must be valid Javascript identifiers and contain neither spaces, nor special characters. The first character should be a letter.

Bound columns support the following settings:

* ClientTemplate
* Encoded
* Filterable
* Format
* Groupable
* Sortable
* Template
* Title
* Width

### ClientTemplate

A [Kendo UI template]({% slug overview_kendoui_templatescomponent %}) which specifies the way the column is displayed.

> **Important**  
>
> The `ClientTemplate` is used when the Grid is configured for [Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}) or when [server binding]({% slug serverbinding_grid_aspnetmvc %}) is combined with client-side data operations^&mdash;when [`ServerOperation` is set to `false`]({% slug ajaxbinding_grid_aspnetmvc %}#enable-client-data-processing-during-ajax-binding).

Client templates defined in server-side code are URL encoded before they are sent to the client. As a result, a `+` (plus) sign, which is used inside a binding expression, is lost&mdash;for example, `"#= 3 + 5 #"`.

There are two possible workarounds:

* Use an auxiliary Javascript function in the global scope, which returns the desired value&mdash;for example, `"#= auxFunction(3, 5) #"`.
* Encode the `+` (plus) sign&mdash;for example, `"#= 3 %2b 5 #"`.

The example below demonstrates how to set the column `ClientTemplate`.

###### Example

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

The `Encoded` method configures the HTML encoding of the bound property value. By default, it is set to `true` which means that the column values are encoded.

The example below demonstrates how to prevent `html` encoding.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(
            {
                //Stop encoding the value of the bound field.
                columns.Bound(product => product.ProductName).Encoded(false);
            })
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

### Filterable

The `Filterable` method enables or disables the filtering UI. By default, it is set to `true` which means that the bound Grid columns can be filtered using the filtering UI.

The example below demonstrates how to disable filtering.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(
            {
                columns.Bound(product => product.ProductID).Filterable(false);
                columns.Bound(product => product.ProductName);
            })
            .Filterable()
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

### Format

The `Format` method specifies the format used when displaying the value of the bound property. By default, it is empty.

The example below demonstrates how to specify the column format string.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(
            {
                //Format the value as currency.
                columns.Bound(product => product.UnitPrice).Format("{0:C}");
            })
            .Filterable()
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

For more information on the supported formats, refer to the [article about globalization]({% slug overview_kendoui_globalization %}).

### Groupable

The `Groupable` method enables or disables the dragging of the column header to group by its bound property. By default, it is set to `true` which means that the bound Grid columns can be dragged for grouping.

The example below demonstrates how to disable grouping.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(
            {
                columns.Bound(product => product.ProductID).Groupable(false);
                columns.Bound(product => product.ProductName);
            })
            .Groupable()
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

### Sortable

The `Sortable` method enables or disables the sorting by that column.

The example below demonstrates how to disable the sorting.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(
            {
                columns.Bound(product => product.ProductID).Sortable(false);
                columns.Bound(product => product.ProductName);
            })
            .Groupable()
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

### Template

The `Template` method sets the server template which is used when the bound field is displayed.

> **Important**  
>
> The `Template` is used when the Grid is configured for [server binding]({% slug serverbinding_grid_aspnetmvc %}). If the client-side data operations are enabled&mdash;when [`ServerOperation` is set to `false`]({% slug ajaxbinding_grid_aspnetmvc %}#enable-client-data-processing-during-ajax-binding)), you will also need a [`ClientTemplate`](#clienttemplate).

In WebForms, the template is a [server-side code block](https://msdn.microsoft.com/en-us/library/ms178135(vs.80).aspx).

In Razor the template is a [templated Razor delegate](http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx/).

The example below demonstrates how to set the column template.

###### Example

```tab-ASPX

        <% Html.Kendo().Grid(Model)
            .Name("grid")
            .Columns(columns =>
            {
                //The template is a server-side code block (<% %>).
                columns.Bound(product => product.ProductID).Template(product =>
                {
                    %>
                        <strong><%: p.ProductID %></strong>
                    <%
                });
            })
            //The Render method is used because of the server-side code blocks.
            .Render();
        %>
```
```tab-Razor

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Columns(columns =>
            {
                 //The template is a templated razor delegate. The argument of the delegate is called "item".
                 columns.Bound(product => product.ProductID).Template(@<text>
                     <strong>@item.ProductID</strong>
                 </text>);
            })
         )
```

### Title

The `Title` method sets the text displayed in the header of the column. By default, the property name is used.

The `Title` should not include non-encoded HTML content. Use a `HeaderTemplate` instead.

The example below demonstrates how to set the column title.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(
            {
                columns.Bound(product => product.ProductName).Title("Product Name");
            })
            .DataSource(dataSource => dataSource
                .Ajax() //Оr Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

### Width

The `Width` method sets the width of the column in pixels or other units. By default, the width is not set and the column would try to accommodate its content.

The example below demonstrates how to set the column width.

###### Example

        @(Html.Kendo().Grid<Product>()
            .Name("grid")
            .Columns(
            {
                //Set the column width in pixels.
                columns.Bound(product => product.ProductID).Width(200);
                //Set the column width in em.
                columns.Bound(product => product.ProductName).Width("10em");
            })
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        )

## Template Column Settings

A template column is declared through the `Template` method. This is a column that is not bound to a specific field from the data, so it is not sortable, nor filterable. Nevertheless, template columns can still display data item values.

Template columns have the following settings:

* ClientTemplate
* Title
* Width
* Paging
* ButtonCount
* Enabled
* Info
* Input
* Messages

### ClientTemplate

A [Kendo UI template]({% slug overview_kendoui_templatescomponent %}) which specifies the way the column is displayed.

> **Important**  
>
> The `ClientTemplate` is used when the Grid is configured for [Ajax binding]({% slug ajaxbinding_grid_aspnetmvc %}).

The example below demonstrates how to set the template column client template.

###### Example

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

### Title

The `Title` method sets the text displayed in the header of the column. By default, it is empty.

The example below demonstrates how to set the template column title.

###### Example

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

### Width

The `Width` method sets the width of the column in pixels or other units. By default, the width is not set and the column would try to accommodate its content.

The example below demonstrates how to set the template column width.

###### Example

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

The `Paging` method configures the paging functionality.

### Enable Paging

To enable paging with the default settings, call the `Paegable` method without arguments.

###### Example

```tab-ASPX

        <%: Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable() //Enable paging.
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
        %>
```
```tab-Razor

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable() //Enable paging.
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )
```

### ButtonCount

The `ButtonCount` method specifies the number of numeric buttons that should be displayed in the pager. By default, the number of displayed buttons is 10.

The example below demonstrates how to specify a custom button count.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager.ButtonCount(15))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

### Enabled

The `Enabled` method enables or disables paging. Use it when paging based on a condition should be enabled.

The example below demonstrates how to conditionally enable paging.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager.Enabled((bool)ViewData["EnablePager"]))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

### Info

The `Info` method specifies whether to show additional paging info. By default, the pager displays the total number of items in the Grid and the first and last item number&mdash;for example, `"1-50 of 50 items"`.

If the Grid is empty, the pager would show `"No items to display"`. The paging info is displayed by default.

The example below demonstrates how to hide the paging info.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager.Info(false))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

### Input

The `Input` method specifies whether to show a textbox for typing in a page number. By default, such a textbox is not shown.

The example below demonstrates how to show a textbox for the page number.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager.Input(true))
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

### Messages

The `Messages` method configures all messages displayed by the pager. Use this setting to override the default messages or to localize the pager.

The available messages are:

* Display
* Empty
* First
* ItemsPerPage
* Last
* Next
* Of
* Page
* Previous
* Refresh

#### Display

The `Display` method sets the pager info message. By default, it is set to `"{0} - {1} of {2} items"`. The placeholders represent the first item in the page, the last item in the page, and the total number of items in the Grid.

The example below demonstrates how to set the display message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Messages(messages => messages.Display("Showing items from {0} to {1}. Total items: {2}"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### Empty

The `Empty` method configures the pager info message displayed when there are no items in the Grid. By default, it is set to `"No items to display"`.

The example below demonstrates how to set the empty message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Messages(messages => messages.Empty("No data"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### First

The `First` method sets the tooltip displayed when the user hovers over the `"first"` button of the pager. Clicking that button navigates to the first page. By default, it is set to `"Go to the first page"`.

The example below demonstrates how to set the first message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Messages(messages => messages.First("First page"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### ItemsPerPage

The `ItemsPerPage` method sets the label displayed when page sizes dropdown is displayed. By default, it is set to `"items per page`".

The example below demonstrates how to set the items per page message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .PageSizes(true)
                .Messages(messages => messages.ItemsPerPage("items are currently displayed"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### Last

The `Last` method sets the tooltip displayed when the user hovers over the `"last"` button of the pager. Clicking that button, navigates to the last page. By default, it is set to `"Go to the last page"`.

The example below demonstrates how to set the last message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Messages(messages => messages.Last("Last page"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### Next

The `Next` method configures the tooltip displayed when the user hovers over the `"next"` button of the pager. Clicking that button navigates to the next page. By default, it is set to `"Go to the next page"`.

The example below demonstrates how to set the `next` message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Messages(messages => messages.Next("Next page"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### Of

The `Of` method configures the label displayed after the page textbox. By default, it is set to `"of {0}"`. The placeholder contains the total number of pages.

The example below demonstrates how to set the `of` message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Input(true)
                .Messages(messages => messages.Of("of {0} pages"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### Page

The `Page` method configures the label displayed before the page textbox. By default, it is set to `"Page"`.

The example below demonstrates how to set the `page` message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Input(true)
                .Messages(messages => messages.Page("Current page:"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### Previous

The `Previous` method sets the tooltip displayed when the user hovers over the `"previous"` button of the pager. Clicking that button navigates to the previous page. By default, it is set to `"Go to the previous page"`.

The example below demonstrates how to set the `previous` message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Messages(messages => messages.Previous("Previous page"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

#### Refresh

The `Refresh` method sets the tooltip displayed when the user hovers over the `"refresh"` button of the pager. Clicking that button refreshes the current page. By default, it is set to `"Refresh"`.

The example below demonstrates how to set the `refresh` message.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Refresh(true)
                .Messages(messages => messages.Refresh("Click to refresh"))
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

### Numeric

The `Numeric` method sets the numeric pager. When enabled the pager will display numeric pager buttons. Numeric paging is enabled by default.

The example below demonstrates how to disable the numeric pager.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .Numeric(false)
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

### PageSizes

The `PageSizes` method enables or disables the page size dropdown. When enabled, the pager displays a dropdown which allows the user to change the page size to a predefined value. The page size dropdown is disabled by default.

The example below demonstrates how to enable the page size dropdown.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .PageSizes(true) //The default page sizes are 5, 10 and 20.
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

The example below demonstrates how to enable the page size dropdowns with custom page sizes.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Pageable(pager => pager
                .PageSizes(new [] { 10, 20, 30 }) //The default page sizes are 5, 10 and 20.
            )
            .DataSource(dataSource => dataSource
                .Ajax() //Or Server()
                .Read(read => read.Action("Products_Read", "Home"))
            )
         )

### PreviousNext

The `PreviousNext` method enables or disables the `previous/next/first/last` pager buttons. These buttons navigate to the corresponding page when clicked. By default, the method is enabled.

The example below demonstrates how to disable the `previous` and `next` pager buttons.

###### Example

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

The `Refresh` method enables or disables the `refresh` pager button. Clicking that button reloads the current page. By default, the method is disabled.

The example below demonstrates how to show the `refresh` button.

###### Example

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

## No Records Template

The Grid can show a built-in or custom message to the user when there are no records to display. There are several ways to configure it.

### Default Built-In Message

The example below demonstrates how to enable the default built-in `No Records` message.

###### Example

        @(Html.Kendo().Grid<Order>()   
            .Name("Grid")
            .NoRecords()
        )

### Custom Message

The example below demonstrates how to define a custom `No Records` message. In this case, the custom message is be displayed centered inside the empty Grid's data area.

###### Example

        @(Html.Kendo().Grid<Order>()   
            .Name("Grid")
            .NoRecords("string HTML template, automatically centered")
        )

### Non-Centered Custom Message

The example below demonstrates how to define a non-centered custom `No Records` message. In this case, the custom message is displayed with no centering styles applied, which allows an easier and more advanced appearance customization through custom CSS code.

###### Example

        @(Html.Kendo().Grid<Order>()   
            .Name("Grid")
            .NoRecords(n => n.Template("string HTML template, not centered"))
        )

### External Template Message  

The example below demonstrates how to define a custom `No Records` message with an external Kendo UI template. This case is the same as the above one, but the template is defined outside the Grid declaration.

###### Example

        <script id="no-records-template-id" type="text/x-kendo-template">
            external HTML template, not centered
        </script>

        @(Html.Kendo().Grid<Order>()   
            .Name("Grid")
            .NoRecords(n => n.TemplateId("no-records-template-id"))
        )

## Scrolling

By default, the Kendo UI MVC Grid is not scrollable. When scrolling is enabled, the widget applies a default height of 200px to its data area. This can be changed or removed by setting an optional height style in the Grid's `Scrollable` settings, as demonstrated in the example below.

###### Example

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Scrollable(s => s.Height(400)) //Set a 400px-height style.
         )

         //Or:

        @(Html.Kendo().Grid(Model)
            .Name("grid")
            .Scrollable(s => s.Height("auto")) //Remove the default height.
         )

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
* [Frequently Asked Questions]({% slug freqaskedquestions_gridhelper_aspnetmvc %})
* [Binding of the Grid HtmlHelper]({% slug ajaxbinding_grid_aspnetmvc %})
* [Editing of the Grid HtmlHelper]({% slug ajaxediting_grid_aspnetmvc %})
* [Templating of the Grid HtmlHelper]({% slug clientdetailtemplate_grid_aspnetmvc %})
* [Troubleshooting for the Grid HtmlHelper]({% slug troubleshoot_gridhelper_aspnetmvc %})
* [API Reference of the Grid HtmlHelper](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBuilder)
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})

Articles on Telerik UI for ASP.NET MVC:

* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
