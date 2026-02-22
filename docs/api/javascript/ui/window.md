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


<div class="meta-api-description">
How do I customize the buttons in a Kendo UI window's title bar? Control and customize which header buttons like close, refresh, minimize, maximize, or pin appear in the window’s title bar by specifying a set of interactive commands or actions. Enable, configure, or set the visible top bar controls to tailor window behavior with options for closing, updating content, minimizing the window, maximizing screen space, or pinning it in place. Adjust the displayed toolbar buttons to match desired user interface interactions, allowing developers to choose exactly which window controls are accessible and how they function within the window component’s header area.
</div>

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


<div class="meta-api-description">
How do I customize window transitions in Kendo UI for jQuery? Configure, customize, or disable window transitions and visual effects for opening, closing, and other state changes by applying a set of animation objects or completely turning off animations; control how window animations behave, override default effects, set custom transition sequences, enable or disable animated effects, and manage window motion behaviors to tailor user interface responsiveness and visual flow without using invalid configurations.
</div>

#### Example - disabling the animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      animation: false
    });
    </script>

### animation.close `Object`

The animation that will be used when a Window closes.


<div class="meta-api-description">
How to disable animation when closing Kendo UI window? Control and customize how windows animate during closing sequences by setting parameters such as animation type, effect style, transition duration, and easing curves; enable smooth visual effects for closing windows, adjust timing for faster or slower closures, disable animations for instant window shutdowns, or fine-tune the closing animation behavior for better user experience and interface responsiveness.
</div>

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


<div class="meta-api-description">
How to customize the closing animation of a Kendo UI window? Configure and customize the closing animation for popups or window components by selecting or setting different transition effects like fade out, slide away, zoom out, or other exit animations to control how the interface element smoothly disappears or exits the viewport, enabling developers to enhance user interface responsiveness and visual feedback during close interactions, exit sequences, or window dismissal with fluid animated effects.
</div>

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


<div class="meta-api-description">
How do I adjust the closing animation duration of a Kendo UI window? Adjust, configure, or control the length of the closing animation for a window or user interface element by setting the duration in milliseconds, enabling customization of the speed and timing of window close transitions to create smooth, faster, or slower UI effects. Modify the close animation timing to optimize user experience by fine-tuning how quickly or gradually the window disappearance effect runs, using numeric values to set precise animation intervals, allowing developers to enhance interface responsiveness and visual flow during window closures, including reducing delay or extending animation length for design consistency or performance preferences.
</div>

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


<div class="meta-api-description">
How to animate a Kendo UI dialog opening? Configure and customize the opening animation behavior of a window or dialog, including setting the entrance effect, transition duration, easing curve, fade-in, slide, zoom, or bounce animations, and controlling how the window visually appears when triggered to open, enabling smooth, configurable, and animated window display with adjustable timing and visual style effects for enhanced user interfaces and UX transitions.
</div>

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


<div class="meta-api-description">
How can I customize the opening animation of my popup window in Kendo UI? Configure and customize the opening animation effects for popup windows, enabling control over how the window visually appears with options like fade-in, slide-in, zoom, or other entrance animations. Adjust or set the animation style, effect type, or transition when a window or popup opens to create smooth, dynamic, or attention-grabbing entrance sequences. Enable, define, or control entry animations for UI components that appear on-screen, specifying different visual transition effects for popups or windows as they become visible.
</div>

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


<div class="meta-api-description">
How do I control the length of the opening animation for Kendo UI windows? Control and configure the length of the opening animation for windows, adjusting how long the show or appear animation runs when a window opens, enabling customization of effects like fade-in, slide-in, or other transition styles. This setting impacts the speed, timing, and smoothness of window launch animations, allowing developers to fine-tune the perceived responsiveness and visual flow of UI elements by setting duration values for the open or reveal animations. Adjust the open animation timing to enhance user experience with customizable entry effects for windows and dialogs, managing the speed of appearance transitions and animation lengths for opening interface components.
</div>

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


<div class="meta-api-description">
How do I append a Kendo UI window to a specific container in the DOM? Control where the window or popup is added in the DOM by selecting a specific container element to manage its rendering context, z-index stacking, and visibility boundaries. Set or configure the target element to append modals, dialogs, or floating windows within certain parts of the page, ensuring proper containment and avoiding clipping issues caused by CSS overflow settings like hidden, auto, or scroll. Enable or disable dragging constraints relative to this container to prevent unwanted movement restrictions or scrollbars, adjusting the parent node to influence layering order and scroll behavior for dynamic overlays, forms, or popup interfaces.
</div>

#### Example - setting the Window container to be with the id="mainForm" form

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      appendTo: "form#mainForm"
    });
    </script>

### autoFocus `Boolean` *(default: true)*

Determines whether the Window will be focused automatically when opened. The property also influences the focus behavior when an already opened Window is clicked.


<div class="meta-api-description">
How do I configure Kendo UI for jQuery to automatically focus a window when it opens? Configure automatic focus behavior for window interfaces to ensure that a window gains keyboard focus immediately upon opening or when users click on it, enhancing accessibility, keyboard navigation, and user interaction flow. Enable or disable auto-focus settings to control focus management dynamically, supporting scenarios where managing focus on modal or popup windows is critical for usability, tab order control, and screen reader compatibility. This focus control facilitates seamless user experience by allowing windows to receive input focus as soon as they appear or when reactivated by user clicks, improving interaction efficiency and accessibility compliance.
</div>

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


