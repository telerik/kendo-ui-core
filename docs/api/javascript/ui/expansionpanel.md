---
title: ExpansionPanel
page_title: Configuration, methods and events of the Kendo UI ExpansionPanel
description: Code examples and tips how to configure ExpansionPanel widget, use available methods and events.
res_type: api
component: expansionpanel
---

# kendo.ui.ExpansionPanel

Represents the Kendo UI ExpansionPanel widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object|Boolean`

A collection of visual animations used when **ExpansionPanel** is expand or collapsed through
user interactions. Setting this option to `false` will disable all animations.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
Control the expand and collapse transitions of a panel by configuring or customizing the animation effects applied during user interaction, including enabling smooth opening and closing motions, disabling animations entirely to prevent visual effects, setting custom animation objects to define how the panel expands or collapses, adjusting transition behaviors for better user experience or performance, managing animation timing and styles for dynamic content display, and toggling motion effects on interactive panels to match design preferences or accessibility needs.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                // fade-out closing items over 1000 milliseconds
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                },
               // fade-in and expand opening items over 500 milliseconds
               expand: {
                   duration: 500,
                   effects: "expandVertical fadeIn"
               }
           }
        });
    </script>

### animation.collapse `Object`

The visual animation(s) that will be used when **ExpansionPanel** items are closed.


<div class="meta-api-description">
Configure and customize the closing animation or transition effects for expandable panels, including setting motion style, animation speed, easing curves, and collapse behavior to control how content contracts or hides when toggled off. Adjust collapse animations to enhance user experience by fine-tuning visual feedback, timing, and smoothness of the panel closing, enabling developers to set or override default shrink, fade, slide, or other collapse effects during component setup or runtime. This covers scenarios like enabling smooth transitions on panel close, controlling animation duration and easing patterns for collapse states, and specifying how expandable sections visually retract or disappear when minimized or hidden.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                collapse: {
                    duration: 200,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.collapse.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when a **ExpansionPanel** item is closed.


<div class="meta-api-description">
Adjust or configure the time interval, length, or speed for collapsing or closing animations in expandable panels, setting animation duration in milliseconds to control how quickly the panel contracts, fold-ups, or visually retracts, enabling customization of transition speed, smoothness, timing, and animation effects for user interface elements collapsing or closing actions.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
               collapse: {
                    duration: 1000
               }
          }
        });
    </script>

### animation.collapse.effects `String`

A whitespace-delimited string of animation effects that are utilized when a **ExpansionPanel** item
is closed. Available options are **"fadeOut"** and **"zoomOut"**.


<div class="meta-api-description">
Configure and customize the closing animations for expandable panels by specifying one or multiple animation effects such as fade out, zoom out, or combinations thereof to enhance or control the visual transition when collapsing or closing sections. Enable smooth or dynamic collapse transitions, adjust or set the visual feedback during panel contraction, and combine animation styles to tailor collapse behavior with fade and zoom effects for interactive user interface elements that expand and collapse content areas.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                collapse: {
                    duration: 1000,
                    effects: "fadeOut"
                }
            }
        });
    </script>

### animation.expand `Object`

The visual animation(s) that will be used when opening items.


<div class="meta-api-description">
Configure and customize the open transition animation for expandable panel items by setting animations that control how sections unfold or expand, enabling smooth, timed, or styled visual effects during item expansion or reveal. Adjust expand animations to manage the transition effects, timing, easing functions, or visual behavior when toggling open states, allowing developers to define or override the expand motion for collapsible content areas to achieve specific unfolding animations, smooth expanding panels, or animated disclosure transitions.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                expand: {
                    duration: 200,
                    effects: "expandVertical"
                }
            }
        });
    </script>

### animation.expand.duration `Number`*(default: 200)*

The number of milliseconds used for the visual animation when an item is opened.


<div class="meta-api-description">
Control and customize the speed or timing of the expand animation for collapsible items, panels, or sections by setting the duration in milliseconds to make the opening transition faster or slower; configure how long the expansion effect takes when content reveals, adjust animation timing for expand actions, modify the animation length to enhance user experience during panel openings, and set precise timing for expand transitions in expandable UI components.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
         animation: {
              expand: {
                  duration: 1000
              }
           }
        });
    </script>

### animation.expand.effects `String`*(default: "expandVertical")*

A whitespace-delimited string of animation effects that are used when an item is expanded. Available options are
**"expandVertical"**, **"zoomIn"** and **"fadeIn"**.


<div class="meta-api-description">
Control, customize, or configure how expandable panel sections animate when opening by setting one or more animation effects such as vertical expansion, zooming in, or fading in; combine multiple animation types in a space-separated list to create layered, smooth visual transitions for panels, collapsible items, or expandable content areas that respond to user interactions with fluid motion effects enhancing user interface dynamics and visual feedback.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            animation: {
                expand: {
                    effects: "expandVertical"
                }
            }
        });
    </script>

### collapseIconClass `String` *(default: "chevron-up")*

The name of the collapse icon.


<div class="meta-api-description">
Customize or configure the icon or CSS class displayed when a collapsible panel or accordion section is closed or minimized, including setting specific icon identifiers, class names, or visual markers for the collapsed state to control appearance, style, and behavior of collapse toggles, folding indicators, or closed-panel icons in UI components such as expansion panels or accordions.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
      $("#expansionPanel").kendoExpansionPanel({
        collapseIconClass: "minus"
      });
    </script>

### disabled `Boolean` *(default: false)*

If set to true the widget will be disabled.


<div class="meta-api-description">
Control whether the panel is non-interactive, preventing users from expanding, collapsing, toggling, or interacting with it in any way by enabling or disabling user input and interaction dynamically or at setup; configure to make the component ignore clicks, taps, or keyboard events, effectively locking its current state and disabling state changes or user-triggered expansions.
</div>

#### Example - disable the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            disabled: true
        });
    </script>

### expanded `Boolean` *(default: false)*

If set to true the widget will be expanded by default.


<div class="meta-api-description">
Control the initial visibility or open state of collapsible content panels by configuring whether sections start expanded or collapsed, including options to preset panels as opened or closed when rendering interfaces, managing default expanded state for accordion or toggle components, enabling panels to load in an expanded mode for immediate content access, setting state to control user interface expansion behavior on initialization, and adjusting whether expandable areas are shown or hidden upon first display.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        });
    </script>

### expandIconClass `String` *(default: "chevron-down")*

The class of the expand icon.


<div class="meta-api-description">
Control and customize the expand or collapse icon's appearance by specifying a CSS class or icon font such as Font Awesome or Kendo icons, enabling developers to set, override, or style the indicator used in expandable panels or sections; adjust the expandIconClass to configure icon visuals, change expand/collapse indicators, apply custom icon styling, or integrate third-party icon libraries for precise control over the toggling arrow or symbol in expansion components.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
      $("#expansionPanel").kendoExpansionPanel({
        expandIconClass: "plus"
      });
    </script>

### height `Number|String`

The height of the widget. Numeric values are treated as pixels.


<div class="meta-api-description">
Control and configure the vertical dimension, fixed size, or height of expandable panels to maintain consistent layout and uniform spacing while managing overflow, scrolling behavior, and content fitting within collapsible or expandable UI sections. Adjust panel dimension, size, or vertical height precisely in pixels to enforce standard vertical space, set scrollable areas, or control how expanded content affects overall interface layout and alignment across multiple expandable or accordion-style components.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            height: 300
        });
    </script>

### subTitle `String` *(default: null)*

The subtitle of the widget.


<div class="meta-api-description">
Provide or configure the secondary text or descriptive subtitle displayed underneath the main header or title within an expandable panel or collapsible section to offer additional context, details, explanations, or clarifications, enabling control over the supplementary header information shown beneath the primary label, allowing developers to set, customize, or update the subtitle content as a string for clearer UI hierarchy or user guidance in expandable lists, accordions, or panel components.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            subTitle: "Lorem ipsum"
        });
    </script>

### title `String` *(default: null)*

The title of the widget.


<div class="meta-api-description">
Set or update the header text or label displayed on an expandable panel’s top section, configure the panel’s title caption to identify the content area, customize, modify, or dynamically change the visible header name or text for expanding and collapsing sections, control what text appears in the panel heading to clarify or describe the panel’s purpose or contents, define or adjust the expandable header label during initialization or runtime to improve UI clarity and navigation.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            title: "Lorem ipsum"
        });
    </script>

### toggleable `Boolean` *(default: true)*

If set to false the user will not be able to expand/collapse the widget.


<div class="meta-api-description">
Control whether the panel can be expanded or collapsed by enabling or disabling user interaction to expand, collapse, open, close, toggle, or switch the visibility of the content area; configure interactive expand/collapse behavior, user toggling capability, or fixed expanded state, and set if the panel should respond to clicks or remain static without allowing manual expansion or contraction.
</div>

#### Example

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            expanded: true,
            toggleable: false
        });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
Invoke the method to clean up and fully dispose of an expandable panel component before its DOM element is removed, ensuring all event listeners are detached, data attributes cleared, and any nested child widget instances are recursively destroyed to prevent memory leaks and resource retention. This cleanup process unbinds handlers, disposes internal references, and cascades destruction through child components but does not itself remove the element from the document structure, making it essential for safely preparing dynamic UI elements for removal or reinitialization while managing lifecycle and memory concerns in complex client-side applications.
</div>

#### Example - destroy  the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        var widget = $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        }).data('kendoExpansionPanel');

        widget.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
Activate or deactivate interactive behavior for expandable UI sections by programmatically toggling responsiveness to user clicks or taps, controlling whether expansion panels or collapsible elements accept input, respond to expand or collapse gestures, or block user interaction dynamically; set or configure the enabled state to manage accessibility, prevent toggling when disabled, and control interface flow by allowing or restricting panel expansion on demand.
</div>

#### Parameters

##### enable `Boolean`

If `true`, the widget will be enabled. If `false`, the widget will be disabled.

#### Example - disable the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        var widget = $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        }).data('kendoExpansionPanel');

        widget.enable(false);
    </script>

### toggle

Toggles the widget. Both `expand` and `animation` parameters are optional.


<div class="meta-api-description">
Control the expansion panel’s state by programmatically switching it open or closed, enabling toggling to expand, collapse, or explicitly set the panel’s visibility with true or false flags, optionally managing whether the transition uses animation or disables it for instant state changes, all useful for dynamically configuring, automating, or responding to user interactions with expandable UI components after initialization.
</div>

#### Parameters

##### expand `Boolean`

If `true`, the widget will be expanded. If `false`, the widget will be collapsed.

##### animation `Boolean`

If `false`, the widget will be toggled without animations.

#### Example - disable the widget

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <script>
        var widget = $("#expansionPanel").kendoExpansionPanel({
            expanded: true
        }).data('kendoExpansionPanel');

        widget.toggle();
    </script>

## Events

### expand

Fired when the widget is expanded.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when an expandable panel or accordion section is opened by capturing the expansion event to trigger custom actions, execute callbacks on expansion, update or modify the user interface dynamically, load or reveal additional content, respond to toggle or open interactions, bind event handlers to expansion state changes, control UI behavior on revealing hidden sections, and manage state transitions when panels become active or expanded, ensuring the event context is tied to the component instance for seamless integration and logic execution.
</div>

#### Example - subscribe to the "expand" event during initialization

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            title: "Lorem ipsum",
          	expand: function(e) {
              /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("expand has been fired");
            }
        });
    </script>

#### Example - subscribe to the "expand" event after initialization

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <script>
      $("#expansionPanel").kendoExpansionPanel({
        title: "Lorem ipsum"
      });

      var expansionPanel = $("#expansionPanel").data("kendoExpansionPanel");
      expansionPanel.bind("expand", expansionPanelExpand);

      function expansionPanelExpand() {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("expand has been fired");
      }
    </script>

### collapse

Fired when the widget is collapsed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a collapsible panel or accordion section closes to trigger actions like running code, updating interface elements, saving UI state, toggling visibility, handling animations on collapse, or reacting to user interactions closing expandable content. Listen for events indicating the panel or section has contracted or folded up, so you can execute callbacks, refresh data, adjust layout, or synchronize component state seamlessly when a previously expanded area is closed by user input or programmatic commands.
</div>

#### Example - subscribe to the "collapse" event during initialization

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            title: "Lorem ipsum",
          	collapse: function(e) {
              /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("collapse has been fired");
            }
        });
    </script>

#### Example - subscribe to the "collapse" event after initialization

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <script>
      $("#expansionPanel").kendoExpansionPanel({
        title: "Lorem ipsum"
      });

      var expansionPanel = $("#expansionPanel").data("kendoExpansionPanel");
      expansionPanel.bind("collapse", expansionPanelCollapse);

      function expansionPanelCollapse() {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("collapse has been fired");
      }
    </script>

### complete

Fired when the animation during collapse/expand is completed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when collapse or expand animations on panels finish to trigger actions like running code after the animation completes, executing post-animation logic such as focusing UI elements, updating application state, loading dynamic content once expansion or collapse is fully done, handling events triggered at the end of panel animations, responding to the completion of toggle animations, managing state changes after panels expand or collapse, firing callbacks once transition effects finish, synchronizing UI updates with animation end, and controlling behavior tied to the expansion panel’s fully completed open or close transitions.
</div>

#### Example - subscribe to the "complete" event during initialization

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <script>
        $("#expansionPanel").kendoExpansionPanel({
            title: "Lorem ipsum",
          	complete: function(e) {
              /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("complete has been fired");
            }
        });
    </script>

#### Example - subscribe to the "complete" event after initialization

    <div id="expansionPanel">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <script>
      $("#expansionPanel").kendoExpansionPanel({
        title: "Lorem ipsum"
      });

      var expansionPanel = $("#expansionPanel").data("kendoExpansionPanel");
      expansionPanel.bind("complete", expansionPanelComplete);

      function expansionPanelComplete() {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("complete has been fired");
      }
    </script>
