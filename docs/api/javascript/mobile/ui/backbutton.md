---
title: BackButton
page_title: Configuration, methods and events of Kendo UI Mobile BackButton
description: Examples how to initialize Kendo UI mobile BackButton based on role data attribute and using jQuery plugin syntax.
---

# kendo.mobile.ui.BackButton

Represents the Kendo UI Mobile BackButton widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## BackButton

The mobile BackButton widget navigates to the previously visited mobile View when pressed. A view can be explicitly set using the `href` attribute.

#### Initialize Kendo mobile BackButton based on role data attribute

    <div id="foo" data-role="view">
      <a data-role="button" href="#bar">Foo</a>
    </div>

    <div id="bar" data-role="view">
      <a data-role="backbutton">Back</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

#### Initialize Kendo mobile BackButton using jQuery plugin syntax

    <div id="foo" data-role="view">
      <a data-role="button" href="#bar">Foo</a>
    </div>

    <div id="bar" data-role="view" data-init="onInit">
      <a id="backbutton">Back</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onInit() {
      $("#backbutton").kendoMobileBackButton();
    }
    </script>

## Methods

### destroy
Prepares the **BackButton** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the BackButton element from DOM.

#### Example

      <div id="foo" data-role="view">
        <a id="backbutton" data-role="backbutton">Back</a>
        <a data-role="button" data-click="destroy">Destroy it</a>
      </div>

      <script>
      var app = new kendo.mobile.Application();

      function destroy() {
        $("#backbutton").data("kendoMobileBackButton").destroy();
      }
      </script>

## Events

### click

Fires when the user taps the button.

#### Example - prevent navigation

    <div id="foo" data-role="view">
      <a data-role="button" href="#bar">Foo</a>
    </div>

    <div id="bar" data-role="view">
      <a data-role="backbutton" data-click="onClick">Back</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick(e) {
      e.preventDefault(); //prevent navigating back
    }
    </script>

#### Event Data

##### e.target `jQuery`

The clicked DOM element

##### e.button `jQuery`

The button DOM element
