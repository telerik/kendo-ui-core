---
title: Model
page_title: DataSource Model
description: "Learn how to use the model properties the DataSource HtmlHelper for {{ site.framework }}."
slug: htmlhelper_datasourcemodel
---

# Model Definition

The `Model` method configures the model of the data source. The data field names must be valid JavaScript [identifiers](https://developer.mozilla.org/en-US/docs/Glossary/Identifier) and contain neither spaces, nor special characters. The first character has to be a letter.

        .Ajax()
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

### Id

The field, which acts as the identifier of the model. The identifier is used to determine if a model instance is new or existing. If the field value is equal to the default one, that is specified through `DefaultValue()`, the model is considered new.

### Default Value

Specifies the default value which will be used for the field when a new model instance is created. The default settings need to match the type of the field. 

> If `Field.Nullable` is set to `true` the `DefaultValue()` will be ignored when a new model is created.

## See Also

* [Server-Side API](/api/datasource)
