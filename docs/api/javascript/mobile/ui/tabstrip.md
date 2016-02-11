---
title: TabStrip
page_title: Configuration, methods and events of Kendo UI Mobile TabStrip
description: How to configure Mobile Tabstrip widget with a few clicks, change its behavior and use supported events.
---

# kendo.mobile.ui.TabStrip

Represents the Kendo UI Mobile TabStrip widget. Inherits from [kendo.mobile.ui.Widget](/api/javascript/mobile/ui/mobilewidget).

## Configuration

### selectedIndex `Number`*(default: 0)*

 The index of the initially selected tab.

#### Example

    <div id="foo" data-role="view" data-layout="default">
      foo
    </div>

    <div data-role="layout" data-id="default">
      <div data-role="footer">
        <div data-role="tabstrip" data-selected-index="1">
          <a data-icon="contacts">foo</a>
          <a data-icon="contacts">bar</a>
          <a data-icon="info">baz</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

## Methods

### badge

**Introduced in Q1 2013 SP** Sets a badge on one of the **tabs** with the specified value. If invoked without second parameter, returns the tab's current badge value. Set the value to false to remove the badge.

#### Parameters

##### tab `Selector|Number`

The target tab specified either as a jQuery selector/object or as an item index.

##### value `String|Boolean`

The target value to be set or false to be removed.

#### Returns

`String|kendo.mobile.ui.TabStrip` Returns the badge value if invoked without parameters, otherwise returns the TabStrip object.

#### Example

    <div id="foo" data-role="view" data-init="onInit">
      <div data-role="footer">
        <div data-role="tabstrip">
          <a data-icon="contacts">foo</a>
          <a data-icon="contacts">bar</a>
          <a data-icon="info">baz</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onInit(e) {
      var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");

      // Set the first tab badge value to 5
      tabstrip.badge(0, 5);
      // Get the current badge value on the first tab.
      console.log(tabstrip.badge(0));
    }
    </script>

### currentItem

Get the currently selected tab DOM element.

#### Returns

`jQuery` the currently selected tab DOM element.

#### Example

    <div id="foo" data-role="view" data-init="onInit">
      <div data-role="footer">
        <div data-role="tabstrip">
          <a data-icon="contacts">foo</a>
          <a data-icon="contacts">bar</a>
          <a data-icon="info">baz</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onInit(e) {
      var tabstrip = e.view.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
      var currentItem = tabstrip.currentItem();
      console.log(currentItem);
    }
    </script>

### destroy
Prepares the **TabStrip** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the TabStrip element from DOM.

#### Example

    <div id="foo" data-role="view">
      <a data-role="button" data-click="onClick">Button</a>
      <div data-role="footer">
        <div data-role="tabstrip">
          <a data-icon="contacts">foo</a>
          <a data-icon="contacts">bar</a>
          <a data-icon="info">baz</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick() {
      var tabstrip = app.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
      tabstrip.destroy(); //detach events
      tabstrip.wrapper.remove(); //remove DOM elements
    }
    </script>

### switchTo

Set the mobile TabStrip active tab to the tab with the specified URL. This method doesn't change the current View. To change the View, use Application's [navigate](/api/mobile/application#navigate) method instead.

#### Parameters

##### url `String|Number`

The URL or zero based index of the tab.

#### Example

    <div id="foo" data-role="view">
      <a data-role="button" data-click="onClick">Button</a>
      <div data-role="footer">
        <div data-role="tabstrip">
          <a href="#foo" data-icon="contacts">foo</a>
          <a href="#bar" data-icon="contacts">bar</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick() {
      var tabstrip = app.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
      tabstrip.switchTo("#bar"); //activate "bar" tab
    }
    </script>

### switchByFullUrl

Set the mobile TabStrip active tab to the tab with the specified full URL. This method doesn't change the current View. To change the View, use Application's [navigate](/api/mobile/application#navigate) method instead.

> Use switchByFullUrl when you want to active a tab that has URL with query string parameters.

#### Parameters

##### url `String`

The URL of the tab.

#### Example

    <div id="foo" data-role="view">
      <a data-role="button" data-click="onClick">Button</a>
      <div data-role="footer">
        <div data-role="tabstrip">
          <a href="#foo" data-icon="contacts">foo</a>
          <a href="#foo?bar=qux" data-icon="contacts">bar</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick() {
      var tabstrip = app.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
      tabstrip.switchByFullUrl("#foo?bar=qux"); //activate second tab
    }
    </script>

### clear

Clear the currently selected tab.

    <div id="foo" data-role="view">
      <a data-role="button" data-click="onClick">Button</a>
      <div data-role="footer">
        <div data-role="tabstrip">
          <a href="#foo" data-icon="contacts">foo</a>
          <a href="#bar" data-icon="contacts">bar</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onClick() {
      var tabstrip = app.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
      tabstrip.clear();
    }
    </script>

## Events

### select

Fires when tab is selected.

#### Event Data

##### e.item `jQuery`

The selected tab

#### Example - prevent tab selection

    <div id="foo" data-role="view">
      <div data-role="footer">
        <div data-role="tabstrip" data-select="onSelect">
          <a data-icon="contacts">foo</a>
          <a data-icon="contacts">bar</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onSelect(e) {
      e.preventDefault(); //prevent the tab selection
    }
    </script>
