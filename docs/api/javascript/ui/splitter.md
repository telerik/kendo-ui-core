---
title: Splitter
page_title: Configuration, methods and events of Kendo UI Splitter
description: Step by step guide and code examples for successful configuration of Splitter UI widget, supported methods and events types.
---

# kendo.ui.Splitter

Represents the Kendo UI Splitter widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### orientation `String` *(default: "horizontal")*

Specifies the orientation of the widget. Supported values are *"horizontal"* and *"vertical"*.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      orientation: "vertical"
    });
    </script>

### panes `Array`

An array of pane definitions.

### panes.collapsed `Boolean` *(default: false)*

Specifies whether a pane is initially collapsed (**true**) or expanded (**false**).

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ {}, { collapsed: true } ]
    });
    </script>

### panes.collapsedSize `String`

Specifies the size of a collapsible pane when collapsed, defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). 
When the pane is collapsed a **.k-state-collapsed** class is added to it to ease its styling.
Note: This value must not exceed **panes.max** or be less then **panes.min**.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true, collapsedSize: "10%" }, {} ]
    });
    </script>

### panes.collapsible `Boolean` *(default: false)*

Specifies whether a pane is collapsible (**true**) or not collapsible (**false**).

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ]
    });
    </script>

### panes.contentUrl `String`

Specifies the URL from which to load the content of a pane.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div></div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ {}, { contentUrl: "http://www.telerik.com/" } ]
    });
    </script>

### panes.max `String`

Specifies the maximum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
size of a resized pane cannot exceed the defined maximum size.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { max: "200px" }, {} ]
    });
    </script>

### panes.min `String`

Specifies the minimum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
size of a resized pane cannot be less than the defined minimum size.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { min: "100px" }, {} ]
    });
    </script>

### panes.resizable `Boolean` *(default: true)*

Specifies whether a pane is resizable (**true**) or not resizable (**false**).

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { resizable: false }, { resizable: false } ]
    });
    </script>

### panes.scrollable `Boolean` *(default: true)*

Specifies whether a pane is scrollable (**true**) or not scrollable (**false**).

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { scrollable: false }, {} ]
    });
    </script>

### panes.size `String`

Specifies the size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").
It is recommended that one pane is left without size in order to compensate for changes in the viewport size.
Note: This value must not exceed **panes.max** or be less then **panes.min**.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { size: "10%" }, {} ]
    });
    </script>

## Methods

### ajaxRequest

Loads the content of a pane from a local or remote URL.

#### Parameters

##### pane `String|Element|jQuery`

The targeted pane whose content is to be loaded via a URL.

##### url `String`

A local or remote URL from which the content of the pane is to be loaded.

##### data `Object | String`

Any data that is necessary to be sent to the server.

#### Example

    <div id="splitter">
      <div id="pane1">Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");

    // load a complete page in the last pane
    splitter.ajaxRequest(".k-pane:last", "http://www.telerik.com");

    // load content into the pane with ID="pane1"
    splitter.ajaxRequest("#pane1", "/customer/profile", { id: 42 });
    </script>

### append

Appends a new pane. The method returns the pane element, so it can be populated with arbitrary content, if `contentUrl` is not set.
Invoking this method will force the widget to redraw and it will trigger the `resize` event.

#### Parameters

##### config `Object` *(optional)*

The new pane configuration

#### Returns

`jQuery` the pane element.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");

    // append a 100px collapsible pane
    var newPane = splitter.append({
      size: "100px",
      collapsible: true
    });

    // set the content of the new pane to "foo"
    newPane.html("foo");
    </script>

### collapse

Collapses a specified pane. Invoking this method will force the widget to redraw and it will trigger the `resize` event.
Note: Invoking the method will not trigger a collapse event.

#### Parameters

##### pane `String|Element|jQuery`

The pane to be collapsed.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.collapse(".k-pane:first");
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.destroy();
    </script>

### expand

Expands a specified pane. Invoking this method will force the widget to redraw and it will trigger the `resize` event.
Note: Invoking the method will not trigger an expand event.

#### Parameters

##### pane `String|Element|jQuery`

The pane to be expanded.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsed: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.expand(".k-pane:first");
    </script>

### insertAfter

Inserts a new pane after the specified one. The method returns the pane element, so it can be populated with arbitrary content, if `contentUrl` is not set.
Invoking this method will force the widget to redraw and it will trigger the `resize` event.

#### Parameters

##### config `Object`

The new pane configuration.

##### referencePane `String|Element|jQuery`

The existing pane after which the new one will be inserted.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");

    // append a 100px collapsible pane after the first pane
    var newPane = splitter.insertAfter({ size: "100px" }, ".k-pane:first");

    // set the content of the new pane to "foo"
    newPane.html("foo");
    </script>

#### Returns

`jQuery` the pane element.

### insertBefore

Inserts a new pane before the specified one. The method returns the pane element, so it can be populated with arbitrary content, if `contentUrl` is not set.
Invoking this method will force the widget to redraw and it will trigger the `resize` event.

#### Parameters

##### config `Object`

The new pane configuration.

##### referencePane `String|Element|jQuery`

The existing pane before which the new one will be inserted.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");

    // append a 100px collapsible pane before the last pane
    var newPane = splitter.insertBefore({ size: "100px" }, ".k-pane:last");

    // set the content of the new pane to "foo"
    newPane.html("foo");
    </script>

#### Returns

`jQuery` the pane element.

### max

Sets the maximum size of a pane. Setting this value will not cause the widget to redraw, nor will it trigger any events.

