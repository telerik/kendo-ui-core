---
title: Custom Data Binding
page_title: Custom Data Binding
description: "Learn how to implement custom ToDataSourceResult data binding in the Telerik UI MultiSelect component for {{ site.framework }}."
previous_url: /helpers/editors/multiselect/binding/custom-binding
slug: htmlhelpers_multiselect_todatasourceresultbinding_aspnetcore
position: 5
---

# Custom Data Binding

You can configure the Telerik UI MultiSelect to use a custom DataSource and, in this way, bind to a `ToDataSourceResult` instance.

1. Create an action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

1. Add an Ajax-bound MultiSelect.

    ```HtmlHelper
        @(Html.Kendo().MultiSelect()
            .Name("productDropDownList") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
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
        <kendo-multiselect name="productDropDownList"
                           datatextfield="ProductName"
                           datavaluefield="ProductID">
           <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
                <transport>
                     <read url="@Url.Action("GetProducts", "Home")" />
                </transport>
                <schema data="Data" total="Total">
	 	        </schema>
           </datasource>                 
        </kendo-multiselect>
    ```
    {% endif %}

## See Also

* [Server-Side API](/api/multiselect)
