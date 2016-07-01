---
title: Overview
page_title: Overview | Kendo UI Popup
description: "Learn how to initialize the Kendo UI Popup widget and customize it functionalities."
slug: overview_kendoui_popup_widget
position: 1
---

# Popup Overview

The Kendo UI Popup widget positions a content next to a specific anchor. 

> **Important**  
> The content of this page is intended to users that are familiar with the [fundamental Kendo UI widget concepts](/widgets).

## Getting Started

### Initialize the Popup

Kendo UI Popup is initialized from a `<div>` element.

The element will be hidden initially, as the widget's content should only be visible when it is opened through the API.

The example below demonstrates how to initialize the Popup and what its basic usage is.

###### Example

    <input id="name" /><button> Open/Close </button>

    <div id="popup">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>

    <script>
      $("#popup").kendoPopup({
        anchor: $("#name")
      });
      
      $("button").click(function(){
      	$("#popup").data("kendoPopup").toggle();
      });
    </script>

## Configuration

### Anchor
To align the Popup to a specific element, use the `anchor` option. The Popup opens next to the defined anchor element.

###### Example

  <style>
      .content {
        padding: 10px;
        color: #787878;
        background-color: #fcf7f8;
        font-size: 13px;
        font-family: Helvetica, Arial, sans-serif;
        letter-spacing: 1px;
        text-align: center;
        border: 1px solid rgba(0,0,0,.05);
      }

      .anchor {
        position: absolute;
        top: 100px;
        left: 100px;
        width: 80px;
      }

      .popup {
        width: 100px;
        height: 70px;
      }
  </style>
    <div class="anchor content">Anchor</div><button> Open/Close </button>
    <div class="popup content" id="popup">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>

    <script>
      $("#popup").kendoPopup({
        anchor: $(".anchor")
      });
      
      $("button").click(function(){
      	$("#popup").data("kendoPopup").toggle();
      });
    </script>
    
### Collisions
To define the Popup boundary detection behavior, use the `collision ` option. It specifies the behavior of the component when it does not fit in the view port.

By default, the Popup fits horizontally and flips vertically.

### Positioning

The positioning of the Popup is controlled by specific pivot points. Both the anchor and the Popup are treated as rectangular elements, so each has 9 pivot points.

Every Popup point can be aligned to an anchor point.

**Figure 2: A right-aligned Popup**

![Right-Aligned Kendo UI Popup](images/right-align.png)

The position of the Popup can be fine-tuned by specifying both the `position` and the `origin` options. 

## Popup API

### Events

Kendo UI Popup exposes the following events: `activate`, `open`, `close` and `deactivate`. 

For more information on the configuration options, refer to the [Kendo UI Popup API section](/api/javascript/ui/popup).

## Reference

### Existing Instances

Similar to all other Kendo UI widgets, an existing Popup instance is accessed via the `.data("kendoPopup")` jQuery method, executed by the jQuery object of the originating element.

For detailed information on how to get a reference to a Kendo UI widget, see [this help topic](/widgets#getting-reference-to-a-kendo-ui-widget).

## See Also

Other articles on Kendo UI Popup:

* [Popup JavaScript API Reference](/api/javascript/ui/popup)
