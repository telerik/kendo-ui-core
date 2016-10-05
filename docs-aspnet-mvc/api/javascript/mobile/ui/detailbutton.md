---
title: DetailButton
page_title: Configuration, methods and events of Kendo UI Mobile DetailButton
description: Documentation on how to initialize Kendo UI mobile DetailButton.
---

# kendo.mobile.ui.DetailButton

Represents the Kendo UI Mobile DetailButton widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## DetailButton

The DetailButton widget navigates to a mobile View when pressed.

#### Initialize Kendo mobile DetailButton based on role data attribute

    <div data-role="view">
      <ul data-role="listview">
        <li>Item 1<a data-role="detailbutton"></a></li>
        <li>Item 2<a data-role="detailbutton"></a></li>
      </ul>
    </div>

    <script>
      var app = new kendo.mobile.Application();
    </script>

## Methods

### destroy
Prepares the **DetailButton** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DetailButton element from DOM.

#### Example

    <div data-role="view" data-init="onInit">
      <ul data-role="listview">
         <li>Item 1<a data-role="detailbutton"></a></li>
         <li>Item 2<a data-role="detailbutton"></a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onInit() {
    $(".km-listview")
      .find("[data-role='detailbutton']")
      .each(function(idx, item) {
        $(item).data("kendoMobileDetailButton").destroy(); //detach events
        $(item).remove(); //remove element from the DOM
      });
    }
    </script>

## Events

### click

Fires when the user taps the button.

#### Event Data

##### e.target `jQuery`

The clicked DOM element

##### e.button `jQuery`

The button DOM element

#### Example - get the item to which DetailButton belongs to

    <div data-role="view">
      <ul data-role="listview">
        <li>Item 1<a data-role="detailbutton" data-style="rowinsert" data-click="onClick"></a></li>
        <li>Item 2<a data-role="detailbutton" data-style="rowinsert" data-click="onClick"></a></li>
        <li>Item 3<a data-role="detailbutton" data-style="rowinsert" data-click="onClick"></a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onClick(e) {
    var item = e.button.closest("li"); //get the item
    item.css("background", "yellow"); //change its background
    }
    </script>
