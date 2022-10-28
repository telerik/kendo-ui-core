---
title: OrgChart
description: Configuration, methods and events of the Kendo UI OrgChart
res_type: api
component: OrgChart
---

# kendo.ui.OrgChart

Represents the Kendo UI OrgChart widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### cardsColors `Array` *(default: null)*

An array of strings defining the cards top-border color for each level starting from the top level. If not set, the colors from the [Kendo Chart](/api/javascript/dataviz/ui/chart) series will be used.


#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Manager", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            cardsColors: ["pink", "tan", "orange"]
        });
    </script>

### dataSource `Object|Array|kendo.data.OrgChartDataSource`

The data source of the widget which is used to render the OrgChart items. Can be a JavaScript object which represents a valid [`kendo.data.OrgChartDataSource`](/api/javascript/data/orgchartdatasource) configuration, a JavaScript array, or an existing [`kendo.data.OrgChartDataSource`](/api/javascript/data/orgchartdatasource) instance.

* If the `dataSource` option is set to a JavaScript object or an array, the widget will initialize a new [`kendo.data.OrgChartDataSource`](/api/javascript/data/orgchartdatasource) instance and will use that value as the DataSource configuration.
* If the `dataSource` option is an existing `kendo.data.OrgChartDataSource` instance, the widget will use that instance and will not initialize a new one.

#### Example - Initializing dataSource with an array

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

