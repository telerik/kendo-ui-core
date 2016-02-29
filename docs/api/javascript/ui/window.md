---
title: Window
page_title: Configuration, methods and events of Kendo UI Window
description: How to initialize a Window UI widget and configure its behaviors, center a window, set its content and toggle the state of the UI widget.
---

# kendo.ui.Window

Represents the Kendo UI Window. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actions `Array` *(default: ["Close"])*

The buttons for interacting with the window. Predefined array values are "Close", "Refresh", "Minimize",
and "Maximize".

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: [ "Minimize", "Maximize" ]
    });
    </script>

### animation `Object`

A collection of {Animation} objects, used to change default animations. A value of **false**
will disable all animations in the widget.

#### Example - disable animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: false
    });
    </script>

### animation.close `Object`

The animation that will be used when a Window closes.

#### Example - disable close animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: {
        close: false
      }
    });
    </script>

### animation.close.effects `String`

Effect to be used for closing of the popup.

#### Example - use only fade out animation when closing window

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

Defines the close animation duration.

#### Example - make the close animation 2 seconds long

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

#### Example - disable open animation

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

Effect to be used for opening of the popup.

#### Example - use only fade animation when opening window

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

Defines the open animation duration.

#### Example - make the open animation 100 milliseconds long

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

The element that the Window will be appended to. Beneficial if the [Window is used together with a form](/web/window/overview#using-kendo-ui-window-with-a-form).
Note that this *does not* constrain the window dragging within the given element.

#### Example - set the window container to be the form with id="mainForm"

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      appendTo: "form#mainForm"
    });
    </script>

### autoFocus `Boolean` *(default: true)*

Determines whether the Window will be focused automatically when opened. The property also influences the focus behavior when the Window is clicked when already opened.

#### Example - set the autoFocus property

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      autoFocus: false
    });
    </script>

### content `Object|String`

Specifies a URL or request options that the window should load its content from.

Note: For URLs starting with a protocol (e.g. http://),
a container iframe element is automatically created. This behavior may change in future
versions, so it is advisable to always use the [iframe configuration option](#iframe).

#### Example - fetch content from the server

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      content: "/details"
    });
    </script>

### content.template `String`

Template for the content of a **Window**. Returned data from the server will be given as the `data` of this template.
Note that if the returned data is JSON, the [`dataType` parameter](http://api.jquery.com/jQuery.ajax/) should be passed, so that the data gets parsed by jQuery.

If the URL contains a protocol, set `iframe` to `false`, otherwise the JSON response will be injected "as is" in the Window content area.

#### Example - fetch JSON and display it through a template

    <div id="dialog">
        <p><strong>This example will not work, unless you define a valid JSON service URL for `content.url`.</p>
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

### draggable `Boolean` *(default: true)*

Enables (**true**) or disables (**false**) the ability for users to move/drag the widget.

#### Example - disable window dragging

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      draggable: false
    });
    </script>

### iframe `Boolean`

Explicitly states whether a content iframe should be created. For more information, please read [Using iframes](/web/window/overview#using-iframes).

#### Example - load full page

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      content: "http://www.telerik.com/",
      iframe: true
    });
    </script>

### maxHeight `Number` *(default: Infinity)*

The maximum height (in pixels) that may be achieved by resizing the window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      maxHeight: 300
    });
    </script>

### maxWidth `Number` *(default: Infinity)*

The maximum width (in pixels) that may be achieved by resizing the window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      maxWidth: 300
    });
    </script>

### minHeight `Number` *(default: 50)*

The minimum height (in pixels) that may be achieved by resizing the window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      minHeight: 100
    });
    </script>

### minWidth `Number` *(default: 50)*

The minimum width (in pixels) that may be achieved by resizing the window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      minWidth: 100
    });
    </script>

### modal `Boolean` *(default: false)*

Specifies whether the window should show a modal overlay over the page.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      modal: true
    });
    </script>

### pinned `Boolean` *(default: false)*

Specifies whether the window should be pinned, i.e. it will not move together with the page content during scrolling.

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

A collection of one or two members, which define the initial Window's top and/or left position on the page.

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

Specifies the initial top position of the window. Numeric values are treated as pixels. String values can specify pixels, percentages, ems or other valid values.

