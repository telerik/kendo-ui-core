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


<div class="meta-api-description">
How do I hide step indicators in Kendo UI Stepper? Configure whether to show or hide the step indicator icons or numeric badges above each step label in a multi-step navigation or progress component, controlling the visibility of circle icons, step numbers, visual markers, or labels that represent the current step status, enabling disabling or toggling these indicators for step navigation bars, progress trackers, or wizard-style user interfaces during setup or runtime.
</div>

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


<div class="meta-api-description">
How to hide step titles in Kendo UI Stepper widget? Configure the display of step labels beneath step indicators, toggle visibility of step titles or captions, enable or disable showing descriptive text for each progress point or milestone, control label rendering in multi-step navigation or form steps, adjust whether step names appear under circles or markers in a sequence, manage visibility of step annotations or identifiers in step-based workflows, customize showing or hiding textual step indicators below step icons, set presentation of labels in step progress components for clarity or minimalism, control labeling features to enhance user guidance in sequential UI elements.
</div>

#### Example

	<nav id="stepper"></nav>

	<script>
        $("#stepper").kendoStepper({
            label: false,
            steps: ["Initial step", "Second step", "Third step"]
        });
	</script>

### linear `Boolean` *(default: true)*

Indicates whether the **Stepper** will force the user to follow the Steps sequence or not. If set to "false" it will allow the user to select any step. If in its default state ("true") the user will be able to select the step immediately after the currently selected step or the previous step.


<div class="meta-api-description">
How to make a Kendo UI stepper enforce sequential navigation? Configure whether a step-by-step process enforces strict sequential navigation or allows free movement between steps, controlling if users can jump directly to any step or must proceed in order. Set or toggle linear progression to require moving through steps one by one without skipping ahead, or disable linear mode to enable random access to any step at any time. Control navigation flow in multi-step interfaces, enabling step locking, sequential progression, or free step selection for workflows that need ordered completion versus flexible step jumps. Manage stepper navigation behavior to enforce step dependencies, restrict skipping steps, or allow non-linear step selection and direct step access in step-based forms and wizards.
</div>

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


<div class="meta-api-description">
How to set up a horizontal layout for a Kendo UI stepper component? Control the direction or layout flow of a multi-step user interface component by setting its orientation to vertical or horizontal, enabling customization of step arrangement, visual stacking, and navigation flow to suit different design patterns, UX preferences, or screen layouts, including toggling between vertical columns or horizontal rows for progress indicators, stepper navigation, or wizard-like interfaces; set or configure the flow direction to optimize user experience, responsiveness, or visual grouping in multi-step forms, progress tracking, or guided workflows.
</div>

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


<div class="meta-api-description">
How to configure keyboard navigation in Kendo UI Stepper to automatically select a step when focused? Control whether keyboard navigation in a stepper component automatically updates the current active step upon focusing a new step or if users must explicitly confirm selection with keys like Enter or Spacebar; configure immediate selection as focus moves or require manual activation for changing steps during keyboard-only interaction, enabling customization of keyboard usability, accessibility behavior, and step navigation control to suit various input workflows and user preferences for step selection and focus handling.
</div>

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


<div class="meta-api-description">
How do I configure the steps in a Kendo UI Stepper widget? Configure the order and titles of steps in a multi-step process by setting a list or array of step definitions, which can be simple labels as strings or detailed objects specifying each step's title and metadata, enabling you to control and customize the progression, sequence, and display of step indicators in workflows, wizards, or progress trackers.
</div>

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


<div class="meta-api-description">
How to enable specific steps in Kendo UI Stepper? Control the activation state of individual steps within a multi-step navigation or form wizard by enabling or disabling specific steps to manage user access, interaction, focus, or navigation flow; configure which steps are accessible or locked, allowing you to set active or inactive stages, prevent skipping, restrict progression, or toggle step availability dynamically during initialization or runtime, to customize user journeys, guide workflow, or implement conditional step activation in step-based interfaces.
</div>

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


<div class="meta-api-description">
How to mark individual steps as failed in Kendo UI Stepper widget? Control and configure the invalid or error state of individual steps in a multi-step process or wizard by enabling or disabling error flags that mark steps as failed validation, invalid, or requiring user attention, affecting both validation logic and visual error indicators; set or update boolean error statuses dynamically during initialization or runtime to highlight steps with issues, failed checks, input mistakes, or incomplete information, allowing developers to manage step validity, display error styles, control workflow progression based on step correctness, and indicate which steps need fixing or review.
</div>

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


