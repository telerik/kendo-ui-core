---
title: AutoComplete
page_title: Configuration, methods and events of Kendo UI AutoComplete
description: How to configure and control methods in Autocomplete UI widget, which events to use to open, close, change, select.
res_type: api
component: autocomplete
---

# kendo.ui.AutoComplete

Represents the Kendo UI AutoComplete widget. Inherits from [Widget](/api/javascript/ui/widget).

> **Important:** The Kendo UI AutoComplete should be created from an *input* HTML element.

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How can I configure my Kendo UI AutoComplete to adapt its layout for different screen sizes? Configure how autocomplete adjusts its layout and behavior to different screen sizes, devices, and viewports, enabling or disabling responsive, mobile-friendly rendering modes. Control whether the autocomplete input dynamically adapts for touchscreens, small screens, or varying resolutions by setting adaptive display options, responsive design settings, or device-aware rendering. Manage how suggestions, dropdowns, and input fields resize or reposition automatically across phones, tablets, desktops, and different browsers to ensure optimal usability, accessibility, and interaction. Enable or disable automatic adjustment modes that modify the autocomplete component’s responsiveness, scaling, and UI adaptation for improved performance and user experience on various platforms.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Orange", "Banana"],
        adaptiveMode: "auto"
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How do I set a dynamic title for an autocomplete input in mobile views with Kendo UI? Set or customize the header text displayed in responsive or mobile views for autocomplete inputs, enabling dynamic, localized, or context-specific titles that adapt to smaller screens or different device modes; control how the title appears when autocomplete switches to adaptive layouts, configure or change the label shown on compact or mobile versions, and manage the display of header text in adaptive UI scenarios for autocomplete components.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Orange", "Banana"],
        adaptiveMode: "auto",
        adaptiveTitle: "Select Fruit"
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How to dynamically change subtitle in Kendo UI autocomplete? Customize or customize the subtitle text dynamically in adaptive or responsive layouts for autocomplete inputs, enabling localization, overriding default text, controlling subtitle display based on screen size or device, setting context-aware or user-specific messages beneath suggestions, updating subtitle content programmatically during interaction, and tailoring subtitle appearance in different viewports or adaptive UI modes within autocomplete components.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Orange", "Banana"],
        adaptiveMode: "auto",
        adaptiveTitle: "Select Fruit",
        adaptiveSubtitle: "Choose from available options"
    });
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How do I enable smooth transition animations in Kendo UI Autocomplete suggestion dropdowns? Configure the opening and closing effects of suggestion dropdowns by enabling or disabling smooth transition animations, set instant popup display by turning off animation, control visual behavior of autocomplete dropdowns with options to remove delays or fade-ins for faster response, optimize user experience by managing whether suggestion lists appear with animated transitions or pop up immediately without animation, customize popup reveal and hide timing whether to animate or present results instantly, manage dropdown animation toggles to enhance UI performance or visual appeal, adjust autocomplete suggestion box motion settings to either enable fluid animation or disable for immediate display without transitions.
</div>

#### Example - disable open and close animations

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
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
    });
    </script>

### animation.close `Object`

The animation played when the suggestion popup is closed.


<div class="meta-api-description">
How can I animate the closing of the AutoComplete suggestion dropdown in Kendo UI for jQuery? Control and customize how the suggestion dropdown or autocomplete list disappears by configuring closing animations, including setting fade-out effects, slide-up or zoom-out transitions, animation duration timing, easing or speed of the hide motion, and defining custom behaviors for the popup’s exit. Enable precise adjustment of the disappearance behavior of autocomplete or suggestion components when users finish input or dismiss suggestions, including smooth, abrupt, or animated close sequences to enhance UI responsiveness and user experience. Set parameters to manage the visual feedback of suggestion list closure, whether through CSS animations, transitions, or scripted effects, allowing seamless integration with varied design requirements and interaction patterns.
</div>

#### Example - configure the close animation

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How do I control the speed at which the AutoComplete dropdown closes? Adjust the timing for how fast the suggestion dropdown or popup closes in autocomplete inputs by configuring the animation close duration in milliseconds, enabling control over the speed or length of the closing transition effect, setting the close animation time interval, fine-tuning the delay before the suggestions disappear, customizing the closing speed of autocomplete lists, managing how long the auto-complete suggestions remain visible before closing, controlling the animation speed when hiding suggestion menus, specifying the milliseconds duration parameter to speed up or slow down the dismissal animation, defining the transition length for the closing action of dropdown or popup autocomplete suggestions, and configuring how quickly the autocomplete component collapses its suggestion panel after input changes or selection.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Orange", "Banana"],
        animation: {
            close: {
                duration: 500
            }
        }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)


<div class="meta-api-description">
How to customize the closing animation effects in Kendo UI AutoComplete? Configure and customize the closing animations for suggestion popups in autocomplete interfaces by specifying one or multiple animation effects that trigger when the dropdown menu or autocomplete list closes, enabling smooth transition control, visual effects tuning, fade-out, slide, or other motion sequences that enhance user experience during suggestion dismissal or popup closing events, with flexible options to combine different animation styles for closing behaviors.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Orange", "Banana"],
        animation: {
            close: {
                effects: "zoomOut"
            }
        }
    });
    </script>

### animation.open `Object`

The animation played when the suggestion popup is opened.


<div class="meta-api-description">
How do I customize the animation when the AutoComplete dropdown opens? Configure or customize the opening animation, transition effects, timing, easing, duration, and visual behavior of suggestion popups or dropdowns that appear automatically during input completion, autocomplete, or search suggestions. Enable smooth, animated entrances for suggestion lists, control how the dropdown unfolds or fades in when triggered, adjust the appearance and motion effects to create dynamic, responsive user interfaces that show autocomplete results or input prompts with customizable opening animations, pop-up effects, or animated reveal effects in form fields and search components.
</div>

#### Example - configure the open animation

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      animation: {
       open: {
         effects: "zoomIn",
         duration: 300
       }
      }
    });
    </script>

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How to adjust the animation duration of an autocomplete dropdown? Set or adjust the length of time it takes for a dropdown or popup menu to smoothly appear or open, controlling the duration of the opening animation for autocomplete interfaces. Configure, customize, or modify how fast or slow the dropdown reveal or expansion happens, specifying the time in milliseconds for the open transition effect. Enable fine-tuning of the animation speed to create seamless and visually appealing transitions when autocomplete suggestions load or become visible, impacting user experience around popup display timing and animation smoothness.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Orange", "Banana"],
        animation: {
            open: {
                duration: 800
            }
        }
    });
    </script>

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)


<div class="meta-api-description">
How to customize the opening animation effects of an autocomplete dropdown in Kendo UI for jQuery? Configure and customize the animation effects or transitions that trigger when an autocomplete dropdown or suggestion popup appears, enabling smooth fade-ins, slides, zooms, or any combination of opening animations for enhanced user interface responsiveness and visual feedback. Enable or set multiple named animation effects to run simultaneously or sequentially as the autocomplete menu expands, controlling the presentation style and dynamic behavior that occurs when search suggestions or input completions are revealed. Adjust or specify the visual opening effects to improve user experience, boost engagement, and create polished UI interactions by managing how autocomplete dropdowns animate into view.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Orange", "Banana"],
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
    </script>

### autoWidth `Boolean`

