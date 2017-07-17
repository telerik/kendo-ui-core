---
title: Accessing selected DataValueField
description: Accessing selected DataValueField on the ListBox Change event
type: how-to
page_title: How to Access the Selected DataValueField on the ListBox Change Event
slug: how-to-access-the-selected-data-value-field-on-the-listbox-change-event
position: 0
tags:
teampulseid:
ticketid: 1118759
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListBox for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>IE For PC</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>11</td>
 </tr>
 <tr>
  <td>.Net framework</td>
  <td>Version 4.6</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
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

How can i get the DataValueField from the selected item on the change event? 

## Solution 
  
The desired result can be achieved on the change(or another custom) event, by retrieving first the selected element, and then based on the selected element to retrieve the information for the dataItem associated with that line:  
  
```
function onChange(e) {
    var element = e.sender.select();
    var dataItem = e.sender.dataItem(element[0])
    console.log(dataItem)
}
```
  
[select event](http://docs.telerik.com/kendo-ui/api/javascript/ui/listbox#methods-select)  
  
[dataItem method](http://docs.telerik.com/kendo-ui/api/javascript/ui/listbox#methods-dataItem)
