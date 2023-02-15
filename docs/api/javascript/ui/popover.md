---
title: Popover
page_title: Configuration, methods and events of Kendo UI Popover
res_type: api
component: popover
---

# kendo.ui.Popover

Represents the Kendo UI Popover. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actions `Array`

An array of the action buttons

#### Example - set the widths of the columns
    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            showOn: "click",
            header: "Header text",
            body: "Content description",
            actionsLayout: "center",
            actions: [{ text: "update", click: function() { console.log("update"); }}, { text: "create", click: function() { console.log("create"); }}]
          });
        });
    </script>

### actions.click `Function`

A handler function to be called when the action button is clicked

#### Example - set the click handler
    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            showOn: "click",
            header: "Header text",
            body: "Content description",
            actionsPosition: "center",
            actions: [{ text: "update", click: function(e) { console.log(e.target.text()); }}, { text: "create", click: function(e) { console.log(e.target.text()); }}]
          });
        });
    </script>

### actions.iconClass `Function`

The CSS class that will be used to display the icon inside the button

#### Example - set the click handler
    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            showOn: "click",
            header: "Header text",
            body: "Content description",
            actionsLayout: "center",
            actions: [{ text: "refresh", iconClass: "k-icon k-i-refresh" }, { iconClass: "k-icon k-i-edit" }]
          });
        });
    </script>

### actions.text `String`

The text displayed in the action button

#### Example - set the text of the button
    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            showOn: "click",
            header: "Header text",
            body: "Content description",
            actionsLayout: "center",
            actions: [{ text: "update", click: function() { console.log("update"); }}, { text: "create", click: function() { console.log("create"); }}]
          });
        });
    </script>

### actionsLayout `String` *(default: "center")*

A value indicating how the actions buttons will be positioned. Possible values are:

* `start`
* `center`
* `between`
* `around`
* `evenly`

#### Example - position items

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            showOn: "click",
            header: "Header text",
            body: "Content description",
            actionsLayout: "center",
            actions: [{ text: "update", click: function() { console.log("update"); }}, { text: "create", click: function() { console.log("create"); }}]
          });
        });
    </script>

### animation `Boolean|Object`

A collection of `{Animation}` objects which are used to change the default animations. If set to `false`, all widget animations will be disabled. `animation:true` is not a valid configuration.

#### Example - disabling animations

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            animation: false,
            template: "Content description"
          });
        });
    </script>

### animation.close `Object`

The animation that will be used when the Popover closes.

#### Example - setting the close animation

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            template: "Content description",
            animation: {
              close: {
                effects: "fade:out"
              }
            }
          });
        });
    </script>

### animation.close.effects `String`

The effect that will be used for closing the Popover.

#### Example - setting the close animation effect

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            template: "Content description",
            animation: {
              close: {
                effects: "fade:out"
              }
            }
          });
        });
    </script>

### animation.close.duration `Number`

Defines the duration of the close animation.

#### Example - setting the duration of the close animation

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            template: "Content description",
            animation: {
              close: {
                duration: 1000
              }
            }
          });
        });
    </script>

### animation.open `Object`

The animation that will be used when the Popover opens.

#### Example - setting the open animation

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            template: "Content description",
            animation: {
              open: {
                effects: "fade:in",
                duration: 1000
              }
            }
          });
        });
    </script>

### animation.open.effects `String`

The effect that will be used for opening the Popover.

#### Example - setting the open animation effect

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            template: "Content description",
            animation: {
              open: {
                effects: "fade:in"
              }
            }
          });
        });
    </script>

### animation.open.duration `Number`

Defines the duration of the open animation.

#### Example - setting the duration of the open animation

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            template: "Content description",
            animation: {
              open: {
                duration: "1000"
              }
            }
          });
        });
    </script>

### body `String|Function`

Defines a kendo template that will be used as the card body inside the popover component.

#### Example - setting the template as string

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            header: "Header content"
            body: "Content description"
          });
        });
    </script>

#### Example - setting the template as function

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            header: function (e) {
              return e.target.text() + " header";
            },
            body: function (e) {
              return e.target.text() + " description";
            }
          });
        });
    </script>

### filter `String`

Specifies a selector for the elements within the container which will display the Popover.

#### Example - showing a Popover only for strong elements in a text

    <div id="container">
        I'm a <strong>target</strong>. I'm also a
        <strong>target</strong>.
    </div>

    <script>
        $(document).ready(function() {
          $("#container").kendoPopover({
            template: "Target Popover",
            filter: "strong"
          });
        });
    </script>

### header `String|Function`

Defines a kendo template that will be used as the card header inside the popover component.

#### Example - setting the template as string

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            header: "Header content"
            body: "Content description"
        });
    </script>

#### Example - setting the template as function

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            header: function (e) {
              return e.target.text() + " header";
            },
            body: function (e) {
              return e.target.text() + " description";
            }
          });
        });
    </script>

