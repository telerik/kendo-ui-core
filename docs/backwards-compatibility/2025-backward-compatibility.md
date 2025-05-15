---
title: 2025 Releases
page_title: 2025 Releases - Kendo UI Backwards Compatibility
description: "Learn about the breaking changes and backwards compatibility released by Kendo UI in 2024."
slug: breakingchanges2025_kendoui
position: 0
---

# 2025 Releases


This article lists the breaking or important changes in the 2025 releases of Kendo UI. For the complete list of changes in the UI components, see the [product release history](https://www.telerik.com/support/whats-new/kendo-ui/release-history).

## Kendo UI 2024 Q2

**Pager**

Starting with Q2 2025, the Pager provides an adaptive mode that enhances its responsive behavior and optimizes the user experience on different screen sizes.

The adaptive mode introduces several notable changes to the default Pager behavior:

* **Input Behavior Change**: When the [`input`](/api/javascript/ui/pager/configuration/input) option is set to `true`, the Pager now renders a NumericTextBox in place of numerical buttons for pages, rather than displaying a textbox next to the arrow buttons.

* **No Numeric Buttons**: When `input` is `true`, numerical page buttons are not rendered at all.

* **Page Selection Dropdown Replacement**: The dropdown for selecting a page is replaced with a NumericTextBox.

* **Removal of `numbersSelectLabel` Property**: This property has been removed as the select element is no longer used.