#### Example - Initializing dataSource with an JavaScript object

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: {
                data: [
                    { id: 1, name: "Jane", title: "Boss", expanded: true },
                    { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                    { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                    { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
                ]
            }
        });
    </script>

#### Example - Passing existing OrgChartDataSource instance

    <div id="orgchart"></div>

    <script>
        var ds = new kendo.data.OrgChartDataSource({
            data: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        $("#orgchart").kendoOrgChart({
            dataSource: ds
        });
    </script>

### editable `Boolean|Object` *(default: true)*

If set to `false`, the user will not be able to edit the data to which the OrgChart is bound. By default, editing is enabled.

The `editable` option can also be set to a JavaScript object (which represents the editing configuration).

> * In order for the edit operations to work correctly, [configure the dataSource for CRUD operations](/framework/datasource/crud).

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            editable: false,
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### editable.create `Boolean` *(default: true)*

Allows the user to create new items as children of existing ones. If set to `false`, creating new items will not be available in the item edit pop-up menu.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            editable: {
                create: false
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### editable.destroy `Boolean` *(default: true)*

Allows the user to delete items. If set to `false`, delete item will not be available in the item edit pop-up menu.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            editable: {
                destroy: false
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### editable.fields `Boolean` *(default: true)*

Allows the user to edit the title, name, and avatar of the item. If set to `false`, editing those fields will not be available in the pop-up editor of the widget.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            editable: {
                fields: false
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### editable.form `Object` *(default: true)*

A [kendo.ui.Form](/api/javascript/ui/form) configuration object that allows customization of the Form on the pop-up editor.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            editable: {
                form: {
                    items: [{
                        field: "title",
                        label: "Position",
                        editor: "AutoComplete"
                    }]
                }
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### editable.parent `Boolean` *(default: true)*

Allows editing the structure (`id`/`parentId` relation). If the `parentId` has also configuration in the `form` configuration object, the `editable.parent` value will be taken into account. If set to `false`, editing the `id`/`parentId` relation will not be available.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            editable: {
                parent: false
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### groupField `String` *(default: null)*

Specifies the field the nodes should be grouped by. If any value is passed, the OrgChart uses its grouping rendering mode.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            groupField: "title",
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### groupHeaderTemplate  `String|Function` *(default: null)*

Provides an option to customize the default template for the group label (using the field value and name by default).

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            groupField: "title",
            groupHeaderTemplate: "<span>#: value # #: field #</span>",
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages `Object`

Provides configuration options for the messages present in the **OrgChart** widget.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                label: "Org label",
                edit: "Modify",
                create: "New",
                destroy: "Remove",
                destroyContent: "Remove this item and all its children?",
                destroyTitle: "Remove item",
                cancel: "Skip",
                save: "OK",
                menuLabel: "Modify menu",
                uploadAvatar: "Upload new image",
                parent: "Related to",
                name: "Full name",
                title: "Position",
                none: "--Select--",
                expand: "open",
                collapse: "close"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.label `String`

The label that will be used for the `aria-label` value of the **OrgChart** widget.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                label: "Org label"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.create `String`

The message that will be used for the create action in the edit pop-up Menu.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                create: "New"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.edit `String`

The message that will be used for the edit action in the edit pop-up Menu.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                edit: "Modify"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.destroy `String`

The message that will be used for the destroy action in the edit pop-up Menu.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                destroy: "Remove",
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.destroyContent `String`

The message that will be used for the destroy confirmation pop-up content.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                destroyContent: "Remove this item and all its children?"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.destroyTitle `String`

The message that will be used for the destroy confirmation pop-up title.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                destroyTitle: "Remove item"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.cancel `String`

The message that will be used for the cancel action button text.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                cancel: "Skip"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.save `String`

The message that will be used for save action button text.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                save: "OK"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.menuLabel `String`

The message that will be used for the `aria-label` of the edit pop-up Menu.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                menuLabel: "Modify menu"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.uploadAvatar `String`

The message that will be used for the avatar Upload's label.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                uploadAvatar: "Upload new image"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.parent `String`

The message that will be used for the "parent" text.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                parent: "Related to"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.name `String`

The message that will be used for the "name" text.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                name: "Full name",
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.title `String`

The message that will be used for the "title" text.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                title: "Full name",
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.none `String`

The message that will be used in the Parent DropDownList editor to specify the `null` option (no parent).

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                none: "--Select--"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.expand `String`

The message that will be used to label the Expand button.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                expand: "open"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### messages.collapse `String`

The message that will be used to label the Collapse button.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            messages: {
                collapse: "close"
            },
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

### template  `String|Function` *(default: null)*

Defines a node card template.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            template: "<span>#: name #, #: title #</span>",
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });
    </script>

## Methods

### append

Appends a new node to the specified parent node. The second argument could be the parent node jQuery object, HTML Element, or jQuery selector string. When a parent is not specified the item will be added as a root item.

#### Parameters

##### item `Object`

Specifies the data for the item to be added.

##### parent `jQuery|Element|String`

Specifies the parent item.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var parent = orgChart.items()[1];

        orgChart.append({
            id: 9,
            name: "Added",
            title: "Support"
        }, parent);
    </script>

### cancelChanges

If there is currently a node in edit, it will cancel all changes.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var toEdit = orgChart.items()[1];

        orgChart.edit(toEdit);
        orgChart.cancelChanges();
    </script>

### collapse

Collapses the specified node. The argument could be the node jQuery object, HTML Element, or jQuery selector string.

#### Parameters

##### node `jQuery|Element|String`

Specifies the node to be collapsed.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var node = orgChart.items()[1];

        orgChart.collapse(node);
    </script>

### dataItem

Returns the dataItem that corresponds to the given jQuery object, HTML Element, or jQuery selector string.

#### Parameters

##### node `jQuery|Element|String`

Specifies the node for the data item.

#### Returns `Object`

The data item.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var node = orgChart.items()[1];

        console.log(orgChart.dataItem(node));
    </script>

### delete

Removes the given node and all its children from the OrgChart.

#### Parameters

##### node `jQuery|Element|String`

Specifies the node to be deleted.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var node = orgChart.items()[1];

        orgChart.delete(node);
    </script>

### edit

Opens the edit view of the provided node. The argument could be the node jQuery object, HTML Element, or jQuery selector string.

#### Parameters

##### node `jQuery|Element|String`

Specifies the node to be edited.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var node = orgChart.items()[1];

        orgChart.edit(node);
    </script>

### expand

Expands the specified node. The argument could be the node jQuery object, HTML Element, or jQuery selector string.

#### Parameters

##### node `jQuery|Element|String`

Specifies the node to be expanded.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: false, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var node = orgChart.items()[1];

        orgChart.expand(node);
    </script>

### getCollapsedNodes

Returns a jQuery object containing all nodes that are visible in the widget but not expanded yet.

#### Parameters

#### Returns `jQuery`

A jQuery object containing all loaded collapsed nodes.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: false, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();

        console.log(orgChart.getCollapsedNodes());
    </script>

### items

Returns a jQuery object of all DOM elements which correspond to the data items from the view of the dataSource.

#### Returns `jQuery`

A jQuery object containing all loaded nodes.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();

        console.log(orgChart.items());
    </script>

### parent

Returns the jQuery element that corresponds to the given node parent.

#### Parameters

##### node `jQuery|Element|String`

Specifies the node which parent is needed.

#### Returns `jQuery`

The parent node (if any).

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var node = orgChart.items()[1];

        console.log(orgChart.parent(node));
    </script>

### saveChanges

If there is currently a node in edit, it will save the current changes and will close the edit view.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var toEdit = orgChart.items()[1];

        orgChart.edit(toEdit);
        orgChart.saveChanges();
    </script>

### select

Selects the given node in the OrgChart.

#### Parameters

##### node `jQuery|Element|String`

Specifies the node to be selected.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ]
        });

        var orgChart = $("#orgchart").getKendoOrgChart();
        var node = orgChart.items()[1];

        orgChart.select(node);
    </script>

## Events

### cancel

Triggered when the user is about to cancel the changes for the currently edited node. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.dataItem `Object`

The data item of the node that is being edited.

##### e.preventDefault `Function`

If invoked prevents cancel.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            cancel: function(e) {
                e.preventDefault();
            }
        });
    </script>

### change

Triggered when the selected node has been changed upon user interaction.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.item `jQuery`

The item element that has been selected.

##### e.dataItems `Array`

The data item(s) of the node(s) that are selected.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            change: function(e) {
                console.log(e);
            }
        });
    </script>

