---
title: Tooltip
page_title: Configuration, methods and events of Kendo UI Tooltip
res_type: api
component: tooltip
---

# kendo.ui.Tooltip

Represents the Kendo UI Tooltip. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoHide `Boolean`*(default: true)*

Specifies if the Tooltip will be hidden when the mouse leaves the target element. If set to `false`, a **Close** button will be shown within Tooltip. If set to `false`, `showAfter` is specified, and `showOn` is set to `mouseenter`, the Tooltip will be displayed after the given timeout even if the element is no longer hovered.


<div class="meta-api-description">
How to configure Kendo UI tooltip to automatically hide when mouse leaves target element? Manage the behavior of tooltip visibility by configuring automatic hiding when the cursor moves away from the target element or keeping the tooltip visible until manually closed; options include enabling or disabling auto-hide, controlling whether the tooltip disappears on mouse leave, showing a close button inside the tooltip for manual dismissal, setting delays before the tooltip appears even if the mouse is no longer hovering, and customizing how and when tooltips appear or persist based on hover events and timeout settings to suit various interactive UI scenarios requiring persistent or temporary tooltip display.
</div>

#### Example - preventing the Tooltip from closing automatically

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            autoHide: false
          });
        });
    </script>

### animation `Boolean|Object`

A collection of `{Animation}` objects which are used to change the default animations. If set to `false`, all widget animations will be disabled. `animation:true` is not a valid configuration.


<div class="meta-api-description">
How to customize the animation of a Kendo UI for jQuery tooltip? Control and customize tooltip show and hide animations, transitions, or effects by enabling, disabling, or overriding default open and close animation behaviors using configurable animation objects. Adjust or set animation sequences, toggle smooth appearance and disappearance effects, manage tooltip fade-ins, slide-ins, or other visual transitions, customize animation timing and style, or completely turn off all tooltip animations and motion effects for performance or user experience preferences.
</div>

#### Example - disabling animations

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: false
          });
        });
    </script>

### animation.close `Object`

The animation that will be used when the Tooltip closes.


<div class="meta-api-description">
How to disable closing animation in Kendo UI tooltip? Customize the behavior and appearance of the tooltip hide transition by configuring or disabling the closing animation effect, adjusting animation duration, easing curves, or controlling how the tooltip smoothly disappears, fades out, or instantly closes upon dismissal, enabling developers to fine-tune or remove animations for tooltip closing events, manage visual feedback when the tooltip hides, and set parameters for animated or instant tooltip dismissal effects.
</div>

#### Example - setting the close animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              close: {
                effects: "fade:out"
              }
            }
          });
        });
    </script>

### animation.close.effects `String`

The effect that will be used for closing the Tooltip.


<div class="meta-api-description">
How to customize closing animation for Kendo UI tooltip? Adjust and customize the closing animation or transition effect for tooltip popups by selecting different visual styles such as fade out, slide away, zoom out, or other disappearance effects to control how tooltips vanish when dismissed, blurred, or closed; configure the exit animation behavior, set smooth or quick transitions, and manage the visual feedback for tooltip hiding to match UI responsiveness or experience preferences.
</div>

#### Example - setting the close animation effect

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
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
How to adjust the hide animation duration of Kendo UI tooltip? Control and configure the length of the tooltip hide animation duration, adjust the timing for how fast or slow the tooltip dismisses, set the transition period for closing effects, customize the animation speed when the tooltip disappears, manage the delay or rapidity of tooltip closure, tune the fade-out or slide-away duration when hiding the tooltip, modify the closing animation length to enhance user experience, specify smoothness and speed of tooltip exit animations, control the speed of closing transitions for tooltips, and set how long the tooltip remains visible before fully closing during the animation phase.
</div>

#### Example - setting the duration of the close animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              close: {
                duration: 1000
              }
            }
          });
        });
    </script>

### animation.open `Object`

The animation that will be used when the Tooltip opens.


<div class="meta-api-description">
How do I customize the opening animation of a Kendo UI tooltip? Customize the appearance and behavior of opening animations for tooltips by configuring animation types such as fade, slide, or other effects, adjusting timing parameters like duration and easing curves, setting how tooltips smoothly enter the view, enabling or disabling transition styles, and fine-tuning animation sequences to control the tooltip's reveal experience during hover, focus, or programmatic show events for enhanced UI feedback and visual engagement.
</div>

#### Example - setting the open animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
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

The effect that will be used for opening the Tooltip.


