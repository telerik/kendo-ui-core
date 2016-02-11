---
title: Button
page_title: Configuration, methods and events of Kendo UI Mobile Button
description: Find which events to use in Mobile Button Widget.
---

# kendo.mobile.ui.Button

Represents the Kendo UI Mobile Button widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### badge `String`

 The badge of the button.

#### Example - configuration based on data attributes

    <div id="foo" data-role="view">
      <a data-role="button" data-badge="10">Foo</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

#### Example - configuration based on jQuery plugin syntax

    <div id="foo" data-role="view" data-init="onInit">
      <a id="button">Foo</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onInit() {
      $("#button").kendoMobileButton({ badge: 10 });
    }
    </script>

### clickOn `String` *(default "up")*

Configures the DOM event used to trigger the button click event/navigate in the mobile application. Can be set to `"down"` as an alias for `touchstart`, `mousedown`, `MSPointerDown`, and `PointerDown` vendor specific events.
Setting the `clickOn` to `down` usually makes sense for buttons in the header or in non-scrollable views for increased responsiveness.

By default, buttons trigger click/navigate when the user taps the button (a press + release action sequence occurs).

#### Example - button which reacts immediately when pressed

```
    <div data-role="view" data-title="Foo">
        <div data-role="header">
            <div data-role="navbar">
                <span data-role="viewtitle"></span>
                <a data-role="button" data-click-on="down" data-align="right" data-click="onClick">Button</a>
            </div>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
        function onClick() {
            console.log("click");
        }
    </script>
```

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow the user to click it. The widget is enabled by default.


#### Example - initialize disabled button.

    <div data-role="view">
        <a data-role="button" data-enable="false" data-click="onClick">Button</a>
    </div>

    <script>
        var app = new kendo.mobile.Application();
        function onClick() {
            console.log("click");
        }
    </script>

### icon `String`

 The icon of the button. It can be either one of the built-in icons, or a custom one.

#### Example

    <div id="foo" data-role="view">
      <a data-role="button" data-icon="play">Foo</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

## Methods

### badge

**Introduced in Q1 2013 SP** Sets a badge on the **Button** with the specified value. If invoked without parameters, returns the current badge value. Set the value to `false` to remove the badge.

#### Parameters

##### value `String|Boolean`

The target value to be set or `false` to be removed.

#### Returns

`String | kendo.mobile.ui.Button` the badge value if invoked without parameters, otherwise the Button object.

#### Example

    <div id="foo" data-role="view">
      <a data-role="button" data-badge="1" data-click="countClicks">Foo</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function countClicks() {
        var badge = parseInt(this.badge()); //get badge value
        badge++;
        this.badge(badge); //set new badge value
    }
    </script>

#### Example - remove the badge

    <div data-role="view">
      <a id="btn" data-role="button" data-badge="1">Foo</a>
      <a data-role="button" data-click="removeBadge">Remove badge</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function removeBadge() {
      $("#btn").data("kendoMobileButton").badge(false);
    }
    </script>

### destroy
Prepares the **Button** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Button element from DOM.

#### Example

    <div data-role="view">
      <a id="btn" data-role="button">Foo</a>
      <a data-role="button" data-click="removeBtn">Remove button</a>
    </div>

    <script>
      var app = new kendo.mobile.Application();

      function removeBtn() {
        $("#btn").data("kendoMobileButton").destroy(); //detach events
        $("#btn").remove();
      }
    </script>

### enable

Changes the enabled state of the widget.

#### Parameters

##### enable `Boolean`

Whether to enable or disable the widget.

#### Example

    <div data-role="view">
        <a id="foo" data-role="button" data-click="onClick">Button</a>
        <input type="checkbox" data-role="switch" data-change="onChange" />
    </div>

    <script>
        var app = new kendo.mobile.Application();
        function change() {
            $("#foo").data("kendoMobileButton").enable(this.check());
        }
        function onClick() {
            console.log("click");
        }
    </script>

## Events

### click

Fires when the user taps the button.

#### Example

    <div data-role="view">
      <a id="btn" data-role="button" data-click="onClick">Click me!</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onClick() {
      console.log("clicked");
    }
    </script>

#### Event Data

##### e.target `jQuery`

The clicked DOM element

##### e.button `jQuery`

The button DOM element