If set to `true`, the widget automatically adjusts the width of the popup element and does not wrap up the item label.

> Note: Virtualized list doesn't support the auto-width functionality.


<div class="meta-api-description">
How do I prevent label wrapping in Kendo UI Autocomplete dropdown? Control automatic adjustment of dropdown width for autocomplete suggestions to prevent label wrapping and ensure the popup expands to fit item text dynamically; configure or enable responsive width behavior for suggestion lists, while being aware this may not apply when using virtualized or infinite scrolling lists that bypass this feature.
</div>

#### Example - enable autoWidth

    <input id="autocomplete" style="width: 100px;" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display suggestions for the current value. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How do I configure the AutoComplete widget to load suggestions from a remote API? Configure, bind, or set the collection of suggestion items for autocomplete input by connecting to local arrays, remote APIs, or existing data instances to control dynamic or static suggestion loading, updating, and filtering as users type; enable integration with JavaScript arrays, custom data source configurations, or reusable data source objects to provide flexible, real-time matching, querying, and populating of autocomplete options for enhanced user input interaction.
</div>

#### Example - set dataSource as a JavaScript object

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <input id="autocomplete" />
    <script>
    var data = ["One", "Two"];
    $("#autocomplete").kendoAutoComplete({
      dataSource: data
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <input id="autocomplete" />
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    $("#autocomplete").kendoAutoComplete({
      dataSource: dataSource,
      dataTextField: "ProductName"
    });
    </script>

### clearButton `Boolean` *(default: true)*

Unless this options is set to `false`, a button will appear when hovering the widget. Clicking that button will reset the widget's value and will trigger the change event.


<div class="meta-api-description">
How to disable clear button in Kendo UI AutoComplete widget? Enable or disable a hover-activated clear button that appears in autocomplete input fields, allowing users to quickly reset or clear entered text; this interactive reset control triggers update or change events when clicked, providing intuitive ways to configure, control, or customize clearing user input, removing selection, or resetting form fields within autocomplete components or search boxes.
</div>

#### Example - disable the clear button

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        clearButton: false
    });
    </script>

### dataTextField `String` *(default: null)*

The field of the data item used when searching for suggestions.  This is the text that will be displayed in the list of matched results.


<div class="meta-api-description">
How do I configure the autocomplete to use a specific field from my data source? Specify or configure the key field or property in your data source that the autocomplete or typeahead feature searches, matches, filters, and displays as suggestions, enabling control over which attribute from each data item is used for filtering results, populating the dropdown list, and showing relevant text to users while typing, searching, or querying with predictive inputs.
</div>

#### Example - set the dataTextField

    <input id="autocomplete" />
    <script>
    var data = [
      { id: 1, name: "Apples" },
      { id: 2, name: "Oranges" }
    ];
    $("#autocomplete").kendoAutoComplete({
      dataTextField: "name", // The widget is bound to the "name" field
      dataSource: data
    });
    </script>

### delay `Number` *(default: 200)*

The delay in milliseconds between a keystroke and when the widget displays the suggestion popup.


<div class="meta-api-description">
How to adjust the delay for showing suggestions in Kendo UI AutoComplete? Control the timing between typing input and showing suggestion dropdowns by setting the debounce delay or interval in milliseconds, managing how fast autocomplete or typeahead suggestions appear after each keystroke, enabling customization of responsiveness, latency, or throttling for real-time search hints, predictive text, or dropdown filtering latency to optimize user experience and reduce unnecessary calls or UI flicker during fast typing scenarios.
</div>

#### Example - set the delay

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      delay: 500
    });
    </script>

### enable `Boolean` *(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How can I disable AutoComplete suggestions on my Kendo UI for jQuery autocomplete input field? Toggle the interactivity of text input suggestions by enabling or disabling automatic completion features, allowing developers to configure whether users can type and receive dropdown suggestions or if the input field should reject manual entries entirely; control activation states for autocomplete inputs to either accept, restrict, or block user keystrokes and predictive text, useful for scenarios needing read-only fields, input validation control, or dynamic input behavior adjustment in forms and search boxes.
</div>

#### Example - disable the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      enable: false
    });
    </script>

### enforceMinLength `Boolean` *(default: false)*

If set to `true` the widget will not show all items when the text of the search input cleared. By default the widget shows all items when the text of the search input is cleared. Works in conjunction with [minLength](/api/javascript/ui/autocomplete#configuration-minLength).


<div class="meta-api-description">
How can I prevent Kendo UI AutoComplete from showing all suggestions when the input is empty? Control the behavior of the autocomplete or typeahead input to avoid showing the full list of suggestions when the search field is empty or cleared, enabling configuration to restrict results display only after a minimum number of characters are typed, preventing default behavior of listing all items on blank input, supporting scenarios where you want to disable or enforce minimum character thresholds before dropdown suggestions appear, useful for improving performance, user experience, or managing large datasets by suppressing full list expansion when there is no active query input.
</div>

#### Example - enforce minLength

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataTextField: "ProductName",
        filter: "contains",
        minLength: 3,
        enforceMinLength: true,
        autoBind: false,
        dataSource: {
            type: "odata-v4",
            serverFiltering: true,
            transport: {
                read: "https://demos.telerik.com/service/v2/odata/Products"
            }
        }
    });
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How to customize the fill mode in Kendo UI AutoComplete? Adjust the style and appearance of color fills for autocomplete UI components by configuring fill patterns, including no fill, solid fill, flat color application, or outline borders, enabling control over how background and accent colors are rendered in suggestions or highlighted elements, suitable for customizing visual feedback, theming, and user interaction cues in autocomplete dropdowns, input fields, or dropdown menus with options to set fill styles, apply color transparency, or toggle between solid and outlined color treatments for enhanced UI clarity and design consistency.
</div>

#### Example - sets the fillMode

    <input id="autocomplete" />

    <script>
      $("#autocomplete").kendoAutoComplete({
        fillMode: "flat"
      });
    </script>

### filter `String` *(default: "startswith")*

The filtering method used to determine the suggestions for the current value. The default filter is "startswith" -
all data items which begin with the current widget value are displayed in the suggestion popup. The supported `filter` values are `startswith`, `endswith` and `contains`.


<div class="meta-api-description">
How do I configure AutoComplete to only show suggestions that start with the user's input? Configure and customize how user input is matched against suggestion lists to control which items appear in autocomplete or typeahead dropdowns, enabling filtering methods like prefix matching that shows items starting with the entered text, suffix matching displaying results ending with the input, or substring filtering that surfaces suggestions containing the typed sequence anywhere within. Adjust matching behavior to enable flexible search experiences including starts-with searches, ends-with filtering, or contains-based matching for predictive typing, query filtering, or dynamic dropdown suggestions that adapt to varied input patterns and search requirements.
</div>

#### Example - set the filter

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      filter: "contains",
	  dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the fixed header group. By default the widget displays only the value of the current group.


