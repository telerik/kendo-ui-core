---
title: ToolBar
page_title: Configuration, methods and events of Kendo UI ToolBar
relatedDocs: gs-web-toolbar-overview
res_type: api
component: toolbar
---

# kendo.ui.ToolBar

Represents the Kendo UI ToolBar. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### resizable `Boolean` *(default: true)*

If `resizable` is set to `true` the widget will detect changes in the viewport width and hides the overflowing controls in the command overflow popup.

> When set to `true`, the resizable configuration triggers `overflow: hidden;` CSS property.


<div class="meta-api-description">
Enable dynamic adjustment of toolbar elements based on viewport size by configuring responsive overflow behavior, allowing automatic detection of window resizing to hide, move, or collapse toolbar controls into an overflow menu or popup when space is limited; control whether toolbar items shrink, wrap, or move to a command overflow area to maintain accessibility and usability on different screen widths, ensuring toolbar layout adapts automatically to changing display dimensions by triggering CSS overflow handling and visibility toggling.
</div>

#### Example - Resizable and Non-Resizable ToolBar

    <div style="width: 350px; border: 1px solid #ccc; padding: 10px 10px 50px;">

        <h5>Non-Resizable ToolBar</h5>
        <div id="toolbar-non-resizable"></div>

        <h5>Resizable ToolBar</h5>
        <div id="toolbar-resizable"></div>

    </div>

    <script>
        $("#toolbar-non-resizable").kendoToolBar({
            resizable: false,
            items: [
                { type: "button", text: "Button 1" },
                { type: "button", text: "Button 2" },
                { type: "button", text: "Button 3" },
                { type: "button", text: "Button 4" }
            ]
        });

        $("#toolbar-resizable").kendoToolBar({
            resizable: true,
            items: [
                { type: "button", text: "Button 1" },
                { type: "button", text: "Button 2" },
                { type: "button", text: "Button 3" },
                { type: "button", text: "Button 4" }
            ]
        });
    </script>

### items `Array`

A JavaScript array that contains the ToolBar's commands configuration.

> For more information regarding supported commands and their configuration properties check the [Getting Started topic](/web/toolbar/overview#command-types).


<div class="meta-api-description">
Configure, customize, and control the set of commands, buttons, separators, templates, or custom controls displayed in the toolbar interface by assigning an array of command configuration objects that specify attributes, event handlers, order, alignment, and action bindings; enable dynamic toolbar content, modify control behaviors, set the toolbar layout, incorporate custom templates, and manage interactive elements during application initialization or runtime to tailor the toolbar experience for user interactions and command execution.
</div>

#### Example - initialize ToolBar with Button, Toggle Button and SplitButton

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Button" },
                { type: "button", text: "Toggle", togglable: true },
                { type: "splitButton", text: "SplitButton", menuButtons: [{text: "Option 1"}, {text: "Option 2"}] }
            ]
        });
    </script>

### items.attributes `Object`

Specifies the HTML attributes of a ToolBar button.

> HTML attributes which are JavaScript keywords (e.g. class) must be quoted.


<div class="meta-api-description">
Configure custom HTML attributes on toolbar buttons including id, data attributes, aria labels, and other user-defined tags to enhance accessibility, identification, and interaction control. Enable setting properties like data-* for analytics, aria-* for screen readers, assign unique ids, and apply custom attributes to toolbar controls while handling special attribute names such as class by quoting. Customize toolbar elements by injecting any valid HTML attribute to support automation, testing, styling hooks, or semantic enrichment. Control and extend button behavior or metadata with arbitrary attribute key-value pairs, ensuring full flexibility over rendered toolbar button markup.
</div>

#### Example - adding custom class to a button

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "My Button", attributes: { "class": "red" } }
            ]
        });
    </script>

    <style>
        .red { background-color: red; }
    </style>

### items.buttons `Array`

Specifies the buttons of ButtonGroup.


<div class="meta-api-description">
Set and manage the collection of buttons displayed inside a toolbar’s button group, enabling addition, removal, rearrangement, and full customization of each button’s attributes such as text labels, icons, toggle or active states, and event handlers for clicks or interactions. Control button order, appearance, and behavior within grouped controls for responsive toolbars, allowing developers to specify arrays or configurations of button options for dynamic interfaces, toolbar customization, user interaction handling, and UI component composition. Customize button properties including visibility, interactivity, toggle states, and callback functions within grouped toolbar elements to tailor functionality and presentation based on application needs or user inputs.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo" },
            { text: "bar" },
            { text: "baz" }
          ]
        }
      ]
    });
    </script>

### items.buttons.attributes `Object`

Specifies the HTML attributes of a ButtonGroup's button.

> HTML attributes which are JavaScript keywords (e.g. class) must be quoted.


<div class="meta-api-description">
Add or customize HTML attributes on toolbar buttons by setting an object of key-value pairs for attributes like id, data attributes, ARIA roles, accessibility labels, titles, classes, and custom attributes to control button behavior, accessibility, styling, and identification within button groups, enabling developers to configure or extend button elements with standard or custom attributes for enhanced control and integration in toolbar components.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "buttonGroup", buttons: [
                { text: "foo", attributes: { "class": "red" } },
                { text: "bar", attributes: { "class": "blue" } }
            ] }
            ]
        });
    </script>
    <style>
        .red { background-color: red; }
        .blue { background-color: blue; }
    </style>

### items.buttons.click `Function`

Specifies the click event handler of the button. Applicable only for the children of a ButtonGroup.


<div class="meta-api-description">
Configure and assign click event handlers or functions to interactive buttons nested inside toolbar groups, enabling control over button click actions within toolbar item groups, setting up responsive button click listeners, attaching custom click callbacks or triggers to buttons grouped in toolbars, handling button press events specifically in button collections inside toolbar components, and managing user interactions for buttons embedded within toolbar item groups.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    function onClick() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("click");
    }

    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", click: onClick },
            { text: "bar", click: onClick },
            { text: "baz", click: onClick }
          ]
        }
      ]
    });
    </script>

### items.buttons.enable `Boolean` *(default: true)*

Specifies whether the button is initially enabled or disabled.


<div class="meta-api-description">
Set, control, or configure the initial interactive state of toolbar buttons by enabling or disabling them at startup, including how to activate, deactivate, toggle, or initialize buttons as clickable or disabled within toolbar items, determining whether buttons respond to user input right from component load, managing button availability on page or component render, and specifying if buttons should start enabled or disabled to control user interaction during application initialization.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", enable: false },
            { text: "bar" },
            { text: "baz" }
          ]
        }
      ]
    });
    </script>

### items.buttons.group `String`

Assigns the button to a group. Applicable only for the children of a ButtonGroup that has togglable true.


<div class="meta-api-description">
Control exclusive selection among toolbar buttons by assigning buttons to a toggle group that manages mutually exclusive states, enabling users to configure button groups where only one button can be active or selected at a time. This feature is relevant for creating togglable button groups, setting up grouped toggles, managing selection exclusivity in UI toolbars, enabling radio-style behavior among buttons, and organizing buttons into linked groups to dynamically switch states. It supports scenarios such as grouping toggle buttons, configuring mutually exclusive controls, controlling button states within a toolbar, implementing toggle behavior where only one button can be active, and managing button interactions for better user experience in interfaces with multiple selectable toolbar options.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", togglable: true, group: "myGroup" },
            { text: "bar", togglable: true, group: "myGroup" },
            { text: "baz", togglable: true, group: "myGroup" }
          ]
        }
      ]
    });
    </script>