### position.left `Number|String`

Specifies the initial left position of the window. Numeric values are treated as pixels. String values can specify pixels or percentages, ems or other valid values.

### resizable `Boolean` *(default: true)*

Enables (**true**) or disables (**false**) the ability for users to resize a **Window**.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      resizable: false
    });
    </script>

### scrollable `Boolean` *(default: true)*

Enables (**true**) or disables (**false**) the ability for users to scroll the window contents.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      scrollable: false
    });
    </script>

### title `String|Boolean` *default: ""*

The text in the window title bar. If `false`, the window will be displayed without a title bar. Note that this will prevent the window from being dragged, and the window titlebar buttons will not be shown.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      title: "Customer details"
    });
    </script>

#### Example - create a window without a title

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      title: false
    });
    </script>

### visible `Boolean` *(default: true)*

Specifies whether the window will be initially visible.

#### Example - show a dialog after one second delay

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

Specifies width of the window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      width: 400
    });
    </script>

#### Example - specify window width in percent

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      width: "50%"
    });
    </script>

### height `Number | String`

Specifies height of the window.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      height: 400
    });
    </script>

#### Example - specify window height in percent

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      height: "50%"
    });
    </script>

## Methods

### center

Centers the window within the viewport.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.center();
    </script>

### close

Closes a Window.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

#### Example - close a window after one second

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    setTimeout(function() {
      dialog.close();
    }, 1000);
    </script>

### content

Gets or set the content of a window. Supports chaining when used as a setter.

#### Parameters

##### content `String|jQuery` *(optional)*

The content of the Window. Can be an HTML string or jQuery object.


#### Returns

`String` The current window content, if used as a getter. If used as a setter, the method will return the window object to support chaining.

#### Example - get the window content

    <div id="dialog">foo</div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    console.log(dialog.content()); // logs "foo"
    </script>

#### Example - set the window content

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.content("Kendo UI all the things!");
    </script>

### destroy

Destroys the window and its modal overlay, if necessary. Removes the widget HTML elements from the DOM.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.destroy();
    </script>

### maximize

Maximizes a Window to the entire viewing area of the user agent. Triggers the resize event.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.maximize();
    </script>

### minimize

Maximizes a Window to its title bar.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.minimize();
    </script>

### open

Opens a Window.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

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

Pins the Window at its current position with a position:fixed style, i.e. the widget stops moving together with the other page content when the page is scrolled.
The user will still be able to move the Window with the mouse or keyboard.

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

Refreshes the content of a Window from a remote URL or the initially defined [content template](/api/javascript/ui/window#configuration-content.template).
**Note that passing `data` and non-GET requests cannot be sent to an iframe**, as they require a form with a target attribute.

#### Parameters

##### options `Object|String`

Options for requesting data from the server.
If omitted, the window uses the `content` property
that was supplied when the window was created.
Any options specified here are passed to jQuery.ajax().

##### options.url `String`

The server URL that will be requested.

##### options.data `Object`

A JSON object containing the data that will be passed to the server.

##### options.type `String`

The HTTP request method ("GET", "POST").

##### options.template `String`

A template to be used for displaying the requested data.

##### options.iframe `Boolean`

Indicates whether the content should be fetched within an iframe, or with AJAX and rendered in the same page.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

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

Restores a maximized or minimized Window to its previous state. Triggers the resize event.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");

    // maximize the window
    dialog.maximize();

    setTimeout(function() {
      // restore its original size
      dialog.restore();
    }, 1000);
    </script>

### setOptions

Allows the window to be configured with new options. If you change the [content url](#configuration-content), call [`refresh`](#methods-refresh) afterwards.
Another option is to execute the `refresh` method with the new URL directly.

#### Parameters

##### options `Object`

The configuration options to be set.

#### Example - set new dimensions to the window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.setOptions({
      width: 180,
      height: 225
    });
    </script>

### title

Gets or sets the title of a Window. Supports chaining when used as a setter.

#### Parameters

##### text `String` *(optional)*

The title of the Window.

#### Returns

`String` The current window title, if used as a getter. If used as a setter, the method will return the window object to support chaining.

#### Example - get the title of the window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    var title = dialog.title();
    </script>