<div class="meta-api-description">
How do I customize the fixed group headers in Kendo UI Autocomplete dropdowns? Customize the fixed header group display in autocomplete dropdowns by defining a personalized template that controls how group headers are rendered, enabling the inclusion of custom HTML, styled content, dynamic data bindings, or complex formatting for grouped items, allowing developers to set, configure, or override default group titles with rich templates, control group header appearance, and enhance user experience through tailored group visuals in autocomplete lists.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoAutoComplete({
                dataTextField: "ContactName",
                fixedGroupTemplate: "Fixed group: #:data#",
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### footerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the footer template. The footer template receives the widget itself as a part of the data argument. Use the widget fields directly in the template.


<div class="meta-api-description">
How to customize the footer section in Kendo UI Autocomplete dropdowns? Customize and control the footer section in autocomplete dropdowns by defining and rendering a tailored footer area using templates, enabling developers to insert dynamic content, access widget data, manipulate footer layout, add informational or actionable elements below suggestions, and configure how the footer appears based on the current autocomplete state or fields within the widget for enhanced user guidance or branding.
</div>

#### Parameters

##### instance `Object`

The widget instance.

#### Example - specify footerTemplate as a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      footerTemplate: 'Total <strong>#: instance.dataSource.total() #</strong> items found'
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I configure the on-screen keyboard to display numbers only in a Kendo UI AutoComplete input? Control or configure the type of on-screen keyboard or virtual keypad that appears when entering text in an input field by specifying input mode settings that guide numeric, decimal, telephone, email, or URL input scenarios; enable selecting, setting, or adjusting the keyboard layout or input behavior to optimize user input, enhance mobile typing experience, support specialized data entry types, and trigger suitable virtual keyboards based on content context such as numbers, symbols, links, or contact info.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["1", "2", "3", "4", "5"],
        inputMode: "numeric"
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How can I customize the label for an autocomplete input field in Kendo UI? Provide and customize the text or HTML content displayed as a label element associated with an input field in an autocomplete component, enabling configuration of label text, dynamic or static labeling, setting accessible label references by automatically linking labels to inputs via generated or existing IDs, controlling how the label appears before the input box, and allowing developers to define, set, or modify label content through strings or functions for better form accessibility, UI clarity, or user guidance within autocomplete input fields.
</div>

#### Example - create a label from a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: "Fruits"
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: function() {
          return "Fruits";
      }
    });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How do I customize the label content in an autocomplete input's dropdown list? Set or customize the label text and HTML content for an autocomplete input’s displayed label, including enabling rich markup such as icons, line breaks, or styled elements within the label area; configure, modify, or control the label’s inner HTML content to enhance the appearance or semantics of the autocomplete component’s label, supporting dynamic, formatted, or interactive label text for improved user interface presentation.
</div>

#### Example - create a label from a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: { content: "Fruits" }
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: {
        content: function() {
            return "Fruits";
        }
      }
    });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/autocomplete/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#autocomplete").data("kendoAutoComplete").label.floatingLabel.refresh();`


<div class="meta-api-description">
How to enable floating labels in Kendo UI AutoComplete? Enable floating label behavior on input fields by wrapping components in containers that cause labels to float above text inputs when focused, filled, or updated programmatically, supporting dynamic label positioning based on user interaction or value changes and ensuring labels stay visually above typed or set values without losing state on blur or manual value setting; includes support for refreshing or recalculating label position after programmatic input modifications to maintain correct floating label visibility and interaction consistency across autocomplete or similar input fields.
</div>

#### Example - create a label from a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: {
        content: "Fruits",
        floating: true
      }
    });
    </script>

### groupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the groups. By default the widget displays only the value of the group.


<div class="meta-api-description">
How do I customize the display of group headers in Kendo UI AutoComplete dropdowns? Customize the display of group headers in autocomplete dropdowns by defining personalized templates or HTML structures that control the appearance and layout of grouped items. Enable or configure group header formatting, styling, and content rendering beyond default value-only display by applying custom rendering logic, allowing tailored grouping visuals and enhanced user interface grouping in autocomplete lists. Adjust how grouped data is presented, design complex group headers, and manage grouped section templates for better clarity and user interaction within autocomplete components.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
    $(document).ready(function() {
        $("#customers").kendoAutoComplete({
            dataTextField: "ContactName",
            groupTemplate: (data) => `<strong>Country: ${data}</strong>`,
            height: 400,
            dataSource: {
                transport: {
                    read: "https://demos.telerik.com/service/v2/core/Customers"
                },
                group: { field: "Country" }
            }
        });
    });
    </script>

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoAutoComplete({
                dataTextField: "ContactName",
                groupTemplate: "Group: #:data#",
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### height `Number` *(default: 200)*

The height of the suggestion popup in pixels. The default value is 200 pixels.


<div class="meta-api-description">
How to set maximum height for AutoComplete suggestion dropdown? Adjust or configure the vertical size, height, or popup dimension of the suggestion dropdown to control the number of visible autocomplete options, set maximum popup pixel height, manage scrollbar appearance for long lists, customize the suggestion box height in pixels, and fine-tune how many items display before scrolling within the autocomplete dropdown menu.
</div>

#### Example - set the height

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      height: 100,
	  dataSource: {
        data: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"]
      }
    });
    </script>

### highlightFirst `Boolean` *(default: false)*

If set to `true` the first suggestion will be automatically highlighted.


<div class="meta-api-description">
How do I automatically focus the first suggestion in an autocomplete dropdown? Control whether the first item in an autocomplete or dropdown suggestion list is automatically focused or highlighted when the dropdown opens, enabling faster keyboard navigation, quicker selection, improved accessibility for keyboard users, and enhanced user experience by pre-selecting the initial suggestion versus starting with no item highlighted. This setting lets you configure if the first suggestion is emphasized by default to speed up arrow key navigation, Enter key selection, or touch interfaces where a pre-highlighted option guides user interaction, or leave all suggestions unselected to require manual focus movement.
</div>

#### Example - set highlightFirst

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      highlightFirst: true,
	  dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

### ignoreCase `Boolean` *(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.


<div class="meta-api-description">
How to make autocomplete in Kendo UI case insensitive? Configure whether search suggestions match user input without considering letter case, enabling case-insensitive or case-sensitive autocomplete filtering, controlling how text comparisons ignore or respect uppercase and lowercase differences, adjusting matching behavior for exact case matches or generalized searches, toggling input comparison sensitivity to support flexible search patterns, managing whether filtering algorithms treat input as case-independent or case-dependent, setting options to enable matching that differentiates or disregards capitalization in autocomplete results, optimizing search results based on case sensitivity preferences in suggestion matching, enabling developers to customize how user input aligns with dataset entries by adjusting case-aware or case-agnostic filtering modes.
</div>

#### Example - disable case-insensitive suggestions

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      ignoreCase: false,
	  dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

### messages `Object`

The text messages displayed in the widget. Use this option to customize or localize the messages.


<div class="meta-api-description">
How do I customize error messages in the Kendo UI AutoComplete widget? Configure and customize autocomplete component text, including localization, message overrides, and personalized prompts for suggestions, placeholders, error notifications, and user guidance within autocomplete inputs, enabling tailored user interface messages, language translations, and dynamic feedback for enhanced search or input experience in web applications.
</div>

#### Example - customize AutoComplete messages

    <input id="autocomplete" />
    <script>
        $("#autocomplete").kendoAutoComplete({
            dataSource: [ "Apples", "Oranges" ],
            messages: {
                clear: "clear!",
                noData: "There is no data!"
            }
        });
    </script>

### messages.clear `String` *(default: "clear")*

The text message when hovering the input clear button.


