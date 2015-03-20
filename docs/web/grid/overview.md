---
title: Overview
page_title: Overview of Grid UI widget | Kendo UI Documentation
description: Quick steps to help you create Kendo UI Grid, initialization and enabling of Grid UI virtualization.
position: 1
---

# Grid Overview

## Configuring Grid Behavior

Kendo Grid supports paging, sorting, grouping, and scrolling. Configuring any of
these Grid behaviors is done using simple boolean configuration options. For
example, the follow snippet shows how to enable all of these behaviors.

### Enabling Grid paging, sorting, grouping, and scrolling

       $(document).ready(function(){
          $("#grid").kendoGrid({
             groupable: true,
             scrollable: true,
             sortable: true,
             pageable: true
          });
      });

By default, paging, grouping, and sorting are **disabled**. Scrolling is enabled by default.

## Performance with Virtual Scrolling

When binding to large data sets or when using large page sizes, reducing active in-memory
DOM objects is important for performance. Kendo Grid provides built-in UI virtualization
for highly optimized binding to large data sets. Enabling UI virtualization is done via simple configuration.

### Enabling Grid UI virtualization

       $(document).ready(function(){
          $("#grid").kendoGrid({
             scrollable: {
                 virtual: true
             }
          });
      });

## Accessing an Existing Grid

You can reference an existing **Grid** instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [Grid API](/api/web/grid) to control its behavior.

### Accessing an existing Grid instance

    var grid = $("#grid").data("kendoGrid");

