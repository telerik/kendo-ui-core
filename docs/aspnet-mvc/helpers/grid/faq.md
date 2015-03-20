---
title: FAQ
page_title: Frequently asked questions for Kendo UI Grid for ASP.NET MVC
description: Learn how to use Kendo UI Grid for ASP.NET MVC by reading Grid FAQ and learning with examples. How Data binding works with Kendo ASP.NET MVC helpers.
---

# Grid Frequently Asked Questions

## Displaying Values

### How do I display HTML in a grid column?

By default the Kendo UI Grid for ASP.NET MVC will encode the HTML entities present in the data. To prevent that call the [Encoded](/api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilderi#encodedsystem.boolean)
method and pass `false` as the argument.

#### Example: Display HTML Entities In Grid Columns

    columns.Bound(o => o.Description).Encoded(false);

### How do I customize the way a property is displayed in a grid bound column?

If the grid is [server bound](/aspnet-mvc/helpers/grid/server-binding) use the `Template` method.

#### Example: Customize the Column Appearance of a Server Bound Grid (WebForms)

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

#### Example: Customize the Column Appearance of a Server Bound Grid (Razor)

    @(Html.Kendo().Grid<Models.Product>(Model)
          .Name("Grid")
          .Columns(columns =>
          {
              columns.Bound(p => p.Title).Template(@<text>
                   <strong>@item.Title</strong>
              </text>);
          })
    )

> The `Template` method needs a [templated razor delegate](http://haacked.com/archive/2011/02/27/templated-razor-delegates.aspx) when used in Razor views.
The bound item is available using the `@item` parameter.

If the grid is [ajax bound](/aspnet-mvc/helpers/grid/ajax-binding) use the `ClientTemplate` method.
The value should be a string which represents a valid [Kendo Template](/framework/templates/overview).

#### Example: Customize the Column Appearance of a Ajax Bound Grid

    .Columns(columns =>
    {
        columns.Bound(p => p.Title).ClientTemplate("<strong>#: Title #</strong>");
    })

### How do I have conditional logic in a column client template?

A Kendo Template may contain arbitrary JavaScript code. The `#` symbol is used to denote JavaScript blocks.

#### Example: Conditions In ClientTemplate

    columns.Bound(p => p.ProductName).ClientTemplate(
        "# if (HasIcon == true) { #" +
            "<img src='" + Url.Content("~/Content/icons/") + "#= ProductID #.png' alt='#= ProductName # icon' />" +
        "# } else { #" +
            "#: ProductName #" +
        "# } #"
    );

### How do I display a checkbox in an ajax bound grid?

The `checked` attribute specifies whether a checkbox is displayed as checked or not. Use a condition to set that attribute.

#### Example: Display a Checkbox In Bound ColumnClientTemplate

    columns.Bound(p => p.Enabled).ClientTemplate(
        "<input type='checkbox' value='#= ProductID #' " +
            "# if (Enabled) { #" +
                "checked='checked'" +
            "# } #" +
        "/>"
    );

### How do I use action links?

For server-bound grids the `Template` method should be used.

#### Example: Action Link In Grid Column (WebForms)

    columns.Bound(p => p.ProductID).Template(p =>
    {
        %>
            <%: Html.ActionLink("Show Product Details", "ProductDetails", new { id = p.ProductID } ) %>
        <%
    });

#### Example: Action Link In Grid Column (Razor)

    columns.Bound(p => p.ProductID).Template(@<text>
          @Html.ActionLink("Show Product Details", "ProductDetails", new { id = @item.ProductID } )>
    </text>);

For ajax bound grids the `ClientTemplate` method should be used.

#### Example: Action Link In Ajax Bound Grid Column

    columns.Bound(p => p.ProductID).ClientTemplate(
        "<a href='" +
            Url.Action("ProductDetails", "Product") +
            "/#= ProductID #'" +
        ">Show Product Details</a>"
    );

### How do I use a JavaScript function in a column client template?

The Kendo Template has an implicit parameter called `data`. Use that as the argument of the JavaScript function.

#### Example: Use JavaScript Function In ClientTemplate
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

### How do I use a Kendo UI widget inside a Grid client column template?

`script` tags are not automatically evaluated inside a Grid client column template, so any included widgets will not be initialized.
The scripts must be evaluated manually in the [Grid's dataBound event](/api/web/grid#events-dataBound).

#### Example: Add a Kendo UI Menu inside a Grid client column template

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

### How do I change the format of a bound column?

Use the [Format](api/wrappers/aspnet-mvc/Kendo.Mvc.UI.Fluent/GridBoundColumnBuilder#formatsystem.string) method.
The value should be a valid [number](/api/framework/kendo#standard-number-formats) or [date](/api/framework/kendo#standard-date-formats) format.

#### Example: Specify the Format Of a Bound Column

    columns.Bound(o => o.OrderDate).Format("{0:d}"); // Will use the short date pattern

### How do I add Kendo UI icons to custom command buttons?

The custom command buttons have the required `span` element, which is normally used to display an icon, but this element has no CSS classes. You can add them in the `dataBound` handler.

A list of the available Kendo UI icons and their CSS classes is available in the [Styling / Icons demo](http://demos.telerik.com/kendo-ui/styling/icons).

#### Example: Add Kendo UI icons to custom command buttons

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

### How do I implement paging, sorting, filtering and grouping?

If your model supports the `IQueryable` interface or is `DataTable` the grid will do paging, sorting, filtering, grouping and aggregates (`DataTable` binding supports only `count` aggregate) automatically.
For server binding scenarios no additional steps are required - just pass the IQueryable to the `Grid` constructor. Check the
[server binding](/aspnet-mvc/helpers/grid/server-binding) help topic for additional info.

For ajax binding scenarios the `ToDataSourceResult` extension method must be used to perform the data processing.
Check the [ajax binding](/aspnet-mvc/helpers/grid/ajax-binding) help topic for additional information.

If your model does not implement `IQueryable` custom binding should be implemented. This means that the developer is responsible for
paging, sorting, filtering and grouping the data. More info can be found in the [custom binding](/aspnet-mvc/helpers/grid/custom-binding) help topic.

> **Important**: All data operations will be performed at database server level if the underlying IQueryable provider supports translation of expression trees to SQL. Kendo Grid for ASP.NET MVC has been tested with the following frameworks:

> - Entity Framework
> - Linq to SQL
> - Telerik OpenAccess
> - NHibernate

### How do I send values to my action method when binding the grid?

If the grid is server bound the overload method which accepts route values should be used.

#### Example: Send Additional Data In Server Bound Grid
    // -- removed for brevity
    .DataSource(dataSource => dataSource.Server()
        .Read(read => read.Action("Read", "Home", new { userID = (int)ViewData["UserID"] }))
    )
    // -- removed for brevity

If the grid is ajax bound the `Data` method should be used to specify the name of the JavaScript function which will return the additional data.

#### Example: Send Additional Data In Ajax Bound Grid
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

### How do I reload the data in an ajax bound grid?

The [read](/api/framework/datasource#read) method of the DataSource should be used.

#### Example: Reload Ajax Bound Grid

    var grid = $("#Grid").data("kendoGrid");

    grid.dataSource.read();

### How do I convert my models to View Model objects?

The `ToDataSourceResult` extension method supports an optional selector which can be used to convert the processed data to some other type.

#### Example: Convert The Processed Data

    public ActionResult Read([DataSourceRequest] DataSourceRequest request)
    {
        var northwind = new NorthwindDataContext();
        var orders = northwind.Orders;

        var result = orders.ToDataSourceResult(request, o => new {
            OrderID = o.OrderID,
            CustomerName = o.Customer.ContactName
        });
    }

> Use View Model objects in order to flatten your data, reduce the number of serialized properties or avoid circular reference serializaton exceptions.

### How do I avoid circular reference exceptions?

The JavaScriptSerializer class will throw an exception if the serialized object contains circular references. To avoid that use a View Model and exclude the
properties which create the circular references.

#### Example: Avoid Circular References

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

### How do I handle errors in ajax binding mode?

The [error](/api/framework/datasource#error) event of the DataSource should be used.
Use the `Error` method from the fluent API to specify the name of the JavaScript function which will handle the event.

#### Example: Handle Errors In Ajax Binding

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .Events(events => events.Error("onError"))
     // -- removed for brevity
     <script>
        function onError(e, status) {
            alert("A server error has occurred!");
        }
     </script>

### How can I see what the server response is?

The Kendo Grid makes HTTP requests. Use your browser's developer tools to inspect the communication between the browser and the web server. In case of server-side exception the
HTTP status code will be 500 and the server response will contain the detailed exception stacktrace.

### How can I configure the grid to perform paging, sorting, filtering and grouping in memory?

By default ajax requests will be made for paging, sorting, filtering and grouping. The `ToDataSourceResult` extension method processes the data source server-side.
To prevent that call the `ServerOperation` method and pass `false` as the argument.

#### Example: Perform Paging, Sorting, Filtering and Grouping In Memory

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .ServerOperation(false)
     // -- removed for brevity

## Editing

### How do I display model state errors?

The `ToDataSourceResult` extension method has an overload which accepts the `ModelState` as parameter. That overload will serialize any model state errors in the JSON response and
the `error` event of the DataSource will be raised.

#### Example: Display Model State Errors

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

### How do I create a custom popup editor?

The Kendo Grid for ASP.NET MVC uses `Html.EditorForModel` to create the editing form. That method relies on ASP.NET MVC editor templates. To create a custom editor template
you should create a partial view under the **~/Views/Shared/EditorTemplates** folder and specify it via the `UIHint` attribute. The [Custom Object Templates](http://bradwilson.typepad.com/blog/2009/10/aspnet-mvc-2-templates-part-4-custom-object-templates.html)
blog post contains a lot of information about creating a custom editor template. The [Custom Popup Editor](http://www.telerik.com/support/code-library/aspnet-mvc/custom-popup-editor) code library project contains a ready-to-run project.

> **Important**: `Html.EditorForModel` is used only in popup edit mode. In-cell and in-line edit modes use `Html.EditorFor` and pass the expression used to declare the bound column e.g. `Html.EditorFor(o => o.OrderDate)`

### How do I specify default property values when a new item is created?

The Kendo Grid will use the default .NET property values when creating a new object - `""` for strings, `0` for numeric types, `null` for reference types. To change that behavior
use the `Model` method of the DataSource.

#### Example: Specify Default Property Values

     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .Model(model =>
        {
            model.Field(p => p.Name).DefaultValue("N/A");
            model.Field(p => p.Price).DefaultValue(9.99);
        })
     // -- removed for brevity

### How do I create a helper method that renders a predefined widget which I can further configure?

In many cases we want to avoid setting similar settings to all the places widget is used. Instead of defining same settings all over again we can create a helper method that wraps a Kendo widget which is already configured.

We need to first create such extension method in a static class

#### Example: Create custom helper that wraps the Grid configurator

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

> In case you want to avoid adding the `using` statement in every view this Html helper is used, then add namespace reference to the `Web.config` file inside the Views folder of your MVC project.

### How do I mark certain properties as read-only?

By default all properties are readonly. Decorate the read-only properties with the [ReadOnly](http://msdn.microsoft.com/en-us/library/system.componentmodel.readonlyattribute.aspx) data annotation attribute or use the `Editable` configuration method.

#### Example: Read-only Property Via ReadOnly Attribute

    public class Order
    {
        [ReadOnly(true)]
        public int OrderID { get; set; }
    }

#### Example: Read-only Property Via Editable Method
     // -- removed for brevity
     .DataSource(dataSource => dataSource.Ajax()
        .Model(model =>
        {
            model.Field(o => o.OrderID).Editable(false);
        })
     // -- removed for brevity

> **Important:** The `ReadOnly` and `Editable` settings work only in in-line and in-cell editing modes. Use a custom popup editor if you want to exclude certain properties from
the editor form.

### How do I use Kendo widgets as editors for dates and numbers?

Custom editor templates should be used. ASP.NET MVC will look for a partial view named after the type e.g. `DateTime.cshtml`. Telerik UI for ASP.NET MVC ships with a few
ready-to-use editor templates. They are located in the **\wrappers\aspnetmvc\EditorTemplates** folder. The editor templates are available in two flavors - the **ascx** folder
contains the WebForms view engine version whereas the **razor** folder contains the Razor view egine version. To use those editor templates in your application copy all files from
the corresponding folder ("ascx" or "razor") to `~/Views/Shared/EditorTemplates` (you may need to create that folder if it does not exist).
