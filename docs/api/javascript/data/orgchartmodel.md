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


<div class="meta-api-description">
How do I configure the avatar field in my OrgChartModel to display dynamic user pictures? Configure the field that holds profile images, photos, or avatar URLs within your data model to display personalized user pictures in organizational charts, enabling dynamic binding of image sources for each node, card, or item representation; control how profile photos, user pictures, or visual identifiers appear by specifying the exact attribute containing image links or binary image data to customize avatars shown in hierarchical or card-based layouts.
</div>

#### Example

    <div id="orgchart"></div>
    <script>
    var dataSource = new kendo.data.OrgChartDataSource({
        data: [
            { id: 1, name: "John Smith", title: "CEO", avatar: "https://demos.telerik.com/kendo-ui/content/web/treelist/people/1.jpg", parentId: null },
            { id: 2, name: "Jane Doe", title: "CTO", avatar: "https://demos.telerik.com/kendo-ui/content/web/treelist/people/3.jpg", parentId: 1 }
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
        height:800,
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


<div class="meta-api-description">
How do I configure the node label in Kendo UI OrgChart? Set or customize the field in your data model that determines the label or title shown on each organizational chart card, control which property supplies the displayed node names, configure how item labels appear by specifying the text field for node titles, bind and present the appropriate data field for chart node labeling, define or change the source attribute used for card text in org chart views, enable flexible naming by selecting or mapping the display name property, adjust the field that populates each card’s visible title, and control the organization chart’s node text output by assigning the relevant label data key.
</div>

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


<div class="meta-api-description">
How do I configure the parent ID field in Kendo UI OrgChart for identifying root nodes? Configure and customize the hierarchical structure by specifying the field name that identifies parent nodes in your data model, enabling control over which items are treated as root elements in organizational charts or tree structures. Set or map the key that links child nodes to their parents, define how root nodes are recognized by indicating nullable or default parent references, and adjust the parent-child relationships in data visualizations or tree models by controlling the designation of parent ID fields. Manage root detection logic based on whether the parent identifier is null or matches a default value, support flexible hierarchy mapping, and tailor the parent node identification for accurate representation of organizational or relational data trees.
</div>

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


<div class="meta-api-description">
How do I set the title of each node in a Kendo UI OrgChart? Configure or bind the data field used to display the main label or heading on organizational chart nodes, controlling which model attribute appears as the card title or node caption in the chart. Enable setting or mapping a specific property to act as the visible title text for each item, letting you customize and control the displayed names, headings, or labels in hierarchical charts, org tree views, or node cards by specifying a data field that is rendered as the prominent title or identifier.
</div>

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


<div class="meta-api-description">
How do I control which nodes in an org chart are expandable using Kendo UI for jQuery? Control and configure which nodes in an organizational chart show as expandable or collapsible by specifying which items have child nodes, enabling dynamic rendering of expand icons based on a true/false flag that indicates presence of children. Manage the detection of child availability during local or remote data binding scenarios, including server-side calculation for lazy loading, and customize request parameters sent when users expand nodes to fetch child data. Enable precise control over hierarchical data structures by indicating expandable nodes, adjusting parameter mappings for server requests, and supporting responsive user interactions that trigger loading of child elements dynamically in org chart visualizations.
</div>

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


<div class="meta-api-description">
How to check if child nodes in Kendo UI OrgChart have finished loading? Check and control if child nodes in an organizational chart have finished loading or need to be refreshed, manage flags that indicate whether descendants are currently loaded or require re-fetching, enable or disable automatic reloading of child elements, toggle loaded state to trigger data refresh for lazy-loaded or remotely fetched children, set or retrieve loading status to control dynamic updates and synchronization of hierarchical data, determine if subnodes can be reloaded to update organization tree structures, control refresh behavior for nested items in charts, mark children as loaded to prevent unnecessary network calls, handle loading state when configuring or resetting child node data retrieval, manage flags that dictate whether child branches should be fetched again or kept cached.
</div>

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
