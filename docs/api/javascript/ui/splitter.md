---
title: Splitter
page_title: Configuration, methods and events of Kendo UI Splitter
description: Step by step guide and code examples for successful configuration of Splitter UI widget, supported methods and events types.
res_type: api
component: splitter
---

# kendo.ui.Splitter

Represents the Kendo UI Splitter widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### clickMoveClick `Boolean` *(default: true)*

Determines whether the click move click interaction would be enabled as an alternative of the drag and drop resizing of the Splitter. By default the alternative is enabled.


<div class="meta-api-description">
Enable or configure quick resizing of splitter panes using a click-move-click interaction instead of traditional drag-and-drop, allowing users to click a handle, move the pointer to adjust size, and click again to confirm the new pane dimensions; control this alternative pane resizing method for more precise or accessible splitter adjustments by toggling activation of click-based resizing gestures and customizing user input handling for dynamic layout changes.
</div>

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      clickMoveClick: false
    });
    </script>

### orientation `String` *(default: "horizontal")*

Specifies the orientation of the widget. Supported values are *"horizontal"* and *"vertical"*.


<div class="meta-api-description">
Adjust the layout direction and arrangement of resizable panes by configuring whether content is split horizontally side-by-side or vertically stacked, enabling control over pane positioning, resizing behavior, and user interface flow. This setting lets developers specify orientation to organize multiple sections either in a row or column format, tailoring layouts for side-by-side panels or top-to-bottom stacking, adapting panel distribution and resizing dynamics to fit diverse UI designs and user interaction models.
</div>

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


<div class="meta-api-description">
Set and adjust multiple panel configurations within a split layout by defining properties like initial dimensions, minimum and maximum size limits, whether panels can be resized or collapsed, scrolling behavior inside each pane, and the sequence or order of panels. Control panel arrangement, enable or disable resizing handles, specify collapsible toggles, restrict size range, manage scrollable content areas, and configure layout sections to create flexible, customizable multi-pane interfaces that respond dynamically to user interactions or application needs.
</div>

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
      <div>Pane C</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [
        { size: "30%" },
        { size: "40%" },
        { size: "30%" }
      ]
    });
    </script>

### panes.collapsed `Boolean` *(default: false)*

Specifies whether a pane is initially collapsed (**true**) or expanded (**false**).


<div class="meta-api-description">
Control or configure the initial visibility, expanded or collapsed state, default open or hidden status, or startup layout of a resizable pane within a splitter or multi-panel interface, enabling developers to set whether a pane’s content is shown or concealed on load, determine if a particular section begins minimized or fully visible at initialization, adjust startup pane display settings, or manage the default pane collapse/expand behavior for optimal UI layout and user experience.
</div>

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


<div class="meta-api-description">
Adjust the size of a collapsible panel when minimized to specify its width or height using pixel or percentage values, enabling control over responsive layouts, panel expansion, and contraction dimensions. Configure how narrow or compact a pane becomes when collapsed, manage layout behavior for split views, customize the minimal visible area of sidebars or resizable sections, and set bounds that respect maximum and minimum limits. Control collapsed panel dimensions for dynamic, adaptive user interfaces, ensuring consistent visual styles and resizing constraints in splitters or multi-pane components.
</div>

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


<div class="meta-api-description">
Enable or disable the ability to collapse and expand individual sections or panels within a user interface layout, allowing users to hide or show content areas dynamically; configure collapsible regions for adjustable or fixed visibility, control whether panes or panels can be minimized or restored interactively, set options to allow toggling panel display on and off, manage user-driven collapsing behavior for flexible UI arrangements, and determine if specific segments can be hidden or locked in place during runtime or initialization.
</div>

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


<div class="meta-api-description">
Configure dynamic loading of external HTML content into individual Splitter panes by specifying a URL from which pane content is fetched and rendered on initialization, enabling remote resource binding, loading server-side HTML endpoints, embedding external web content into layout panes, setting pane source URLs for asynchronous HTML retrieval, and integrating live or static remote HTML data into resizable interface sections.
</div>

#### Example

    <base href="https://demos.telerik.com/kendo-ui/panelbar/ajax" />
    <div id="splitter">
      <div>Pane A</div>
      <div></div>
    </div>
    <script>
      $("#splitter").kendoSplitter({
        panes: [
          {},
          { contentUrl: "../content/web/panelbar/ajax/ajaxContent1.html" },
        ],
      });
    </script>

### panes.label `String`

The label of the current pane. Will be used as a `aria-label` for the Splitter `separator` that has the pane as its primary one (the separator that is immediately after the pane).