### items.buttons.hidden `Boolean` *(default: false)*

Determines if the button is visible or hidden. By default the buttons are visible.


<div class="meta-api-description">
Control the visibility of individual toolbar buttons by enabling or disabling their display, toggle button visibility to show or hide specific toolbar actions, configure button presence dynamically during toolbar setup, set buttons to hidden state to remove them from the toolbar layout and prevent user interaction, manage toolbar UI elements by hiding unwanted buttons or revealing necessary controls, adjust the appearance of toolbar buttons through visibility settings, customize which buttons appear on the toolbar by controlling their hidden or visible status, use visibility flags to control button rendering and interactivity, selectively show or suppress toolbar buttons based on user context or application state, hide toolbar buttons to streamline interface or show them to provide additional options.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo" },
            { text: "bar" },
            { text: "baz", hidden: true }
          ]
        }
      ]
    });
    </script>

### items.buttons.icon `String`

Sets icon for the menu button. The icon should be one of the existing in the Kendo UI theme sprite.


<div class="meta-api-description">
Set or customize the visual symbol, picture, or icon for toolbar menu buttons by specifying a theme-based sprite identifier from the available Kendo UI icon set; control, assign, or configure button icons using exact sprite names to display consistent graphical representations, symbols, glyphs, or graphical markers on toolbar items in user interfaces.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", icon: "clock" },
            { text: "bar", icon: "info-circle" },
            { text: "baz", icon: "arrow-rotate-cw" }
          ]
        }
      ]
    });
    </script>

### items.buttons.id `String`

Specifies the ID of the button.

> By design the widget will render two buttons - the one located in the ToolBar container will receive the specified ID, the one located in the Overflow Popup container will receive the specified ID but with *_overflow* suffix. If the ID will be used for determining which button is clicked in the `click` or `toggle` event handler, the developer should use the ID property of the event data which always contains the specified ID without suffix.


<div class="meta-api-description">
Set a consistent and unique HTML identifier for toolbar buttons to enable precise CSS styling, DOM selection, event targeting, and interaction handling across both visible and overflow areas, with stable IDs used in event callbacks for detecting button activation or toggle states, supporting scenarios like customizing appearance, attaching JavaScript listeners, tracking user actions, and differentiating buttons during dynamic UI updates or overflow menu rendering.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", id: "foo" },
            { text: "bar", id: "bar" },
            { text: "baz", id: "baz" }
          ]
        }
      ]
    });
    </script>

### items.buttons.imageUrl `String`

If set, the ToolBar will render an image with the specified URL in the button.


<div class="meta-api-description">
Set or configure a custom icon, graphic, or picture on a toolbar button by specifying an image URL or source link, allowing display of any external or internal image within the button. Enable, add, or show a visual element on navigation controls, action buttons, or UI components by providing a direct image path or online resource to embed icons, logos, or pictures as button content. Customize toolbar appearance by linking images through URLs for buttons to replace or augment text with graphics, thumbnails, or branding elements. Support use cases including adding custom images to toolbar controls, setting button backgrounds from web addresses, or embedding icons fetched via links within interface toolbars.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    var baseUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons";
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "buttonGroup",
          buttons: [
            { text: "foo", imageUrl: baseUrl + "/sports/snowboarding.png" },
            { text: "bar", imageUrl: baseUrl + "/sports/snowboarding.png" }
          ]
        }
      ]
    });
    </script>

### items.buttons.selected `Boolean` *(default: false)*

Specifies if the toggle button is initially selected. Applicable only for the children of a ButtonGroup that has togglable true.


<div class="meta-api-description">
Configure or set the initial active state of toggle buttons within a toolbar, enabling buttons grouped for toggling to start as selected or pressed when the interface loads, control which buttons appear highlighted or engaged by default, manage default toggled-on states in button groups, initialize toggle controls with pre-selected options, and define which toolbar buttons in toggle-enabled groups begin as clicked or activated during startup.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", togglable: true, selected: true },
                { text: "bar", togglable: true },
                ]
            }
            ]
        });
    </script>

### items.buttons.showIcon `String` *(default: "both")*

Applicable only for the buttons of a ButtonGroup. Specifies where the icon of the button will be displayed. Whether it should be displayed always (*both*), only when the button is visible on the ToolBar (*toolbar*), or only when the button is overflowed (*overflow*).


<div class="meta-api-description">
Configure button icon visibility within a button group on a toolbar by controlling whether icons appear always, only when buttons are directly visible on the toolbar, or exclusively in the overflow menu. Enable setting icon display preferences for toolbar items to manage visual presentation based on different interface states, such as showing icons consistently, hiding them on overflow, or displaying them only within overflow menus, allowing customization of icon appearance across toolbar layouts and manipulating visibility rules for button icons in grouped toolbars.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
			items: [{
				type: "button",
				text: "This button has a very long text so the ButtonGroup would be collapsed on larger screen"
			},{
				type: "buttonGroup",
				buttons: [
					{ text: "foo", icon: "clock", showIcon: "overflow" },
					{ text: "bar", icon: "x-outline", showIcon: "both" },
					{ text: "baz", icon: "arrow-rotate-cw", showIcon: "toolbar" }
				]
			}]
		});
    </script>

### items.buttons.showText `String` *(default: "both")*

Applicable only for the buttons of a ButtonGroup. Specifies where the text of the button will be displayed. Whether it should be displayed always (*both*), only when the button is visible on the ToolBar (*toolbar*), or only when the button is overflowed (*overflow*).


<div class="meta-api-description">
Customize button label visibility for toolbar button groups by setting when text appears alongside icons, including always showing labels, displaying text only when buttons are visible on the main toolbar area, or showing labels exclusively for overflowed buttons hidden from immediate view, enabling control over button captions, text display, label positioning, and adaptive UI presentation in toolbars with grouped buttons.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
		$("#toolbar").kendoToolBar({
			items: [{
				type: "button",
				text: "This button has a very long text so the ButtonGroup would be collapsed on larger screen"
			},{
				type: "buttonGroup",
				buttons: [
					{ text: "foo", icon: "clock", showText: "overflow" },
					{ text: "bar", icon: "x-outline", showText: "both" },
					{ text: "baz", icon: "arrow-rotate-cw", showText: "toolbar" }
				]
			}]
		});
    </script>

### items.buttons.spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.


<div class="meta-api-description">
Configure toolbar button icons by assigning one or multiple CSS class names to control visual appearance using sprite images or font icons; customize button graphics by setting sprite CSS classes, icon styles, or multiple combined classes to enable specific icon sets, change icon themes, or apply custom icon styling through CSS for better UI representation and branding in toolbars.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
		$("#toolbar").kendoToolBar({
		  items: [
			{
			  type: "buttonGroup",
			  buttons: [
				{ text: "foo", spriteCssClass: "foo, bar" },
				{ text: "bar", spriteCssClass: "bar" },
				{ text: "baz", spriteCssClass: "baz" }
			  ]
			}
		  ]
		});
	</script>

### items.buttons.toggle `Function`

Specifies the toggle event handler of the button. Applicable only for the children of a ButtonGroup.


