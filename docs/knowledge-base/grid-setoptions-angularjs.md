---
title: Cannot Preserve the Popup Template When Using the Grid setOptions Method in AngularJS
description: The popup template gets lost when I use setOptions in the Kendo UI Grid.
type: troubleshooting
page_title: Popup Template Gets Lost When setOptions Is Used - Kendo UI for jQuery Data Grid
slug: grid-setoptions-angularjs
tags: angularjs, grid
ticketid: 1099270
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
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
  <td>56.0.2924.87 (64-bit)</td>
 </tr>
</table>

> Starting with R2 2022, the Kendo UI team officially drops the support for AngularJS 1.x through Kendo UI for jQuery. The AngularJS related files and functionality are removed from the bundles and distribution in R3 SP1 2023. The last version that contains the files is R3 2023.


## Description

How can I preserve the popup template of the Grid when I use `setOptions` to change its options?

## Solution

Pass the AngularJS scope to the Grid options. By default, the Grid when initialized expects such logic.

```
$scope.grid.setOptions($.extend({}, options, {
                        $angular: [$scope]
                    }));
```
