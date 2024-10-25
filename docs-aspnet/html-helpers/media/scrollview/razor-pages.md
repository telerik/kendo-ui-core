---
title:  Razor Pages
page_title: Razor Pages
description: "An example on how to configure a ScrollView in Razor Pages."
slug: htmlhelpers_scrollview_razorpage_aspnetcore
position: 5
---

# ScrollView in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI ScrollView for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the ScrollView component in a Razor Pages scenario.

For the complete project, refer to the [ScrollView in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/ScrollView/ScrollViewBinding.cshtml).

```tab-HtmlHelper(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.ScrollView.ScrollViewBindingModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>ScrollView Binding</h1>
<div id="example" style="margin:auto; width:60%">
    @(Html.Kendo().ScrollView()
                .Name("scrollView")
                .EnablePager(false)
                .ContentHeight("100%")
                .TemplateId("scrollview-template")
                .DataSource(d =>
                        d.Ajax()
                          .Read(r => r.Url("/ScrollView/ScrollViewBinding?handler=ReadOptional").Data("forgeryToken")).PageSize(3))
    
    .HtmlAttributes(new { style = "height:500px; width:890px; max-width: 100%;" })
    )
</div>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">

        # for (var i = 0; i < data.length; i++) { #
        <div>
    <div ><img style="width: 140px; height: 140px;" src="@Url.Content("~/Images/ScrollViewImages/")#:data[i].ImageUrl# " /></div>
            <p>#= data[i].ProductName #</p>
        </div>

        # } #

    </div>
</script>

<script>

    function forgeryToken() {
        return kendo.antiForgeryTokens();
    }

</script>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}
```
{% if site.core %}
```TagHelper
@page
@model Telerik.Examples.RazorPages.Pages.ScrollView.ScrollViewBindingModel

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>ScrollView Binding</h1>
<div id="example" style="margin:auto; width:60%">
     <kendo-scrollview name="scrollView"
                       enable-pager="false"
                       content-height="100%"
                       template-id="scrollview-template"
                       style=height:500px; width:890px; max-width: 100%;>
        <datasource custom-type="aspnetmvc-ajax" page-size="3">
            <transport>
                <read url="/ScrollView/ScrollViewBinding?handler=ReadOptional" data="forgeryToken"/>
            </transport>
        </datasource>
    </kendo-scrollview>
</div>

<script id="scrollview-template" type="text/x-kendo-template">
    <div class="img-wrapper">

        # for (var i = 0; i < data.length; i++) { #
        <div>
    <div ><img style="width: 140px; height: 140px;" src="@Url.Content("~/Images/ScrollViewImages/")#:data[i].ImageUrl# " /></div>
            <p>#= data[i].ProductName #</p>
        </div>

        # } #

    </div>
</script>

<script>

    function forgeryToken() {
        return kendo.antiForgeryTokens();
    }

</script>

@section Scripts {
    @{await Html.RenderPartialAsync("_ValidationScriptsPartial");}
}
```
{% endif %}

```tab-PageModel(cshtml.cs)
 public static List<Product> ScrollViewItems { get; set; }
        public void OnGet()
        {
            if (ScrollViewItems == null)
            {
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

* [Server-Side API](/api/scrollview)