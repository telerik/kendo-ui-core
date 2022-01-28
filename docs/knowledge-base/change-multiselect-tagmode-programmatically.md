---
title: Change Multiselect Tag Mode Based on the Number of Selected Items
page_title: Change the Tag Mode Programmatically | Kendo UI MultiSelect for jQuery
description: An example on how to programmatically change the tag mode of the Kendo UI MultiSelect.
type: how-to
slug: change-multiselect-tagmode-programmatically
previous_url: /knowledge-base/change-multiselect-tagmode-programatically
tags: multiselect, tagmode, change, programmatically, number, selected, items
ticketid: 1133139
res_type: kb
component: multi-select
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MultiSelect</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61.0.3163.100 (Official Build) (64-bit)</td>
 </tr>
</table>

## Description

How can I set the `multiple` tag mode of the MultiSelect for the first X number of selected items and switch the tag mode to `single` if the user selects more than X items?

## Solution

1. To get the current count of selected items, handle the `change` event of the MultiSelect.
1. If the current count exceeds the predefined number, change the tag mode through the `setOptions` method of the MultiSelect.


```dojo
<select id="multiselect">
</select>
<script>
    $(document).ready(function(e) {
        $("#multiselect").kendoMultiSelect({
            dataSource: ["Item1", "Item2", "Item3", "Item4"],
            value: ["Item2", "Item3"],
            tagMode: "multiple",
            change: function() {
                var selectedValues = this.value();
                var currentTagMode = this.options.tagMode;
                var newTagMode = currentTagMode;
                if (selectedValues.length <= 2) {
                    newTagMode = "multiple";
                } else {
                    newTagMode = "single"
                }
                if (newTagMode != currentTagMode) {
                    this.value([])
                    this.setOptions({
                        tagMode: newTagMode
                    });
                    this.value(selectedValues);
                }
            }
        });

    })
</script>

```
