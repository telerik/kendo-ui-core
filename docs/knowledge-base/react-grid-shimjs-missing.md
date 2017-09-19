---
title: Kendo UI Grid React Wrapper Cannot Load in Internet Explorer
description: Kendo UI React grid does not load in IE. In Internet Explorer, an error appears in the developer console when there is a React Grid.
type: troubleshooting
page_title: React Wrapper for the Kendo UI Grid is Causing an Error in Internet Explorer
slug: react-grid-shimjs-missing
ticketid:
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

In Internet Explorer, the React Grid does not load, and an error appears in the console.

## Error Message

`Object doesn't support property or method 'assign'`

## Possible Cause

The `ShimJS` library is not included in the page.


## Solution

Include the `ShimJS` library.

`<script src="https://unpkg.com/core-js/client/shim.min.js"></script>`