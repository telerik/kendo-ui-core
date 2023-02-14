---
title: Browser Memory Usage Increases over Time
page_title: Browser Memory Usage Increases over Time
description: "Learn how to handle the problem when the browser memory usage increases with time when working with Kendo UI for jQuery."
slug: browser-memory-usage-increases
tags: telerik, kendoui, jquery, troubleshooting, memory, leaks, browser, usage, increases, over, time
type: troubleshooting
res_type: kb
component: kendoui
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

The browser memory usage increases with time.

## Solution

There are multiple possible reasons for leaking JavaScript Heap memory. To narrow them down, use the profiling features provided by the browser developer tools. For a detailed description of the debugging process, refer to [Memory Diagnosis | Web Tools](https://developer.chrome.com/docs/devtools/memory-problems).
