---
title: Bind Checkbox on Treelist
description: An article on how to bind checkbox on TreeList
type: how-to
page_title: Checkbox Column in MVC TreeList
slug: treelist-checkbox-column-in-mvc
tags: treelist, checkbox
ticketid: 1141320
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>TreeList for ASP.NET Core</td>
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
  <td>Versie 62.0.3202.94</td>
 </tr>
 <tr>
  <td>.Net framework</td>
  <td>Version 4.7</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>C Sharp</td>
 </tr>
</table>


## Description

How to add a checkbox column in the TreeList which will initially set the checkboxes checked/unchecked status based on the model values?

## Solution

This could be achieved using the [Template](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TreeListColumnBuilder#templatesystemstring) method of the TreeList column.

Please check the following code snippet demonstrating this:

````
columns.Add().Field(e => e.CheckBoxColumnField).Template(
        "#if(CheckBoxColumnField == true){#" +
            Html.Kendo().CheckBox().Name("name#:CheckBoxColumnField#").HtmlAttributes(new { @class = "CheckBoxColumnField" }).Checked(true).ToHtmlString() +
        "#}else{#" +
            Html.Kendo().CheckBox().Name("name#:CheckBoxColumnField#").HtmlAttributes(new { @class = "CheckBoxColumnField" }).ToHtmlString() +
        "#}#"
    );
````