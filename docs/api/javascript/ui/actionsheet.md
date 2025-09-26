---
title: ActionSheet
page_title: Configuration, methods and events of Kendo UI ActionSheet
description: How to initialize an ActionSheet UI widget, configure its properties and open it.
res_type: api
---

# kendo.ui.ActionSheet

Represents the Kendo UI ActionSheet widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actionButtons `Array`

A JavaScript array that contains the ActionSheet's action buttons configuration. They will be rendered in the footer of the widget.


<div class="meta-api-description">
Configure footer button actions by providing an array of button definitions that specify labels, icons, event handlers, and layout order for the ActionSheet’s bottom section. Enable customizing interactive buttons such as confirm, cancel, or custom commands with tailored callbacks and visual cues. Control how action buttons appear, respond to user clicks, and are arranged in the footer area, supporting use cases like enabling multiple actions, adding icons to buttons, handling clicks programmatically, and adjusting the sequence or visibility of controls at the bottom of a modal or popup interface. Adjust, add, or remove footer buttons dynamically to tailor user interaction flows and footer functionality within the ActionSheet component.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>


### actionButtons.click `Function`

Specifies the click event handler of the action button.


<div class="meta-api-description">
Configure handlers to execute custom functions or callbacks when users tap or press buttons within an ActionSheet interface, enabling dynamic responses such as navigating to different screens, updating application state or data, intercepting or overriding default click behaviors, or programmatically closing or dismissing the ActionSheet popup. This setting supports assigning event listeners or click callbacks for interactive buttons that capture user input, trigger side effects, or manage UI flow during button activation inside modal or overlay components. Developers often implement this to control button-driven logic, capture user choices, or link actions like confirmation, cancellation, or menu selections with precise functional responses.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.disabled `Boolean`

If set to true, the action button will be disabled.


<div class="meta-api-description">
Control the enabled or disabled state of individual action buttons within a menu or sheet interface to prevent or allow user clicks, tap interactions, or triggering of associated functions; configure buttons to be non-interactive or grayed-out for conditional UI states, toggle button availability dynamically based on logic, permission, or context, and set the disable flag on specific buttons to block user input while others remain active and responsive.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick,
                    disabled: true
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.fillMode `String` *(default: 'solid')*

Controls how the color is applied to the button. Valid values are: `"solid"`, `"outline"`, `"flat"`, `"link"`, and `"none"`. Default value is `"solid"`.


<div class="meta-api-description">
Customize button appearance and color styles in action sheets by setting how button fills are rendered, including options to configure solid colors, outlined borders, flat designs, hyperlink-like styles, or no fill decorations, enabling developers to control visual emphasis and button color presentation within action panels for user interface customization.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.icon `String`

Specifies the icon's name of the action button.



<div class="meta-api-description">
Configure, set, or customize the icon displayed on action buttons within an action sheet or menu by specifying the icon name or symbol associated with each button. Control the visual representation of action items by assigning, updating, or binding different icons to correspond with various button actions, enhancing user interface clarity and providing intuitive visual cues. Adjust, enable, or change the icon graphics shown on interactive buttons in context menus or option sheets to match function, improve usability, or reflect dynamic states in app workflows.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>


### actionButtons.iconClass `String`

Specifies the icon's class of the action button.



<div class="meta-api-description">
Customize action button icons in ActionSheet by specifying CSS classes to apply icon fonts like Font Awesome or Kendo UI or bespoke styles, enabling developers to configure, set, or change the visual appearance of action buttons through icon class names, control icon styling individually per button, and integrate custom icons seamlessly via CSS classes for buttons in an action sheet interface.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.rounded `String` *(default: 'medium')*

Controls what border radius is applied to a button. Valid values are: `"small"`, `"medium"`, `"large"`, `"full"`, and `"none"`. Default value is `"medium"`.



<div class="meta-api-description">
Configure the curvature and corner radius of action buttons in an action sheet interface by adjusting the roundness level, enabling control over button shape from sharp edges to fully rounded corners; set button styling preferences such as small, medium, large, full circle, or no rounding to modify touch target size, ergonomic feel, and visual appearance, ensuring customizable UI elements that suit diverse design needs and enhance user interaction.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.size `String` *(default: 'medium')*

Controls the overall physical size of a button. Valid values are:  `"small"`, `"medium"`, `"large"`, and `"none"`. Default value is `"medium"`.