<div class="meta-api-description">
How do I customize the animation effect when a Kendo UI tooltip opens? Customize and configure the animation effect used when a tooltip appears or opens, including setting entrance transitions like fade, slide, bounce, or other custom visual effects to control the tooltip’s opening behavior, enable smooth or dynamic animations, adjust how the tooltip transitions into view, and manage the appearance style during tooltip activation or display.
</div>

#### Example - setting the open animation effect

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
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
How to set the animation duration for opening a Kendo UI tooltip? Adjust the delay or speed at which a tooltip becomes visible by configuring the opening animation time or duration to customize how quickly the tooltip shows up after user interaction, enabling control over tooltip fade-in, transition timing, or animation speed to enhance responsiveness and improve user experience through precise timing of the tooltip’s appearance.
</div>

#### Example - setting the duration of the open animation

    <span id="target" title="Tooltip content">
        Some Content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            animation: {
              open: {
                duration: "1000"
              }
            }
          });
        });
    </script>

### content `Object|String|Function`

The text or the function whose result will be shown within the Tooltip. By default, the Tooltip will display the content of the `title` attribute of the target element. To retrieve the `title` attribute of the target from inside the `content` function, use `target.data("title")`.

> If the content that is passed to the Tooltip includes scripts, they will be executed. If this is not desired, strip any undesired content in advance.


<div class="meta-api-description">
How to customize the content of a Kendo UI tooltip? Set or customize the tooltip display text by configuring static strings or dynamic callback functions that generate content at runtime, enabling rich, context-sensitive tooltips that can override default titles or attributes, support retrieving element data such as titles for flexible display, and allow embedding HTML or scripts while requiring sanitation of unsafe code; this feature supports use cases like dynamic label generation, conditional tooltip messages, interactive info panels, or replacing default browser tooltips with tailored content.
</div>

#### Example - extracting the content from the target element content

    <div id="container">
        <span title="foo">Some content</span>
        <span title="bar">Some more content</span>
    </div>

    <script>
        $(document).ready(function() {
          $("#container").kendoTooltip({
            filter: "span",
            content: function(e) {
              var target = e.target; // the element for which the tooltip is shown
              return target.data("title") + " " + target.text(); // set the element text as content of the tooltip
            }
          });
        });
    </script>

#### Example - implementing the content as static text

    <span id="target">
        Some content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            content: "Tooltip content!"
          });
        });
    </script>

### content.url `String`

Specifies a URL or a request option from which the Tooltip will load its content.

> For URLs which start with a protocol (for example, `http://`), an iframe container element will be automatically created. This behavior may change in future versions, so it is advisable to always use the [`iframe` configuration option](#iframe).


<div class="meta-api-description">
How do I load external HTML content into a Kendo UI tooltip? Load or fetch external HTML content into a tooltip by specifying a URL or request configuration that retrieves remote data, enabling dynamic embedding or loading of web pages and resources inside tooltip elements; control how external pages are displayed, including automatic iframe creation for protocol-based URLs, with options to configure, set, or customize loading behavior, content sourcing, and integration of external content within tooltips for enhanced interactivity and context-aware UI components.
</div>

#### Example - loading content from a remote URL

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        });
      });
    </script>

### callout `Boolean`*(default:true)*

Specifies if the Tooltip callout will be displayed.


<div class="meta-api-description">
How do I display a callout indicator in Kendo UI tooltip? Manage the display of the small pointer or arrow that visually links a tooltip to its target element by enabling or disabling the callout indicator; configure whether the tooltip shows a directional arrow, callout pointer, or connector triangle pointing to the reference element, controlling the presence or absence of this visual cue to improve user understanding or customize tooltip appearance.
</div>

#### Example - hiding the callout of the Tooltip

    <span id="target" title="Tooltip content">
        Some content
    </span>

    <script>
        $(document).ready(function() {
          $("#target").kendoTooltip({
            callout: false
          });
        });
    </script>

### filter `String`

Specifies a selector for the elements within the container which will display the Tooltip.

> It is recommended to avoid using the element's `title` attribute in the selector string, as the tooltip component strongly relies on it.


<div class="meta-api-description">
How do I configure Kendo UI tooltip to only show on specific child elements? Configure or control which child elements within a container activate or show the tooltip by setting a selector or filter that delegates tooltip functionality only to matching descendants, enabling scoped tooltip display on specific nested elements without relying on the container itself. This approach supports binding tooltips selectively to targeted elements, fine-tuning tooltip triggering based on element selectors or filters while excluding elements by controlling the activation scope inside complex component structures. Use filtering or element targeting to manage tooltip visibility on particular children, enabling precise tooltip delegation and filtering within hierarchical DOM trees or nested components.
</div>