<div class="meta-api-description">
How to change the tooltip on an autocomplete clear button in Kendo UI for jQuery? Customize or configure the localized tooltip text that appears when hovering over the clear button in an autocomplete input field, enabling you to set or modify the hover message, display custom or translated labels, control the clear icon's descriptive text, and provide user-friendly, context-aware hints for clearing input values in autocomplete or typeahead components across different languages or UI contexts.
</div>

#### Example - customize clear message

    <input id="autocomplete" />
    <script>
        $("#autocomplete").kendoAutoComplete({
            dataSource: [ "Apples", "Oranges" ],
            messages: {
                clear: "clear!"
            }
        });
    </script>

### messages.noData `String` *(default: "No data found.")*

The text message shown in the noDataTemplate when no data is available in the widget drop-down.


<div class="meta-api-description">
How do I customize the "no data" message in a Kendo UI AutoComplete dropdown? Customize the text or message displayed in autocomplete dropdowns when no matching items or suggestions are found, allowing developers to set, change, or localize placeholder or empty state prompts such as "no data," "no results," "nothing found," or similar phrases that inform users there are currently no available options to select or complete, enabling control over user feedback in search, filter, or input suggestion interfaces when the source list yields zero matches.
</div>

#### Example - customize noData message

    <input id="autocomplete" />
    <script>
        $("#autocomplete").kendoAutoComplete({
            dataSource: [ ],
            messages: {
                noData: "There is no data!"
            }
        });
    </script>

### minLength `Number` *(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to higher value than `1` if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/autocomplete/events/filtering) event for more details.


<div class="meta-api-description">
What is the minimum number of characters needed to trigger autocomplete suggestions in Kendo UI? Control the minimum number of typed characters required to trigger autocomplete suggestions or search queries, enabling configuration of when predictive text, dropdown filtering, or dynamic lookup begins based on input length; adjust this threshold to optimize performance, reduce unnecessary calls with large datasets or extensive match lists, prevent early or empty input searches, and customize behavior for autocomplete filtering, search initiation, query triggering, and event handling related to user input length before suggestion generation.
</div>

#### Example - set minLength

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      minLength: 3,
	  placeholder: "Type 'one'",
	  dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

### noDataTemplate `String|Function|Boolean` *(default: true)*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined


<div class="meta-api-description">
How to customize the message shown when no results are found in Kendo UI AutoComplete? Customize the message or layout shown when search suggestions or autocomplete results are empty, no matches are found, or the data source returns no items, enabling you to display personalized or informative content during no-result scenarios, control fallback UI elements, and enhance user experience by defining templates that trigger automatically when no data is available, including support for dynamic rendering based on the current autocomplete state or query, and ensuring the dropdown remains open to present the custom no-data content consistently.
</div>

#### Example - specify noDataTemplate as a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      noDataTemplate: 'No Data!'
    });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.


<div class="meta-api-description">
How to set custom hint text in Kendo UI AutoComplete widget? Set or customize the hint text, example, or prompt displayed inside an input field before user entry to guide input expectations, show placeholder content, provide default suggestions, or indicate the type of data required whenever the input is empty or awaiting user interaction. This configuration helps improve user experience by offering visual cues, sample values, or instructions within autocomplete or text input components, enabling developers to control placeholder visibility, wording, and appearance in form fields or search boxes.
</div>

#### Example - specify placeholder

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      placeholder: "Enter value ..."
    });
    </script>

The Kendo UI AutoComplete widget could also use the value of the `placeholder` HTML attribute as hint.

#### Example - use the placeholder HTML attribute

    <input id="autocomplete" placeholder="Enter value..." />
    <script>
    $("#autocomplete").kendoAutoComplete();
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.


<div class="meta-api-description">
How can I customize the appearance of the suggestions dropdown in Kendo UI AutoComplete? Control and customize the appearance, position, and behavior of the suggestions dropdown for autocomplete functionality by configuring parameters such as popup placement, animation effects, collision handling, container element attachment, and open/close triggers; enable setting how and where suggestion lists appear relative to the input field, fine-tune visual transitions, manage automatic repositioning to avoid viewport clipping, and specify the target container for rendering, allowing developers to tailor the popup experience and interaction dynamics in autocomplete components for different UI scenarios and responsive layouts.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <input id="autocomplete" />
    </div>
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### prefixOptions `Object`

The configuration for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix of an AutoComplete input field in Kendo UI? Control and customize the leading adornment or prefix for input fields by setting icons, text labels, or custom templates that appear before users type, including options to adjust appearance, behavior, accessibility attributes, and event handling for enhanced input affordance and user interaction with autocomplete inputs.
</div>

#### Example - specify prefix adornment template

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content.


<div class="meta-api-description">
How to set an icon as a prefix in Kendo UI AutoComplete input field? Configure or set a leading icon inside the autocomplete input field by specifying either a theme icon name or custom SVG markup to display as a prefix. Enable, customize, or control input prefix icons to visually enhance autocomplete suggestions or inputs by providing icon names recognized by the theme or embedding scalable vector graphics directly. This supports adding decorative or functional icons before user input, supporting use cases such as symbolizing search, user, location, or other context-relevant cues within the autocomplete component.
</div>

#### Example - specify prefix adornment icon

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        prefixOptions: {
          icon: "search"
        }
      })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How can I customize the appearance of the prefix in a Kendo UI AutoComplete input field? Control and customize the prefix content or adornment shown inside autocomplete input fields by configuring a rendering template using string templates or template functions, enabling tailored prefix appearance and content before user text input; set or change prefix templates to display icons, labels, or custom elements as prefixes, allowing dynamic or static rendering of prefix decorations inside autocomplete components for enhanced UI personalization and pre-input hints.
</div>

#### Example - specify prefix adornment template

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How do I control the separator between the prefix and input field in a Kendo UI AutoComplete? Control the display of a divider or visual separator between a text prefix and the input field in autocomplete components, enabling you to toggle on or off the distinct boundary or spacing that separates the prefix label or adornment from the user input area, configure whether the prefix is visually separated by a line or gap, adjust the appearance of prefix adjacency versus separation, customize the input prefix styling by enabling or disabling the dividing line, and set how the prefix and input area are visually connected or divided for clearer UI distinction or seamless integration.
</div>

#### Example - specify prefix adornment separator

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### rounded `String`*(default: undefined)*

Sets a value controlling the border radius. When `undefined` (the default), the theme controls the default border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I customize the rounded corners of an autocomplete dropdown? Adjust and customize the corner radius, border rounding, or edge curvature of autocomplete or dropdown components by setting or configuring the border radius using presets like none, small, medium, large, or full, or by applying custom numerical values to fine-tune the visual roundness, enable rounded corners, control the shape or style of input suggestion boxes, results panels, or dropdown menus, and tailor the aesthetic appearance for UI elements that offer automatic suggestions or completions.
</div>

#### Example - sets the rounded value

    <div id="container">
        <input id="autocomplete" />
    </div>
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
          { id: 1, name: "Apples" },
          { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        rounded: "large"
      });
    </script>

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I adjust the size of an AutoComplete input in Kendo UI for jQuery? Control the visual scale, density, and spacing of autocomplete inputs by setting the size parameter to customize appearance for compact, medium, large layouts or completely remove size constraints for a default look; useful for adjusting input height, padding, and spacing in forms, dropdown lists, search bars, or typeahead controls to fit different UI designs, responsive layouts, or accessibility needs while enabling developers to configure, enable, set, or modify the overall component dimensions.
</div>

