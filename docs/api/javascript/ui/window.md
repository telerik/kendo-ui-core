---
title: Window
page_title: Configuration, methods and events of Kendo UI Window
description: How to initialize a Window UI widget and configure its behaviors, center a window, set its content and toggle the state of the UI widget.
res_type: api
component: window
---

# kendo.ui.Window

Represents the Kendo UI Window. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actions `Array` *(default: ["Close"])*

The buttons for interacting with the Window.

The predefined array values are:

* `Close`
* `Refresh`
* `Minimize`
* `Maximize`
* `Pin`

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: [ "Minimize", "Maximize" ]
    });
    </script>

### animation `Boolean|Object`

A collection of `{Animation}` objects that is used to change the default animations. When set to `false`, all animations will be disabled.

> `animation:true` is not a valid configuration.

#### Example - disabling the animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: false
    });
    </script>

### animation.close `Object`

The animation that will be used when a Window closes.

#### Example - disabling the closing animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: {
        close: false
      }
    });
    </script>

### animation.close.effects `String`

The effect that will be used when the popup closes.

#### Example - using only the fade-out animation when closing the Window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: {
        close: {
          effects: "fade:out"
        }
      }
    });
    </script>

### animation.close.duration `Number`

Defines the duration of the closing animation.

#### Example - making the closing animation two seconds long

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: {
        close: {
          duration: 2000
        }
      }
    });
    </script>

### animation.open `Object`

The animation that will be used when a Window opens.

#### Example - disabling the opening animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: {
        open: false
      },
      visible: false
    });
    $("#dialog").data("kendoWindow").open();
    </script>

### animation.open.effects `String`

The effect that will be used when the popup opens.

#### Example - using only the fade animation when opening the Window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: {
        open: {
          effects: "fade:in"
        }
      },
      visible: false
    });
    $("#dialog").data("kendoWindow").open();
    </script>

### animation.open.duration `Number`

Defines the duration of the opening animation.

#### Example - making the opening animation 100 milliseconds long

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: {
        open: {
          duration: 100
        }
      },
      visible: false
    });
    $("#dialog").data("kendoWindow").open();
    </script>

### appendTo `Object|String` *(default: document.body)*

The element to which the Window will be appended. It is beneficial to [use the Window together with a form](/web/window/overview#using-kendo-ui-window-with-a-form) which does not constrain the dragging of the Window within the specific element. For such scenarios, use the [`draggable.containment`](/api/javascript/ui/window/configuration/draggable.containment) setting.

> Appending the Window to an element styled with `overflow:hidden`, `overflow:auto`, or `overflow:scroll` may result in undesired behavior because the Window will not be displayed outside the  boundaries of the element. Unwanted scrollbars may appear as well.

#### Example - setting the Window container to be with the id="mainForm" form

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      appendTo: "form#mainForm"
    });
    </script>

### autoFocus `Boolean` *(default: true)*

Determines whether the Window will be focused automatically when opened. The property also influences the focus behavior when an already opened Window is clicked.

#### Example - setting the autoFocus property

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      autoFocus: false
    });
    </script>

### content `Object|String`

Specifies a URL or request options from where the Window will load its content.

> For URLs which start with a protocol (for example, http://), a container `iframe` element is automatically created. As this behavior may change in future versions, try to always use the [iframe configuration option](#iframe).

#### Example - fetching content from the server

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      content: "/details"
    });
    </script>

### content.template `String`

The template for the content of a Window. Returned data from the server will be given as the `data` of this template.

If the returned data is JSON, the [`dataType`](http://api.jquery.com/jQuery.ajax/) parameter has to be passed so that the data gets parsed by jQuery.

If the URL contains a protocol, set `iframe` to `false`. Otherwise, the JSON response will be injected in the content area of the Window as is.

#### Example - fetching JSON and displaying it through a template

    <div id="dialog">
        <p><strong>This example will not work unless you define a valid JSON service URL for `content.url`.</p>
        <p>The expected JSON response is:
            <pre>

            { username: "...my username here..." }

            </pre>
        </strong></p>
    </div>

    <script>
    $("#dialog").kendoWindow({
      content: {
        url: "/userDetails",
        dataType: "json",
        iframe: false,
        template: "User name: #= data.username #"
      }
    });
    </script>

### draggable `Object|Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the dragging of the widget.

#### Example - disabling the dragging of the Window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      draggable: false
    });
    </script>

