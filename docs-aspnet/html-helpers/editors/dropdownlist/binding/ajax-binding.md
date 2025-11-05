---
title:  Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI DropDownList component for {{ site.framework }}."
previous_url: /helpers/editors/dropdownlist/binding/ajax-binding
slug: htmlhelpers_dropdownlist_ajaxbinding_aspnetcore
position: 3
---

# Ajax Binding

In this article, you will learn how to set up the DropDownList component to load its options from a database.

You can configure the DropDownList for Ajax binding to the Northwind **Products** table, which uses LINQ to SQL. The DropDownList component expects to receive a collection of items from the specified remote endpoint.

> The `ToDataSourceResult()` extension method modifies the structure of the result, and the component is not able to bind to it. In this case, either return a simple array of data as JSON or define a custom `DataSource` with `Schema()` configuration that specifies the field that holds the collection of data items in the response.

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

1. Add an Ajax-bound DropDownList.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
        .DataTextField("ProductName") // Specify which property of the Product to be used by the DropDownList as a text.
        .DataValueField("ProductID") // Specify which property of the Product to be used by the DropDownList as a value.
        .DataSource(source =>
        {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); // Set the Action and Controller names.
                })
                .ServerFiltering(true); // If true, the DataSource will not filter the data on the client.
        })
        .SelectedIndex(0) // Select the first item.
     )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownlist name="productDropDownList"
                    datatextfield="ProductName"
                    datavaluefield="ProductID"
                    index="0">
    <datasource server-filtering="true">
        <transport>
            <read url="@Url.Action("GetProducts", "Home")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}

By following this example, you will be able to populate the ASP.NET Core DropDownList from a database, and the component will visualize the data.

## See Also

* [Server-Side API](/api/dropdownlist)
