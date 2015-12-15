---
title: Collapsible
page_title: Configuration, methods and events of Kendo UI Mobile Collapsible widget
description: Configuration, methods and events of Kendo UI Mobile Collapsible widget.
---

# kendo.mobile.ui.Collapsible

Represents the Kendo UI Mobile Collapsible widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### animation `Boolean`*(default: true)*

Turns on or off the animation of the widget.

#### Example - turn off the animation

    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible" data-animation="false">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed purus sed orci aliquet dapibus.</p>
        </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

### collapsed `Boolean`*(default: true)*

If set to `false` the widget content will be expanded initially. The content of the widget is collapsed by default.

#### Example - create initially expanded collapsible panel

    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible" data-collapsed="false">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed purus sed orci aliquet dapibus.</p>
        </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

    <!-- <script src="../src/kendo.mobile.application.js"></script> -->
### collapseIcon `String`*(default: "minus")*

Sets the icon for the header of the collapsible widget when it is in a collapsed state.

#### Example

    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible" data-collapse-icon="arrow-up" data-expand-icon="arrow-down">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>

    <style>
        /*
            define custom icon names, full list of available icons can be found at:
            http://docs.telerik.com/kendo-ui/mobile/icons
        */
        .km-arrow-up:after,
        .km-arrow-up:before {
            content: "\e011";
        }

        .km-arrow-down:after,
        .km-arrow-down:before {
            content: "\e012";
        }
    </style>

### expandIcon `String`*(default: "plus")*

Sets the icon for the header of the collapsible widget when it is in a expanded state.

#### Example

    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible" data-collapse-icon="arrow-up" data-expand-icon="arrow-down">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>

    <style>
        /*
            define custom icon names, full list of available icons can be found at:
            http://docs.telerik.com/kendo-ui/mobile/icons
        */
        .km-arrow-up:after,
        .km-arrow-up:before {
            content: "\e011";
        }

        .km-arrow-down:after,
        .km-arrow-down:before {
            content: "\e012";
        }
    </style>

### iconPosition `String`*(default: "left")*

Sets the icon position in the header of the collapsible widget. Possible values are "left", "right", "top".

#### Example

    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible" data-icon-postion="right">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>

### inset `Boolean`*(default: "false")*

Forses inset appearance - the collapsible panel is padded from the View and receives rounded corners.

#### Example

    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible" data-inset="true">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();
    </script>

## Methods

### collapse

Collapses the content.

#### Parameters

##### instant `Boolean`

Optional. When set to true the collapse action will be performed without animation.

#### Example

    <div id="home" data-role="view" data-init="onInit">
        <div id="collapsible" data-role="collapsible" data-collapsed="false">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();

        function onInit() {
            $("#collapsible").data("kendoMobileCollapsible").collapse();
        }
    </script>

### destroy
Prepares the **Collapsible** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Collapsible element from DOM.

#### Example

    <div data-role="view">
        <div id="collapsible" data-role="collapsible" data-collapsed="false">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      <a data-role="button" data-click="removeBtn">Remove button</a>
    </div>

    <script>
      var app = new kendo.mobile.Application();

      function removeBtn() {
        $("#collapsible").data("kendoMobileCollapsible").destroy(); //detach events
        $("#collapsible").remove();
      }
    </script>

### expand

Expands the content.

#### Parameters

##### instant `Boolean` *optional*

When set to true the expand action will be performed without animation.

#### Example

    <div id="home" data-role="view" data-init="onInit">
        <div id="collapsible" data-role="collapsible">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();

        function onInit() {
            $("#collapsible").data("kendoMobileCollapsible").expand();
        }
    </script>

### resize

Recalculates the content height.

#### Example

    <div id="home" data-role="view">
        <div id="collapsible" data-role="collapsible" data-expand="onExpand">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();

        function onExpand() {
            var that = this;
            setTimeout(function() {
                that.resize();
            });
        }
    </script>

### toggle

Toggles the content visibility.

#### Parameters

##### instant `Boolean` *optional*

When set to true the expand/collapse action will be performed without animation.

#### Example

    <div id="home" data-role="view" data-init="onInit">
        <a data-role="button" data-click="onClick">Toggle</a>
        <div id="collapsible" data-role="collapsible">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();

        function onClick() {
            $("#collapsible").data("kendoMobileCollapsible").toggle();
        }
    </script>

## Events

### collapse

Fires when the user collapses the content.

#### Example

    <div id="home" data-role="view" data-init="onInit">
        <div id="collapsible" data-role="collapsible" data-collapse="collapseHandler">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();

        function collapseHandler() {
            console.log("expand");
        }
    </script>

### expand

Fires when the user expands the content.

#### Example

    <div id="home" data-role="view" data-init="onInit">
        <div id="collapsible" data-role="collapsible" data-expand="expandHandler">
            <h2>Header</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>

    <script>
        var app = new kendo.mobile.Application();

        function expandHandler() {
            console.log("expand");
        }
    </script>
