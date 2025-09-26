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



<div class="meta-api-description">
Set and customize hierarchical card top-border colors in organizational charts by specifying an array of color values that correspond to each level from highest to lowest. Control the visual distinction between hierarchy layers using custom color codes or hex values for card borders to highlight different management or team levels. Enable, configure, or override default chart series colors with user-defined border colors for cards at various depths in the chart structure, allowing tailored appearance and easier identification of hierarchy stages or categories in organizational visualizations. Adjust level-based styling dynamically by applying specific color arrays that map distinctly to each organizational tier to improve clarity and visual hierarchy in org charts.
</div>

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


<div class="meta-api-description">
Configure and control the hierarchical data structure displayed in organizational charts by connecting, binding, or loading data sources such as JavaScript arrays, object configurations, or instances of data source classes. Enable dynamic loading and updating of tree-like data representations by setting or providing data collections, data source configurations, or existing data source instances for org chart rendering. Manage and customize data input for organizational hierarchy visualizations through various data binding methods, including specifying arrays, objects, or reusable data source objects to control the chart’s node population and data flow.
</div>

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


<div class="meta-api-description">
Control whether users can modify or update the organizational chart data by enabling or disabling edit mode, configure editing permissions, allow user input to change node details, set editing capabilities on or off, customize edit settings through configuration objects, manage how data changes are handled during user interactions, restrict or permit modifications to the displayed chart information, configure editable states to enable in-place edits or block changes, integrate with data sources supporting create, read, update, and delete (CRUD) operations for synchronized editing, and tailor edit behavior for precise control over user updates within the organizational structure visualization.
</div>

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


<div class="meta-api-description">
Control whether users can add new subordinate nodes or child elements within the organizational chart structure, enabling or disabling the ability to insert new items beneath existing nodes; configure the setting to allow creation of child entries when editing nodes, or disable it to prevent adding new child nodes from item menus or edit interfaces, effectively managing node creation permissions and hierarchy expansion within the org chart editor.
</div>

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


<div class="meta-api-description">
Control the ability to remove or delete nodes in an organizational chart, determine whether users can erase or eliminate items, enable or disable deletion functionality on chart elements, configure deletion permissions during setup to restrict or allow node removal, set options to hide or show delete actions in item menus, manage user rights for deleting entries within hierarchical charts, prevent accidental or intentional removal of nodes by disabling delete controls, customize interactive editing features to include or exclude item deletion capabilities, adjust settings to lock or unlock the delete function for chart components, and specify whether the delete option appears in node editing interfaces to maintain data integrity or enable flexible modifications.
</div>

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


<div class="meta-api-description">
Control whether users can modify the item's title, name, or avatar image within the organizational chart's pop-up editor by enabling or disabling editing features for these specific fields. Configure permissions to set editable states, allowing or restricting changes to display names, position titles, and profile photos in the org chart interface. Adjust settings to allow dynamic updates or lock the text and avatar fields to prevent unwanted modifications, managing how user input affects labels and images within the hierarchical visualization. Enable or disable inline editing for fields such as names, titles, and avatars to customize interaction and data entry behavior on the organizational chart's pop-up editing panel.
</div>

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


<div class="meta-api-description">
Configure and customize the pop-up editing interface for organizational chart nodes by defining form layouts, input fields, validation rules, data binding, and custom editors using form configuration objects. Control how user input is collected when modifying chart elements by enabling tailored forms with specific labels, templates, validators, or input controls. Adjust editing experiences for nodes through customizable forms that manage validation, layouts, and field configurations in the editing pop-up dialog. Enable dynamic form customization for node editing pop-ups to set validation logic, customize editor widgets, control field arrangements, and bind data effectively within the organizational chart's interactive editing environment.
</div>

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


<div class="meta-api-description">
Control, configure, or enable the ability to modify organizational chart structures by changing node parent-child relationships, such as updating or reassigning parent IDs, node hierarchies, and reporting lines; adjust, set, or restrict editing permissions for parent linkage in tree or org charts, enable or disable hierarchical node reparenting, manage relationships between node identifiers and their parent references, handle editing capabilities for organization structure changes, and control whether users can update, reassign, or lock the parent-node connections within visual organizational diagrams or tree data structures.
</div>

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


