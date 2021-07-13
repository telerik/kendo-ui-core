---
title: Overview
page_title: jQuery TreeList Documentation | Editing Overview
description: "Get started with the jQuery TreeList by Kendo UI and enable CRUD operations."
previous_url: /controls/data-management/treelist/editing
slug: editing_kendoui_treelist_widget
position: 1
---

# Editing Overview

The [Kendo UI TreeList HtmlHelper](https://demos.telerik.com/kendo-ui/treelist) provides a built-in editing functionality.

To implement the editing functionality of the TreeList:

1. [Set the model](#setting-the-model)
1. [Configure the transport](#configuring-the-transport)

## Setting the Model

All CRUD operations of the TreeList require a model with `id` and `parentId` fields. Those models has to be configured in the DataSource of the TreeList. Based on the `parentId` field, the TreeList distinguishes the root items.
* If `schema.model.fields.[parentIdField]` is nullable, root items with be items whose `parentId` field values are `null`.
* If the `schema.model.fields.[parentIdField]` is not nullable, root items will be items which have a default value for their data type.

			var dataSource = new kendo.data.TreeListDataSource({
		        schema: {
		            model: {
		                id: "IdField",
		                parentId: "ParentIdField",
		                ...


## Configuring the Transport

Once the schema is configured, you need to configure the `transport` actions for `update`, `destroy`, and `create`. An important part of the CRUD operations is the response from the service, which needs to return the manipulated records, so that the TreeList can apply the changes to the DataSource accordingly. The new records also have to contain the newly assigned within the service `id` value.

	var dataSource = new kendo.data.TreeListDataSource({
        transport: {
            read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All",
                dataType: "jsonp"
            },
            update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                dataType: "jsonp"
            },
            destroy: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Destroy",
                dataType: "jsonp"
            },
            create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                dataType: "jsonp"
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },

## See Also

* [Editing in the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/editing)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
