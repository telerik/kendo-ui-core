---
title: Overview
page_title: Overview | Kendo UI Popup
description: "Learn how to initialize the Kendo UI Popup widget and customize it functionalities."
slug: overview_kendoui_popup_widget
position: 1
---

# Popup Overview

The Kendo UI Popup widget positions content next to a specific anchor.

This article assumes that you are familiar with the [fundamental Kendo UI widget concepts]({% slug widget_methodsand_events_kendoui_installation %}).

## Getting Started

### Initialize the Popup

The Kendo UI Popup is initialized from a `<div>` element.

The element is initially hidden, as the content of the widget is designed to be only visible when opened through the API.

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

### Align to Elements

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

### Append to Elements

To specify the element to which the Popup must be appended, use the `appendTo` configuration option. By default, the `document.body` option is used.

> **Important**
>
> Unless specified otherwise, the Popup attaches itself to the nearest parent container with a `"k-group"` class. This allows for seamless integration with widgets like the Kendo UI Menu. In rare cases, however, this behavior might yield unexpected results, such as a misaligned or an invisible Popup. In such cases, it is recommended that you explicitly specify the `appendTo` option.

### Define Boundary Detection

To define the boundary detection performance of the Popup, use the `collision ` option. It specifies the behavior of the widget when it does not fit in the view port.

By default, the Popup fits horizontally and flips vertically.

### Control Positioning

The positioning of the Popup is controlled by specific pivot points. Both the anchor and the Popup are treated as rectangular elements, so each has nine pivot points.

Every Popup point can be aligned to an anchor point.

**Figure 1: A right-aligned Popup**

![Right-Aligned Kendo UI Popup](/images/right-align.png)

The position of the Popup can be fine-tuned by specifying both the `position` and the `origin` options.

## Popup API

### Events

Kendo UI Popup exposes the following events:

* `activate`
* `open`
* `close`
* `deactivate`

For more information on the configuration options, refer to the [Popup API documentation](/api/javascript/ui/popup).

## Reference

### Existing Instances

Similar to all other Kendo UI widgets, an existing Popup instance is accessed through the `.data("kendoPopup")` jQuery method, executed by the jQuery object of the originating element.

For detailed information, refer to the article on [getting a reference to a Kendo UI widget]({% slug widget_methodsand_events_kendoui_installation %}#get-widget-reference).

## See Also

Other articles on Kendo UI Popup:

* [Popup JavaScript API Reference](/api/javascript/ui/popup)