<div class="meta-api-description">
Set or customize accessible labels for individual panes within a splitter interface to enhance screen reader support and improve navigation for users relying on assistive technologies by specifying descriptive text applied as ARIA labels on the separators adjacent to each pane. Enable or control semantic identification of splitter regions by assigning clear, meaningful accessibility labels to organize content sections, making it easier to distinguish and interact with resizable areas through keyboard navigation and screen-reader announcements. Configure pane labels to facilitate better user experience in layouts with multiple adjustable panels, ensuring each segment is clearly identified and described for accessibility tools.
</div>

#### Example

    <base href="https://demos.telerik.com/kendo-ui/panelbar/ajax" />
    <div id="splitter">
      <div>Pane A</div>
      <div></div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ {
        label: "Label A"
      }, {
        contentUrl: "../content/web/panelbar/ajax/ajaxContent1.html",
        label: "Label from URL"
      } ]
    });
    </script>

### panes.labelId `String`

The ID of the element that should be used as a label of the current pane. Will be used as a value of the `aria-labelledby` attribute for the Splitter `separator` that has the pane as its primary one (the separator that is immediately after the pane).


<div class="meta-api-description">
Set or configure an accessible label reference for a pane by specifying the ID of an element that describes or names the pane, enabling screen readers and assistive technologies to identify the pane label correctly; use this to link a pane with a descriptive label element through properties like aria-labelledby, improve pane accessibility, assign custom label elements for split view or resizable pane interfaces, control how panes announce their labels to accessibility tools, and support accessibility compliance by connecting UI pane separators with their corresponding labels or descriptions.
</div>

#### Example

    <div id="splitter">
      <div>
        <h5 id="ha">Title A</h5>
        Pane A
      </div>
      <div>
        <h5 id="hb">Title B</h5>
        Pane B
      </div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ {
        labelId: "ha"
      }, {
        labelId: "hb"
      } ]
    });
    </script>

### panes.max `String`

Specifies the maximum size of a pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%"). The
size of a resized pane cannot exceed the defined maximum size.


<div class="meta-api-description">
Control and limit the maximum size of a resizable pane within a splitter layout to restrict how large the pane can grow when users drag or resize it, using fixed pixel values or relative percentages to set a hard upper boundary on pane expansion, ensuring layouts remain constrained, preventing panes from exceeding defined width or height limits during interactive resizing, configuring maximum dimensions for adjustable panels to maintain consistent UI proportions and prevent overflow or excessive growth in split views.
</div>

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


<div class="meta-api-description">
Set or enforce the smallest allowable width or height for resizable panels or sections within a layout to prevent them from shrinking below a specific pixel value or percentage during user-driven resizing, ensuring that panes or components maintain usability and visibility by configuring minimum size constraints, limits, or thresholds that control how small a pane can become when dragged or adjusted in split views, multi-pane interfaces, or resizable containers.
</div>

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


<div class="meta-api-description">
Control whether individual splitter panes can be resized or fixed by enabling or disabling drag-based resizing functionality, allowing users to adjust pane widths or heights interactively or locking their size to prevent manual changes; this setting manages pane resizability options, supports configuring split views with adjustable or static sections, and is useful for defining flexible layouts where panes can be dynamically resized by dragging edges or remain fixed in size depending on user interface requirements.
</div>

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


<div class="meta-api-description">
Control or configure whether individual Splitter panes support internal scrolling or overflow scrolling behavior, enabling or disabling scrollbars within each pane to manage content that exceeds the visible area. Adjust pane scrollability settings to allow users to scroll content inside specific sections, set overflow behavior per pane during layout initialization, toggle scrolling on or off for dynamic content areas, and manage how content overflow is handled within resizable or split container regions. This setting helps define scroll-enabled panels, scrollable divisions, pane overflow control, and user interactions with pane content that may require vertical or horizontal scrolling.
</div>

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


<div class="meta-api-description">
Control and configure the dimensions of individual panels within a splitter layout by specifying exact widths or heights using pixel values like "200px" or relative sizes such as percentages like "50%." Adjust panel sizes dynamically while ensuring they stay within minimum and maximum constraints to accommodate responsive designs and viewport resizing. Set fixed or flexible pane dimensions, enable proportional resizing, customize layout distribution, and manage splitter pane widths or heights for precise UI layout control. Handle cases where one pane automatically adapts to remaining space, enforce size boundaries, and fine-tune the split view presentation for various screen sizes and user interactions.
</div>

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


