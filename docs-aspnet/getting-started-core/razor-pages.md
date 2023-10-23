---
title: Using Razor Pages
page_title: Using Razor Pages
description: "Get started with Razor Pages and Progress Telerik UI for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /getting-started/razor-pages-integration, /getting-started/installation/razor-pages-integration, /compatibility/razor-pages-integration, /getting-started/helper-basics/razor-pages
slug: razor_pages_integration_aspnetmvc6_aspnetmvc
permalink: /getting-started/razor-pages
position: 5
---

# Using {{ site.product }} in Razor Pages

The ASP.NET Razor Pages framework was introduced in ASP.NET Core 2.0 as an alternative to the ASP.NET Core Model-View-Controller (MVC) framework. Some of the key features of Razor Pages are:


* Razor Pages is page-centric. A Razor page consists of a page (`.cshtml`) and a PageModel class (`.cshtml.cs`) with the same name. 
* The `@page` directive placed at the top of the page makes it a Razor Page. The page contains both HTML and server-side logic, which you include by using Razor syntax. 

* The `@model` directive specifies the type of the data that the page is expected to work with. The page uses the PageModel class itself as a view model. The required data is exposed as properties.
* The page handles requests directly, without using a controller. A naming convention is used to find the appropriate handler method to execute in the PageModel class. Handler methods are prefixed with the word `On` followed by the HTTP verb used for the request that they process: `OnGet`, `OnPost`, `OnGetAsync` and `OnPostAsync`. Following this convention, additional handlers can be included, for example `OnGetHelloWorld`.
* Razor Pages automatically implement antiforgery validation, which protects against cross-site request forgery (XSRF/CSRF) attacks.

You can find more information on Razor Pages in the [Microsoft Docs](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/)

## Using Telerik UI for ASP.NET Core in a Razor Pages Project

There are two alternative approaches for adding Telerik UI for ASP.NET Core to a new Razor Pages project:

