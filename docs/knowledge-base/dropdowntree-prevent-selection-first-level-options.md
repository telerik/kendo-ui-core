---
title: Preventing Selection of First Level Options in DropDownTree
description: Learn how to prevent the selection of first level options in a DropDownTree with checkboxes.
type: how-to
page_title: Preventing Selection of First Level Options in DropDownTree | Kendo UI DropDownTree 
slug: dropdowntree-prevent-selection-first-level-options
tags: dropdowntree, checkboxes, selection, first level
res_type: kb
---
# Environment
| Product | Version |
|---------|---------|
| DropDownTree for Progress® Kendo UI® | 2023.3.1114 |

# Description
I want to prevent the user from selecting the first level options in a DropDownTree with checkboxes. How can I achieve this?

# Solution
To prevent the selection of first level options in a DropDownTree with checkboxes, follow these steps:

1. Add a [select event](/api/javascript/ui/dropdowntree/events/select) handler to the DropDownTree. In the event handler, check the number of `ul` parents of the selected node. If there is only one `ul` element, prevent the selection of the item.

```javascript
$("#dropdowntree").kendoDropDownTree({
  select: function(e) {
    var ulParents = $(e.node).parents("ul").length;
    if (ulParents <= 1) {
      e.preventDefault();
    }
  },
  // other configuration options
});
```

2. Define the [checkboxes.template](/api/javascript/ui/dropdowntree/configuration/checkboxes.template) using a function. In the function, check if the item is on the root level. If it is, hide the checkbox; otherwise, define the checkbox element according to your preference.

```javascript
$("#dropdowntree").kendoDropDownTree({
  checkboxes: {
    template: function(e) {
      if (e.group.firstLevel == true) {
        return "";
      } else {
        return "<input class='k-checkbox-md k-rounded-md k-checkbox' type='checkbox' name='" + kendo.guid() + "' value='true' aria-hidden='true' tabindex='-1' />";
      }
    }
  },
  // other configuration options
});
```

Please refer to the [Progress Kendo UI Dojo](https://dojo.telerik.com/EJuWuwaB) for a live example demonstrating the above solution.

# See Also
- [DropDownTree Documentation](/api/javascript/ui/dropdowntree)
