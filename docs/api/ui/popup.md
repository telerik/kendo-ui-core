---
title: Popup
page_title: Configuration, methods and events of Kendo UI Popup
description: Easy to follow steps guide how to quickly configure Popup UI widget.
res_type: api
---

# kendo.ui.Popup

Represents the Kendo UI Popup widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adjustSize `Object`

Configures the margins, which will be added to the popup size, if its position should end up being next to the viewport edges. By default, the adjustment amount in both dimensions is zero.

The property takes effect only if [`collision`](/api/javascript/ui/popup#configuration-collision) is set to `"fit"` for the respective dimension (`width` or `height`).


<div class="meta-api-description">
How to prevent popup overflow when positioned near viewport edges using Kendo UI? Control and configure automatic margin adjustments to a popup’s width and height when it is positioned near the edges of the viewport, enabling dynamic resizing to prevent overflow or clipping by setting specific padding or spacing values along each dimension; this resizing behavior activates only when collision handling is set to fit mode for horizontal or vertical alignment, allowing developers to fine-tune popup boundaries, avoid cutoff, manage edge collisions, and ensure UI elements remain fully visible by adjusting sizing margins in response to viewport constraints.
</div>

#### Example

    <div style="height:500px;">&nbsp;</div>
    <p style="text-align:right;"><input id="datepicker" /></p>

    <div id="popup">popup that is 100px offset from the bottom-right edge of the page.</div>

    <script>
      $("#popup").kendoPopup({
        anchor: $("#datepicker"),
        origin: "bottom right",
        position: "top right",
        collision: "fit",
        adjustSize: {
            width: 100,
            height: 100
        }
      }).data("kendoPopup").open();
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How can I control the animation of my Kendo UI popup window? Manage the display transitions of popup windows by enabling or disabling entry and exit animations, controlling whether popups fade, slide, or instantly appear and disappear without transitional effects; configure smooth or immediate show and hide behaviors, toggle animation on or off for popups, set animation flags to control popup opening and closing visual effects, adjust popup transition settings for user interface responsiveness, handle popup animation states to customize user experience with or without animated movements, and switch between animated and non-animated popup presentations.
</div>

#### Example - disable open and close animations

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: false
    }).data("kendoPopup").open();
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
    }).data("kendoPopup").open();
    </script>

### animation.close `Object`

The animation played when the popup is closed.


<div class="meta-api-description">
How do I customize the closing animation of a Kendo UI popup? Set or customize the closing animation behavior for popups by defining the effect type, duration, easing curve, and toggling animation on or off to control the visual transition when a popup closes. Configure how popup close interactions animate, adjust timing and motion smoothing, enable or disable closing effects, and tailor the exit animation style to enhance user experience or performance. Manage exit transitions for overlays or modals with options to specify close animation types, speed, and easing to fit diverse UI requirements or developer preferences for closing popups smoothly.
</div>

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
    }).data("kendoPopup").open();
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)


<div class="meta-api-description">
How to customize closing animation effects for Kendo UI popup window? Customize and control the closing animations for popups by configuring visual effects that trigger when a popup window closes, including setting one or multiple animation styles to manage the exit transitions, fade outs, slide closures, or other visual closures, enabling smooth and visually appealing popup dismissals, allowing developers to specify effect names or combine multiple effects to tailor the closing behavior, managing how popups disappear with effects such as fade, bounce, slide, or zoom for enhanced user experience and animation control.
</div>

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: {
       close: {
         effects: "fadeOut zoom:out"
       }
      }
    }).data("kendoPopup").open();
    </script>

### animation.close.duration `Number`

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How to adjust the closing animation duration in Kendo UI popup? Adjust the time it takes for a popup or modal window to close by setting the duration of the closing animation, allowing developers to customize or synchronize the speed of hide transitions in milliseconds, control how fast or slow popups disappear, fine-tune animation timing to match opening effects or custom easing functions, and configure the smoothness and responsiveness of closing behaviors during show/hide operations or user interaction sequences.
</div>

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: {
       close: {
         duration: 500
       }
      }
    }).data("kendoPopup").open();
    </script>

### animation.open `Object`

The animation played when the calendar popup is opened.


<div class="meta-api-description">
How do I customize the animation when opening a Kendo UI calendar popup? Control and customize the opening animation for calendar popup components, including setting animation effects such as fade, slide, zoom, or bounce, adjusting the animation duration and easing functions, enabling smooth transitions or disabling animations entirely to optimize popup appearance and user experience when the calendar interface is triggered or displayed.
</div>

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
    }).data("kendoPopup").open();
    </script>

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)