<div class="meta-api-description">
Adjust the dimensions, scale, and touch target area of action buttons within an interactive sheet or menu interface, enabling customization of button density and visual prominence by selecting from size options like small, medium, large, or disabling sizing adjustments altogether; configure the button footprint to suit accessibility needs, enhance tap responsiveness, optimize layout spacing, or control the compactness and usability of action controls in mobile and web environments.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>


### actionButtons.text `String`

Specifies the text of the action button.


<div class="meta-api-description">
Configure or customize the visible label, caption, or text displayed on action buttons within an ActionSheet interface, enabling clear identification of button functions such as save, delete, cancel, confirm, or other user actions. This controls the readable name, title, or displayed wording users see on each interactive button in modal menus or dialogs, allowing developers to set, update, or localize button text to improve clarity, user guidance, and UI responsiveness for various actions embedded in action sheets or popup menus.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtons.themeColor `String` *(default: 'base')*

Controls the main color applied to the button. Valid values are:  `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"info"`, `"success"`, `"warning"`, `"error"`, `"dark"`, `"light"`, `"inverse"`, and `"none"`. Default value is `"base"`.


<div class="meta-api-description">
Control and customize the primary color and visual style of action buttons in an action sheet by selecting or setting semantic color variants such as base, primary, secondary, tertiary, info, success, warning, error, dark, light, inverse, or none; configure, adjust, or apply theme colors to style buttons for different tones, statuses, or design schemes, enabling consistent, meaningful color usage that affects the button’s appearance, emphasis, and user interaction feedback.
</div>

#### Example

    <div id="actionsheet">Do you confirm or cancel?</div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Confirmation',
            closeButton: true,
            actionButtons: [
                 {
                    icon: "check",
                    iconClass: "custom-confirm-button-class",
                    fillMode: "solid",
                    themeColor: "primary",
                    rounded: "full",
                    size: "large",
                    text: "Confirm",
                    click: onClick
                },
                {
                    icon: "x",
                    fillMode: "flat",
                    size: "large",
                    text: "Close",
                    click: onClick
                }
            ]
        }).data('kendoActionSheet');

        function onClick(e) {
            e.preventDefault();
            alert($(e.target).text() + " clicked;")
            actionsheet.close();
        }

        actionsheet.open();
    </script>

### actionButtonsOrientation `String`*(default: "horizontal")*

Determines the orientation of the action buttons in the footer. Valid values are `"horizontal"` and `"vertical"`.


