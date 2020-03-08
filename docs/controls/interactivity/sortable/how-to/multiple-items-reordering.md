---
title: Reorder Multiple Items
page_title: Reorder Multiple Items | Kendo UI Sortable
description: "Learn how to reorder multiple items using the Kendo UI Sortable widget."
slug: howto_reordermultipleitems_sortable
---

# Reorder Multiple Items

The following example demonstrates how to reorder multiple items using the Kendo UI Sortable widget.

```dojo
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

* [Basic Usage of the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/index)
* [JavaScript API Reference of the Sortable](/api/javascript/ui/sortable)
