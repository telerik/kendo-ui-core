---
title: OrgChartModel
page_title: API Reference for Kendo Data OrgChartModel
description: Documentation how to get started with the OrgChartModel.
res_type: api
---

# kendo.data.OrgChartModel

The `kendo.data.OrgChartModel` class represents a data item from the [kendo.data.OrgCharttDataSource](/api/javascript/data/orgchartdatasource). Inherits from [kendo.data.Model](/api/javascript/data/model).

## Configuration

### avatar *(default: "{ type: 'string', nullable: true }")*

The name of the Model's avatar field. Will be used to render the item avatar in the card (item) template.

#### Example

    <div id="orgchart"></div>
    <script>
    var dataSource = new kendo.data.OrgChartDataSource({
        data: [
            { id: 1, name: "John Smith", title: "CEO", avatar: "https://demos.telerik.com/kendo-ui/content/web/orgchart/people/1.jpg", parentId: null },
            { id: 2, name: "Jane Doe", title: "CTO", avatar: "https://demos.telerik.com/kendo-ui/content/web/orgchart/people/2.jpg", parentId: 1 }
        ],
        schema: {
            model: {
                id: "id",
                parentId: "parentId",
                fields: {
                    id: { type: "number" },
                    parentId: { type: "number", nullable: true },
                    name: { type: "string" },
                    title: { type: "string", nullable: true },
                    avatar: { type: "string", nullable: true }
                }
            }
        }
    });

    $("#orgchart").kendoOrgChart({
        dataSource: dataSource,
        template: (data) => `
            <div class='k-card-body'>
                <img class='k-card-image' src='${data.avatar}' alt='${data.name}' />
                <h4 class='k-card-title'>${data.name}</h4>
                <h5 class='k-card-subtitle'>${data.title}</h5>
            </div>
        `
    });

    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log("Avatar field configured for OrgChart model");
    </script>

### name *(default: "{ type: 'string' }")*

The name of the Model's name field. Will be used to render the item name in the card (item) template.

#### Example

    <div id="orgchart"></div>
    <script>
    var dataSource = new kendo.data.OrgChartDataSource({
        data: [
            { id: 1, name: "John Smith", title: "CEO", parentId: null },
            { id: 2, name: "Jane Doe", title: "CTO", parentId: 1 },
            { id: 3, name: "Bob Johnson", title: "Developer", parentId: 2 }
        ],
        schema: {
            model: {
                id: "id",
                parentId: "parentId",
                fields: {
                    id: { type: "number" },
                    parentId: { type: "number", nullable: true },
                    name: { type: "string" },
                    title: { type: "string", nullable: true }
                }
            }
        }
    });

    $("#orgchart").kendoOrgChart({
        dataSource: dataSource,
        template: (data) => `
            <div class='k-card-body'>
                <h4 class='k-card-title'>${data.name}</h4>
                <h5 class='k-card-subtitle'>${data.title}</h5>
            </div>
        `
    });

    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log("Name field configured for OrgChart model");
    </script>

### parentId *(default: "{ type: 'number', nullable: true }")*

The name of the Model's parentId field. The Kendo UI OrgChart distinguishes the root items based on the `parentId` field. If the `schema.model.fields.[parentIdField]` is nullable, root items with be items whose `parentId` field values are `null`. If the `schema.model.fields.[parentIdField]` is *not* nullable, root items will be items which have a default value for their data type.

#### Example

    <div id="orgchart"></div>
    <script>
    var dataSource = new kendo.data.OrgChartDataSource({
        data: [
            { id: 1, name: "CEO", parentId: null },        // Root item (null parentId)
            { id: 2, name: "CTO", parentId: 1 },           // Child of CEO
            { id: 3, name: "CFO", parentId: 1 },           // Child of CEO
            { id: 4, name: "Developer", parentId: 2 },     // Child of CTO
            { id: 5, name: "Designer", parentId: 2 }       // Child of CTO
        ],
        schema: {
            model: {
                id: "id",
                parentId: "parentId",
                fields: {
                    id: { type: "number" },
                    parentId: { type: "number", nullable: true },
                    name: { type: "string" }
                }
            }
        }
    });

    $("#orgchart").kendoOrgChart({
        dataSource: dataSource
    });

    dataSource.read().then(function() {
        var rootItem = dataSource.at(0);
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Root item parentId:", rootItem.parentId); // null
        
        var childItem = dataSource.at(1);
        console.log("Child item parentId:", childItem.parentId); // 1
    });
    </script>

### title *(default: "{ type: 'string', nullable: true }")*

The name of the Model's title field. Will be used to render the item title in the card (item) template.

#### Example

    <div id="orgchart"></div>
    <script>
    var dataSource = new kendo.data.OrgChartDataSource({
        data: [
            { id: 1, name: "John Smith", title: "Chief Executive Officer", parentId: null },
            { id: 2, name: "Jane Doe", title: "Chief Technology Officer", parentId: 1 },
            { id: 3, name: "Mike Wilson", title: "Senior Software Developer", parentId: 2 },
            { id: 4, name: "Sarah Brown", title: "UX/UI Designer", parentId: 2 }
        ],
        schema: {
            model: {
                id: "id",
                parentId: "parentId",
                fields: {
                    id: { type: "number" },
                    parentId: { type: "number", nullable: true },
                    name: { type: "string" },
                    title: { type: "string", nullable: true }
                }
            }
        }
    });

    $("#orgchart").kendoOrgChart({
        dataSource: dataSource,
        template: (data) => `
            <div class='k-card-body'>
                <h4 class='k-card-title'>${data.name}</h4>
                <h5 class='k-card-subtitle'>${data.title}</h5>
            </div>
        `
    });

    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log("Title field configured for OrgChart model");
    </script>

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
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          var dataSource = new kendo.data.OrgChartDataSource({
            transport: {
              read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory"
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

#### Example

    <div id="orgchart"></div>
    <script>
    var dataSource = new kendo.data.OrgChartDataSource({
        data: [
            { id: 1, name: "John Smith", title: "CEO", parentId: null },
            { id: 2, name: "Jane Doe", title: "CTO", parentId: 1 },
            { id: 3, name: "Mike Wilson", title: "Developer", parentId: 2 }
        ],
        schema: {
            model: {
                id: "id",
                parentId: "parentId",
                fields: {
                    id: { type: "number" },
                    parentId: { type: "number", nullable: true },
                    name: { type: "string" },
                    title: { type: "string", nullable: true }
                }
            }
        }
    });

    $("#orgchart").kendoOrgChart({
        dataSource: dataSource
    });

    dataSource.read().then(function() {
        var rootItem = dataSource.at(0);
        
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Initial loaded state:", rootItem.loaded()); // true
        
        // Set loaded to false to allow reloading of child items
        rootItem.loaded(false);
        console.log("After setting to false:", rootItem.loaded()); // false
        
        // Set loaded back to true
        rootItem.loaded(true);
        console.log("After setting to true:", rootItem.loaded()); // true
    });
    </script>

## Events

See the [Model events](model#events) for all inherited events.