<div class="meta-api-description">
Control the layout and arrangement of action buttons in the footer section by configuring their orientation to display buttons either horizontally side-by-side or vertically stacked; customize button alignment to set the ordering and positioning of interactive controls, adjust the layout for better usability and visual preference, arrange action buttons in rows or columns, switch between horizontal and vertical button presentation, enable flexible footer button layouts to meet design or user interface goals, and set how multiple action buttons appear for improved interaction and accessibility in the component.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Confirmation',
          actionButtonsOrientation: "vertical",
          actionButtons: [
              {
                  text: "Confirm",
                  icon: "check",
                  fillMode: "solid",
                  themeColor: "primary",
                  click: onClick
              },
              {
                  text: "Cancel",
                  icon: "x",
                  fillMode: "flat",
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }

      actionsheet.open();
    </script>

### actionButtonsAlignment `String`*(default: "stretched")*

Controls the alignment of the action buttons in the footer. This configuation works only in horizontal mode.

Valid values are `"stretched"`, `"justify"`, `"start"`, `"center"`, and `"end"`.


<div class="meta-api-description">
Control the horizontal layout alignment of action buttons in a footer area by specifying how buttons are arranged or positioned, including options to stretch buttons across the available space, justify spacing evenly, align buttons to the start (left), center them, or align them to the end (right). Configure button placement in horizontal footers for modals, dialogs, or action sheets to manage button distribution, spacing, and grouping, enabling layout customization for consistent UI alignment, flexible spacing strategies, or specific alignment preferences within horizontal button groups. Adjust how buttons are displayed horizontally in footer areas to achieve desired visual order and interface flow in responsive designs or horizontal arrangements.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Confirmation',
          actionButtonsAlignment: "end",
          actionButtons: [
              {
                  text: "Confirm",
                  icon: "check",
                  fillMode: "solid",
                  themeColor: "primary",
                  click: onClick
              },
              {
                  text: "Cancel",
                  icon: "x",
                  fillMode: "flat",
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }

      actionsheet.open();
    </script>

### adaptive `Boolean`*(default: false)*

When the ActionSheet is adaptive, it occupies the full width of the screen and has the option to cover the entire screen if the `fullscreen` is set to `true` as well.


<div class="meta-api-description">
Configure the user interface to automatically adjust and respond to different device screen sizes by enabling a fluid, adaptive layout that expands content to fill the full width of smartphones, tablets, or varying viewport dimensions. Control and set the display so that modal overlays or action sheets scale seamlessly from partial width banners to full-screen presentations on mobile or touch devices, ensuring responsive behavior across form factors. Enable dynamic resizing and full coverage modes for modals or action components to improve usability and accessibility on small screens or when immersive, fullscreen interactions are required.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          adaptive: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### animation `Boolean|Object`*(default: false)*

Configures the opening and closing animations of the ActionSheet. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the ActionSheet will open and close instantly. This property has effect only in `adaptive` mode.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
Control and customize the appearance and disappearance transitions of action sheets by enabling or disabling animations during their open and close events, configure smooth or instant transitions by setting animation flags, manage adaptive mode animations specifically, optimize user interface responsiveness by turning off animations for immediate display, set transition effects or disable them entirely to adjust UI flow, handle animation states for action sheets opening and closing, toggle animation settings to enhance performance or create seamless user experience, and apply animation controls to adaptive layouts while ensuring unsupported configurations are avoided.
</div>

#### Example - disable open and close animations

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Action Sheet',
          adaptive: true,
          animation: false,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil'
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
    </script>

#### Example - configure custom animation

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Action Sheet',
          adaptive: true,
          animation: {
              open: {
                  effects: "fadeIn",
                  duration: 300
              },
              close: {
                  effects: "fadeOut",
                  duration: 150
              }
          },
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil'
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
    </script>

### closeButton `Boolean`*(default: false)*

Whether a close button would be rendered in the titlebar. A title needs to be set to get the titlebar rendered.


<div class="meta-api-description">
Control displaying or hiding a close button in the ActionSheet header, enabling users to enable, disable, show, or hide a dismiss or close icon in the title bar area when a title is present, configuring whether the ActionSheet includes a user interface element to exit, cancel, or close the overlay or modal via a visible button, useful for setting up interactive close controls, toggling close functionality, or customizing the appearance of the ActionSheet’s header with a close option during initialization.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          closeButton: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### closeOnClick `Boolean`*(default: true)*

Determines whether the ActionSheet will close when clicking outside of it. If set to `false`, the ActionSheet will remain open until explicitly closed through code or by clicking the close button (if enabled).


<div class="meta-api-description">
Control whether clicking outside the overlay or backdrop dismisses the popup menu, modal, or dialog, enabling or disabling automatic closing when users tap outside the visible panel; configure the modal to remain open until explicitly closed through code or a close button, manage click-to-close behavior for overlays, dialogs, popups, or action sheets by setting outside click response, and customize user interactions to allow or prevent closing the interface when clicking away from the main content area.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Select item',
          closeOnClick: false,
          closeButton: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### contentTemplate `String|Function`

The text or the function whose result will be shown within the ActionSheet. By default, the ActionSheet will display the content of the target element. The content template will be disregarded if there are `items` defined in the widget options.

> If the content that is passed to the ActionSheet includes scripts, they will be executed. If this is not desired, strip any undesired content in advance.



<div class="meta-api-description">
Customize the content displayed in the ActionSheet by setting or configuring templates that accept plain text, HTML strings, or functions that return HTML or DOM elements, enabling dynamic or static rendering inside the popup interface; control embedded scripts execution within the content and manage whether default target element content or custom-defined items are displayed, with options to enable, disable, or override default content rendering behaviors.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Title',
            contentTemplate: () => "This is a content template",
        }).data('kendoActionSheet');

        actionsheet.open();
    </script>

#### Example - using the content of the target element

    <div id="actionsheet"><span class="test" style="font-weight: bold">This is some content</span></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Title'
        }).data('kendoActionSheet');

        actionsheet.open();
    </script>

### footerTemplate `String|Function`