<div class="meta-api-description">
Control how organizational chart nodes are grouped by specifying a data attribute that clusters nodes based on shared values, enabling hierarchical grouping, categorization, or segmentation within the chart. This setting lets you organize or group nodes dynamically by any data field name, switching the chart rendering mode to display grouped nodes according to common properties, such as department, team, role, or any custom grouping criteria. Configure or set the group field to enable automatic grouping logic that arranges nodes into sections or clusters, facilitating visualization of relationships or categories within the organizational structure. This enables filtering, sorting, or displaying nodes grouped by specific data fields for clearer hierarchy or categorization in visual organizational layouts.
</div>

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


<div class="meta-api-description">
Control and customize the appearance and formatting of group headers or group labels in organizational charts by providing a custom template to override default rendering, enabling you to define how group titles, labels, and headings display, including layout, style, and content, so you can configure, set, or modify the group header output beyond default field values and names, supporting tailored label presentation and improved group identification within hierarchical visualizations.
</div>

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


<div class="meta-api-description">
Customize, set, or control the user interface text labels, tooltips, prompts, and messages displayed in organizational charts by configuring language-specific, localized, or translated content to adapt the org chart UI for different regions, cultures, or multilingual requirements through options for customizing wording, phrasing, and display text within the chart components.
</div>

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


<div class="meta-api-description">
Control and configure the accessible label text used by screen readers for organizational charts, enabling localization and customization of aria-label descriptions, setting descriptive tags for assistive technologies, adjusting label phrases for better clarity, and enhancing accessibility by defining readable names or captions that describe the chart's content for users relying on screen readers or other accessibility tools.
</div>

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


<div class="meta-api-description">
Configure and customize the text prompt or notification displayed when adding new entries or creating nodes within an organizational chart editor interface, enabling control over the creation confirmation message, pop-up prompts, and user feedback during the "add new item" or "create node" actions in org chart editing tools or hierarchical data visualizations.
</div>

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


<div class="meta-api-description">
Customize or configure the text label, wording, or localized string for the edit action button, option, or control within organizational chart pop-up menus, enabling setting, changing, or translating the edit menu item to different languages or custom phrasing for editing, modifying, updating, or adjusting entries in hierarchical or organizational charts, org charts, or visual tree structures.
</div>

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


<div class="meta-api-description">
Control and customize the confirmation or deletion prompts appearing when removing items or entries within hierarchical charts, organizational diagrams, or tree structures. Enable setting personalized warning messages, edit pop-up notices, or destroy alerts to guide users during removal actions. Adjust the text displayed for confirmation dialogs, deletion prompts, or remove notifications in interactive organizational chart interfaces, ensuring clear communication and tailored user feedback when nodes or elements are deleted. Configure the wording, style, or language of destroy-related messages in edit menus of org charts to enhance clarity and user experience during item removal processes.
</div>

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


<div class="meta-api-description">
Set, customize, or configure the confirmation message, alert text, pop-up content, or dialog shown when deleting, removing, or destroying items in organizational charts. Control the wording, prompt, or notification for delete confirmation pop-ups, including messages asking users to confirm removal or destruction actions. Adjust the text displayed in confirmation dialogs related to removal or deletion processes to ensure clear user prompts about content destruction.
</div>

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


<div class="meta-api-description">
Configure and customize the confirmation dialog title that appears when deleting or removing elements from the organizational chart, set or change the popup header text shown during destruction or deletion actions, control the prompt message title for confirming destructive operations within the org chart interface, enable dynamic or static confirmation titles for delete dialogs, adjust the label or heading that warns users before removing nodes or structures in the chart, modify the destroy confirmation prompt's headline to match localization, user interface tone, or workflow requirements, set the confirmation dialog text specifically for destruction steps in organization chart UI, tailor the popup title displayed in confirmation requests to prevent accidental deletes, and manage the message shown to users when confirming removal or deletion actions on the org chart components.
</div>

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


<div class="meta-api-description">
Adjust or configure the text displayed on the cancel button within organizational chart interfaces, enabling localization, translation, or custom labeling for cancel actions, abort commands, exit prompts, or dismiss buttons commonly used when users want to back out or stop an operation in org chart components.
</div>

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


<div class="meta-api-description">
Customize, configure, or set the text label for the save button in organizational chart interfaces, enabling localization and language adaptation by changing the save action button wording, caption, or prompt to match different languages, user preferences, or branding requirements. Adjust how the save control or command is presented in the UI to support internationalization, multi-language displays, or custom labels for save functionality within org chart components.
</div>

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


