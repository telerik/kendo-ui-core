---
title: Model
page_title: DataSource Model
description: "Learn how to use the model properties the DataSource component for {{ site.framework }}."
slug: htmlhelper_datasourcemodel
---

# Model Definition

The `Model` method configures the model of the data source. The data field names must be valid JavaScript [identifiers](https://developer.mozilla.org/en-US/docs/Glossary/Identifier) and contain neither spaces, nor special characters. The first character has to be a letter.

```HtmlHelper
     @(Html.Kendo().DataSource<ProductViewModel>()
        .Name("myDataSource")
        .Ajax(dataSource =>
        {
          dataSource
            .Read(read => read.Action("Products_Read", "Home"))
            .Model(model =>
            {
                // The unique identifier (primary key) of the model is the ProductID property.
                model.Id(product => product.ProductID);

                //Declare a model field and optionally specify its default value (used when a new model instance is created).
                model.Field(product => product.ProductName).DefaultValue("N/A");

                //Declare a model field and make it readonly.
                model.Field(product => product.UnitPrice).Editable(false);
            })
        })
    )
```
{% if site.core %}
```TagHelper
    @{
        var ProductName_default = "N/A";
    }
    <kendo-datasource name="myDataSource" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("Products_Read","Home")" />
        </transport>
        <schema>
            <model id="ProductID">
                <fields>
                    <field name="ProductName" type="string" default-value="@ProductName_default"></field>
                    <field name="UnitPrice" type="number" editable="false"></field>
                </fields>
            </model>
        </schema>
    </kendo-datasource> 
```
{% endif %}

### Id

The field, which acts as the identifier of the model. The identifier is used to determine if a model instance is new or existing. If the field value is equal to the default one, that is specified through `DefaultValue()`, the model is considered new.

> The DataSource uses the identifier field of the Model to track the state of its items. The `Id` field must be non-editable `Editable(false)` otherwise unexpected behavior and loss of data might occur.

### Default Value

Specifies the default value which will be used for the field when a new model instance is created. The default settings need to match the type of the field. 

> If `Field.Nullable` is set to `true` the `DefaultValue()` will be ignored when a new model is created.

## See Also

* [Server-Side API](/api/datasource)