<div class="meta-api-description">
Configure event handlers or callbacks to detect and respond to changes in the selected or toggled state of toolbar buttons within button groups, enabling execution of custom functions, dynamic UI updates, state management, or triggering additional actions whenever a toggle occurs on toolbar group buttons. This supports controlling toggle behavior, managing selected states, reacting to user interactions with grouped toolbar buttons, and integrating toggle state changes into application logic.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        function toggle(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.group);
        }

        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", togglable: true, group: "myGroup", toggle: toggle },
                { text: "bar", togglable: true, group: "myGroup", toggle: toggle }
                ]
            }
            ]
        });
    </script>

### items.buttons.togglable `Boolean`

Specifies if the button is togglable, e.g. has a selected and unselected state. Applicable only for the children of a ButtonGroup.


<div class="meta-api-description">
Configure buttons to switch between active and inactive states by enabling toggle functionality that lets a button remain pressed or released, supporting scenarios such as toggle buttons, switchable selection, maintaining on/off states, enabling active/inactive control, and managing pressed or unpressed visual feedback within grouped button sets.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", togglable: true },
                { text: "bar", togglable: true }
                ]
            }
            ]
        });
    </script>

### items.buttons.text `String`

Specifies the text of the menu button.


<div class="meta-api-description">
Configure or set the visible label, caption, or display text shown on menu buttons within a toolbar interface to customize button names, button titles, or text labels for clearer user interaction and interface clarity, enabling control over how each button’s title appears in menus, toolbars, or navigation bars during setup, initialization, or runtime.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo" },
                { text: "bar" }
                ]
            }
            ]
        });
    </script>

### items.buttons.url `String`

Specifies the url of the button to navigate to.


<div class="meta-api-description">
Configure the button’s navigation link by specifying a web address or URL for clicks to redirect users to a particular webpage, whether an absolute or relative path, enabling navigation control, redirection, and linking behavior for toolbar buttons. This includes setting destination links, defining where to open the link such as in the same window or a new tab, customizing how users are directed upon interaction, supporting common use cases like linking to internal routes, external websites, or triggering URL-based navigation within applications by configuring button targets or click handlers in combination with the URL property.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "buttonGroup",
                buttons: [
                { text: "foo", url: "https://www.telerik.com" },
                { text: "bar", url: "https://www.google.com" },
                ]
            }
            ]
        });
    </script>

### items.click `Function`

Specifies the click event handler of the button. Applicable only for commands of type `button` and `splitButton`.


<div class="meta-api-description">
Configure custom click event handlers for toolbar buttons to control actions triggered when toolbar items are pressed, enabling developers to set JavaScript functions that execute on button or split button activation, manage user interaction with toolbar controls, customize command responses on click events, implement event-driven behavior for toolbar items, assign callback functions for button taps, handle toolbar item clicks programmatically during component setup, and enable responsive UI behavior by capturing and processing toolbar button presses.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "foo",
                click: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                    console.log(e.target.text() + " is clicked");
                }
            }
            ]
        });
    </script>

### items.enable `Boolean` *(default: true)*

Specifies whether the control is initially enabled or disabled. Default value is "true".


<div class="meta-api-description">
Control the initial interactive state of toolbar components by configuring whether individual toolbar items are active, clickable, focusable, enabled, or disabled at startup, allowing developers to set items as inactive, grayed out, or non-interactive when the interface loads, thereby managing user access to specific toolbar functions and ensuring certain buttons or controls start in a disabled state to prevent early interaction or focus until conditions change.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "foo",
                enable: false
            }
            ]
        });
    </script>

### items.group `String`

Assigns the button to a group. Applicable only for buttons with `togglable: true`.


<div class="meta-api-description">
Configure toggle buttons within a toolbar to belong to the same named group, enabling linked toggle behavior where only one button can be active at a time, similar to radio button functionality; control grouping for togglable buttons to create exclusive selection sets, associate toggleable items logically for coordinated state changes, set group identifiers to manage mutual exclusivity, and enable grouping to synchronize toggle states across related buttons in the toolbar interface.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "foo", togglable: true, group: "myGroup" },
            { type: "button", text: "bar", togglable: true, group: "myGroup" },
            { type: "button", text: "baz", togglable: true, group: "myGroup" }
            ]
        });
    </script>

### items.hidden `Boolean` *(default: false)*

Determines if a button is visible or hidden. By default buttons are visible.


<div class="meta-api-description">
Adjust visibility settings for toolbar buttons or items by configuring boolean flags to show, hide, toggle, or control display status of individual toolbar elements dynamically. Enable or disable specific toolbar components by setting visibility parameters during setup or runtime, managing which buttons appear or remain concealed in the user interface for flexible toolbar customization, display control, and user interaction optimization.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        { type: "button", text: "MyButton 1", hidden: true },
        { type: "button", text: "MyButton 2" }
      ]
    });
    </script>

### items.icon `String`

Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.


<div class="meta-api-description">
Configure or assign an icon to a toolbar button or item to visually indicate its function, status, or purpose by specifying an icon identifier that corresponds to available icons in the UI framework’s predefined icon set or sprite collection; this enables quick recognition of actions, enhances user interface clarity, and supports customization of toolbar elements with relevant symbolic images to represent commands, features, or states intuitively.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "foo", icon: "clock" },
            { type: "button", text: "bar", icon: "info-circle" },
            { type: "button", text: "baz", icon: "arrow-rotate-cw" }
            ]
        });
    </script>

### items.id `String`

Specifies the ID of the button.

> By design the widget will render two buttons - the one located in the ToolBar container will receive the specified ID, the one located in the Overflow Popup container will receive the specified ID but with *_overflow* suffix. If the ID will be used for determining which button is clicked in the `click` or `toggle` event handler, the developer should use the ID property of the event data which always contains the specified ID without suffix.


<div class="meta-api-description">
Configure and assign unique identifiers to toolbar buttons by setting the HTML id attribute to target, identify, or reference specific buttons within user interfaces, enabling event handling, click detection, toggle state management, and interaction tracking across both the visible toolbar and associated overflow menus where the id may be suffixed but event data consistently provides the original id for reliable identification, linking button definitions to DOM elements for precise control, customization, and dynamic scripting.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "foo", id: "foo" },
            { type: "button", text: "bar", id: "bar" },
            { type: "button", text: "baz", id: "baz" }
            ]
        });
    </script>

### items.imageUrl `String`

If set, the ToolBar will render an image with the specified URL in the button.


<div class="meta-api-description">
Set or configure a button icon, image source, or graphical content in toolbar items by specifying a URL, link, or path for remote or local images; control the visual representation of toolbar buttons with customizable icons, pictures, or graphic elements by assigning image URLs, enabling dynamic display of icons, symbols, or photos within toolbar buttons, including initialization-time settings for embedding images in toolbar controls or navigation bars.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons";
        $("#toolbar").kendoToolBar({
          items: [
            { type: "button", text: "foo", imageUrl: baseUrl + "/sports/snowboarding.png" },
            { type: "button", text: "bar", imageUrl: baseUrl + "/sports/snowboarding.png" }
          ]
        });
    </script>

### items.menuButtons `Array`

Specifies the menu buttons of a SplitButton or a DropDownButton.


