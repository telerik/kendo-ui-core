---
title: Disable noDataTemplate in AutoComplete, MultiSelect, ComboBox, and DropDownList for MVC
description: An example on how to disable the noDataTemplate option in the AutoComplete, MultiSelect, ComboBox, and DropDownList ASP.NET MVC wrappers.
type: how-to
page_title: Disable noDataTemplate in AutoComplete, MultiSelect, ComboBox or DropDownList | Kendo UI Editors for ASP.NET MVC
slug: disable-nodatatemplate-in-mvc-dropdowns
tags: disable, nodatatemplate, mvc, wrappers, autocomplete, multiselect, combobox, dropdownlist
ticketid: 1062781
res_type: kb
component: autocomplete
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI AutoComplete</td>
 </tr>
</table>

## Description

The `.NoDataTemplate` method of the ASP.NET MVC wrappers for the dropdown widgets&mdash;AutoComplete, MultiSelect, ComboBox, and DropDownList&mdash;accepts only strings as parameters. As a result, the template is not displayed.

## Solution

Disable `noDataTemplate` by setting the `noDataTemplate` option of the wrapped widget to `false` after the wrapped widget is initialized.

```dojo
<input id="autocomplete" style="width: 100%;" />
<script>
    // The below configuration mimicks the initialization with a wrapper (MVC/Core, JSP/PHP).
    
    $(document).ready(function(){
        $("#autocomplete").kendoAutoComplete({
            dataSource: {
            data: ["One", "Two"]
            }
        });
        var autocomplete = $("#autocomplete").data("kendoAutoComplete");
        autocomplete.setOptions({ noDataTemplate: false });
    });
</script>
```
