---
title: Hide the Grid Loading Indicator
description: An example on how to hide the loading indicator of a Kendo UI Grid.
type: how-to
page_title: Remove the Grid Loading Indicator | Kendo UI Grid for ASP.NET MVC
slug: grid-remove-the-grid-loading-indicator
tags: grid, loading, hide
ticketid: 1141398
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for ASP.NET MVC</td>
 </tr>
 <tr>
  <td>Made with Version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description

On my page, I refresh the Grid every three seconds by using the `SetInterval` Javascript function. As a result, the Grid reloads and displays a loading indicator.

How can I hide the loading indicator?

## Solution

Remove the loading mask, which causes the issue, by hiding the `mask` DOM element.  

```
 .k-loading-mask{
  display: `none`;
 }
```