<div class="meta-api-description">
How to load external HTML content into a Kendo Window using a specific URL? Load or fetch web content dynamically by specifying a URL or detailed HTTP request options such as method, headers, and payload to inject HTML or external resources into a window or container. Enable remote content rendering through AJAX or direct URL loading, with automatic iframe embedding for protocol-based addresses, supporting configuration of request parameters, content sourcing, dynamic HTML injection, asynchronous HTTP requests, embedded browsing contexts, cross-domain content loading, and customizable data fetching settings for displaying external pages or data within application windows or UI components.
</div>

#### Example - fetching content from the server

```
  <base href="https://demos.telerik.com/kendo-ui/window/ajax">
```


### content.url `String`

Specifies the url from which the content is fetched


<div class="meta-api-description">
How to set the remote HTML content URL in Kendo UI window? Specify or configure the URL for loading remote HTML content into a window or panel, enabling dynamic fetching of web pages, fragments, or endpoints via HTTP requests or AJAX calls with support for cross-origin resource sharing (CORS). This setting controls from where the window fetches and renders external HTML content, allowing developers to set, update, or bind the source URL for embedded web views, remote templates, or live content loading within user interfaces. It supports scenarios like injecting external web pages, loading remote fragments, or pulling content asynchronously from APIs, servers, or other web resources into the component.
</div>

#### Example - fetching JSON and displaying it through a template

    <base href="https://demos.telerik.com/kendo-ui/window/ajax" />
    <div id="dialog"></div>
    <script>
      $("#dialog").kendoWindow({
        content: {
          url: "../content/web/tabstrip/ajax/ajaxContent2.html",
        },
      });
    </script>

### content.dataType `String` *(default: "html")*

The type of result expected from the remote service. Used values are "html" and "json".


<div class="meta-api-description">
What data type does Kendo UI Window expect when loading content from a remote URL? Specify or configure the expected format of remote content loading and parsing for a window or frame, controlling whether the incoming response is handled and interpreted as HTML markup or JSON data; useful for setting response types, managing content rendering, handling AJAX or API responses, enabling dynamic content loading with proper data interpretation, and adjusting parsing behavior based on the content format from external services or servers.
</div>

#### Example - fetching and displaying JSON content it in the Window

    <div id="dialog"></div>

    <script>
      $("#dialog").kendoWindow({
        content: {
          url: "https://demos.telerik.com/kendo-ui/content/shared/js/products.js",
          dataType: "json"
        }
      });
    </script>

### content.iframe `Boolean`

If the URL for the Window content contains a protocol, the Window creates an iframe for the content and assumes that the nested page resides in another domain.

If the URL does not contain a protocol, the URL is treated as a local URL which will load a partial view and the Window does not create an iframe for the content.

To control the creation of iframe Window content, you have to explicitly configure the option.


<div class="meta-api-description">
How does Kendo UI configure iframe creation for remote URLs versus local partial views in a window? Configure how content loads within a window by controlling iframe creation to embed remote URLs or load local partial views directly; enable or disable iframe usage based on whether the target URL includes protocols like http or https, treating absolute links as cross-domain content loaded inside an iframe and relative or local paths as inline content without frames, with options to explicitly set or override automatic iframe behavior for dynamic page embedding, cross-origin content display, secure remote loading, partial view rendering, and flexible content source management.
</div>

#### Example - Explicitly configure an iframe

    <div id="dialog"></div>

    <script>
    $("#dialog").kendoWindow({
      content: {
        url: "https://demos.telerik.com/kendo-ui/content/shared/js/products.js",
        dataType: "json",
        iframe: true
      }
    });
    </script>

### content.template `String`

The template for the content of a Window. Returned data from the server will be given as the `data` of this template.

If the returned data is JSON, the [`dataType`](https://api.jquery.com/jQuery.ajax/) parameter has to be passed so that the data gets parsed by jQuery.

If the URL contains a protocol, set `iframe` to `false`. Otherwise, the JSON response will be injected in the content area of the Window as is.


<div class="meta-api-description">
How do I render dynamic content within a Kendo UI window using a custom template? Control display of dynamic or remote content within a window by defining an inline or external template to render server responses, binding returned data as template variables for flexible data integration and presentation. Configure how JSON or other data formats are parsed and injected into the window content, including options to set content as raw HTML or safely parsed templates based on request URLs and protocols. Enable seamless templating with support for AJAX data parsing, JSON response handling, and conditional embedding of content using iframes or direct injection, allowing developers to customize window rendering by providing template markup, managing asynchronous data binding, and integrating server-side data into client-side views.
</div>

#### Example - fetching JSON and displaying it through a template

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      content: {
        url: "https://runner.telerik.io/fullscreen/tZWehimq.json",
        dataType: "json",
        iframe: false,
        template: ({ username }) => `User name: ${username}`
      }
    });
    </script>

### draggable `Object|Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the dragging of the widget.


<div class="meta-api-description">
How do I enable dragging for a Kendo UI window? Control whether a window or UI component can be moved, repositioned, or dragged using mouse or touch input by enabling or disabling drag interaction, dragging functionality, or movable behavior; configure draggable states to allow users to click and drag elements like title bars or panels, set or toggle drag capability for repositioning interfaces, and manage user ability to drag windows or components across the screen for a customizable, interactive layout experience.
</div>

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

