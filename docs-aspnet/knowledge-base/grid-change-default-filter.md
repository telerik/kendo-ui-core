---
title: Setting the Default Search Filter in Telerik UI Grid
description: Learn how to change the default search filter from 'Equal To' to 'Contains' in the Grid.
type: how-to
page_title: How to Change Default Filter Operator in Telerik UI Grid
slug: grid-change-default-filter
tags: grid, asp.net core, search, filter, default, contains, equal to
res_type: kb
---

## Description

When selecting a search filter in the Grid, it defaults to 'Equal To'. I want to change the default to 'Contains'. This KB article also answers the following questions:
- How can I set 'Contains' as the default search filter in the Grid?
- Is it possible to change the default search filter from 'Equal To' to 'Contains'?
- What steps should I follow to modify the default search filter behavior in the Grid?

## Solution

To change the default search filter from 'Equal To' to 'Contains', use the Grid's [FilterMenuOpen](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuopen) event. In the event handler, implement a delay to ensure the filter popup has opened. Then, for the desired field (e.g., "ShipName"), find the Operator DropDownList and select the 'Contains' option. Finally, trigger the DropDownList's [Change](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change) event.

Below is an example demonstrating this approach:

1. Define the Grid with the `FilterMenuOpen` Event:

```C#
.Events(e => e.FilterMenuOpen("onFilterMenuOpen"))
```

{% if site.core %}
```TagHelper
<kendo-grid name="grid" on-filter-menu-open="onFilterMenuOpen">
</kendo-grid>
```
{% endif %}

1. Add the event handler function:

```javascript
function onFilterMenuOpen(e) {
    if (e.field === "ShipName") {
        setTimeout(function () {
            var operatorDropDown = $(e.container).find("[data-role='dropdownlist']").first().data("kendoDropDownList");
            operatorDropDown.select(3); // Index of 'Contains' option
            operatorDropDown.trigger("change");
        }, 100); 
    }
}
```

This method ensures that whenever the filter menu opens for the specified field, 'Contains' will be the default search filter.

## See Also

- [Grid FilterMenuOpen Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuopen)
- [DropDownList Select Method Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/methods/select)
- [DropDownList Change Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/events/change)
- [Grid Overview](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/overview)