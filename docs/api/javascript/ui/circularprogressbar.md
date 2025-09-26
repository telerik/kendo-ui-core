---
title: CircularProgressBar
page_title: Configuration, methods and events of Kendo UI CircularProgressBar
description: Learn the configuration options for Circular Progressbar widget, use methods properly.
res_type: api
component: circularprogressbar
---

# kendo.ui.CircularProgressBar

## Configuration

### ariaRole `Boolean` *(default: false)*

If set to `true` the Circular ProgressBar will have its `role` attribute set to `progressbar`. It will also render its `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes.


<div class="meta-api-description">
Control accessibility support for circular progress indicators by configuring ARIA roles and attributes to make progress values perceivable by screen readers and assistive technologies, including setting roles like progressbar and defining aria-valuemin, aria-valuemax, and aria-valuenow attributes to communicate current progress status for users relying on voiceover or other accessibility tools.
</div>

#### Example

    <label id="label">This is the label</label>
    <div id="progressbar"></div>
    <script>
		$("#progressbar").kendoCircularProgressBar({
			labelId: "label",
            value: 50,
			ariaRole: true
		});
    </script>

### centerTemplate `String|Function`

The template that will be displayed in the center of the progress bar.
Template variables:
*   **value** - the value
*   **color** - the matching color for the value


<div class="meta-api-description">
Customize the middle area of a circular progress indicator by inserting personalized HTML or JavaScript content that dynamically adapts to the current progress value and its corresponding color, allowing developers to display formatted data, percentages, labels, icons, or any custom visuals inside the center. This includes configuring templates with binding capabilities for progress metrics and color schemes, enabling tailored display of progress state, captions, or additional contextual information directly within the indicator’s core area during setup or runtime.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 30,
        centerTemplate: '<span style="color: #: color #;">#: value #%</span>'
     });
    </script>

### color `String`

The color of the value pointer. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Customize the pointer color of a circular progress indicator by specifying any valid CSS color format such as hex, RGB, or named colors; this enables theming, brand alignment, visual state signaling, dynamic color changes, and styling control of the progress pointer in progress bars or loaders.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 70,
        color: "#ff6358"
     });
    </script>

### colors `Array`

The color ranges of the value pointer. The pointer color will be set to the color from the range that contains the current value.


<div class="meta-api-description">
Set up dynamic color transitions for progress indicators by mapping numeric values to specific color ranges, enabling visual feedback where the progress pointer changes color based on thresholds, value intervals, or status levels. Customize color mappings to highlight different states, represent varying value zones, or create intuitive range-based alerts, allowing configurations that associate progress values with precise colors for enhanced visual distinction and real-time status signaling in circular progress displays. This feature supports flexible control over pointer color changes triggered by numeric thresholds, range assignments, or condition-based color coding in circular progress elements.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 30,
        colors: [{
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 50,
            color: '#37b400'
        }, {
            from: 50,
            to: 75,
            color: '#ffc000'
        }, {
            from: 75,
            color: '#f31700'
        }]
     });
    </script>

### colors.color `String`

The color of the pointer in the specified range.


<div class="meta-api-description">
Customize the pointer hue or tint for distinct segments within a circular progress indicator by specifying colors using CSS formats like hex codes, RGB/A values, or named colors to visually differentiate value ranges or progress sections. This enables control over the appearance of progress arcs or pointers, letting you set, change, configure, or enable specific coloration for parts of a circular loading or progress UI element to highlight or distinguish ranges effectively. Adjust the pointer’s color dynamically or statically for visual clarity, emphasis, or thematic alignment in circular progress displays or radial progress bars where multiple ranges or thresholds need unique color identification.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 40,
        colors: [{
            to: 50,
            color: '#e74c3c'
        }, {
            from: 50,
            color: '#2ecc71'
        }]
     });
    </script>

### colors.from `Number`

The lower range value of the applied color.


<div class="meta-api-description">
Configure the initial or starting color for a progress indicator’s color gradient, control the lower threshold or baseline color range in circular or radial progress bars, define where the color transition begins from the minimum or starting point, set or customize the beginning hue in color ranges for progress visualization, adjust the base or first color to influence how progress colors appear at the start, enable precise control over the initial shade in gradient fills for circular progress components, specify the lower boundary color to manage how progress color scales or interpolates from zero or the starting progress value.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 60,
        colors: [{
            from: 0,
            to: 30,
            color: '#e74c3c'
        }, {
            from: 30,
            to: 70,
            color: '#f39c12'
        }, {
            from: 70,
            to: 100,
            color: '#2ecc71'
        }]
     });
    </script>

### colors.to `Number`

The upper range value of the applied color.


<div class="meta-api-description">
Set or configure the upper limit, boundary, or maximum threshold of a color stop or range in a circular progress indicator, controlling where a specific color ends or transitions within the progress arc. Adjust the endpoint for applying colors in gradient or segmented circular progress bars to define the maximum value at which a particular hue, shade, or color appears, enabling customization of color ranges, stops, and transitions for visual progress representation. Use this to determine cutoff points for color segments in circular progress visuals, specify the top value in color mapping, or control how colors are distributed along the progress range.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 25,
        colors: [{
            from: 0,
            to: 25,
            color: '#e74c3c'
        }, {
            from: 25,
            to: 75,
            color: '#f39c12'
        }, {
            from: 75,
            to: 100,
            color: '#2ecc71'
        }]
     });
    </script>

### label `String`

The label that would be used as a `aria-label` for the Circular ProgressBar element. Will be applied only if `ariaRole` is set to `true`.


<div class="meta-api-description">
Configure or set the accessible label text for a circular progress indicator to improve screen reader identification and accessibility, controlling the descriptive text that assistive technologies announce when the progress bar is active or loading, enabling you to specify or customize the aria-label for better support with voiceover, screen readers, or other accessibility tools, and ensuring that the progress bar element communicates its purpose or status clearly when enabled for accessibility roles.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
		$("#progressbar").kendoCircularProgressBar({
			label: "label",
            value: 30,
			ariaRole: true
		});
    </script>

### labelId `String`

The ID of the element that will be used as a label of the Circular ProgressBar. Will be used as a value of the `aria-labelledby` attribute. Will be applied only if `ariaRole` is set to `true`.


<div class="meta-api-description">
Assign or configure the accessible label element ID to associate with the circular progress indicator for screen reader support, link the progress circle to descriptive text using aria-labelledby attributes, enable or set the ID reference for accessibility labeling, control which element provides the accessible name to assistive technologies, specify the label element’s unique identifier to improve ARIA compliance and accessibility, connect the progress bar to a visible or invisible textual label via ID for accessibility tools when ARIA roles are active, customize or set the ID that references the external label element for circular loading indicators in web components.
</div>

#### Example

	<label id="label">This is the label</label>
    <div id="progressbar"></div>
    <script>
		$("#progressbar").kendoCircularProgressBar({
			labelId: "label",
            value: 30,
			ariaRole: true
		});
    </script>

### opacity `Number`

The opacity of the value pointer.


<div class="meta-api-description">
Adjust the transparency level, alpha value, or fade intensity of the indicator pointer within a circular progress visualization to make it more or less visible, allowing control over the prominence, subtlety, or highlight of the progress marker by setting its opacity, translucency, or blend strength.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
		$("#progressbar").kendoCircularProgressBar({
			opacity: 0.5,
            value: 50
		});
    </script>

### theme `String` *(default: "sass")*

The circularProgressBar theme. With versions prior to R1 2023 this can be either the respective LESS theme from the list below or "sass".
When set to "sass" the circularProgressBar will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

Note: Since Q2 2024 release, the default value for the `theme` property is "sass" instead of "default". It is recommended to use "sass" with version Q2 2024 or later.

The supported values are:

* "sass"
* "black"
* "blueopal"
* "bootstrap"
* "default"
* "highcontrast"
* "metro"
* "metroblack"
* "moonlight"
* "silver"
* "uniform"


<div class="meta-api-description">
Customize and control the color schemes and styling modes of the circular progress indicator by selecting from predefined themes or enabling Sass variable usage for dynamic styling updates, including options like black, blueopal, bootstrap, high contrast, metro, moonlight, silver, and others; switch between Sass-based theming or legacy LESS configurations to set visual appearance, adapt to different branding requirements, override default color sets, toggle theme reading methods, and manage compatibility across versions starting from Q2 2024 where Sass theming is preferred for consistent and customizable design.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        indeterminate: true,
        theme: "blueopal"
     });
    </script>

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.


<div class="meta-api-description">
Control seamless or instant animation effects when progress updates on circular progress indicators, enabling smooth transitions or disabling animations to optimize performance and user experience, configure whether progress changes animate fluidly or update immediately without delay, manage visual behavior of loading spinners with animated or static progress shifts, set transition effects on circular progress bars to enhance UI responsiveness or reduce rendering overhead during progress value changes, toggle smooth progress movement or direct jumps to new values for refined interface interactions and performance tuning.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 30,
        transitions: false,
        centerTemplate: '#: value #%'
     });
    </script>

### indeterminate `Boolean`*(default: true)*

A value indicating whether endloess loading is enabled


<div class="meta-api-description">
Control or configure continuous, endless loading animations that visually represent ongoing processes without defined progress or completion percentages, enabling indefinite spinning or looping indicators to signal operations in progress; toggle or set a boolean state to switch between determinate progress display and an indeterminate loading spinner, useful for asynchronous tasks, background activity, or unknown-duration events requiring visual feedback that something is actively running without measurable progress.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        indeterminate: true
     });
    </script>

### pointerWidth `Number`*(default: true)*

A value indicating how wide will the pointer be


<div class="meta-api-description">
Adjust the thickness, width, or stroke size of the circular progress indicator's pointer to customize its visual appearance, enabling control over how bold, slim, or prominent the pointer line or bar appears within the circular progress display. This setting can be configured to fine-tune the pointer’s size for design consistency, accessibility requirements, or layout integration, allowing developers to set, modify, or style the edge thickness of the progress pointer to match various UI styles, themes, or user preferences.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        pointerWidth: 15,
        indeterminate: true
     });
    </script>

### value `Number`

The component value.

> **Note:** The value should be a number between 0 and 100.


<div class="meta-api-description">
Adjust or bind the current progress percentage to control or update the circular progress indicator’s fill or completion state, enabling dynamic visualization of task status, progress tracking, or percentage-based animations in user interfaces. Configure, set, or modify the progress value as a numeric input ranging from zero to one hundred to reflect completion levels, progress updates, or real-time changes in progress bars, spinners, or circular loaders. Use this value to drive rendering, animate transitions, display progress milestones, or represent status indicators in workflows, tasks, uploads, downloads, or any processes requiring visual percentage completion.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        value: 30,
        centerTemplate: '#: value #%'
     });
    </script>

## Methods

### redraw

Redraws the progressbar.


<div class="meta-api-description">
Trigger an immediate refresh or re-render of the circular progress indicator to update its visual appearance, forcing the component to recalculate layout, styles, size, and progress values after dynamic or programmatic changes; use this to manually redraw or repaint the progress circle whenever you alter its configuration, appearance, or current progress state to ensure the display stays in sync and reflects the latest properties without waiting for automatic updates or user interaction.
</div>

#### Example
    <div id="progressbar"></div>
    <script>
    $("#progressbar").kendoCircularProgressBar({
        value: 50
    });
    setTimeout(function(){
        var progressbar = $("#progressbar").data("kendoCircularProgressBar");
        progressbar.redraw();
    },1000)
    </script>

### resize

Adjusts the widget layout to match the size of the container.


<div class="meta-api-description">
Adjust or update the progress indicator's dimensions and layout dynamically to fit container size changes, triggering recalculation of rendering, redrawing visual arcs, reflowing after CSS modifications, resizing parent elements, or when responsive layouts cause dimension shifts. Enable automatic or manual re-layout, refresh the circular progress display, scale graphics to new container sizes, and ensure visuals stay properly aligned and proportioned after window resizing, style updates, or dynamic UI changes that alter the component’s size or positioning.
</div>

#### Example
    <div id="progressbar" style="width: 100px; height: 100px;"></div>
    <script>
        $("#progressbar").kendoCircularProgressBar({
            value: 50
        });

        $("#progressbar").css({ width: "200px", height: "200px" })
            .data("kendoCircularProgressBar").resize();
    </script>

### setOptions

Sets the current component options.


<div class="meta-api-description">
Adjust, update, or modify the circular progress indicator's configuration dynamically during runtime by setting new parameters or options to control appearance, style, animation speed, progress color, size, thickness, and behavior without recreating or resetting the component. Enable programmatic changes to the progress bar's properties such as fill, stroke, value, or animation options instantly, allowing real-time customization, reconfiguration, or theming of the circular progress display in response to user actions, events, or application state changes. This method supports overriding, merging, or replacing existing settings with new ones to achieve flexible control of the circular progress widget’s look and feel on the fly.
</div>

#### Parameters

##### options `Object`

The component settings to update.

#### Example

    <div id="progressbar" style="width: 100px; height: 100px;"></div>
    <script>
        $("#progressbar").kendoCircularProgressBar({
            value: 50
        });

         setTimeout(function(){
            var progressbar = $("#progressbar").data("kendoCircularProgressBar");
            progressbar.setOptions({ indeterminate: true });
        },1000)
    </script>

### value

Gets or sets the value of the component.

> **Note:** The value should be a number between 0 and 100.


<div class="meta-api-description">
Retrieve or set the current progress percentage or numeric value of a circular progress indicator, controlling and updating the displayed completion level from 0 to 100. This method supports reading the current state without arguments or assigning a new numeric progress, enabling developers to track, adjust, or modify progress dynamically, configure progress updates programmatically, monitor or modify progress values in loops or events, and integrate progress control in UI components or loading indicators with precise numeric input or output for real-time status feedback.
</div>

#### Example

    <div id="progressbar"></div>
    <script>
        $("#progressbar").kendoCircularProgressBar({
            value: 20
        });

        setTimeout(function(){
            $("#progressbar").data("kendoCircularProgressBar").value(50);
        },1000);
    </script>
