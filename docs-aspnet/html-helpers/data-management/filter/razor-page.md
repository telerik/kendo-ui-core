page_title: The Telerik UI Filter in RazorPages
description: "Telerik UI Filter for {{ site.framework }} in a RazorPages application."
slug: razorpages_filterhelper_aspnetcore
position: 2
---

# Telerik UI Filter in Razor Pages

Razor Pages are an alternative to the MVC pattern. Razor Pages make page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cs` file (generally, the two files have the same name). You can seamlessly integrate the Telerik UI Filter for {{ site.framework }} in Razor Pages applications.

For a runnable example, refer to the [Filter in RazorPages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Filter/FilterBinding.cshtml).

## Getting Started

To configure the Telerik UI Filter widget within a `RazorPage`:

1. Configure the Read URL in the `DataSource`. The URL in these methods must refer to the method name in the `PageModel`:


    ```
    @(Html.Kendo().DataSource<CustomerViewModel>()
        .Name("dataSource1")
         .Ajax(t =>
                 {
             t.Read(r=>r.Url("/Filter/FilterBinding?handler=Customers").Data("forgeryToken"));
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

1. Add an AntiForgeryToken at the top of the RazorPage:


    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the AntiForgeryToken with each POST request of the page. Additional parameters can also be supplied:


    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

1. Within the `.cs` file, introduce ActionMethod for the Read operation

    ```
        public JsonResult OnPostCustomers([DataSourceRequest]DataSourceRequest request)
        {
            return new JsonResult(Customers.ToDataSourceResult(request)); // Where Customers is a colection of objects 
        }
    ```

## See Also

* [Server-Side API](/api/filter)