Defines the element in which the window will be able to move. The containment option overrides the [`appendTo`](/api/javascript/ui/window/configuration/draggable.containment) setting and attaches the Window to the specified DOM element. Accepts either a selector or an element.

> The containment element has to be positioned, that is, its CSS `position` attribute has to be set to `relative`, `absolute`, or `fixed`.


<div class="meta-api-description">
How do I limit the movement of a Kendo UI window within a specific container? Control and limit the draggable movement or dragging boundaries of a window or popup within a specific container element or DOM boundary by setting a containment target, enabling confinement inside a particular area or layout region to prevent dragging outside a parent, ancestor, or designated selector; configure containment using CSS positioned elements (relative, absolute, or fixed) as the bounding box, accepting selectors or direct element references to restrict, constrain, or clamp drag interactions to a defined zone within the webpage or app interface.
</div>

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


<div class="meta-api-description">
How to restrict window dragging to only horizontal movement in Kendo UI for jQuery? Limit or configure draggable window movement along a specific axis by enabling horizontal-only or vertical-only dragging controls, restricting dragging behavior to either side-to-side or up-and-down directions, setting movement constraints for window drag functionality, defining axis constraints during initialization to lock dragging to the x-axis (left-right) or y-axis (up-down), specifying directional drag limits for user interface windows, controlling and enabling drag gestures on a single axis, adjusting window drag behavior for UX purposes to constrain motion horizontally or vertically.
</div>

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


<div class="meta-api-description">
How do I set up a specific element as the drag handle for a Kendo UI Window to restrict dragging? Control and configure dragging behavior within a window or container by specifying a particular element or selector that acts as the exclusive drag handle, enabling drag operations only when interacting with that designated area such as a title bar, header, or custom handle inside the component. Enable or restrict drag initiation to a specific sub-element by setting a reference or CSS selector, so that drag gestures outside this handle are ignored, allowing precise customization of drag zones, user interaction control, and improved UX for movable UI panels or dialogs. Adjust drag regions, activate drag on a specific part of the window, lock drag start to chosen elements, or configure drag boundaries within the child elements for refined drag-and-drop behavior and interface control.
</div>

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

Explicitly states whether a content `iframe` will be created. For more information, refer to the documentation on [using `iframes`](/controls/window/content).


<div class="meta-api-description">
How do I enable or disable an iframe within the Kendo UI for jQuery window component? Control the option to create or prevent a dedicated embedded frame within the main window for loading external HTML content, isolating component DOM elements, applying separate styles, or securely displaying remote web pages; adjust settings to enable or disable using nested browsing contexts, frame elements, or content isolation methods that affect how external resources or isolated components render within the application environment.
</div>

#### Example - loading the full page

```pseudo
    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      content: "https://www.telerik.com/",
      iframe: true
    });
    </script>
```

### height `Number | String`

Specifies the height of the Window.


<div class="meta-api-description">
How do I set the height of a Kendo UI Window dynamically? Control, configure, or set the vertical size, visible height, or pixel height of a window or UI container dynamically during initialization or runtime using numeric values or CSS-compatible strings like pixels, percentages, or viewport units. Adjust, resize, or modify the height dimension to influence layout, scaling, responsiveness, or visible space of window components or panels, with support for runtime updates and style-based sizing options for flexible interface design and pixel-perfect or relative height adjustments.
</div>

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


<div class="meta-api-description">
How to set maximum height for a resizable Kendo UI window? Set or configure the upper limit for vertical resizing on window or UI components to prevent exceeding a specific maximum height in pixels, enabling control over window dimension constraints, bounding how tall the resizable container or dialog can grow, restricting the height during user drag or programmatic resizing, enforcing size limits on windows, frames, or panels, and managing maximum allowable vertical size for layout consistency and responsive design.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      maxHeight: 300
    });
    </script>

### maxWidth `Number` *(default: Infinity)*

The maximum width (in pixels) that may be achieved by resizing the Window.


<div class="meta-api-description">
How do I set a maximum width for a Kendo UI window to prevent it from resizing too large? Configure or set a maximum width limit to constrain how wide a window or resizable component can expand, controlling or restricting its horizontal resize boundaries in pixels to prevent it from growing beyond a specified width; enable max size restrictions during initialization or dynamically define the upper limit for resizing, ensuring the interface stays within desired screen or layout constraints while allowing flexible or unlimited width if no maximum is set.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      maxWidth: 300
    });
    </script>

### minHeight `Number` *(default: 50)*

The minimum height (in pixels) that may be achieved by resizing the Window.


<div class="meta-api-description">
How can I prevent my Kendo UI window from resizing below a certain height? Set or configure the minimum height limit to restrict resizing of a window or interface element so it cannot shrink below a defined pixel value, enabling control over the smallest allowable vertical dimension during manual dragging or programmatic resizing, ensuring layouts maintain usability and visibility by enforcing height constraints and preventing collapse or overly small display areas in applications.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      minHeight: 100
    });
    </script>

### minWidth `Number` *(default: 50)*

The minimum width (in pixels) that may be achieved by resizing the Window.


