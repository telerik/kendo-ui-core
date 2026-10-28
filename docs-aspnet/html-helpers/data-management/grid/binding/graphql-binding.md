---
title: GraphQL Binding
page_title: GraphQL Binding
description: "Learn how to bind the Telerik UI Grid to a GraphQL service in {{ site.framework }} and handle read and CRUD operations."
components: ["grid"]
previous_url: /helpers/data-management/grid/binding/graphql-binding
slug: htmlhelpers_grid_aspnetcore_graphql-binding
position: 10
---

# GraphQL Binding

The Telerik UI Grid supports multiple server-side binding approaches. With the DataSource `.Custom()` option, you can configure the Grid to run read and CRUD operations against a GraphQL endpoint.

## What is GraphQL?

GraphQL is a query language for APIs and a runtime that fulfills client requests with existing data. It describes the available data clearly and returns only the fields requested by the client.

As an alternative to REST, GraphQL lets you fetch data from multiple related sources in a single request. A GraphQL query can access properties from one resource and follow references to related resources.

## Implementing the Service

First, create a running service that follows GraphQL and .NET guidelines:
[Creating a GraphQL Backend on .NET](https://learn.microsoft.com/en-us/shows/on-dotnet/creating-a-graphql-backend)

For a complete service implementation, review the public Telerik sample repository:
[Kendo UI Demos Service - graphql](https://github.com/telerik/kendo-ui-demos-service/tree/master/graphql/graphql-aspnet-core)

Update `Startup.cs` to register the GraphQL services and schema, for example:
```C#
        // Product
    services.AddTransient<IProductRepository, ProductRepository>();
        services.AddSingleton<ProductQuery>();
        services.AddSingleton<ProductMutation>();
        services.AddSingleton<ProductType>();
        services.AddSingleton<ProductInputType>();

        services.AddSingleton<ISchema>(new ProductsSchema(new FuncServiceProvider(type => services.BuildServiceProvider().GetService(type))));
```

## Binding the Grid

To bind the Grid to GraphQL, configure the DataSource transport, schema, and request payload handlers.

### Configuring the DataSource

Define the GraphQL endpoint URLs in the DataSource `.Custom()` transport configuration. When you enable editing, also configure `.Schema()` so the Grid can map fields and parse the response.

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
                .Url("https://demos.telerik.com/service/v2/graphql/")
                .ContentType("application/json")
                .Type(HttpVerbs.Post)
                .Data("additionalDataOnCreate")
            )
            .Read(r => r
                .Url("https://demos.telerik.com/service/v2/graphql/")
                .ContentType("application/json")
                .Type(HttpVerbs.Post)
                .Data("additionalDataOnRead")
            )
            .Update(r => r
                .Url("https://demos.telerik.com/service/v2/graphql/")
                .ContentType("application/json")
                .Type(HttpVerbs.Post)
                .Data("additionalDataOnUpdate")
            )
            .Destroy(r => r
                .Url("https://demos.telerik.com/service/v2/graphql/")
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
                <read url="https://demos.telerik.com/service/v2/graphql/" data="additionalDataOnRead" content-type="application/json" type="POST"/>
                <update url="https://demos.telerik.com/service/v2/graphql/" data="additionalDataOnUpdate" content-type="application/json" type="POST"/>
                <create url="https://demos.telerik.com/service/v2/graphql/" data="additionalDataOnCreate" content-type="application/json" type="POST"/>
                <destroy url="https://demos.telerik.com/service/v2/graphql/" data="additionalDataOnDestroy" content-type="application/json" type="POST"/>
            </transport>
        </datasource>
```
{% endif %}

### Handling Parameters

Use JavaScript helper functions to send GraphQL queries and map response data:
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

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [GraphQL Binding by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/graphql)
* [GraphQL Introduction](https://graphql.org/learn/)
* [Server-Side API](/api/grid)