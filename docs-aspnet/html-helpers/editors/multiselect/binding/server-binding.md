---
title:  Server Binding
page_title: Server Binding
description: "Learn how to implement server binding in the Telerik UI MultiSelect HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/multiselect/binding/server-binding
slug: htmlhelpers_multiselect_serverbinding_aspnetcore
position: 4
---

# Server Binding

You can configure the Telerik UI MultiSelect for server binding to the Northwind **Products** table which uses Linq to SQL.

1. Create a new action method and pass the **Products** table as the model.

        public IActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

        @model IEnumerable<MvcApplication1.Models.Product>


1. Add a server bound MultiSelect.

        @(Html.Kendo().MultiSelect()
            .Name("productDropDownList") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   // Pass the list of Products to the MultiSelect.
        )

## See Also

* [Server Filtering by the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/serverfiltering)
* [Client Filtering by the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/clientfiltering)
* [Server-Side API](/api/multiselect)
