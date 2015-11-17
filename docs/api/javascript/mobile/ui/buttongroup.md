---
title: ButtonGroup
page_title: Configuration, methods and events of Kendo UI Mobile ButtonGroup
description: Learn how to define the initially selected button, select a button and get the currently selected button.
---

# kendo.mobile.ui.ButtonGroup

Represents the Kendo UI Mobile ButtonGroup widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### enable `Boolean` *(default: true)*

Defines if the widget is initially enabled or disabled.

#### Example

    <div data-role="view">
      <ul data-role="buttongroup" data-enable="false">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### index `Number`

Defines the initially selected Button (zero based index).

#### Example

    <div data-role="view">
      <ul data-role="buttongroup" data-index="1">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### selectOn `String` *(default "down")*

Sets the DOM event used to select the button. Accepts `"up"` as an alias for `touchend`, `mouseup` and `MSPointerUp` vendor specific events.

By default, buttons are selected immediately after the user presses the button (on `touchstart` or `mousedown` or `MSPointerDown`, depending on the mobile device).
However, if the widget is placed in a scrollable view, the user may accidentally press the button when scrolling. In such cases, it is recommended to set this option to `"up"`.

#### Example

    <div data-role="view">
      <ul data-role="buttongroup" data-select-on="up">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
      var app = new kendo.mobile.Application();
    </script>

## Methods

### badge

**Introduced in Q1 2013 SP** Sets a badge on one of the ButtonGroup buttons with the specified value. If invoked without parameters, returns the button's current badge value. Set the value to false to remove the badge.

#### Parameters

##### button `Selector|Number`

The target button specified either as a jQuery selector/object or as an button index.

##### value `String|Boolean`

The target value to be set or false to be removed.

#### Returns

`String|kendo.mobile.ui.Button` the badge value if invoked without parameters, otherwise the ButtonGroup object.

#### Example

    <div data-role="view" data-init="setBadges">
      <ul id="buttongroup" data-role="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function setBadges() {
      var buttongroup = $("#buttongroup").data("kendoMobileButtonGroup");

      // Set the first button badge value to 5
      buttongroup.badge(0, 5);
      // Set the last button badge value to 10
      buttongroup.badge("li:last", 10);
      // Get the current badge value on the first button.
      console.log(buttongroup.badge(0));
      // Remove the first button badge
      buttongroup.badge("li:first", false);
    }
    </script>

### current

Get the currently selected Button.

#### Returns

`jQuery` the jQuery object representing the currently selected button.

#### Example - get the index of the currently selected Button

    <div data-role="view">
      <ul id="buttongroup" data-role="buttongroup" data-select="onSelect">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onSelect(e) {
        var index = this.current().index();
        console.log(index);
    }
    </script>

### destroy

Prepares the **ButtonGroup** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ButtonGroup element from DOM.

#### Example

    <div data-role="view">
      <ul id="buttongroup" data-role="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>

      <a data-role="button" data-click="destroy">Destroy the ButtonGroup</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function destroy() {
      $("#buttongroup").data("kendoMobileButtonGroup").destroy(); //detach events
      $("#buttongroup").remove(); //remove the button from the DOM
    }
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

A boolean flag that indicates whether the widget should be enabled or disabled.

#### Example

    <div data-role="view">
      <a data-role="button" data-click="enable">Enable</a>
      <ul id="btnGroup" data-role="buttongroup" data-enable="false">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function enable() {
        $("#btnGroup").data("kendoMobileButtonGroup").enable(true);
    }
    </script>

### select

Select a Button.

#### Parameters

##### li `jQuery | Number`

LI element or index of the Button.

#### Example

    <div data-role="view" data-init="setSelected">
      <ul id="buttongroup" data-role="buttongroup">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function setSelected() {
      var buttongroup = $("#buttongroup").data("kendoMobileButtonGroup");

      // selects by jQuery object
      buttongroup.select(buttongroup.element.children().eq(0));
      // selects by index
      buttongroup.select(1);
    }
    </script>

## Events

### select

Fires when a Button is selected.

#### Example - get the index of the currently selected Button

    <div data-role="view">
      <ul id="buttongroup" data-role="buttongroup" data-select="onSelect">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onSelect(e) {
      var index = this.current().index();
      console.log(index);
    }
    </script>

#### Event Data

##### e.index `Number`

The index of the selected button
