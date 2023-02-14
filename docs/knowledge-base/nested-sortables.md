---
title: Nest Sortable Widgets
page_title: Nest Sortable Widgets 
description: "Learn how to create nested Kendo UI Sortable widgets."
slug: howto_nestsortables_sortable
previous_url: /controls/interactivity/sortable/how-to/nested-sortables
tags: telerik, kendo, jquery, sortable, create, nested, sortable, widgets
component: sortable
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Sortable for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create nested Kendo UI Sortable widgets?

## Solution

The following example demonstrates how to achieve the desired scenarios.

```dojo
  <ul id="parent">
    <li class="list-item">Apples</li>
    <li class="list-item">Grapefruits</li>
    <li class="list-item">Bananas</li>
    <li class="list-item">Others
      <ul id="nested">
        <li class="list-item">Cranberries</li>
        <li class="list-item">Pineapples</li>
        <li class="list-item">Strawberries</li>
      </ul>
    </li>
  </ul>

  <script>
    function placeholder(element) {
      return $("<li style='color: red;' class='list-item' id='placeholder'>Drop Here!</li>");
    }

    $("#parent").kendoSortable({
      connectWith: "#nested",
      filter: ">li.list-item", // Filter only list items that are direct child of the Sortable container.
      // Use ".list-item" to allow parent items to use the nested Sortable.
      ignore: "#nested >li", // Ignore the nested list items.
      placeholder: placeholder
    });
    $("#nested").kendoSortable({
      connectWith: "#parent",
      filter: ".list-item",
      placeholder: placeholder
    });
  </script>
```

## See Also

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