<div class="meta-api-description">
Configure how to asynchronously load or refresh content in a specific pane by fetching HTML data from a local or remote server using AJAX calls, enabling dynamic updates, lazy loading, server-side rendered content injection, partial page refreshes, or real-time content replacement within a pane. Control fetching, updating, or replacing pane content with HTTP requests, and manage dynamic content retrieval or server communication for individual splitter sections to optimize user interface responsiveness and data-driven pane rendering.
</div>

#### Parameters

##### pane `String|Element|jQuery`

The targeted pane whose content is to be loaded via a URL.

##### url `String`

A local or remote URL from which the content of the pane is to be loaded.

##### data `Object | String`

Any data that is necessary to be sent to the server.

#### Example

    <base href="https://demos.telerik.com/kendo-ui/panelbar/ajax" />
    <div id="splitter">
      <div id="pane1">Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");

    // load a complete page in the last pane
    splitter.ajaxRequest(".k-pane:last", "../content/web/panelbar/ajax/ajaxContent1.html");

    // example of loading content into the pane with ID="pane1"
    //splitter.ajaxRequest("#pane1", "/customer/profile", { id: 42 });
    </script>

### append

Appends a new pane. The method returns the pane element, so it can be populated with arbitrary content, if `contentUrl` is not set.
Invoking this method will force the widget to redraw and it will trigger the `resize` event.


<div class="meta-api-description">
Add or insert a new pane dynamically to a resizable container, retrieve the pane element for direct manipulation or content injection, control or update layout and sizing by forcing redraw or triggering resize events, programmatically extend split views with custom or arbitrary content, append new sections or panels to multi-pane interfaces, manage pane addition without predefined content URLs, enable dynamic UI composition by adding panes on the fly, handle pane creation and immediate interactive customization, support runtime splitting and layout adjustments, and manipulate split container panes through methods that return references for flexible content insertion and layout refresh.
</div>

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


<div class="meta-api-description">
Control hiding or shrinking a specific pane within a multi-pane layout by programmatically collapsing it through a method call that adjusts pane visibility and layout dynamically, enabling developers to set, trigger, or enforce pane collapse states, force component redraws, manage layout reflows, and handle resizing behaviors without firing collapse-specific events, useful for responsive UI adjustments, automated pane management, or interactive user interface configurations where panes need to be programmatically shown or hidden on demand.
</div>

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


<div class="meta-api-description">
Clean up and safely remove event listeners, data attributes, and internal resources associated with a splitter UI component by invoking a destruction or teardown process that also cascades cleanup to nested child widgets; use this to disable, deactivate, or prepare the splitter for removal without deleting the DOM element itself, ensuring no memory leaks, detachment of all event handlers, and proper disposal of attached behaviors and embedded child components.
</div>

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


<div class="meta-api-description">
Programmatically control and trigger pane expansion within a splitter or resizable container by invoking a method to open, enlarge, or maximize a specific pane, enabling dynamic layout adjustment and forcing component redraws to refresh UI, triggering resize events that update layout-aware or responsive child elements, useful for developers needing to manage pane visibility, automate resizing workflows, or adjust split views on demand without relying on user interaction or standard expand event triggers.
</div>

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


<div class="meta-api-description">
Add or insert a new pane dynamically immediately following a specified existing pane in a splitter layout, enabling programmatic addition of content sections within resizable containers, with the ability to include custom HTML or DOM elements when external content URLs are not specified; this operation triggers layout updates, redraws the splitter interface, and fires resize events to ensure proper recalculation and adjustment of pane sizes, useful for developers looking to control splitter panels, manage dynamic pane insertion, update UI segments on the fly, or handle responsive layouts with custom embedded content after certain panes.
</div>

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


<div class="meta-api-description">
Add or insert a new pane or section before an existing pane in a splitter or resizable container, enabling dynamic insertion and layout adjustment, returning the inserted pane element for direct DOM manipulation or content population, supporting use cases to programmatically add panes before specified indexes or elements, automatically triggering redraws, resizing, and layout recalculations for responsive split views, and allowing developers to control pane insertion order and update the UI without reloads or separate refresh calls.
</div>

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


<div class="meta-api-description">
Control and limit the maximum size or dimension of a layout pane, setting upper boundaries for width or height to prevent a pane from expanding beyond a defined constraint. Adjust, configure, or restrict pane growth limits within split views or resizable containers without triggering redraws, layout recalculations, or event emissions. Manage pane sizing behavior programmatically to enforce maximum width or height restrictions in user interface split components, ensuring panes do not exceed specified maximum dimensions during resizing or dynamic layout changes.
</div>

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


