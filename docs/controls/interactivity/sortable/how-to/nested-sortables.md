---
title: Nest Sortables
page_title: Nest Sortables | Kendo UI Sortable
description: "Learn how to create nested Kendo UI Sortable widgets."
slug: howto_nestsortables_sortable
---

# Nest Sortables

The following example demonstrates how to create nested Kendo UI Sortable widgets.

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
