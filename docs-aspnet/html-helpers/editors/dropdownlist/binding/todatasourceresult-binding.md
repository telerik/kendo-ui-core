---
title: Custom Binding
page_title: Custom Binding
description: "Learn how to implement custom ToDataSourceResult data binding in the Telerik UI DropDownList component for {{ site.framework }}."
previous_url: /helpers/editors/dropdownlist/binding/custom-binding
slug: htmlhelpers_dropdownlist_todatasourceresultbinding_aspnetcore
position: 4
---

# Custom Binding

You can configure the Telerik UI DropDownList for data binding to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

1. Create an action method which renders the view.

    ```C#
        public ActionResult Index()
        {
            return View();
        }
    ```

1. Create a new action method and pass the **Products** table as JSON result.

    ```C#
        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }
    ```

1. Add an Ajax-bound DropDownList.

    ```HtmlHelper
        @(Html.Kendo().DropDownList()
            .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the DropDownList as a value.
            .DataSource(source =>
            {
                source.Custom()
                        .ServerFiltering(true)
                        .Type("aspnetmvc-ajax") // Set this type if you want to use DataSourceRequest and ToDataSourceResult instances.
                        .Transport(transport =>
                        {
                            transport.Read("GetProducts", "Home");
                    })
                        .Schema(schema =>
                        {
                            schema.Data("Data") // Define the [data](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                                .Total("Total"); // Define the [total](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                        });
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-dropdownlist name="productDropDownList"
        datatextfield="ProductName"
        datavaluefield="ProductID">
        <datasource server-filtering="true" type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
            <schema data="Data"     // Define the [data](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                    total="Total">  // Define the [total](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
            </schema>
        </datasource>
    </kendo-dropdownlist>
    ```
    {% endif %}
    
## See Also

* [Customizing the Data Source of the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/custom-datasource)
* [Server-Side API](/api/dropdownlist)