#### Example - sets a size

    <div id="container">
        <input id="autocomplete" />
    </div>
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
          { id: 1, name: "Apples" },
          { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        size: "large"
      });
    </script>

### separator `String|Array` *(default: "")*

The character used to separate multiple values. Empty by default.

> As of Q3 2016 the Autocomplete widget supports multiple separators listed in an array. All separators will be replaced with the first array item, which acts as a default separator.

> Using the separator option will still bind the primitive stringe value of the input. In case you need to bind multiple data items, you can consider the [MultiSelect widget]({%slug overview_kendoui_multiselect_widget%}).


<div class="meta-api-description">
How to configure Kendo UI AutoComplete to separate multiple input values with commas? Configure and control the characters or symbols used to split, divide, or separate multiple input values within text fields or autocomplete interfaces, allowing single or multiple delimiters such as commas, semicolons, pipes, or spaces to distinguish entries in keyword lists, tags, or multi-value inputs. Enable customization of input parsing for user entries separated by various separators, delimiters, or splitters to support tokenization, multiple selections, or batch input scenarios. Adjust how input strings are segmented during autocomplete or typeahead processes, supporting normalization of different separator characters into a unified delimiter for consistent value handling, parsing user input into arrays or lists based on chosen split characters, and managing multiple terms entered in a single field. This setting helps match use cases involving configuring separator characters for comma-separated values, semicolon-separated lists, space-separated tags, or other composite input entries, facilitating enhanced input control, token separation, or multiple value entry workflows.
</div>

#### Example - set separator to allow multiple values

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      separator: ", ",
	  dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set multiple separators

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      separator: [", ", "; "],
	  dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.


<div class="meta-api-description">
How do I customize the suffix of an autocomplete input in Kendo UI for jQuery? Control and customize the trailing element or adornment displayed after an autocomplete input field by configuring its content, appearance, and interaction behavior, including defining icons, templates, CSS styling, accessibility attributes, event handlers, and other visual or functional suffix options to enhance user interface feedback, extend input functionality, or attach auxiliary information or actions that appear after user text input within autocomplete components.
</div>

#### Example - specify suffix adornment template

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content.


<div class="meta-api-description">
How do I customize the suffix icon in an autocomplete input? Configure or customize the suffix icon displayed in an autocomplete input by specifying a predefined theme icon name or providing custom SVG markup to control the trailing icon appearance, including setting, changing, or overriding the default suffix icon for enhanced UI clarity, visual cues, or branding in autocomplete components across user input scenarios.
</div>

#### Example - specify suffix adornment icon

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        suffixOptions: {
          icon: "search"
        }
      })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How to customize suffix element rendering in Kendo UI autocomplete inputs? Adjust, configure, or define the suffix element rendering in autocomplete inputs by specifying custom templates or markup patterns for suffix adornments, enabling control over how suffix icons, text, or elements appear alongside user input. This feature supports dynamic rendering of suffix content with flexible template formats, allowing developers to customize suffix display, styling, or HTML structures within autocomplete components for enhanced UI customization. Enable suffix customization by setting template-based options to modify or replace default suffix decorations, icons, labels, or interactive elements that appear after the autocomplete entry field, supporting varied content types and rendering methods.
</div>

#### Example - specify suffix adornment template

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How do I remove the separator between the input field and suffix elements in a Kendo UI AutoComplete widget? Enable or disable a visual divider or line between the input field and any suffix elements or icons in autocomplete components, controlling whether a separator or boundary appears to separate the suffix adornment from the main input area. Adjust this setting to show, hide, or customize the appearance of dividing lines or spaces that visually separate suffix content in input fields, dropdowns, or autocomplete widgets, allowing configuration of whether suffix icons or labels have a clear distinct partition or blend seamlessly with the input. Manage whether a border, line, or separator is included alongside suffix adornments to control user interface clarity and styling in autocomplete or input controls.
</div>

#### Example - specify suffix adornment separator

    <input id="autocomplete" />
    <script>
      $("#autocomplete").kendoAutoComplete({
        dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
        dataTextField: "name",
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### suggest `Boolean` *(default: false)*

If set to `true` the widget will automatically use the first suggestion as its value.


<div class="meta-api-description">
How do I enable auto-selection of suggestions in Kendo UI AutoComplete? Enable automatic selection of the first matching suggestion as users type to provide typeahead, autofill, or predictive text input, allowing the input field to dynamically update with the top suggestion, supporting behaviors like instant completion, inline suggestions, auto-selecting potential matches, and streamlining user input by pre-filling text based on the highest-ranked suggestion in dropdowns or autocomplete lists.
</div>

#### Example - enable automatic suggestion

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      suggest: true,
	  dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.


<div class="meta-api-description">
How do I customize the header of a Kendo UI Autocomplete dropdown? Configure a custom static HTML header to appear at the top of autocomplete dropdowns by setting custom markup for the popup’s heading, enabling static content display without dynamic data binding or model access, wrapping multiple elements or text inside a single container tag to ensure proper rendering, controlling the visual structure or branding of suggestion lists by injecting fixed HTML templates above the autocomplete options, and setting or overriding default header sections with predefined static HTML code for enhanced user interface customization within autocomplete components.
</div>

#### Example - specify headerTemplate as a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      headerTemplate: '<div><h2>Fruits</h2></div>'
    });
    </script>

### template `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the suggestions. By default the widget displays only the text of the suggestion (configured via `dataTextField`).


<div class="meta-api-description">
How can I customize the display format of AutoComplete suggestions using a custom template? Configure and customize the presentation of suggestion items in autocomplete inputs by defining a rendering template that controls the display format, including custom markup, inclusion of multiple item fields, highlighting matched substrings, or formatting the displayed values. Enable tailored suggestion visuals beyond plain text, allowing developers to set custom layouts, integrate complex HTML or components for each result, emphasize search term matches, or modify how results appear in dropdown lists, enhancing user interaction and clarity during predictive text entry or search-as-you-type scenarios.
</div>

#### Example - specify template as a function

    <input id="autocomplete" />
    <script id="template" type="text/x-kendo-template">
      <span>
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
      </span>
    </script>
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      template: kendo.template($("#template").html())
    });
    </script>

#### Example - specify template as a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      template: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
    });
    </script>

### value `String`*(default: "")*

The value of the widget.


<div class="meta-api-description">
How to set default value in autocomplete field using Kendo UI for jQuery? Retrieve, set, or update the current input or selected option programmatically during initialization or runtime for autocomplete fields, enabling control over prefilled text, managing user input, binding values dynamically, validating form entries, synchronizing selection states, customizing default values, and integrating with form data models or state management systems.
</div>

#### Example - specify value of the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      value: "Oranges"
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget when the initial model value is null. If set to true, the View-Model field will be updated with the selected item text field. If set to false, the View-Model field will be updated with the selected item.


<div class="meta-api-description">
How to configure AutoComplete in Kendo UI for jQuery to update data model with either raw text value or full selected object when starting from a null value? Configure how selection updates propagate to the data model when starting from a null value in autocomplete inputs, deciding whether to bind the raw text value or the full selected object, enabling control over whether the underlying view-model receives just the primitive text string or the entire complex item, useful for scenarios requiring either simple string synchronization or rich object updating in dynamic dropdowns, selection components, or typeahead controls where you want to set, enable, or control how user selections reflect in your application state or form binding.
</div>

