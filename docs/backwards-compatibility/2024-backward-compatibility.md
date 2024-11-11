---
title: 2024 Releases
page_title: 2024 Releases - Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2024."
slug: breakingchanges2024_kendoui
position: 0
---

# 2024 Releases


This article lists the breaking or important changes in the 2024 releases of Kendo UI. For the complete list of changes in the UI components, see the [product release history](https://www.telerik.com/support/whats-new/kendo-ui/release-history).

## Kendo UI 2024 Q4

**Separating the Utilities Classes from the Kendo Themes**

Starting with Kendo UI 2024 Q4 release and 9.0.0 version of the Kendo Themes, the Utililities classes, which allow you to customize the layout of the components, are now distributed in a separate package - `kendo-theme-utils`. You can find more information about the Utilities and how to add the package in the [Progress Design System Kit](https://www.telerik.com/design-system/docs/utils/get-started/introduction/).

**AIPrompt**

* The `k-button-flat-primary` class is now replaced with `k-button-flat-base` class.

**ContextMenu**

* The `k-widget` class is now removed.
* The `k-menu-expand-arrow-icon` class has also been removed.

**ImageEditor**

* The `k-widget` class is now removed.
* The `k-imageeditor-pane-confirm-button` and `k-imageeditor-pane-button` classes have been removed from the resize/crop pane buttons.
* The `k-colspan-1` class is removed from the `k-col-span-1` element.
* The `k-colspan-2` class is removed from the `k-col-span-2` element.


**Map**

* The following classes have been substituted:

|Versions prior to 2024 Q4| Versions 2024 Q4 and later
|:---   |:---
|`k-navigator-up`| `k-navigator-n` |
|`k-navigator-right`| `k-navigator-e` |
|`k-navigator-down`| `k-navigator-s` |
|`k-navigator-left`| `k-navigator-w` |

* The `k-widget` class is now removed.
* The `km-widget` class has also been removed.


**Menu**

* The `k-vertical` class is removed from the scroll wrapper when the Menu is scrollable.
* The `k-horizontal` class is removed from the scroll wrapper when the Menu is scrollable.
* The `k-widget` is now removed.
* The `k-menu-expand-arrow-icon` is now removed.
* The `k-group` class has also been removed.

**ToolBar**

* The following classes have been replaced or removed:

|Versions prior to 2024 Q4| Versions 2024 Q4 and later
|:---   |:---
|`k-toolbar-tool`| `[data-item-role='toolbar-tool']`

* The `k-toolbar-toggle-button` class has been removed.
* The `k-dropdown-button` class has also been removed.


This change is applied to all components that use the Toolbar internally, such as Grid, Gantt, Scheduler, etc.

**Scheduler**

* The following classes are substituted as follows:

|Versions prior to 2024 Q4| Versions 2024 Q4 and later
|:---   |:---
|`k-nav-today`| `[data-selector='today']`
|`k-nav-prev`| `[data-selector='previous']`
|`k-nav-next`| `[data-selector='next']`
|`k-view-month`| `[data-selector='month']`
|`k-view-week`| `[data-selector='week']`
|`k-view-day`| `[data-selector='day']`
|`k-view-agenda`| `[data-selector='agenda']`
|`k-view-timeline`| `[data-selector='timeline']`  
|`k-svg-i-arrow-left`| `k-i-caret-alt-left`
|`k-svg-i-arrow-right`| `k-i-caret-alt-right`

* The `k-button-rectangle` is removed from the buttons in views ButtonGroup.
* The`k-heading-cell` is removed from the Scheduler first column. 
* The `k-scheduler-table-auto` is removed from the Month view.
* The `k-scheduler-group-cell` is removed from grouped Scheduler.

**Splitter**

The Splitter has received a rendering update. As a result, the below classes have been added:

* New `k-splitter-flex` and `k-splitter-vertical/horizontal` classes have been added to the `k-splitter` root `div` element.
* New `k-pane-static` class has been added to the non-resizable panes.
* New `k-hidden` class has been added to the collapsed panes.

Apart from that, we made changes in the positioning styles of the component. Until now, the panes had the `position:absolute` style. As of the 2024 Q4 release, the panes are positioned using flexbox.

**PDFViewer**

The PDFViewer starts using the [Pager](https://docs.telerik.com/kendo-ui/controls/pager/overview) component internally and follows its specification. 

**PivotGridV2**

The following classes are now removed:

* The `k-pivotgrid-header-total` class rendered in the total row of PivotGrid aggregates is replaced by `k-pivotgrid-total`.
* The `k-grid-header-table` class is now removed.
* The `k-table-md` class is removed from the `.k-pivotgrid-table` tables.
* The `k-table-tbody` has been removed from the `.k-pivotgrid-tbody` elements.
* The `k-table-row` class is now removed from the `.k-pivotgrid-row` elements.
* The `k-grid-table` class has been removed from the `.k-pivotgrid-table` values table.
* The `k-table-th` has been removed from the `th.k-pivotgrid-cell` elements. 
* The `k-table-td` has been removed from the `td.k-pivotgrid-cell` elements. 
* The `k-pos-relative` and `k-widget` classes are now removed from the Configurator.
* The `k-rounded-full` class is substituted by `k-round-md`.

**TreeList**

* The `k-i-none` class has been replaced with `ref-blank-icon` attribute.
* The `k-grid-display-block` class is now removed from `.k-treelist` element.

## Kendo UI 2024 Q2

**TreeView**

The following classes are now removed or replaced:

* The `k-group` class has been removed from the `ul.k-treeview-group.k-treeview-lines` element.
* The `k-first`, `k-last`, and `k-item` classes have been removed from the `li.k-treeview-item` element.
* The `k-in` class has been removed from the `span.k-treeview-leaf` element.
* The `k-toggle-icon` class has been removed from the toggle arrows.
* The `k-checkbox-wrapper` class has been replaced with `k-checkbox-wrap` class.