<div class="meta-api-description">
Set or customize dropdown menu options, entries, or items within toolbar split buttons or dropdown buttons by specifying labels, icons, click handlers, templates, or actions for each menu element. Enable configuring the menu array to control dropdown contents, manage button submenu items, define interactive menu triggers, or build dynamic menu lists attached to toolbar controls, supporting customization of visual elements and event responses for each menu option inside a toolbar component.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [ {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo" },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            } ]
        });
    </script>

#### Example - DropDownButton

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [ {
                type: "dropDownButton",
                text: "dropDownButton",
                menuButtons: [
                    { id: "foo", text: "Foo" },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            } ]
        });
    </script>

### items.menuButtons.attributes `Object`

Specifies the HTML attributes of a menu button.

> HTML attributes which are JavaScript keywords (e.g. class) must be quoted.


<div class="meta-api-description">
Configure custom HTML attributes for menu buttons within a toolbar component, enabling the addition or modification of element properties such as classes, IDs, ARIA roles, data attributes, and other standard or custom HTML attributes; this includes setting attribute key-value pairs during component setup to control button styling, accessibility enhancements, identification, event hooks, and further element customization, supporting attribute names that may require quoting due to JavaScript reserved words, thus allowing developers to precisely tailor the menu button’s HTML markup for styling, scripting, accessibility, and data binding needs.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                id: "hello",
                text: "Insert",
                attributes: { "class": "red" },
                menuButtons: [
                    { text: "Insert above", icon: "insert-top", attributes: { "class": "blue" } },
                    { text: "Insert between", icon: "insert-middle" },
                    { text: "Insert below", icon: "insert-bottom" }
                ]
            }
            ]
        });
    </script>
    <style>
        .red { background-color: red; }
        .blue { color: blue; }
    </style>

### items.menuButtons.enable `Boolean`

Specifies whether the menu button is initially enabled or disabled.


<div class="meta-api-description">
Control the initial activation state of menu buttons within a toolbar, configuring whether they are enabled, disabled, interactive, or non-interactive when the interface loads; manage default user access to menu options by toggling active states, setting button responsiveness, adjusting availability at startup, or defining if menu buttons are accessible or locked at initialization for immediate user engagement or restriction.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", enable: false },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.hidden `Boolean` *(default: false)*

Determines if a button is visible or hidden. By default buttons are visible.


<div class="meta-api-description">
Toggle display, visibility, or hiding of menu buttons within a toolbar interface, enabling dynamic control over which buttons appear or remain concealed based on user actions, initialization settings, or conditional logic; configure button visibility to show, hide, or toggle toolbar menu elements for customization, user interface adjustments, or runtime updates, supporting scenarios like enabling/disabling buttons, hiding controls to simplify the UI, or revealing options only under certain conditions.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
    $("#toolbar").kendoToolBar({
      items: [
        {
          type: "splitButton",
          text: "MyButton",
          menuButtons: [
            { text: "foo" },
            { text: "bar" },
            { text: "baz", hidden: true }
          ]
        }
      ]
    });
    </script>

### items.menuButtons.icon `String`

Sets icon for the menu buttons. The icon should be one of the existing in the Kendo UI theme sprite.


<div class="meta-api-description">
Set or configure the icon displayed on menu buttons within a toolbar interface, enabling customization of button visuals by selecting from predefined icon names, classes, or sprite icons available in UI themes; control, change, or update the symbol shown on toolbar menu items, assign specific graphical representations to menu buttons for enhanced user interface clarity, and adjust the icon style or appearance to match design requirements or branding by referencing standard icon sets or icon classes for menu elements.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", icon: "check" },
                    { id: "bar", text: "Bar", icon: "info-circle" },
                    { id: "baz", text: "Baz", icon: "clock" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.id `String`

Specifies the ID of the menu buttons.

> By design the widget will render two buttons - the one located in the ToolBar container will receive the specified ID, the one located in the Overflow Popup container will receive the specified ID but with *_overflow* suffix. If the ID will be used for determining which button is clicked in the `click` or `toggle` event handler, the developer should use the ID property of the event data which always contains the specified ID without suffix.


<div class="meta-api-description">
Identify or assign a unique identifier to toolbar menu buttons for precise event handling, button management, and action control, enabling consistent targeting of buttons whether displayed directly or in an overflow menu; use this identifier to detect clicks, toggles, or other interactions reliably across different DOM elements representing the same button, supporting scenarios like custom event listeners, dynamic button state updates, automated UI testing, and integration with external scripts or frameworks requiring stable button references.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [ {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo" },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            } ]
        });
    </script>

### items.menuButtons.imageUrl `String`

If set, the ToolBar will render an image with the specified URL in the menu button.


<div class="meta-api-description">
Configure custom icon images on toolbar menu buttons by setting an image URL to display personalized pictures or graphic icons instead of default button visuals, enabling dynamic control over the button’s appearance with remote or local image sources, supporting customization, branding, and enhanced UI elements by embedding custom image links, icons, or graphics inside menu buttons for tailored toolbar design and flexible visual representation within interface controls.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        var baseUrl = "https://demos.telerik.com/kendo-ui/content/shared/icons";
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", imageUrl:baseUrl + "/sports/snowboarding.png" },
                    { id: "bar", text: "Bar", imageUrl:baseUrl + "/sports/snowboarding.png" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces) which will be used for menu button icon.


<div class="meta-api-description">
Customize toolbar menu button icons by assigning one or more CSS classes to control the appearance, including applying sprite images, font icons, or custom styles. Enable icon customization by setting CSS class names that style the menu button’s icon element, supporting multiple classes for complex icon setups, theming, or branding adjustments. Adjust and configure visual icon representation on toolbar menu buttons using CSS class selectors to integrate various icon libraries, sprite sheets, or tailored graphic styles seamlessly.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo", spriteCssClass: "foo" },
                    { id: "bar", text: "Bar", spriteCssClass: "bar" },
                    { id: "baz", text: "Baz", spriteCssClass: "baz" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.text `String`

Specifies the text of the menu buttons.


<div class="meta-api-description">
Set or customize the visible label, caption, or text displayed on menu buttons within a toolbar, control the wording or names shown on menu button items, configure the button text for menu elements in the toolbar interface, adjust or specify the exact string or title visible to users on toolbar menu buttons, enable personalized or dynamic button labels for menu options in toolbars, manage the display text for interactive toolbar menu buttons to reflect different states or contexts, modify button captions to improve clarity and user experience in navigational menus, tailor the text content of toolbar menu buttons for localization, theming, or branding purposes, define or update the readable titles users see on toolbar menu buttons in UI configurations or programmatic setups.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Foo" },
                    { id: "bar", text: "Bar" },
                    { id: "baz", text: "Baz" }
                ]
            }
            ]
        });
    </script>

### items.menuButtons.url `String`

Specifies the url of the menu button to navigate to.


<div class="meta-api-description">
Set or configure the destination link, navigation target, or redirect URL triggered when clicking a toolbar menu button, enabling routing, linking, or opening specific web addresses from toolbar menu items; control the button’s link behavior to direct users to specific pages, resources, or external sites by specifying the menu button’s navigation endpoint or address.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "splitButton",
                text: "splitButton",
                menuButtons: [
                    { id: "foo", text: "Telerik", url: "https://www.telerik.com" },
                    { id: "bar", text: "Google", url: "https://www.google.com" }
                ]
            }
            ]
        });
    </script>

