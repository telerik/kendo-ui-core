---
title: Editable Grid Removes Milliseconds from DateTime Fields
description: During edit the Grid removes the milliseconds portion from DateTime fields
type: troubleshooting
page_title: Grid Clears Milliseconds from DateTime Fields When Editing Records
slug: grid-persist-milliseconds-during-edit
tags: grid, editing
ticketid: 1142164
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
</table>


## Description

When editing an MVC Grid, the model that is sent to the server upon clicking Update has the milliseconds reset to zero for date fields that previously had their milliseconds set to a non-zero value.

## Steps to Reproduce

1. Bind a Grid column to a `DateTime` field, which has milliseconds explicitly set to a value different than 0.
2. Edit the Grid and save the changes.

The DateTime values are sent to the server with milliseconds reset to 0, even if the given field was not edited.

## Cause

The reason for this behavior is that the date objects are serialized using a `"g"` (general) date format that does not include the milliseconds value.

## Solution

To fix this, the default date serialization should be overridden before the request is sent to the server. To do this, add a `Data` function to the DataSource `Update` request configuration, where you can process dates before they are sent out:

```
    .Update(update => update.Action("Products_Update", "Grid").Data("serializeDates"))
``` 

```
    function serializeDates(data) {
        for (var field in data) {
            if (data[field] instanceof Date) {
                data[field] = kendo.toString(data[field], "yyyy-MM-ddTHH:mm:ss.fffZ");
            }
        }
    }
```