#### Example - showing a Tooltip only for strong elements in a text

    <div id="container">
        I'm a <strong title="First target">tooltip target</strong>. I'm also a
        <strong title="Second target">tooltip target</strong>.
    </div>

    <script>
        $(document).ready(function() {
          $("#container").kendoTooltip({
            filter: "strong"
          });
        });
    </script>

### iframe `Boolean`

Explicitly states whether a content `iframe` will be created.


<div class="meta-api-description">
How to enable sandboxed iframe in Kendo UI tooltip? Control the creation and inclusion of an isolated iframe within tooltips to enable or disable sandboxed browsing contexts for tooltip content, customize whether tooltip displays render inside separate iframe elements for isolation or embed content directly without an iframe, configure tooltip content encapsulation through iframes to improve security, styling separation, or interactive behavior, and set options to toggle iframe usage based on context needs or performance considerations when displaying dynamic, external, or complex tooltip content.
</div>

#### Example

    <span id="target" title="Tooltip content">Some content</span>
    <script>
    $("#target").kendoTooltip({
        iframe: true,
        content: "<strong>HTML content</strong> that may contain scripts"
    });
    </script>

### height `Number`*(default: Infinity)*

The height (in pixels) of the Tooltip.


<div class="meta-api-description">
How do I adjust the size of a Kendo UI tooltip? Control or configure the vertical size of a tooltip by setting its height in pixels, enabling precise adjustment of tooltip dimensions for better content fitting, overflow management, and layout constraints; specify a numeric pixel value to set the tooltip’s total vertical height or limit its size to ensure consistent appearance across different screen elements or UI components.
</div>

#### Example - setting the height of the Tooltip

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          height: 80
        });
      });
    </script>

### width `Number`*(default: Infinity)*

The width (in pixels) of the Tooltip.


<div class="meta-api-description">
How do I set a fixed width for Kendo UI tooltips? Control and configure the fixed pixel width or size of tooltip elements to enforce consistent tooltip dimensions, prevent automatic resizing, set or limit tooltip box width within the user interface, customize tooltip size for uniform layout, and standardize tooltip appearance by specifying exact width values to maintain design consistency across various screen elements and components.
</div>

#### Example - setting the width of the Tooltip

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          width: 180
        });
      });
    </script>

### position `String`*(default: "bottom")*

The position that is relative to the target element at which the Tooltip will be shown.

The supported values are:

* `bottom`
* `top`
* `left`
* `right`
* `center`


<div class="meta-api-description">
How do I configure the position of a tooltip in Kendo UI for jQuery? Adjust or configure where a tooltip appears in relation to the associated element, enabling placement above, below, left, right, or centered over the target. Control tooltip alignment, orientation, or positioning to improve UI clarity, visibility, or user interaction by specifying options like top, bottom, left, right, or center placement. Customize tooltip display location, anchor point, or relative positioning to suit layouts, avoid overlap, or enhance accessibility and user experience with flexible directional settings.
</div>

#### Example - setting the position of the Tooltip

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          position: "right"
        });
      });
    </script>

### showAfter `Number`*(default: 100)*

Specifies the delay (in milliseconds) before the Tooltip shows. This option is ignored if `showOn` is set to `click` or `focus`.


<div class="meta-api-description">
How do I adjust the delay time for Kendo UI tooltip to show after hovering over an element? Configure the delay time in milliseconds before a tooltip is displayed after a user hovers or moves the mouse over an element, enabling control over how long to wait before showing the tooltip on hover or mouseenter events; this timing can be adjusted or disabled for instant display when triggering the tooltip via click or focus actions, allowing customization of tooltip appearance latency, hover delay, mouseover wait time, and interaction-based display timing.
</div>

#### Example - setting the show delay

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          showAfter: 1000
        });
      });
    </script>

### showOn `String`*(default: "mouseenter")*

The event on which the Tooltip will be shown.

The supported values are:

* `mouseenter`
* `click`
* `focus`