#### Example - setting draggable object configuration

    <div id="container">
      <div id="dialog">
        <div style="width: 20px; height: 20px; border: 1px solid red;" id="handle"></div>
      </div>
    </div>
    <script>
    $("#dialog").kendoWindow({
      draggable: {
        containment: "#container",
        axis: "x",
        dragHandle: "#handle"
      }
    });
    </script>

### draggable.containment `String|Element|jQuery` *default: ""*

Defines the element in which the window will be able to move. The window is appended to this element and in this way overrides the [`appendTo`](/api/javascript/ui/window/configuration/draggable.containment) option. Accepts either a selector or an element.

> The containment element has to be positioned, that is, its CSS `position` attribute has to be set to `relative`, `absolute`, or `fixed`.

#### Example

    <style>
        #container {
          position: relative;
          width: 500px;
          height: 500px;
          border: 1px solid grey;
        }
    </style>

    <div id="container">
        <div id="window">
            <p>Alvar Aalto is one of the greatest names in modern architecture and design.
              Glassblowers at the iittala factory still meticulously handcraft the legendary vases
              that are variations on one theme, fluid organic shapes that let the end user decide the use.
            </p>
        </div>
    </div>

    <script>
        $(document).ready(function() {
          $("#window").kendoWindow({
            width: "300px",
            height: "200px",
            draggable: {
                containment: "#container"
            }
          });
        });
    </script>

### draggable.axis `String` *default: ""*

Constrains dragging to the horizontal (x) or to the vertical (y) axis.

The supported values are:

* `x`
* `y`

#### Example

    <div id="container">
      <div id="dialog">
      </div>
    </div>
    <script>
    $("#dialog").kendoWindow({
      draggable: {
        axis: "x"
      }
    });
    </script>

### draggable.dragHandle `String` *default: ".k-window-titlebar"*

Restricts the dragging of the window through the specified element which will be part of the window content. Accepts either a selector or an element.

#### Example

    <div id="dialog">
      <div style="width: 20px; height: 20px; border: 1px solid red;" id="handle"></div>
    </div>
    <script>
    $("#dialog").kendoWindow({
      draggable: {
        dragHandle: "#handle"
      }
    });
    </script>

### iframe `Boolean`

Explicitly states whether a content `iframe` will be created. For more information, refer to the documentation on [using `iframes`](/web/window/overview#using-iframes).

#### Example - loading the full page

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      content: "http://www.telerik.com/",
      iframe: true
    });
    </script>

### height `Number | String`

Specifies the height of the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      height: 400
    });
    </script>

#### Example - specifying the height of the Window in percent

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      height: "50%"
    });
    </script>

### maxHeight `Number` *(default: Infinity)*

The maximum height (in pixels) that may be achieved by resizing the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      maxHeight: 300
    });
    </script>

### maxWidth `Number` *(default: Infinity)*

The maximum width (in pixels) that may be achieved by resizing the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      maxWidth: 300
    });
    </script>

### minHeight `Number` *(default: 50)*

The minimum height (in pixels) that may be achieved by resizing the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      minHeight: 100
    });
    </script>

### minWidth `Number` *(default: 50)*

The minimum width (in pixels) that may be achieved by resizing the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      minWidth: 100
    });
    </script>

### modal `Boolean|Object` *(default: false)*

Specifies whether the Window will display a modal overlay over the page.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      modal: true
    });
    </script>

### modal.preventScroll `Boolean` *(default: false)*

Specifies whether the document will stop scrolling when a modal dialog is opened. Closing the modal dialog has to restore the initial document overflow. The `modal.preventScroll` setting will modify the overflow rule of the document and, therefore, cannot be used together with the [`containment`](/api/javascript/ui/window/configuration/draggable.containment) option.

> Multiple windows with different `preventScroll` settings are not supported.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      modal: {
          preventScroll: true
      }
    });
    </script>

### pinned `Boolean` *(default: false)*

Specifies whether the Window will be pinned, that is, that it will not move together with the page content during scrolling.

#### Example

    <div style="height: 5000px;"></div>
    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      pinned: true,
      position: { top: 100 }
    });
    </script>

### position `Object`

