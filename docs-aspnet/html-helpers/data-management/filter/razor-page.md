---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI Filter for {{ site.framework }} in a Razor Pages application."
slug: razorpages_filterhelper_aspnetcore
components: ["filter"]
position: 7
---

# Filter in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Filter for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To bind the Filter DataSource to a data set received from a remote endpoint within a Razor Pages application, follow the next steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @IndexModel

        @(Html.Kendo().DataSource<CustomerViewModel>()
            .Name("dataSource1")
            .Ajax(t =>
            {
                t.Read(r=>r.Url("/Index?handler=Customers").Data("forgeryToken"));
                t.Model(model => model.Id(p => p.CustomerID));
                t.PageSize(20);
            })
        )

        @(Html.Kendo().Filter<CustomerViewModel>()
            .Name("filter")
            .ApplyButton(true)
            .ExpressionPreview(true)
            .Fields(f =>
            {
                f.Add(p=>p.CustomerID);
                f.Add(p=>p.Position);
                f.Add(p=>p.CompanyName);
                f.Add(p=>p.Country);
            })
            .FilterExpression(f => {
                f.Add(p => p.Position).IsEqualTo("Sales Representative");
            })
            .DataSource("dataSource1")
        )
    ```
    ```TagHelper
        @page
        @IndexModel

        @{
            var InitialExpression = new CompositeFilterDescriptor();
            InitialExpression.FilterDescriptors.Add(new FilterDescriptor { Member = "Position", Value = "Sales Representative", Operator = FilterOperator.IsEqualTo });
        }

        <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.Ajax" page-size="20">
            <transport>
                <read type="post" url="/Index?handler=Customers" data="forgeryToken" />
            </transport>
            <schema>
                <model id="CustomerID"></model>
            </schema>
        </kendo-datasource>

	    <kendo-filter name="filter" apply-button="true" expression-preview="true" 
            expression="InitialExpression"
            datasource-id="dataSource1">
            <fields>
                <filter-field name="CustomerID"></filter-field>
                <filter-field name="Position"></filter-field>
                <filter-field name="CompanyName"></filter-field>
                <filter-field name="Country"></filter-field>
            </fields>
        </kendo-filter>
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

    Additional parameters can also be supplied.

    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```

1. Within the `cshtml.cs` file, add a handler method for the Read operation that returns the dataset.

    ```C# Index.cshtml.cs
        public static IList<CustomerViewModel> Customers;
        public static IList<string> Countries = new List<string>() {"UK", "Germany", "Italy", "Venezuela", "China", "Bulgaria", "USA" };
        public static IList<string> Positions = new List<string>() { "Sales Agent", "Sales Representative",  "Owner",  "Order Administrator", "Marketing Manager", "Accounting Manager" };

        public void OnGet()
        {
            if (Customers == null)
            {
                // Populate the "Customers" collection with data.
                Customers = new List<CustomerViewModel>();
                var rand = new Random();
                for (int i = 1; i < 40; i++)
                {
                    Customers.Add(new CustomerViewModel() { 
                        CustomerID=i,
                        CompanyName="Company " + i,
                        Position = Positions[rand.Next(0,5)],
                        Country = Countries[rand.Next(0, 6)],
                    });
                }
            }
        }

        public JsonResult OnPostCustomers([DataSourceRequest]DataSourceRequest request)
        {
            return new JsonResult(Customers.ToDataSourceResult(request));
        }
    ```
    ```Model
        public class CustomerViewModel
        {
            public int CustomerID { get; set; }
            public string ContactName { get; set; }
            public string Position { get; set; }
            public string CompanyName { get; set; }
            public string Country { get; set; }
        }
    ```

For the complete project, refer to the [Filter in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Filter/FilterBinding.cshtml).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Filter](https://docs.telerik.com/kendo-ui/api/javascript/ui/filter)
* [Server-Side HtmlHelper API of the Filter](/api/filter)
* [Server-Side TagHelper API of the Filter](/api/taghelpers/filter)
* [Knowledge Base Section](/knowledge-base)
