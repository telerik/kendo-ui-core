---
title: OrgChartModel
page_title: API Reference for Kendo Data OrgChartModel
description: Documentation how to get started with the OrgChartModel.
res_type: api
---

# kendo.data.OrgChartModel

The `kendo.data.OrgChartModel` class represents a data item from the [kendo.data.OrgCharttDataSource](orgchartdatasource). Inherits from [kendo.data.Model](model).

## Configuration

### avatar *(default: "{ type: 'string', nullable: true }")*

The name of the Model's avatar field. Will be used to render the item avatar in the card (item) template.

### name *(default: "{ type: 'string' }")*

The name of the Model's name field. Will be used to render the item name in the card (item) template.

### parentId *(default: "{ type: 'number', nullable: true }")*

The name of the Model's parentId field. The Kendo UI OrgChart distinguishes the root items based on the `parentId` field. If the `schema.model.fields.[parentIdField]` is nullable, root items with be items whose `parentId` field values are `null`. If the `schema.model.fields.[parentIdField]` is *not* nullable, root items will be items which have a default value for their data type.

### title *(default: "{ type: 'string', nullable: true }")*

The name of the Model's title field. Will be used to render the item title in the card (item) template.

## Fields

### hasChildren `Boolean`

Indicates whether an item has children. When the `hasChildren` field value is `true`, the OrgChart renders an expand icon.

>The data source calculates the `hasChildren` field value for local-binding scenarios.

>For lazy loading with remote data, calculate the field on the server.

>***The field is case-sensitive***.

> When the user clicks on the expand icon, the Kendo UI OrgChart DataSource requests the children of the item by sending the parent item `id` as a request parameter, for example `&id=1`.

> The parameter name can be changed with the [`paramaterMap`](/api/javascript/data/datasource/configuration/transport.parametermap) function.

#### Example

    <div id="example">
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          var dataSource = new kendo.data.OrgChartDataSource({
            transport: {
              read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", nullable: false },
                  ReportsTo: { field: "ReportsTo", nullable: true }
                }
              }
            }
          });

          dataSource.read().then(function() {
            var root = dataSource.at(0);

	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(root.hasChildren);
          });
      </script>
    </div>

## Methods

### loaded

Gets or sets the loaded flag of the OrgChart. Setting the loaded flag to `false` allows reloading of child items.

## Events

See the [Model events](model#events) for all inherited events.
