---
title: Grid Wrapper for React Cannot Load in Internet Explorer
description: Kendo UI Grid wrapper for React does not load in Internet Explorer (IE) and an error occurs in the developer console.
type: troubleshooting
page_title: Grid Wrapper for React is Causing an Error in Internet Explorer | Kendo UI Wrappers for React
slug: react-grid-shimjs-missing
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid Wrapper for React</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2017.3.913</td>
 </tr>
</table>

## Description

When I try to load the Kendo UI Grid wrapper for React in Internet Explorer (IE), the component does not load and the `Object doesn't support property or method 'assign'` error appears in the console. How can I load the Grid in IE?

## Possible Cause

The `ShimJS` library is not included in the page.

## Solution

Include the `ShimJS` library by adding `<script src="https://unpkg.com/core-js/client/shim.min.js"></script>`.
