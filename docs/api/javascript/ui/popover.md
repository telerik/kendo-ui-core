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


<div class="meta-api-description">
Add, configure, and control interactive buttons inside a popover using an array of action definitions that specify button text or labels, click event handlers, icons, styling options like CSS classes, custom HTML attributes, and accessibility enhancements such as ARIA properties to ensure proper behavior, appearance, and usability in various user interface scenarios involving multiple actionable elements.
</div>

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


<div class="meta-api-description">
Configure custom click event handlers for action buttons within popover components to manage user interactions, trigger specific functions upon button clicks, implement custom logic when action buttons are pressed, control popover visibility or state changes, handle event callbacks for popover actions, execute dynamic responses to button press events, bind functions to popover action clicks, manage UI behavior when users interact with popover action buttons, and respond programmatically to clicks within popover interfaces.
</div>

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

### actions.icon `String`

The name of the icon to display inside the button.


<div class="meta-api-description">
Configure or set an icon symbol for an action button within a popover interface by specifying the icon's identifier or name to visually represent the button’s function, enabling developers to customize button appearance with graphical icons, symbols, or glyphs for enhanced user interaction, styling, and intuitive action cues inside popover menus or dropdown actions.
</div>

#### Example - set the icon name

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
            actions: [{ text: "refresh", icon: "arrow-rotate-cw", iconClass: "refresh-icon" }, { icon: "pencil", iconClass: "edit-icon" }]
          });
        });
    </script>


### actions.iconClass `String`

The CSS class that will be added to the icon element inside the button.


<div class="meta-api-description">
Control and customize the icon appearance inside action buttons by specifying one or multiple CSS class names to apply custom fonts, styles, or icon sets using space-separated class strings added directly to the icon element’s class attribute, enabling flexible icon styling, theming, and integration with icon libraries or custom CSS for interactive UI elements such as popovers, menu buttons, or tooltips.
</div>

#### Example - set the iconClass

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
            actions: [{ text: "refresh", icon: "arrow-rotate-cw", iconClass: "refresh-icon" }, { icon: "pencil", iconClass: "edit-icon" }]
          });
        });
    </script>

### actions.text `String`

The text displayed in the action button


<div class="meta-api-description">
Set or customize the text label for action buttons inside popover components, enabling developers to control call-to-action wording such as confirm, submit, save, ok, or other button prompts. This allows specifying precise button captions during popover setup, supporting localization, UX adjustments, or dynamic text changes for user interactions, form submissions, confirmation dialogs, and interactive popover controls.
</div>

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
* `stretch`


<div class="meta-api-description">
Control the horizontal arrangement and alignment of buttons within a popover by configuring how action buttons are distributed along the layout, including options to position them aligned to the start, centered, spaced evenly with equal gaps between, distributed around with equal spacing before and after, arranged evenly across the container, or stretched to fill the available width, enabling flexible customization of button placement for user interface clarity, consistent alignment, and responsive design in popover components.
</div>

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


<div class="meta-api-description">
Configure, customize, or disable the opening and closing transition effects and visual state changes for popover elements by setting animation sequences or disabling animations entirely; control how popover components animate their appearance, disappearance, and state updates by providing custom animation objects or turning off all motion and fade effects to create instant, non-animated popover behavior, useful for improving performance, accessibility, or meeting design requirements.
</div>

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


<div class="meta-api-description">
Control and customize the closing effect, animation style, transition timing, and easing curve for hiding popover or overlay elements, enabling developers to configure how the interface visually disappears, set smooth or instantaneous close transitions, adjust duration and speed of the exit animation, and manage the user experience when dismissing modal or floating components.
</div>

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


<div class="meta-api-description">
Control and customize the closing animation effects of a popover by configuring how it visually transitions out of view, including options like fade, slide, or user-defined effects; adjust the closing visual behavior, set smooth exit animations, enable or disable specific closing transitions, and tailor the popover’s hide effect to match your UI requirements or create custom closing animations, ensuring seamless and visually appealing disappearance patterns.
</div>

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


