---
title: 2025 Releases
page_title: 2025 Releases - Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2024."
slug: breakingchanges2025_kendoui
position: 0
---

# 2025 Releases


This article lists the breaking or important changes in the 2025 releases of Kendo UI. For the complete list of changes in the UI components, see the [product release history](https://www.telerik.com/support/whats-new/kendo-ui/release-history).

## Kendo UI 2025 Q3

**AIPrompt**

* The **showOutputRating** property is deprecated as there is now **outputActions** configuration option that is more flexible.

* The **outputRatingChange** event is deprecated. Use **outputAction** event instead.

* The **outputCopy** event is deprecated. Use **outputAction** event instead.

* The `k-prompt-suggestion` class on the `role='listitem'` element has been replaced with the `k-suggestion` class.

## Kendo UI 2025 Q2

**Pager**

Starting with Q2 2025, the Pager provides an adaptive mode that enhances its responsive behavior and optimizes the user experience on different screen sizes.

The adaptive mode introduces several notable changes to the default Pager behavior:

* **Input Behavior Change**: When the [`input`](/api/javascript/ui/pager/configuration/input) option is set to `true`, the Pager now renders a NumericTextBox in place of numerical buttons for pages, rather than displaying a textbox next to the arrow buttons.

* **No Numeric Buttons**: When `input` is `true`, numerical page buttons are not rendered at all.

* **Page Selection Dropdown Replacement**: The dropdown for selecting a page is replaced with a NumericTextBox.

* **Removal of `numbersSelectLabel` Property**: This property has been removed as the select element is no longer used.


### Rendering Changes

The Kendo UI for jQuery 2025 Q2 release introduces changes in the rendering of a number of components.

**AIPrompt**

* The `k-white-space-pre-line` class has been removed from the `k-card-body` element where the output from the prompt is rendered.

**DockManager**

* The `k-header` class has been removed from the TabStrip element. 

**ExpansionPanel**

* The `k-d-none` class on the `k-expander-content-wrapper` element has been replaced with the `k-hidden` class.

**Gantt**

* The `k-alt` class has been removed from the rows in the TreeList and the timeline in the Gantt.

**Grid**

* The `k-alt` class has been removed from the `tr.k-table-alt-row` elements.
* The `k-grid-draggable-header` class and the `draggable=true` attribute have been added to the `k-grid-header` element when grouping or column reodering is enabled.
* The `k-touch-action-none` class has been removed from the draggable cell elements due to the addition of the `k-grid-draggable-header`.
* The `k-drag-cell` class (when row-reordering is enabled) has been removed from the `k-table-th` element.

**Spreadsheet**

* The `k-tabstrip-item` class has been added to the `k-item` elements in the sheet bar.

**TreeList**

* The `k-treelist-group` class has been removed from the parent nodes. 
* The `k-drag-cell` class (in row-reordering scenario) has been removed. 


