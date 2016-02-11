---
title: NavBar
page_title: Configuration, methods and events of Kendo UI Mobile NavBar
description: How to use methods in Mobile NavBar widget.
---

# kendo.mobile.ui.NavBar

Represents the Kendo UI Mobile NavBar widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Methods

### destroy
Prepares the **NavBar** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the NavBar element from DOM.

#### Example

    <div id="foo" data-role="view" data-title="navbar demo">
      <header data-role="header">
        <div data-role="navbar">
          <a class="nav-button" data-align="left" data-icon="action" data-role="button"></a>
          <span data-role="view-title"></span>
          <a class="nav-button" data-align="right" data-icon="refresh" data-role="button"></a>
        </div>
      </header>
      <a data-role="button" data-click="onClick">Button</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick(e) {
      var navbar = app.view()
        .header
        .find(".km-navbar")
        .data("kendoMobileNavBar");

      navbar.destroy();
    }
    </script>

### title

Update the title element text. The title element is specified by setting the `role` data attribute to `view-title`.

#### Parameters

##### value `String`

The text of title

#### Example

    <div id="foo" data-role="view" data-title="navbar demo">
      <header data-role="header">
        <div data-role="navbar">
          <span data-role="view-title"></span>
        </div>
      </header>
      <a data-role="button" data-click="onClick">Change title</a>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick(e) {
      var navbar = app.view()
        .header
        .find(".km-navbar")
        .data("kendoMobileNavBar");

      navbar.title("changed");
    }
    </script>