### items.overflow `String` *(default: "auto")*

Specifies how the button, or the template behaves when the ToolBar is resized. Possible values are: "always", "never" or "auto" (default). If the items contains a `template` and overflow is set to `always`, the template will never be rendered. If the item contains an `overflowTemplate` and the overflow is set to `never`, the overflowTemplate will never be rendered.


<div class="meta-api-description">
Manage how toolbar items respond to resizing by configuring whether they move to overflow menus, stay visible, or hide dynamically; control overflow behavior for responsive design including automatic, forced, or disabled overflow handling, customize rendering of regular and overflow templates based on item state, and specify conditions for when item templates or alternative overflow templates appear, enabling precise control over item visibility, movement, hiding, and display in toolbar overflow scenarios.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "splitButton",
                    text: "splitButton",
                    menuButtons: [
                        { id: "foo", text: "Foo" },
                        { id: "bar", text: "Bar" }
                    ],
                    overflow: "never"
                },
                {
                    type: "button",
                    text: "Button",
                    overflow: "auto"
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { text: "Option 1", togglable: true },
                        { text: "Option 2", togglable: true },
                        { text: "Option 3", togglable: true }
                    ],
                    overflow: "always"
                }
            ]
        });
    </script>

### items.overflowTemplate `String|Function`

Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.


<div class="meta-api-description">
Configure or customize the appearance and content of the overflow area in a toolbar when commands collapse due to limited space by defining a custom template for overflowed items, enabling tailored rendering, styling, or layout of menu items that move into the overflow popup; this applies specifically to toolbar elements that already have a set template and lets you control how hidden or collapsed commands display within the overflow dropdown or popup menu, supporting scenarios where you want distinct visuals, interactive elements, or alternative formats for buttons and controls that don’t fit in the main toolbar area.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    template: "<span>Toolbar template</span>",
                    overflowTemplate: "<span>Overflow template</span>"
                }
            ]
        });
    </script>

### items.primary `Boolean` *(default: false)*

Specifies whether the button is primary. Primary buttons receive different styling.


<div class="meta-api-description">
Highlight or emphasize a main action button within a toolbar by designating it as the primary call-to-action, enabling visual distinction such as highlighted styling or bold appearance to draw user attention. Control whether a toolbar button stands out as the principal or most important action through a boolean setting that triggers primary styling, useful for configuring dominant interactive elements, setting focus on key commands, or making primary CTAs clearly visible among multiple toolbar items. Enable, toggle, or set a button to appear prominent or featured, ensuring users quickly identify main operations or crucial functions within the toolbar interface.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "Primary", primary: true },
            { type: "button", text: "Standard" }
            ]
        });
    </script>

### items.selected `Boolean` *(default: false)*

Specifies if the toggle button is initially selected. Applicable only for buttons with `togglable: true`.


<div class="meta-api-description">
Set or configure the initial pressed, active, toggled, or selected state of toggle buttons within toolbar items, enabling control over whether a button appears activated, engaged, or checked when first rendered. This applies to toolbar buttons that can be toggled on or off, allowing you to specify or enable their default selection, activation, or checked status during setup or initialization. Adjusting this state helps manage UI toggles, pressed states, selected flags, and active indicators for toolbar controls designed as switches, toggle buttons, or stateful items.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            { type: "button", text: "Foo", togglable: true, selected: true }
            ]
        });
    </script>

### items.showIcon `String` *(default: "both")*

Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).


<div class="meta-api-description">
Control the visibility and placement of button icons within toolbar interfaces by configuring where icons appear—whether exclusively in the main toolbar area, solely within overflow or dropdown menus, or simultaneously in both locations—to customize button layout, manage UI space, and enhance user interaction by adjusting icon display settings for toolbar buttons.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", icon: "check", showIcon: "toolbar" }
            ]
        });
    </script>

### items.showText `String` *(default: "both")*

Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).


<div class="meta-api-description">
Configure the display of button or item labels in a toolbar or its overflow menu, controlling whether text appears alongside icons in the main toolbar area, only within the overflow dropdown, or simultaneously in both locations to customize visibility and improve user interface clarity. Adjust label visibility for toolbar elements during setup to show text on the toolbar bar itself, inside the overflow panel when space is limited, or in both places, enabling flexible presentation of commands, actions, or options within navigation bars or tool overlays depending on layout needs and user preferences. Manage whether text accompanies icons at the top-level toolbar, remains hidden until accessed via overflow, or is shown throughout for enhanced usability and context in UI components.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", icon: "check", showText: "overflow" }
            ]
        });
    </script>

### items.spriteCssClass `String`

Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.


<div class="meta-api-description">
Configure or set custom icon styles, CSS sprite classes, icon fonts, or multiple CSS classes on toolbar buttons to control and customize button icons within a toolbar UI component, including applying spriteCssClass for adding specific icon styling, enabling visual customization of toolbar items with CSS classes for icons or sprites, and supporting flexible icon design through class assignment on toolbar button elements.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", icon: "check", spriteCssClass: "tick-icon" }
            ]
        });
    </script>

### items.template `String|Function`

Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

> If `overflowTemplate` is not defined for a template command, than the command will be treated as `overflow: "never"`.


<div class="meta-api-description">
Customize toolbar items by embedding custom HTML, elements, or templates directly within the toolbar structure for individual entries, enabling insertion of unique commands, buttons, icons, or markup that override default rendering behavior and bypass typical item types. This feature supports fully tailored toolbar content for specific items, controlling how elements appear and behave inside the toolbar, including managing overflow behavior when no separate overflow template is specified, ensuring developers can configure, set, or extend toolbar functionality with custom visual components or interactive elements seamlessly integrated at the item level.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    template: "<span>Toolbar template</span>"
                }
            ]
        });
    </script>

### items.text `String`

Sets the text of the button.


<div class="meta-api-description">
Customize or configure the visible label, caption, or text displayed on toolbar buttons by setting or updating the button’s name, title, or tag within the toolbar item collection; control button captions for initialization, localization, dynamic text changes, or user interface adjustments by specifying or modifying the display text, label, or description associated with toolbar elements in various contexts such as application menus, toolbars, or command bars.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo" }
            ]
        });
    </script>

### items.togglable `Boolean` *(default: false)*

Specifies if the button is togglable, e.g. has a selected and unselected state.

> Buttons with `togglable: true` will fire the `toggle` event. `click` event will **not** be fired.


<div class="meta-api-description">
Enable buttons within a toolbar to switch between active and inactive states, allowing users to toggle selection on and off with clear visual feedback. Configure buttons to respond exclusively to toggle actions instead of clicks, managing state changes through toggle events for interactive control and dynamic UI behavior. This functionality supports scenarios where buttons act as switches, selectors, or mode changers, enabling developers to customize button state management, handle on/off status, and implement toggle-driven user interactions in toolbars.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "Foo", togglable: true }
            ]
        });
    </script>

### items.toggle `Function`

Specifies the toggle event handler of the button. Applicable only for commands of type `button` and `togglable: true`.


<div class="meta-api-description">
Configure, manage, or respond to toggle state changes on toolbar buttons that can be switched on or off, activated, or pressed, including handling events fired when togglable buttons change state or user clicks toggle-type controls. Enable event handlers or callbacks for buttons designed to switch between active and inactive modes, set up listeners for toggle actions on toolbar items that support toggling behavior, control or detect when a button with togglable functionality is toggled, clicked, or activated, and implement logic that reacts to toggle state shifts in UI toolbar components, especially for buttons initialized with toggle capability.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "Foo",
                togglable: true,
                toggle: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                    console.log("toggle!");
                }
            }
            ]
        });
    </script>

