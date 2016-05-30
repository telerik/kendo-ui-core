---
title: Reorder Multiple Items
page_title: Reorder Multiple Items | Kendo UI Sortable
description: "Learn how to reorder multiple items using the Kendo UI Sortable widget."
slug: howto_reordermultipleitems_sortable
---

# Reorder Multiple Items

The example below demonstrates how to reorder multiple items using the Kendo UI Sortable widget.

###### Example

```html
  <p>Select multiple items with CTRL key</p>
  <div class="list-wrapper">
    <ul id="sortable-listA">
      <li class="list-item">Apples</li>
      <li class="list-item">Grapefruits</li>
      <li class="list-item">Bananas</li>
      <li class="list-item">Cranberries</li>
      <li class="list-item">Pineapples</li>
      <li class="list-item">Strawberries</li>
    </ul>

    <ul id="sortable-listB">

    </ul>
  </div>

  <script>
    function placeholder(element) {
      return $("<li class='list-item' id='placeholder'>Drop Here!</li>");
    }

    var listA = $("#sortable-listA").kendoSortable({
      connectWith: "#sortable-listB",
      placeholder: placeholder,
      hint: function(element) {
        var hint = $("<div class='sortable-hint'></div>");
        $(".state-selected").clone().css("display", "block").appendTo(hint);

        setTimeout(function() {
          hint.children().show();
        });

        return hint;
      },
      start: function(e) {
        $(".state-selected").hide();
      },
      end: function(e) {
        var items = this.element.find(".state-selected").not(e.item);
        items.insertAfter(this.placeholder).show();
      },
      change: function(e) {
        $(".state-selected").removeClass("state-selected");
      }
    }).data("kendoSortable");

    // As of Q3 2015, _draggable is changed to draggable (without underscore).
    listA.draggable.userEvents.bind("tap", function(e) {
      if (e.event.ctrlKey) {
        e.target.toggleClass("state-selected")  
      } else {
        $(".state-selected").removeClass("state-selected");
        e.target.addClass("state-selected");
      }
    });

    $("#sortable-listB").kendoSortable({
      placeholder: placeholder
    });

  </script>

  <style>
    #example {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    .demo-section {
      padding: 50px 70px;
    }

    .one-way {
      background: url('../content/web/sortable/one-way.png') no-repeat 50% 50%;
    }

    .two-way {
      background: url('../content/web/sortable/two-way.png') no-repeat 50% 50%;
    }

    .list-wrapper {
      overflow: hidden;
    }

    #sortable-listA, #sortable-listB, #sortable-listC, #sortable-listD, .sortable-hint {
      width: 210px;
      min-height: 40px;
      margin: 0;
      padding: 0;
      border: 1px solid #dddddd;
      border-radius: 4px;
    }

    #sortable-listA, #sortable-listC {
      float: left;
    }

    #sortable-listB, #sortable-listD {
      float: right;
    }

    .list-item {
      list-style-type: none;
      width: 200px;
      margin: 5px;
      line-height: 30px;
      text-align: center;
      background-color: #222222;
      color: #ffffff;
      border-radius: 3px;
      cursor: move;
    }

    #sortable-listA .list-item {
      background-color: #54b8fa;
      color: #000000;
    }

    #sortable-listB .list-item {
      background-color: #ff879e;
      color: #000000;
    }

    .sortable-hint .list-item {
      background-color: #54b8fa;
      color: #000000;
    }

    #placeholder.list-item {
      background-color: #ffffff;
      color: #777;
    }

    .state-selected {
      background-color: #ff0 !important;
    }

    @media screen and (max-width: 1023px) {
      .demo-section {
        display: none;
      }
    }
  </style>
  </div>
```

## See Also

Other articles and how-to examples on the Kendo UI Sortable:

* [Sortable JavaScript API Reference](/api/javascript/ui/sortable)
* [How to Nest Sortables]({% slug howto_nestsortables_sortable %})
* [How to Persist Order in localStorage]({% slug howto_persistoderinlocalstorage_sortable %})
* [How to Reorder AngularJS Grid Rows]({% slug howto_reorderangularjsgridrows_angular_sortable %})
* [How to Reorder Grid Rows]({% slug howto_reordergridrows_sortable %})
* [How to Reorder Rows in Nested Grid]({% slug howto_reorderrowsinnestedgrid_sortable %})
* [How to Use Sortable in AngularJS with Grid in Batch Editing Mode]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %})

For more runnable examples on the Kendo UI Sortable, browse the [how-to articles]({% slug howto_usesortablewith_gridinbatcheditablemode_angular_sortable %}).