<div class="meta-api-description">
How can I customize the opening animation of a Kendo UI popup with multiple effects? Configure and customize the opening animations or transitions for popup interfaces by specifying one or multiple effects that control how the popup appears on screen, including fade, slide, zoom, and other entrance styles. Enable, set, or change the visual open effect using space-separated animation names to create smooth, seamless, or attention-grabbing popup openings. Control and combine multiple entrance animations for popups to enhance user experience, handle dynamic effects for popup display, and adjust animation timing or style for when popups show up, using keywords like transition effects, open animation styles, popup entrance animation, and visual open effects.
</div>

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: {
       open: {
         effects: "fadeIn zoom:in"
       }
      }
    }).data("kendoPopup").open();
    </script>

### animation.open.duration `Number`

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How to adjust the animation duration of a Kendo UI popup? Set or adjust the length of the popup opening animation to customize how quickly or slowly the popup appears, controlling the transition speed in milliseconds to fine-tune user interface timing, synchronize multiple animations, improve responsiveness, or enhance user experience by modifying animation duration and pacing for opening dialogs, modals, or overlays.
</div>

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
      animation: {
       open: {
         duration: 1000
       }
      }
    }).data("kendoPopup").open();
    </script>

### anchor `String|jQuery`

Specifies the element that will be used as an anchor. The widget will open next to that element.


<div class="meta-api-description">
How to position a Kendo UI popup relative to a specific HTML element? Control and configure popup placement by specifying the reference element to which the popup aligns or attaches, enabling precise positioning adjacent to buttons, inputs, or any page element. Enable anchoring, aligning, or attaching popups relative to a target DOM node for dynamic positioning, overlay placement, or contextual display near user interface components. Set the anchor element to control popup alignment, offset, or proximity, allowing flexible popup attachment to UI triggers, form fields, or interactive controls to improve user experience and layout responsiveness.
</div>

#### Example - specify an anchor

    <input id="datepicker" />
    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker")
        }).data("kendoPopup").open();
    </script>

### appendTo `String|jQuery`*(default: document.body)*

Which element the popup will be appended to. The element needs to be relatively positioned.


<div class="meta-api-description">
How to append Kendo UI popup dynamically to specific container? Control where a popup or overlay element is inserted within the DOM by specifying the container element or CSS selector to append it to, enabling precise management of its position, clipping boundaries, z-index stacking order, and layout context. Use this to configure or set the popup’s parent element, ensuring it renders within a relatively positioned ancestor for accurate alignment, containment within specific sections of the UI, or to prevent overflow and stacking conflicts. Developers often search to attach modals, tooltips, dropdowns, or popups dynamically to custom containers to control rendering context, visual layering, and clipping areas. This feature supports scenarios where you need to override default body appending to confine popups within scrollable or bounded regions, set popup position relative to a specific wrapper, or manage stacking contexts for overlapping popup elements.
</div>

#### Example - append to different element

    <input id="datepicker" />
    <div id="container" style="position: relative"></div>

    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker"),
            appendTo: $("#container")
        }).data("kendoPopup").open();
    </script>

### collision `String`*(default: "fit flip")*

Configures how the popup should behave when it cannot be properly displayed and fully visible, if its `origin` and `position` settings are obeyed.

Valid values are: `"fit"`, `"flip"`, `"flip fit"` and `"fit flip"`. "Fit" allows the popup to be shifted (moved) until it is fully visible. "Flip" allows the popup to switch its position, according to its anchor. If two words are used, the first one applies to the vertical dimension and the second one - to the horizontal dimension. If one word is used, the setting is applied to both dimensions.


<div class="meta-api-description">
How does the Kendo UI for jQuery popup adjust its position when there's not enough space to display fully? Configure how a popup adjusts or repositions itself when there is not enough space to display fully, including options to shift or move the popup to fit within the visible area, flip or reverse its position relative to the anchor point, or combine these strategies to prevent clipping or cutoff on screen edges. Control collision handling to set whether the popup automatically moves inside viewable boundaries, swaps from top to bottom or left to right positions, or uses mixed vertical and horizontal adjustments to ensure the popup remains visible and accessible. Enable flexible popup positioning behavior in constrained UI spaces, managing overflow by fitting, flipping, or both to optimize popup placement next to its origin or anchor element.
</div>

#### Example

    <div style="height:500px;">&nbsp;</div>
    <p style="text-align:right;"><input id="datepicker" /></p>

    <div id="popup" style="width: 100px; height: 100px;">popup content</div>

    <script>
      $("#popup").kendoPopup({
        anchor: $("#datepicker"),
        origin: "bottom right",
        position: "top right",
        collision: "fit flip"
      }).data("kendoPopup").open();
    </script>