<div class="meta-api-description">
How do I configure my Kendo UI tooltip to show on mouse hover? Configure how and when a tooltip appears by setting the event that triggers its display, including options to show the tooltip on mouse hover, click interaction, or keyboard focus. Enable or control tooltip visibility based on user actions such as mouseenter, click events, or focus states, allowing customization of tooltip activation to improve accessibility, user interaction design, or specific UI behavior requirements. Adjust the trigger mechanism to match different input methods or interaction patterns, including pointer devices and keyboard navigation, to optimize tooltip responsiveness and user experience.
</div>

#### Example - setting the event on which the Tooltip will be shown

    <span id="target" title="Tooltip content">
      Click Me
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          showOn: "click"
        });
      });
    </script>

#### Example - setting the multiple events on which the Tooltip will be shown

    <span id="target" title="Tooltip content">
      Click Me
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          showOn: "click mouseenter"
        });
      });
    </script>

### hideAfter `Number`*(default: 100)*

Specifies the delay (in milliseconds) before the Tooltip is hidden.


<div class="meta-api-description">
How do I set up a tooltip to automatically hide after 5 seconds in Kendo UI for jQuery? Set or configure the duration in milliseconds for automatic hiding or dismissal of a tooltip, control how long the tooltip stays visible before disappearing, adjust the delay timer determining when the tooltip vanishes, enable timeout settings to automatically close the tooltip after a specified period, manage or customize the visibility timeout for tooltips to optimize user experience by specifying how long the tooltip remains on screen before hiding, control the lifespan or display interval of the tooltip pop-up, set the hide delay or timeout duration for tooltips that appear on hover or focus, configure automatic tooltip disappearance timing based on elapsed milliseconds, fine-tune the tooltip display duration for interactive UI elements, and control the period after which the tooltip will be hidden without user action.
</div>

#### Example - setting the hide delay

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          hideAfter: 500
        });
      });
    </script>

### offset `Number`*(default: 0)*

Specifies the offset (in pixels) between the Tooltip and the anchor. If the `callout` property is set to `true`, the offset is rendered from the callout arrow. If the `callout` property is set to `false`, the offset is rendered from the content of the Tooltip.


<div class="meta-api-description">
How do I adjust the spacing between my Kendo UI tooltip and its target element? Adjust spacing or distance between a tooltip and its target element by specifying pixel values to control how far the tooltip appears from the anchor point or callout arrow, enabling precise positioning for hover popups, info bubbles, label offsets, or contextual hints, with options to configure whether the gap is measured from the tooltip's content box or the callout pointer to fine-tune placement, prevent overlap, or customize visual alignment in user interfaces and interactive components.
</div>

#### Example - setting the Tooltip offset

    <span id="target" title="Tooltip long content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          offset: 10
        });
      });
    </script>

## Fields

### popup `kendo.ui.Popup`

Contains the Kendo UI [`Popup`](/api/javascript/ui/popup) instance which manages the showing and hiding of the tooltips at the appropriate position. The `popup` field can be used to apply custom CSS classes and styles, or any other attributes to the [`element` or `wrapper`](/intro/widget-basics/wrapper-element) settings of the Popup.


<div class="meta-api-description">
How can I control when my Kendo UI tooltip appears using JavaScript? Configure tooltip display control, including visibility toggling, dynamic placement, styling customization, and interactive show or hide behavior through the underlying popup handler. Manage tooltip positioning with precision, apply custom CSS or inline styles to the popup container or wrapper elements, and utilize methods such as open, close, and toggle to programmatically control when and where tooltip content appears. Enable developers to set attributes, adjust layout options, and dynamically manage tooltip rendering for enhanced user interaction and visual presentation.
</div>

#### Example

    <span id="target" title="Tooltip content">Some content</span>
    <script>
    $("#target").kendoTooltip({
        show: function(e) {
            // Access the popup instance
            var popup = this.popup;
            console.log("Tooltip popup instance:", popup);
            
            // Apply custom CSS class to popup wrapper
            popup.wrapper.addClass("custom-tooltip");
        }
    });
    </script>

## Methods

### show

Shows the Tooltip for a specific target.


<div class="meta-api-description">
How can I programmatically show a tooltip in Kendo UI for jQuery? Programmatically trigger or enable the display of a tooltip for a specific element, selector, or jQuery object, allowing dynamic control to show tooltip popups based on custom events, user interactions, or scripted conditions. Configure or set tooltips to appear on demand without requiring hover or focus, controlling popup visibility, positioning, and content retrieval for any DOM target element or CSS selector through code. This method provides flexible, manual activation of tooltip overlays in applications needing precise timing or event-driven tooltip display functionality.
</div>