* Use the [Telerik Extensions for Visual Studio]({% slug newprojectwizards_visualstudio_aspnetcore %}) to create a new project. The [**GRID RAZOR PAGES**]({% slug newprojectwizards_visualstudio_aspnetcore %}#available-templates) template scaffolds a Razor Pages sample, which contains a Grid with enabled CRUD operations. The benefit of this approach is that the template will add the necessary configuration and dependencies automatically. You can focus on adding and configuring the UI components you need. 
* Use the default Visual Studio <a href="https://docs.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-6.0&tabs=visual-studio" target="_blank">**ASP.NET Core Web App**</a> template, which is based on the ASP.NET Razor Pages framework. Do not use the **Web Application (Model-View-Controller)** template.

    Using the default Visual Studio Razor Pages template requires you to configure the project for the Telerik UI components as demonstrated in the [First Steps]({% slug gettingstarted_aspnetmvc6_aspnetmvc %}) article&mdash;you must configure the NuGet package source, install the Telerik components, add the required `Kendo.Mvc.UI` references, and provide the client-side resources.

## Adding Components to a Razor Page

All Telerik UI for ASP.NET Core components are compatible with the ASP.NET Razor Pages framework. The following example demonstrates how to add a Grid to a Razor page and configure its CRUD operations.

   
1. Add the `@model` directive and an AntiForgeryToken on top of the Razor page:

    ``` 
        @page
        @model IndexModel

        @using Kendo.Mvc.UI

        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Declare the Grid and setup the CRUD URLs in its `DataSource` configuration. Set the DataSource `Model.Id` configuration. The URL in these methods must refer to the name of the handler method in the `PageModel`:


    ```HtmlHelper
        @(Html.Kendo().Grid<OrderViewModel>()
            .Name("grid")
            .Groupable()
            .Sortable()
            .Editable()
            .Scrollable()
            .ToolBar(x => x.Create())
            .Columns(columns =>
            {
                columns.Bound(column => column.Freight);
                columns.Bound(column => column.ShipName);
                columns.Bound(column => column.ShipCity);
                columns.Command(column =>
                {
                    column.Edit();
                    column.Destroy();
                }).Width(230);
            })
            .DataSource(ds => ds.Ajax()
                .Read(r => r.Url("/Index?handler=Read").Data("forgeryToken"))
                .Update(u => u.Url("/Index?handler=Update").Data("forgeryToken"))
                .Create(c => c.Url("/Index?handler=Create").Data("forgeryToken"))
                .Destroy(d => d.Url("/Index?handler=Destroy").Data("forgeryToken"))
                .Model(m => m.Id(id => id.OrderID))
                .PageSize(10)
            )
            .Pageable()
        )
    ```
    ```TagHelper
        <kendo-grid name="grid">
            <groupable enabled="true" />
            <sortable enabled="true" />
            <editable enabled="true" mode="incell" />
            <scrollable enabled="true" />
            <toolbar>
                <toolbar-button name="create"></toolbar-button>
            </toolbar>
            <columns>
                <column field="Freight" title="Freight" />
                <column field="ShipName" title="Ship Name" />
                <column field="ShipCity" title="Ship City" />
                <column width="230">
                    <commands>
                        <column-command name="edit"></column-command>
                        <column-command name="destroy"></column-command>
                    </commands>
                </column>
            </columns>
            <datasource type="DataSourceTagHelperType.Ajax" page-size="10">
                <transport>
                    <read url="/Index?handler=Read" data="forgeryToken" />
                    <create url="/Index?handler=Create" data="forgeryToken" />
                    <update url="/Index?handler=Update" data="forgeryToken" />
                    <destroy url="/Index?handler=Destroy" data="forgeryToken" />
                </transport>
                <schema data="Data" total="Total" errors="Errors">
                    <model id="OrderID">
                        <fields>
                            <field name="OrderID" type="number" editable="false"></field>
                            <field name="Freight" type="number"></field>
                            <field name="ShipName" type="string"></field>
                            <field name="ShipCity" type="string"></field>
                        </fields>
                    </model>
                </schema>
            </datasource>
            <pageable enabled="true" />
        </kendo-grid>

    ```

1. Send the AntiForgeryToken with each POST request of the page:

    ```
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    You can also pass additional parameters with the request. The names of the custom parameters must be different from the reserved words, which are used by the Kendo UI DataSource for jQuery for [sorting](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverSorting), [filtering](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverFiltering), [paging](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverPaging), and [grouping](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverGrouping).

    ```
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                };
            }
        </script>
    ```

1. In the `PageModel` file, add a handler method for each of the CRUD operations:

    ```
        public class IndexModel : PageModel
        {
            public static IList<OrderViewModel> orders;

            public void OnGet()
            {
                if (orders == null)
                {
                    orders = new List<OrderViewModel>();

                    Enumerable.Range(0, 50).ToList().ForEach(i => orders.Add(new OrderViewModel
                    {
                        OrderID = i + 1,
                        Freight = i * 10,
                        OrderDate = new DateTime(2016, 9, 15).AddDays(i % 7),
                        ShipName = "ShipName " + i,
                        ShipCity = "ShipCity " + i
                    }));

                }
            }

            public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request, string additionalParameter)
            {
                //The received parameter "additionalParameter" can be used for filtering/checking the data before returning it to the Grid.
                return new JsonResult(orders.ToDataSourceResult(request));
            }

            public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
            {
                order.OrderID = orders.Count + 2;
                orders.Add(order);

                return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
            }

            public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
            {
                orders.Where(x => x.OrderID == order.OrderID).Select(x => order);

                return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
            }

            public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, OrderViewModel order)
            {
                orders.Remove(orders.First(x => x.OrderID == order.OrderID));

                return new JsonResult(new[] { order }.ToDataSourceResult(request, ModelState));
            }
        }
    ```

## Post data from a Razor Page

You can post data to the PageModel by binding the model properties to editors and submitting the entire model through a form. The example below demonstrates how to post the selected option from the [AutoComplete component]({% slug htmlhelpers_autocomplete_aspnetcore %}) to the PageModel:

```tab-HtmlHelper-RazorPage(csthml)
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    <form id="formExample" class="form-horizontal" method="post">
        <div class="form-group">
            @(Html.Label("Ship name:"))
            <div class="col-sm-10">
                @(Html.Kendo().AutoCompleteFor(m => m.ShipName)
                    //.Name("ShipName") is not required when using <WidgetName>For(). The attributes of the input element "name" and "id" will be generated automatically to match the name of the Model property (for example, "ShipName").
                    .Filter("startswith")
                    .Placeholder("Select country...")
                    .BindTo(new string[] {
                        "France",
                        "Germany",
                        "United Kingdom"
                    })
                    .Separator(", ")
                )
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">Send</button>
            </div>
        </div>
    </form>
```
```tab-TagHelper-RazorPage(csthml)
    @page
    @model IndexModel

    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()

    @{
        var countries_data = new List<string>() { "France", "Germany", "United Kingdom" };
    }

    <form id="formExample" class="form-horizontal" method="post">
        <div class="form-group">
            <label for="ShipName">Ship name:</label>
            <div class="col-sm-10">
                <kendo-autocomplete for="ShipName"
                    filter="FilterType.StartsWith"
                    placeholder="Select country..."
                    bind-to="countries_data"
                    separator=", ">
                </kendo-autocomplete>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">Send</button>
            </div>
        </div>
    </form>
```
```tab-PageModel(cshtml.cs)
    public class IndexModel : PageModel
    {
        [BindProperty]
        public string ShipName { get; set; }

        public void OnGet()
        {
        }

        public IActionResult OnPost()
        {
            string submitted_AutoComplete_value = ShipName;
            return RedirectToPage("Success");
        }
    }

```

For more information on the model binding in Razor Pages application, refer to [the official MSDN documentation](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/?view=aspnetcore-6.0&tabs=visual-studio#write-a-basic-form).

## GitHub Repo with Razor Pages Examples

A sample project with Razor Pages examples, which demonstrates the usage of the Telerik UI for ASP.NET Core components, is located in the [ASP.NET Core Examples](https://github.com/telerik/ui-for-aspnet-core-examples) repository on GitHub.

## Razor Pages Examples

The table below contains links to available examples of using Telerik UI for ASP.NET Core components in Razor Pages.

{% include_relative razor-pages-list-of-helpers.html %}

## Anti-request Forgery

Razor pages are automatically protected from [XSRF/CSRF](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/?view=aspnetcore-3.1&tabs=visual-studio#xsrf). This is why, when you bind a Telerik component to page methods, you need to pass an antiforgery token, in order to validate the request. For that purpose, you can use [kendo.antiForgeryTokens();](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/antiforgerytokens#antiforgerytokens). More on the anti-request forgery could be found on [Microsoft documentation](https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery?view=aspnetcore-3.1)

## Known Limitations

Razor Pages use `Page` in their routing mechanism which interferes with `GET` requests made by the Kendo UI DataSource. As a result, only `POST` requests should be used when paging is required.

## See Also

* [Configure a Custom DataSource for the Grid in Razor Pages]({% slug grid-custom-datasource-razor-ages %})
* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