<div class="meta-api-description">
How do I set the minimum width of a Kendo UI window? Control and restrict the smallest width dimension in pixels that a window, panel, or interface component can be resized to, ensuring the layout does not become too narrow or collapse when users drag or adjust window edges. Configure minimum width limits for resizable UI elements to maintain usability, prevent content clipping, or enforce design constraints by setting pixel-based boundaries that stop resizing below a defined threshold. Enable, set, or adjust the least allowed horizontal size to guarantee consistent display behavior, protect interface integrity, and optimize layout responsiveness across different window sizes or screen setups.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      minWidth: 100
    });
    </script>

### modal `Boolean|Object` *(default: false)*

Specifies whether the Window will display a modal overlay over the page.


<div class="meta-api-description">
How do I enable modal dialogs in a Kendo UI window? Control whether a window displays a blocking overlay that disables interaction with page elements behind it, enabling or disabling modal dialogs that prevent clicks and input on the background content; configure modal behavior to show a backdrop that locks user focus inside the window or make the window modeless to allow users to interact freely with underlying page elements, toggling between modal and non-blocking window states for managing user attention, focus trapping, and overlay visibility during dialogs, popups, or temporary forms.
</div>

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


<div class="meta-api-description">
How to prevent scrolling behind an open Kendo UI modal window? Control blocking or disabling page scroll behind an open modal dialog by configuring overflow prevention on the main document or window when popups, dialogs, or overlay windows are active to keep background content fixed and prevent user scrolling interactions; manage the restoration of scroll behavior when modals close, avoid conflicts with containment boundaries, and understand that multiple open modals with differing scroll lock settings may not function simultaneously.
</div>

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


<div class="meta-api-description">
How to pin a Kendo UI window in place while scrolling? Control whether a window or panel remains fixed in place onscreen regardless of page scrolling, enabling pinning or locking the window’s position so it stays visible while other content scrolls underneath; configure the window to stay anchored, prevent movement during scroll, enable fixed positioning or toggle between pinned and scrollable states, ideal for keeping important UI elements, toolbars, or dialogs always accessible as users navigate the page or interact with dynamic content.
</div>

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


<div class="meta-api-description">
How do I set the initial position of a Kendo UI window on my webpage? Control and configure the starting location or coordinates for windows, dialogs, or containers on a webpage by specifying horizontal and vertical placement values such as top, left, initial position, or offset. Enable setting or adjusting where a window appears within the viewport or relative containment boundaries, including precise pixel positioning, layout anchoring, or alignment preferences to determine the window’s starting point. Tailor interface positioning with options to define the left and top coordinates, control window placement on page load, and manage containment element alignments for user interface elements or overlays.
</div>

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


<div class="meta-api-description">
How to set top position of Kendo UI window using pixels, percentage or other units? Control vertical placement and initial offset of a window by specifying its top position using numeric pixel values or string formats including pixels, percentages, em units, and other CSS units. Adjust, configure, or set the top margin, top offset, vertical alignment, or custom layout starting point for windows on screen load, allowing precise vertical positioning, centering by percentage, or relative sizing to viewport or container dimensions. Enable fine-tuning of window top edge placement for UI design, dynamic layouts, modal dialogs, or any scenario requiring customized vertical start positions at launch or initialization.
</div>

#### Example

    <div id="window"></div>
    <script>
    $("#window").kendoWindow({
      position: {
        top: 150 // or "150px" or "20%"
      }
    });
    </script>

### position.left `Number|String`

Specifies the initial left position of the Window. Numeric values are treated as pixels. String values can specify pixels, percentages, ems or other valid values.


<div class="meta-api-description">
How do I set the initial horizontal position of my Kendo UI window? Control or configure the initial horizontal placement of a window by specifying the left offset using numeric pixel values or CSS-compatible strings such as pixels ("10px"), percentages ("10%"), ems ("1em"), or other units to position the window precisely on the screen; enable setting, adjusting, or defining the left side coordinate during setup or initialization to customize where the window appears horizontally in layouts, interfaces, or applications.
</div>

#### Example

    <div id="window"></div>
    <script>
    $("#window").kendoWindow({
      position: {
        left: 200 // or "200px" or "25%"
      }
    });
    </script>

### resizable `Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the resizing of the Window.


<div class="meta-api-description">
How to enable resizing of a Kendo UI window? Control whether a window or panel can be interactively resized by users through dragging edges or corners with mouse or touch input, enabling or disabling dynamic adjustment of width and height. Configure the ability to toggle resizability so that the window’s size is fixed or flexible, supporting use cases where interface components need to remain static or adapt to user-driven size changes. This setting manages whether the UI element responds to user actions for resizing, allowing developers to set constraints on window dimension changes during initialization or runtime customization, ideal for creating adjustable layouts, preventing unintended resizing, or enabling responsive interface behavior.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      resizable: false
    });
    </script>

### scrollable `Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the scrolling of the Window contents.


<div class="meta-api-description">
How do I enable scrolling in a Kendo UI for jQuery Window widget? Control whether the window content can be scrolled to access overflowing elements by enabling or disabling vertical and horizontal scrolling behavior, configure scrollability to allow user navigation within oversized or clipped content areas, set or toggle scroll settings to let users pan or lock the viewport inside the window, manage scrolling capability to handle dynamic content overflow, and adjust interaction modes to prevent or permit scrolling gestures and scrollbars inside the container.
</div>

#### Example

    <div id="dialog">
		    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
	  </div>
	  <script>
	    $("#dialog").kendoWindow({
		    height:100,
        width: 300,
		    scrollable: false
	    });
    </script>

### themeColor `String` *default: ""*

