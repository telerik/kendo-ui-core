---
title: How can I display audio files within the Grid
description: "An example on how to display audio files within the {{ site.product }} Grid."
type: how-to
page_title: How can I display audio files within the {{ site.product }} Grid
slug: grid-display-audio-files
tags: mvc, core, grid, display, audio, files
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I display audio files within the {{ site.product }} Grid?

## Solution

1. Utilize a [Column Template](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template)
1. Within the template, add the conventional [audio element](https://www.w3schools.com/html/html5_audio.asp) that is primarily utilized for displaying an audio file on a the web page.
1.  Specify the file name and extension using the [Template Syntax](https://docs.telerik.com/kendo-ui/framework/templates/overview#template-syntax).

```Model.cs

    public class EmployeeViewModel
    {
        public string Sound { get; set; } //stores both the file name and extension
    }

```
```Column
    .Columns(columns =>
    {
        columns.Bound(p => p.Sound).Width(350).ClientTemplate("<audio controls><source src='./#=Sound#'/></audio>");
    })
```

For a complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/QmOskMFw42QoLBkC37) example.