<div class="meta-api-description">
How do I change the icon in my Kendo UI Stepper step indicator? Set or customize the icon displayed inside a step indicator by configuring the step’s icon name from the available themed icon sprite or web font icons, enabling you to control which symbol or graphic appears within the step marker, adjust visual cues for progress steps, or integrate specific icons representing step status, type, or action in workflows and navigation components.
</div>

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


<div class="meta-api-description">
How to customize the icon display in Kendo UI Stepper? Control and customize the rendering of step indicator icons in multi-step navigation components by defining templates that dynamically generate icon markup based on step properties such as label text, custom icons, success icons, and states including enabled or disabled, error presence, selection status, and step position indicators like first or last step. Enable flexible icon display and styling that reacts to step metadata, selection sequence, visibility toggles for icons and labels, and index order to tailor step indicators according to application workflow, user progress tracking, error highlighting, and UI consistency preferences. Support scenarios involving custom icon binding, conditional rendering based on step state, and adaptive UI elements for user onboarding, process flows, and wizard-style navigation interfaces.
</div>

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


<div class="meta-api-description">
How do I change the label of each step in a Kendo UI Stepper widget? Set or customize the visible text, caption, or title displayed on each step within a multi-step process or wizard interface, enabling control over step labels, step titles, step captions, step descriptions, or step headers. Configure, update, or change the displayed string for individual steps in a stepper or progress indicator to provide clear, concise, or descriptive names that appear in navigation steps, guided user flows, or multi-stage forms. Adjust text shown on each step to improve usability, clarity, or user guidance in step-based UI components.
</div>

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


<div class="meta-api-description">
How to set default active step in Kendo UI Stepper widget? Set or configure the currently active or highlighted step within a multi-step process or wizard interface, enabling initialization of the starting step or dynamic updating of the selected state to control which step is focused, marked as active, chosen, or enabled at any given time in a sequence. Adjust, toggle, or manage the selection state of steps programmatically or declaratively to guide user progress, indicate the current position, or switch between steps in a stepper component, wizard flow, or multi-stage navigation system.
</div>

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


<div class="meta-api-description">
How do I customize the icon displayed when a step is completed successfully in Kendo UI Stepper? Customize or set the icon displayed within a multi-step progress indicator when a step is completed successfully without errors by specifying an icon name from a predefined icon library or theme sprite. Control the visual representation of completed steps by choosing from existing themed icons or font icons to enhance stepper UI elements, indicating prior steps that passed validation or finalized states. Enable or configure success status icons within step indicators to clearly show progression, completion markers, or error-free checkpoints using a standardized icon set reference. This feature supports defining or overriding default icons to improve user interface feedback in multi-step workflows, wizards, or progress bars.
</div>

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


<div class="meta-api-description">
How do I enable or disable all steps in my Kendo UI stepper control at once? Control, toggle, or set the enabled status of all steps within a stepper interface programmatically to activate or deactivate user navigation and interaction simultaneously across each step. Configure step accessibility dynamically by enabling or disabling multiple steps at once, affecting the entire stepper's state for immediate UI and behavioral updates after initialization. Adjust stepper steps collectively to permit or restrict user flow through the sequence, manage step activation through code, and synchronize step state changes all at once for streamlined step control in workflows or multi-step processes.
</div>

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


<div class="meta-api-description">
How to dynamically insert a new step at a specific position in Kendo UI Stepper? Insert or add a step dynamically at a specific position within a multi-step process, enabling real-time reordering or extension of steps based on user input, app state changes, or programmatic control, allowing modification of the step sequence by specifying the exact index where the new step should appear, automatically adjusting the order and updating the internal list of steps so that the interface reflects the changes immediately, supporting scenarios like conditional steps, interactive workflows, and dynamic step management after the initial setup.
</div>

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


<div class="meta-api-description">
How to programmatically advance the current selection in a Kendo UI stepper component? Control progression to the subsequent step in a multi-step interface, programmatically move forward through a series of stages, advance the current selection to the next stage, trigger step transitions in a step-based workflow, navigate to the following step in sequential processes, increment the active step in a stepper component, set the selection to proceed forward, enable automated step advancement, update the current position to the next step programmatically, and manage step state changes for forward navigation in step-driven user interfaces.
</div>

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


