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

### colors `Array`

The color ranges of the value pointer. The pointer color will be set to the color from the range that contains the current value.

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

### colors.from `Number`

The lower range value of the applied color.

### colors.to `Number`

The upper range value of the applied color.

### label `String`

The label that would be used as a `aria-label` for the Circular ProgressBar element. Will be applied only if `ariaRole` is set to `true`.

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

#### Example

    <div id="progressbar"></div>
    <script>
		$("#progressbar").kendoCircularProgressBar({
			opacity: 0.5,
            value: 50
		});
    </script>

### theme `String`

The gauge theme. This can be either a built-in theme or "sass".
When set to "sass" the gauge will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

The supported values are:

* "sass" - special value, see notes
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

    <div id="progressbar"></div>
    <script>
     $("#progressbar").kendoCircularProgressBar({
        indeterminate: true
     });
    </script>

### pointerWidth `Number`*(default: true)*

A value indicating how wide will the pointer be

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
