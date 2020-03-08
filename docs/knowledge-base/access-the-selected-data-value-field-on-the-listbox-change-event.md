---
title: Access Selected DataValueField
page_title: Access the Selected DataValueField on the ListBox change Event | Kendo UI ListBox for ASP.NET MVC
description: An example on how to access the selected DataValueField on the Kendo UI ListBox change event.
slug: access-the-selected-data-value-field-on-the-listbox-change-event
ticketid: 1118759
type: how-to
res_type: kb
component: listbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI ListBox for ASP.NET MVC</td>
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

How can I get the `DataValueField` from the selected item on the `change` event of the Kendo UI ListBox? 

## Solution

1. Retrieve the selected element.
1. Based on the selected element, retrieve the information for the `dataItem` that is associated with the following line:

    ```
    function onChange(e) {
        var element = e.sender.select();
        var dataItem = e.sender.dataItem(element[0])
        console.log(dataItem)
    }
    ```

For more information, refer to the articles on:
* The [`change`](/api/javascript/ui/listbox/events/change) event of the ListBox.
* The [`dataItem`](/api/javascript/ui/listbox/methods/dataitem) method of the ListBox.