#### Example - set the title of a window

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.title("Hello");
    </script>

### toFront

Brings forward a Window to the top of the z-index.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.toFront();
    </script>

### toggleMaximization

Toggles a Window between a maximized and restored state. Triggers the resize event.

#### Returns

`kendo.ui.Window` Returns the window object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.toggleMaximization();
    </script>

### unpin

Disables the Window's pinned state, so that the widget will move together with the other page content when the page is scrolled.

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
        // open animation has finished playing
      }
    });
    </script>

#### Example - subscribe to the "activate" event after initialization

    <div id="dialog"></div>
    <script>
    function window_activate() {
      // open animation has finished playing
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("activate", window_activate);
    </script>

### close

Triggered when a Window is closed (by a user or through the close() method).

#### Event Data

##### e.userTriggered `Boolean`

Indicates whether the close action has been triggered by the user (by clicking the close button or hitting the escape key). When the close method has been called, this field is **false**.

#### Example - subscribe to the "close" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      close: function(e) {
        // close animation has finished playing
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="dialog"></div>
    <script>
    function window_close(e) {
      // close animation has finished playing
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("close", window_close);
    </script>

### deactivate

Triggered when a Window has finished its closing animation.

#### Example - subscribe to the "deactivate" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      deactivate: function() {
        // close animation is about to finish
      }
    });
    </script>

#### Example - subscribe to the "deactivate" event after initialization

    <div id="dialog"></div>
    <script>
    function window_deactivate() {
      // close animation will start soon
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("deactivate", window_deactivate);
    </script>

### dragend

Triggered when a Window has been moved by a user.

#### Example - subscribe to the "dragend" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      dragend: function() {
        // user has released the window after dragging
      }
    });
    </script>

#### Example - subscribe to the "dragend" event after initialization

    <div id="dialog"></div>
    <script>
    function window_dragend() {
      // user has released the window after dragging
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("dragend", window_dragend);
    </script>

### dragstart

Triggered when the user starts to move the window.

#### Example - subscribe to the "dragstart" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      dragstart: function() {
        // user has started dragging the window
      }
    });
    </script>

#### Example - subscribe to the "dragstart" event after initialization

    <div id="dialog"></div>
    <script>
    function window_dragstart() {
      // user has started dragging the window
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("dragstart", window_dragstart);
    </script>

### error

Triggered when an AJAX request for content fails.

#### Event Data

##### e.xhr `jqXHR`

The XHR request object, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

##### e.status `String`

The status of the request, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

#### Example - subscribe to the "error" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      error: function(e) {
        console.log("Request failed with status " + e.status)
      }
    });
    </script>

#### Example - subscribe to the "error" event after initialization

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

Triggered when the window has been minimized by the user. Introduced in 2016.Q1.SP1

#### Example - subscribe to the "maximize" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: ["Maximize"],
      maximize: function(e) {
        console.log("Window was maximized")
      }
    });
    </script>

#### Example - subscribe to the "maximize" event after initialization

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

Triggered when the window has been minimized by the user. Introduced in 2016.Q1.SP1

#### Example - subscribe to the "minimize" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: ["Minimize"],
      minimize: function(e) {
        console.log("Window was minimized")
      }
    });
    </script>

#### Example - subscribe to the "minimize" event after initialization

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

Triggered when a Window is opened (i.e. the open() method is called).

#### Example - subscribe to the "open" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      open: function() {
        // open animation will start soon
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="dialog"></div>
    <script>
    function window_open() {
      // open animation will start soon
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("open", window_open);
    </script>

### refresh

Triggered when the content of a Window has finished loading via AJAX,
when the window iframe has finished loading, or when the refresh button
has been clicked on a window with static content.

#### Example - subscribe to the "refresh" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      refresh: function() {
        // new content has been fetched
      }
    });
    </script>

#### Example - subscribe to the "refresh" event after initialization

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

Triggered when a window has been resized by a user.

#### Example - subscribe to the "resize" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      resize: function() {
        // user has finished resizing the window
      }
    });
    </script>

#### Example - subscribe to the "resize" event after initialization

    <div id="dialog"></div>
    <script>
    function window_resize() {
      // user has finished resizing the window
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("resize", window_resize);
    </script>

