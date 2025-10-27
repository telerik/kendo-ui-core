---
title:  Local Binding
page_title: Local Binding
description: "Learn how to bind the {{ site.product }} DropDownList component to a local dataset."
previous_url: /helpers/editors/dropdownlist/binding/server-binding
slug: htmlhelpers_dropdownlist_serverbinding_aspnetcore
position: 2
---

# Local Binding

Local data binding refers to binding the DropDownList component to a dataset that is prepared on the server and made available during the initial page rendering. The data is retrieved server-side (from a database, service, or other data source) and then passed to the view, where the `BindTo()` method accepts the `IEnumerable` collection.

The local data binding approach is often used when dealing with small to medium-sized datasets since all records are available when the page is loaded. Also, when the client-side filtering of the DropDownList is enabled and the complete dataset can be accessed on the client, no additional server requests are needed, which provides fast and responsive user interactions. However, for large datasets, consider using [Ajax data binding]({% slug htmlhelpers_dropdownlist_ajaxbinding_aspnetcore %}) to avoid increased initial page load times and memory usage.

To configure the DropDownList for local data binding, follow the next steps:

1. Create a new action method and pass the **Products** table as the model.

```C#
public ActionResult Index()
{
        NorthwindDataContext northwind = new NorthwindDataContext();
        return View(northwind.Products);
}
```

2. Define the DropDownList and bind it to the model collection available in the view.

```HtmlHelper
@model IEnumerable<MvcApplication1.Models.Product>

@(Html.Kendo().DropDownList()
        .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the HTML element of the component.
        .DataTextField("ProductName") // Specify the property of the "Product" model that must be used as an option text.
        .DataValueField("ProductID") // Specify the property of the "Product" model that must be used as an option value.
        .BindTo(Model) // Pass the list of Products to the DropDownList.
)
```
{% if site.core %}
```TagHelper
@model IEnumerable<MvcApplication1.Models.Product>

<kendo-dropdownlist name="productDropDownList"
        datatextfield="ProductName"
        datavaluefield="ProductID"
        bind-to="Model">
</kendo-dropdownlist>
```
{% endif %}

## See Also

* [Basic Usage of the DropDownList for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/basic-usage)
* [Ajax Data Binding]({% slug htmlhelpers_dropdownlist_ajaxbinding_aspnetcore %})
* [Server-Side API of the DropDownList HtmlHelper](/api/dropdownlist)
{% if site.core %}
* [Server-Side API of the DropDownList TagHelper](/api/taghelpers/dropdownlist)
{% endif %}