#### Example - showing the Tooltip for the target element

    <div id="container">
      <span id="target" title="Tooltip content">Tooltip target</span>
    </div>

    <script>
      $(document).ready(function() {
        var tooltip = $("#container").kendoTooltip().data("kendoTooltip");
        tooltip.show($("#target"));
      });
    </script>

#### Parameters

##### element `jQuery`

The target element for which the Tooltip will be shown.

### hide

Hides the Tooltip.


<div class="meta-api-description">
How to programmatically close an on-screen tooltip in Kendo UI for jQuery? Control and manage the visibility of on-screen tooltips by programmatically dismissing or hiding them through code, allowing for dynamic closing of any currently displayed tooltip triggered by user actions or automated show commands, enabling developers to set, enable, or disable tooltip appearance, manage tooltip lifecycle events, or suppress visible tooltip popups on demand from scripts or event handlers to ensure flexible, code-driven interaction with floating contextual information elements.
</div>

#### Example - manually closing the Tooltip

    <div id="container">
      <span title="Tooltip content">Tooltip target</span>
    </div>

    <button id="hideTooltip" class="k-button">Hide tooltip</button>

    <script>
      $(document).ready(function() {
        var tooltip = $("#container").kendoTooltip({
          filter: "span",
          autoHide: false,
          position: "right"
        }).data("kendoTooltip");

        $("#hideTooltip").click(function() {
          tooltip.hide();
        });
      });
    </script>

### refresh

Refreshes the content of the Tooltip.


<div class="meta-api-description">
How do I update the content of a visible Kendo UI tooltip dynamically? Update or re-render a visible tooltip dynamically when its target element’s data, content, or bindings change by invoking a method that forces the tooltip to refresh its displayed content, including recalculating templates, re-evaluating content functions, fetching updated data from remote or dynamic sources, and instantly applying any changes to the tooltip after initialization or at runtime.
</div>

#### Example - forcing the refreshing of the Tooltip content

    <div id="container">
      <span id="target" title="Tooltip content">Tooltip target</span>
    </div>

    <button id="refreshButton" class="k-button">Refresh Content</button>

    <script>
      $(document).ready(function() {
        var tooltip = $("#container").kendoTooltip({
          filter: "span",
          position: "right",
          content: function() {
            return "last time refreshed: " + kendo.format("{0:T}", new Date());
          }
        }).data("kendoTooltip");


        $("#refreshButton").click(function() {
          tooltip.refresh();
        });
      });
    </script>

### target

Gets the current target of the Tooltip.


<div class="meta-api-description">
How do I get the current target element of a Kendo UI tooltip? Access or obtain the current element, node, or CSS selector where the tooltip is anchored or bound, enabling developers to identify, inspect, or dynamically fetch the attached target element for conditionally updating, handling events, or controlling which UI component triggers or displays the tooltip content at runtime. This method supports programmatic retrieval of the tooltip’s active reference element for interactive adjustments, event-driven checks, or debugging the tooltip's linkage in the DOM.
</div>

#### Example - getting the current target of the tooltip

    <div id="container">
      <span id="target1" title="Tooltip1 content">Tooltip target1</span> <br />
      <span id="target2" title="Tooltip2 content">Tooltip target2</span>
    </div>

    <button id="targetButton" class="k-button">Log target</button>

    <script>
      $(document).ready(function() {

        var tooltip = $("#container").kendoTooltip({
          filter: "span",
          autoHide: false,
          position: "right"
        }).data("kendoTooltip");


        $("#targetButton").click(function() {
          var target = tooltip.target();
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

### contentLoad

Fires when an AJAX request for the content completes.


<div class="meta-api-description">
How do I know when dynamic content in a Kendo UI tooltip has finished loading? Detect when dynamic or asynchronous content loading for a tooltip finishes, enabling responses to completed data retrieval such as updating the tooltip display, refreshing or replacing content, triggering callbacks, handling AJAX or fetch results, inspecting returned data, and executing follow-up actions after remote data is loaded and rendered in the tooltip interface.
</div>

#### Example - subscribing to the contentLoad event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          contentLoad: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("content is loaded");
          }
        });
      });
    </script>

#### Example - subscribing to the contentLoad event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        }).data("kendoTooltip");

        tooltip.bind("contentLoad", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("content is loaded");
        });
      });
    </script>

### show

Fires when a Tooltip is shown.


