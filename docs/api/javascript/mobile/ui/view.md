---
title: View
page_title: Configuration, methods and events of Kendo UI Mobile View
description: How to configure Kendo UI mobile view widget and use events to create highly interactive mobile applications.
---

# kendo.mobile.ui.View

## Configuration

### model `String | ObservableObject`*(default: null)*

The MVVM model to bind to. If a string is passed, The view will try to resolve a reference to the view model variable in the global scope.

#### Example

    <div data-role="view" data-model="foo">
       <span data-bind="text:bar"></span>
    </div>

    <script>
    var foo = { bar: "baz" }
    new kendo.mobile.Application();
    </script>

### reload `Boolean` *(default: false)*

Applicable to remote views only. If set to true, the remote view contents will be reloaded from the server (using Ajax) each time the view is navigated to.

#### Example

    <!-- foo.html -->
    <div data-role="view">
        <a data-role="button" href="bar.html">Go to bar</a>
    </div>

    <!-- bar.html -->
    <div data-role="view" data-reload="true">
      I will be requested from the server every time I am displayed
      <a href="#" id="link">Link</a>
    </div>

### scroller `Object` *(default: null)*

Configuration options to be passed to the scroller instance instantiated by the view. For more details, check the scroller [configuration options](/api/mobile/scroller#configuration).

#### A view with elastic scrolling set to false

    <!-- foo.html -->
    <div data-role="view" data-scroller='{"elastic": false}'>
        This view will not bounce when scrolled
    </div>

### stretch `Boolean`*(default: false)*

If set to true, the view will stretch its child contents to occupy the entire view, while disabling kinetic scrolling.
Useful if the view contains an image or a map.

#### Example

    <div data-role="view" data-stretch="true">
      <div style="background: gray">This element will be stretched</div>
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### title `String`

The text to display in the NavBar title (if present) and the browser title.

#### Example

    <div data-role="view" data-title="foo">
      <div data-role="header">
        <div data-role="navbar">
          <span data-role="view-title"></span>
        </div>
      </div>
     </div>

    <script>
    new kendo.mobile.Application();
    </script>

### useNativeScrolling `Boolean`*(default: false)*

If set to true, the view will use the native scrolling available in the current platform. This should help with form issues on some platforms (namely Android and WP8).
Native scrolling is only enabled on platforms that support it: iOS > 5+, Android > 3+, WP8. BlackBerry devices do support it, but the native scroller is flaky.

#### Example

    <div data-role="view" data-use-native-scrolling="true">
      <div style="height: 2000px;">Tall element - this view has native scrolling</div>
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

### zoom `Boolean`*(default: false)*

If set to true, the user can zoom in/out the contents of the view using the pinch/zoom gesture.

#### Example

    <div data-role="view" data-zoom="true">
      <div style="height: 2000px;width:200px;">Big element - the view can be zoomed with two fingers</div>
    </div>

    <script>
    new kendo.mobile.Application();
    </script>

## Methods

### contentElement

Retrieves the current content holder of the View - this is the content element if the View is stretched or the scroll container otherwise.

> **Important:** Use this method to get a reference container in order to remove or append contents to the View

#### Example

    <div data-role="view" id="myView">
        <a data-role="button" data-click="getContentElement">Tap here</a>
    </div>

    <script>
    function getContentElement() {
        var view = $("#myView").data("kendoMobileView");
        console.log(view.contentElement());
    }

    new kendo.mobile.Application();
    </script>

### destroy

Prepares the **View** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the View element from DOM.

#### Example

```
<div data-role="view" id="main">
    <a data-role="button" data-click="destroyView">Destroy and remove view</a>
</div>

<script>
function destroyView() {
  $("#main").data("kendoMobileView").destroy();
  $("#main").remove();
}
new kendo.mobile.Application();
</script>
```

### enable

Enables or disables the user interaction with the view and its contents.

#### Parameters

##### enable `Boolean`

Omitting the parameter or passing `true` enables the view. Passing `false` disables the view.

#### Example - disable a view

    <div data-role="view" id="myView">
        <a data-role="button" data-click="disableView">Tap here</a>
    </div>

    <script>
    function disableView() {
        $("#myView").data("kendoMobileView").enable(false);
    }

    new kendo.mobile.Application();
    </script>

## Events

### afterShow

Fires after the mobile View becomes visible. If the view is displayed with transition, the event is triggered after the transition is complete.

#### Example

    <div data-role="view" id="foo">
        <a href="#bar" data-role="button">Go to bar</a>
    </div>

    <div data-role="view" id="bar" data-after-show="afterShow">
        Bar
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function afterShow(e) {
        console.log(e.view);
    }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### beforeHide

Fires before the mobile View becomes hidden.

#### Example

    <div data-role="view" id="foo" data-before-hide="beforeHide">
        <a href="#bar" data-role="button">Bar</a>
    </div>

    <div id="bar" data-role="view">
        The bar view
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function beforeHide(e) {
        console.log('foo hidden');
    }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### beforeShow

Fires before the mobile View becomes visible. The event can be prevented by calling the `preventDefault` method of the event parameter, in case a redirection should happen.

#### Example

    <div data-role="view" id="foo">
        <a href="#protected" data-role="button">Go to protected</a>
    </div>

    <div data-role="view" id="protected" data-before-show="redirectBack">
        I am a protected view
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function redirectBack(e) {
        e.preventDefault();
        app.navigate("#foo");
    }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### hide

Fires when the mobile View becomes hidden.

#### Example

    <div data-role="view" id="foo" data-hide="onHide">
        <a href="#bar" data-role="button">Bar</a>
    </div>

    <div id="bar" data-role="view">
        The bar view
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function onHide(e) {
        console.log('foo hidden');
    }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### init

Fires after the mobile View and its child widgets are initialized.

#### Example

    <div data-role="view" id="foo" data-init="init">
        Foo
    </div>

    <script>
    var app = new kendo.mobile.Application();

    function init(e) {
        console.log('init');
    }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance

### show

Fires when the mobile View becomes visible.

#### Example

    <div data-role="view" id="foo" data-show="show">
        Foo
    </div>

    <script>
    var app = new kendo.mobile.Application();
    function show(e) {
        console.log('show');
    }
    </script>

#### Event Data

##### e.view `kendo.mobile.ui.View`

The mobile view instance.

### transitionStart

Fires when the mobile view transition starts.

#### Event Data

##### e.type `String`

The transition type. Can be either `"show"` or `"hide"`

### transitionEnd

Fires after the mobile view transition container has its `k-fx-end` class set. Setting CSS properties to the view at the event handler will animate them.

#### Event Data

##### e.type `String`

The transition type. Can be either `"show"` or `"hide"`

## Fields

### header `jQuery`

The **View** (or the applied mobile layout) header DOM element.

### footer `jQuery`

The **View** (or the applied mobile layout) footer DOM element.

### content `jQuery`

The **View** content DOM element. If there is a scroller in the View, it will become a child of this element. Please use the `contentElement` method instead, to always get the correct content element.

### model `kendo.data.ObservableObject`

The **Model** associated with the view

### params `Object`

The currently set query string parameters

### scrollerContent `jQuery`

The View mobile scroller container DOM element. Recommended if scrollable mobile View contents need to be manipulated or replaced. If you don't know if the View has a Scroller initialized, please use the `contentElement` method instead.

#### Replace scrollable View contents

    <div data-role="view" data-init="replaceContents"> Old content</div>

    <script>
    function replaceContents(e) {
      e.view.scrollerContent.html("<b>New content</b>");
    }

    new kendo.mobile.Application();
    </script>
