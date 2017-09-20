---
title: Editing Complex Objects in Kendo UI Grid is Broken in R3 2017 (2017.3.913 Version)
description: Kendo UI Grid thrown an error while editing a column bound to a nested property 
type: troubleshooting
page_title: Editing complex object with Batch (InCell) edit mode throws an error with R3 2017 release
slug: grid-batch-r3-2017
ticketid:
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

After upgrading to R3 2017 (version 2017.3.913), editing complex objects and their nested properties in Batch (InCell) edit mode throws an error 

## Error Message

`Uncaught TypeError: Cannot read property 'nestedFieldName' of undefined`


## Workaround

Override the following private methods:

````
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
````

An example with the above override could be found at the following link:
[http://dojo.telerik.com/aFEjIN](http://dojo.telerik.com/aFEjIN)
