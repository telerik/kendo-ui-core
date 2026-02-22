---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI PivotGrid component for {{ site.framework }} in a Razor Pages application."
components: ["pivotgrid"]
slug: htmlhelpers_pivotgrid_razorpage_aspnetcore
position: 8
---

# PivotGrid in Razor Pages 

This article describes how to seamlessly integrate and configure the Telerik UI PivotGrid for {{ site.framework }} in Razor Pages applications.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

The following example demonstrates how to configure the PivotGrid in a Razor Pages scenario and bind it to a remote data collection.

1. Define the PivotGrid and specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```HtmlHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        <div class="k-pivotgrid-wrapper">
           @(Html.Kendo().PivotConfigurator()
               .Name("configurator")
               .Filterable(true)
               .Height(500)
            )
        
            @(Html.Kendo().PivotGrid<CustomerViewModel>()
                .Name("pivotgrid")
                .Configurator("#configurator")
                .ColumnWidth(120)
                .Filterable(true)
                .Height(500)
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .Transport(transport => transport.Read(r => r.Url(Url.Page("Index", "Read")).Data("forgeryToken")))
                    .Schema(schema => schema
                        .Cube(cube => cube
                            .Dimensions(dimensions => {
                                dimensions.Add(model => model.ContactName).Caption("All Contacts");
                                dimensions.Add(model => model.CompanyName).Caption("All Companies");
                                dimensions.Add(model => model.Country).Caption("All Countries");
                                dimensions.Add(model => model.ContactTitle).Caption("All Titles");
                            })
                            .Measures(measures => measures.Add("Contacts Count").Field(model => model.CustomerID).AggregateName("count"))
                        )
                    )
                    .Columns(columns =>
                    {
                        columns.Add("Country").Expand(true);
                        columns.Add("CompanyName");
                    })
                    .Rows(rows => rows.Add("ContactTitle").Expand(true))
                    .Measures(measures => measures.Values("Contacts Count"))
                )
            )
        </div>
    ```
    ```TagHelper
        @page
        @model IndexModel
        @using Kendo.Mvc.UI

        <div class="k-pivotgrid-wrapper">
            <kendo-pivotdatasource type=@(PivotDataSourceType.Ajax) name="pivotSource">
                <columns>
                    <pivot-datasource-column name="Country" expand="true"></pivot-datasource-column>
                    <pivot-datasource-column name="CompanyName"></pivot-datasource-column>
                </columns>
                <rows>
                    <row name="ContactTitle" expand="true"></row>
                </rows>
                <!-- Add configuration for "data", "total", and "errors" if the DataSource type is "aspnetmvc-ajax" -->
                <schema type="json" data="Data" Total="Total" Errors="Errors"> 
                    <cube>
                        <dimensions>
                            <dimension name="ContactName" caption="All Contact" />
                            <dimension name="CompanyName" caption="All Companies" />
                            <dimension name="Country" caption="All Countries" />
                            <dimension name="ContactTitle" caption="All Titles" />
                        </dimensions>
                        <measures>
                            <measure name="Contacts Count" field="CustomerID" aggregate="count" />
                        </measures>
                    </cube>
                </schema>
                <measures values='new string[] {"Contacts Count"}'></measures>
                <transport>
                    <!-- Set the "content-type", so the request is sent in the expected format. -->
                    <read url="@Url.Page("Index","Read")" datatype="json" data="forgeryToken" content-type="application/json" type="POST" />
                </transport>
            </kendo-pivotdatasource>

            <kendo-pivotconfigurator name="configurator" datasource-id="pivotSource" filterable="true" height="570">
            </kendo-pivotconfigurator>

            <kendo-pivotgrid name="pivotgrid" column-width="120" datasource-id="pivotSource" filterable="true" height="570">
            </kendo-pivotgrid>
        </div>
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
    
1. Within the `cshtml.cs` file, add a handler method for the Read data operation.

    ```C# Index.cshtml.cs
    public class IndexModel : PageModel
    {
        public static IList<CustomerViewModel> customers;

        public void OnGet(string culture)
        {
            if (!String.IsNullOrEmpty(culture))
            {
                CultureInfo.DefaultThreadCurrentCulture = CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo(culture);
            }

            if (customers == null)
            {
                customers = new List<CustomerViewModel>();

                Enumerable.Range(1, 50).ToList().ForEach(i => customers.Add(new CustomerViewModel
                {
                    CustomerID = "CustomerID " + i,
                    CompanyName = "CompanyName " + (i % 3),
                    ContactName = "ContactName " + i,
                    ContactTitle = "ContactTitle " + (i % 7),
                    Country = "Country " + (i % 3)
                }));

            }
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(customers.ToDataSourceResult(request));
        }
    }
    ```
    ```Model
       public class CustomerViewModel
       {
           public string CustomerID { get; set; }
           public string CompanyName { get; set; }
           public string ContactName { get; set; }
           public string ContactTitle { get; set; }
           public string Country { get; set; }
       }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the PivotGrid](https://docs.telerik.com/kendo-ui/api/javascript/ui/pivotgrid)
* [Server-Side HtmlHelper API of the PivotGrid](/api/pivotgrid)
* [Server-Side TagHelper API of the PivotGrid](/api/taghelpers/pivotgrid)
* [Knowledge Base Section](/knowledge-base)