The text or the function whose result will be shown within the footer of the ActionSheet. The footer template will be disregarded if there are `actionButtons` defined in the widget options.

> If the content that is passed to the ActionSheet includes scripts, they will be executed. If this is not desired, strip any undesired content in advance.


<div class="meta-api-description">
Customize or set the footer area of a pop-up menu or action sheet by specifying static text, HTML content, or a dynamic template function that generates the footer markup or text, enabling tailored footer displays with custom formatting or interactive elements; control rendering priority by noting that if action buttons are defined elsewhere, the custom footer content is ignored, and manage potential script execution within footer content by pre-filtering or sanitizing input to prevent unwanted code execution in overlays, modals, or menu footers.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
        var actionsheet = $('#actionsheet').kendoActionSheet({
            title: 'Title',
            contentTemplate: () => "This is a content template",
            footerTemplate: () => "This is a footer template"
        }).data('kendoActionSheet');

        actionsheet.open();
    </script>

### fullscreen `Boolean`*(default: false)*

Specifies whether the adaptive actionsheet would cover the entire screen when opened.


<div class="meta-api-description">
Control whether the action sheet displays as a full-screen overlay covering the entire viewport to create immersive menus on mobile devices or responsive layouts, enabling or disabling fullscreen mode for adaptive interface presentations, setting the component to expand across the screen for immersive interactions, configuring the overlay to fill the device screen as a boolean toggle, and adjusting the action sheet’s display style between compact and fullscreen modes to suit various screen sizes and user experiences.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          adaptive: true,
          fullscreen: true,
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items `Array`

A JavaScript array that contains the ActionSheet's items configuration.


<div class="meta-api-description">
Configure or set up the list of options, buttons, or commands presented in the ActionSheet by supplying an array of item objects that define each entry’s label, icon, click event handler, and any custom attributes. This collection controls which actions or menu items appear in the interface, enabling customization of available commands, interactive elements, callbacks, and appearance for user selection within modal or popup contexts. Developers look to specify, customize, or manipulate the set of actionable entries, including dynamic or static menu items, event bindings for item clicks, and visual indicators for each option shown in the ActionSheet component.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.click `Function`

Specifies the click event handler of the item.


<div class="meta-api-description">
Configure custom click handlers for menu or list items to respond to user taps or clicks by running specified functions that receive event details, enabling interactive behaviors such as navigation, command execution, triggering callbacks, updating interfaces, or handling user interactions dynamically within action sheets or similar UI components.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.description `String`

Specifies the description of the item.


<div class="meta-api-description">
Configure or set supplementary text, secondary labels, or subtitle-like descriptions for ActionSheet options to provide additional context, clarifying details, hints, or explanatory information alongside each item’s main label. Enable descriptive text for each option in the ActionSheet items list to enhance user understanding, offer guidance, support dynamic content updates, or display contextual cues during rendering or interaction with menu choices. Control or customize the presentation of extended item information to improve clarity and user experience when users view action menus or selection dialogs.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick,
                  description: "Select to enter edit mode."
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.disabled `Boolean`

If set to true, the item will be disabled.


<div class="meta-api-description">
Control whether individual options in an action sheet or menu are inactive, unselectable, or grayed out by disabling specific entries to prevent user interaction or selection. Configure items to be non-clickable, non-invocable, or non-responsive by marking them as disabled, effectively blocking user input on certain choices. This setting helps manage enabled versus disabled menu elements, setting each item’s state during setup so that particular options appear deactivated, locked, or unavailable in the interface, ensuring users cannot trigger those actions or commands.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick,
                  description: "Select to enter edit mode.",
                  disabled: true
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.group `String`

Specifies the group of the item. Items can be segregated in two groups - `top` and `bottom`.


<div class="meta-api-description">
Control the placement or grouping of menu or action sheet options by assigning items to specific sections like top or bottom groups, enabling segregation, organization, or categorization of selectable actions within an interface; configure how actions, commands, or options are displayed in distinct areas for improved user navigation, ordering menu entries for priority or context, and managing the grouping of interactive elements to differentiate header or footer actions, allowing developers to set item grouping behavior, control positioning, and organize lists of choices in grouped segments.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>


### items.icon `String`

Specifies the icon's name of the item.


