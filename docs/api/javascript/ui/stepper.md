---
title: Stepper
description: Configuration, methods and events of the Kendo UI Stepper
res_type: api
component: stepper
---

# kendo.ui.Stepper

Represents the Kendo UI Stepper widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### indicator `Boolean` *(default: true)*

Indicates whether the Steps in the **Stepper** will render their indicator element (the icon or number placed in a circle above the Step label).

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            indicator: false,
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### label `Boolean` *(default: true)*

Indicates whether the Steps in the **Stepper** will render their label element (the text placed below the Step indicator circle).

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            label: false,
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### linear `Boolean` *(default: true)*

Indicates whether the **Stepper** will force the user to follow the Steps sequence or not. If set to "false" it will allow the user to select any step. If in its default state ("true") the user will be able to select the step immediately after the currently selected step or any previous step.

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            linear: false,
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### orientation `String` *(default: "horizontal")*

Indicates whether the **Stepper** will be rendered vertically or horizontally (default).

#### Example

	<nav id="stepper" style="height: 600px"></nav>

	<script>
        $("#stepper").kendoStepper({
            orientation: "vertical",
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### selectOnFocus `Boolean` *(default: false)*

Applicable for scenarios when keyboard is used for navigation. Indicates whether the selection will change upon focus change or it will require additional action (Enter or Spacebar key press) in order to select the focused step.

#### Example

	<nav id="stepper"></nav>
    <p>Use the keyboard arrow keys to change selected step.</p>

	<script>
        $("#stepper").kendoStepper({
            selectOnFocus: true,
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### steps `Array`

Array of steps to be rendered in the **Stepper**. If the array contains objects, their fields will be used for each Step. If the array contains strings, those will be used as Step labels.

#### Example - steps defined as array of strings

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

#### Example - steps defined as array of objects

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        });
	</script>

### steps.enabled `Boolean` *(default: true)*

Defines whether the Step is enabled or not. By default all steps are enabled.

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step",
                enabled: false
            },{
                label: "Third step"
            }]
        });
	</script>

### steps.error `Boolean` *(default: false)*

Defines whether the Step is in error state (is invalid). By default all steps are valid.

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step",
                error: true
            },{
                label: "Third step"
            }]
        });
	</script>

### steps.icon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be displayed in the indicator element of that Step.
For a list of available icon names, please refer to the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step",
                icon: "cancel"
            },{
                label: "Third step"
            }]
        });
	</script>

### steps.iconTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the icon in the indicator of the step.

The fields which can be used in the template are:

* label `String` - the label set on the step
* icon `String` - the icon specified for this step (if any)
* successIcon `String` - the successIcon specified for this step (if any)
* enabled `Boolean` - indicates whether the step is enabled (true) or disabled (false)
* error `Boolean` - indicates whether the step has error (true) or not (false)
* selected `Boolean` - indicates whether the step is selected
* previous `Boolean` - indicates whether the step is before the currently selected or not
* index `Number` - a zero-based index of the current step
* isFirstStep `Boolean` - indicates whether the step is the initial one in the Stepper
* isLastStep `Boolean` - indicates whether the step is the last one in the Stepper
* indicatorVisible `Boolean` - indicates whether the indicator, which holds the icon should be displayed or not
* labelVisible `Boolean` - indicates whether the label section of the step should be displayed or not

#### Example - Use a string template

    <nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "ONE"
            }, {
                label: "TWO",
                iconTemplate: "<strong>#:label#</strong>"
            },{
                label: "THREE"
            }]
        });
	</script>

#### Example - Use a function

    <nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "ONE"
            }, {
                label: "TWO",
                iconTemplate: function(e) {
                    return '<strong>' + e.label + '</strong>';
                }
            },{
                label: "THREE"
            }]
        });
	</script>


### steps.label `String`

Defines the label (text) of the Step.

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        });
	</script>

### steps.selected `Boolean` *(default: false)*

Defines whether the Step is selected.

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step",
                selected: true
            },{
                label: "Third step"
            }]
        });
	</script>

### steps.successIcon `String`

