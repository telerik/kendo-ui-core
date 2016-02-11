---
title: ActionSheet
page_title: Configuration, methods and events of Kendo UI Mobile ActionSheet
description: Quickly configure mobile ActionSheet widget, close and open it using methods, find which events to use.
---

# kendo.mobile.ui.ActionSheet

Represents the Kendo UI Mobile ActionSheet widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### cancel `String`*(default: "Cancel")*

 The text of the cancel button.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-cancel="Close">
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### popup `Object`

The popup configuration options (tablet only).

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-popup='{ "height": "auto", "width": 200, "direction": "left" }'>
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### popup.direction `Number | String`*(default: "down")*

 The direction to which the popup will expand, relative to the target that opened it.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-popup='{ "direction": "left" }'>
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### popup.height `Number | String`*(default: "auto")*

 The height of the popup in pixels.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-popup='{ "height": 400 }'>
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### popup.width `Number | String`*(default: 240)*

 The width of the popup in pixels.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-popup='{ "width": 400 }'>
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### type `String`*(default: auto)*

By default, the actionsheet opens as a full screen dialog on a phone device or as a popover if a tablet is detected. Setting the type to `"phone"` or `"tablet"` will force the looks of the widget regardless of the device.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-type="tablet">
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

## Methods

### close

Close the ActionSheet.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet">
          <li><a data-action="close">Close</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function close() {
      $("#actionsheet").data("kendoMobileActionSheet").close();
    }
    </script>

### destroy
Prepares the **ActionSheet** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ActionSheet element from DOM.

#### Example

    <div data-role="view">
      <a data-role="button" data-click="destroy">Destroy</a>
      <ul id="actionsheet" data-role="actionsheet">
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function destroy() {
      // detach events
      $("#actionsheet").data("kendoMobileActionSheet").destroy();
    }
    </script>

### open

Open the ActionSheet.

#### Example - opens the widget each time the View becomes visible

    <div data-role="view" data-show="onShow">
      <ul id="actionsheet" data-role="actionsheet">
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onShow() {
      $("#actionsheet").data("kendoMobileActionSheet").open();
    }
    </script>

#### Example

    <ul data-role="listview">
      <li> Foo <a data-role="button" id="button">Delete</a></li>
    </ul>

    <ul data-role="actionsheet" id="actionsheet">
      <li><a>Foo</a></li>
      <li><a>Bar</a></li>
    </ul>

    <script>
    $("#actionsheet").data("kendoMobileActionSheet").open($("#button"));
    </script>

#### Parameters

##### target `jQuery`

(optional) The target element of the ActionSheet, available in the callback methods.

**Notice** The target element is **mandatory** on tablets, as the ActionSheet widget positions itself relative to opening element when a tablet is detected.

##### context `Object`

(optional) The context of the ActionSheet, available in the callback methods.

## Events

### close

Fires when the ActionSheet is closed.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-close="onClose">
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
      var app = new kendo.mobile.Application();

      function onClose() {
        console.log("closed");
      }
    </script>

### open

Fires when the ActionSheet is opened.

#### Example

    <div data-role="view">
      <a data-role="button" data-rel="actionsheet" href="#actionsheet">Open</a>
      <ul id="actionsheet" data-role="actionsheet" data-open="onOpen">
        <li><a>Foo</a></li>
        <li><a>Bar</a></li>
      </ul>
    </div>

    <script>
      var app = new kendo.mobile.Application();

      function onOpen() {
        console.log("opened");
      }
    </script>

#### Event Data

##### e.target `jQuery`

The invocation target of the ActionSheet.

##### e.context `jQuery`

The defined ActionSheet context.
