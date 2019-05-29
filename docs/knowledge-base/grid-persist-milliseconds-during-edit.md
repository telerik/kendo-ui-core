---
title: Editable Grid Removes Milliseconds from DateTime Fields
description: During editing, the Kendo UI Grid removes the milliseconds portion from the DateTime fields.
type: troubleshooting
page_title: Grid Clears Milliseconds from DateTime Fields When Editing Records | Kendo UI Grid for ASP.NET MVC
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

When editing a Kendo UI Grid for ASP.NET MVC, the model that is sent to the server upon clicking **Update** has the milliseconds reset to zero for date fields which previously had their milliseconds set to a non-zero value.

## Steps to Reproduce

1. Bind a Grid column to a `DateTime` field which has milliseconds explicitly set to a value different from zero.
2. Edit the Grid and save the changes.

The `DateTime` values are sent to the server with their milliseconds reset to zero even when the given field was not edited.

## Cause

The date objects are serialized by using a `"g"` (general) date format that does not include the milliseconds value.

## Solution

Before the request is sent to the server, override the default date serialization by adding a `Data` function to the configuration of the `Update` DataSource request. There, you can process dates before they are sent out.

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