<div class="meta-api-description">
How do I use Kendo UI Stepper's previous method to navigate back through steps? Navigate to the prior step, move backward through steps, go to the previous selection, set the active step one position before the current, control stepper navigation by moving back a step, update and render the prior step in a multi-step process, enable reverse step traversal, change the current step to the earlier one, handle stepping backwards in sequences, and manage selection state updates when moving to the preceding step.
</div>

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


<div class="meta-api-description">
How to remove a specific step from a Kendo UI stepper widget by its index? Remove or delete a step from a multi-step process or wizard by specifying its position or index, supporting dynamic modification of steps during runtime, enabling runtime alteration of step sequences, controlling step list by removing unwanted or completed steps programmatically, updating the user interface to reflect step removal, managing progress flow by excising steps based on user interaction or conditions, adjusting or editing step sequences without rebuilding the entire component, supporting scenarios where steps need to be removed due to logic or user choices.
</div>

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

Recalculates the dimensions of the underlying ProgressBar indicating the Stepper progress. Should be used when changing width/height of the widget element, its parent, or when removing a "display: none;" style from one of those elements. Should always be called if the **Stepper** is initialized in a hidden container right after the container was made visible.


<div class="meta-api-description">
How do I update a Kendo UI Stepper's progress indicator dimensions after resizing its container? Trigger recalculation and update of progress indicator dimensions and visuals to ensure accurate rendering after changes in layout, element size, container visibility, or style adjustments; force progress bar resizing when dynamically modifying width, height, parent container size, or toggling display properties to maintain correct visual progress representation and sync progress indicator positioning with current component or container dimensions following hide/show operations or resizes.
</div>

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

Selects a Step that is present at a given index. If used without parameter returns the currently selected [`Step`](/api/javascript/stepper/step) instance.


<div class="meta-api-description">
How do I select a specific step in a Kendo UI Stepper widget? Control or query the currently active step within a multi-step workflow or progress indicator by selecting a specific step via index or retrieving the existing active step instance. Enable programmatic navigation and dynamic step changes in wizard components, step navigators, or sequential form flows by setting or getting the selected step, adjusting the current position in a stepper interface, or reading which step is highlighted during runtime to manage user progression, step selection state, or conditional step transitions.
</div>

#### Parameters

##### index `Number` *optional*

The index of the Step which should be selected.

#### Returns `kendo.stepper.Step`

`Step` The currently selected [`Step`](/api/javascript/stepper/step) instance.

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


<div class="meta-api-description">
How can I dynamically change the settings of my Kendo UI stepper component during runtime? Modify or update the configuration and settings of a stepper component dynamically during runtime without reloading or recreating the component, enabling developers to change its behavior, appearance, or functional options on the fly by passing new parameters or option objects that adjust the step sequence, navigation controls, step indicators, validation rules, or styling. Adjust stepper properties, toggle enabled features, update step labels or progression logic, reconfigure animation or transition effects, and control how the stepper responds to user input or validation requirements seamlessly within an active application context.
</div>

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


<div class="meta-api-description">
How do I dynamically change the order of steps in a Kendo UI stepper control? Access or modify the sequence of steps in a multi-step interface, retrieve the current array of step definitions or provide a new set to dynamically change step order, labels, properties, or configuration in a stepper control. Adjust the workflow steps programmatically, update step metadata, control progression stages, configure step names or details, reset or replace existing steps, and fetch the active list of step settings to customize the user flow and stepper behavior within an application.
</div>

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


<div class="meta-api-description">
How do I handle activation events in Kendo UI stepper component? Detect or handle changes in the stepper component when a user selects a different step through clicking, touching, or keyboard input by capturing activation events that signal a step switch. Enable event listeners or callbacks to trigger actions such as loading new content, validating user input, updating application state, progressing to the next stage, or navigating through multi-step workflows upon user-driven step selections. Monitor and respond to step activation signals for dynamic step transitions and interactive stepper control, ensuring responsive UI updates or business logic execution whenever users move between steps.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.step);
            }
        });
	</script>

### select

Fires when the user clicks on a Step to select it.


<div class="meta-api-description">
How do I handle user selection of steps in a Kendo UI Stepper widget? Capture user interactions when a specific step or stage is chosen within a multi-step process or wizard by detecting clicks or selections on individual steps, enabling the execution of custom code, triggering navigation changes, synchronizing UI components, updating application state, or handling step transitions based on user input or programmatic control. This event supports monitoring which step is active or selected, allowing developers to respond to step changes, manage flow control, implement step validation triggers, or coordinate progress indicators and dynamic content updates during step selection.
</div>

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
