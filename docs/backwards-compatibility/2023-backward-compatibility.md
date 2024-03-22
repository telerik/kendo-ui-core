---
title: 2023 Releases
page_title: 2023 Releases - Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2023."
slug: breakingchanges2023_kendoui
position: 0
---

# 2023 Releases

This article lists the breaking or important changes in the 2023 releases of Kendo UI. For the complete list of changes in the UI components, see the [product release history](https://www.telerik.com/support/whats-new/kendo-ui/release-history).

## Kendo UI 2023 R1 SP1

* Drop of the development and support of the LESS themes. 

### Unified Rendering

As of the 2023 R1 SP1 release, to unify their support for the new [ThemeBuilder Pro](https://docs.telerik.com/themebuilder/introduction), the following components have changed their rendering:

* [Grid]({% slug overview_kendoui_grid_widget %})
* [FileManager]({% slug  overview_kendoui_filemanager_widget %})
* [TreeList]({% slug overview_kendoui_treelist_widget %})
* [Gantt]({% slug overview_kendoui_gantt_widget %})
* [PivotGrid]({% slug overview_kendoui_pivotgrid_widget %})
* [ListView]({% slug overview_kendoui_listview_widget %})
* [ProgressBar]({% slug overview_kendoui_progressbar_widget %})
* [Notification]({% slug overview_kendoui_notification_widget %})
* [Upload]({% slug overview_kendoui_upload_widget %})
* [Pager]({% slug overview_kendoui_pager_widget %})
* [Toolbar]({% slug overview_kendoui_toolbar_widget %})
* [Window]({% slug overview_kendoui_window_widget %})
* [Editor]({% slug overview_kendoui_editor_widget %})
* [Calendar]({% slug overview_kendoui_calendar_widget %}) and [MultiViewCalendar]({% slug overview_kendoui_multiviewcalendar_widget %})
* Animation Containers and their dependent components

> The majority of the rendering changes can also be found within the existing test HTML specifications coming from the [Kendo UI Themes Monorepo](https://github.com/telerik/kendo-themes/tree/develop). The `tests` folder contains HTML specifications for all flavour of the components. The components follow the rendering strategy outlined in the specifications.

### State Classes

> All `k-state-{name of state}` classes are transposed to `k-{name of state}`. A list of all the updated state classes can be found in the existing [State Classes](https://docs.telerik.com/kendo-ui/styles-and-layout/components-rendering-overview#state-classes) article.

### Animation Containers

* Animation containers are all components that represent or hold a popup, for example, the Grid filter menu and column, and popup editor, Tooltip, SplitButton, DropDownList, and more.  
* The `.k-animation-container` elements are now holding another wrapping element with the `.k-child-animation-container` class.


### PanelBar

The text and icon of the items are wrapped within two separate `<span>` elements annotated with the `.k-panelbar-item-text` and `.k-panelbar-item-icon` classes.

### Menu

The text of the items are wrapped within a standalone `<span>` element annotated with the `.k-menu-link-text` class.

### DropDownList

The component's value is wrapped within a `<span>` element annotated with the `.k-input-value-text`.

### Grid

> All [rendering](#unified-rendering) changes in the Grid also apply to the FileManager, TreeList, Gantt, and PivotGrid as these components use the Grid internally.

* The following command classes have been renamed:

    |Versions prior to 2023.1.314| Versions 2023.1.314 and later
    |:---   |:---
    |`k-grid-edit`| `k-grid-edit`
    |`k-grid-update`| `k-grid-save-command`
    |`k-grid-cancel`| `k-grid-cancel-command`
    |`k-grid-cancel`| `k-grid-cancel-command`
    |`k-grid-delete`| `k-grid-remove-command`

* The following classes `table`-specific classes have been added to the `table` elements: 

    |Versions prior to 2023.1.314| Versions 2023.1.314 and later
    |:---   |:---
    | `<table>` | `<table class="k-table">` |
    | `<thead>` | `<thead class="k-table-thead">` |
    | `<tbody>` | `<tbody class="k-table-tbody">` |
    | `<tfoot>` | `<tfoot class="k-table-tfoot">` |
    | `<th>`  | `<th class="k-table-th">`  |
    | `<tr>` |  `<tr class="k-table-row">` |
    | `<tr> alt rows` | `<tr class="k-table-alt-row">` |
    | `<td>` | `<td class="k-table-td">` |

* Except for the popups, the sizing option now propagates to all elements inside the Grid. These include the table, toolbar, pager, buttons, inputs, pickers, chip lists, and more.
* The `.k-widget` class is now removed from the `.k-grid` element.
* The sorting icons will be replaced with their `.k-i-sort-asc-small` and  `.k-i-sort-desc-small` general names instead of their `.k-i-sort-asc-sm` and `.k-i-sort-desc-sm` aliases.
* The sorting icon is now wrapped in a `<span>` element:

  ```
  <span class="k-sort-icon">
        <span class="k-icon k-i-sort-asc-small"></span>
  </span>
  ```

* The headings of the Grid are now updated with the new header [rendering](#unified-rendering):

    ```Pre-Unified-Rendering
        <!--- Default header cell --->
        <th class="k-header">
                <a class="k-link">
                    ProductName
                </a>
        </th>

        <!--- Header cell with sorting--->
        <th class="k-header k-sorted">
                <a class="k-link">
                    ProductName
                    <span class="k-icon k-i-sort-asc-sm"></span>
                </a>
        </th>

        <!--- Header cell with filter menu--->
        <th class="k-header k-filterable">
             <a class="k-grid-filter">
                <span class="k-icon k-i-filter"></span>
             </a>
             <a class="k-link">
                    ProductName
             </a>
        </th>

        <!--- Header cell with column menu--->
         <th class="k-header">
             <a class="k-header-column-menu">
                <span class="k-icon k-i-more-vertical"></span>
             </a>
             <a class="k-link">
                    ProductName
             </a>
        </th>
    ```
    ```Unified-Rendering
        <!--- Default header cell --->
        <th class="k-header">
            <span class="k-cell-inner">
                <span class="k-link">
                    <span class="k-column-title"> ProductName </span>
                </span>
            </span>
        </th>

        <!--- Header cell with sorting--->
        <th class="k-header k-sorted">
            <span class="k-cell-inner">
                <span class="k-link">
                    <span class="k-column-title"> ProductName </span>
                    <span class="k-sort-icon">
                          <span class="k-icon k-i-sort-asc-small"></span>
                    </span>
                </span>
            </span>
        </th>

        <!--- Header cell with filter menu--->
        <th class="k-header k-filterable">
            <span class="k-cell-inner">
                <span class="k-link">
                    <span class="k-column-title"> ProductName </span>
                </span>
                <a href="#" class="k-grid-filter-menu k-grid-header-menu"><Icon     name="filter" /></a>
            </span>
        </th>

        <!--- Header cell with column menu--->
        <th class="k-header k-filterable">
            <span class="k-cell-inner">
                <span class="k-link">
                    <span class="k-column-title"> ProductName </span>
                </span>
                <a class="k-grid-header-menu k-grid-column-menu" href="#"><Icon     name="more-vertical" /></a>
            </span>
        </th>
    ```

* By default, the table elements inside the Grid are of medium-sized. The `.k-table-md` class is added to the `.k-table` element.
* The `.k-grid-header-table` , `.k-grid-table`, and `.k-grid-footer-table` Grid-specific classes are now added to the header, body, and footer tables.

* The Grid uses internally the Toolbar component and follows the it's accessibility specification. The ToolBar is a single tab stop component and when navigation is enabled via the `navigatable:true` configuration, pressing the `Tab` key navigates to and from the Toolbar. When the Toolbar is focused, navigating to the previous or next focusable element is achieved via the arrow keys.

### TabStrip

The `k-floatwrap` class has been removed from the TabStrip.

### ListView

* The `.k-pager-wrap` class is now removed from the `.k-pager` element.
* The `.k-listview-item` wrapper is now added to the item templates.
* The `.k-listview-item` class is now removed from the item template children.
* The `.k-item` class is now replaced with `.k-progressbar-chunk`.

### ProgressBar

* The `.k-widget` class is now removed.
* A `.k-chunk-progressbar` class has been added to the Chunk ProgressBar.
* The `.k-progressbar-chunks` class has been added to the `<ul>` element.
* An additional `.k-progressbar-value` class is now added to the `<div>` element with the `.k-selected` class in the default ProgressBar.

### CheckBox

The CheckBox is wrapped in a `<span>` element annotated with the `.k-checkbox-wrap` class.

### Notification

* The `.k-widget` class is now removed.
* The `k-notification-wrap` class has also been removed.
* The closable `<a class="k-icon k-i-close"></a>` notification icon is now replaced with a `<span>` element and the icon class `.k-i-close` name has been changed to `.k-i-x`.

    ```
    <span class="k-icon k-i-x">...</span>
    ```

* A `.k-notification-actions` container added wrapping to the closable icon.

    ```
    <span class="k-notification-actions">
        <span class="k-notification-action k-notification-close-action">
            <span class="k-icon k-i-x">...</span>
        </span>
        ...
    </span>
    ```

### Button

The `.k-button-rectangle` class is now removed.

* The **Upload** button and input are no longer nested but are on one level, wrapped inside a `<div>` element.

    ```Versions-Before-2023.1.314
        <div class="k-button k-upload-button" aria-label="Select files...">
            <input name="files" id="upload-input">
            <span>Select files...</span>
        </div>
    ```
    ```Versions-After-2023.1.314
        <div class="k-upload-button-wrap">
          <label for="upload-input"> <!-->optional element<-->
            <button class="k-upload-button k-button k-button-md k-button-solid k-button-solid-base k-rounded-md">
              <span class="k-button-text">Select files...</span>
            </button>
          </label>
          <input id="upload-input">
        </div>
    ```

* The following classes related to the Telerik UI for {{ site.framework }} Upload have been renamed:

    |Versions prior to 2023.1.314| Versions 2023.1.314 and later
    |:---   |:---
    |`k-file-group`| `k-file-icon`
    |`k-file-name-size-wrap`| `k-file-info`
    |`k-file-name-invalid`| `k-file-name`
    |`k-file-information`| `k-file-summary`
    |`k-file-group-wrapper`| `k-file-icon-wrapper`
    |`k-file-invalid-group-wrapper`| `k-file-icon-wrapper`
    |`k-multiple-files-invalid-group-wrapper`| `k-file-icon-wrapper`
    |`k-dropzone-hover`| `k-hover`
    |`k-dropzone-hovered`| `k-hover`

* The `.k-widget` class is now removed from the `.k-upload` element.
* All `<em>` and `<strong>` elements have been replaced with `span` or `<div>` elements.
* A `.k-upload-dropzone` class has been added to the `.k-dropzone` element.
* The `.k-upload-status-total` class has been removed from the `.k-upload-status` element.
* The `.k-validation-icon` class is now removed from the `.upload-status` icon.
* The `.k-file-error` class has been added to `.k-file-invalid`.
* `.k-file-single` and `.k-file-multiple` wrapper elements have been added inside the `.k-file` element for single and multiple files respectively.
* The `.k-file-name-invalid` class has been removed from the `.k-file-name` element.
* The `.k-text-success` and `.k-text-error` classes have been removed from the `.k-validation-message` element.
* The Upload action buttons are no longer wrapped in a `.k-upload-status` class but in the `.k-upload-actions` class.
* The progress bar is now replaced with the [ProgressBar](/controls/progressbar/overview) component without visible labels.

### Pager

* The `.k-widget` class is now removed from the `.k-pager` element.
* The `.k-pager-numbers` element is now a `<div>` element.
* The `<a class="k-link k-page-nav"></a>` navigation buttons have been replaced with `<button class="k-pager-nav k-button k-button-{size} k-button-flat k-button-flat-base k-icon-button">...</button>` flat buttons.
* The `<span class="k-link></span>` page numbers are now replaced with `<button class="k-button k-button-{size} k-button-flat k-button-flat-primary">...</button>` flat primary buttons.
* The `.k-link` class is now removed from the component.
* The `.k-pager-wrap` class selector is now removed.
* The `.k-pager-mobile-md` and `.k-pager-mobile-sm` classes are added when internal Pager elements are shown or hidden.

### Toolbar

* The `.k-widget` class is now removed from the `.k-toolbar` element.
* The `.k-toolbar-resizable` class is added when the Toolbar is responsive.
* The `.k-overflow-anchor` class has been replaced with the `.k-toolbar-overflow-button` class.

### Window

* The `.k-window-titleless` class is now removed.
* The `.k-window-actions` class in the title bar has been replaced with `.k-window-titlebar-actions`.
* The `.k-window-buttongroup` and `.k-window-buttons` classes are replaced with `.k-window-actions`.
* The `.k-window-titlebar-action` class is added to action buttons inside the title bar.
* The `.k-dialog-{something}` classes are removed from the component.

### Dialog

* A `.k-window` class is now added to the component.
* The `.k-dialog-actions` class in the title bar has been replaced with the `.k-dialog-titlebar-actions` class.
* The `.k-window-titlebar-action` and `.k-dialog-titlebar-action` classes have been added to the action buttons.
* The `.k-dialog-buttongroup` and `.k-dialog-buttons` classes are now replaced with `.k-dialog-actions`.
* A new `.k-dialog-{value}` theme color property has been added to the `.k-window` element. It supports the `primary`, `dark`, and `light` theme colors.

    ```
    <!-- Primary themeColor -->
    <div class="k-window k-dialog k-dialog-primary">...</div>

    <!-- Dark themeColor -->
    <div class="k-window k-dialog k-dialog-dark">...</div>

    <!-- Light themeColor -->
    <div class="k-window k-dialog k-dialog-light">...</div>
    ```

### Editor

* As of R1 2023 SP1, the Editor features an improved method to register custom tools. The main difference from the previous implementation is the substitution of the `ToolTemplate` instance with a `ui` configuration object. An example of the new approach of registering tools is available in the knowledge-base article on [creating custom Editor tools]({% slug editor-custom-tool %}).
* The Editor no longer allows the use of togglable and non-togglable buttons in the same ButtonGroup of its ToolBar. If such a configuration is present, all buttons will be rendered as simple (non-togglable) buttons.
* The `break` pseudo tool is no longer needed for separating tools from the same logical group. To display such tools separately, place them in separate arrays in the `tools` configuration:

    ```dojo
        <textarea id="editor" rows="10" cols="30" style="width:100%; height: 440px;"></textarea>
        $("#editor").kendoEditor({
            tools: [
                ["bold"],
                ["italic"],
                ["underline"],
                ["strikethrough"]
            ]
        });
    ```

    You can also group multiple tools in a group by following the same approach:

    ```dojo
        <textarea id="editor" rows="10" cols="30" style="width:100%; height: 440px;"></textarea>
        $("#editor").kendoEditor({
            tools: [
                ["bold", "italic"],
                ["underline", "strikethrough"]
            ]
        });
    ```

* The `table` element has been replaced with a `<div>` element.
* The toolbar is no longer wrapped inside the `.k-editor-toolbar-wrap` element.
* The toolbar is no longer a `<ul>` with `<li>` elements, but a [Toolbar](/controls/toolbar/overview) component.
* The `.k-editor-toolbar` class is now added to the toolbar.
* The `.k-resizable` class has been replaced with the `.k-editor-resizable` one.

### Editor Popup

* Instead of the Dialog component, all Editor popups now use the [Window]({% slug overview_kendoui_window_widget %}).
* The `.k-editor-window` has been added to all popups.
* All inputs in popups have been replaced with the TextBox, NumericTextBox, and other respective components.
* Instead of the `.k-edit-form-container`, `.k-edit-form-content`, `.k-edit-label classes`, and similar classe, the Form component is now used inside the popups.
* Action buttons have been moved outside the form.
* The `.k-editor-table-wizard-dialog` class has been replaced with the `.k-editor-table-wizard-window` class.

### Calendar and MultiViewCalendar

* The text of the title buttons is now wrapped in a `<span>` element with the `.k-button-text` class.
* The navigation classes have been replaced as follows:

    ```
    k-nav-today k-calendar-nav-today
    k-nav-prev k-calendar-nav-prev
    k-nav-next k-calendar-nav-next
    k-nav-fast k-calendar-nav-today
    k-prev-view k-calendar-nav-prev
    k-next-view k-calendar-nav-next
    ```


## Kendo UI 2023 R1

### ToolBar

* As of the R1 2023 release, the tools in the ToolBar are actual component instances instead of ToolBar items. As a result, the `click` and `toggle` event argument objects no longer hold a reference to the ToolBar item (`e.item`). From that release on, the component instance of the tool can be taken by using the `kendo.widgetInstance()` method. When rendered in the `OverflowMenu` or the popup of a DropDownButton or a SplitButton those tools are menu items. Hence, they are not Kendo UI controls. A reference to the jQuery elements is still available in those cases in the `e.target` event argument.

    ```html
        <div id="toolbar"></div>
        <script>
            $("#toolbar").kendoToolBar({
                items: [
                    { type: "button", id: "btn1", text: "Button 1", togglable: true },
                    { type: "button", id: "btn2", text: "Button 2" }
                ],
                click: function(e) {
                    console.log("click:");
                    console.log(kendo.widgetInstance(e.target));
                },
                toggle: function(e) {
                    console.log("toggle: ", e.checked);
                    console.log(kendo.widgetInstance(e.target));
                }
            });
        </script>
    ```

* The ToolBar buttons will always be rendered as `<button>` elements (instead of `<a>`) unless they have a `url` configured in their options. If a `url` is present, those will be rendered as links (`<a>`).
* The ToolBar no longer requires you to register its custom tools. To explore the new simplified way of defining custom tools in the ToolBar, refer to the article about the [custom tools of the ToolBar]({% slug custom_tools_kendoui_toolbar %}).
* The ToolBar won't allow you to use togglable and non-togglable buttons in the same ButtonGroup. If such a configuration is present, all buttons will be rendered and behave as simple (non-togglable) buttons.
* The ToolBar **Overflow** menu will open upon each of its button clicks. That is the behavior of the ContextMenu component used in that scenario.

