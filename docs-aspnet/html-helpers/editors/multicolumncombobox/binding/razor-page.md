---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI MultiColumnComboBox component for {{ site.framework }} in a Razor Page using CRUD Operations."
slug: htmlhelpers_multicolumncombobox_razorpage_aspnetcore
position: 3
---

# MultiColumnComboBox in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI MultiColumnComboBox for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the MultiColumnComboBox component in a Razor Pages scenario.

For the complete project, refer to the [MultiColumnComboBox in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/MultiColumnComboBox/MultiColumnComboBoxIndex.cshtml).

In order to set up the MultiColumnComboBox component bindings, you need to configure the `Read` method of its `DataSource` instance. The URL in this method should refer the name of the method in the PageModel. In this method, you can also pass additional parameters, such as filter string and antiforgery token (see `dataFunction`).

```tab-HtmlHelper(csthml)        
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

	<h1>MultiColumnComboBox Index</h1>

	@(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ShipName")
        .DataValueField("ShipCity")
        .Filter(FilterType.Contains)
        .Columns(columns =>
            {
                columns.Add().Field("ShipName").Title("Ship Name").Width("200px");
                columns.Add().Field("ShipCity").Title("Ship City").Width("200px");
                columns.Add().Field("Freight").Title("Freight").Width("200px");
            })
        .DataSource(ds => ds
            .Custom()
            .Transport(transport => transport
                .Read(r => r
                    .Url("/MultiColumnComboBox/MultiColumnComboBoxIndex?handler=Read").Data("dataFunction")
                ))
                .ServerFiltering(true)
            )
        )
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
{% if site.core %}
```tab-TagHelper(cshtml)
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
	@Html.AntiForgeryToken()

	<h1>MultiColumnComboBox Index</h1>

    <kendo-multicolumncombobox name="products" datatextfield="ShipName" datavaluefield="ShipCity" filter="FilterType.Contains">
        <multicolumncombobox-columns>
            <column field="ShipName" title="Ship Name" width="200px">
            </column>
            <column field="ShipCity" title="Ship City" width="200px">
            </column>
            <column field="Freight" title="Freight" width="200px">
            </column>
        </multicolumncombobox-columns>
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                <transport>
                    <read url="@Url.Page("/MultiColumnComboBox/MultiColumnComboBoxIndex?handler=Read")" data="dataFunction" />
                </transport>
        </datasource>
    </kendo-multicolumncombobox>

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
{% endif %}
```tab-PageModel(cshtml.cs)      

    public JsonResult OnGetRead(string filterValue)
    {
        if (filterValue != null)
        {
            var filteredData = orders.Where(p => p.ShipName.Contains(filterValue));
            return new JsonResult(filteredData);
        }
        return new JsonResult(orders);
    }
```

## Binding the MultiColumnComboBox to a PageModel Property

To bind the MultiColumnComboBox to a property from the `PageModel`, follow the next steps:

1. Add a property to the `PageModel` that must bind to the MultiColumnComboBox.

    ```Index.cshtml.cs
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
                // Populate the collection with the ComboBox data.
                return new JsonResult(comboBoxData);
            }
        }
    ```
1. Declare the `PageModel` at the top of the page.

    ```C#
        @page
        @model IndexModel
    ```

1. Bind the MultiColumnComboBox to the property using the `MultiColumnComboBoxFor()` configuration.

    ```HtmlHelper_Index.cshtml
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
                    .Url("/Index?handler=Read").Data("forgeryToken"));
            })
        )
    ```
    ```TagHelper_Index.cshtml
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
                    <read url="/Index?handler=Read" data="forgeryToken"/>
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

