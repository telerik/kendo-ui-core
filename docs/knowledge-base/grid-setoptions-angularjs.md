---
title: Cannot Preserve the Popup Template When Using the Grid setOptions Method in AngularJS
description: The popup template gets lost when I use setOptions in the Kendo UI Grid.
type: troubleshooting
page_title: Popup Template Gets Lost When setOptions Is Used | Kendo UI Grid
slug: grid-setoptions-angularjs
tags: angularjs, grid
ticketid: 1099270
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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


## Description

How can I preserve the popup template of the Grid when I use `setOptions` to change its options?

## Solution

Pass the AngularJS scope to the Grid options. By default, the Grid when initialized expects such logic.

```
$scope.grid.setOptions($.extend({}, options, {
                        $angular: [$scope]
                    }));
```
