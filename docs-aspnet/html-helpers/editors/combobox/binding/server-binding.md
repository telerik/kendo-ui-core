---
title:  Server Binding
page_title: Server Binding
description: "Learn how to implement server binding in the Telerik UI ComboBox HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/combobox/binding/server-binding
slug: htmlhelpers_combobox_serverbinding_aspnetcore
position: 4
---

# Server Binding

You can configure the Telerik UI ComboBox for server binding to the Northwind **Products** table which uses Linq to SQL.

1. Create a new action method and pass the **Products** table as the model.

        public IActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

        @model IEnumerable<MvcApplication1.Models.Product>


1. Add a server bound ComboBox.

        @(Html.Kendo().ComboBox()
            .Name("productComboBox") // The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the ComboBox as a value.
            .BindTo(Model)   // Pass the list of Products to the ComboBox.
            .SelectedIndex(10) // Select an item with index 10. Note that the indexes are zero-based.
        )

## See Also

* [Server-Side API](/api/combobox)