<div class="meta-api-description">
Set or customize the duration of the popover closing animation, adjusting how fast or slow the popover hides by controlling the length of the exit animation; configure, change, or define the timing for closing transitions, animation speed, fade-out duration, or disappearance effects to match user experience preferences and interface responsiveness.
</div>

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


<div class="meta-api-description">
Control and customize the opening animation effect for popovers including how they animate into view, specifying animation types like fade, slide, zoom, or custom transitions, as well as adjusting timing parameters such as duration, easing curves, speed, and delay to tailor the popover’s appearance behavior during show or open events, enabling developers to set or configure entrance animations that affect visual flow and user experience on initialization or runtime.
</div>

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


<div class="meta-api-description">
Configure and customize the visual opening transition of popover elements by selecting or setting specific animation effects, including predefined or custom show and enter animations, to control how popups, tooltips, or overlays appear on screen with smooth, dynamic entrance styles and transition behaviors that enhance user interaction and presentation.
</div>

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


<div class="meta-api-description">
Adjust the time it takes for the popover or tooltip to fully appear by setting the open animation duration, controlling how fast or slow the component fades in, slides open, or transitions onto the screen, which helps customize user interface responsiveness, animation speed, entry timing, and smoothness of popover show effects for better visual feedback and interactive experiences.
</div>

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


<div class="meta-api-description">
Define or customize the inner content of a popup card by configuring templates that control the body area with custom HTML, layouts, dynamic placeholders, or templated structures, enabling flexible content rendering inside the overlay or tooltip. Enable, set, or create content templates for popups, overlays, or tooltip bodies to customize what appears within the message area, card body, or content region, including complex markup, variable interpolation, or structured inner elements for enhanced UI customization and dynamic data display.
</div>

#### Example - setting the template as string

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            header: "Header content",
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


<div class="meta-api-description">
Specify a CSS selector or string to target child elements within a container that activate or trigger popup overlays, enabling delegated event handling so only elements matching the selector cause the popover to appear; this is useful for configuring which nested elements respond to user interactions like clicks or hovers to show tooltips, menus, or other floating content, allowing developers to control event delegation, filter interactive regions, and customize trigger elements dynamically by CSS selectors for precise popover display control.
</div>

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


<div class="meta-api-description">
Control and customize the header section of a popover or tooltip card by defining custom HTML, templates, or dynamic data-bound content, enabling developers to set or configure the header area during initialization for tailored titles, headings, or labels. This includes specifying templates to render static text, variables, or complex markup as the popover’s header, allowing flexible content display, header customization, and integration with component settings for improved UI presentation and user experience. Adjust, enable, or set header content for interactive popover widgets, facilitating personalized card headers with template support and configurable header layouts.
</div>