### height `Number`*(default: Infinity)*

The height (in pixels) of the Popover.

#### Example - setting the height of the Popover

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content description",
          height: 80
        });
      });
    </script>

### toggleOnClick `Boolean`*(default: false)*

Defines a value indicating whether the popover will show/hide only when clicking on the target element.

> **Note:** **toggleOnClick** is supported only when [`showOn`](/api/javascript/ui/popover/configuration/showOn)* is set to **click**.

#### Example - setting the height of the Popover

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          showOn: "click",
          toggleOnClick: true,
          template: "Content description"
        });
      });
    </script>

### width `Number`*(default: Infinity)*

The width (in pixels) of the Popover.

#### Example - setting the width of the Popover

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content description",
          width: 180
        });
      });
    </script>

### position `String`*(default: "bottom")*

The position that is relative to the target element at which the Popover will be shown.

The supported values are:

* `bottom`
* `top`
* `left`
* `right`
* `center`

#### Example - setting the position of the Popover

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content description",
          position: "right"
        });
      });
    </script>

### showOn `String`*(default: "mouseenter")*

The event on which the Popover will be shown.

The supported values are:

* `mouseenter`
* `click`
* `focus`

#### Example - setting the event on which the Popover will be shown

    <span id="target">
      Click Me
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content description",
          showOn: "click"
        });
      });
    </script>

#### Example - setting the multiple events on which the Popover will be shown

    <span id="target">
      Click Me
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content description",
          showOn: "click mouseenter"
        });
      });
    </script>

### offset `Number`*(default: 0)*

Specifies the offset (in pixels) between the Popover and the anchor. Тhe offset is rendered from the callout arrow.

#### Example - setting the Popover offset

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content description",
          offset: 10
        });
      });
    </script>

## Fields

### popup `kendo.ui.Popup`

Contains the Kendo UI [`Popup`](/api/javascript/ui/popup) instance which manages the showing and hiding of the popovers at the appropriate position. The `popup` field can be used to apply custom CSS classes and styles, or any other attributes to the [`element` or `wrapper`](/intro/widget-basics/wrapper-element) settings of the Popup.

The `Popup` instance is available only once the Popover is shown.

#### Example - get the Popover Popup instance in the show event handler

<span id="target">
  Some content
</span>

<script>
  $(document).ready(function() {
    $("#target").kendoPopover({
      template: "Content",
      show: function(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sender.popup)
      }
    });
  });
</script>

## Methods

### show

Shows the Popover for a specific target.

#### Example - showing the Popover for the target element

    <div id="container">
      <span id="target">Popover target</span>
    </div>

    <script>
      $(document).ready(function() {
        var popover = $("#container").kendoPopover({ template: "Content description" }).data("kendoPopover");
        popover.show($("#target"));
      });
    </script>

#### Parameters

##### element `jQuery`

The target element for which the Popover will be shown.

### hide

Hides the Popover.

#### Example - manually closing the Popover

    <div id="container">
      <span>Popover target</span>
    </div>

    <button id="hidePopover" class="k-button">Hide popover</button>

    <script>
      $(document).ready(function() {
        var popover = $("#container").kendoPopover({
          filter: "span",
          template: "Content",
          position: "right"
        }).data("kendoPopover");

        $("#hidePopover").click(function() {
          popover.hide();
        });
      });
    </script>

### target

Gets the current target of the Popover.

#### Example - getting the current target of the popover

    <div id="container">
      <span id="target1">Popover target1</span> <br />
      <span id="target2">Popover target2</span>
    </div>

    <button id="targetButton" class="k-button">Log target</button>

    <script>
      $(document).ready(function() {

        var popover = $("#container").kendoPopover({
          filter: "span",
          template: function (e) {
            return e.target.text();
          },
          position: "right"
        }).data("kendoPopover");


        $("#targetButton").click(function() {
          var target = popover.target();
          if (target) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(target.attr("id"));
          }
        });
      });
    </script>

#### Returns

`jQuery` - The target element or `null`.

## Events

### show

Fires when a Popover is shown.

#### Example - subscribing to the show event during initialization

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content",
          show: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("popover is shown");
          }
        });

      });
    </script>

#### Example - subscribing to the show event after initialization

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var popover = $("#target").kendoPopover({
          template: "Content",
        }).data("kendoPopover");

        popover.bind("show", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("popover is shown");
        });
      });
    </script>

### hide

Fires when a Popover is hidden.

#### Example - subscribing to the hide event during initialization

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoPopover({
          template: "Content",
          hide: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("popover is hidden!");
          }
        });

      });
    </script>

#### Example - subscribing to the hide event after initialization

    <span id="target">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var popover = $("#target").kendoPopover({ template: "Content" }).data("kendoPopover");

        popover.bind("hide", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("popover is hidden!");
        });
      });
    </script>
