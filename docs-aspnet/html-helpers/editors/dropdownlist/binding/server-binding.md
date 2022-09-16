---
title:  Server Binding
page_title: Server Binding
description: "Learn how to implement server binding in the Telerik UI DropDownList component for {{ site.framework }}."
previous_url: /helpers/editors/dropdownlist/binding/server-binding
slug: htmlhelpers_dropdownlist_serverbinding_aspnetcore
position: 3
---

# Server Binding

You can configure the Telerik UI DropDownList for server binding to the Northwind **Products** table which uses Linq to SQL.

1. Create a new action method and pass the **Products** table as the model.

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

        @model IEnumerable<MvcApplication1.Models.Product>

1. Add a server bound DropDownList.

 ```HtmlHelper
      @(Html.Kendo().DropDownList()
      .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
      .DataTextField("ProductName") // Specify which property of the Product to be used by the DropDownList as a text.
      .DataValueField("ProductID") // Specify which property of the Product to be used by the DropDownList as a value.
      .BindTo(Model)   // Pass the list of Products to the DropDownList.
      .SelectedIndex(10) // Select an item with index 10. Note that the indexes are zero-based.
      )
 ```
 {% if site.core %}
 ```TagHelper
<kendo-dropdownlist name="productDropDownList"
                    datatextfield="ProductName"
                    datavaluefield="ProductID"
                    bind-to="Model"
                    index="10">
</kendo-dropdownlist>
 ```
 {% endif %}

## See Also

* [Server-Side API](/api/dropdownlist)
