---
title: Use MobileSwitch as Editor in Grid for MVC
description: An example on how to use the MobileSwitch as an editor in the Grid for ASP.NET MVC.  
type: how-to
page_title: Use MobileSwitch as Custom Editor in Grid | Kendo UI Grid for ASP.NET MVC
slug: grid-mobileswitch-as-editor
tags: mobileswitch, switch, grid, custom editor
ticketid: 1114947
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr> <tr>
  <td>Progress Kendo UI versoin</td>  
  <td>2017.2 504</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>C Sharp</td>
 </tr>
 <tr>
  <td>MVC Version</td>
  <td>MVC 5</td>
 </tr>
 <tr>
  <td>View Engine</td>
  <td>Razor</td>
 </tr>
</table>

## Description

Howe can I display a MobileSwitch when the Grid is in an edit mode?

## Suggested Workarounds

The Kendo UI Grid does not provide a built-in solution for achieving this behavior. However, you can still work around this issue.

By default, the MobileView does not support the usage of a MobileSwitch but you can use it as an editor within the Grid by applying the following approach:

1. Create a new partial view for the MobileSwitch editor in the `Views/Shared/EditorTemplates` folder. For the example, name it `MobileSwitchTemplate.cshtml`.  

    ```
    @model bool

    <input type="checkbox" data-bind="value: @Html.ViewData["FieldName"].ToString()" class="mySwitch"/>
    ```

1. Specify the template and pass the field name in `ViewData` for the column you want to use that editor. Copy the following code:

    ```
    columns.Bound(p => p.Discontinued).Width(120).EditorTemplateName("MobileSwitchTemplate").EditorViewData(new { FieldName = "Discontinued" });
    ```

1. Initialize the MobileSwitch within the `edit` event of the Grid.

    ```
    .Events(ev=>ev.Edit("onEdit"))

    ...
    <script type="text/javascript">
        function onEdit(e) {
            $(".mySwitch").kendoMobileSwitch();
        }    
    ```    