A collection of one or two members which define the initial top and/or left position of the Window or the position of the [`containment` element](/api/javascript/ui/window/configuration/draggable.containment) on the page.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      position: {
        top: 100, // or "100px"
        left: "20%"
      }
    });
    </script>

### position.top `Number|String`

Specifies the initial top position of the Window. Numeric values are treated as pixels. String values can specify pixels, percentages, ems, or other valid values.

### position.left `Number|String`

Specifies the initial left position of the Window. Numeric values are treated as pixels. String values can specify pixels, percentages, ems or other valid values.

### resizable `Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the resizing of the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      resizable: false
    });
    </script>

### scrollable `Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the scrolling of the Window contents.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      scrollable: false
    });
    </script>

### title `Object|String|Boolean` *default: ""*

The text in the title bar of the Window. If set to `false`, the Window will be displayed without a title bar.

> The title bar buttons of the Window will not be displayed. Unless [`dragHandle`](/api/javascript/ui/window/configuration/draggable.draghandle) is configured, this will prevent the Window from dragging.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      title: "Customer details"
    });
    </script>

#### Example - creating a Window without a title

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      title: false
    });
    </script>

### title.text `String` *default: ""*

The text in the title bar of the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      title: {
        text: "Customer details"
      }
    });
    </script>

### title.encoded `Boolean` *default: true*

Specifies whether the title text will be encoded.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      title: {
        text: "<b>Customer details</b>",
        encoded: false
      }
    });
    </script>

### visible `Boolean` *(default: true)*

Specifies whether the Window will be initially visible.

#### Example - showing a dialog after one second delay

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      visible: false
    });
    setTimeout(function() {
      $("#dialog").data("kendoWindow").open();
    }, 1000);
    </script>

### width `Number | String`

Specifies the width of the Window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      width: 400
    });
    </script>

#### Example - specifying the width of the Window in percentage points

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      width: "50%"
    });
    </script>


### size `String` *(default: "auto")*

Sets a predefined size to the Window. The `width` and `height` configuration options override the predefined `size`.

The supported values are:

* `auto`
* `small`
* `medium`
* `large`

#### Example

    <div id="window"></div>
    <script>
    $("#window").kendoWindow({
      size: "wide"
    });
    </script>

## Methods

### center

Centers the Window within the viewport.

If the Window has no set dimensions and is centered before its content is loaded with Ajax, it might resize after the content is loaded. This will change the position of the widget on the screen and it will no longer be centered. If you need to center the Window, then either center it in its [`refresh`](/api/javascript/ui/window/events/refresh) event or set [explicit dimensions](/api/javascript/ui/window#configuration-height).

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining. For example, center and open the Window with a single expression.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.center();
    // chaining example
    // dialog.center().open();
    </script>

### close

Closes the Window.

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example - closing a Window after one second

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    setTimeout(function() {
      dialog.close();
    }, 1000);
    </script>

### content

Gets or sets the content of a Window. When used as a setter, supports chaining.

#### Parameters

##### content `String|jQuery` *(optional)*

The content of the Window. Can be an HTML string or a jQuery object.

#### Returns

`String` - If used a getter, the current content of the Window. If used as a setter, the method returns the Window object to support chaining.

#### Example - getting the content of the Window

    <div id="dialog">foo</div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    console.log(dialog.content()); // logs "foo"
    </script>

#### Example - setting the content of the Window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.content("Kendo UI all the things!");
    </script>

### destroy

Destroys the Window and its modal overlay if necessary. Removes the HTML elements of the widget from the DOM.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.destroy();
    </script>

### isMaximized

Indicates whether the Window is maximized.

#### Returns

`Boolean`

#### Example - checking if the Window is maximized

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.maximize();
    var maximized = dialog.isMaximized();
    </script>

### isMinimized

Indicates whether the Window is minimized.

#### Returns

`Boolean`

#### Example - checking if the Window is minimized

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.minimize();
    var minimized = dialog.isMinimized();
    </script>

### maximize

Maximizes a Window to the entire viewing area of the user agent. Triggers the `resize` event.

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.maximize();
    </script>

### minimize

Minimizes a Window to its title bar.

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.minimize();
    </script>

### open

Opens a Window and brings it on top of any other open Window instances by internally calling [`toFront`](/api/javascript/ui/window/methods/tofront).

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      visible: false
    });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.open();
    </script>