### origin `String`*(default: "bottom left")*

Specifies how to position the popup element based on anchor point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"


<div class="meta-api-description">
How do I set the origin point of a Kendo UI popup in relation to its anchor element? Control or configure the placement of a popup in relation to an anchor element by setting the vertical and horizontal origin points such as top, center, bottom for vertical alignment and left, center, right for horizontal alignment; adjust popup positioning, alignment, or origin coordinates to specify where the popup appears relative to its reference, including options like top left, center center, bottom right, or other combinations to align or anchor the popup precisely as desired in UI layouts or user interfaces.
</div>

#### Example - position the popup on top of the anchor

    <input id="datepicker" />
    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker"),
            origin: "top left"
        }).data("kendoPopup").open();
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


<div class="meta-api-description">
How do I configure the position of a Kendo UI popup so it aligns with its anchor element? Configure how a popup or tooltip attaches and aligns relative to an anchor element by specifying vertical and horizontal attachment points using combined position terms like top, bottom, center for vertical alignment and left, right, center for horizontal placement. Control where the popup connects by setting position keywords such as bottom right, top left, center center, or other combinations to precisely position the overlay relative to a reference origin or anchor. Adjust popup alignment by defining anchor attachment points with "y" (vertical) and "x" (horizontal) descriptors, enabling intuitive placement for tooltips, dropdowns, or floating panels that correspond to target elements on the screen. Set or customize popup location with spatial keywords that define which edge or corner of the popup meets the anchor’s origin point, allowing dynamic positioning based on interface layouts and user interaction contexts. Align overlays, modals, or popups flexibly by combining vertical and horizontal anchor points, facilitating positioning strategies that respond to different UI components or dynamic content regions.
</div>

#### Example - position the popup on top of the anchor

    <input id="datepicker" />
    <div id="popup">CONTENT</div>

    <script>
        $("#popup").kendoPopup({
            anchor: $("#datepicker"),
            position: "bottom left"
        }).data("kendoPopup").open();
    </script>

## Methods

### close

Closes the popup.


<div class="meta-api-description">
How do I programmatically close a Kendo UI popup? Close or dismiss modal dialogs, overlays, or popups programmatically to hide visible UI elements controlling overlay visibility, terminate active popup windows, exit modal interactions, end dialog sessions, respond to user actions or application events by shutting down open popup components, and manage overlay state transitions through method calls that remove or hide popup content from the screen.
</div>

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


<div class="meta-api-description">
How can I programmatically show a Kendo UI popup dynamically in my jQuery application? Trigger or activate displaying a popup dynamically through code to make its content visible and interactive at any custom timing or event, enabling developers to programmatically show or reveal modal or overlay elements on user actions, button clicks, events, or conditional logic without relying on default or automatic display behavior, giving precise control to open, expose or present popup windows, dialog boxes, or floating UI panels on demand within applications.
</div>

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


<div class="meta-api-description">
How can I dynamically adjust the position of a Kendo UI popup when its content changes? Reposition or recalculate the popup’s location dynamically to adjust alignment, offsets, and visibility after changes such as content updates, resizing, scrolling, or viewport shifts; control, update, refresh, or reset the popup placement programmatically to ensure it stays anchored and correctly aligned based on current layout, viewport boundaries, or configuration, supporting scenarios like responsive design, dynamic content loading, window resizing, or scrolling events where you need to recenter or realign popup elements in user interfaces.
</div>

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

	popup.open();
    popup.position();
    </script>

### setOptions

Changes the initial Popup configuration.


<div class="meta-api-description">
How to dynamically change popup animation styles with Kendo UI for jQuery? Modify popup settings dynamically during runtime by applying new configuration options without recreating the popup component, enabling updates to placement, animation styles, displayed content, appearance, behavior, or other customizable parameters; configure, change, adjust, or override popup properties on the fly through an options object to control how the popup functions and looks after it has been initialized, supporting use cases like repositioning, altering animations, updating content, or tweaking appearance settings programmatically and interactively.
</div>

#### Parameters

##### options `Object`

The new configuration options.

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.setOptions({
        origin: "top left",
        position: "bottom left"
    });

	popup.open();
    </script>

### toggle

Opens or closes the Popup component.


<div class="meta-api-description">
How can I programmatically toggle the visibility of a Kendo UI popup? Programmatically show, hide, or switch the visibility of a popup or overlay component by toggling its open and closed states dynamically in response to user actions or app conditions; control popup display without reloading or recreating it, enabling developers to enable, disable, open, close, or flip popup visibility at runtime to manage UI presentation seamlessly through event handling, state changes, or conditional logic.
</div>

