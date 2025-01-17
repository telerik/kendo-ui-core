---
title: Razor Pages
page_title: Razor Pages
description: "Learn how to use the Telerik UI PivotGrid component for {{ site.framework }} in a Razor Pages application."
slug: htmlhelpers_pivotgrid_razorpage_aspnetcore
position: 8
---

# PivotGrid in Razor Pages 

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI PivotGrid for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the PivotGrid component in a Razor Pages scenario.

## Getting Started

The PivotGrid component provides a convenient integration with the Grid and DataSource. This example will demonstrate how to configure them in a Razor Pages scenario so that the PivotGrid appear at the top of the Grid.

1. Create the Grid, DataSource and PivotGrid definitions.

    ```HtmlHelper_Index.cshtml
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
               .Transport(transport => transport.Read(r => r.Url("/Index?handler=Read").Data("forgeryToken")))
                   .Schema(schema => schema
                       .Cube(cube => cube
                           .Dimensions(dimensions => {
                               dimensions.Add(model => model.ContactName).Caption("All Contacts");
                               dimensions.Add(model => model.CompanyName).Caption("All Companies");
                               dimensions.Add(model => model.Country).Caption("All Countries");
                               dimensions.Add(model => model.ContactTitle).Caption("All Titles");
                           })
                           .Measures(measures => measures.Add("Contacts Count").Field(model => model.CustomerID).AggregateName("count"))
                       ))
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
    ```TagHelper_Index.cshtml
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
                <schema type="json">
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
                    <read url="/Index?handler=Read" data="forgeryToken" datatype="json" content-type="application/json" type="POST" />
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

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```
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

    ```tab-Index.cshtml.cs
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
    ```
    ```tab-Model
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