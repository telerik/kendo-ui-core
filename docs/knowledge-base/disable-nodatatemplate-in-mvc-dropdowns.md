---
title: Disable the noDataTemplate in the MVC AutoComplete, MultiSelect, ComboBox or DropDownList
description: How to disable the noDataTemplate in the dropdown MVC wrappers (AutoComplete, MultiSelect, ComboBox, DropDownList)
type: how-to
page_title: Disable the noDataTemplate in the MVC AutoComplete, MultiSelect, ComboBox, DropDownList
slug: disable-nodatatemplate-in-mvc-dropdowns
position: 0
tags: disable,nodatatemplate,mvc,wrappers,autocomplete,multiselect,combobox,dropdownlist
teampulseid:
ticketid: 1062781
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>AutoComplete for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

The dropdown widgets (AutoComplete, MultiSelect, ComboBox, DropDownList) MVC wrappers' .NoDataTemplate method accepts only string as a parameter, thus the template cannot be disabled through this method. As a workaround the template can be disabled by setting the wrapped widget's noDataTemplate option to **false** after it is initialized as shown below.

## Solution

## Suggested Workarounds

```html
<script>
$(document).ready(function () {
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.setOptions({ noDataTemplate: false });
});
</script>
```

## Steps to Reproduce

## Error Message

## Cause\Possible Cause(s)

## Notes
