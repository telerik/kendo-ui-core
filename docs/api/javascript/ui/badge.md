---
title: Badge
description: Configuration, methods and events of the Kendo UI Badge
res_type: api
component: badge
---

# kendo.ui.Badge

Represents the Kendo UI Badge widget. Inherits from [Widget](/api/javascript/ui/widget).




## Configuration


### align `String` *(default: '')*

Specifies position of the badge relative to its container. Valid position options are:

* `top start`: positions the badge at top left corner of the container; top right in RTL mode.
* `top end`: positions the badge at top right corner of the container; top left in RTL mode.
* `bottom start`: positions the badge at bottom left corner of the container; bottom right in RTL mode.
* `bottom end`: positions the badge at bottom right corner of the container; bottom right in RTL mode.

`align` works in conjunction with [`position`](/api/javascript/ui/badge/configuration/position).

Note: when using align, make sure the badge container has [css position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) other than `static` and allows [overflow content](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow).


<div class="meta-api-description">
How do I adjust the position of a Kendo UI badge in relation to its container? Control or customize the placement and positioning of a badge relative to its container by aligning it to specific corners such as top-left, top-right, bottom-left, or bottom-right, with automatic adjustments for right-to-left (RTL) layouts. Adjust, set, or configure the badge alignment for precise corner positioning within a parent element, ensuring the container supports CSS positioning and overflow visibility. Enable developers to position badges dynamically in various UI contexts by specifying alignment preferences that work seamlessly with overall badge positioning settings, catering to different layout directions, corner anchoring, or overlay requirements.
</div>

#### Example

    <button class="k-button">Top Start Badge <span id="badge-top-start"></span></button>
    <button class="k-button">Top End Badge <span id="badge-top-end"></span></button>
    <button class="k-button">Bottom Start Badge <span id="badge-bottom-start"></span></button>
    <button class="k-button">Bottom End Badge <span id="badge-bottom-end"></span></button>
    <script>
        $('#badge-top-start').kendoBadge({position: 'edge', align: 'top start', themeColor: 'primary'});
        $('#badge-top-end').kendoBadge({position: 'edge', align: 'top end', themeColor: 'primary'});
        $('#badge-bottom-start').kendoBadge({position: 'edge', align: 'bottom start', themeColor: 'primary'});
        $('#badge-bottom-end').kendoBadge({position: 'edge', align: 'bottom end', themeColor: 'primary'});
    </script>


### cutoutBorder `Boolean` *(default: false)*

Specifies whether or not to render additional "cutout" border around the badge.


<div class="meta-api-description">
How to enable or disable the decorative border around a Kendo UI for jQuery badge element? Control the presence of a decorative outline or border around a UI badge element, enabling or disabling an extra cutout-style edge to enhance visual separation, emphasis, or highlight. Configure, toggle, set, or adjust this border feature during component setup to influence badge appearance, styling, accentuation, and focus. Ideal for developers seeking to customize badge visuals with options to add or remove a distinct outline or trim that highlights badges within interfaces or design systems.
</div>

#### Example

    <div style="padding: 10px; background: #cccccc;">
        <span id="badge-normal"></span>
        <span id="badge-bordered"></span>
    </div>
    <script>
        $('#badge-normal').kendoBadge({ cutoutBorder: false, rounded: 'full' });
        $('#badge-bordered').kendoBadge({ cutoutBorder: true, rounded: 'full' });
    </script>


### fillMode `String` *(default: undefined)*

Specifies how themeColor is applied to a badge. When `undefined` (the default), the theme controls the default fill mode. Valid options are `solid` and `outline`.


<div class="meta-api-description">
What is Kendo UI badge fillMode property used for? Adjust the visual style or appearance of a badge by choosing between a solid filled background or an outlined design that colors the border and text, enabling customization of how the main theme color is applied. This setting lets you configure the badge’s fill style, switch between filled backgrounds and transparent or outline-only looks, control whether the badge uses a full color fill or just colored edges and typography, and set the style to solid or outline to match branding or UI preferences.
</div>