<div class="meta-api-description">
Specify or customize icons for action items in an ActionSheet by configuring icon names or identifiers to display visuals next to options, enabling control over the icon appearance alongside menu actions, setting or changing icon labels for actions, integrating recognizable graphics for user commands, and managing icon assets for interactive lists or popup menus to enhance clarity, usability, and visual context in action selections.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.iconClass `String`

Specifies the icon's class of the item.


<div class="meta-api-description">
Customize or assign CSS classes, font icon styles, or custom icon styling to action sheet item icons by specifying one or multiple class names, enabling control over icon appearance, theming, and integration of font libraries or custom styles on the action sheet buttons’ icons.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  iconClass: 'custom-edit-class',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.iconColor `String`

The icon color. Available options are `inherit`, `default`, `primary`, `secondary`, `tertiary`, `info`, `success`, `warning`, `error`, `dark`, `light`, `inverted` or any hexadecimal value.


<div class="meta-api-description">
Control and customize the color of icons in action sheet items by configuring icon hues using predefined theme tokens like primary, secondary, tertiary, info, success, warning, error, dark, light, inverted, or specify any custom hex color code. Adjust whether icons inherit their color from parent elements or explicitly set them to match branding, UI themes, or accessibility preferences, enabling flexibility in icon appearance for menus, options, or contextual action displays. This setting helps manage icon color schemes for clarity, emphasis, consistency, or visual hierarchy in interactive components.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  iconColor: "info",
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.iconSize `Number`

The icon size in pixels.


<div class="meta-api-description">
Adjust or configure the size, scale, dimensions, or pixel value of icons displayed within action sheet items, controlling how large or small the graphical symbols appear in pixels to customize UI appearance, icon rendering, or visual consistency. Change or set icon width and height in pixel units for selectable buttons, menu options, or action entries, enabling precise control over icon display size during initialization or runtime to fit design requirements, enhance touch targets, or improve user interface clarity.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  iconColor: "info",
                  iconSize: 40,
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### items.text `String`

Specifies the main text of the item


<div class="meta-api-description">
Configure the main label or primary text displayed for menu entries in an action sheet interface, enabling customization of item titles, button captions, or option names visible to users in lists or pop-up menus, including support for static strings, dynamic content, localization, and binding to various data sources for accurate and flexible presentation of selectable choices or commands within dialog or menu components.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### startButton `Object`*(default: false)*

When configured, a start button will be rendered in the left side of the header section of the ActionSheet. Typically used for navigation or back functionality. The button is only visible when `title` is also specified.


<div class="meta-api-description">
Control the presence and behavior of a navigation or back button positioned on the left side of the ActionSheet header, enabling customization of header action controls such as start, back, or home buttons. Enable or configure a leading button to facilitate user navigation, header interactivity, or quick access, typically rendered alongside a specified title or heading in modal or pop-up panels. Set, customize, or toggle the visibility of an initial header button to improve user flow, back navigation, or contextual actions within overlays or menus.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Select item',
          startButton: {
              icon: "chevron-left",
              click: function(e) {
                  console.log("Start button clicked");
              }
          },
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              }
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
      }
    </script>

### startButton.icon `String`

Specifies the icon to be displayed in the start button.


<div class="meta-api-description">
Configure or customize the icon displayed on the primary action button at the start of an action sheet to visually represent or highlight the main operation. Control or set the graphical symbol used on the starting button to enhance user recognition, replace or combine with button text, adjust icon style, appearance, or classes, and define visual indicators for primary actions within overlay menus or popup selections. Adjust the leading button’s icon to signal intent, enable intuitive click targets, and manage icon display for consistent user interface cues in modal action lists or contextual command panels.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        startButton: {
            text: "Start",
            icon: "play"
        }
    }).data("kendoActionSheet").open();
    </script>

### startButton.click `Function`

The function that will be executed when the start button is clicked.


<div class="meta-api-description">
Configure or assign a callback, event handler, or click listener to trigger custom functionality when the ActionSheet’s start or primary button is tapped, pressed, or clicked, enabling developers to set up interactive responses, custom actions, or custom logic upon user interaction with the start button. This includes setting up callbacks for touch, click, or pointer events on the start button within user interfaces, controlling behavior after button activation, handling start button press events, and integrating custom code executed on button click inside ActionSheet components or dialogs.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        startButton: {
            text: "Start",
            click: function(e) {
                console.log("Start button clicked");
            }
        }
    }).data("kendoActionSheet").open();
    </script>

