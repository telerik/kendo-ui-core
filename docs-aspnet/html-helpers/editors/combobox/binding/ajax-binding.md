---
title: Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI ComboBox component for {{ site.framework }}."
previous_url: /helpers/editors/combobox/binding/ajax-binding
slug: htmlhelpers_combobox_ajaxbinding_aspnetcore
position: 2
---

# Ajax Binding

You can configure the Telerik UI ComboBox for Ajax binding to the Northwind **Products** table which uses Linq to SQL.

> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.

1. Create an action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.
        {% if site.mvc %}
        public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products, JsonRequestBehavior.AllowGet);
        }
        {% else %}
        public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products);
        }
        {% endif %}

1. Add an Ajax-bound ComboBox.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("productComboBox") // The name of the ComboBox is mandatory. It specifies the"id" attribute of the widget.
        .DataTextField("ProductName") // Specify which property of the Product to be used by theComboBox as a text.
         .DataValueField("ProductID") // Specify which property of the Product to be used by theComboBox as a value.
            .DataSource(source =>
        {
                 source.Read(read =>
                 {
                    read.Action("GetProducts", "Home"); // Set the Action and Controller names.
                })
                .ServerFiltering(true); // If true, the DataSource will not filter the data on theclient.
        })
           .SelectedIndex(0) // Select the first item.
    )
```
{% if site.core %}
```TagHelper
<kendo-combobox name="productComboBox" // The name of the ComboBox is mandatory. It specifies the"id" attribute of the widget.
                datatextfield="ProductName" // Specify which property of the Product to be used by theComboBox as a text.
                datavaluefield="ProductID" // Specify which property of the Product to be used by theComboBox as a value.
                index="0"> // Select the first item.
    <datasource server-filtering="true"> // If true, the DataSource will not filter the data on theclient.
        <transport>
            <read url="@Url.Action("GetProducts", "Home")" /> // Set the Action and Controller names.
        </transport>
    </datasource>
</kendo-combobox>
```
{% endif %}    
## See Also

* [Server-Side API](/api/combobox)
