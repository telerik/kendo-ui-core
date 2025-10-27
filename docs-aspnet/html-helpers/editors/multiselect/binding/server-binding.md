---
title:  Local Binding
page_title: Local Binding
description: "Learn how to bind the {{ site.product }} MultiSelect component to a local dataset."
previous_url: /helpers/editors/multiselect/binding/server-binding
slug: htmlhelpers_multiselect_serverbinding_aspnetcore
position: 2
---

# Local Binding

Local data binding refers to binding the MultiSelect component to a dataset that is prepared on the server and made available during the initial page rendering. The data is retrieved server-side (from a database, service, or other data source) and then passed to the view, where the `BindTo()` method accepts the `IEnumerable` collection.

The local data binding approach is often used when dealing with small to medium-sized datasets since all records are available when the page is loaded. Also, when the client-side filtering of the MultiSelect is enabled and the complete dataset can be accessed on the client, no additional server requests are needed, which provides fast and responsive user interactions. However, for large datasets, consider using [Ajax data binding]({% slug htmlhelpers_multiselect_ajaxbinding_aspnetcore %}) to avoid increased initial page load times and memory usage.

To configure the MultiSelect for local data binding, follow the next steps:

1. Create a new action method and pass the **Products** table as the model.

    ```C#
    public ActionResult Index()
    {
        NorthwindDataContext northwind = new NorthwindDataContext();

        return View(northwind.Products);
    }
    ```

1. Define the MultiSelect and bind it to the model collection available in the view.

   ```HtmlHelper
    @model IEnumerable<ProjectName.Models.ProductViewModel>

    @(Html.Kendo().MultiSelect()
        .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the HTML element of the component.
        .DataTextField("ProductName") // Specify the property of the model that must be used as an option text.
        .DataValueField("ProductID") // Specify the property of the model that must be used as an option value.
        .BindTo(Model) // Pass the list of Products to the MultiSelect.
    )
   ```
   {% if site.core %}
    ```TagHelper
    @model IEnumerable<ProjectName.Models.ProductViewModel>
    
    <kendo-multiselect name="productMultiSelect"
        datatextfield="ProductName"
        datavaluefield="ProductID"
        bind-to="Model">
    </kendo-multiselect>
    ```
    {% endif %}

## See Also

* [Basic Usage of the MultiSelect for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/basic-usage)
* [Ajax Data Binding]({% slug htmlhelpers_multiselect_ajaxbinding_aspnetcore %})
* [Server-Side API of the MultiSelect HtmlHelper](/api/multiselect)
{% if site.core %}
* [Server-Side API of the MultiSelect TagHelper](/api/taghelpers/multiselect)
{% endif %}