### subtitle `String`

Specifies the subtitle of the component. Requires the `title` to be configured in order to have the titlebar rendered.


<div class="meta-api-description">
Set a secondary line of descriptive text or a brief explanatory label beneath the main title in action sheets, helping to clarify, provide additional context, or enhance the header area by adding a subtitle or supporting phrase. Enable or configure supplementary information shown below the primary heading to improve user understanding or guidance in action sheets, often used together with main title settings to create a layered header with a primary title and a subordinate subtitle detail. Customize or control header content hierarchy by specifying a secondary title line or tagline for modal action menus, dialog headers, or popup sheets to give users extra context or explanation underneath the main title text.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title: 'Select item',
          subtitle: 'Selecting an item closes the actionsheet',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

### title `String`

Specifies the title of the component


<div class="meta-api-description">
Configure or set the top header text or title label displayed above the action buttons in an action menu or options sheet, enabling clear identification or description of the action list for menus, dialogs, or pop-ups. Control or customize the heading, main text, or title bar that appears at the top of interactive action panels or selection sheets, helping users understand the purpose or context of available options by adjusting the displayed string or label above the button group. Enable descriptive headings, prompt titles, or summary text to clarify the intent of action menus, choice dialogs, or option sheets in your user interface setup.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
    </script>

## Methods

### close

Closes the popup element of the widget.


<div class="meta-api-description">
Programmatically close or dismiss a modal popup, overlay, or action sheet interface from code after user interaction, navigation, or a specific event, enabling control over hiding the popup window, removing the overlay or dialog from view, and triggering UI updates without user tapping outside or manual dismissal. This function lets developers set closing behavior, enable automated popup dismissal, and manage the visibility state of transient popup components through code commands.
</div>

#### Example - close the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
      actionsheet.open();
      setTimeout(function(){actionsheet.close()},2000)
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
Clean up and teardown UI components by programmatically removing event listeners, unbinding handlers, clearing stored jQuery data attributes to prevent memory leaks, and recursively destroying any nested child components to fully release resources before removing elements from the page; configure destruction routines, trigger cleanup processes, manage component lifecycle disposal, and ensure all associated event bindings and data references are properly cleared without altering or deleting DOM nodes themselves.
</div>

#### Example - destroy  the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      actionsheet.open();
      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
      actionsheet.destroy();
    </script>


### fullscreen

Sets whether the adaptive ActionSheet would occupy the entire screen or only the bottom part and have a modal overlay.


<div class="meta-api-description">
Control an adaptive action sheet’s display mode by enabling full viewport coverage or restricting it to a bottom sheet with a modal overlay, toggle the layout dynamically to switch between occupying the entire screen or just the lower section, configure modal overlay presence for user focus and interaction blocking, adjust runtime behavior to present action sheets either as immersive full-screen dialogs or compact bottom panels, set or update presentation style programmatically for seamless UI transitions, enable or disable fullscreen mode and overlay appearance based on interaction context, manage visual hierarchy with modal layering, and customize how action sheets appear and behave in different scenarios or device orientations.
</div>

#### Example - make the adaptive widget fullscreen

    <div id="actionsheet"></div>
    <script>
        var actionsheet = $("#actionsheet").kendoActionSheet({
            adaptive: true,
            title: "Fullscreen actionsheet",
            closeButton: true
        }).getKendoActionSheet();

        actionsheet.fullscreen(true);
        actionsheet.open();
    </script>


### open

Opens the popup element of the widget.


<div class="meta-api-description">
Invoke or trigger the display of a modal action list programmatically by calling a method that opens the popup menu or action sheet component, enabling developers to show contextual options, action buttons, or interactive menus from code such as button handlers, navigation events, or automated workflows without requiring user tap or manual interaction. This control allows programmatic activation, launching, or presentation of a floating list of action items or commands within an app interface.
</div>

#### Example - open the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Cancel',
                  icon: 'cancel',
                  group: 'bottom',
                  click: onClick
              },
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
          actionsheet.close();
      }
      actionsheet.open();
    </script>

### toggle

Toggles the popup element of the widget.


