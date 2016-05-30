---
title: Nest Sortables
page_title: Nest Sortables | Kendo UI Sortable
description: "Learn how to create nested Kendo UI Sortable widgets."
slug: howto_nestsortables_sortable
---

# Nest Sortables

The example below demonstrates how to create nested Kendo UI Sortable widgets.

###### Example

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

## See Also

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Multiple Items]({% slug howto_reordermultipleitems_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Transfer Grid Rows]({% slug howto_transfergridrows_sortable %})
* [How to Use Sortable in AngularJS with Grid in Batch Editing Mode]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
