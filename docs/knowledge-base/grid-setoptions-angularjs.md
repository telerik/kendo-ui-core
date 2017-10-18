---
title: Grid setOptions method with AngularJS directives
description: 
type: troubleshooting
page_title:
slug:
position: 0
tags: angularjs, grid
teampulseid:
ticketid: 1099270
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
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

I lose the popup template when setOptions is used to change grid options. 

## Solution

The grid expects the angular scope to be passed to the Grid options (which is set by default when the Grid is initialized).

```
$scope.grid.setOptions($.extend({}, options, {
                        $angular: [$scope]
                    }));
```

## Suggested Workarounds

## Steps to Reproduce

## Error Message

## Cause\Possible Cause(s)

## Notes