#### Example - specify that the View-Model field should be updated with the selected item text

    <input id="autocomplete" data-bind="value: productName, source: products" />

    <script>
    $("#autocomplete").kendoAutoComplete({
      valuePrimitive: true,
      dataTextField: "name"
    });
    var viewModel = kendo.observable({
      productName: null,
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    kendo.bind($("#autocomplete"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget. The configuration can be set on an object, which contains two properties - `itemHeight` and `valueMapper`.

For detailed information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}).


<div class="meta-api-description">
How to enable virtual scrolling in Kendo UI Autocomplete for large datasets? Configure efficient rendering and scrolling for large or asynchronous datasets by enabling virtual scrolling with customizable item height and index mapping functions to optimize performance in autocomplete or dropdown components. Control how items are dynamically rendered during user interaction by setting pixel heights for each entry and providing functions that translate values to item positions, supporting use cases like handling remote data, reducing rendering overhead, and improving responsiveness when filtering or navigating extensive lists. This setup supports scenarios requiring smooth virtualized scrolling, dynamic value resolution, and scalable autocomplete experiences for large volumes of data.
</div>

#### Example - AutoComplete with a virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoAutoComplete({
                template: "#= OrderID # | For: #= ShipName #, #= ShipCountry #",
                dataTextField: "ShipName",
                virtual: true,
                height: 520,
                dataSource: {
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });
    </script>

#### Example - AutoComplete widget with a declarative virtualization config

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <input id="orders" style="width: 400px"
               data-role="autocomplete"
               data-bind="value: order, source: source"
               data-text-field="ShipName"
               data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
               />
    </div>

    <script>
        $(document).ready(function() {
            var model = kendo.observable({
              order: "Hanari Carnes",
              source: new kendo.data.DataSource({
                type: "odata-v4",
                transport: {
                  read: "https://demos.telerik.com/service/v2/odata/Orders"
                },
                schema: {
                  model: {
                    fields: {
                      OrderID: { type: "number" },
                      Freight: { type: "number" },
                      ShipName: { type: "string" },
                      OrderDate: { type: "date" },
                      ShipCity: { type: "string" }
                    }
                  }
                },
                pageSize: 80,
                serverPaging: true,
                serverFiltering: true
              })
            });

            kendo.bind($(document.body), model);
        });

        function orderValueMapper(options) {
            $.ajax({
              url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
              type: "GET",
              data: convertValues(options.value),
              success: function (data) {
                options.success(data);
              }
            })
        }

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.


<div class="meta-api-description">
How to set fixed item height for virtualized AutoComplete list items? Configure or define the consistent height for each item in a virtualized autocomplete list to enable accurate scrolling, smooth virtualization, and uniform item sizing; set or adjust the fixed item height to control row size, ensure proper scroll calculation, and maintain layout stability in dropdowns with virtual rendering, overriding automatic height detection based on fonts or themes for predictable performance when rendering large datasets.
</div>

#### Example - AutoComplete with a virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoAutoComplete({
                template: "#= OrderID # | For: #= ShipName #, #= ShipCountry #",
                dataTextField: "ShipName",
                virtual: {
                    itemHeight: 26
                },
                height: 520,
                dataSource: {
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });
    </script>