### items.type `String`

Specifies the command type. Supported types are "button", "splitButton", "dropDownButton", "buttonGroup", "separator", "spacer".

> Specifying the type is **mandatory**. Only commands that have a `template` do not need a `type`.


<div class="meta-api-description">
Select and configure the kind of interactive element or control rendered within a toolbar, including options like buttons, split buttons, dropdown buttons, grouped buttons, separators, and spacers, to customize command appearance, behavior, layout, grouping, and spacing; specify control types to enable precise rendering, manage user interactions, control button grouping, insert dividers or blanks for layout adjustments, and tailor toolbar commands to match functional requirements and user interface design.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "splitButton",
                    text: "splitButton",
                    menuButtons: [
                        { id: "foo", text: "Foo" },
                        { id: "bar", text: "Bar" }
                    ]
                },
                {
                    type: "dropDownButton",
                    text: "dropDownButton",
                    menuButtons: [
                        { id: "foobar", text: "FooBar" },
                        { id: "barbaz", text: "BarBaz" }
                    ]
                },
                {
                    type: "separator"
                },
                {
                    type: "button",
                    text: "Button"
                },
                {
                    type: "buttonGroup",
                    buttons: [
                        { text: "Option 1", togglable: true },
                        { text: "Option 2", togglable: true },
                        { text: "Option 3", togglable: true }
                    ]
                }
            ]
        });
    </script>

### items.url `String`

Specifies the url to navigate to.


<div class="meta-api-description">
Configure the destination link or navigation path for toolbar buttons by specifying URLs, including absolute addresses, relative routes, external web links, or internal application paths that define where clicking a toolbar item redirects users. Set or control link targets for toolbar elements to enable navigation to specific pages, routes, or resources, supporting flexible hyperlinking behavior for toolbar actions and enabling seamless transitions triggered by toolbar interactions.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            items: [
            {
                type: "button",
                text: "Foo",
                url: "https://www.google.com"
            }
            ]
        });
    </script>

### navigateOnTab `Boolean` *(default: false)*

If set to `true` this configuration option would enable Tab-based navigation among ToolBar items.


<div class="meta-api-description">
Control keyboard navigation within toolbar elements by enabling or disabling tab-based focus movement, allowing users to cycle through toolbar buttons or items using the Tab key or Shift+Tab for reverse traversal, improving accessibility and focus management. Configure navigation order, set keyboard focus behavior, and manage how users move between interface controls with tabbing, facilitating keyboard-driven interaction and enhancing usability for assistive technologies. This setting governs whether pressing Tab shifts focus among toolbar options, supporting seamless navigation in complex UI toolbars.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            navigateOnTab: true,
            items: [
                { type: "button", text: "Button 1" },
                { type: "button", text: "Button 2" },
                { type: "button", text: "Button 3" },
                { type: "button", text: "Button 4" }
            ]
        });
    </script>

### overflow `Object`

Configures the overflow behavior of the ToolBar.


<div class="meta-api-description">
Control how toolbar content behaves when it exceeds visible space by configuring overflow handling methods such as collapsing items into a dropdown, enabling scrollable toolbars, managing hidden or popup menus, adjusting layout responsiveness for dynamic or fixed width containers, setting overflow strategies for adaptive or fluid interfaces, and customizing the presentation of surplus controls to optimize user interaction and maintain accessibility during UI resizing or limited screen scenarios.
</div>

#### Example - Customize overflow settings


    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            overflow: {
                mode: "scroll",
                scrollButtons: "auto",
                scrollButtonsPosition: "split",
                scrollDistance: 50
            },
            items: [
                { type: "button", text: "Button 1" },
                { type: "button", text: "Button 2" }
            ]
        });
    </script>


### overflow.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.


<div class="meta-api-description">
Control how toolbar items that exceed available space are managed by configuring overflow behavior to enable dropdown menus for hidden items, horizontal scrolling to access all buttons, grouping controls into collapsible sections for better organization, or disabling overflow management entirely so that excess items may be truncated or hidden. Adjust options for handling item overflow dynamically with modes like menu dropdowns, scrollable bars, grouped sections, or no overflow protection, allowing customization of toolbar layout and usability when facing limited widths or responsive design constraints. Whether developers want to set up smooth user experiences through scrollable toolbars, dropdown overflow menus, sectional grouping of commands, or plain truncation, configuring overflow behavior provides flexible options to control visibility and accessibility of toolbar elements in various UI scenarios.
</div>

#### Example - Set overflow mode to scroll

    <script>
        $("#toolbar").kendoToolBar({
            overflow: {
                mode: "scroll"
            }
        });
    </script>


### overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


<div class="meta-api-description">
Configure visibility of scroll navigation buttons in a horizontal toolbar when scrolling is enabled, including options to automatically display buttons only when content overflows, keep the scroll controls permanently visible for constant access, or hide them entirely for a cleaner interface; manage user interaction cues for scrolling through toolbar items by setting scroll button appearance behavior, controlling when and how these navigation elements appear within scrollable horizontal menus or toolbars under different display modes and overflow scenarios.
</div>

#### Example - Hide scroll buttons

    <script>
        $("#toolbar").kendoToolBar({
            overflow: {
                mode: "scroll",
                scrollButtons: "hidden"
            }
        });
    </script>


### overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


<div class="meta-api-description">
Control the placement and alignment of scroll buttons that appear when toolbar content exceeds visible space, configuring their position to show at the start, end, or split across both ends of the toolbar for optimal user navigation and overflow management. Adjust where overflow navigation controls appear to customize user interaction during content overflow scenarios, enabling placement of scroll buttons at the beginning, the conclusion, or both ends of the toolbar to enhance accessibility, visibility, and scrolling behavior. Manage and set the location of overflow scroll buttons to handle toolbar content overflow by positioning the navigation arrows either at the start edge, the end edge, or distributed on both sides, improving control over toolbar scrolling and user interface flow.
</div>

#### Example - Position scroll buttons at the end


    <script>
        $("#toolbar").kendoToolBar({
            overflow: {
                mode: "scroll",
                scrollButtonsPosition: "end"
            }
        });
    </script>


### overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.


<div class="meta-api-description">
Adjust the scrolling step size for toolbar overflow navigation by configuring the pixel distance the toolbar shifts with each scroll or arrow click, enabling precise control over how far the toolbar content moves during horizontal or vertical overflow scrolling, fine-tuning the scroll increment to customize user interaction and responsiveness for toolbars with overflowing items.
</div>

#### Example - Set scroll distance

    <script>
        $("#toolbar").kendoToolBar({
            overflow: {
                mode: "scroll",
                scrollDistance: 100
            }
        });
    </script>



### size `String` *(default: 'medium')*

Controls the overall physical size of the ToolBar and its items. Valid values are:  `"small"`, `"medium"`, `"large"`, and `"none"`. Default value is `"medium"`.


