---
title: Use MobileSwitch as Editor in Grid for ASP.NET MVC
description: Approach for using MobileSwitch as an Editor in Grid for ASP.NET MVC  
type: how-to
page_title: Using MobileSwitch as Custom Editor in Grid
slug: grid-mobileswitch-as-editor
position: 0
tags: mobileswitch, switch, grid, custom editor 
teampulseid:
ticketid: 1114947
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
 </tr> <tr>
  <td>Progress® Kendo UI® versoin</td>  <td>2017.2 504</td>
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

I have a grid and I want to display __MobileSwitch__ when the Grid is in edit mode. 

## Solution

There is no built-in solution. Check the [suggested workarounds](#suggested-workarounds) instead.

## Suggested Workarounds  

Alhtough that using __MobileSwitch__ is not supported out of a Mobile View, you can follow the steps below to use it as an editor within the Grid:

1) Create a new partial view for the __MobileSwitch__ editor in the __Views/Shared/EditorTemplates__ folder with the following content (_for the example, lets name it **MobileSwitchTemplate.cshtml**_):  

```
@model bool 

<input type="checkbox" data-bind="value: @Html.ViewData["FieldName"].ToString()" class="mySwitch"/>
````
  
2) Now, for the column where you want to use that editor you could specify the template and pass the field name in the ViewData:  

Copy Code

````
columns.Bound(p => p.Discontinued).Width(120).EditorTemplateName("MobileSwitchTemplate").EditorViewData(new { FieldName = "Discontinued" });
````
  
3) Finally, within the Edit event of the Grid you could initialize the MobileSwitch:  

````
.Events(ev=>ev.Edit("onEdit"))
 
... 
<script type="text/javascript">
    function onEdit(e) {
        $(".mySwitch").kendoMobileSwitch();
    }    
````    

