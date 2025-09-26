---
title: Step
page_title: Configuration, methods and events of Kendo UI Stepper Step Instance object
res_type: api
---

# kendo.stepper.Step

Represents a step in the [Stepper](/api/javascript/ui/stepper) widget.

## Fields

## element `jQuery`

The jQuery element representing the step

## Methods

### deselect

Deselects the **Step**.


<div class="meta-api-description">
Remove or clear the current selection from a step programmatically within a multi-step process or wizard interface, enabling control over which steps are active or highlighted. Enable unselecting or toggling off a previously chosen step, resetting its state so it is no longer marked as selected or focused, allowing dynamic updates to the step navigation or progress without user interaction. Control, disable, or clear the active step selection to manage workflows, step indicators, or progress bars, facilitating scenarios such as resetting steps, changing step focus, or customizing navigation flow in step-based UI components.
</div>

#### Example

    <div id="stepper"></div>
    <script>
    $("#stepper").kendoStepper({
        steps: [
            { label: "Step 1" },
            { label: "Step 2" },
            { label: "Step 3" }
        ]
    });
    
    var stepper = $("#stepper").data("kendoStepper");
    var step = stepper.steps()[0];

    step.select();
    
    // Deselect the step
    step.deselect();
    </script>

### enable

Enables or disables the **Step**.


<div class="meta-api-description">
Toggle or control the interactive state of a step within a multi-step process by enabling or disabling its selection, focusability, and navigation dynamically during runtime; modify whether a step is accessible or skipped, change its enabled or disabled status programmatically to update its visual appearance and user input responsiveness, and manage step activation and deactivation through method calls to adjust workflow progression, user interaction, or conditional step availability in a stepper component or wizard interface.
</div>

#### Parameters

##### value `Boolean`

Specifies whether the step should be enabled (true) or disabled (false).

#### Example

    <div id="stepper"></div>
    <script>
    $("#stepper").kendoStepper({
        steps: [
            { label: "Step 1" },
            { label: "Step 2" },
            { label: "Step 3" }
        ]
    });
    
    var stepper = $("#stepper").data("kendoStepper");
    var step = stepper.steps()[0];
    
    // Disable the step
    step.enable(false);
    </script>

### select

Selects the **Step**.


<div class="meta-api-description">
Activate or choose a specific step programmatically within a multi-step process or wizard interface, control which step is currently highlighted or active, update the progress indicator by moving forward or backward between steps, synchronize the current step with external events or application state changes, set a particular step as selected to reflect user navigation or automated flow, manage step transitions dynamically through code, trigger step focus or activation without user clicks, ensure the stepper interface reflects programmatic changes to the active step, and control the stepper’s visual state and current position by selecting steps via method calls.
</div>

#### Example

    <div id="stepper"></div>
    <script>
    $("#stepper").kendoStepper({
        steps: [
            { label: "Step 1" },
            { label: "Step 2" },
            { label: "Step 3" }
        ]
    });
    
    var stepper = $("#stepper").data("kendoStepper");
    var step = stepper.steps()[0];
    
    // Select the step
    step.select();
    </script>

### setValid

Sets the valid(error) state of the **Step**.


<div class="meta-api-description">
Configure the validation state of individual steps by setting whether a step is valid or invalid, enabling programmatic control over error display, validation flags, visual error indicators, and navigation flow in a multi-step interface; use this to mark steps as completed or erroneous after user actions, asynchronous validation, error checking, or input verification, allowing dynamic updates to form progress, error highlighting, and conditional step navigation based on validation results.
</div>

#### Parameters

##### value `Boolean`

Specifies whether the state should be valid (true) or not (false).

#### Example

    <div id="stepper"></div>
    <script>
    $("#stepper").kendoStepper({
        steps: [
            { label: "Step 1" },
            { label: "Step 2" },
            { label: "Step 3" }
        ]
    });
    
    var stepper = $("#stepper").data("kendoStepper");
    var step = stepper.steps()[0];
    
    // Set step as invalid (error state)
    step.setValid(false);
    </script>