### pin

Pins the Window to its current position with a `position:fixed` style, that is, the widget stops moving together with the other page content when the page is scrolled. The user will still be able to move the Window with the mouse or through the keyboard.

#### Example

    <div style="height: 5000px;"></div>
    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      position: { top: 100 }
    });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.pin();
    </script>

### refresh

Refreshes the content of a Window from a remote URL or from the initially defined [content template](/api/javascript/ui/window/configuration/content.template).

> Passing `data` and non-`GET` requests cannot be sent to an `iframe` as they require a form with a `target` attribute.

#### Parameters

##### options `Object|String`

Options for requesting data from the server. If omitted, the Window uses the `content` property that was supplied when the Window was created. Any specified options will be passed to `jQuery.ajax()`.

##### options.url `String`

The server URL that will be requested.

##### options.cache `Boolean`

Indicates whether the Ajax request may use a previously cached response. By default, Ajax request caching is not used.

##### options.data `Object`

A JSON object which contains the data that will be passed to the server.

##### options.type `String`

The HTTP request method (`GET`, `POST`).

##### options.template `String`

A template that will be used for displaying the requested data.

##### options.iframe `Boolean`

Indicates whether the content will be fetched within an `iframe` or with AJAX, and rendered on the same page.

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.refresh("/feedbackForm");

    dialog.refresh({
        url: "/feedbackForm",
        data: { userId: 42 }
    });

    dialog.refresh({
        url: "/userInfo", // returns JSON, { firstName: "Alyx", lastName: "Vance" }
        data: { userId: 42 },
        dataType: "json",
        template: "Hello, #= firstName # #= lastName #"
    });
    </script>

### restore

Restores a maximized or minimized Window to its previous state. Triggers the `resize` event.

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");

    // maximize the Window
    dialog.maximize();

    setTimeout(function() {
      // restore its original size
      dialog.restore();
    }, 1000);
    </script>

### setOptions

Allows the Window to be configured with new options.

If you change the [content url](/api/javascript/ui/window#configuration-content), call [`refresh`](/api/javascript/ui/window/methods/refresh) afterwards. Another option is to directly execute the `refresh` method with the new URL.

Changing the size or the position of the Window is possible only if the widget is not maximized or minimized.

#### Parameters

##### options `Object`

The configuration options that will be set.

#### Example - setting new dimensions to the Window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.setOptions({
      width: 180,
      height: 225
    });
    </script>

### title `String|Boolean|Object` *default: ""*

Gets or sets the title of a Window. When used as a setter, supports chaining.

#### Parameters

##### text `String` *(optional)*

The title of the Window.

#### Returns

`String` - If used as a getter, the current Window title. If used as a setter, the method returns the Window object to support chaining.

#### Example - getting the title of the Window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    var title = dialog.title();
    </script>

#### Example - setting the title of a Window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.title("Hello");
    </script>

### toFront

Increases the `z-index` style of a Window [`wrapper`](/intro/widget-basics/wrapper-element) to bring the instance on top of other open Windows. This method is executed automatically when the [`open`](/api/javascript/ui/window/methods/open) method is used.

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.toFront();
    </script>

### toggleMaximization

Toggles a Window between a maximized and restored state. Triggers the `resize` event.

#### Returns

`kendo.ui.Window` - Returns the Window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.toggleMaximization();
    </script>

### unpin

Disables the pinned state of the Window so that the widget will move together with the other page content when the page is scrolled.

#### Example

    <div style="height: 5000px;"></div>
    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      pinned: true,
      position: { top: 100 }
    });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.unpin();
    </script>

## Events

### activate

Triggered when a Window has finished its opening animation.

#### Example - subscribe to the "activate" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      activate: function() {
        // the opening animation has finished
      }
    });
    </script>

#### Example - subscribe to the "activate" event after initialization

    <div id="dialog"></div>
    <script>
    function window_activate() {
      // the opening animation has finished
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("activate", window_activate);
    </script>

### close

Triggered when a Window is closed either by the user or through the `close()` method.

#### Event Data

##### e.userTriggered `Boolean`

Indicates whether the close action was triggered by the user either by clicking the **Close** button or by pressing `Esc`. When the `close` method was called, this field is `false`.

#### Example - subscribing to the close event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      close: function(e) {
        // the closing animation has finished
      }
    });
    </script>

