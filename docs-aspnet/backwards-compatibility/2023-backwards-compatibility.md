---
title: 2023 Releases
page_title: 2023 Releases
description: "Learn about the breaking changes and backwards compatibility released by {{ site.product }} in 2023."
slug: breakingchanges_2023
position: 1
---

# 2023 Releases

This article lists the breaking or important changes in the 2023 releases of {{ site.product }}.

## {{ site.product }} R3 2023

> Important change

**Web Font Icons**

As of the 2023 R3 release, the font icons have been detached from the [Kendo UI Themes CDN]({% slug cdnservices_core %}) and have been extracted to a separate package. To continue using the font icons, reference the following stylesheet into your application:

```
    <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />
```

The font icons are also available as an NPM package. For more information on how to install the NPM package, refer to the following [documentation](https://www.telerik.com/design-system/docs/foundation/iconography/font-icons/#usage).

## {{ site.product }} R1 2023 SP2 

**FloatingActionButton**

As part of the rendering unification of the components: 

* The `Shape` configuration option and the `shape` API method are now removed.
* The element with class `k-fab-items` is moved inside the element with class `k-fab-popup`.

## {{ site.product }} R1 2023 SP1

Drop of the development and support of the LESS themes. 

As of the 2023 R1 SP1 release, to unify their support for the new [ThemeBuilder Pro](https://docs.telerik.com/themebuilder/introduction), the following components have changed their rendering:

* [Grid]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [FileManager]({% slug  htmlhelpers_filemanager_aspnetcore_overview %})
* [TreeList]({% slug htmlhelpers_treelist_aspnetcore %})
* [Gantt]({% slug htmlhelpers_gantt_aspnetcore %})
* [PivotGrid]({% slug overview_pivotgridhelper_aspnetcore %})
* [ListView]({% slug htmlhelpers_listview_aspnetcore %})
* [ProgressBar]({% slug htmlhelpers_progressbar_aspnetcore %})
* [Notification]({% slug htmlhelpers_notification_aspnetcore %})
* [Upload]({% slug htmlhelpers_upload_aspnetcore %})
* [Pager]({% slug htmlhelpers_pager_aspnet_overview %})
* [Toolbar]({% slug htmlhelpers_toolbar_aspnetcore %})
* [Window]({% slug htmlhelpers_window_aspnetcore %})
* [Editor]({% slug htmlhelpers_editor_aspnetcore %})

**Grid**

> All rendering changes in the Grid are also applied to the FileManager, TreeList, Gantt, and PivotGrid as these components use the Grid internally.

* Except for the popups, the sizing option now propagates to all elements inside the Grid. These include the table, toolbar, pager, buttons, inputs, pickers, chip lists, and more.
* The `.k-widget` class is now removed from the `.k-grid` element.
* The sorting icons will be replaced with their `.k-i-sort-asc-small` and  `.k-i-sort-desc-small` general names instead of their `.k-i-sort-asc-sm` and `.k-i-sort-desc-sm` aliases.
* The sorting icon is now wrapped in a `<span>` element:

  ```
  <span class="k-sort-icon">
        <span class="k-icon k-i-sort-asc-small"></span>
  </span>
  ```

* The headings of the Grid are now updated with the new header rendering:

    ```
    <!--- Default header cell --->
    <th class="k-header">
        <span class="k-cell-inner">
            <span class="k-link">
                <span class="k-column-title"> ProductName </span>
            </span>
        </span>
    </th>

    <!--- Header cell with sorting--->
    <th class="k-header k-filterable">
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
            <a href="#" class="k-grid-filter-menu k-grid-header-menu"><Icon name="filter" /></a>
        </span>
    </th>

    <!--- Header cell with column menu--->
    <th class="k-header k-filterable">
        <span class="k-cell-inner">
            <span class="k-link">
                <span class="k-column-title"> ProductName </span>
            </span>
            <a class="k-grid-header-menu k-grid-column-menu" href="#"><Icon name="more-vertical" /></a>
        </span>
    </th>
    ```

* The `.k-table`, `.k-table-row`, `.k-table-thead`, `.k-table-tbody`, `.k-table-tfoot`, `.k-table-th`, `.k-table-td`, and `.k-table-group-row` table-specific classes are now added to the Grid.
* By default, the table elements inside the Grid are of medium-sized. The `.k-table-md` class is added to the `.k-table` element.
* The `.k-grid-header-table` , `.k-grid-table`, and `.k-grid-footer-table` Grid-specific classes are now added to the header, body, and footer tables.
* The `alt` rows now have the `.k-table-alt-row` class.

> Important change

* The Grid uses internally the Toolbar component and follows the it's accessibility specification. The ToolBar is a single tab stop component and when the `Navigatable()` option is enabled, pressing the `Tab` key navigates to and from the Toolbar. When focused, navigating to the previous or next focusable element is achieved via the arrow keys.

**ListView**

* The `.k-pager-wrap` class is now removed from the `.k-pager` element.
* The `.k-listview-item` wrapper is now added to the item templates.
* The `.k-listview-item` class is now removed from the item template children.
* The `.k-item` class is now replaced with `.k-progressbar-chunk`.

**ProgressBar**

* The `.k-widget` class is now removed.
* A `.k-chunk-progressbar` class has been added to the Chunk ProgressBar.
* The `.k-progressbar-chunks` class has been added to the `<ul>` element.
* An additional `.k-progressbar-value` class is now added to the `<div>` element with the `.k-selected` class in the default ProgressBar.

**Notification**

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

**Upload**

* The `.k-widget` class is now removed from the `.k-upload` element.
* All `<em>` and `<strong>` elements have been replaced with `span` or `<div>` elements.
* A `.k-upload-dropzone` class has been added to the `.k-dropzone` element.
* The `k-dropzone-hover` and `.k-dropzone-hovered` classes are now replaced with the `.k-hover` class.
* The **Upload** button and input are no longer nested but are on one level, wrapped inside a `<div>` element.

    ```
       <div class="k-upload-button-wrap">
          <label for="upload-input"> <!-->optional element<-->
            <button class="k-upload-button k-button k-button-md k-button-solid k-button-solid-base k-rounded-md">
              <span class="k-button-text">Select files...</span>
            </button>
          </label>
          <input id="upload-input">
        </div>
    ```

* The `.k-upload-status-total` class has been removed from the `.k-upload-status` element.
* The `.k-validation-icon` class is now removed from the `.upload-status` icon.
* The `.k-file-error` class has been added to `.k-file-invalid`.
* `.k-file-single` and `.k-file-multiple` wrapper elements have been added inside the `.k-file` element for single and multiple files respectively.
* The `.k-file-group-wrapper`, `.k-file-invalid-group-wrapper`, `.k-multiple-files-group-wrapperand`, and  `.k-multiple-files-invalid-group-wrapper` classes are now replaced with `.k-file-icon-wrapper`.
* The `.k-file-group` icon class is now replaced with the `.k-file-icon` class.
* The `.k-file-name-size-wrap` class is now replaced with the `.k-file-info` class.
* The `.k-file-name-invalid` class has been removed from the `.k-file-name` element.
* The `.k-text-success` and `.k-text-error` classes have been removed from the `.k-validation-message` element.
* The `.k-file-information` class is now replaced with a `.k-file-summary` class.
* The Upload action buttons are no longer wrapped in a `.k-upload-status` class but in the `.k-upload-actions` class.
* The progress bar is now replaced with the [ProgressBar]({% slug htmlhelpers_progressbar_aspnetcore %}) component without visible labels.

**Pager**

* The `.k-widget` class is now removed from the `.k-pager` element.
* The `.k-pager-numbers` element is now a `<div>` element.
* The `<a class="k-link k-page-nav"></a>` navigation buttons have been replaced with `<button class="k-pager-nav k-button k-button-{size} k-button-flat k-button-flat-base k-icon-button">...</button>` flat buttons.
* The `<span class="k-link></span>` page numbers are now replaced with `<button class="k-button k-button-{size} k-button-flat k-button-flat-primary">...</button>` flat primary buttons.
* The `.k-link` class is now removed from the component.
* The `.k-pager-wrap` class selector is now removed.
* The `.k-pager-mobile-md` and `.k-pager-mobile-sm` classes are added when internal Pager elements are shown or hidden.

**Toolbar**

* The `.k-widget` class is now removed from the `.k-toolbar` element.
* The `.k-toolbar-resizable` class is added when the Toolbar is responsive.
* The `.k-overflow-anchor` class has been replaced with the `.k-toolbar-overflow-button` class.

**Window**

* The `.k-window-titleless` class is now removed.
* The `.k-window-actions` class in the title bar has been replaced with `.k-window-titlebar-actions`.
* The `.k-window-buttongroup` and `.k-window-buttons` classes are replaced with `.k-window-actions`.
* The `.k-window-titlebar-action` class is added to action buttons inside the title bar.
* The `.k-dialog-{something}` classes are removed from the component.

**Dialog**

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

**Editor**

Rendering changes:

* The `table` element has been replaced with a `<div>` element.
* The toolbar is no longer wrapped inside the `.k-editor-toolbar-wrap` element.
* The toolbar is no longer a `<ul>` with `<li>` elements, but a [Toolbar]({% slug htmlhelpers_toolbar_aspnetcore %}) component.
* The `.k-editor-toolbar` class is now added to the toolbar.
* The `.k-resizable` class has been replaced with the `.k-editor-resizable` one.

Functional changes:

* The Editor no longer allows the use of togglable and non-togglable buttons in the same ButtonGroup of its ToolBar. If such a configuration is present, all buttons will be rendered as simple (non-togglable) buttons.

**Editor Popup**

* Instead of the Dialog component, all Editor popups now use the [Window]({% slug htmlhelpers_window_aspnetcore %}) component.
* The `.k-editor-window` has been added to all popups.
* All inputs in popups have been replaced with the TextBox, NumericTextBox, and other respective components.
* Instead of the `.k-edit-form-container`, `.k-edit-form-content`, `.k-edit-label classes`, and similar classe, the Form component is now used inside the popups.
* Action buttons have been moved outside the form.
* The `.k-editor-table-wizard-dialog` class has been replaced with the `.k-editor-table-wizard-window` class.

## {{ site.product }} R1 2023

**Telerik.Web.PDF**

As of the R1 2023 release, the `Load` method of the `Telerik.Web.PDF` assembly is obsolete. The method was used to read from the file system. For security reasons, loading options should be limited to `byte[]` and `Stream`. As of R1 2023, the developers are responsible for reading from the file system and passing a stream to the loaded document.

**ToolBar**

* The tools in the ToolBar are actual component instances instead of ToolBar items. As a result, the `click` and `toggle` event argument objects no longer hold a reference to the ToolBar item (`e.item`). From that release on, the component instance of the tool can be taken by using the `kendo.widgetInstance()` method. When rendered in the `OverflowMenu` or the popup of a DropDownButton or a SplitButton those tools are menu items. Hence, they are not Kendo UI controls. A reference to the jQuery elements is still available in those cases in the `e.target` event argument in the ToolBar's `Click` and `Toggle` event handlers.

    ```html
        <script>
            function onClick(e) {
                console.log("click:");
                console.log(kendo.widgetInstance(e.target));
            }
            
            function onToggle(e) {
                console.log("toggle: ", e.checked);
                console.log(kendo.widgetInstance(e.target));
            }
        </script>
    ```

* The ToolBar buttons will always be rendered as `<button>` elements (instead of `<a>`) unless they have a `url` configured in their options. If a `url` is present, those will be rendered as links (`<a>`).
* The ToolBar won't allow you to use togglable and non-togglable buttons in the same ButtonGroup. If such a configuration is present, all buttons will be rendered and behave as simple (non-togglable) buttons.
* The ToolBar **Overflow** menu will open upon each of its button clicks. That is the behavior of the ContextMenu component used in that scenario.
