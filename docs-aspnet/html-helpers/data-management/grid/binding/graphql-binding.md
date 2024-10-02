---
title: GraphQL Binding
page_title: GraphQL Binding
description: "Learn how to implement GraphQL binding with the Telerik UI Grid component for {{ site.framework }}."
previous_url: /helpers/data-management/grid/binding/graphql-binding
slug: htmlhelpers_grid_aspnetcore_graphql-binding
position: 10
---

# GraphQL Binding

The Grid component provides multiple types of server-side binding. Using its DataSource `.Custom()` property, you can configure the Grid to execute CRUD operations to a GraphQL remote data source.

## What is GraphQL?

GraphQL is a query language for APIs and a runtime for fulfilling client (browser) queries by returning existing data. It offers a complete and understandable description of the data and provides the API clients exactly with the specific data they requested. 

As an alternative to REST, GraphQL allows developers to make requests to fetch data from multiple data sources with a single API call. GraphQL queries access not just the properties of one resource but also smoothly follow references between them.

## Implementing the Service

First, you will need to create a live service following the GraphQL and .NET Guideliness:
[Creating a GraphQL Backend on .NET](https://learn.microsoft.com/en-us/shows/on-dotnet/creating-a-graphql-backend)

You can see the Kendo and Telerik Services implementation provided in this public repository:
[Kendo UI Demos Service - graphql](https://github.com/telerik/kendo-ui-demos-service/tree/master/graphql/graphql-aspnet-core)

One key point is to modify the Startup.cs file to accomodate handling service requests. e.g.:
```C#
        // Product
        services.AddTransient<IProductRepository, roductRepository>();
        services.AddSingleton<ProductQuery>();
        services.AddSingleton<ProductMutation>();
        services.AddSingleton<ProductType>();
        services.AddSingleton<ProductInputType>();

        services.AddSingleton<ISchema>(new ProductsSchema(new FuncServiceProvider(type => services.BuildServiceProvider().GetService(type))));
```

## Binding the Grid

The preparation of the Grid component to handle remote GraphQL queries requires several configuration steps.

### DataSource Configuration

The GraphQL service URL endpoints are referenced in the `.Custom() -> Transport` section of the DataSource. In addition, defining the `.Schema()` is required when implementing editing capabilities.

```C#
    .DataSource(dataSource => dataSource
        .Custom()
        .PageSize(20)
        .Schema(schema =>
        {
            schema.Model(model =>
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false).From("productID");
                model.Field(p => p.ProductName).From("productName");
                model.Field(p => p.UnitPrice).From("unitPrice");
                model.Field(p => p.UnitsInStock).From("unitsInStock");
            })
            .Data(d => "schemaData")
            .Total(t => "schemaTotal");
        })
        .Transport(transport => transport
            .Create(r => r
                .Url("https://demos.telerik.com/aspnet-core/service/api/graphql/")
                .ContentType("application/json")
                .Type(HttpVerbs.Post)
                .Data("additionalDataOnCreate")
            )
            .Read(r => r
                .Url("https://demos.telerik.com/aspnet-core/service/api/graphql/")
                .ContentType("application/json")
                .Type(HttpVerbs.Post)
                .Data("additionalDataOnRead")
            )
            .Update(r => r
                .Url("https://demos.telerik.com/aspnet-core/service/api/graphql/")
                .ContentType("application/json")
                .Type(HttpVerbs.Post)
                .Data("additionalDataOnUpdate")
            )
            .Destroy(r => r
                .Url("https://demos.telerik.com/aspnet-core/service/api/graphql/")
                .ContentType("application/json")
                .Type(HttpVerbs.Post)
                .Data("additionalDataOnDestroy")
            )
            .ParameterMap("parameterMap")
        )
    )
```
{% if site.core %}
```HTML
        <datasource type="DataSourceTagHelperType.Custom" page-size="20">
            <schema datahandler="schemaData" total-handler="schemaTotal">
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number" editable="false" from="productID"></field>
                        <field name="ProductName" type="string" from="productName"></field>
                        <field name="UnitPrice" type="number" from="unitPrice"></field>
                        <field name="UnitsInStock" type="number" from="unitsInStock"></field>
                    </fields>
                </model>
            </schema>
            <transport parameter-map="parameterMap">
                <read url="https://demos.telerik.com/aspnet-core/service/api/graphql/" data="additionalDataOnRead" content-type="application/json" type="POST"/>
                <update url="https://demos.telerik.com/aspnet-core/service/api/graphql/" data="additionalDataOnUpdate" content-type="application/json" type="POST"/>
                <create url="https://demos.telerik.com/aspnet-core/service/api/graphql/" data="additionalDataOnCreate" content-type="application/json" type="POST"/>
                <destroy url="https://demos.telerik.com/aspnet-core/service/api/graphql/" data="additionalDataOnDestroy" content-type="application/json" type="POST"/>
            </transport>
        </datasource>
```
{% endif %}

### Handling Parameters

Sending required parameters to the GraphQL server backend and extracting the meaningful data happens with javascript:
```JS
<script>
    function additionalDataOnCreate(model) {
        var createQuery = "mutation CreateProductMutation($product: ProductInput!){" +
            "createProduct(product: $product){" +
                "productID," +
                "productName," +
                "unitPrice," +
                "unitsInStock" +
            "}" +
        "}";
        var queryFields = getQueryFields(model);

        return {
            query: createQuery,
            variables: { "product": queryFields }
        };
    }

    function additionalDataOnRead() {
        var readQuery = "query {" +
            "products { productID, productName, unitPrice, unitsInStock }" +
        "}";

        return { query: readQuery };
    }

    function additionalDataOnUpdate(model) {
        var updateQuery = "mutation UpdateProductMutation($product: ProductInput!){" +
            "updateProduct(product: $product){" +
                "productID," +
                "productName," +
                "unitPrice," +
                "unitsInStock" +
            "}" +
        "}";
        var queryFields = getQueryFields(model);

        return {
            query: updateQuery,
            variables: { "product": queryFields }
        };
    }

    function additionalDataOnDestroy(model) {
        var destroyQuery = "mutation DeleteProductMutation($product: ProductInput!){" +
            "deleteProduct(product: $product){" +
                "productID," +
                "productName," +
                "unitPrice," +
                "unitsInStock" +
            "}" +
        "}";
        var queryFields = getQueryFields(model);

        return {
            query: destroyQuery,
            variables: { "product": queryFields }
        };
    }

    function parameterMap(options, operation) {
        return kendo.stringify({
            query: options.query,
            variables: options.variables
        });
    }

    function schemaData(response) {
        var data = response.data;

        if (data.products) { return data.products; }
        else if (data.createProduct) { return data.createProduct; }
        else if (data.updateProduct) { return data.updateProduct; }
        else if (data.deleteProduct) { return data.deleteProduct; }
    }

    function schemaTotal(response) {
        return response.data.products.length;
    }

    function getQueryFields(model) {
        var fields = {
            "productID": model.productID,
            "productName": model.productName,
            "unitPrice": model.unitPrice,
            "unitsInStock": model.unitsInStock
        };

        return fields;
    }
</script>
```

## See Also

* [GraphQL Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/graphql)
* [GraphQL Introduction](https://graphql.org/learn/)
* [Server-Side API](/api/grid)