<div class="meta-api-description">
Control the visibility of a popup menu or modal interface by programmatically opening or closing it through a single command that switches its state between shown and hidden, enabling developers to manage the display of interactive overlays dynamically within the application workflow, trigger associated lifecycle events or UI updates, and easily integrate toggle functionality for modal dialogs, action sheets, or bottom menus to respond to user interactions or application logic changes.
</div>

#### Example - toggle the widget

    <div id="actionsheet"></div>
    <script>
      var actionsheet = $('#actionsheet').kendoActionSheet({
          title:'Select item',
          items:[
              {
                  text: 'Edit Item',
                  icon: 'pencil',
                  click: onClick
              },
              {
                  text: 'Add to Favorites',
                  icon: 'heart',
                  click: onClick
              },
              {
                  text: 'Upload New',
                  icon: 'upload',
                  click: onClick
              },
              {
                  text: 'Close',
                  icon: 'cancel',
                  group: 'bottom',
                  click: (ev) => actionsheet.toggle()
              },
          ]
      }).data('kendoActionSheet');

      function onClick(e) {
          e.preventDefault();
      }

      actionsheet.toggle();
    </script>

### visible

Checks whether the actionsheet is visible


<div class="meta-api-description">
Check if a modal or overlay is currently shown, detect whether an action sheet, popup, or dialog is open or hidden, query the visibility status of UI components to conditionally update interfaces, prevent reopening overlays that are already active, and trigger logic or behaviors based on whether a menu or drawer is displayed, retrieving a true or false value indicating if the element is visible or not.
</div>

#### Returns

`Boolean` True when the actionsheet is visible

#### Example

    <div id="actionsheet">CONTENT</div>
    <script>
        var actionsheet = $("#actionsheet").kendoActionSheet().data("kendoActionSheet");
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(actionsheet.visible());
    </script>

## Events

### activate

Fired when the widget is opened.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger code execution or run custom functions when a menu, popup, or action sheet is opened or activated, enabling developers to detect the exact moment a component becomes visible to the user. Capture or intercept show events to initiate animations, set input focus, log user interactions, or perform setup tasks dynamically upon display. Handle opening events to customize UI behavior, control side effects at the time of showing overlays, modals, or action sheets, and access component properties or methods within the event context for reactive, event-driven code execution. This covers scenarios like responding to dialog or menu activation, executing callbacks on display, or managing lifecycle hooks tied to visibility changes.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        activate: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet activated");
        }
    }).data("kendoActionSheet").open();
    </script>

### close

Fired when the widget closes.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when the action sheet or modal interface finishes closing or dismissing, enabling execution of cleanup tasks, restoring keyboard or focus state, updating UI components or application data after the overlay disappears, handling user interactions post-close, triggering callbacks on overlay dismissal, managing component state changes upon closure, running functions when the modal is exited, listening for close or hide events, and controlling focus or event-driven logic following the closing of popup menus or sheets.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        close: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet closed");
        }
    }).data("kendoActionSheet").open();
    </script>

### deactivate

Fired when the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when an interactive action sheet, menu, or popup is closed, dismissed, or deactivated to trigger cleanup routines, restore user focus, reset UI states, or handle teardown processes, capturing events fired upon component closure or cancellation. Monitor, listen for, or respond to deactivation events emitted by modal overlays or action panels to update interface elements dynamically, manage state transitions, or execute post-interaction logic, ensuring seamless user experience after action sheets or similar components are hidden or exited.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        deactivate: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet deactivated");
        }
    }).data("kendoActionSheet").open();
    </script>

### open

Fired when the widget opens.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when an interactive menu or overlay panel becomes visible to trigger custom behaviors such as initializing state variables, starting animations, setting keyboard focus, or logging visibility changes. Enable code execution upon the moment a user interface sheet, action panel, or popup is displayed, allowing control for setup routines, dynamic content adjustments, focus management, or analytics tracking at the time the component opens or becomes active. Support event-driven programming patterns that respond precisely when an action sheet or similar UI element is opened by the user or system, facilitating initialization and interaction flows tied to the component’s active state.
</div>

#### Example

    <div id="actionsheet"></div>
    <script>
    $("#actionsheet").kendoActionSheet({
        title: "Select action",
        items: [
            { text: "Item 1", icon: "folder" },
            { text: "Item 2", icon: "file" }
        ],
        open: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("ActionSheet opened");
        }
    }).data("kendoActionSheet").open();
    </script>