<div class="meta-api-description">
Customize or configure the accessibility label, aria-label, or screen reader text for the edit pop-up menu in organizational charts to support localization, internationalization, or different language settings, enabling developers to change or set the menu label for improved usability, accessibility compliance, and tailored user interface language in chart editing contexts.
</div>

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


<div class="meta-api-description">
Customize or configure the avatar upload button text, label, or prompt displayed in an organizational chart interface, including localization or internationalization of the avatar upload UI string, modifying the label for uploading profile pictures, controlling the text shown on avatar upload controls, setting or changing the prompt for adding user images, and adapting the upload avatar message for different languages or user contexts in org chart visualizations.
</div>

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


<div class="meta-api-description">
Set, configure, or customize the label text that identifies parent nodes in organizational charts with localized or translated wording, enabling control over how the term "parent" appears in hierarchical diagrams, org charts, or tree structures, including changing default text to match different languages, terminologies, or user interface preferences for parent node labeling.
</div>

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


<div class="meta-api-description">
Customize, configure, or set the label text for the name field in organizational charts, enabling localization and personalized display of names, titles, or identifiers; control how name strings appear in org charts by modifying or overriding default name labels, adjusting for translated or customized text to match different languages or display preferences.
</div>

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


<div class="meta-api-description">
Set, configure, or customize the display text or heading label shown as the main title in organizational charts, including options to localize, translate, or override the default title message to match different languages, user interfaces, or branding requirements. Control how the top-level or main heading appears in org charts, enabling developers to specify, modify, or update the title string for display purposes across various regions and contexts.
</div>

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


<div class="meta-api-description">
Configure or customize the text displayed in the organization chart's parent selector when no parent node is assigned, set the placeholder or default label for empty parent dropdown choices, control the message or string shown for null or none selections in hierarchical dropdown menus, define how “no parent” or “root” options appear in org chart parent lists, and adjust the display text for unassigned parent entries or blank parent dropdown items in organizational structures.
</div>

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


<div class="meta-api-description">
Customize, configure, or set the label, text, caption, or wording displayed on the expand button within an organizational chart interface, enabling localization, translation, or modification of the expand control's message or tooltip to fit different languages, user preferences, or UI designs and enhance accessibility and usability for expanding chart nodes or sections.
</div>

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


<div class="meta-api-description">
Customize, configure, or localize the label and text displayed on the collapse button in organizational chart interfaces, enabling developers to set, change, or translate the wording for collapsing nodes, branches, or tree structures to match different languages, UI designs, or user preferences. Adjust, override, or provide custom captions, strings, or messages for the collapse action in hierarchical diagrams, ensuring clear, context-appropriate button labels for expanding or contracting organizational units within data visualizations or charts.
</div>

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


<div class="meta-api-description">
Control and customize the appearance and layout of organizational chart nodes by defining templates that determine how each node card displays content, including configurable HTML or templating strings and data bindings. Enable dynamic node rendering, set custom card designs, modify node structure, and tailor layout and data presentation for each element in the chart to match specific visualization requirements or branding. Format, style, and arrange node fields, content blocks, and card components using flexible templating options that support initialization-time configuration and template references for enhanced control over node appearance and information display.
</div>

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


<div class="meta-api-description">
Add or insert nodes dynamically into an organizational chart structure, attaching new items under specific parent elements, root-level nodes without parents, or designated containers by specifying elements through selectors, jQuery objects, or HTML elements. Control hierarchical relationships by appending child nodes, inserting items in precise locations within the chart, and managing structure updates programmatically. Enable adding team members, departments, or positions into existing charts with flexible parent references to maintain accurate organizational layouts and relationships in varying markup and selector formats.
</div>

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
        var parentTask = orgChart.items()[1];

        orgChart.append({
            id: 9,
            name: "Added",
            title: "Support"
        }, parentTask);
    </script>

### cancelChanges

If there is currently a node in edit, it will cancel all changes.


<div class="meta-api-description">
discard unsaved edits, revert node modifications, exit edit mode, cancel current changes, reset node state, undo edits on selected node, stop editing process, abandon changes during node editing, clear pending edits, rollback node updates in organizational chart, halt node editing session, restore original node data before save, cancel active node editing, undo modifications without saving, terminate edit mode and reset content.
</div>

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


<div class="meta-api-description">
Control hierarchical visibility by programmatically folding or collapsing nodes to hide child branches within an organizational structure, enabling you to set, toggle, or close subtrees dynamically using references such as jQuery objects, HTML elements, or selector strings, allowing developers to manage expanded or contracted views of charts and handle node folding, hiding descendants, or reducing complexity in visual hierarchies.
</div>

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