### collapse

Triggered before a node has been collapsed upon user interaction. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.item `jQuery`

The parent item element that is about to be collapsed. In grouped scenario contains all elements that belong to the group which children are about to be collapsed.

##### e.dataItems `Array`

The data items of the nodes that are about to change their `expanded` value.

##### e.preventDefault `Function`

If invoked prevents collapsing.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            collapse: function(e) {
                e.preventDefault();
            }
        });
    </script>

### create

Triggered when a node is about to be created upon user interaction. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.dataItem `Object`

The data item of the node for which a child is about to be created.

##### e.preventDefault `Function`

If invoked prevents create.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            create: function(e) {
                e.preventDefault();
            }
        });
    </script>

### dataBinding

Triggered before the actual change in the dataSource occurs. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.preventDefault `Function`

If invoked prevents the selection.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            dataBinding: function(e) {
                e.preventDefault();
            }
        });
    </script>

### dataBound

Triggered after the dataSource change event has been processed (adding/removing/loading/editing items).

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            dataBound: function(e) {
                console.log(e)
            }
        });
    </script>

### delete

Triggered when a node is about to be deleted as of a consequence of user interaction. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.dataItem `Object`

The data item of the node that is being deleted.

##### e.preventDefault `Function`

If invoked prevents delete.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            delete: function(e) {
                e.preventDefault();
            }
        });
    </script>

### edit

Triggered when a node is about to enter edit mode upon user interaction. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.dataItem `Object`

The data item of the node that is about to be edited.

##### e.preventDefault `Function`

If invoked prevents edit.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            edit: function(e) {
                e.preventDefault();
            }
        });
    </script>

### expand

Triggered before a node has been expanded upon user interaction. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.item `jQuery`

The parent item element that is about to be expanded. In grouped scenario contains all elements that belong to the group which children are about to be expanded.

##### e.dataItems `Array`

The data items of the nodes that are about to change their `expanded` value.

##### e.preventDefault `Function`

If invoked prevents expansion.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            expand: function(e) {
                e.preventDefault();
            }
        });
    </script>

### save

Triggered when the user attempts to save the current changes on the edited node. Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.dataItem `Object`

The data item of the node that is being saved.

##### e.preventDefault `Function`

If invoked prevents save.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            save: function(e) {
                e.preventDefault();
            }
        });
    </script>

### select

Triggered when the user attempts to select a new node or group of nodes (in grouped scenario). Preventable.

#### Event Data

##### e.sender `kendo.ui.OrgChart`

The **OrgChart** instance that triggered the event.

##### e.item `jQuery`

The item element that is about to be selected.

##### e.dataItems `Array`

The data item(s) of the node(s) that are about to be selected.

##### e.preventDefault `Function`

If invoked prevents selection.

#### Example

    <div id="orgchart"></div>

    <script>
        $("#orgchart").kendoOrgChart({
            dataSource: [
                { id: 1, name: "Jane", title: "Boss", expanded: true },
                { id: 2, name: "John", title: "Lead", expanded: true, parentId: 1 },
                { id: 3, name: "Jill", title: "Worker", expanded: true, parentId: 2 },
                { id: 4, name: "James", title: "Worker", expanded: true, parentId: 2 },
            ],
            select: function(e) {
                e.preventDefault();
            }
        });
    </script>