#### Example

    <span id="badge-solid">Solid</span>
    <span id="badge-outline">Outline</span>
    <script>
        $('#badge-solid').kendoBadge({ fillMode: 'solid' });
        $('#badge-outline').kendoBadge({ fillMode: 'outline' });
    </script>


### icon `String` *(default: '')*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the badge by a `span.k-icon` or `span.k-svg-icon` element.

See [web font icons help article](/styles-and-layout/icons-web) for more details on Kendo UI icons.


<div class="meta-api-description">
How do I customize the icon in a Kendo UI badge? Configure or enable an icon within a badge by specifying a predefined Kendo theme icon name or supplying custom SVG content to customize the badge's visual indicator, controlling how an icon is displayed inside the badge element using web font icons or inline SVG, allowing for flexible icon integration, styling, and dynamic rendering within user interface badges for status indicators, notifications, or markers.
</div>

#### Example

    <span id="badge"></span>
    <script>
        $('#badge').kendoBadge({
            icon: 'plus',
            themeColor: 'primary'
        });
    </script>


### max `Number` *(default: Infinity)*

If `text` is a number, it will cap that number.


<div class="meta-api-description">
How to limit the numeric value in Kendo UI badges? Limit, restrict, or cap the numeric value shown in badges or notifications by setting a maximum threshold to control how large numbers appear, preventing overflow or clutter when displaying counts, quantities, or numeric indicators. Configure the maximum displayed number to ensure that if the actual count exceeds this limit, the badge shows the capped value instead, supporting clearer user interfaces for counts, notifications, alerts, or messages by controlling visibility and formatting of numeric badges in UI components. Adjust or set upper bounds for badge numbers, counter limits, or value thresholds to manage numeric visualizations within badges or notification elements.
</div>

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
            themeColor: 'primary',
            max: 1024
        });
    </script>


### position `String` *(default: 'inline')*

Specifies position of the badge relative to the edge of the container. Valid options are:

* `inline`: positions the badge inside the container, next to the text.
* `edge`: the center of the badge is positioned on the edge of the container.
* `inside`: the badge is entirely positioned inside the container.
* `outside`: the badge is entirely positioned oustide the container.

Note: position configuration, other than `inline`, requires the badge to be aligned. See [`align`](/api/javascript/ui/badge/configuration/align) for more details.


<div class="meta-api-description">
How can I adjust the position of a notification badge in Kendo UI for jQuery? Set or adjust the placement and alignment of a notification badge in relation to its container, controlling whether the badge appears inside the container next to text, fully inside but offset, centered on the container edge, or completely outside the bounds. This position setting supports flexible configuration for badge location such as inline placement beside content, edge alignment where the badge center aligns with container boundaries, or full inside/outside positioning depending on visual design needs. Developers often seek ways to customize badge display, specify badge anchor points, control badge offsets, or toggle badge overlay relative to container edges or text elements, ensuring the badge placement matches UI layout requirements and enhances visibility or aesthetics.
</div>

#### Example

    <button class="k-button">Inline badge <span id="badge-inline"></span></button>
    <button class="k-button">Inside badge <span id="badge-inside"></span></button>
    <button class="k-button">Edge badge <span id="badge-edge"></span></button>
    <button class="k-button">Outside badge <span id="badge-outside"></span></button>
    <script>
        $('#badge-inline').kendoBadge({position: 'inline', themeColor: 'primary'});
        $('#badge-inside').kendoBadge({align: 'top end', position: 'inside', themeColor: 'primary'});
        $('#badge-edge').kendoBadge({align: 'top end', position: 'edge', themeColor: 'primary'});
        $('#badge-outside').kendoBadge({align: 'top end', position: 'outside', themeColor: 'primary'});
    </script>


### rounded  `String` *(default: undefined)*

Specifies the size of the badge. When `undefined` (the default), the theme controls the default border radius. Valid options are `small`, `medium`, `large` and `full`.


