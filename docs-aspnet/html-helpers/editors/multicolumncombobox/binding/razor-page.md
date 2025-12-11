---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI MultiColumnComboBox component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_multicolumncombobox_razorpage_aspnetcore
components: ["multicolumncombobox"]
position: 7
---

# MultiColumnComboBox in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI MultiColumnComboBox for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_multicolumncombobox_databinding_aspnetcore %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

The [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component offers the most versatile data binding approach. To connect the MultiColumnComboBox to a dataset retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```Razor HtmlHelper_Index.cshtml
    @page
    @model IndexModel

    @(Html.Kendo().MultiColumnComboBox()
        .Name("orders")
        .DataTextField("ShipName")
        .DataValueField("OrderID")
        .Columns(columns =>
        {
            columns.Add().Field("ShipName").Title("Ship Name").Width("200px");
            columns.Add().Field("ShipCity").Title("Ship City").Width("200px");
            columns.Add().Field("Freight").Title("Freight").Width("200px");
        })
        .DataSource(source =>
        {
            source.Read(read => read
                .Url(Url.Page("Index", "Read")).Data("forgeryToken"));
        })
    )
    ```
    ```Razor TagHelper_Index.cshtml
    @page
    @model IndexModel
    
    <kendo-multicolumncombobox name="orders"
        datatextfield="ShipName"
        datavaluefield="OrderID">
        <multicolumncombobox-columns>
            <column field="ShipName" title="Ship Name" width="200px">
            </column>
            <column field="ShipCity" title="Ship City" width="200px">
            </column>
            <column field="Freight" title="Freight" width="200px">
            </column>
        </multicolumncombobox-columns>
        <datasource>
            <transport>
                <read url="@Url.Page("Index", "Read")" data="forgeryToken"/>
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the Read request.

    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied. For example, when the [server filtering]({% slug filtering_multicolumncombobox_aspnetcore%}#server-filtering) of the MultiColumnComboBox is enabled, send the filter value along with the antiforgery token to the server using the JavaScript handler specified in the `Data()` option.

    ```HtmlHelper
    @page
    @model IndexModel

    @(Html.Kendo().MultiColumnComboBox()
        .Name("orders")
        .DataTextField("ShipName")
        .DataValueField("OrderID")
        .Filter(FilterType.Contains)
        .AutoBind(false)
        .MinLength(3)
        .Columns(columns =>
        {
            columns.Add().Field("ShipName").Title("Ship Name").Width("200px");
            columns.Add().Field("ShipCity").Title("Ship City").Width("200px");
            columns.Add().Field("Freight").Title("Freight").Width("200px");
        })
        .DataSource(source =>
        {
            source.Read(read => read
                .Url(Url.Page("Index", "Read")).Data("dataFunction"))
                .ServerFiltering(true);
        })
    )
    ```
    ```TagHelper
    @page
    @model IndexModel
    @addTagHelper *, Kendo.Mvc

    <kendo-multicolumncombobox name="orders"
        auto-bind="false"
        min-length="3"
        filter="FilterType.Contains"
        datatextfield="ShipName"
        datavaluefield="OrderID">
        <multicolumncombobox-columns>
            <column field="ShipName" title="Ship Name" width="200px">
            </column>
            <column field="ShipCity" title="Ship City" width="200px">
            </column>
            <column field="Freight" title="Freight" width="200px">
            </column>
        </multicolumncombobox-columns>
        <datasource server-filtering="true">
            <transport>
                <read url="@Url.Page("Index", "Read")" data="dataFunction"/>
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
    ```
    ```JS
        <script>
            function dataFunction(e) {
                var filterValue = '';
                if (e.filter.filters[0]) {
                    filterValue = e.filter.filters[0].value;
                }

                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    filterValue: filterValue
                };
            }
        </script>
    ```

1. Within the `cshtml.cs` file, add a handler method for the Read operation that returns the dataset.

    ```C# PageModel
        public class IndexModel : PageModel
        {
            public JsonResult OnGetRead()
            {
                var comboBoxData = new List<OrderViewModel>();
                // Populate the collection with the MultiColumnComboBox data.
                return new JsonResult(dropdownListData);
            }
        }
    ```
    ```C# Model
    public class OrderViewModel
    {
        public int OrderID { get; set; }

        public string ShipName { get; set; }

        public string ShipCity { get; set; }

        public decimal? Freight { get; set; }
    }
    ```

    When the server filtering is enabled, intercept the filter value sent through the `dataFunction` handler in the Read method and filter the data on the server before returning it to the MultiColumnComboBox.

    ```C# PageModel
    public class IndexModel : PageModel
    {
        public JsonResult OnGetRead(string filterValue)
        {
            var comboBoxData = new List<OrderViewModel>();
            // Populate the collection with the MultiColumnComboBox data.

            if (filterValue != null)
            {
                var filteredData = comboBoxData.Where(p => p.ShipName.Contains(filterValue));
                return new JsonResult(filteredData);
            }
            return new JsonResult(comboBoxData);
        }
    }
    ```

For the complete project, refer to the [MultiColumnComboBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MultiColumnComboBox/MultiColumnComboBoxIndex.cshtml).

## Binding to a PageModel Property

To bind the MultiColumnComboBox to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the MultiColumnComboBox.

    ```C# Index.cshtml.cs
        public class IndexModel : PageModel
        {
            [BindProperty]
            public int OrderID { get; set; }

            public void OnGet()
            {
                OrderID = 2; // Assign a value to the "OrderID" property, if needed.
            }

            public JsonResult OnGetRead()
            {
                var comboBoxData = new List<OrderViewModel>();
                // Populate the collection with the MultiColumnComboBox data.
                return new JsonResult(comboBoxData);
            }
        }
    ```

1. Declare the `PageModel` at the top of the page.

    ```Razor
        @page
        @model IndexModel
    ```

1. Bind the MultiColumnComboBox to the property using the `MultiColumnComboBoxFor()` configuration.

    ```HtmlHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        
        @(Html.Kendo().MultiColumnComboBoxFor(m => m.OrderID)  
            .DataTextField("ShipName")
            .DataValueField("OrderID")
            .DataSource(source =>
            {
                source.Read(read => read
                    .Url(Url.Page("Index", "Read")).Data("forgeryToken"));
            })
        )
    ```
    ```TagHelper
        @page
        @model IndexModel

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
        @addTagHelper *, Kendo.Mvc

        <kendo-multicolumncombobox for="OrderID"
            datatextfield="ShipName" 
            datavaluefield="OrderID">
            <datasource>
                <transport>
                    <read url="@Url.Page("Index", "Read")" data="forgeryToken"/>
                </transport>
            </datasource>
        </kendo-multicolumncombobox>
    ```
    ```JS
        <script>
            function forgeryToken(e) {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the MultiColumnComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox)
* [Server-Side HtmlHelper API of the MultiColumnComboBox](/api/multicolumncombobox)
* [Server-Side TagHelper API of the MultiColumnComboBox](/api/taghelpers/multicolumncombobox)
* [Knowledge Base Section](/knowledge-base)

