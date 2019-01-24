---
title: Hover Effect on Table Rows
page_title: jQuery Grid Documentation | Hover Effect on Table Rows | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to modify the hover effect on the rows of the widget."
slug: rows_hover_kendoui_grid_widget
position: 6
---

# Hover Effect on Table Rows

As of the Kendo UI Q1 2016 release, all Kendo UI themes now feature styles for row hovering.

Hover is a useful UI state which provides better visualization across long table rows and when the Grid is in editing mode.

However, if your project requires you to avoid the `hover` state, use either of the following approaches:

* Open the Kendo UI theme CSS file (for example, `kendo.default.min.css`) and remove the following CSS rule.

  ###### Example

      ```
      .k-grid tr:hover {
          /* ...background styles here... */
        }
      ```

* Override the `hover` styling by using the CSS code from the following example. The `#f1f1f1` value corresponds to the background color of the `.k-alt` table rows. To find the correct value for the Kendo UI theme that you are applying, use the DOM inspector of the browser. Alternatively, set a background color value of your preference.

  ###### Example

    ```
    .k-grid tr:not(.k-state-selected):hover {
        background: none;
        color: inherit;
    }

    .k-grid tr.k-alt:not(.k-state-selected):hover {
        background: #f1f1f1;
    }
    ```

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