<div class="meta-api-description">
Adjust the overall dimensions and scale of the toolbar and its components to create layouts that are compact, standard, spacious, or minimal by configuring size options like small, medium, large, or none. Control the physical footprint, visual density, and spacing of toolbar items to optimize UI appearance, usability, and responsiveness for different screen sizes, user preferences, or design systems. Set or modify sizing parameters to customize toolbar height, button sizing, and padding, enabling flexible interface designs ranging from tight, space-saving toolbars to more prominent, easily clickable controls. Use sizing presets or fine-tune to manage layout density and balance between information density and touch target accessibility in various application contexts.
</div>

#### Example

    <div id="toolbar"></div>

    <script>
        $("#toolbar").kendoToolBar({
            size: "large",
            items: [
                { type: "button", text: "Button 1" },
                { type: "button", text: "Button 2" },
                { type: "button", text: "Button 3" },
                { type: "button", text: "Button 4" }
            ]
        });
    </script>


## Methods

### add

Adds new command to the ToolBar widget. Accepts object with [valid command configuration options](/web/toolbar/overview#command-types).


<div class="meta-api-description">
Add or insert commands dynamically into a toolbar by configuring and enabling new buttons, actions, or controls at runtime, allowing customization, extension, or modification of toolbar options through code. Programmatically set or append command elements within the toolbar interface, supporting flexible command configuration objects for adjusting toolbar behavior, adding interactive features, or integrating custom command triggers during application execution.
</div>

#### Parameters

##### command `Object`

An object with valid command configuration options.

#### Example - add button to the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", text: "MyButton" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.add({
            type: "button",
            text: "Just added",
            togglable: true
        });
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
clean up and teardown a toolbar component by removing event listeners, detaching data attributes to prevent memory leaks, disposing internal resources, recursively destroying child components, safely releasing all associated event handlers and data without removing the DOM element, ensuring proper cleanup for UI disposal, controlling component lifecycle to avoid memory issues, disabling toolbar interactivity and breaking references to improve garbage collection, managing component destruction and resource cleanup efficiently in JavaScript UI frameworks
</div>

#### Example

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
          items: [
            { type: "button", text: "MyButton" }
          ]
        });
        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.destroy();
    </script>

### enable

Enables or disables the specified command. If the second parameter is omitted it will be treated as `true` and the command will be enabled.


<div class="meta-api-description">
Enable, disable, or toggle specific toolbar commands programmatically by configuring the command's activation state at runtime using command IDs and optional boolean parameters to control whether commands are enabled or disabled dynamically; set, modify, or switch the availability of toolbar buttons, control their interactiveness, and update UI elements instantly based on application logic, user actions, or conditional states to manage command accessibility and responsiveness on the toolbar interface.
</div>

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be enabled or disabled. A string is treated as jQuery selector.

##### enable `Boolean`

A boolean flag that determines whether the command should be enabled (true) or disabled (false). If omitted the command will be enabled.

#### Example - enable command

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", enable: false }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.enable("#btn1"); //enables the initially disabled command
    </script>

#### Example - disable command

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", enable: true }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.enable("#btn1", false); //disables the initially disabled command
    </script>

### getSelectedFromGroup

Returns the selected toggle button from the specified group.


<div class="meta-api-description">
Retrieve the currently active or selected toggle button within a specific toolbar group, enabling detection of which option is enabled or chosen among multiple toggle controls, useful for querying active selections, checking toggle states, managing mutually exclusive button groups, syncing UI state, conditionally executing code based on user choice, or identifying which item is pressed in a group of toggle buttons.
</div>

#### Parameters

##### groupName `String`

The name of the group.

#### Example - get selected button from group with name "radio"

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                {
                    type: "buttonGroup",
                    buttons: [
                        { type: "button", id: "btn1", text: "Button 1", togglable: true, group: "radio" },
                        { type: "button", id: "btn2", text: "Button 2", togglable: true, group: "radio", selected: true },
                        { type: "button", id: "btn3", text: "Button 3", togglable: true, group: "radio" }
                    ]
                }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        var selected = toolbar.getSelectedFromGroup("radio");

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(selected.attr("id"));
    </script>

### hide

Hides a command from the ToolBar widget. The command is hidden from the ToolBar container and overflow popup (if resizable is enabled).


<div class="meta-api-description">
Control the visibility of command buttons or toolbar items by programmatically hiding, removing, or disabling them from the main toolbar and its overflow menu, including use cases where you want to dynamically exclude specific commands from display or interaction, manage which options appear in the visible toolbar area or the expandable overflow list, customize which buttons or commands should be accessible or hidden based on user roles, states, or interactions, adjust toolbar contents to show or conceal commands as needed for UI flexibility, enable hiding toolbar entries, disable commands temporarily from the toolbar or overflow, and fine-tune the user interface by controlling the presence of toolbar buttons and menu items in various contexts or screen sizes.
</div>

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be hidden. A string is treated as jQuery selector.

#### Example - removed button from the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.hide($("#btn2"));
    </script>

### remove

Removes a command from the ToolBar widget. The command is removed from the ToolBar container and overflow popup (if resizable is enabled).


<div class="meta-api-description">
Remove or delete toolbar commands dynamically at runtime to update or customize available controls, enabling programmatic removal of specific buttons or command elements from both the visible toolbar area and any overflow menus when resizing is active; manage toolbar items flexibly after initialization to control which actions are accessible, clear commands from the toolbar container and overflow popup, and support interactive interfaces that adjust available functions on the fly.
</div>

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be removed. A string is treated as jQuery selector.

#### Example - removed button from the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.remove($("#btn2"));
    </script>

### show

Shows a hidden command in the ToolBar widget. The command is shown in the ToolBar container and overflow popup (if resizable is enabled).


<div class="meta-api-description">
Control the visibility of commands within a toolbar by programmatically revealing hidden buttons, icons, or menu items to ensure they appear either directly on the toolbar or within an overflow area when responsive resizing is active. Enable, display, or restore specific toolbar commands dynamically based on user interactions, layout changes, or application state to manage UI element accessibility and presence. Manage showing or unhiding toolbar actions that were previously concealed, making them accessible instantly whether in the main toolbar container or the expandable overflow menu for adaptive interfaces.
</div>

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the command to be shown. A string is treated as jQuery selector.

#### Example - show button from the ToolBar

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", hidden: true }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.show($("#btn2"));
    </script>

### toggle

Change the state of a togglable button.

> This method does **not** trigger the `toggle` event!


<div class="meta-api-description">
Programmatically set, switch, update, or control the pressed or toggled state of a toggleable toolbar button, enabling you to change button UI status from code without triggering toggle event handlers or listeners; use this method to enable, disable, activate, or deactivate toolbar toggle buttons dynamically, synchronize UI state changes, simulate user presses, or manage toggle state changes internally without firing associated events, supporting scenarios like automated UI updates, programmatic button state control, and state synchronization.
</div>

#### Parameters

##### command `String|Element|jQuery`

A string, DOM element or jQuery object which represents the togglable button which state will be changed. A string is treated as jQuery selector.

##### state `Boolean`

A boolean flag that determines whether the button will be toggled or not.

