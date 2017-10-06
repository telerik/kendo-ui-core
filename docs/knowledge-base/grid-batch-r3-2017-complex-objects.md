---
title: Editing Complex Objects in Grid Is Broken in 2017.3.913
description: The Kendo UI Grid throws an error while editing a column which is bound to a nested property in the R3 2017 (2017.3.913 version) release.
type: troubleshooting
page_title: Editing Complex Objects with Batch Edit Mode Throws an Error in the R3 2017 Release | Kendo UI Grid
slug: grid-batch-r3-2017-complex-objects
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

After I upgraded Kendo UI to the R3 2017 (2017.3.913 version) release, I am not able to edit complex objects and their nested properties in Batch (InCell) edit mode.

How can I edit complex objects in the Grid and avoid the `Uncaught TypeError: Cannot read property 'nestedFieldName' of undefined` error in the R3 2017 release?

## Suggested Workaround

Override the following private methods:

```
kendo.ui.Grid.fn._dirtyIndicatorTemplate = function(field, paramName) {
    if (field && paramName) {
        return "#= " + paramName + " && " + paramName + ".dirty && " +
            paramName + ".dirtyFields && " + paramName + ".dirtyFields['" + field + "'] ? '<span class=\"k-dirty\"></span>' : '' #";
    }

    return "";
}

   kendo.ui.Grid.fn._dirtyCellTemplate = function(field, paramName) {
    if (field && paramName) {
        return "#= " + paramName + " && " + paramName + ".dirty && " +
            paramName + ".dirtyFields && " + paramName + ".dirtyFields['" + field + "'] ? ' k-dirty-cell' : '' #";
    }

    return "";
}
```

For the complete implementation, refer to [this Dojo example](http://dojo.telerik.com/aFEjIN).
