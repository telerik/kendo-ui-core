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