<div class="meta-api-description">
configure or set the minimum size limit for resizable panes in a user interface, define or enforce the smallest allowable width or height for split sections or panels to prevent collapsing during drag or resize actions, programmatically control pane constraints to maintain minimum dimensions when users adjust separators or dividers, restrict resizing bounds to avoid panes becoming too small or unusable, adjust and lock the minimum pane size internally without triggering UI redraws or events to optimize performance during dynamic layout changes.
</div>

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


<div class="meta-api-description">
Remove or delete one or multiple panels or sections from a split container or resizable layout dynamically during runtime, enabling live modification of pane configurations and flexible UI adjustments. This functionality supports programmatically eliminating specified subdivisions within a splitter or multi-pane interface, automatically triggering redraws and resize events to update layout and invoke any resize or layout change handlers. Control, customize, or adjust visible areas by removing certain split regions, sections, or partitions on the fly, with capabilities to chain calls for batch removal and ensure seamless layout updates and event-driven UI responsiveness.
</div>

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

Get or set the size of the pane. Setting this value will cause the widget to redraw and it will trigger the `resize` event.

> Note: The correct usage of the method requires that the size of the panes should be set either through the [panes.size](/api/javascript/ui/splitter/configuration/panes#panes.size) property or the `size` method. Otherwise, the method will return *undefined*.


<div class="meta-api-description">
Determine, retrieve, modify, or adjust the width or height of a pane within a user interface splitter layout by obtaining the current dimensions or specifying new size values that dynamically update the pane’s measurements and cause automatic layout recalculation and resize event triggers. Manage pane widths and heights programmatically to control panel proportions, enforce specific size constraints, or respond to window resizing and user-driven adjustments. Use commands to get the existing size when no parameters are passed or to set new size values explicitly, ensuring consistent pane sizing behavior across different views and interactive elements. Queries related to reading pane dimensions, updating panel width or height, resizing layout sections, or synchronizing pane sizes with other UI components all correspond to this method's behavior.
</div>

#### Parameters

##### pane `String|Element|jQuery`

The pane to be resized.

##### value `String` *(optional)*

The new size of the pane defined as pixels (i.e. "200px") or as a percentage (i.e. "50%").
Note: This value must not exceed **panes.max** or be less then **panes.min**.

#### Returns

`Object` the pane size.

#### Example

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter();
    var splitter = $("#splitter").data("kendoSplitter");
    var size = splitter.size(".k-pane:first");
    </script>

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


<div class="meta-api-description">
Control pane visibility and layout by programmatically switching a specified splitter pane between collapsed and expanded states using methods to enable, trigger, or toggle the pane’s open or closed condition. Adjust and modify the splitter layout dynamically, configure pane expansion and collapse through commands, activate or deactivate splitter sections, force component redraws, refresh layout views, and handle resizing behavior without triggering separate collapse or expand events, supporting use cases like responsive design, dynamic interface adjustments, and interactive user controls for pane management.
</div>

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


<div class="meta-api-description">
Detect and handle events triggered when a layout pane is collapsed, enabling developers to respond to pane collapse actions by adjusting adjacent pane sizes, updating user interface layouts, saving or persisting collapse state, triggering custom behaviors like loading or unloading content dynamically, synchronizing related components, and implementing conditional UI updates based on collapse interactions. This event detection and response mechanism supports managing pane visibility changes, reacting to user-driven or programmatic pane collapses, and executing related logic such as resizing, state persistence, content refresh, or layout rearrangement in split or resizable panel interfaces.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log($(e.pane).html() + " has been collapsed");
    }
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("collapse", splitter_collapse);
    </script>

### contentLoad

Triggered when the content for a pane has finished loading from a remote endpoint.


<div class="meta-api-description">
Detect or listen for when dynamic or remote pane content finishes loading or rendering in resizable or split view components, enabling updates to the user interface, initialization of scripts or event handlers on freshly loaded content, removal of loading spinners or placeholders, triggering post-load processes, refreshing or synchronizing adjacent panels, and executing custom logic after asynchronous content retrieval or injection into the pane DOM, relevant for managing split layout panes with asynchronous or remote data loading and ensuring smooth UI updates and behavior binding after content is fetched.
</div>

#### Event Data

##### e.pane `Element`

The pane whose content has been loaded.