#### Example - change the state of togglable buttons using the API

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
          items: [
            { type: "buttonGroup", buttons: [
              { type: "button", togglable: true, id: "foo", text: "foo", group: "group1" },
              { type: "button", togglable: true, id: "bar", text: "bar", group: "group1" }
              ]
            }
          ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.toggle("#foo", true); //select button with id: "foo"
        toolbar.toggle("#bar", true); //select button with id: "bar" (also deselects "#foo" as the buttons are from the same group
    </script>

## Events

### click

Fires when the user clicks a command button.

> The event does not fire for togglable buttons. If the button has `togglable: true` use the `toggle` event.


<div class="meta-api-description">
Handle user interactions with toolbar command buttons by detecting clicks on non-toggle buttons, enabling developers to execute custom logic or trigger actions when such buttons are pressed. Capture click events exclusively from buttons that are not togglable, differentiate between toggle and non-toggle button clicks, configure event listeners for command button presses, respond to user clicks on toolbar items, attach click handlers for non-toggle controls, implement functionality upon button activation, and manage toolbar command execution triggered by direct button clicks.
</div>

#### Event Data

##### e.target `jQuery`

The jQuery object that represents the command element.

##### e.id `String`

The id of the command element.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

> **Important** Starting with R1 2023 the event arguments object no longer holds a reference to the ToolBar item (`e.item`). From that release on, the tools in the ToolBar are actual widget instances that can be taken using the `kendo.widgetInstance()` method: `var widget = kendo.widgetInstance(e.target);`. When the clicked tool is rendered in the OverflowMenu or in a popup of a SplitButton/DropDownButton it represents a menu item. Hence, it is not a Kendo widget. A reference to the jQuery element is still available in those cases in the `e.target` event argument.

#### Example - subscribe to the "click" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ],
            click: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("click", e.target.text());
            }
        });
    </script>

#### Example - subscribe to the "click" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("click", function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("click", e.target.text());
        });
    </script>

### close

Fires when the SplitButton's popup closes.


<div class="meta-api-description">
Detect and respond to the moment when a dropdown menu or popup on a toolbar button finishes closing, enabling developers to trigger updates like restoring keyboard focus, reactivating disabled toolbar controls, saving selection states, or performing cleanup operations after a popup or split button menu is dismissed. This event empowers handling UI changes or state management right after the user closes interactive popups, dropdowns, or contextual menus on toolbar elements, supporting use cases such as focus management, toolbar command enablement, selection persistence, and post-popup processing.
</div>

#### Event Data

##### e.widget `jQuery`

A reference to the closed Kendo component.

##### e.preventDefault `Function`

Prevents the close action if called. The popup will remain open.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ],
            close: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("close", e);
            }
        });
    </script>

#### Example - subscribe to the "close" event after initialization and prevent the popup closing

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("close", function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("close", e);
        });
    </script>

### open

Fires when the Split Button's popup opens.


<div class="meta-api-description">
Detect when a toolbar’s split button popup or dropdown menu becomes visible to trigger actions such as updating user interfaces, initializing or loading dynamic content, setting keyboard focus, tracking user interactions, or running custom event handlers upon the popup opening. Capture and respond to popup open events, dropdown expansions, or menu activations within toolbars to execute code as soon as the popup appears, enabling dynamic UI changes, conditional rendering, or analytics tracking tied to user engagement with toolbar split buttons or dropdown triggers.
</div>

#### Event Data

##### e.widget `jQuery`

A reference to the opened Kendo component.

##### e.preventDefault `Function`

Prevents the open action if called. The popup will remain closed.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ],
            open: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("open", e);
            }
        });
    </script>

#### Example - subscribe to the "open" event after initialization and prevent the popup closing

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "splitButton", id: "splitButton", name: "splitButton", text: "Split Button", menuButtons: [
                    { id: "option1", text: "Option 1" },
                    { id: "option2", text: "Option 2" },
                    { id: "option3", text: "Option 3" },
                    { id: "option4", text: "Option 4" }
                ] }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("open", function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("open", e);
        });
    </script>

### toggle

Fires when the user changes the checked state of a toggle button.

> **Important** `click` event does not fire for buttons that have `togglable: true`


<div class="meta-api-description">
Respond to toggle button state changes within a toolbar by detecting when a button is switched on or off, capturing user interactions that alter checked or toggled statuses, enabling synchronization of UI elements, updating data models, controlling feature activation, handling user-driven toggle events instead of standard click events for buttons configured as togglable, and managing state changes in toolbar toggle controls for dynamic interface updates, state tracking, and reactive functionality adjustments.
</div>

#### Event Data

##### e.target `jQuery`

The jQuery object that represents the command element.

##### e.checked `Boolean`

Boolean flag that indicates the button state.

##### e.id `String`

The id of the command element.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

> **Important** Starting with R1 2023 the event arguments object no longer holds a reference to the ToolBar item (`e.item`). From that release on, the tools in the ToolBar are actual widget instances that can be taken using the `kendo.widgetInstance()` method: `var widget = kendo.widgetInstance(e.target);`. When the toggled tool is rendered in the OverflowMenu it represents a menu item. Hence, it is not a Kendo widget. A reference to the jQuery element is still available in those cases in the `e.target` event argument.

#### Example - subscribe to the "toggle" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", togglable: true },
                { type: "button", id: "btn2", text: "Button 2", togglable: true }
            ],
            toggle: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("toggle", e.target.text(), e.checked);
            }
        });
    </script>

#### Example - subscribe to the "toggle" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1", togglable: true },
                { type: "button", id: "btn2", text: "Button 2", togglable: true }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("toggle", function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("toggle", e.target.text(), e.checked);
        });
    </script>

### overflowClose

Fires when the overflow popup container is about to close.


<div class="meta-api-description">
Capture and handle events triggered just before a toolbar overflow menu or popup closes, enabling developers to detect when the overflow panel is about to shut, perform cleanup tasks, save or restore focus or UI state, update related interface elements dynamically, execute custom logic on overflow menu closure, log activity or user interactions prior to dismissal, and manage focus control or state preservation seamlessly during toolbar overflow popup closing sequences.
</div>

#### Event Data

##### e.preventDefault `Function`

Prevents the close action if called. The popup will remain open.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "overflowClose" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ],
            overflowClose: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("close");
            }
        });
    </script>

#### Example - subscribe to the "overflowClose" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("overflowClose", function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("close");
        });
    </script>

### overflowOpen

Fires when the overflow popup container is about to open.


<div class="meta-api-description">
Detect and handle the event triggered immediately before an overflow menu or popup opens in a toolbar or similar UI component, enabling developers to intercept the action to customize, modify, update, inject items into, restyle, or adjust the layout of the overflowed content dynamically prior to its display, supporting scenarios such as conditional rendering, dynamic item management, styling changes, or layout recalculations to ensure customized overflow behavior and appearance right before the overflow popup becomes visible.
</div>

#### Event Data

##### e.preventDefault `Function`

Prevents the close action if called. The popup will remain closed.

##### e.sender `kendo.ui.ToolBar`

The widget instance which fired the event.

#### Example - subscribe to the "overflowOpen" event during initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ],
            overflowOpen: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("open");
            }
        });
    </script>

#### Example - subscribe to the "overflowOpen" event after initialization

    <div id="toolbar"></div>
    <script>
        $("#toolbar").kendoToolBar({
            items: [
                { type: "button", id: "btn1", text: "Button 1" },
                { type: "button", id: "btn2", text: "Button 2", overflow: "always" }
            ]
        });

        var toolbar = $("#toolbar").data("kendoToolBar");
        toolbar.bind("overflowOpen", function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("open");
        });
    </script>
