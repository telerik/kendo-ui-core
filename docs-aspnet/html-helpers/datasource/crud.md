---
title: CRUD Operations
page_title: DataSource CRUD
description: "Learn how to define the CRUD options in the DataSource HtmlHelper for {{ site.framework }}."
slug: htmlhelper_datasourcecrud
---

# Crud Operations

> `Model.Id` is required for the proper execution of Update, Create and Destroy.

## Read

The `Read` method sets the action method which is responsible for reading data items and for returning them as JSON.

            .Ajax()
            .Read(read => read.Action(/* action */"Products_Read", /* controller */"Home"))

## Create

The `Create` method sets the action method which is responsible for saving new data items.

            .Ajax() 
            .Model(model => model.Id(product => product.ProductID))
            .Create(create => create.Action(/* action */"Products_Create", /* controller *"Home"))
            .Read(read => read.Action("Products_Read", "Home"))

## Update

The `Update` method sets the action method which is responsible for saving updated data items.

            .Ajax()
            .Model(model => model.Id(product => product.ProductID))
            .Update(update => update.Action(/* action */"Products_Update", /* controller */"Home"))
            .Read(read => read.Action("Products_Read", "Home"))

## Destroy

The `Destroy` method sets the action method which is responsible for destroying data items.

            .Ajax()
            .Model(model => model.Id(product => product.ProductID))
            .Destroy(destroy => destroy.Action(/* action */"Products_Destroy", /* controller*/ "Home"))
            .Read(read => read.Action("Products_Read", "Home"))

## Batch Operation

The `Batch` method configures the batch `create`, `update` and `destroy` operations. This means that all changes are kept on the client until a data source [`sync()`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/sync) occurs either programmatically or via a `Save Changes` button click in the grid for example. By default, the batch operations are disabled.

            .Ajax()
            .Batch(true)
            .Model(model => model.Id(product => product.ProductID))
            .Update(update => update.Action(/* action */"Products_Update", /* controller */ "Home"))
            .Read(read => read.Action("Products_Read", "Home"))

## See Also

* [Server-Side API](/api/datasource)
* [Model Definition]({% slug htmlhelper_datasourcemodel %})
