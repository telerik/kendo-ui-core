---
title: Nested sortables
page_title: Create nested Sortable widgets
description: Create nested Sortable widgets
---

# Create nested Sortable widgets

The following runnable sample demonstrates how to create nested Sortable widgets

#### Example:

```html
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
      filter: ">li.list-item", //filter only list-items that are direct child of the Sortable container. Use ".list-item" to allow parent items to use the nested sortable.
      ignore: "#nested >li", //ignore nested list-items
      placeholder: placeholder
    });
    $("#nested").kendoSortable({
      connectWith: "#parent",
      filter: ".list-item",
      placeholder: placeholder
    });
  </script>
```
