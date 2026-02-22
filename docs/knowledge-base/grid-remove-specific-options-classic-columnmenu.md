---
title: Removing Specific Options from Grid's Classic ColumnMenu
description: Learn how to remove certain options such as 'Group column' and 'Set column position' from the Grid's classic columnMenu implementation.
type: how-to
page_title: Remove Specific Options from Grid's Classic ColumnMenu
slug: grid-remove-specific-options-classic-columnmenu
tags: grid, columnmenu, options, classic, remove
res_type: kb
components: ["grid"]
---
## Environment
| Product | Version |
|---------|---------|
| Progress® Kendo UI® Grid for jQuery | 2024.1.130 |

## Description
I want to remove specific options from the Grid's classic columnMenu without using CSS. Specifically, I would like to remove the 'Group column' and 'Set column position' options.

## Solution
To achieve this, you can use jQuery during the [columnMenuInit event](/api/javascript/ui/grid/events/columnmenuinit) to remove the desired options. Here's an example of how to do it:

```javascript
$("#grid").kendoGrid({
    columnMenuInit: function(e){
        // hide group, ungroup, setPosition options, and last separator
        var groupOption = $(e.container).find("li.k-menu-item.k-group");
        $(groupOption).css("display", "none");
        var ungroupOption = $(e.container).find("li.k-menu-item.k-ungroup");
        $(ungroupOption).css("display", "none");
        var positionOption = $(e.container).find(".k-position-item");
        $(positionOption).css("display", "none");
        var lastSeparator = $(e.container).find("li.k-separator").last();
        $(lastSeparator).css("display", "none");
    },
    // other grid configurations
});
```

Please refer to the [Progress Kendo UI Dojo](https://dojo.telerik.com/uxotEjoD) for a working example of this solution.
