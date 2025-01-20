---
title:  Razor Pages
page_title: Razor Pages
description: "Learn how to configure the {{ site.product }} ScrollView for remote data binding using a DataSource in a Razor Page application."
slug: htmlhelpers_scrollview_razorpage_aspnetcore
position: 6
---

# ScrollView in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ScrollView for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ScrollView component in a Razor Pages scenario.

For the complete project, refer to the [ScrollView in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ScrollView/ScrollViewBinding.cshtml).

## Getting Started

The [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component offers the most versatile data binding approach. To connect the ScrollView to a data set retrieved from a remote endpoint in a Razor Pages application, proceed with the following steps:

1. Specify the Read request URL in the `DataSource` configuration. The URL must refer to the method name in the `PageModel`.

    ```tab-HtmlHelper_Index.cshtml
        @page
        @model IndexModel

        <div id="example" style="margin:auto; width:60%">
            @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .ContentHeight("100%")
                .TemplateId("scrollview-template")
                .DataSource(source => source
                    .Ajax()
                    .Read(r => r.Url("/Index?handler=ReadOptional").Data("forgeryToken"))
                    .PageSize(3)
                )
                .HtmlAttributes(new { style = "height:500px; width:890px; max-width: 100%;" })
            )
        </div>
    ```
    ```tab-TagHelper_Index.cshtml
        @page
        @model IndexModel

        <div id="example" style="margin:auto; width:60%">
            <kendo-scrollview name="scrollView"
                content-height="100%"
                template-id="scrollview-template"
                style=height:500px; width:890px; max-width: 100%;>
                <datasource custom-type="aspnetmvc-ajax" page-size="3" server-paging="true">
                    <transport>
                        <read url="/Index?handler=ReadOptional" data="forgeryToken"/>
                    </transport>
                </datasource>
            </kendo-scrollview>
        </div>
    ```
    ```tab-scrollview-template
        <script id="scrollview-template" type="text/x-kendo-template">
            <div class="img-wrapper">
                # for (var i = 0; i < data.length; i++) { #
                <div>
                    <div>
                        <img style="width: 140px; height: 140px;" src="@Url.Content("~/Images/ScrollViewImages/")#:data[i].ImageUrl# " />
                    </div>
                    <p>#= data[i].ProductName #</p>
                </div>
                # } #
            </div>
        </script>
    ```

1. Add an `AntiForgeryToken` at the top of the page.

    ```C#
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` ith the Read request.

    ```JS
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JS
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

    ```tab-Index.cshtml.cs

        public static List<Product> ScrollViewItems { get; set; }
        
        public void OnGet()
        {
            if (ScrollViewItems == null)
            {
                // Populate the "ScrollViewItems" collection with data.
                ScrollViewItems = new List<Product>();

                ScrollViewItems.Add(new Product { ImageUrl = "image1.jpg", ProductName = "Chai" });
                ScrollViewItems.Add(new Product { ImageUrl = "image2.jpg", ProductName = "Chang" });
                ScrollViewItems.Add(new Product { ImageUrl = "image3.jpg", ProductName = "Aniseed Syrup" });
                ScrollViewItems.Add(new Product { ImageUrl = "image4.jpg", ProductName = "Ikura" });
                ScrollViewItems.Add(new Product { ImageUrl = "image5.jpg", ProductName = "Tofu" });
                ScrollViewItems.Add(new Product { ImageUrl = "image6.jpg", ProductName = "Konbu" });
                ScrollViewItems.Add(new Product { ImageUrl = "image7.jpg", ProductName = "Pavlova" });
                ScrollViewItems.Add(new Product { ImageUrl = "image8.jpg", ProductName = "Cloud" });
                ScrollViewItems.Add(new Product { ImageUrl = "image9.jpg", ProductName = "Sun" });
            }
        }

        public JsonResult OnPostReadOptional([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(ScrollViewItems.ToDataSourceResult(request));
        }
    ```
    ```tab-Model
        public class Product
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public string ImageUrl { get; set; }
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the ScrollView](https://docs.telerik.com/kendo-ui/api/javascript/ui/scrollview)
* [Server-Side HtmlHelper API of the ScrollView](/api/scrollview)
* [Server-Side TagHelper API of the ScrollView](/api/taghelpers/scrollview)
* [Knowledge Base Section](/knowledge-base)