The `themeColor` option controls the color that will be applied.

The following values are available for the themeColor:

- `primary`
- `dark`
- `light`
- `none`


<div class="meta-api-description">
How do I change the accent color for my Kendo UI window? Configure the accent color or color scheme for a window interface including options for primary, dark, light, or no color styling, enabling control over the visual theme, appearance, color accents, or style applied during component initialization to match branding, UI preferences, or light and dark mode settings.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: ["Maximize"],
      title: "Customer details"
    });
    </script>

### title `Object|String|Boolean` *default: ""*

The text in the title bar of the Window. If set to `false`, the Window will be displayed without a title bar.

> The title bar buttons of the Window will not be displayed. Unless [`dragHandle`](/api/javascript/ui/window/configuration/draggable.draghandle) is configured, this will prevent the Window from dragging.


<div class="meta-api-description">
How do I customize the title bar in Kendo UI Window? Configure or customize the text displayed in the application window's title bar, control whether the title bar is visible or hidden, enable or disable window dragging by showing or removing the title bar, set a specific window title string, remove title bar buttons and handle user interactions related to window movement, customize window chrome appearance including hiding the title for a frameless or clean window design, and manage how the window header behaves in terms of visibility and user interface controls.
</div>

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


<div class="meta-api-description">
How to dynamically change the Kendo UI window title? Control or configure the text label displayed in the window header or title bar, set or update the window’s main caption dynamically, customize the displayed string at initialization, programmatically change the window title text for UI feedback or branding, set the header name for user interfaces, adjust or modify the title bar content, specify the window label shown at the top, enable changing the window caption at runtime, manage the window’s displayed header text to reflect current state or context.
</div>

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


<div class="meta-api-description">
How do I prevent HTML injection in Kendo UI window titles? Control how window titles handle HTML content by enabling or disabling encoding to either safely escape markup and prevent injection risks or allow HTML tags to render within the title text. Configure title encoding with a boolean setting that determines if special characters and HTML elements in window titles are treated as plain text for security or interpreted as HTML for formatting purposes. Set, toggle, or adjust the handling of HTML encoding in window titles to manage display, prevent cross-site scripting, and control whether markup is safely rendered as text or processed as HTML elements.
</div>

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


<div class="meta-api-description">
How do I set the initial visibility of a Kendo UI window when it's first loaded? Set, control, or configure the initial display state of a window or modal by enabling or disabling its visibility on startup, determining whether a user interface element is shown or hidden when the application or component loads, managing default visibility settings for dialogs, pop-ups, or windows so they appear or remain concealed at launch, toggling the presence of a window during initialization based on true or false values, and adjusting startup UI visibility behavior to suit user experience or interface flow requirements.
</div>

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


<div class="meta-api-description">
How do I set the initial width of a Kendo UI window? Set or adjust the horizontal dimension, size, or width of a window or UI container to define its initial or default layout boundaries and spatial arrangement during application startup or component rendering. Configure, control, or specify the starting horizontal measurement, bounding box width, or frame size to influence element positioning, responsive design, and screen real estate allocation in graphical interfaces or windowed components. Determine how wide the interface or viewport appears initially, affecting layout calculations, dynamic resizing considerations, or fixed width requirements for dialogs, panels, or viewports.
</div>

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


<div class="meta-api-description">
How do I set the size of a Kendo UI window to fit different screen sizes? Set or control the window dimensions using predefined size options like auto, small, medium, or large to manage layout scaling, responsive design, or preset viewport configurations, with the flexibility to override defaults by specifying exact width and height values to customize window sizing behavior for various screen setups, device viewports, or UI components requiring distinct dimension presets or automatic adjustment.
</div>

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


<div class="meta-api-description">
How do I recenter a Kendo UI window after it has been opened? Reposition and align a window or dialog box at the center of the viewport or screen, enabling developers to recenter UI components after opening, dynamic content loads, or layout adjustments, ensuring consistent on-screen positioning and handling resizing scenarios by controlling centering behavior post-render or after Ajax content updates, useful for setting or maintaining the window’s visual focus, resetting coordinates, and managing responsive or dynamic interfaces.
</div>

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


<div class="meta-api-description">
How do I programmatically close a Kendo UI window using the jQuery API? Programmatically shut, dismiss, hide, or close an open window or dialog via a method call to terminate or cancel workflows, respond to user actions or external events, remove the window from view, and trigger standard closing operations on the window or component instance after initialization, enabling developers to control UI visibility, manage modal states, dismiss popups, or implement custom window closing logic in applications.
</div>

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


<div class="meta-api-description">
How do I dynamically update the content inside a Kendo UI window? Retrieve or update the displayed content inside a window or panel dynamically during runtime by getting or setting the current inner content, enabling programmatic control to fetch existing content, replace it with new elements or text, modify what is shown on screen, refresh or change UI views, and chain methods to manage content updates efficiently within windowed interface components.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
How do I completely remove and dispose of a Kendo UI window instance? Permanently remove or close a window or dialog component along with any associated modal overlay, clean up all related HTML elements from the DOM, fully dispose of the window instance and overlay markup, and ensure complete teardown of UI elements to prevent memory leaks, remove popups or dialogs entirely, and control modal window lifecycle by destroying or deleting the wrapper and modal elements from the page.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.destroy();
    </script>

### isMaximized

Indicates whether the Window is maximized.