#### Example - setting the template as string

    <span id="target">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoPopover({
            header: "Header content",
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

### height `Number`*(default: Infinity)*

The height (in pixels) of the Popover.


<div class="meta-api-description">
Adjust, set, or control the vertical size, height, or pixel dimension of a popover or overlay component to manage layout, scrolling behavior, and content overflow. Specify the height in pixels, fix the popover container size, resize the popup vertically, or define the popover's max or exact height to influence how content fits, scrolls, or is positioned within the interface. Enable customization of popover dimensions for flexible UI design, controlling vertical space usage, clipping, or scroll areas inside floating panels and tooltip-like elements.
</div>

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


<div class="meta-api-description">
Configure popover visibility to respond exclusively to click interactions on the target element, enabling toggling between show and hide states triggered solely by user clicks. This setting manages click-based display behavior, allowing control over whether the popover appears or disappears when the user clicks the associated element, supporting use cases where hover, focus, or other triggers are disabled. It supports scenarios requiring precise click toggle control for UI elements, ensuring popover activation is linked only to click events, commonly used in interactive components, menus, or custom toggle interfaces where developers need to enable, disable, or fine-tune click-driven popover visibility behavior.
</div>

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


<div class="meta-api-description">
Control and customize the horizontal size or fixed pixel width of the pop-up container to adjust layout, manage content wrapping, and ensure the overlay fits specific user interface dimensions; configure, set, or override default width settings to define how wide the floating element appears on screen, enabling precise sizing for tooltips, dropdowns, or modal overlays in pixels for responsive or fixed designs.
</div>

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


<div class="meta-api-description">
Adjust or configure the placement, alignment, or anchoring of a floating overlay or tooltip relative to its reference element, enabling you to set the popover’s position to appear above, below, to the left, right, or centered around the target. Control where the overlay or contextual popup displays in relation to the triggering component, managing the spatial orientation and attachment point for optimal user interface layout, whether you want the popover to show on top, beneath, beside, or aligned centrally with the target element. This positioning setting helps specify where the popup or hint box appears in relation to the anchor element, supporting common placement options like top, bottom, left, right, or center for flexible and precise overlay arrangement.
</div>

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


<div class="meta-api-description">
Configure how and when a popover displays by setting the event trigger that opens it, such as on mouse enter, click, or focus, enabling control over user interactions that show or activate overlay content, tooltips, or contextual menus through various event handlers or user actions.
</div>

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

Specifies the offset (in pixels) between the Popover and the anchor. The offset is rendered from the callout arrow.


<div class="meta-api-description">
Adjust the pixel distance or spacing between a floating pop-up element and its reference or anchor point to control the visible gap or offset from the callout arrow, enabling precise positioning and shifting of the popover by a specific number of pixels for refined alignment, margin customization, or visual separation in UI layouts.
</div>

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


<div class="meta-api-description">
Control and customize the popover’s underlying popup component that handles showing, hiding, and positioning behavior by accessing the popup instance to set custom CSS classes, inline styles, attributes, or wrapper configurations; modify display properties, adjust placement, apply styling overrides, or programmatically show and hide the popup element when a popover is visible, ensuring flexible control over its lifecycle, appearance, and behavior during open and close states.
</div>

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


<div class="meta-api-description">
Trigger or display an overlay pop-up or floating tooltip attached to a specific element or event target programmatically, control or open contextual popovers on-demand for given DOM nodes, set visibility or enable a floating info box dynamically linked to user interface elements, show interactive overlays or hints anchored to page components by code commands, programmatically reveal or manage popover display linked to buttons, inputs, or custom UI elements, control the appearance of tooltip-like or popup widgets in response to user interactions or scripts, enable dynamic visibility toggling of floating popover boxes targeting particular parts of the document object model.
</div>

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


<div class="meta-api-description">
Programmatically close, dismiss, or hide popup overlays, tooltips, or floating panels to control their visibility and remove content from view without destroying or resetting their configuration, allowing dynamic toggling of display states based on user interactions, events, or custom logic; enable hiding or retracting floating elements, dialogs, or contextual information panels using code-driven commands for seamless UI management and interaction handling.
</div>

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


<div class="meta-api-description">
Retrieve or identify the element or selector that anchors or triggers a popover component, enabling inspection, dynamic positioning adjustments, conditional logic based on the popover’s current target, or accessing the element that activates the overlay. This method supports use cases like logging the source element, querying which element a floating UI is attached to, configuring event handlers tied to the popover trigger, or controlling popover behavior relative to its invoking element in code.
</div>

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


<div class="meta-api-description">
Detect when a popover or similar overlay becomes visible to trigger post-display actions such as running code after it appears, enabling dynamic content loading, setting focus on elements, adjusting layout or position, initiating animations, or sending analytics events. Capture events signaling that a flyout, tooltip, or floating panel is now shown to execute follow-up logic, update UI, or measure components. Monitor state changes to control behavior immediately after a dropdown, modal, or popup becomes visible, incorporating callbacks for focus management, content refresh, repositioning, animation start, or event tracking across user interface components that reveal additional information or interactivity.
</div>

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


<div class="meta-api-description">
Detect when a pop-up overlay or tooltip is dismissed or closed, enabling you to track when transient UI elements disappear, respond to hide or close events, execute cleanup tasks, update application state after a popover or overlay vanishes, listen for user interactions that cause pop-up components to hide, handle modal or floating panel closures, trigger follow-up actions upon dismissal, and manage UI transitions related to pop-up visibility changes.
</div>

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
