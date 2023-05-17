---
title: Item Templates
page_title: Item Templates
description: "Get started with the {{ site.product }} ListBox and learn how to customize its item templates."
previous_url: /helpers/editors/listbox/templates
slug: htmlhelpers_listbox_templates_aspnetcore
position: 3
---

# Item Templates

The ListBox provides templates for its items that are passed as a function or string.

```HtmlHelper
    @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox")) // Configure the data source for remote data binding
        )
        .TemplateId("customer-item-template") // Configure the item template
        .Draggable(draggable => draggable.Placeholder("customPlaceholder")) // Create a custom placeholder
        .DropSources("selected")
        .ConnectWith("selected")
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
                .TransferTo()
                .TransferFrom()
                .TransferAllTo()
                .TransferAllFrom()
                .Remove());
        })
        .BindTo(new List<CustomerViewModel>())
    )

    @(Html.Kendo().ListBox()
        .Name("selected")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("optional")
        .ConnectWith("optional")
        .BindTo(new List<CustomerViewModel>())
    )
```
{% if site.core %}
```TagHelper

    @{
        var dropSources = new string[] { "selected" };
        var dropSources2 = new string[] { "optional" };
        var customers = new List<CustomerViewModel>();
        var customers2 = new List<CustomerViewModel>();
        var tools = new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove" };
    }

    <kendo-listbox name="optional"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    template-id="customer-item-template"
                    drop-sources="dropSources"
                    connect-with="selected"
                    bind-to="customers">
            <draggable enabled="true" placeholder="customPlaceholder"/>
            <datasource>
                <transport>
                    <read url="@Url.Action("GetCustomers", "ListBox")"/>
                </transport>
            </datasource>
            <toolbar position="ListBoxToolbarPosition.Right"
                        tools="tools"/>
    </kendo-listbox>

    <kendo-listbox name="selected"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    template-id="customer-item-template"
                    drop-sources ="dropSources2"
                    connect-with="opitonal"
                    bind-to="customers2">
            <draggable enabled="true" placeholder="customPlaceholder"/>
    </kendo-listbox>
```
{% endif %}
``` scripts
    <script id="customer-item-template" type="text/x-kendo-template">
        <span class="k-state-default" style="background-image: url(@Url.Content("~/shared/web/Customers/")#:data.CustomerID#.jpg);"></span>
        <span class="k-state-default"><h3>#: data.ContactName #</h3><p>#: data.CompanyName #</p></span>
    </script>

    <script>
        function customPlaceholder(draggedItem) {
            return draggedItem
                    .clone()
                    .addClass("custom-placeholder")
                    .removeClass("k-ghost");
        }
    </script>
```
``` IndexController.cs
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Examples.Models;
    using Microsoft.AspNetCore.Mvc;

    namespace Kendo.Mvc.Examples.Controllers
    {
        public partial class ListBoxController : BaseController
        {
            private IProductService productService;

            public ListBoxController(
                IProductService service)
            {
                productService = service;
            }

            [Demo]
            public IActionResult Index()
            {
                return View();
            }

            public IActionResult GetCustomers()
            {
                var customers = Enumerable.Empty<CustomerViewModel>();

                using (var northwind = GetContext())
                {
                    customers = northwind.Customers.Select(customer => new CustomerViewModel
                    {
                        CustomerID = customer.CustomerID,
                        CompanyName = customer.CompanyName,
                        ContactName = customer.ContactName,
                        ContactTitle = customer.ContactTitle,
                        Address = customer.Address,
                        City = customer.City,
                        Region = customer.Region,
                        PostalCode = customer.PostalCode,
                        Country = customer.Country,
                        Phone = customer.Phone,
                        Fax = customer.Fax,
                        Bool = customer.Bool
                    }).ToList();
                }

                return Json(customers);
            }
        }
    }
```

## See Also

* [Templates in the Telerik UI ListBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/templates)
* [Server-Side API](/api/listbox)