Defines a name of an existing icon in the Kendo UI theme sprite. The icon will be displayed in the indicator element of that Step, when the step is a previous one and it does not have an error.
For a list of available icon names, please refer to the [Web Font Icons article](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web).

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step",
                successIcon: "plus"
            },{
                label: "Third step",
                selected: true
            }]
        });
	</script>

## Methods

### enable

Enables or disables all steps in the **Stepper**.

#### Parameters

##### value `Boolean`

Specifies whether the steps should be enabled (true) or disabled (false).

#### Example

	<nav id="stepper"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.enable(false);
	</script>

### insertAt

Inserts a new Step at a given index.

#### Parameters

##### index `Number`

The index at which the Step should be inserted.

##### step `Object`

A Step configuration object to be inserted at the specified index.

#### Example

	<nav id="stepper"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.insertAt(1, {
            label: "Inserted"
        });
	</script>

### next

Selects the step which is immediately after the currently selected step.

#### Example

	<nav id="stepper"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step",
                selected: true
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.next();
	</script>

### previous

Selects the step which is immediately before the currently selected step.

#### Example

	<nav id="stepper"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step",
                selected: true
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.previous();
	</script>

### removeAt

Removes a Step that is present at a given index.

#### Parameters

##### index `Number`

The index of the Step that should be removed.

#### Example

	<nav id="stepper"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.removeAt(1);
	</script>

### resize

Recalculates the dimensions of the underlying PrgressBar indicating the Stepper progress. Should be used when changing width/height of the widget element, its parent, or when removing a "display: none;" style from one of those elements. Should always be called if the **Stepper** is initialized in a hidden container right after the container was made visible.

#### Example

	<nav id="stepper"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

        $("#stepper").width(500);
		stepper.resize();
	</script>

### select

Selects a Step that is present at a given index. If used without parameter returns the currently selected `[Step](/api/javascript/stepper/step)` instance.

#### Parameters

##### index `Number` *optional*

The index of the Step which should be selected.

#### Returns `kendo.stepper.Step`

`Step` The currently selected `[Step](/api/javascript/stepper/step)` instance.

#### Example

	<nav id="stepper"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.select(1);
	</script>

### setOptions

Modifies the initial configuration of the **Stepper** widget.

#### Parameters

##### options `Object`

The new **Stepper** options.

#### Example

	<nav id="stepper" style="height:400px"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.setOptions({
            orientation: "vertical",
            steps: [{
                label: "Reset 1"
            },{
                label: "Reset 2",
                selected: true
            }]
        });
	</script>

### steps

Returns the Step Array configured in the Stepper. If used with an Array parameter, alters the steps in the widget according to the passed configuration of the steps.

#### Parameters

##### steps `Array` *optional*

Array of steps to be rendered in the **Stepper**.

#### Returns `Array`

`Array[Step]` The [Step](/api/javascript/stepper/step) instances available in the **Stepper** widget.

#### Example

	<nav id="stepper" style="height:400px"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }]
        }).getKendoStepper();

		stepper.steps([{
            label: "Reset 1"
        },{
            label: "Reset 2",
            selected: true
        }]);
	</script>

## Events

### activate

Fires when a new Step has been selected upon user interaction.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Stepper`

The **Stepper** instance that triggered the event.

##### e.step `kendo.stepper.Step`

The [Step](/api/javascript/stepper/step) instance that has been selected.

#### Example

	<nav id="stepper" style="height:400px"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }],
            activate: function(e) {
                console.log(e.step);
            }
        });
	</script>

### select

Fires when the user clicks on a Step to select it.

#### Event Data

##### e.originalEvent `Object`

The original DOM event.

##### e.sender `kendo.ui.Stepper`

The **Stepper** instance that triggered the event.

##### e.step `kendo.stepper.Step`

The [Step](/api/javascript/stepper/step) instance that is about to be selected.

##### e.preventDefault `Function`

If invoked prevents the selection.

#### Example

	<nav id="stepper" style="height:400px"></nav>

	<script>
        var stepper = $("#stepper").kendoStepper({
            steps: [{
                label: "Initial step"
            }, {
                label: "Second step"
            },{
                label: "Third step"
            }],
            select: function(e) {
                // The Stepper will not allow user selection
                e.preventDefault();
            }
        });
	</script>