<div class="meta-api-description">
How do I control the shape of a Kendo UI badge? Control the shape and size of a badge or label element by configuring its corner curvature and overall dimensions, enabling options for subtle rounded corners, moderate rounding, large rounded edges, or fully pill-shaped designs; adjust compactness and smoothness of curves to fit UI requirements, set visual styles ranging from minimal rounding to completely rounded badges, customize corner radius and sizing for badges, labels, or tags to achieve small, medium, large, or fully rounded appearances, and tailor the visual compactness and roundness to match design themes or accessibility preferences.
</div>

#### Example

    <span id="badge-small">Small badge</span>
    <span id="badge-medium">Medium badge</span>
    <span id="badge-large">Large badge</span>
    <span id="badge-full">Full badge</span>
    <script>
        $('#badge-small').kendoBadge({ rounded: 'small', themeColor: 'primary' });
        $('#badge-medium').kendoBadge({ rounded: 'medium', themeColor: 'primary' });
        $('#badge-large').kendoBadge({ rounded: 'large', themeColor: 'primary' });
        $('#badge-full').kendoBadge({ rounded: 'full', themeColor: 'primary' });
    </script>

### size  `String` *(default: undefined)*

Specifies the size of the badge. When `undefined` (the default), the theme controls the default size. Valid options are `small`, `medium` and `large`.


<div class="meta-api-description">
How do I adjust the size of a Kendo UI badge component? Adjust the visual scale or dimension of a badge component to configure its display size, enabling developers to set the badge as small, medium, or large for different user interface densities, emphasis levels, accessibility needs, or layout consistency; control, enable, or specify compact, default, or prominent badge sizing to fit various design requirements, emphasis priorities, and responsive UI scaling preferences.
</div>

#### Example

    <span id="badge-small">Small badge</span>
    <span id="badge-medium">Medium badge</span>
    <span id="badge-large">Large badge</span>
    <script>
        $('#badge-small').kendoBadge({ size: 'small', themeColor: 'primary' });
        $('#badge-medium').kendoBadge({ size: 'medium', themeColor: 'primary' });
        $('#badge-large').kendoBadge({ size: 'large', themeColor: 'primary' });
    </script>


### template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the content of the badge.


<div class="meta-api-description">
How to customize badge appearance with Kendo UI for jQuery? Control and customize badge appearance by defining a template that formats and binds data dynamically, enabling tailored HTML output and flexible content rendering for badges, including modifying displayed values, adjusting markup structure, and applying custom data-driven layouts or styles.
</div>

#### Example - string template

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            data: {
                current: 2,
                total: 10
            },
            themeColor: 'primary',
            template: '#= current # of #= total #'
        });
    </script>

#### Example - function template

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
            themeColor: 'primary',
            template: function() {
                var text = this.options.text;
                return text > 99 ? 'A lot' : text;
            }
        });
    </script>


### text `String|Number` *(default: '')*

The text of the badge. Valid input includes `string`, `number` or `object` with `toString` method. Default is empty string.


<div class="meta-api-description">
How to customize the content of a Kendo UI badge control? Control and customize the visible label or content of a badge by setting the displayed text, which can be a string, number, or any object convertible to a string representation, enabling flexible formatting and dynamic updates to the badge's content or caption to reflect status, counts, notifications, or descriptive tags.
</div>

#### Example

    <span id="text-badge"></span>
    <span id="notext-badge"></span>
    <script>
        $('#text-badge').kendoBadge({
            themeColor: 'primary',
            text: 'Badge'
        });
        $('#notext-badge').kendoBadge();
    </script>


### themeColor `String` *(default: undefined)*

Specifies the theme color of the component. If `undefined` (the default), the theme controls the default color.

Valid options are

* `inherit`: no coloring will be applied to the badge. Useful when the badge needs to blend-in with the surrounding elements.
* `default`: apply coloring based on surface theme color.
* `primary`:  apply coloring based on **primary** theme color.
* `secondary`: apply coloring based on **secondary** theme color.
* `tertiary`: apply coloring based on **tertiary** theme color.
* `info`: apply coloring based on **info** theme color.
* `success`: apply coloring based on **success** theme color.
* `warning`:apply coloring based on **warning** theme color.
* `error`: apply coloring based on **error** theme color.
* `dark`: apply coloring based on **dark** theme color.
* `light`: always coloring based on **light** theme color.
* `inverse`: depending on the luminance of the theme, light or dark, inverse will be dark or light.


