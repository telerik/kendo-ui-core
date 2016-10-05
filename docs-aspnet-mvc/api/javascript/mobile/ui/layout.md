---
title: Layout
page_title: Configuration, methods and events of Kendo UI Mobile Layout
description: Layout configuration in Kendo UI mobile JavaScript framework, supported methods to control behavior, events that hide and initialize child widgets.
---

# kendo.mobile.ui.Layout

## Configuration

### id `String`*(default: null)*

The id of the layout. **Required**

#### Example

    <div data-role="view" data-layout="default">
      Foo view
    </div>

    <div data-role="layout" data-id="default">
      <header data-role="header"><p>the header</p></header>

      <div data-role="footer"><p>the footer</p></div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

    <style>
      .km-view .km-header,
      .km-view .km-footer {
        color: red;
      }
    </style>

### platform `String`

The specific platform this layout targets. By default, layouts are displayed
on all platforms.

#### Example

    <div data-role="view" data-layout="default">
      Foo view
    </div>

    <div data-role="layout" data-id="default" data-platform="ios">
      <header data-role="header"><p>iOS header</p></header>

      <div data-role="footer"><p>iOS footer</p></div>
    </div>

    <div data-role="layout" data-id="default" data-platform="android">
      <header data-role="header"><p>Android header</p></header>

      <div data-role="footer"><p>Android footer</p></div>
    </div>

    <script>
    var app = new kendo.mobile.Application();
    </script>

    <style>
      .km-view .km-header, .km-view .km-footer {
          color: red;
      }
    </style>

## Events

### hide

Fires when a mobile View using the layout becomes hidden.

#### Event Data

##### e.layout `jQuery`

The mobile layout instance

##### e.view `jQuery`

The mobile view instance

#### Example

    <div id="foo" data-role="view" data-layout="default">
      Foo view
    </div>

    <div id="bar" data-role="view" data-layout="default">
      Bar view
    </div>

    <div data-role="layout" data-id="default" data-hide="onHide">
      <div data-role="footer">
        <div data-role="tabstrip">
          <a href="#foo" data-icon="contacts">foo</a>
          <a href="#bar" data-icon="history">bar</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onHide(e) {
        console.log(e.view.id + " view hidden");
    }
    </script>

### init

Fires after a mobile Layout and its child widgets is initialized.

#### Event Data

##### e.layout `jQuery`

The mobile layout instance

#### Example

    <div id="foo" data-role="view" data-layout="default">
      Foo view
    </div>

    <div data-role="layout" data-id="default"  data-init="onInit">
      <header data-role="header">
        <div data-role="navbar">
          <span data-role="view-title"></span>
        </div>
      </header>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onInit(e) {
        console.log("init");
    }
    </script>

### show

Fires when a mobile View using the layout becomes visible.

#### Event Data

##### e.layout `jQuery`

The mobile layout instance

##### e.view `jQuery`

The mobile view instance

#### Example

    <div id="foo" data-role="view" data-layout="default">
      Foo view
    </div>

    <div id="bar" data-role="view" data-layout="default">
      Bar view
    </div>

    <div data-role="layout" data-id="default"  data-show="onShow">
      <div data-role="footer">
        <div data-role="tabstrip">
          <a href="#foo" data-icon="contacts">foo</a>
          <a href="#bar" data-icon="history">bar</a>
        </div>
      </div>
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function onShow(e) {
      console.log("show");
    }
    </script>
