---
title: Disable MultiSelect Options
description: Learn how to disable a selection of certain options in a MultiSelect and prevent the drop-down from closing when the user clicks them.
type: how-to
page_title: Disable Items - Kendo UI MultiSelect for jQuery
slug: disabled-items-multiselect
tags: multiselect, disabled, items, options, prevent, selection
ticketid: 1363148
res_type: kb
component: multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
</table>

## Description

How can I disable items in the MultiSelect while the drop-down list remains open?

## Solution

To prevent the selection, cancel the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/select) event. To prevent the drop-down list from closing, set the [`autoClose`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/autoclose) property.

```dojo
<select id="select"></select>

<script>
    $(document).ready(function() {
        function onSelect(e) {
              if(e.dataItem.unselectableItem)
              {
                //prevent selection by cancelling the event
                e.preventDefault();
                //prevent closing by setting the autoClose property
                // https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/configuration/autoclose
                this.setOptions({autoClose: false});
              }
              else {
               	this.setOptions({autoClose: true});
              }
        };

        var data = [
            { text: "Disabled", value:"1", unselectableItem: true },
            { text: "Enabled", value:"2", unselectableItem: false }
        ];

        $("#select").kendoMultiSelect({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data,
            select: onSelect,
            // Set a template to visually distinguish disabled items for the user.
            template: kendo.template($("#template").html())
        });
    });
</script>

<script id="template" type="text/x-kendo-template">
	<span class="#: unselectableItem ? 'k-disabled': ''#">
  	 #: text #
	</span>
</script>
```