<div class="meta-api-description">
Retrieve or access the original data object, record, or model associated with a specific DOM element, node, or selector within the organizational chart structure to inspect, map, update, or manipulate the underlying dataset; convert HTML elements, jQuery objects, or selectors to their corresponding data entries for tasks like event handling, custom rendering, data binding, synchronization, or dynamic content updates in organizational or hierarchical visualizations.
</div>

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


<div class="meta-api-description">
Delete or remove a node along with all its descendant nodes from an organizational chart or tree structure, enabling complete subtree elimination by specifying the target node to cascade deletions through all child nodes and connected branches; this operation facilitates dynamic pruning of hierarchical data, updating the chart layout by detaching and reflowing the visual representation to reflect the removal of nodes and their entire subordinate structure.
</div>

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


<div class="meta-api-description">
Control programmatic editing of organizational chart nodes by opening the node editor interface for modifying node data and content; trigger the edit view dynamically using different node references such as jQuery objects, HTML elements, or selector strings to enable inline or modal editing of specific nodes; configure, enable, set, or invoke editing actions on organizational chart entries to update properties, labels, or hierarchical information directly through code or event handlers within the chart component.
</div>

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


<div class="meta-api-description">
Control and trigger the expansion of organizational chart nodes programmatically by invoking a function that opens and reveals child elements or subordinate items within a hierarchy, supporting input references such as jQuery objects, raw HTML elements, or CSS selector strings to specify the target node to expand, enabling dynamic interaction with hierarchical data structures, automated unfolding of nested nodes, and customized display of subordinate entries in organizational visualizations.
</div>

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


<div class="meta-api-description">
Access all visible but collapsed nodes within an organizational chart, enabling retrieval of node elements that are currently rendered yet not expanded, so developers can inspect, iterate, modify attributes, add or remove CSS classes, bind events, update DOM elements, or pass these nodes to other functions for programmatic expansion, state management, or custom logic controlling node visibility and interaction within hierarchical data visualizations.
</div>

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


<div class="meta-api-description">
Retrieve or obtain the collection of rendered organizational chart nodes as DOM elements corresponding to current visible data entries, reflecting any applied filters, sorting, pagination, or grouping; enable mapping between data records and on-screen nodes for tasks such as querying node elements, modifying or styling node markup, attaching event listeners, measuring layout or position of chart items, or synchronizing data with UI components within an org chart visualization.
</div>

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


<div class="meta-api-description">
Retrieve or access a node's direct parent element within a hierarchical chart structure using a method that returns the parent node's DOM representation, enabling navigation through the organizational tree, manipulating the parent node's attributes, classes, or events, querying its position or properties, and supporting operations like hierarchical traversal, ancestor lookup, or DOM manipulation for parent-child relationships in visual charts or tree structures.
</div>

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


<div class="meta-api-description">
commit node edits and exit editing mode, save current modifications to a node, finalize changes made during node editing, persist updates to organizational chart nodes, close the node editor after applying edits, confirm and apply node property changes, save and close edit interface for chart nodes, complete editing session by storing node changes, update and lock node data after editing, end editing with save and close functionality for org chart nodes
</div>

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


<div class="meta-api-description">
Set or control which node is currently chosen or highlighted within an organizational chart programmatically by specifying the target element to select through code rather than manual user clicks. Enable automated or synchronized node selection to respond to keyboard inputs, integrate with external interfaces, trigger selection changes within workflows, or ensure the displayed selection matches application state by passing node identifiers or references to update the active node. Adjust, switch, or update the highlighted entity dynamically for scenarios requiring external control, scripting-based interaction, or custom selection management within hierarchical visual presentations.
</div>

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


<div class="meta-api-description">
Detect and respond to user actions that abort or interrupt editing on organizational chart nodes, enabling interception of cancel attempts during node modifications. Capture and handle events triggered when a user decides to discard, cancel, or revert changes while editing a node, allowing custom logic to prompt for confirmation, override default cancel behavior, preserve or rollback edits, or conditionally prevent cancellation through event control. Facilitate tracking and managing cancellations, abort signals, or user-initiated interruptions within hierarchical node editing workflows, supporting enhanced edit control, undo prevention, and user prompt integration during modification abandonments.
</div>

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


