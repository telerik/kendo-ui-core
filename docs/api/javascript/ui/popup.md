---
title: Popup
page_title: Configuration, methods and events of Kendo UI Popup
description: Easy to follow steps guide how to quickly configure Popup UI widget.
---

# kendo.ui.Popup

Represents the Kendo UI Popup widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object`

Configures the opening and closing animations of the popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the popup will open and close instantly.

#### Example - disable open and close animations

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: false
    });
    </script>

#### Example - configure the animation

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: {
       close: {
         effects: "fadeOut zoom:out",
         duration: 300
       },
       open: {
         effects: "fadeIn zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.close `Object`

The animation played when the popup is closed.

#### Example - configure the close animation

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.close.duration `Number`

The duration of the close animation in milliseconds.

### animation.open `Object`

The animation played when the calendar popup is opened.

#### Example - configure the open animation

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: {
       open: {
         effects: "zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.open.duration `Number`

The duration of the open animation in milliseconds.

### anchor `String|jQuery`

Specifies the element that will be used as an anchor. The widget will open next to that element.

#### Example - specify an anchor

    <input id="datepicker" />
    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker")
        });
    </script>

### appendTo `String|jQuery`*(default: document.body)*

Which element the popup will be appended to.

#### Example - append to different element

    <input id="datepicker" />
    <div id="container"></div>

    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker"),
            appendTo: $("#container")
        });
    </script>

### origin `String`*(default: "bottom left")*

Specifies how to position the popup element based on achor point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - position the popup on top of the anchor

    <input id="datepicker" />
    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker"),
            origin: "top left"
        });
    </script>

### position `String`*(default: "top left")*

Specifies which point of the popup element to attach to the anchor's origin point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - position the popup on top of the anchor

    <input id="datepicker" />
    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker"),
            position: "bottom left"
        });
    </script>

## Methods

### close

Closes the popup.

#### Example

    <div id="popup">CONTENT</div>
    <button id="close">Close</button>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");
    popup.open();

    $("#close").click(function() {
        popup.close();
    });
    </script>

### open

Opens the popup.

#### Example

    <div id="popup">CONTENT</div>
    <button id="open">Open</button>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    $("#open").click(function() {
        popup.open();
    });
    </script>

### position

Re-positions the popup element

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.position();
    </script>

### setOptions

Changes the initial Popup configuration.

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.setOptions({
        origin: "top left"
        position: "bottom left"
    });
    </script>

### visible

Checks whether the popup is visible

#### Returns

`Boolean` True when the popup is visible

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    alert(popup.visible());
    </script>

## Events

### activate

Fires when the popup is opened

#### Event Data

##### e.sender `kendo.ui.Popup`

The widget instance which fired the event.

#### Example - subscribe to the "activate" event during initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
        activate: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "activate" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("activate", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### close

Fires when the popup closes

#### Event Data

##### e.sender `kendo.ui.Popup`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
        close: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### deactivate

Fires when the popup is closed

#### Event Data

##### e.sender `kendo.ui.Popup`

The widget instance which fired the event.

#### Example - subscribe to the "deactivate" event during initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
        deactivate: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "deactivate" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("deactivate", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>

### open

Fires when the popup opens

#### Event Data

##### e.sender `kendo.ui.Popup`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
        open: function(e) {
            e.preventDefault(); //prevent popup closing
        }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("open", function(e) {
        e.preventDefault(); //prevent popup closing
    });
    </script>