<div class="meta-api-description">
How to determine if Kendo UI window is maximized? Determine if a window is currently enlarged to fill the entire screen or workspace by querying its maximized state, enabling layout adjustments, dynamic resizing, or toggling restore and minimize controls. Check whether the application window is fully expanded, covering the desktop or parent container, to drive responsive UI behavior, conditional rendering, or state-aware functionality. Retrieve a true or false value indicating if the window is in maximized mode, useful for deciding whether to show restore buttons, optimize content display, or control window state transitions after initialization or during runtime.
</div>

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


<div class="meta-api-description">
How can I check if my Kendo UI window is currently minimized? Check if a window is currently minimized, detect minimized or not minimized states, query window visibility status, verify whether the app or window is in minimized mode, determine if a window is hidden or collapsed, enable conditional logic for restoring or maximizing windows, monitor window state changes to update user interfaces or workflows, assess minimized flags to control window behavior dynamically, detect minimized versus active window for UI adjustments, and retrieve boolean status indicating whether the window is minimized without altering its state.
</div>

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


<div class="meta-api-description">
How can I programmatically maximize a Kendo UI window to fill the entire browser viewport? Expand or enlarge the window or application interface to fill the entire browser viewport or screen area, maximize the display size programmatically, set the user interface to full-screen dimensions, automatically resize and reposition the window to cover the full visible area, enable window scaling to the maximum size allowed by the browser or user environment, trigger resize events upon expanding, configure or control window size to cover the entire viewing region, switch the window to full viewport coverage, adjust window dimensions to occupy all available screen space, and implement functionality to programmatically maximize or enlarge the interface for optimal visibility and user interaction.
</div>

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


<div class="meta-api-description">
How do I programmatically minimize a Kendo UI window? Control collapsing a window to just its title bar by programmatically minimizing or hiding the content area while keeping the window open and present in the interface without closing or destroying it. Enable minimizing, collapsing, or shrinking the window to a compact state that maintains visibility of the title bar, supports toggling between minimized and restored views, and allows scripts or users to reduce window size without removal from the DOM or complete closure. Configure window minimization behavior to programmatically conceal content sections for UX interface management and dynamic resizing.
</div>

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


<div class="meta-api-description">
How can I bring a Kendo UI window to the front of the stacking order using jQuery? Open a new window or component and ensure it is displayed above all other open windows by bringing it to the front of the stacking order, effectively controlling window layering, focus, and z-index placement. This method enables setting a window on top, prioritizing visibility, managing multiple open instances by elevating a specific window, and making sure it appears in the foreground regardless of other overlapping windows or UI elements. It supports use cases such as programmatically activating, focusing, or highlighting a window so that it reliably overlays other interface components or dialogs, controlling which window the user sees prominently.
</div>

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


<div class="meta-api-description">
How to keep the window pinned on screen when scrolling in Kendo UI for jQuery? Configure the interface element to remain fixed and visible on the screen regardless of page scrolling, enabling developers to lock the component’s position using methods that apply fixed positioning in CSS while preserving its current coordinates. This feature supports scenarios where the window or panel must stay static and accessible during scroll events, and it also maintains user interactivity through dragging or keyboard navigation without shifting with other content. Enable, set, or control persistent overlay behavior for UI components to keep them pinned, anchored, or locked to the viewport during dynamic page movement, ensuring stable display even as users scroll or navigate.
</div>

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