#### Parameters

##### toggle `Boolean` *(optional)*

Defines the whether to open/close the Popup.

#### Example

    <input id="name" class='k-textbox'/>
    <button class='k-button'>Open/Close</button>
    <div id="popup" style="width:33%">
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>

    <script>
      $(document).ready(function(){
        $("#popup").kendoPopup({
          anchor: $("#name")
        });
      })

      $("button").click(function(){
        $("#popup").data("kendoPopup").toggle();
      });
    </script>
    
### visible

Checks whether the popup is visible


<div class="meta-api-description">
How do I check if a Kendo UI popup is currently open in jQuery? Determine if a popup or modal dialog is currently displayed, shown, or open by synchronously checking its visibility state through a method that returns a true or false value indicating whether the component is visible, hidden, or rendered on screen, enabling developers to control UI flow, conditional rendering, popup toggling, or detect dialog presence reliably in real time during interaction or state changes.
</div>

#### Returns

`Boolean` True when the popup is visible

#### Example

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    console.log(popup.visible());
    </script>

## Events

### activate

Fires when the popup is opened


<div class="meta-api-description">
How do I handle when a Kendo UI popup is activated or displayed? Detect when a popup or modal becomes visible, trigger actions or callbacks right as it opens, handle activation events to initialize content, set user focus, launch animations, synchronize state or perform setup tasks immediately upon showing, respond to visibility changes for overlays or dialogs, enable event-driven reactions when a UI element appears, and manage dynamic behaviors tied to the moment a popup is activated or displayed.
</div>

#### Event Data

##### e.sender `kendo.ui.Popup`

The widget instance which fired the event.

#### Example - subscribe to the "activate" event during initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
        activate: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.sender.element[0]);
        }
    }).data("kendoPopup").open();
    </script>

#### Example - subscribe to the "activate" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("activate", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sender.element[0]);
    });

	popup.open();
    </script>

### close

Fires when the popup closes


<div class="meta-api-description">
How do I detect when a Kendo UI popup window closes using JavaScript? Detect when a popup window or modal closes to execute code right after it disappears, enabling cleanup routines, refreshing application data, updating user interface elements, or triggering follow-up actions based on user dismissal or programmatic closure. Capture close events to react to both user-initiated and code-triggered popup shutdowns, allowing control over state transitions, resource management, and dynamic UI updates following popup termination. Use event listeners to monitor popup lifecycle completions, empowering responsive design patterns and seamless interaction flows tied to window or dialog closing behaviors.
</div>

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
    }).data("kendoPopup").open();
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("close", function(e) {
        e.preventDefault(); //prevent popup closing
    });

	popup.open();
    </script>

### deactivate

Fires when the popup is closed


<div class="meta-api-description">
What triggers when a Kendo UI popup is closed by the user? Trigger actions when a popup or modal closes, whether by user interaction or programmatically, to perform cleanup, update app state, restore focus to previous elements, unbind event listeners, synchronize UI components, save changes after dismissal, execute navigation flows, handle closing events, manage focus restoration, or maintain interface consistency following popup deactivation.
</div>

#### Event Data

##### e.sender `kendo.ui.Popup`

The widget instance which fired the event.

#### Example - subscribe to the "deactivate" event during initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
        deactivate: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.sender.element[0]);
        }
    }).data("kendoPopup").open();
    </script>

#### Example - subscribe to the "deactivate" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("deactivate", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sender.element[0]);
    });

	popup.open();
    </script>

### open

Fires when the popup opens


<div class="meta-api-description">
How do I detect when a Kendo UI popup is visible? Detect when a popup or modal becomes visible by capturing the moment it opens, triggering event listeners or callbacks to execute code such as setting focus on elements, loading dynamic content, initiating animations, or updating state when the popup appears on screen, handling event notifications that signal the display action, enabling developers to respond instantly as the popup is shown, control user interaction readiness, and perform setup tasks tied to the visibility change in UI components.
</div>

#### Event Data

##### e.sender `kendo.ui.Popup`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup({
        open: function(e) {
            e.preventDefault(); //prevent popup opening
        }
    }).data("kendoPopup").open();
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="popup">CONTENT</div>
    <script>
    $("#popup").kendoPopup();

    var popup = $("#popup").data("kendoPopup");

    popup.bind("open", function(e) {
        e.preventDefault(); //prevent popup opening
    });

	popup.open();
    </script>
