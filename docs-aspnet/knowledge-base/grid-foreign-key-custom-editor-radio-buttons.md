---
title: Use Radio Buttons as ForeignKey Editor in the Grid
description: An example on how to provide and use radio buttons instead of a DropDowpDown foreign key column editor in the Telerik UI Grid for ASP.NET MVC.
type: how-to
page_title: Use Radios for a Foreign Key Column Editor
slug: grid-foreign-key-custom-editor-radio-buttons
tags: grid, foreign, editor, key, radio, buttons, custom, editor
ticketid: 1402074
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

I was wondering if there is a way to convert the foreign key column from a dropdown to radio buttons?

## Solution

-  Define a new editor in `Shared/EditorTemplates` and pass the collection via the `EditorViewData` to it:

```
	columns.ForeignKey(x => x.NameCodeId, (System.Collections.IEnumerable)ViewData["NameCodes"], "Id", "Description")
        .Title("Foreign Key Column")
        .Width(200)
        .EditorTemplateName("Radios")
        .EditorViewData((System.Collections.IEnumerable)ViewData["NameCodes"]);
```

-  Get the ViewData, loop over it, creating the radio checkboxes. The must have a unique name which is translated to their id

    [Radios demo](https://demos.telerik.com/aspnet-mvc/styling/radios)

    The name HTML attribute is necessary so that the radios work as a group:

```cshtml
    // Radios.cshtml
 
    @model object
    @using ForeignKey.Models
    @{
        var options = (List<NameCode>)ViewData["NameCodes"];
    
        for (var i=0;i <options.Count; i++)
        {
            @Html.Kendo().RadioButton().Name("radio" + options[i].Id.ToString()).Label(options[i].  Description).HtmlAttributes(new { @name = "NameCodeId" }).Value(options[i].Id)
        }
    }
```  
- In the case of in cell editing, every time you click on the edit cell, it closes. So you need to also add a mouse-down handler targeting the label as the input element is hidden:

```
	$(document).ready(function () {
        $("#grid").on("mousedown", ".k-radio-label", function (e) {
            e.preventDefault();
        })
    });
```