### virtual.mapValueTo `String`*(default: "index")*

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values - `"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

For more information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}#value-mapping).


<div class="meta-api-description">
How does Kendo UI's AutoComplete virtualization map selected values to either their numeric index or the full data element? Configure how the autocomplete virtualization maps selected values by setting whether the mapping function returns an item’s position index or the actual data element, enabling control over whether values correspond to their numeric index or the full data entry. Adjust, set, or enable mapping behavior to target either index-based or data-item-based resolution during virtualization for autocomplete components, allowing customization of how input values associate with underlying dataset items or their relative positions. Control value mapping strategies for virtualized autocomplete lists by specifying output as either the item index or the complete data object, supporting flexible integration scenarios and precise handling of virtual scroll selections and data binding.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataTextField: "ProductName",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Products"
            },
            serverFiltering: true
        },
        virtual: {
            itemHeight: 26,
            valueMapper: function(options) {
                // Custom value mapping logic
                console.log("Value mapper called with:", options.value);
                options.success(options.value);
            },
            mapValueTo: "dataItem" // Map to dataItem instead of index
        }
    });
    </script>

### virtual.valueMapper `Function`*(default: null)*

> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is not necessary.


<div class="meta-api-description">
How do I map virtual item indexes to server-side identifiers in Kendo UI Autocomplete? Configure mapping functions to translate virtual item indexes, client-side values, or keys into corresponding server-side identifiers for selecting and resolving items during virtualization, remote data paging, or lazy loading scenarios in autocomplete inputs. Enable or set custom value-to-id mappers to control how remote or virtualized datasets synchronize selected values with server references, handle asynchronous fetching, and ensure proper item resolution in large or paged autocomplete dropdowns. Support server-side value resolution, index-to-id translation, and key mapping for autocomplete components that use virtualization or remote data querying to dynamically load and select matching options.
</div>

#### Example - AutoComplete with a virtualized list
	// the example is relevant to Kendo UI versions prior to 2016.3.914
    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoAutoComplete({
                template: '<span class="order-id">#= OrderID #</span> #= ShipName #, #= ShipCountry #',
                dataTextField: "ShipName",
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                //the **data** is either index or array of indices.
                                //Example:
                                // "Ernst Handel" -> 10 (index in the Orders collection)
                                // ["Ernst Handel", "Que Delícia"] -> [10, 14] (indices in the Orders collection)

                                options.success(data);
                            }
                        })
                    }
                },
                height: 520,
                dataSource: {
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/autocomplete/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/autocomplete/methods/setdatasource) method instead.


<div class="meta-api-description">
How to access and manipulate the data source of a Kendo UI AutoComplete widget? Retrieve, access, or monitor the live data source powering autocomplete suggestions, enabling reading, binding, or reacting to the list or collection feeding options dynamically at runtime. Control or inspect the underlying dataset, array, or data provider that fuels suggestions and typeahead results, track updates or changes in the source content reflected in the autocomplete dropdown, link or connect your own queryable data collection for live suggestions, or integrate with data streams and stores that populate the autocomplete input. Ideal for checking current entries, binding external data models, or responding to data changes without replacing the entire data source object, supporting dynamic filtering, live search, and interactive dropdown content management.
</div>

#### Example - add a data item to the data source
    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name"
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.dataSource.read();
    autocomplete.dataSource.add({ name: "Appricot" });
    autocomplete.search("A");
    </script>

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How do I configure the AutoComplete dropdown in Kendo UI for jQuery? Retrieve and manipulate the current configuration settings of an autocomplete input component, including initialization parameters and dynamic options controlling its behavior, data binding, suggestion list appearance, user interaction modes, filtering criteria, and result display. This enables reading or programmatically updating runtime settings such as input delay, data source, dropdown visibility, matching algorithms, selection modes, and UI customization to fine-tune autocomplete functionality, adapt to user input changes, and customize dropdown options dynamically within your application.
</div>

#### Example - get options of the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();

    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    var element = autocomplete.element;
    var options = autocomplete.options;

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(options);
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.


<div class="meta-api-description">
How do I access and manipulate the dropdown list in a Kendo UI AutoComplete widget? Access, query, and control the autocomplete dropdown list element, enabling retrieval and manipulation of items, attaching event listeners, modifying CSS classes, measuring dimensions, repositioning menus, implementing custom scrolling behaviors, and performing DOM operations on the dropdown using a reference object available after initialization, often through jQuery or similar selectors for dynamic interaction with the autocomplete menu element.
</div>

#### Example - get list element

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();

    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    var list = autocomplete.list;

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(list);
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.


<div class="meta-api-description">
How can I customize the appearance of the AutoComplete dropdown list? Control and interact with the dropdown options container representing the list of selectable items, enabling queries and modifications to the list elements, attaching event listeners for dynamic behavior, measuring or adjusting dimensions and scrolling within the options menu, as well as applying custom styles or classes to customize the appearance and functionality of the autocomplete suggestion list after initialization, facilitating tasks such as programmatically reading, updating, or manipulating the dropdown items in various development scenarios.
</div>

#### Example - get ul element

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();

    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    var ul = autocomplete.ul;

	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(ul);
    </script>

## Methods

### close

Closes the widget suggestion popup.


<div class="meta-api-description">
How do I programmatically close the Kendo UI AutoComplete dropdown? Programmatically dismiss or hide the autocomplete suggestions popup, stop rendering suggestion lists, close the dropdown or suggestion panel on demand, control the visibility of the suggestion box after user selection or input blur, disable or terminate autocomplete suggestion display for keyboard navigation or focus changes, manage closing the suggestion overlay or popup dynamically, enable manual hiding of autocomplete recommendations, handle suggestion list closure when navigating away or after an item is chosen, prevent further suggestions from appearing by closing the list, and integrate autocomplete dropdown dismissal within focus and keyboard event workflows.
</div>

#### Example - close the suggestion popup

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    autocomplete.search("A");
    // Close the suggestion popup
    autocomplete.close();
    </script>

### dataItem

Returns the data item at the specified index.


<div class="meta-api-description">
How do I access the underlying data object in an autocomplete list? Retrieve or access the underlying data object from a list of suggestions by index to get or set information related to a specific autocomplete entry, enabling mapping of data fields to the user interface or further selection processing, such as fetching, inspecting, or manipulating the original data item tied to displayed suggestions in autocomplete components or search inputs.
</div>

#### Parameters

##### index `Number` *(required)*

The zero-based index of of the data item.

#### Returns

`Object` the data item at the specified index. Returns `undefined` if the index is not within bounds.

#### Example - get the item at certain index

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    autocomplete.search("A");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(autocomplete.dataItem(0)); // Displays "Apples" in the browser console
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.


<div class="meta-api-description">
How do I properly clean up an autocomplete widget in Kendo UI for jQuery? Clean up and release resources used by the autocomplete or similar UI components by disabling event handlers, clearing data attributes, and tearing down nested or child widget instances to prevent memory leaks, free up memory, and prepare components for safe removal or dynamic UI updates without removing the underlying HTML elements; this process stops any ongoing processes, detaches listeners, and ensures all associated resources are properly disposed to maintain application performance and avoid residual references during component lifecycle management or dynamic page changes.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I disable user input on an autocomplete widget in Kendo UI for jQuery? Toggle interaction capabilities to programmatically activate or deactivate user input and focus on an autocomplete interface, controlling whether the component responds to keyboard and mouse events, enabling users to type, select suggestions, or disabling all input to prevent interaction and focus. This method manages enabling or disabling autocomplete functionality, controlling user access, input acceptance, event handling, and focusability dynamically within the interface.
</div>

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      enable: false
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.enable(true);
    </script>

#### Example - disable the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.enable(false);
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How can I programmatically set focus on an autocomplete input field? Activate keyboard focus on the input field or programmatically set focus to enable user interaction with the autocomplete suggestions, control focus flow within dialogs or forms, trigger input readiness for typing or navigating options, manage accessibility by directing focus dynamically, and configure components to receive input focus automatically or on demand through scripting or event handling.
</div>

#### Example - focus the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view) (e.g. the ones that match the user's last filtering input).


<div class="meta-api-description">
How can I get the list of items currently displayed in my Kendo AutoComplete dropdown? Retrieve the list of currently rendered item elements from an autocomplete or dropdown component that correspond to the filtered, visible, or matched data entries based on the user’s latest input or filtering criteria, enabling developers to access, measure, highlight, manipulate, or add event listeners to these displayed items in the UI.
</div>

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: ["Apple", "Banana", "Cherry", "Date", "Elderberry"],
        filter: "startswith",
        suggest: true
    });

    // Get reference to the autocomplete widget
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");

    // Type some text to filter the items
    autocomplete.search("a");

    // Get the currently rendered items
    setTimeout(function() {
        var items = autocomplete.items();
        console.log("Number of rendered items:", items.length);
        console.log("First item text:", items.first().text());
    }, 100);
    </script>

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How do I make Kendo UI Autocomplete input readonly while still submitting its value? Control the component’s ability to block user typing while still submitting its current value within forms by toggling a non-editable, read-only mode that prevents input changes without disabling the field; configure or set the input to be uneditable but included in form data, distinguishing between readonly and disabled states where readonly allows value posting but no user edits, enabling scenarios like fixed selections or protected inputs that must appear in submissions without user alteration.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.readonly(true);
    </script>

### refresh

Refresh the suggestion popup by rendering all items again.


<div class="meta-api-description">
How do I programmatically refresh the autocomplete suggestions in Kendo UI for jQuery? force update autocomplete suggestions popup dynamically programmatically refresh autocomplete list after data change re-render dropdown items rebuild suggestions display current filtered entries update autocomplete dropdown content refresh method invoke manual reload autocomplete results user interface reflect data modifications ensure autocomplete popup shows latest matched items control autocomplete results display synchronization with source data changes update suggestion list in autocomplete widget
</div>

#### Example - refresh the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.


<div class="meta-api-description">
How do I programmatically filter data in an AutoComplete widget? Enable programmatic searching and filtering of data sources to display relevant autocomplete suggestions by invoking methods that query local arrays or remote data sources for matching terms, controlling how and when suggestion lists appear based on filter criteria, minimum input length, and dynamic search updates, facilitating autocomplete behavior such as triggering dropdowns with relevant items, configuring search execution, filtering results, performing live or on-demand lookups, and managing suggestion visibility based on input changes or programmatic calls.
</div>

#### Parameters

##### word `String`

The value to search for. All matches are displayed in the suggestion popup.

#### Example - search the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.search("A"); // Displays "Apples" in the suggestion popup
    </script>

### select

Selects the item provided as an argument and updates the value of the widget.

> **Important:** When **virtualization** is enabled, the method **does not support** selection with a *function predicate*. The predicate function looks only
in the current datasource view, which represents only the active range/page. Hence it will not work properly.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/autocomplete/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: [ "John", "Jane" ]
	});
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.search("J");
    autocomplete.select(autocomplete.ul.children().eq(1)); // Selects the second suggestion which is "Jane"
    autocomplete.trigger("change");
    </script>



<div class="meta-api-description">
How can I programmatically select an item in Kendo UI AutoComplete widget? Enable programmatic selection of suggestions within autocomplete inputs by specifying items through direct DOM elements, jQuery objects, numeric indexes, or predicate functions to set or change the highlighted or chosen option, with support for searching and controlling suggestion choice dynamically. Select items by exact value, position, condition, or custom criteria to update the input field’s displayed text without triggering automatic change events, allowing manual synchronization with model bindings or MVVM frameworks. Handle selection scenarios including index-based picking, filtering-based identification, or element reference, while noting that predicate function-based selection may not work correctly when virtualization or paging limits the visible dataset, and require manual event triggering to reflect updates in underlying data models or UI states. This capability supports navigating, highlighting, or confirming autocomplete suggestions programmatically for user interaction automation, testing, or custom behavior extensions.
</div>

#### Parameters

##### item `String|Element|jQuery`

A string, DOM element or jQuery object which represents the item to be selected. A string is treated as a jQuery selector.

#### Example - select item

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "John", "Jane" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.search("J");
    autocomplete.select(autocomplete.ul.children().eq(1)); // Selects the second suggestion which is "Jane"
    </script>

### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
How do I dynamically update the suggestions in a Kendo UI AutoComplete widget? Update or replace the suggestions or items displayed in an autocomplete input dynamically during runtime by configuring or changing the data source, whether by providing a new data set, an array of options, or a data configuration object; control and refresh the list of filtered suggestions shown as users type, apply updated templates, rebind data, and modify the source feeding the autocomplete dropdown instantly without reloading the component, enabling real-time data updates, dynamic filtering, and customized suggestion management based on new or altered data collections.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.setDataSource(dataSource);
    </script>

### suggest

Sets the value of the widget to the specified argument and visually selects the text.


<div class="meta-api-description">
How to programmatically set input value in Kendo UI AutoComplete? Control setting the input value programmatically while automatically highlighting or selecting the entire text inside an autocomplete field to enable quick replacement or continued typing, dynamically updating the displayed input and cursor selection as needed after initialization, configuring the component to suggest or fill in text based on provided input, and allowing immediate text editing or overwriting within the input box through code-driven value and selection management.
</div>

#### Parameters

##### value `String`

The value to set.

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.suggest("Apples");
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/autocomplete/events/change) event.
This can affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.value("new value");
    autocomplete.trigger("change");
    </script>


<div class="meta-api-description">
How can I programmatically update the value in a Kendo UI AutoComplete widget? Accessing or modifying the current text input of an autocomplete widget, retrieving the displayed value programmatically, setting or updating the input content without automatic model-view synchronization, controlling or resetting the user-typed string in code, managing the displayed field value while handling or manually triggering change events to update data bindings or notify listeners, reading or writing input data in autocomplete controls, synchronizing UI text with underlying data models only when explicitly signaling changes, and ensuring proper event firing after programmatic value changes for consistent two-way data flow in MVVM or similar binding patterns.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - set and get the value of the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.value("Apples");
    var value = autocomplete.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(value); // Displays "Apples"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.


<div class="meta-api-description">
How do I detect when a user modifies the value in an autocomplete input? Detect when a user modifies or selects a value in an autocomplete input, capturing changes triggered by typing or selection but excluding programmatic updates from code. Listen for events signaling user-driven input changes to enable running custom logic, updating the interface, validating user entries, or initiating side effects such as API calls. Handle input modification events to dynamically respond to user interaction, process autocomplete selections, track form value changes, and synchronize UI state based on manual text input or choice selection within the autocomplete component.
</div>

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      change: function(e) {
        var value = this.value();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(value);
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("change", autocomplete_change);
    </script>

### close

Fired when the suggestion popup of the widget is closed by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.


<div class="meta-api-description">
How do I execute custom code when an autocomplete dropdown is closed? Trigger actions or execute custom code when an autocomplete suggestion list or dropdown is closed, dismissed, or hidden by user interaction, enabling developers to handle UI updates, data cleanup, user activity tracking, or state changes upon the closure of predictive input suggestions, search dropdowns, or typeahead lists, with event handlers bound to the autocomplete component instance for context-aware processing.
</div>

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_close(e) {
      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("close", autocomplete_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available through the keyword `this`) will be set to the widget instance.


<div class="meta-api-description">
How to trigger action after autocomplete suggestions have finished loading? Detect when autocomplete suggestions have finished loading or binding from local or remote data sources, enabling you to trigger actions after data population such as updating user interface elements, processing or modifying the suggestion list, handling dynamic data refresh, managing post-fetch logic, responding to asynchronous data loads, or initiating subsequent requests once the component completes its data binding phase; use event hooks or callbacks tied to data-ready states in type-ahead or search-as-you-type scenarios.
</div>

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_dataBound(e) {
      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("dataBound", autocomplete_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available through the keyword `this`) will be set to the widget instance.


<div class="meta-api-description">
How do I customize the filtering behavior in Kendo UI AutoComplete? Control and customize the search filtering behavior by intercepting or modifying filter criteria before data source queries or filtering occur, enabling inspection, alteration, or cancellation of search inputs, dynamically adjusting or overriding auto-suggest or autocomplete filtering logic, managing event-driven filtering processes with access to current search terms and filter parameters, handling filter events to implement custom search algorithms, prevent default filtering actions, or enhance search responsiveness within autocomplete or dropdown components.
</div>

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource/configuration/serverfiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(filter);

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_filtering(e) {
      //get filter descriptor
      var filter = e.filter;
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(filter);

      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("filtering", autocomplete_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      filtering: function(e) {
          var filter = e.filter;

          if (!filter.value) {
            //prevent filtering if the filter does not value
            e.preventDefault();
          }
      }
    });
    </script>

### open

Fired when the suggestion popup of the widget is opened by the user.

The event handler function context (available through the keyword `this`) will be set to the widget instance.


<div class="meta-api-description">
How to trigger an action when Kendo UI Autocomplete dropdown becomes visible? Detect and respond to when the autocomplete dropdown or suggestion list becomes visible, enabling developers to trigger actions as soon as the suggestions panel opens, such as setting input focus, customizing UI behavior, running callbacks on popup display, attaching event listeners for dynamic updates, or inspecting the state of suggestion rendering; useful for managing user interaction flows, controlling popup visibility events, executing code on dropdown activation, and integrating with related UI components when autocomplete options appear.
</div>

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_open(e) {
      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("open", autocomplete_open);
    </script>

### select

Fired when an item from the suggestion popup is selected by the user.

> **Important:** The event is not fired when an item is selected programmatically.


<div class="meta-api-description">
When is the select event triggered in Kendo UI AutoComplete? Trigger actions or handle custom behavior whenever a user picks or confirms an item from an autocomplete dropdown, enabling responses like updating related interface elements, applying chosen values, tracking user selections for analytics or logging, reacting to suggestion clicks or keyboard selections, running callbacks on user selection events, managing user input submissions, and distinguishing between manual user picks versus programmatic changes or default selections within autocomplete components.
</div>

#### Event Data

##### e.dataItem `Object`

The data item instance of the selected item.

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      select: function(e) {
        var item = e.item;
        var text = item.text();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(text);
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("select", autocomplete_select);
    </script>

#### Example - prevent the item selection

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      select: function(e) {
        //call preventDefault() to prevent the selection
        e.preventDefault();
      }
    });
    </script>
