---
title: Switch
page_title: Configuration, methods and events of Kendo UI Mobile Switch
description: How to quickly configure the checked and unchecked state of Mobile Switch widget.
---

# kendo.mobile.ui.Switch

Represents the Kendo UI Mobile Switch widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### checked `Boolean`*(default: false)*

The checked state of the widget.

#### Example

    <div id="foo" data-role="view">
      <input type="checkbox" data-role="switch" data-checked="false" />
      <input type="checkbox" data-role="switch" data-checked="true" />
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow the user to change its checked state. The widget is enabled by default.


#### Example - initialize disabled switch.

    <div data-role="view">
        <input type="checkbox" data-role="switch" data-enable="false" />
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>

### offLabel `String`*(default: "OFF")*

The OFF label.

#### Example

    <div id="foo" data-role="view">
      <input type="checkbox" data-role="switch" data-off-label="No" data-on-label="Yes" />
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### onLabel `String`*(default: "ON")*

The ON label.

#### Example

    <div id="foo" data-role="view">
      <input type="checkbox" data-role="switch" data-off-label="No" data-on-label="Yes" />
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

## Methods

### check

Get/Set the checked state of the widget.

#### Parameters

##### check `Boolean`

Whether to turn the widget on or off.

#### Returns

`Boolean` The checked state of the widget.

#### Example

    <div id="foo" data-role="view">
      <input id="switch" type="checkbox" data-role="switch" />
      <a data-role="button" data-click="onClick">Change status</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick() {
      // get a reference to the switch widget
      var switchInstance = $("#switch").data("kendoMobileSwitch");

      // get the checked state of the switch.
      console.log(switchInstance.check());
      // set the checked state of the switch.
      switchInstance.check(true);
      console.log(switchInstance.check());
    }
    </script>

### destroy
Prepares the **Switch** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Switch element from DOM.

#### Example

    <div id="foo" data-role="view">
      <input id="switch" type="checkbox" data-role="switch" />
      <a data-role="button" data-click="onClick">Destroy</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onClick() {
      var switchInstance = $("#switch").data("kendoMobileSwitch");

      switchInstance.destroy();
      switchInstance.wrapper.remove();
    }
    </script>

### enable

Changes the enabled state of the widget.

#### Parameters

##### enable `Boolean`

Whether to enable or disable the widget.

#### Example

    <div data-role="view">
        <input id="foo" type="checkbox" data-role="switch" />
        <a data-role="button" data-click="disable">Disable</a>
    </div>

    <script>
        var app = new kendo.mobile.Application();
        function disable() {
            $("#foo").data("kendoMobileSwitch").enable(false);
        }
    </script>

### refresh

Forces the Switch to recalculate its dimensions. Useful when major changes in the interface happen dynamically, like for instance changing the skin.

#### Example

    <div id="foo" data-role="view">
      <input id="switch" type="checkbox" data-role="switch" />
      <a data-role="button" data-click="changeSkin">Flat</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    changeSkin = function (e) {
        if (e.sender.element.text() === "Flat") {
            e.sender.element.text("Native");
            mobileSkin = "flat";
        } else {
            e.sender.element.text("Flat");
            mobileSkin = "";
        }

        app.application.skin(mobileSkin);

        $("#switch").data("kendoMobileSwitch").refresh();
    };
    </script>

### toggle

Toggle the checked state of the widget.

#### Example

    <div id="foo" data-role="view">
      <input id="switch" type="checkbox" data-role="switch" />
      <a data-role="button" data-click="onClick">Toggle</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onClick() {
      var switchInstance = $("#switch").data("kendoMobileSwitch");
      // toggle the checked state of the switch.
      switchInstance.toggle();
    }
    </script>

## Events

### change

Fires when the state of the widget changes

#### Event Data

##### e.checked `Object`

The checked state of the widget.

#### Handle mobile Switch change event

    <div id="foo" data-role="view">
      <input id="switch" type="checkbox" data-role="switch" data-change="onChange" />
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onChange(e) {
      console.log(e.checked);//true of false
    }
    </script>