Refreshes the content of a Window from a remote URL or from the initially defined [content template](/api/javascript/ui/window/configuration/content#contenttemplate).

> Passing `data` and non-`GET` requests cannot be sent to an `iframe` as they require a form with a `target` attribute.


<div class="meta-api-description">
How do I programmatically refresh the content of a Kendo UI window? Reload, refresh, update, or re-render the window content to fetch the latest HTML or dynamically reload templates, enable remote content fetching from specified URLs, trigger full or partial content updates, control iframe content refresh, handle reloading web views or components, support refreshing page sections without full reloads, manage asynchronous content updates, and implement manual or programmatic content reloads.
</div>

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

    <button onclick="refreshContent()">Refresh</button>
    <div id="dialog"></div>

    <script>
      $("#dialog").kendoWindow();
      var dialog = $("#dialog").data("kendoWindow");

      dialog.refresh({
        url: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent1.html"       
      });

      function refreshContent(){
        dialog.refresh({
          url: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html",    
        }).open();
      }
    </script>

### restore

Restores a maximized or minimized Window to its previous state. Triggers the `resize` and `restore` events.


<div class="meta-api-description">
How do I restore a Kendo UI window to its original size and location in jQuery? Revert a window or application interface from a maximized or minimized state back to its original size and location, enabling restoration of previous dimensions and position programmatically, undoing full-screen or compact views, resetting window layout after resizing or minimizing, and triggering events to handle layout changes or UI updates. This functionality supports controlling window state transitions, managing user interface resizing, enabling normal interactions after window state changes, and restoring default window appearance and behavior dynamically during runtime.
</div>

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


<div class="meta-api-description">
How can I dynamically change the appearance of a Kendo UI window after it's been initialized? Modify or update the runtime settings of a window-like component to dynamically configure its appearance, behavior, position, size, and content without full reinitialization; control visual themes, layout adjustments, enable or disable features, change URLs for embedded content requiring reload or refresh commands, and adjust window state only when it is in a normal, non-maximized or non-minimized mode; relevant for scenarios requiring on-the-fly UI changes, content swapping, resizing, repositioning, or interactive window configuration in applications.
</div>

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


<div class="meta-api-description">
How do I update the title of a Kendo UI window dynamically? Control, update, or retrieve the text displayed as the window’s title or caption dynamically during runtime, enabling setting a new title string or fetching the current title value. Configure the window label, adjust the header text, rename the window programmatically, access or modify the displayed title bar content, and chain calls for fluent interface patterns when changing the window’s name or caption in your application.
</div>

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


<div class="meta-api-description">
How to bring a Kendo UI window to the front of other overlapping windows? Control and manage the stacking order of window elements by programmatically bringing a window or dialog to the forefront, ensuring it appears above other overlapping windows or UI components. This functionality enables developers to set focus, adjust z-index layering, resolve conflicts in overlapping interfaces, prioritize modal dialogs, and dynamically reorder window instances for optimal visibility and user interaction. Common use cases include automatically elevating windows on open, adjusting window focus on user action, managing modal overlays, and controlling the display hierarchy in complex multi-window environments. This method supports configuring, layering, elevating, and prioritizing windows to appear prominently regardless of other open instances or z-index issues.
</div>

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


<div class="meta-api-description">
How do I programmatically maximize and restore my Kendo UI window? Toggle a window’s state between maximized and restored modes, enabling programmatic control to maximize, restore, or switch window size dynamically; useful for integrating with UI buttons, resizing workflows, layout recalculations, and triggering resize events so content or components can adjust automatically when window size changes or toggles between full screen and normal view.
</div>

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


<div class="meta-api-description">
How do I make my Kendo UI window scroll with page content again? Control the scrolling behavior by releasing or disabling a fixed or locked window position so the component scrolls naturally with the page content, allowing you to toggle or switch from pinned, sticky, or fixed states back into normal flow, enabling the window to move in sync with other elements during page scroll, unfixing, unlocking, or detaching the window’s anchored position to restore standard scrolling behavior.
</div>

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


<div class="meta-api-description">
When does Kendo UI window activate event occur after opening? Respond to the moment when a window or modal fully opens, including after any opening animations or transitions, to execute actions like setting focus on input fields, initiating data fetching, triggering interface updates, running code after the window becomes active and interactive, controlling behavior once the window is fully displayed, and handling events that indicate the UI is ready for user interaction or further processing immediately after opening.
</div>

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


<div class="meta-api-description">
How do I detect when a Kendo UI window is closing so I can save its state? Detect or listen for window closure events triggered by user action or programmatic commands to perform cleanup tasks, save application state, update interfaces, synchronize components, execute teardown routines, manage resource disposal, handle closing events, run finalization code, or trigger data persistence when the window is closing or closed.
</div>

#### Event Data

##### e.userTriggered `Boolean`

Indicates whether the close action was triggered by the user either by clicking the **Close** button or by pressing `Esc`. When the `close` method was called, this field is `false`.

##### e.preventDefault `Function`

If invoked prevents the Window from closing.

#### Example - subscribing to the close event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      close: function(e) {
        // the closing animation is about to start
      }
    });
    </script>

#### Example - subscribing to the close event after initialization

    <div id="dialog"></div>
    <script>
    function window_close(e) {
      // the closing animation is about to start
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("close", window_close);
    </script>

### deactivate

Triggered when a Window has finished its closing animation.


<div class="meta-api-description">
When is the best time to remove event listeners after closing a Kendo UI window? Detect when a window or modal has fully finished closing or hiding animations to run cleanup tasks, remove elements from the DOM, detach event listeners or handlers, reset focus to previous elements, update UI or application states, trigger subsequent navigation, or launch new windows and dialogs only after the visual close transition completes. Listen for the completion of close or hide animations to ensure actions happen precisely after the window is no longer visible or active, enabling controlled teardown, resource release, and state management when closing interfaces or dialogs have finished their exit effects.
</div>

#### Example - subscribing to the deactivate event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      deactivate: function() {
        // the closing animation has finished
      }
    });
    </script>

#### Example - subscribing to the deactivate event after initialization

    <div id="dialog"></div>
    <script>
    function window_deactivate() {
      // the closing animation has finished
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("deactivate", window_deactivate);
    </script>

### dragend

Triggered when a Window has been moved by the user.


<div class="meta-api-description">
How to handle the dragend event in Kendo UI for jQuery Window component? Detect when a user completes dragging a window to trigger actions after moving, such as capturing final positions, saving layout changes, updating interface elements, handling drag completion events, running post-drag cleanup, responding to window move finishes, or executing logic after dragging ends, enabling developers to monitor, control, and respond to user interactions with draggable windows and their end coordinates.
</div>

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


<div class="meta-api-description">
How do I detect when a Kendo UI window is being dragged? Detect initiation of window dragging actions to execute custom scripts or logic when the user starts moving the application window, enabling event handlers to track drag start events, capture the exact moment dragging begins, configure UI updates or initiate position monitoring, respond to window move gestures, and control behavior at the onset of drag operations for dynamic interface adjustments or state changes.
</div>

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


<div class="meta-api-description">
How to handle content load failures in Kendo UI window components? Capture and respond to content load failures within window components by detecting error events triggered during Ajax content requests. Enable interception of load errors to implement custom error handling, display fallback interfaces, execute retries on failed loads, log diagnostic information for troubleshooting, or halt subsequent operations to prevent cascading issues. Control and monitor asynchronous content loading failures to improve user experience, enhance fault tolerance, and manage error workflows in client-side window-based interfaces.
</div>

#### Event Data

##### e.xhr `jqXHR`

The XHR request object as returned from [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).

##### e.status `String`

The status of the request as returned from [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).

#### Example - subscribing to the error event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      error: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Request failed with status " + e.status)
      }
    });
    </script>