#### Example - subscribing to the close event after initialization

    <div id="dialog"></div>
    <script>
    function window_close(e) {
      // the closing animation has finished
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("close", window_close);
    </script>

### deactivate

Triggered when a Window has finished its closing animation.

#### Example - subscribing to the deactivate event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      deactivate: function() {
        // the closing animation is about to finish
      }
    });
    </script>

#### Example - subscribing to the deactivate event after initialization

    <div id="dialog"></div>
    <script>
    function window_deactivate() {
      // the closing animation is about to start
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("deactivate", window_deactivate);
    </script>

### dragend

Triggered when a Window has been moved by the user.

#### Example - subscribing to the dragend event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      dragend: function() {
        // the user has released the Window after dragging
      }
    });
    </script>

#### Example - subscribing to the dragend event after initialization

    <div id="dialog"></div>
    <script>
    function window_dragend() {
      // the user has released the Window after dragging
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("dragend", window_dragend);
    </script>

### dragstart

Triggered when the user starts to move the Window.

#### Example - subscribing to the dragstart event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      dragstart: function() {
        // the user has started dragging the Window
      }
    });
    </script>

#### Example - subscribing to the dragstart event after initialization

    <div id="dialog"></div>
    <script>
    function window_dragstart() {
      // the user has started dragging the Window
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("dragstart", window_dragstart);
    </script>

### error

Triggered when an Ajax request for content fails.

#### Event Data

##### e.xhr `jqXHR`

The XHR request object as returned from [`jQuery.ajax`](http://api.jquery.com/jQuery.ajax/).

##### e.status `String`

The status of the request as returned from [`jQuery.ajax`](http://api.jquery.com/jQuery.ajax/).

#### Example - subscribing to the error event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      error: function(e) {
        console.log("Request failed with status " + e.status)
      }
    });
    </script>

#### Example - subscribing to the error event after initialization

    <div id="dialog"></div>
    <script>
    function window_error(e) {
      console.log("Request failed with status " + e.status)
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("error", window_error);
    </script>

### maximize

Triggered when the user maximizes the Window. Introduced in 2016.Q1.SP1.

#### Example - subscribing to the maximize event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: ["Maximize"],
      maximize: function(e) {
        console.log("Window was maximized")
      }
    });
    </script>

#### Example - subscribing to the maximize event after initialization

    <div id="dialog"></div>
    <script>
    function window_maximize(e) {
      console.log("Window was maximized")
    }
    $("#dialog").kendoWindow({ actions: ["Maximize"] });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("maximize", window_maximize);
    </script>

### minimize

Triggered when the user minimizes the Window. Introduced in 2016.Q1.SP1.

#### Example - subscribing to the minimize event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: ["Minimize"],
      minimize: function(e) {
        console.log("Window was minimized")
      }
    });
    </script>

#### Example - subscribing to the minimize event after initialization

    <div id="dialog"></div>
    <script>
    function window_minimize(e) {
      console.log("Window was minimized")
    }
    $("#dialog").kendoWindow({ actions: ["Minimize"] });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("minimize", window_minimize);
    </script>

### open

Triggered when a Window is opened, that is, when the `open()` method is called.

#### Example - subscribing to the open event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      open: function() {
        // the opening animation is about to start
      }
    });
    </script>

#### Example - subscribing to the open event after initialization

    <div id="dialog"></div>
    <script>
    function window_open() {
      // the opening animation is about to start
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("open", window_open);
    </script>

### refresh

Triggered when the content of a Window has finished loading via Ajax, when the Window `iframe` has finished loading, or when the **Refresh** button has been clicked on a Window with static content.

#### Example - subscribing to the refresh event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      refresh: function() {
        // new content has been fetched
      }
    });
    </script>

#### Example - subscribing to the refresh event after initialization

    <div id="dialog"></div>
    <script>
    function window_refresh() {
      // new content has been fetched
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("refresh", window_refresh);
    </script>

### resize

Triggered when the user resizes the Window.

#### Example - subscribing to the resize event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      resize: function() {
        // the user has finished resizing the Window
      }
    });
    </script>

#### Example - subscribing to the resize event after initialization

    <div id="dialog"></div>
    <script>
    function window_resize() {
      // the user has finished resizing the Window
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("resize", window_resize);
    </script>
