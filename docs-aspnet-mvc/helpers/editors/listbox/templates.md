---
title: Item Templates
page_title: Item Templates |Telerik UI ListBox HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI for ASP.NET MVC ListBox and learn how to customize its item templates."
slug: itemtemplates_listboxhelper_aspnetmvc
position: 3
---

# Item Templates

The ListBox provides templates for its items that are passed as а function or string.

    <script id="customer-item-template" type="text/x-kendo-template">
        <span class="k-state-default" style="background-image: url('../content/web/Customers/#:data.CustomerID#.jpg')"></span>
        <span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
    </script>

    @(Html.Kendo().ListBox()
        .Name("selected")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .TemplateId("customer-item-template")
        .BindTo(new List<CustomerViewModel>())
    )

## See Also

* [Templates in the Telerik UI ListBox for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listbox/templates)
* [Server-Side API](/api/listbox)