#### Example - subscribing to the error event after initialization

    <div id="dialog"></div>
    <script>
    function window_error(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Request failed with status " + e.status)
    }
    $("#dialog").kendoWindow();
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("error", window_error);
    </script>

### maximize

Triggered when the user maximizes the Window. Introduced in 2016.Q1.SP1.


<div class="meta-api-description">
How do I detect when a window is maximized in Kendo UI for jQuery? Detect when a window is expanded to full screen or maximized to trigger layout adjustments, update user interface elements, save or restore window size and position, handle state persistence on window maximize actions, respond programmatically to the window entering maximized mode, execute custom code upon maximizing, listen for window size change events related to maximizing, configure event handlers that react to window maximize triggers, and enable dynamic UI or application behavior changes when the window expands to maximize state.
</div>

#### Example - subscribing to the maximize event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: ["Maximize"],
      maximize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Window was maximized")
      }
    });
    </script>

#### Example - subscribing to the maximize event after initialization

    <div id="dialog"></div>
    <script>
    function window_maximize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Window was maximized")
    }
    $("#dialog").kendoWindow({ actions: ["Maximize"] });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("maximize", window_maximize);
    </script>

### minimize

Triggered when the user minimizes the Window. Introduced in 2016.Q1.SP1.


<div class="meta-api-description">
What event is triggered when my Kendo UI window is minimized? Detect when the application window is minimized to trigger actions such as pausing timers, stopping or suspending background polling, saving user data or application state, updating interface components, adjusting layouts, or handling system resource optimization when the window is not visible. Listen for window minimize events to control app behavior, manage performance during window minimization, respond to user minimizing the window, and implement custom logic for when the app is sent to the background or minimized.
</div>

#### Example - subscribing to the minimize event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoWindow({
      actions: ["Minimize"],
      minimize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Window was minimized")
      }
    });
    </script>

#### Example - subscribing to the minimize event after initialization

    <div id="dialog"></div>
    <script>
    function window_minimize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Window was minimized")
    }
    $("#dialog").kendoWindow({ actions: ["Minimize"] });
    var dialog = $("#dialog").data("kendoWindow");
    dialog.bind("minimize", window_minimize);
    </script>

### open

Triggered when a Window is opened, that is, when the `open()` method is called.


<div class="meta-api-description">
What triggers when a window is opened in Kendo UI for jQuery? Trigger actions or run custom code when a window or modal is displayed, such as initializing data, setting focus, starting animations, logging user interactions, or performing setups right as the window becomes visible. Detect and respond to the exact moment a popup, dialog, or window is opened through event listeners, handlers, or callbacks tied to the component’s open lifecycle. Enable behaviors that automatically execute when opening UI elements, including refreshing content, adjusting interface state, or capturing analytics events triggered by window visibility changes and open method invocations.
</div>

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


<div class="meta-api-description">
What event is triggered when a Kendo UI window finishes loading content? Detect when a window or iframe finishes loading content, including Ajax updates or user-triggered refresh actions, to trigger code execution immediately after load completion; leverage this event to update user interface elements, rebind or refresh data sources, reinitialize JavaScript plugins or widgets, and perform DOM manipulations or post-load adjustments whenever the window’s content is dynamically or statically refreshed, ensuring seamless UI updates and responsive behavior after data or page changes within the window context.
</div>

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


<div class="meta-api-description">
How do I detect when a user resizes the browser window using Kendo UI for jQuery? Detect changes in the browser window size by handling events triggered when users resize or adjust the viewport, enabling dynamic resizing, responsive layout updates, repositioning elements, refreshing measurements, adapting UI components, and controlling interface reflow during window dimension changes. Capture resize events, listen for viewport size changes, trigger functions on window adjustments, and respond to screen resizing to maintain fluid layouts, adapt content to new dimensions, and ensure responsiveness across devices.
</div>

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

### restore

Triggered when the Window is restored to its previous state(maximized or minimized) by pressing the restore button, or when the [`restore()`](/api/javascript/ui/window/methods/restore) method is called.


<div class="meta-api-description">
How can I detect when a Kendo UI window is restored after being minimized? Detect and respond to when a window or interface returns from a minimized, maximized, or altered state by configuring events or handlers that trigger upon restoration or state change, enabling developers to run code to update layouts, reset focus, refresh UI elements, or perform actions after the window is reopened, restored, or its display state is reverted either through user interaction like clicking a restore button or programmatic calls to restore functions.
</div>

#### Example - subscribing to the restore event during initialization

    <div id="dialog"></div>

    <script>
      $("#dialog").kendoWindow({
        restore: function() {
          // the Window is back to its previous state
        }
      });
    </script>

#### Example - subscribing to the restore event after initialization

    <div id="dialog"></div>

    <script>
      function window_restore() {
        // the Window is back to its previous state
      }

      var dialog = $("#dialog").kendoWindow().getKendoWindow();

      dialog.bind("restore", window_restore);
    </script>
