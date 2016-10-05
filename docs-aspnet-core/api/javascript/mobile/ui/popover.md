---
title: PopOver
page_title: Configuration, methods and events of Kendo UI Mobile PopOver
description: 'Guide to Kendo UI Mobile PopOver configuration options: set width and height of the popup in pixels and direction to which the popup will expand.'
---

# kendo.mobile.ui.PopOver

Represents the Kendo UI Mobile PopOver widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### pane `Object`

The pane configuration options.

### pane.initial `String`

 The id of the initial mobile View to display.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-pane='{ "initial": "#view2" }'>
        <div data-role="view" id="view1" data-title="view1">
          View 1
        </div>
        <div data-role="view" id="view2" data-title="view2">
          View 2
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### pane.layout `String`

 The id of the default Pane Layout.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-pane='{ "layout": "popoverLayout" }'>
        <div data-role="view" id="view1" data-title="view1">
          View 1
        </div>
        <div data-role="view" id="view2" data-title="view2">
          View 2
        </div>

        <div data-role="layout" data-id="popoverLayout">
          <header data-role="header">
            <div data-role="navbar">
              <span data-role="view-title"></span>
            </div>
          </header>
          <div data-role="footer">
            <div data-role="tabstrip">
              <a href="#view1">view1</a>
              <a href="#view2">view2</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### pane.loading `String`*(default: "Loading...")*

 The text displayed in the loading popup. Setting this value to false will disable the loading popup.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-pane='{ "loading": "sample text" }'>
        <div data-role="view" data-show="showLoading">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function showLoading(e) {
      var pane = $("#foo").data("kendoMobilePopOver").pane;
      pane.showLoading();

      setTimeout(function() {
        pane.hideLoading();
      }, 3000);
    }
    </script>

### pane.transition `String`

 The default View transition.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-pane='{ "transition": "slide" }'>
        <div data-role="view" id="view1">
          View 1
        </div>
        <div data-role="view" id="view2">
          View 2
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### popup `Object`

The popup configuration options.

### popup.direction String`*(default: "down")*

The direction to which the popup will expand, relative to the target that opened it.
Supported directions are `up`, `right`, `down`, and `left`.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-popup='{ "direction": "right" }'>
        <div data-role="view">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### popup.height `Number | String`*(default: 320)*

 The height of the popup in pixels.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-popup='{ "height": "500" }'>
        <div data-role="view">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### popup.width `Number | String`*(default: 240)*

 The width of the popup in pixels.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-popup='{ "width": "500" }'>
        <div data-role="view">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

## Methods

### close

Close the popover.

#### Close a popover when a button is clicked

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover">
        <div data-role="view">
          <a data-role="button" data-click="close">Close me</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function close() {
      $("#foo").data("kendoMobilePopOver").close();
    }
    </script>

### destroy

Prepares the **PopOver** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the PopOver element from DOM.

#### Example

    <div data-role="view">
      <a data-role="button" href="#foo" data-rel="popover">Open PopOver</a>
      <a data-role="button" data-click="destroy">Destroy</a>

      <div id="foo" data-role="popover">
        <div data-role="view">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function destroy() {
      $("#foo").data("kendoMobilePopOver").destroy(); //detach events
    }
    </script>

### open

Open the PopOver.

#### Parameters

##### target `jQuery`

The target of the Popover, to which the visual arrow will point to. **This parameter is required for a tablet OS.**

#### Example - opens the PopOver initially on view show

    <div data-role="view" data-show="showPopOver">
      <a id="target" data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover">
        <div data-role="view">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function showPopOver() {
      $("#foo").data("kendoMobilePopOver").open("#target");
    }
    </script>

## Events

### close

Fires when popover is closed.

#### Event Data

##### e.sender `kendo.mobile.ui.PopOver`

The widget instance which fired the event.

#### Example

    <div data-role="view" data-show="showPopOver">
      <a id="target" data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-close="onClose">
        <div data-role="view">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onClose(e) {
      console.log("close");
      //handle event
    }
    </script>

### open

Fires when popover is opened.

#### Event Data

##### e.target `jQuery`

The DOM element, which triggered the popover opening.

##### e.sender `kendo.mobile.ui.PopOver`

The widget instance which fired the event.

#### Example

    <div data-role="view" data-show="showPopOver">
      <a id="target" data-role="button" href="#foo" data-rel="popover">Open PopOver</a>

      <div id="foo" data-role="popover" data-open="onOpen">
        <div data-role="view">
          View 1
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onOpen(e) {
      console.log("open");
      //handle event
    }
    </script>