#### Parameters

##### pane `String|Element|jQuery`

The pane being targeted for a new minimum size configuration value.

##### value `String`

The maximum size value of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").

#### Example

    <div id="splitter">
      <div id="pane1">Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.max("#pane1", "300px");
    </script>

### min

Sets the minimum size of a pane. Setting this value will not cause the widget to redraw, nor will it trigger any events.

#### Parameters

##### pane `String|Element|jQuery`

The pane being targeted for a new minimum size configuration value.

##### value `String`

The minimum size value of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").

#### Example

    <div id="splitter">
      <div id="pane1">Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.min("#pane1", "300px");
    </script>

### remove

Removes one or more panes. The method returns the Splitter instance.
Invoking this method will force the widget to redraw and it will trigger the `resize` event.

#### Parameters

##### pane `String|Element|jQuery`

The pane(s) to be removed.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.remove(".k-pane:first");
    </script>

### size

Set the size of the pane. Setting this value will cause the widget to redraw and it will trigger the `resize` event.

#### Parameters

##### pane `String|Element|jQuery`

The pane to be resized.

##### value `String`

The new size of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").
Note: This value must not exceed **panes.max** or be less then **panes.min**.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.size(".k-pane:first", "40%");
    </script>

### toggle

Toggles the state of a specified pane (i.e. collapsed or expanded).
Invoking this method will force the widget to redraw and it will trigger the `resize` event.
Note: Invoking the method will not trigger collapse or expand events.

#### Parameters

##### pane `String|Element|jQuery`

The pane to be collapsed.

##### expand `Boolean` *(optional)*

Represents the desired state of the specified pane; to be expanded (**true**) or collapsed
(**false**). If undefined, toggle() will collapse the pane if it is expanded or will expand the
pane if it is collapsed.

#### Example

    <div id="splitter">
      <div id="pane1">Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, { collapsible: true } ]
    });
    var splitter = $("#splitter").data("kendoSplitter");

    // toggle the pane with id="pane1"
    splitter.toggle("#pane1");

    // expand the pane with id="pane1"
    splitter.toggle("#pane1", true);

    // collapse the last pane
    splitter.toggle(".k-pane:last", false);
    </script>

## Events

### collapse

Triggered when a pane of a Splitter is collapsed.

#### Event Data

##### e.pane `Element`

The collapsing pane of the Splitter.

#### Example - subscribe to the "collapse" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ],
      collapse: function(e) {
        console.log($(e.pane).html() + " has been collapsed");
      }
    });
    </script>

#### Example - subscribe to the "collapse" event after initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    function splitter_collapse(e) {
      console.log($(e.pane).html() + " has been collapsed");
    }
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("collapse", splitter_collapse);
    </script>

### contentLoad

Triggered when the content for a pane has finished loading.

#### Event Data

##### e.pane `Element`

The pane whose content has been loaded.

#### Example - subscribe to the "contentLoad" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { content: "/foo" }, {} ],
      contentLoad: function(e) {
        console.log($(e.pane).html() + " has been loaded");
      }
    });
    </script>

#### Example - subscribe to the "contentLoad" event after initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    function splitter_contentLoad(e) {
      console.log($(e.pane).html() + " has been loaded");
    }
    $("#splitter").kendoSplitter({
      panes: [ { content: "/foo" }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("contentLoad", splitter_contentLoad);
    </script>

### error

Triggered when the AJAX request that fetches a pane content has failed.

#### Event Data

##### e.xhr `jqXHR`

The XHR request object, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

##### e.status `String`

The status of the request, as returned from [jQuery.ajax](http://api.jquery.com/jQuery.ajax/)

#### Example - subscribe to the "error" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      error: function(e) {
        console.log(
            "Pane #" + $(e.pane).index() + " could not be loaded from server" +
            " (status " + e.xhr.status + ")"
        );
      }
    });
    </script>

#### Example - subscribe to the "error" event after initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    function splitter_error(e) {
        console.log(
            "Pane #" + $(e.pane).index() + " could not be loaded from server" +
            " (status " + e.xhr.status + ")"
        );
    }
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("error", splitter_error);
    </script>

### expand

Triggered when a pane of a Splitter is expanded.

#### Event Data

##### e.pane `Element`

The expanding pane of the Splitter.

#### Example - subscribe to the "expand" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true, collapsed: true}, {} ],
      expand: function(e) {
        console.log($(e.pane).html() + " has been expanded");
      }
    });
    </script>

#### Example - subscribe to the "expand" event after initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    function splitter_expand(e) {
      console.log($(e.pane).html() + " has been expanded");
    }
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true, collapsed: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("expand", splitter_expand);
    </script>

### layoutChange

**This event is now obsolete and will be removed in the future. Please use the [`resize`](#events-resize) event instead.**

Fires when the splitter layout has changed

#### Example - subscribe to the "layoutChange" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ],
      layoutChange: function(e) {
        console.log("Splitter layout has changed");
      }
    });
    </script>

#### Example - subscribe to the "layoutChange" event after initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    function splitter_layoutChange(e) {
      console.log("Splitter layout has changed");
    }
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("layoutChange", splitter_layoutChange);
    </script>

### resize

Triggered when a pane is resized.

#### Example - subscribe to the "resize" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ],
      resize: function(e) {
        console.log("Splitter pane has been resized");
      }
    });
    </script>

#### Example - subscribe to the "resize" event after initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    function splitter_resize(e) {
      console.log("Splitter pane has been resized");
    }
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("resize", splitter_resize);
    </script>
