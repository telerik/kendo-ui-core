---
title: Adaptive Mode
page_title: jQuery Pager Documentation - Adaptive Mode
description: "Learn about the adaptive mode of the jQuery Pager by Kendo UI and how it enhances the responsive behavior of the component."
slug: adaptivemode_kendoui_pager_widget
---

# Adaptive Mode

Starting with Q2 2025, the Pager provides an adaptive mode that enhances its responsive behavior and optimizes the user experience on different screen sizes.

The adaptive mode is an enhancement to the default [`responsive behavior`]({% slug responsive_kendoui_pager_widget %}) of the Pager. When enabled, it provides a more streamlined interface when the available space is limited.

To enable the adaptive mode, set the `adaptiveMode` option to `true`:

```dojo
<div id="pager"></div>

<script>
    var dataSource = new kendo.data.DataSource({
        data: [
            { id: 1, name: "Item 1" },
            { id: 2, name: "Item 2" },
            { id: 3, name: "Item 3" },
            { id: 4, name: "Item 4" },
            { id: 5, name: "Item 5" },
            { id: 6, name: "Item 6" },
            { id: 7, name: "Item 7" },
            { id: 8, name: "Item 8" },
            { id: 9, name: "Item 9" },
            { id: 10, name: "Item 10" }
        ],
        pageSize: 2
    });

    $("#pager").kendoPager({
        dataSource: dataSource,
        adaptiveMode: true,
        pageSizes: [2, 5, 10, "all"]
    });

    dataSource.read();
</script>
```

For details on related breaking changes introduced in this release, refer to the [Breaking Changes in 2025 Releases article](({% slug breakingchanges2025_kendoui %})).

## Responsive vs. Adaptive Mode

While the standard [responsive behavior]({% slug responsive_kendoui_pager_widget %}) of the Pager uses specific breakpoints to determine which elements to show or hide, the adaptive mode takes a different approach:

* The adaptive mode emphasizes optimizing available space without relying solely on fixed breakpoints.
* When space is limited, UI elements transform to more compact alternatives (like NumericTextBox replacing page buttons).
* The adaptive mode prioritizes usability in constrained spaces while maintaining all essential pagination functionality.

## See Also

* [JavaScript API Reference of the Pager](/api/javascript/ui/pager)
* [Responsive Pager]({% slug responsive_kendoui_pager_widget %})
* [Pager Settings and Types]({% slug settings_kendoui_pager_widget %})
* [Pager Templates]({% slug templates_kendoui_pager_widget %})