<div class="meta-api-description">
How do I set the color of a Kendo UI badge element using themeColor? Set or customize the badge color styling by configuring theme colors such as primary, secondary, tertiary, info, success, warning, error, dark, light, or inverse to match semantic palettes or inherit colors from surrounding elements. Control visual emphasis, notification status, highlight importance, or blend badges seamlessly with backgrounds by choosing options that enable coloring based on light, dark, default surface, or no color for subtle integration. Enable adaptive color schemes, apply contextual color codes for alerts or statuses, and configure badges to reflect theme luminance for contrasting visibility or minimal distraction in UI design.
</div>

#### Example

    <span id="badge-inherit">Inherit</span>
    <span id="badge-default">Default</span>
    <span id="badge-primary">Primary</span>
    <span id="badge-secondary">Secondary</span>
    <span id="badge-tertiary">Tertiary</span>
    <span id="badge-info">Info</span>
    <span id="badge-success">Success</span>
    <span id="badge-warning">Warning</span>
    <span id="badge-error">Error</span>
    <span id="badge-dark">Dark</span>
    <span id="badge-light">Light</span>
    <span id="badge-inverse">Inverse</span>

    <script>
        $('#badge-inherit').kendoBadge({ themeColor: 'inherit' });
        $('#badge-secondary').kendoBadge({ themeColor: 'secondary' });
        $('#badge-primary').kendoBadge({ themeColor: 'primary' });
        $('#badge-secondary').kendoBadge({ themeColor: 'secondary' });
        $('#badge-tertiary').kendoBadge({ themeColor: 'tertiary' });
        $('#badge-info').kendoBadge({ themeColor: 'info' });
        $('#badge-success').kendoBadge({ themeColor: 'success' });
        $('#badge-warning').kendoBadge({ themeColor: 'warning' });
        $('#badge-error').kendoBadge({ themeColor: 'error' });
        $('#badge-dark').kendoBadge({ themeColor: 'dark' });
        $('#badge-light').kendoBadge({ themeColor: 'light' });
        $('#badge-inverse').kendoBadge({ themeColor: 'inverse' });
    </script>


### visible `Boolean` *(default: true)*

If set to false the badge will not be displayed.


<div class="meta-api-description">
How can I control the visibility of a Kendo UI badge element using jQuery? Control the display and visibility of the badge element by toggling its presence with show, hide, enable, disable, render, or suppress options; set visibility flags or boolean conditions to dynamically manage whether the badge appears, supports conditional rendering scenarios, controls UI indicators, and allows programmers to switch badge visibility on or off based on logic or user interaction.
</div>

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        $('#badge').kendoBadge({
            text: 1234,
            visible: false
        });
    </script>




## Methods


### hide

Hides the badge.


<div class="meta-api-description">
How do I programmatically hide a Kendo UI badge indicator? Control the visibility of a badge indicator by dynamically hiding or concealing its visual marker through programmatic methods to remove or toggle the badge display during runtime, enabling developers to update or manage UI elements conditionally, hide notification dots, disable indicator visibility, or switch badge presence on demand whenever the application state requires suppressing or restoring the badge icon.
</div>

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 'badge'
        }).data('kendoBadge');

        badge.hide();
    </script>


### icon

Sets or gets the icon of the badge.


<div class="meta-api-description">
How do I dynamically change the icon on a Kendo UI badge? Configure, update, or retrieve the visual icon displayed on a badge dynamically during runtime, enabling developers to programmatically set a new icon or get the current icon state for conditional rendering, data binding, interactive UI changes, or real-time visual feedback. This supports use cases such as changing badge symbols based on app state, toggling icons in response to user actions, accessing the icon value for logic decisions, or dynamically customizing UI elements to reflect notifications, statuses, or alerts.
</div>

#### Parameters

##### icon `String`

See [`badge.options.icon`](/api/javascript/ui/badge/configuration/icon) for valid options.

#### Example

