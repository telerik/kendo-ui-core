---
title: FAQ
page_title: Frequently asked questions for Kendo UI Grid for ASP.NET MVC
description: Learn how to use Kendo UI Grid for ASP.NET MVC by reading Grid FAQ and learning with examples. How Data binding works with Kendo ASP.NET MVC helpers.
---

# Grid Frequently Asked Questions

## Displaying Values

### How Do I Display HTML in a Grid Column?

By default the Kendo UI Grid for ASP.NET MVC will encode the HTML entities present in the data. To prevent that call the [Encoded](/api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilderi#encodedsystem.boolean)
method and pass `false` as the argument.

######## Example - display HTML entities in Grid columns

    columns.Bound(o => o.Description).Encoded(false);

### How Do I Customize the Way a Property Is Displayed in a Grid Bound Column?

If the grid is [server bound](/aspnet-mvc/helpers/grid/server-binding) use the `Template` method.

######## Example - customize the column appearance of a server bound Grid (WebForms)

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

######## Example - customize the column appearance of a server bound Grid (Razor)

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
> The `Template` method needs a [templated razor delegate](http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx) when used in Razor views.
The bound item is available using the `@item` parameter.

If the grid is [ajax bound](/aspnet-mvc/helpers/grid/ajax-binding) use the `ClientTemplate` method.
The value should be a string which represents a valid [Kendo Template](/framework/templates/overview).

######## Example - customize the column appearance of an Ajax bound Grid

    .Columns(columns =>
    {
        columns.Bound(p => p.Title).ClientTemplate("<strong>#: Title #</strong>");
    })

### How Do I Have Conditional Logic in a Column Client Template?

A Kendo Template may contain arbitrary JavaScript code. The `#` symbol is used to denote JavaScript blocks.

######## Example - conditions in clienttemplate

    columns.Bound(p => p.ProductName).ClientTemplate(
        "# if (HasIcon == true) { #" +
            "<img src='" + Url.Content("~/Content/icons/") + "#= ProductID #.png' alt='#= ProductName # icon' />" +
        "# } else { #" +
            "#: ProductName #" +
        "# } #"
    );

### How Do I Display a Checkbox in an Ajax Bound Grid?

The `checked` attribute specifies whether a checkbox is displayed as checked or not. Use a condition to set that attribute.

######## Example - display a Checkbox in bound ColumnClientTemplate

    columns.Bound(p => p.Enabled).ClientTemplate(
        "<input type='checkbox' value='#= ProductID #' " +
            "# if (Enabled) { #" +
                "checked='checked'" +
            "# } #" +
        "/>"
    );

### How Do I Use Action Links?

For server-bound grids the `Template` method should be used.

###### Example - action link in Grid column (WebForms)

    columns.Bound(p => p.ProductID).Template(p =>
    {
        %>
            <%: Html.ActionLink("Show Product Details", "ProductDetails", new { id = p.ProductID } ) %>
        <%
    });

###### Example - action link in Grid column (Razor)

    columns.Bound(p => p.ProductID).Template(@<text>
          @Html.ActionLink("Show Product Details", "ProductDetails", new { id = @item.ProductID } )>
    </text>);

For ajax bound grids the `ClientTemplate` method should be used.

###### Example - action link in Ajax bound Grid column

    columns.Bound(p => p.ProductID).ClientTemplate(
        "<a href='" +
            Url.Action("ProductDetails", "Product") +
            "/#= ProductID #'" +
        ">Show Product Details</a>"
    );

### How Do I Use a JavaScript Function in a Column Client Template?

The Kendo Template has an implicit parameter called `data`. Use that as the argument of the JavaScript function.

###### Example - use JavaScript function in ClientTemplate

     // -- removed for brevity
     columns.Bound(p => p.ProductID).ClientTemplate("#= productDetails(data) #");
     // -- removed for brevity

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

### How Do I Use a Kendo UI Widget Inside a Grid Client Column Template?

`script` tags are not automatically evaluated inside a Grid client column template, so any included widgets will not be initialized.
The scripts must be evaluated manually in the [Grid's dataBound event](/api/javascript/ui/grid#events-dataBound).

###### Example - add a Kendo UI menu inside a Grid client column template

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

The Menu requires the Grid cells to allow overflowing, which is disabled by default:

    .k-widget .templateCell
    {
        overflow: visible;
    }

### How Do I Change the Format of a Bound Column?

Use the [Format](api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilder#formatsystem.string) method.
The value should be a valid [number](/api/framework/kendo#standard-number-formats) or [date](/api/framework/kendo#standard-date-formats) format.

###### Example - specify the format of a bound column

    columns.Bound(o => o.OrderDate).Format("{0:d}"); // Will use the short date pattern

### How Do I Add Kendo UI Icons to Custom Command Buttons?

The custom command buttons have the required `span` element, which is normally used to display an icon, but this element has no CSS classes. You can add them in the `dataBound` handler.

A list of the available Kendo UI icons and their CSS classes is available in the [Styling / Icons demo](http://demos.telerik.com/kendo-ui/styling/icons).

###### Example - add Kendo UI icons to custom command buttons

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

### How Do I Implement Paging, Sorting, Filtering and Grouping?

If your model supports the `IQueryable` interface or is `DataTable` the grid will do paging, sorting, filtering, grouping and aggregates (`DataTable` binding supports only `count` aggregate) automatically.
For server binding scenarios no additional steps are required - just pass the IQueryable to the `Grid` constructor. Check the
[server binding](/aspnet-mvc/helpers/grid/server-binding) help topic for additional info.

For ajax binding scenarios the `ToDataSourceResult` extension method must be used to perform the data processing.
Check the [ajax binding](/aspnet-mvc/helpers/grid/ajax-binding) help topic for additional information.

If your model does not implement `IQueryable` custom binding should be implemented. This means that the developer is responsible for
paging, sorting, filtering and grouping the data. More info can be found in the [custom binding](/aspnet-mvc/helpers/grid/custom-binding) help topic.

> **Important**  
> All data operations will be performed at database server level if the underlying IQueryable provider supports translation of expression trees to SQL. Kendo Grid for ASP.NET MVC has been tested with the following frameworks:

> - Entity Framework
> - Linq to SQL
> - Telerik OpenAccess
> - NHibernate

### How Do I Send Values to My Action Method When Binding the Grid?

If the grid is server bound the overload method which accepts route values should be used.

###### Example - send additional data in server bound Grid
    // -- removed for brevity
    .DataSource(dataSource => dataSource.Server()
        .Read(read => read.Action("Read", "Home", new { userID = (int)ViewData["UserID"] }))
    )
    // -- removed for brevity

If the grid is ajax bound the `Data` method should be used to specify the name of the JavaScript function which will return the additional data.

###### Example - send additional data in an Ajax bound Grid
    // -- removed for brevity
    .DataSource(dataSource => dataSource.Ajax()
        .Read(read => read
            .Action("Read", "Home")
            .Data("additionalData")
        )
    )
    // -- removed for brevity
    <script>
        function additionalData() {
            return {
                userID: 42,
                search: $("#search").val()
            };
        }
    </script>

### How Do I Reload the Data in an Ajax Bound Grid?

The [read](/api/framework/datasource#read) method of the DataSource should be used.

###### Example - reload an Ajax bound Grid

    var grid = $("#Grid").data("kendoGrid");

    grid.dataSource.read();

### How Do I convert my models to View Model objects?

The `ToDataSourceResult` extension method supports an optional selector which can be used to convert the processed data to some other type.

###### Example - convert the processed data

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
> Use View Model objects in order to flatten your data, reduce the number of serialized properties or avoid circular reference serializaton exceptions.

### How Do I Avoid Circular Reference Exceptions?

The JavaScriptSerializer class will throw an exception if the serialized object contains circular references. To avoid that use a View Model and exclude the
properties which create the circular references.

###### Example - avoid circular references

    // Models
    public class Order
    {
        public int OrderID { get; set; }

        // This property creates a circular reference because the Customer class
        // refers to the Order class via the Orders property
        public Customer Customer { get; set; }
    }

    public class Customer
    {
        public string ContactName { get; set; }
        public IEnumerable<Order> Orders { get; set; }
    }

    // Action
    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        var northwind = new NorthwindDataContext();
        var orders = northwind.Orders;

        // Avoid the circular reference by creating a View Model object and skiping the Customer property
        var result = orders.ToDataSourceResult(request, o => new {
            OrderID = o.OrderID,
            CustomerName = o.Customer.ContactName
        });
    }

### How Do I Handle Errors in Ajax Binding Mode?

The [error](/api/framework/datasource#error) event of the DataSource should be used.
Use the `Error` method from the fluent API to specify the name of the JavaScript function which will handle the event.

###### Example - handle errors in Ajax binding

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .Events(events => events.Error("onError"))
     // -- removed for brevity
     <script>
        function onError(e, status) {
            alert("A server error has occurred!");
        }
     </script>

### How Can I See What the Server Response Is?

The Kendo Grid makes HTTP requests. Use your browser's developer tools to inspect the communication between the browser and the web server. In case of server-side exception the
HTTP status code will be 500 and the server response will contain the detailed exception stacktrace.

### How Can I Configure the Grid to Perform Paging, Sorting, Filtering and Grouping in Memory?

By default ajax requests will be made for paging, sorting, filtering and grouping. The `ToDataSourceResult` extension method processes the data source server-side.
To prevent that call the `ServerOperation` method and pass `false` as the argument.

###### Example - perform paging, sorting, filtering and grouping in memory

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .ServerOperation(false)
     // -- removed for brevity


### How to Prevent Ajax Response Caching?

There are several ways to prevent Ajax responses from being cached and reused by the browser.

* Use an `OutputCache` attribute for the action method.

        [OutputCache(NoStore = true, Duration = 0, VaryByParam = "*")]
        public JsonResult MyReadMethod()
        {
            /* ... */
        }
    
* Configure the Kendo UI DataSource to make POST Ajax requests for the Read action, instead of GET requests.

* Use jQuery's [`ajaxSetup`](https://api.jquery.com/jquery.ajaxsetup/) configuration method. This will influence all Ajax requests that the web application performs.

        $.ajaxSetup ({
           cache: false
        });

## Editing

### How Do I Display Model State Errors?

The `ToDataSourceResult` extension method has an overload which accepts the `ModelState` as parameter. That overload will serialize any model state errors in the JSON response and
the `error` event of the DataSource will be raised.

###### Example - display model state errors

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .Events(events => events.Error("onError"))
     // -- removed for brevity
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

### How Do I Create a Custom Pop-up Editor?

The Kendo Grid for ASP.NET MVC uses `Html.EditorForModel` to create the editing form. That method relies on ASP.NET MVC editor templates. To create a custom editor template
you should create a partial view under the **~/Views/Shared/EditorTemplates** folder and specify it via the `UIHint` attribute. The [Custom Object Templates](http://bradwilson.typepad.com/blog/2009/10/aspnet-mvc-2-templates-part-4-custom-object-templates.html)
blog post contains a lot of information about creating a custom editor template. The [Custom Popup Editor](http://docs.telerik.com/kendo-ui/aspnet-mvc/helpers/grid/how-to/editing/custom-popup-editor) code library project contains a ready-to-run project.

> **Important**  
> `Html.EditorForModel` is used only in popup edit mode. In-cell and in-line edit modes use `Html.EditorFor` and pass the expression used to declare the bound column e.g. `Html.EditorFor(o => o.OrderDate)`

### How Do I Specify Default Property Values When a New Item Is Created?

The Kendo Grid will use the default .NET property values when creating a new object - `""` for strings, `0` for numeric types, `null` for reference types. To change that behavior
use the `Model` method of the DataSource.

###### Example - specify default property values

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .Model(model =>
        {
            model.Field(p => p.Name).DefaultValue("N/A");
            model.Field(p => p.Price).DefaultValue(9.99);
        })
     // -- removed for brevity

### How Do I Create a Helper Method Rendering a Predefined Widget I Can Further Configure?

In many cases we want to avoid setting similar settings to all the places widget is used. Instead of defining same settings all over again we can create a helper method that wraps a Kendo widget which is already configured.

We need to first create such extension method in a static class

###### Example - create custom helper that wraps the Grid configurator

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
> In case you want to avoid adding the `using` statement in every view this Html helper is used, then add namespace reference to the `Web.config` file inside the Views folder of your MVC project.

### How Do I Mark Certain Properties as Read-only?

By default all properties are readonly. Decorate the read-only properties with the [ReadOnly](http://msdn.microsoft.com/en-us/library/system.componentmodel.readonlyattribute.aspx) data annotation attribute or use the `Editable` configuration method.

###### Example - Read-only property via the ReadOnly attribute

    public class Order
    {
        [ReadOnly(true)]
        public int OrderID { get; set; }
    }

###### Example - Read-only property via the Editable method

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .Model(model =>
        {
            model.Field(o => o.OrderID).Editable(false);
        })
     // -- removed for brevity

> **Important**  
> The `ReadOnly` and `Editable` settings work only in in-line and in-cell editing modes. Use a custom popup editor if you want to exclude certain properties from
the editor form.

### How Do I Use Kendo UI Widgets as Editors for Dates and Numbers?

Custom editor templates should be used. ASP.NET MVC will look for a partial view named after the type e.g. `DateTime.cshtml`. Telerik UI for ASP.NET MVC ships with a few
ready-to-use editor templates. They are located in the **\wrappers\aspnetmvc\EditorTemplates** folder. The editor templates are available in two flavors - the **ascx** folder
contains the WebForms view engine version whereas the **razor** folder contains the Razor view egine version. To use those editor templates in your application copy all files from
the corresponding folder ("ascx" or "razor") to `~/Views/Shared/EditorTemplates` (you may need to create that folder if it does not exist).