<div class="meta-api-description">
Track and respond to updates in the currently selected organizational chart node triggered by user actions such as clicks, taps, or keyboard navigation, enabling dynamic UI refreshes, loading of detailed node information, and synchronization of app state when selection changes occur; capture events that notify when the active or focused item shifts, providing selection context for handling node changes, navigating hierarchical structures, or reacting to user-driven selection updates across the org chart.
</div>

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


<div class="meta-api-description">
Handle or intercept node collapsing actions within an organizational chart interface, capturing user-initiated collapse events before they take effect, enabling control over whether a node's subtree should fold or remain expanded, supporting event cancellation or prevention to customize interactive behavior, manage node visibility toggling, and implement conditional logic to control collapsing based on application-specific rules or user permissions, useful for developers seeking to monitor, override, or restrict automatic collapses within hierarchical data visualizations or tree structures.
</div>

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


<div class="meta-api-description">
Handle or intercept node addition actions within organizational charts by capturing events triggered before a new node is created due to user interaction, enabling developers to inspect, modify, validate, or cancel node creation based on custom logic before the node appears. This event supports controlling the creation workflow by allowing conditions or rules to be applied, preventing unintended or invalid node insertions, and dynamically adjusting node data during interactive chart editing or organizational hierarchy modifications. Use cases include blocking node creation, modifying node properties on-the-fly, validating input before a node is added, or implementing custom workflows triggered by user attempts to insert nodes, ensuring flexible and programmatic management of node addition events in chart editing scenarios.
</div>

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


<div class="meta-api-description">
Capture and manage incoming data source updates before they are applied to the organizational chart by intercepting data changes, enabling validation, transformation, or cancellation of data load, refresh, bind, or programmatic update operations. This event triggers prior to updating the data, allowing developers to examine pending modifications, control data flow, prevent unwanted changes by stopping the update process, and implement custom logic to monitor or modify data refreshes, bindings, and updates effectively.
</div>

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


<div class="meta-api-description">
Listen for the event triggered after data updates such as adding, removing, loading, or editing nodes in organizational charts to execute custom logic for refreshing visuals, updating node rendering, reapplying selections, synchronizing external state, reattaching event handlers, running layout recalculations, initializing plugins, or performing actions once all data changes are fully processed and applied, enabling developers to control post-data processing workflows and UI updates related to organizational hierarchy changes.
</div>

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


<div class="meta-api-description">
Intercept node deletion actions in organizational charts by capturing and responding to deletion triggers when a user attempts to remove a node, enabling inspection of node data and event context before removal occurs. Control, cancel, or override node removal by preventing the default delete behavior, allowing implementation of confirmation dialogs, validation checks, undo functionality, or custom logic to manage node deletions dynamically within hierarchical structures. This event-driven control over removal operations supports scenarios such as conditional deletion, user prompts before changes, safeguarding important nodes, and customizing deletion workflows based on node properties or user permissions.
</div>

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


<div class="meta-api-description">
Intercept or handle user actions that trigger editing of nodes within organizational charts, enabling control over when and how node details enter edit mode. Detect and respond to edit initiation events to validate input, modify node data dynamically, cancel editing operations, or replace default editors with custom interfaces. Manage user interactions that request node editing by capturing edit triggers, enabling condition-based editing, preventing unwanted edits, or implementing custom editing workflows in hierarchical data visualizations or org chart interfaces.
</div>

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


<div class="meta-api-description">
Control or intercept the expansion of nodes within an organizational chart, enabling developers to detect when a user attempts to expand a node and optionally block or cancel that action before it completes. This feature supports event handling to monitor node expansion requests, allows cancellation by preventing default behavior, identifies which specific node triggered the expansion event, and enables customization of expansion logic based on user interaction or programmatic needs. It is useful for managing dynamic tree structures, controlling visibility of nodes, implementing conditional expansion rules, and customizing interactive workflows related to hierarchical data displays.
</div>

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


<div class="meta-api-description">
Intercept and handle attempts to save or update changes made to nodes within an organizational chart, enabling validation, confirmation prompts, cancellation of save actions, or custom logic before persisting edits to chart elements; includes the ability to prevent default save operations, implement conditional saving, control user edits, and manage data integrity during node editing workflows in hierarchical diagrams.
</div>

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


<div class="meta-api-description">
Detect and handle user actions related to selecting individual nodes or multiple grouped nodes within hierarchical diagrams, intercept selection events to enable custom logic such as blocking or approving selections, manage event data to evaluate selection criteria, and control or customize selection behavior by listening for selection triggers and optionally preventing default actions to enforce specific rules or workflows.
</div>

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
