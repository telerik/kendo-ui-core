---
title: Frequently Asked Questions
page_title: Frequently Asked Questions | Kendo UI Grid HtmlHelper
description: "Find the most frequently asked questions related to the Kendo UI Grid HtmlHelper and their answers."
slug: freqaskedquestions_gridhelper_aspnetmvc
position: 5
---

# Frequently Asked Questions

## Displaying of Values

### How to Display HTML in Grid Columns?

By default, the Kendo UI Grid for ASP.NET MVC encodes the HTML entities that are included in its data. To prevent this, call the [`Encoded`](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilder#formatsystem.string) method and pass `false` as its argument.

The example below demonstrates how to display HTML entities in Grid columns.

###### Example

    columns.Bound(o => o.Description).Encoded(false);

### How to Customize the Way Properties Are Displayed in Grid-Bound Columns?

If the Grid is [server-bound](/aspnet-mvc/helpers/grid/server-binding), use the `Template` method.

The example below demonstrates how to customize the column appearance of a server-bound Grid.

###### Example

```tab-ASPX

    <% Html.Kendo().Grid<Models.Product>(Model)
           .Name("Grid")
           .Columns(columns =>
           {
               columns.Bound(p => p.Title).Template(p =>
               {
                    %>
                        <strong><%: p.Title %></strong>
                    <%
               });
           })
           .Render();
    %>
```

**Razor**

    @(Html.Kendo().Grid<Models.Product>(Model)
          .Name("Grid")
          .Columns(columns =>
          {
              columns.Bound(p => p.Title).Template(@<text>
                   <strong>@item.Title</strong>
              </text>);
          })
    )

> **Important**  
>
> The `Template` method needs a [templated Razor delegate](http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx) when used in Razor views. The bound item is available through the `@item` parameter.

If the Grid is [Ajax-bound]({% slug ajaxbinding_grid_aspnetmvc %}), use the `ClientTemplate` method. The value should be a string, which represents a valid [Kendo UI Template]({% slug overview_kendoui_templatescomponent %}).

The example below demonstrates how to customize the column appearance of an Ajax-bound Grid.

###### Example

    .Columns(columns =>
    {
        columns.Bound(p => p.Title).ClientTemplate("<strong>#: Title #</strong>");
    })

### How to Apply Conditional Logic in Column Client Templates?

A Kendo UI Template may contain arbitrary JavaScript code. The `#` symbol is used to denote JavaScript blocks.

The example below demonstrates the conditions in the `ClientTemplate`.

###### Example

    columns.Bound(p => p.ProductName).ClientTemplate(
        "# if (HasIcon == true) { #" +
            "<img src='" + Url.Content("~/Content/icons/") + "#= ProductID #.png' alt='#= ProductName # icon' />" +
        "# } else { #" +
            "#: ProductName #" +
        "# } #"
    );

### How to Display Checkboxes in Ajax-Bound Grids?

The `checked` attribute specifies whether a checkbox is displayed as checked or not checked. Use a condition to set that attribute.

The example below demonstrates how to display a checkbox in a bound `ColumnClientTemplate`.

###### Example

    columns.Bound(p => p.Enabled).ClientTemplate(
        "<input type='checkbox' value='#= ProductID #' " +
            "# if (Enabled) { #" +
                "checked='checked'" +
            "# } #" +
        "/>"
    );

### How to Use Action Links?

For server-bound Grids, the `Template` method should be used.

The example below demonstrates an action link in a Grid column.

###### Example

**WebForms**

    columns.Bound(p => p.ProductID).Template(p =>
    {
        %>
            <%: Html.ActionLink("Show Product Details", "ProductDetails", new { id = p.ProductID } ) %>
        <%
    });

**Razor**

    columns.Bound(p => p.ProductID).Template(@<text>
          @Html.ActionLink("Show Product Details", "ProductDetails", new { id = @item.ProductID } )>
    </text>);

For Ajax-bound Grids the `ClientTemplate` method should be used.

The example below demonstrates an action link in an Ajax-bound Grid column.

###### Example

    columns.Bound(p => p.ProductID).ClientTemplate(
        "<a href='" +
            Url.Action("ProductDetails", "Product") +
            "/#= ProductID #'" +
        ">Show Product Details</a>"
    );

### How to Use JavaScript Functions in Column Client Templates?

The Kendo UI Template has an implicit parameter called `data`. Use it as the argument of the JavaScript function.

The example below demonstrates how to use a JavaScript function in the `ClientTemplate`.

###### Example

     // -- Removed for brevity.
     columns.Bound(p => p.ProductID).ClientTemplate("#= productDetails(data) #");
     // -- Removed for brevity.

    <script>
    function productDetails(product) {
        var action = '@Url.Action("ProductDetails", "Product")';

        var html = kendo.format("<a href='{0}/{1}'>Show Product Details</a>",
            action,
            product.ProductID
        );

        return html;
    }
    </script>

### How to Use Kendo UI Widgets inside Grid Client Column Templates?

The `script` tags are not automatically evaluated inside a Grid client column template, so the included widgets are not initialized. The scripts must be evaluated manually in the [Grid's `dataBound` event](/api/javascript/ui/grid#events-dataBound).

The example below demonstrates how to add a Kendo UI Menu inside a Grid column template.

###### Example

**C#**

    @(Html.Kendo().Grid<ModelType>()
        .Name("GridID")
        .Columns(columns => {
            columns.Template(@<text></text>).HtmlAttributes(new { @class = "templateCell" }).ClientTemplate(
                    Html.Kendo().Menu()
                        .Name("menu_#=OrderID#")
                        .Items(its =>
                        {
                            its.Add().Text("foo").Items(nested =>
                            {
                                nested.Add().Text("bar");
                                nested.Add().Text("baz");
                            });

                        })
                        .ToClientTemplate().ToHtmlString()
                    );
        })
        .Events(ev => ev.DataBound("initMenus"))
    )

**Javascript**

    function initMenus(e) {
        $(".templateCell").each(function(){
            eval($(this).children("script").last().html());
        });
    }

**CSS**

The Menu requires the Grid cells to allow overflowing, which is disabled by default.

    .k-widget .templateCell
    {
        overflow: visible;
    }

### How to Change the Format of Bound Columns?

Use the [`Format`](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilder#formatsystem.string) method. The value should be a valid [`number`](/api/javascript/kendo#standard-number-formats) or [`date`](/api/javascript/kendo#standard-date-formats) format.

The example below demonstrates how to specify the format of a bound column.

###### Example

    columns.Bound(o => o.OrderDate).Format("{0:d}"); // Will use the short date pattern

### How to Add Kendo UI Icons to Custom Command Buttons?

The custom command buttons have the required `span` element, which is normally used to display an icon. However, this element has no CSS classes. Add them in the `dataBound` handler.

A list of the available Kendo UI icons and their CSS classes is available in the [demo on styling and icons](http://demos.telerik.com/kendo-ui/styling/icons).

The example below demonstrates how to add Kendo UI icons to custom command buttons.

###### Example

**C#**

    @(Html.Kendo().Grid()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Command(command => { command.Custom("myCommand").Text("My Text"); });
        })
        .Events(ev => ev.DataBound("addIcons"))
    )

**Javascript**

    function addIcons(e) {
        e.sender.tbody.find(".k-grid-myCommand > span").addClass("k-icon k-i-custom");
    }

## Data Binding

### How to Implement Paging, Sorting, Filtering, and Grouping?

If your model supports the `IQueryable` interface or is `DataTable`, the Grid does paging, sorting, filtering, grouping, and aggregates&mdash;`DataTable` binding supports only the `count` aggregate&mdash;automatically.

For server-binding scenarios, no additional steps are required. Just pass the `IQueryable` to the `Grid` constructor. For additional information on the Grid server binding, refer to [this article]({% slug serverbinding_grid_aspnetmvc %}).

For Ajax-binding scenarios, the `ToDataSourceResult` extension method must be used to perform the data processing. For additional information on the Grid Ajax binding, refer to [this article]({% slug ajaxbinding_grid_aspnetmvc %}).

If your model does not implement `IQueryable`, implement custom binding. This means that you are responsible for the paging, sorting, filtering, and grouping of the data. For more information on the Grid custom binding, refer to [this article]({% slug custombinding_grid_aspnetmvc %}).

> **Important**  
>
> All data operations are performed at database server level if the underlying `IQueryable` provider supports translation of expression trees to SQL. Kendo UI Grid for ASP.NET MVC has been tested with the following frameworks:
> - Entity Framework
> - Linq to SQL
> - Telerik OpenAccess
> - NHibernate

### How to Send Values to My Action Method When Binding the Grid?

If the Grid is server-bound, use the `overload` method which accepts route values.

The example below demonstrates how to send data in a server-bound Grid.

###### Example

    // -- Removed for brevity.
    .DataSource(dataSource => dataSource.Server()
        .Read(read => read.Action("Read", "Home", new { userID = (int)ViewData["UserID"] }))
    )
    // -- Removed for brevity.

If the Grid is Ajax-bound, use the `Data` method to specify the name of the JavaScript function, which will return the additional data.

The example below demonstrates how to send additional data in an Ajax-bound Grid.

###### Example

    // -- Removed for brevity.
    .DataSource(dataSource => dataSource.Ajax()
        .Read(read => read
            .Action("Read", "Home")
            .Data("additionalData")
        )
    )
    // -- Removed for brevity.
    <script>
        function additionalData() {
            return {
                userID: 42,
                search: $("#search").val()
            };
        }
    </script>

### How to Reload Data in Ajax-Bound Grids?

Use the [`read`](/api/javascript/data/datasource#read) method of the DataSource.

The example below demonstrates how to reload an Ajax-bound Grid.

###### Example

    var grid = $("#Grid").data("kendoGrid");

    grid.dataSource.read();

### How to Convert My Models to View Model Objects?

The `ToDataSourceResult` extension method supports an optional selector, which can be used to convert the processed data to some other type.

The example below demonstrates how to convert the processed data.

###### Example

    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        var northwind = new NorthwindDataContext();
        var orders = northwind.Orders;

        var result = orders.ToDataSourceResult(request, o => new {
            OrderID = o.OrderID,
            CustomerName = o.Customer.ContactName
        });
    }

> **Important**  
>
> To flatten your data, use View Model objects, reduce the number of serialized properties, or avoid circular reference serializaton exceptions.

### How to Avoid Circular Reference Exceptions?

The `JavaScriptSerializer` class throws an exception if the serialized object contains circular references. To avoid this, use a View Model and exclude the
properties which create the circular references.

The example below demonstrates how to avoid circular references.

###### Example

    //Models.
    public class Order
    {
        public int OrderID { get; set; }

        //This property creates a circular reference because of the Customer class.
        //Refers to the Order class through the Orders property.
        public Customer Customer { get; set; }
    }

    public class Customer
    {
        public string ContactName { get; set; }
        public IEnumerable<Order> Orders { get; set; }
    }

    //Action.
    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        var northwind = new NorthwindDataContext();
        var orders = northwind.Orders;

        //Avoid the circular reference by creating a View Model object and skipping the Customer property.
        var result = orders.ToDataSourceResult(request, o => new {
            OrderID = o.OrderID,
            CustomerName = o.Customer.ContactName
        });
    }

### How to Handle Errors in Ajax Binding Mode?

Use the [`error`](/api/javascript/data/datasource#error) event of the DataSource. Apply the `Error` method from the fluent API to specify the name of the JavaScript function which will handle the event.

The example below demonstrates how to handle errors in the Ajax binding mode.

###### Example

     // -- Removed for brevity.
     .DataSource(dataSource => dataSource.Ajax()
        .Events(events => events.Error("onError"))
     // -- Removed for brevity.
     <script>
        function onError(e, status) {
            alert("A server error has occurred!");
        }
     </script>

### How to See What the Server Response Is?

The Kendo UI Grid makes `HTTP` requests. Use the developer tools of your browser to inspect the communication between the browser and the web server. In case of a server-side exception, the `HTTP` status code is `500` and the server response contains the detailed exception stack-trace.

### How to Configure Grids to Perform Paging, Sorting, Filtering, and Grouping in Memory?

By default, paging, sorting, filtering and grouping initiate the making of Ajax requests. The `ToDataSourceResult` extension method processes the data source server-side. To prevent this, call the `ServerOperation` method and pass `false` as the argument.

The example below demonstrates how to perform paging, sorting, filtering, and grouping in memory.

###### Example

     // -- Removed for brevity.
     .DataSource(dataSource => dataSource.Ajax()
        .ServerOperation(false)
     // -- Removed for brevity.


### How to Prevent Ajax Response Caching?

Prevent the caching and browser re-use of Ajax responses in either of the following ways:

**Option 1** Use an `OutputCache` attribute for the action method.

###### Example

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public JsonResult MyReadMethod()
        {
            /* ... */
        }
<!--*-->
**Option 2** Configure the Kendo UI DataSource to make `POST` instead of `GET` Ajax requests for the `Read` action.

**Option 3** Use jQuery's [`ajaxSetup`](https://api.jquery.com/jquery.ajaxsetup/) configuration method. This influences all Ajax requests that the web application performs.

###### Example

        $.ajaxSetup ({
           cache: false
        });

## Editing

### How to Display Model State Errors?

The `ToDataSourceResult` extension method has an overload which accepts the `ModelState` as parameter. That overload serializes any model state errors in the JSON response and the `error` event of the DataSource is raised.

The example below demonstrates how to display model state errors.

###### Example

     // -- Removed for brevity.
     .DataSource(dataSource => dataSource.Ajax()
        .Events(events => events.Error("onError"))
     // -- Removed for brevity.
     <script>
        function onError(e, status) {
            if (e.errors) {
                var message = "The following errors have occurred:\n";

                $.each(e.errors, function(key, value) {
                    if (value.errors) {
                        message += value.errors.join("\n");
                    }
                });

                alert(message);
            }
        }
     </script>

### How to Create Custom Pop-Up Editors?

The Kendo UI Grid for ASP.NET MVC uses the `Html.EditorForModel` to create the editing form. This method relies on ASP.NET MVC editor templates. To create a custom editor template, create a partial view under the `~/Views/Shared/EditorTemplates` folder and specify it through the `UIHint` attribute.

The [Custom Object Templates](http://bradwilson.typepad.com/blog/2009/10/aspnet-mvc-2-templates-part-4-custom-object-templates.html) blog post contains a lot of information about creating a custom editor template.

The [Custom Popup Editor](http://docs.telerik.com/kendo-ui/aspnet-mvc/helpers/grid/how-to/editing/custom-popup-editor) code library project contains a ready-to-run project.

> **Important**  
>
> The `Html.EditorForModel` is used only in popup edit mode. In-cell and in-line edit modes use `Html.EditorFor` and pass the expression used to declare the bound column&mdash;for example, `Html.EditorFor(o => o.OrderDate)`.

### How to Specify Default Property Values When New Items Are Created?

The Kendo UI Grid uses the default `.NET` property values when creating a new object&mdash;`""` for strings, `0` for numeric types, `null` for reference types. To change this behavior, use the `Model` method of the DataSource.

The example below demonstrates how to specify default property values.

###### Example

     // -- Removed for brevity.
     .DataSource(dataSource => dataSource.Ajax()
        .Model(model =>
        {
            model.Field(p => p.Name).DefaultValue("N/A");
            model.Field(p => p.Price).DefaultValue(9.99);
        })
     // -- Removed for brevity.

### How to Create Helper Methods Rendering Predefined Widgets I Can Further Configure?

In many cases Kendo UI wants to avoid setting similar settings to all the places where a widget is used. Instead of defining the same settings all over again, create a helper method that wraps a Kendo UI widget which is already configured.

First, create such an extension method in a static class.

The example below demonstrates how to create a custom helper that wraps the Grid configurator.  

###### Example

**C#**

    public static class Extensions
    {
        public static GridBuilder<T> MyGrid<T>(this HtmlHelper helper)
                where T: class
                    {
                        return helper.Kendo().Grid<T>()
                                        .Scrollable();
                    }
    }

**View code**

    @using TheNamespaceOfTheExtensionsClass

    @(Html.MyGrid.Name("foo")) //the Grid is already configured to be Scrollable

> **Important**  
>
> If you want to avoid adding the `using` statement in each view this Html helper is used, add a namespace reference to the `Web.config` file inside the `Views` folder of your MVC project.

### How to Mark Certain Properties as Read-only?

By default, all properties are read-only. Decorate the read-only properties with the [`ReadOnly`](https://msdn.microsoft.com/en-us/library/system.componentmodel.readonlyattribute.aspx) data annotation attribute or use the `Editable` configuration method.

The example below demonstrates the Read-only property through the `ReadOnly` attribute.

###### Example

    public class Order
    {
        [ReadOnly(true)]
        public int OrderID { get; set; }
    }

The example below demonstrates the Read-only property through the `Editable` method.

###### Example

     // -- Removed for brevity.
     .DataSource(dataSource => dataSource.Ajax()
        .Model(model =>
        {
            model.Field(o => o.OrderID).Editable(false);
        })
     // -- Removed for brevity.

> **Important**  
>
> The `ReadOnly` and `Editable` settings work only in in-line and in-cell editing modes. Use a custom popup editor if you want to exclude certain properties from the editor form.

### How to Use Kendo UI Widgets as Editors for Dates and Numbers?

Use custom editor templates. ASP.NET MVC looks for a partial view, named after the type&mdash;for example, `DateTime.cshtml`. Telerik UI for ASP.NET MVC ships with a few
ready-to-use editor templates. They are located in the `\wrappers\aspnetmvc\EditorTemplates` folder. The editor templates are available in two flavors&mdash;the `ascx` folder contains the `WebForms` view engine version, whereas the `razor` folder contains the `Razor` view engine version. To use these editor templates in your application, copy all files from the corresponding folder (`ascx` or `razor`) to `~/Views/Shared/EditorTemplates` (you may need to create this folder if it does not exist yet).

## See Also

Other articles on the Kendo UI Grid for ASP.NET MVC:

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [Configuration of the Grid HtmlHelper]({% slug configuration_gridhelper_aspnetmvc %})
* [Scaffolding]({% slug scaffoldinggrid_aspnetmvc %})
* [Excel Export]({% slug excelexport_gridhelper_aspnetmvc %})
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
