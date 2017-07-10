---
title: Disable noDataTemplate in AutoComplete, MultiSelect, ComboBox, and DropDownList for MVC
description: How to disable the noDataTemplate option in the UI for MVC AutoComplete, MultiSelect, ComboBox, and DropDownList wrappers.
type: how-to
page_title: Disable noDataTemplate in AutoComplete, MultiSelect, ComboBox or DropDownList for MVC
slug: disable_nodatatemplate_in_mvc_dropdowns
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

The `.NoDataTemplate` method of the MVC wrappers for the dropdown widgets (AutoComplete, MultiSelect, ComboBox, and DropDownList) accepts only strings as parameters. As a result, the template is not displayed.

## Possible Solution

To disable `noDataTemplate`, set the `noDataTemplate` option of the wrapped widget to `false` after the wrapped widget is initialized.

```html
<script>
$(document).ready(function () {
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.setOptions({ noDataTemplate: false });
});
</script>
```