#### Example - subscribe to the "contentLoad" event during initialization

    <base href="https://demos.telerik.com/kendo-ui/splitter/ajax"> 
    <div id="splitter">
      <div></div>
      <div></div>
    </div>

    <script>
      $(document).ready(function() {
        $("#splitter").kendoSplitter({
          panes: [
            { contentUrl: '../content/web/splitter/ajax/ajaxContent1.html' },
            { contentUrl: '../content/web/splitter/ajax/ajaxContent2.html' }
          ],
          contentLoad: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log($(e.pane).html() + " has been loaded");
          }
        });
      });
    </script> 

    <style>
      #splitter {
        height: 480px;
      }
    </style>

#### Example - subscribe to the "contentLoad" event after initialization

    <base href="https://demos.telerik.com/kendo-ui/splitter/ajax"> 
    <div id="splitter">
      <div></div>
      <div></div>
    </div>
    <script>
      function splitter_contentLoad(e) {
    /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log($(e.pane).html() + " has been loaded");
      }
      $("#splitter").kendoSplitter({
        panes: [
          { contentUrl: '../content/web/splitter/ajax/ajaxContent1.html' },
          { contentUrl: '../content/web/splitter/ajax/ajaxContent2.html' }
        ]
      });
      var splitter = $("#splitter").data("kendoSplitter");
      splitter.bind("contentLoad", splitter_contentLoad);
    </script>

### error

Triggered when the AJAX request that fetches a pane content has failed.


<div class="meta-api-description">
Capture and respond to loading failures when asynchronous requests to fetch pane content do not succeed, enabling detection of errors during dynamic content loading in split views or layouts. Handle scenarios like AJAX errors, failed network responses, timeouts, or server issues when loading panes or panels. Use this event to monitor pane loading problems, inspect error responses or status codes, display custom error messages or fallback UI, log failure details for debugging, and implement retry mechanisms or alternative recovery strategies during pane content fetching or split pane operations. This supports robust error handling, graceful degradation, and improved user experience in interfaces relying on dynamic pane loading and asynchronous data retrieval.
</div>

#### Event Data

##### e.xhr `jqXHR`

The XHR request object, as returned from [jQuery.ajax](https://api.jquery.com/jQuery.ajax/)

##### e.status `String`

The status of the request, as returned from [jQuery.ajax](https://api.jquery.com/jQuery.ajax/)

#### Example - subscribe to the "error" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      error: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Detect and handle pane expansion actions within a resizable panel or splitter layout by capturing events triggered when a section grows, unfolds, or opens. Use this signal to monitor expansion changes, execute custom logic upon a section enlarging, update interface layout and sizing dynamically, load or reveal hidden content in expanding areas, set input focus after a pane becomes visible, synchronize UI state with user interactions, or trigger follow-up processes tied to pane visibility changes. Enable responsive design adjustments and interactive behaviors associated with the opening, revealing, or expanding of interface segments in complex split views.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log($(e.pane).html() + " has been expanded");
    }
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true, collapsed: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("expand", splitter_expand);
    </script>

### layoutChange

**This event is now obsolete and will be removed in the future. Please use the [`resize`](/api/javascript/ui/splitter/events/resize) event instead.**

Fires when the splitter layout has changed


<div class="meta-api-description">
Detect when pane sizes or the arrangement of a multi-pane splitter interface changes due to user drag actions or programmatic resizing by listening for layout update events, enabling developers to respond to adjustments in pane dimensions or structure, synchronize or persist pane size states, trigger reflows or DOM updates, invoke component methods, handle dynamic layout shifts, manage resizing workflows, and coordinate content rendering or alignment after split view modifications; supports capturing changes in the splitter layout to enable adaptive UI behaviors, responsive adjustments, and consistent user experience during pane resizing, dragging, or layout reconfiguration scenarios.
</div>

#### Example - subscribe to the "layoutChange" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ],
      layoutChange: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


<div class="meta-api-description">
Detect, respond to, and manage dynamic changes in pane dimensions during interactive resizing actions by capturing events triggered when a user adjusts splitter panes. Enable custom behaviors such as updating layouts, recalculating child element sizes, persisting dimensions across sessions, enforcing minimum or maximum size constraints, or synchronizing UI components in response to pane resizing. Access detailed event data including resize context, new dimensions, and pane identifiers to implement tailored logic for adaptive interfaces, layout recalculations, real-time updates, or state persistence related to splitter pane size changes.
</div>

#### Example - subscribe to the "resize" event during initialization

    <div id="splitter">
      <div>Pane A</div>
      <div>Pane B</div>
    </div>
    <script>
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ],
      resize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
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
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Splitter pane has been resized");
    }
    $("#splitter").kendoSplitter({
      panes: [ { collapsible: true }, {} ]
    });
    var splitter = $("#splitter").data("kendoSplitter");
    splitter.bind("resize", splitter_resize);
    </script>