<div class="meta-api-description">
How do I listen for a Kendo UI tooltip to appear on screen? Trigger custom code or execute functions when a tooltip appears on screen, listen for the tooltip becoming visible, handle tooltip show events, respond instantly when a tooltip is displayed, capture event details upon tooltip activation, update tooltip content dynamically on show, log or track tooltip visibility, initiate UI changes or animations when a tooltip is revealed, control behavior tied to tooltip appearance, detect and act on tooltip popup events in real time.
</div>

#### Example - subscribing to the show event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          show: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("tooltip is shown");
          }
        });

      });
    </script>

#### Example - subscribing to the show event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
        }).data("kendoTooltip");

        tooltip.bind("show", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("tooltip is shown");
        });
      });
    </script>

#### Example - forcing refresh every time the Tooltip is shown

    <div id="container">
      <span id="target" title="Tooltip content">Tooltip target</span>
    </div>

    <script>
      $(document).ready(function() {
        $("#container").kendoTooltip({
          filter: "span",
          position: "right",
          content: function() {
            return "last time refreshed: " + kendo.format("{0:T}", new Date());
          },
          show: function() {
            this.refresh();
          }
        });
      });
    </script>

### hide

Fires when a Tooltip is hidden.


<div class="meta-api-description">
How do I handle the event when a Kendo UI tooltip is hidden? Detect and respond to tooltip closure by handling events triggered when the tooltip is hidden or dismissed, enabling execution of cleanup tasks, UI state updates, follow-up actions, or custom logic after the tooltip disappears. Capture and process event details related to tooltip hiding, listen for tooltip close events, monitor visibility changes, and manage tooltip lifecycle events to synchronize application behavior or perform resource cleanup after tooltip components are removed from view.
</div>

#### Example - subscribing to the hide event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          hide: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("tooltip is hidden!");
          }
        });

      });
    </script>

#### Example - subscribing to the hide event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip().data("kendoTooltip");

        tooltip.bind("hide", function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("tooltip is hidden!");
        });
      });
    </script>

### requestStart

Fires before an AJAX request starts. Note that this event is triggered only when an AJAX request is used instead of an `iframe`.


<div class="meta-api-description">
How can I intercept and modify tooltip-generated AJAX requests before they're sent? Capture and handle outgoing AJAX calls triggered right before dispatch, enabling interception of request details such as URL, headers, payload, and timeout parameters to modify or inspect them dynamically. Useful for customizing AJAX request options, injecting additional data, altering headers, toggling timeouts, or integrating pre-request logic specifically for tooltip-generated network calls made via AJAX rather than iframe. Triggered when an AJAX request initiates, this event allows developers to monitor, adjust, or cancel requests programmatically prior to transmission, supporting scenarios like request debugging, authentication token insertion, or request throttling in tooltip interactions.
</div>

#### Example - subscribing to the requestStart event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          requestStart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("request is started");
          }
        });
      });
    </script>

#### Example - subscribing to the requestStart event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        }).data("kendoTooltip");

        tooltip.bind("requestStart", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("request is started");
        });
      });
    </script>

#### Event Data

##### e.target `jQuery`

The target element for which the Tooltip is shown.

##### e.options `Object`

The request options which will be set to [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/) or to the `iframe`.

### error

Fires when an AJAX request for content fails.


<div class="meta-api-description">
How to handle errors when loading tooltip content with AJAX requests in Kendo UI for jQuery? Handle tooltip content load failures by detecting error events triggered when AJAX requests for tooltip content fail, enabling you to catch load errors, implement fallback messages, log error information, execute retry mechanisms, or perform custom error handling by accessing event details about the failed request. This supports managing tooltip content errors, troubleshooting AJAX load problems, reacting to fetch failures, customizing user feedback on errors, and controlling tooltip display under network or content retrieval issues.
</div>

#### Example - subscribing to the error event during initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280,
          error: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("error");
          }
        });
      });
    </script>

#### Example - subscribing to the error event after initialization

    <span id="target" title="Tooltip content">
      Some content
    </span>

    <script>
      $(document).ready(function() {
        var tooltip = $("#target").kendoTooltip({
          iframe: false,
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tooltip/ajax/ajaxContent3.html"
          },
          width: 220,
          height: 280
        }).data("kendoTooltip");

        tooltip.bind("error", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("error");
        });
      });
    </script>

#### Event Data

##### e.xhr `jqXHR`

The XHR request object as returned by [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).

##### e.status `String`

The status of the request as returned by [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).
