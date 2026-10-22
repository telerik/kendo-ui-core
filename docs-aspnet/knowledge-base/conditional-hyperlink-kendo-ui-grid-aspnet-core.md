---
title: Using a Conditional Hyperlink in Kendo UI Grid Column Template in ASP.NET Core
description: Learn how to create a conditional hyperlink in the Kendo UI Grid column template in ASP.NET Core by combining server-side URL generation with client-side logic.
type: how-to
page_title: Creating Conditional Hyperlink in Kendo UI Grid Column Template
meta_title: Using Conditional Links in Kendo UI Grid Column Templates in ASP.NET Core
slug: conditional-hyperlink-kendo-ui-grid-aspnet-core
tags: grid, ui for asp.net core, hyperlink, column template, url.action
res_type: kb
ticketid: 1719748
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td> 
Grid for UI for ASP.NET Core
</td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

I encountered an issue when trying to implement a conditional hyperlink in a [Kendo UI Grid](https://docs.telerik.com/aspnet-core/html-helpers/grid/overview) column template. The goal is to dynamically generate links based on a condition in JavaScript, but the usage of `@Url.Action` within a client-side JavaScript function caused an error. This happens because `@Url.Action` executes server-side, while JavaScript functions execute client-side after the page loads.

This knowledge base article also answers the following questions:
- How to create a dynamic hyperlink in a Kendo UI Grid column template?
- Why does @Url.Action not work in client-side JavaScript in Kendo UI Grid?
- How to conditionally set a hyperlink in Kendo UI Grid based on JavaScript logic?

## Solution

To achieve conditional hyperlink functionality in the Kendo UI Grid column template, follow these steps:

1. Use `@Url.Action` to generate base URLs on the server-side before initializing the grid.
2. Assign these base URLs to JavaScript variables.
3. Use these variables in the JavaScript function to concatenate the conditional URL.

### Steps:

1. Add the following server-side-generated base URLs in a `<script>` block:
   ```cshtml
   <script>
       var detailsUrlBase = '@Url.Action("Details", "W2Request")/';
       var etaxUrlBase = '@Url.Action("Etax", "W2ETax")/';
   </script>
   ```

2. Define your JavaScript function to construct the URL based on the condition:
   ```JavaScript
   function RoleLinkTemplate(data) {
       var RoleNm = document.getElementById("RoleName").value; // Get the role name from an input field
       var url = (RoleNm.toLowerCase() !== "etax")
           ? detailsUrlBase + data.W2cId // Use details URL for non-"etax" roles
           : etaxUrlBase + data.W2cId;  // Use etax URL for "etax" roles
       return "<a href='" + url + "'>" + data.W2cId + "</a>"; // Return the hyperlink
   }
   ```

3. Use the `RoleLinkTemplate` function in the grid column template:
   ```cshtml
   <kendo-grid name="gridDetailSumary" navigatable="true" selectable="cell" persist-selection="true">
       <columns>
           <column field="W2cId" title="W2C ID" width="40" template="#= RoleLinkTemplate(data) #" />
           <column field="StaffFullName" title="Employee Name" width="100"></column>
           <column field="StaffEmpId" title="Employee ID" width="50"></column>
           <column field="DivisionCoid" title="COID" width="50"></column>
           <column field="Hrco" title="HRCO" width="50"></column>
       </columns>
   </kendo-grid>
   ```

By separating server-side URL generation and client-side logic, you eliminate syntax errors and runtime issues. The `RoleLinkTemplate` function dynamically generates the links based on the `RoleName` value.

```