Set badge icon after initialization.

    <span id="badge">Badge</span>

    <script>
        var badge = $('#badge').kendoBadge({ icon: 'plus' }).data('kendoBadge');

        window.setTimeout(function() {
            badge.icon('gear');
        }, 1000);
    </script>

### rounded

Sets / gets the badge rounding. See [`badge.options.rounded`](/api/javascript/ui/badge/configuration/rounded) for valid options.


<div class="meta-api-description">
How do I round the corners of a Kendo UI badge element programmatically? Control or retrieve the corner radius and roundness of badge elements programmatically, enabling dynamic adjustment of badge corner styles, configuring rounded corners, toggling or setting the curvature of badges, customizing or querying the current corner roundness or radius on badge components, modifying visual badge edges at runtime, and managing the degree of corner rounding for UI badges via code.
</div>

#### Parameters

##### rounded `String`

The new rounding of the badge.

#### Example

Set badge rounding after initialization.

    <span id="badge">Badge</span>
    <script>
        var badge =  $('#badge').kendoBadge({
            rounded: 'medium',
        }).data('kendoBadge');

        window.setTimeout(function() {
            badge.rounded('full');
        }, 1000);
    </script>


### setOptions

Modifies the initial configuration of the badge


<div class="meta-api-description">
How do I dynamically change the appearance of an existing Kendo UI badge? Modify or update the configuration settings of an existing badge dynamically by changing its appearance, text, behavior, or initialization parameters without needing to recreate or reinitialize the badge component; this method enables runtime adjustments, allowing developers to set, configure, or control badge properties on the fly, such as updating labels, styles, visibility, or interaction features, to reflect new requirements or user actions seamlessly within an application.
</div>

#### Parameters

##### options `Object`

The new options.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 7,
            themeColor:'primary'
        }).data('kendoBadge');

        badge.setOptions({
            text: 1234,
            themeColor: 'error'
        });
    </script>


### show

Shows the badge.


<div class="meta-api-description">
How can I programmatically show hidden badges in Kendo UI for jQuery? Programmatically display or reveal hidden badges, notification counts, status indicators, or visual markers by enabling the badge element’s visibility dynamically after initialization, controlling when badges appear or become visible in the user interface, toggling hidden states to visible, showing badge components on demand, and manipulating badge display through method calls that update or change visibility in the DOM.
</div>

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 'badge',
            visible: false
        }).data('kendoBadge');

        badge.show();
    </script>


### text

Sets / gets the text of the badge.


<div class="meta-api-description">
How can I dynamically update the text of a Kendo UI badge using jQuery? Set, update, modify, or retrieve the visible label, caption, or displayed text of a badge dynamically during runtime, enabling developers to programmatically control the badge’s content for real-time changes, conditional logic, event handling, UI updates, accessibility verification, or data binding scenarios. This method supports changing or reading the badge text on the fly, fetching the current label for logic decisions, or adjusting the display based on user interaction or system state, ensuring flexible and dynamic text management within user interfaces.
</div>

#### Parameters

##### text `String|Number`

The new text of the badge.

#### Example

    <button>Button <span id="badge"></span></button>
    <script>
        var badge =  $('#badge').kendoBadge({
            text: 7,
        }).data('kendoBadge');

        badge.text('badge');
    </script>


### themeColor

Sets or gets the theme color of the badge.


<div class="meta-api-description">
How to dynamically change the color of a Kendo UI badge element? Configure, modify, or retrieve the visual theme color of badge elements dynamically to control appearance and styling during runtime, including setting new color values, reading current theme hues, customizing badge highlights programmatically, adjusting palette or color schemes on the fly, querying the present color state, toggling theme shades, and seamlessly integrating color updates within application workflows or UI refresh cycles.
</div>

#### Parameters

##### themeColor `String`

See [`badge.options.themeColor`](/api/javascript/ui/badge/configuration/themecolor) for valid options.

#### Example

Set badge theme color after initialization.

    <span id="badge">Badge</span>

    <script>
        var badge = $('#badge').kendoBadge({ themeColor: 'secondary' }).data('kendoBadge');

        window.setTimeout(function() {
            badge.themeColor('primary');
        }, 1000);
    </script>
