---
title: SplitView
page_title: Configuration, methods and events of Kendo UI Mobile SplitView
description: See how to define horizontal or vertical style of the Kendo UI Mobile SplitView widget and learn which events are fired.
---

# kendo.mobile.ui.SplitView

## Configuration

### style `String`*(default: "horizontal")*

Defines the SplitView style - horizontal or vertical.

#### Vertical SplitView

    <div data-role="splitview" data-style="vertical">
      <div data-role="pane">
          <div data-role="view" id="foo">Pane 1 </div>
      </div>
      <div data-role="pane">
          <div data-role="view" id="foo">Pane 2 </div>
      </div>
     </div>

    <script>
    new kendo.mobile.Application();
    </script>

## Methods

### destroy

Prepares the **SplitView** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the SplitView element from DOM.


### expandPanes

Displays the collapsible panes; has effect only when the device is in portrait orientation.

### collapsePanes

Collapses back the collapsible panes (displayed previously with `expandPanes`); has effect only when the device is in portrait orientation.

## Events

### init

Fires after the mobile SplitView and its child widgets are initialized.

#### Example

    <div data-role="splitview" data-init="onInit">
      <div data-role="pane">
          <div data-role="view" id="foo">Pane 1 </div>
      </div>
      <div data-role="pane">
          <div data-role="view" id="foo">Pane 2 </div>
      </div>
     </div>

    <script>
    function onInit(e) {
      console.log(e);
    }
    new kendo.mobile.Application();
    </script>

#### Event Data

##### e.view `jQuery`

The mobile SplitView instance

### show

Fires when the mobile SplitView becomes visible.

#### Example

    <div data-role="splitview" data-show="onShow">
      <div data-role="pane">
          <div data-role="view" id="foo">Pane 1 </div>
      </div>
      <div data-role="pane">
          <div data-role="view" id="foo">Pane 2 </div>
      </div>
     </div>

    <script>
    function onShow(e) {
      console.log(e);
    }
    new kendo.mobile.Application();
    </script>

#### Event Data

##### e.view `jQuery`

The mobile SplitView instance
