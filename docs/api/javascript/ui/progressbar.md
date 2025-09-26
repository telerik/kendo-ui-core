---
title: ProgressBar
page_title: Configuration, fields, methods and events of Kendo UI ProgressBar
description: How to configure and control Kendo UI ProgressBar widget
res_type: api
component: progressbar
---

# kendo.ui.ProgressBar

Represents the Kendo UI ProgressBar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Boolean|Object`

Configures the progress animation. Currently only the duration of the animation could be set.


<div class="meta-api-description">
Configure and control the animation behavior for progress value changes, including setting the timing and speed of progress bar transitions during initialization or runtime. Enable smooth or custom-duration progress updates by adjusting animation parameters such as transition length or duration to manage how quickly progress increments are visually reflected. Customize progress bar animations to control the pace, timing, and effect of progress changes, allowing developers to set animation speed, duration, or enable dynamic animation behavior for visual feedback during task completion. Manage the flow and smoothness of progress bar updates to enhance user experience with configurable animation timing options tailored to different UI responsiveness needs.
</div>

#### Example - specify the duration of the progress animation

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    animation: {
	      duration: 500
	    }
	  });
	</script>

#### Example - disable the progress animation

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    animation: false
	  });
	</script>

### animation.duration `Number` *(default: 400)*

The duration of each progress animation in milliseconds.


<div class="meta-api-description">
Set, configure, or control the timing and length of progress bar animations, adjusting how long each progress update or transition takes in milliseconds to create faster or slower animated progress effects during load, initialization, or runtime changes. Customize animation speeds, durations, or delays to fine-tune progress indicator behavior, ensuring smooth or snappy visual updates of progress transitions and percentage changes. Manage the pacing of progress transitions for progress bars in user interfaces by specifying animation intervals and controlling animation flow for better UX feedback on loading or processing tasks.
</div>

#### Example - specify the duration of the progress animation

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    animation: {
	      duration: 800
	    }
	  });
	</script>

### ariaRole `Boolean` *(default: false)*

If set to `true` the ProgressBar will have its `role` attribute set to `progressbar`. It will also render its `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes.


<div class="meta-api-description">
Configure accessibility roles for a progress indicator by setting ARIA attributes that define the element as a progressbar, enabling screen readers and assistive technologies to detect and announce the progress status, current value, minimum and maximum bounds, and dynamic updates of the progress state, allowing developers to control, enable, or customize semantic roles for progress tracking components with accessible descriptions and proper ARIA properties to improve usability for users relying on assistive devices and ensure inclusive UI feedback across diverse environments.
</div>

#### Example

    <div id="pb"></div>
    <script>
		$("#pb").kendoProgressBar({
			label: "label",
			ariaRole: true
		});
    </script>

### chunkCount `Number` *(default: 5)*

Specifies the number of chunks.

> **Important** This property is applicable only when the type of the **ProgressBar** is set to **chunk**.


<div class="meta-api-description">
Set or adjust the quantity of separate segments, divisions, or chunks that break up a progress indicator bar, enabling fine control over how granular or segmented the progress visualization appears during progress tracking. Configure the number of divisions, pieces, or parts shown within a chunked progress display to make the progress bar represent progress in multiple discrete steps or sections. Control how many individual chunks or blocks make up the visual progress representation for segmented progress bars, useful when toggling between continuous and chunked styles of progress feedback. Customize the segmentation count, chunk quantity, or discrete step divisions for progress bars that support chunked or stepped rendering modes.
</div>

#### Example - specify the number of chunks

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    type: "chunk",
		chunkCount: 10
	  });
	</script>

### enable `Boolean` *(default: true)*

If set to `false` the widget will be disabled. It will still allow changing the value. The widget is enabled by default.


<div class="meta-api-description">
Configure whether the progress indicator is active or inactive, allowing control over user interaction by enabling or disabling input but still permitting programmatic updates; toggle the component’s interactivity on or off to prevent manual changes while displaying progress, manage activation states, control enablement settings, set read-only or disabled modes, and adjust behavior to allow value updates even when user input is blocked.
</div>

#### Example - disable the widget on initialization.

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    enable: false
	  });
	</script>

### label `String`

The label that would be used as a `aria-label` for the ProgressBar element. Will be applied only if `ariaRole` is set to `true`.


<div class="meta-api-description">
Configure or set an accessible text label for progress indicators to improve screen reader output and accessibility compliance, enabling descriptive announcements for visually impaired users by providing clear, semantic naming applied when ARIA roles are enabled or active, supporting the customization of accessible names to enhance assistive technology recognition and ensure that progress elements are properly identified in assistive devices and accessibility tools through customizable labels or aria-label equivalents.
</div>

#### Example

    <div id="pb"></div>
    <script>
		$("#pb").kendoProgressBar({
			label: "label",
			ariaRole: true
		});
    </script>

### labelId `String`

The ID of the element that will be used as a label of the ProgressBar. Will be used as a value of the `aria-labelledby` attribute. Will be applied only if `ariaRole` is set to `true`.


<div class="meta-api-description">
Set or configure the identifier linking an external text label or element to a progress indicator for improved accessibility by associating an element’s unique ID as a label reference, enabling screen readers and assistive technologies to recognize and describe the progress component accurately, particularly when enabling or controlling ARIA roles and attributes like aria-labelledby for semantic connection between the progress display and its descriptive label in user interfaces.
</div>

#### Example

	<label id="label">This is the label</label>
    <div id="pb"></div>
    <script>
		$("#pb").kendoProgressBar({
			labelId: "label",
			ariaRole: true
		});
    </script>

### max `Number` *(default: 100)*

The maximum value of the **ProgressBar**.


<div class="meta-api-description">
Set or adjust the highest value or maximum limit that defines the range for progress calculation and display, enabling scaling of progress indicators and computation of progress percentages relative to this upper bound. Configure or modify the maximum numeric threshold to control how progress is represented, whether initializing, updating, or dynamically binding new data, allowing fine-tuning of progress bounds, scaling progress bars, adjusting completion goals, or setting total steps and limits for various progress tracking use cases.
</div>

#### Example - specify the maximum value of the widget

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    max: 10,
	    value: 5
	  });
	</script>

### min `Number` *(default: 0)*

The minimum value of the **ProgressBar**.


<div class="meta-api-description">
Configure the starting point or minimum threshold for progress tracking by setting the lowest value a progress indicator can display, which controls the base or minimum boundary in numeric or percentage calculations alongside the maximum limit, enabling developers to define the earliest measurable progress state, the initial value range for progress updates, and to adjust the minimum scale or floor of progress representation within loading bars, progress indicators, or completion meters during component setup or dynamic adjustments.
</div>

#### Example - specify the minimum value of the widget

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    min: 10,
	    max: 50
	  });
	</script>

### orientation `String` *(default: "horizontal")*

The orientation of the **ProgressBar**. Possible values are **horizontal** and **vertical**.


<div class="meta-api-description">
Set or control the direction and layout of progress indicators to display progress bars running horizontally left to right or vertically top to bottom, including configuring fill direction, orientation, alignment, and animation flow for progress tracking elements, enabling developers to switch or toggle progress display axes for UI components that visually represent task completion status either in horizontal strips or vertical bars, adjusting rendering styles and progress fill behavior accordingly.
</div>

#### Example - specify vertical orientation for the ProgressBar

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    orientation: "vertical"
	  });
	</script>

### reverse `Boolean` *(default: false)*

Specifies if the progress direction will be reversed.


<div class="meta-api-description">
Control the direction of a progress indicator to fill from right to left or end to start, enabling reverse progress animations, backward filling effects, or alignment with right-to-left user interfaces, allowing configuration of progress bars to move opposite the default forward or left-to-right direction and supporting customization of visual progress flow for different layout orientations, languages, and UI designs.
</div>

#### Example - specify reversed progress direction

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    reverse: true
	  });
	</script>

### showStatus `Boolean` *(default: true)*

Specifies if the progress status will be shown.


<div class="meta-api-description">
Control the visibility of the progress indicator’s status text, such as a percentage completed or custom label, to enable, disable, toggle, or update the display of progress details alongside the progress bar UI during runtime or binding; configure whether progress information is shown or hidden dynamically for user feedback on task completion, progress updates, or loading states.
</div>

#### Example - hide the status of the ProgressBar

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    showStatus: false
	  });
	</script>

### type `String` *(default: "value")*

Specifies the type of the **ProgressBar**. The supported types are **value**, **percent** and **chunk**.


<div class="meta-api-description">
Configure how progress is displayed in a progress bar by selecting between raw numeric values, percentage formats, or segmented chunk representations; control whether progress is shown as a direct number, a percent-complete indicator, or divided into discrete segments for visual progress tracking and customization, enabling flexible display modes to suit different UI preferences and progress measurement styles.
</div>

#### Example - set the type of the ProgressBar

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    type: "percent"
	  });
	</script>

### value `Number`

The underlying value of the **ProgressBar**. It should be a number or `false`. Setting the value to `false` will set the state of the ProgressBar to indeterminate.


<div class="meta-api-description">
Set, update, or retrieve the current progress indicator level to show how much of a task is completed, specifying numerical progress values to display determinate percentages or toggling to an indeterminate mode by using false or null values for ongoing or unknown progress states. Configure the progress amount dynamically, enable precise progress tracking, control the fill level of progress bars, and switch between fixed progress and indefinite loading animations for user interface feedback in various application workflows.
</div>

#### Example - set the initial ProgressBar value

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    min: 10,
	    max: 20,
	    value: 15
	  });
	</script>

## Fields

### progressStatus `jQuery`

The jQuery object which represents the progress status fields. This object could be empty if no progress status fields are currently existing in the DOM.


<div class="meta-api-description">
Access and manipulate progress status elements within the progress bar component by querying, updating, or controlling status text, CSS classes, and event handlers on the rendered DOM nodes representing progress feedback. Enable customization or inspection of progress indicators by interacting with the underlying jQuery objects that reflect progress status fields, supporting dynamic updates, style adjustments, and event bindings for status display elements in the progress interface. Manage or retrieve progress feedback elements, modify their content or appearance, and hook into status-related events on the progress bar’s visible fields after component initialization to enhance or monitor progress reporting.
</div>

#### Example - set custom progress status

	<div id="progressbar"></div>
	<script>
      $("#progressbar").kendoProgressBar({
        change: function(e) {
          this.progressStatus.text("Custom status");
        }
      });

      $("#progressbar").data("kendoProgressBar").value(10);
    </script>

### progressWrapper `jQuery`

The jQuery object which represents the progress wrapper. This object could be empty if the progress has not started yet and the value is equal to the minimum value.


<div class="meta-api-description">
Accessing or interacting with the container element that wraps the progress indicator enables developers to manipulate the progress bar's outer layer by selecting or modifying its DOM wrapper, such as adding CSS classes, attaching event listeners, querying dimensions, or triggering animations. This wrapper may be empty or non-existent when the progress value is at its minimum or the process hasn't begun, so controlling or detecting the presence of the outer progress container helps in customizing visual styles, responding to user actions, or dynamically measuring the progress bar's size and layout. Queries involving obtaining the jQuery object representing the outer progress wrapper element allow for flexible DOM manipulation and event handling on the progress bar container within different UI states.
</div>

#### Example - set custom styles to the progress wrapper

	<div id="progressbar"></div>
	<script>
      $("#progressbar").kendoProgressBar({
        change: function(e) {
          this.progressWrapper.css({
            "background-color": "#EE9F05",
            "border-color": "#EE9F05"
          });
        }
      });

      $("#progressbar").data("kendoProgressBar").value(10);
    </script>

## Methods

### enable

Enables/Disables the **ProgressBar** widget.


<div class="meta-api-description">
Control the progress bar’s active state dynamically by enabling or disabling user interaction and visual feedback without reconstructing the component; toggle availability, set it as active or inactive, switch between enabled and disabled modes at runtime to manage user input responsiveness and styling, programmatically adjust the component’s engagement state, and configure its interaction capability on the fly.
</div>

#### Example - enable the widget

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    enable: false
	  });

	  $(function() {
	    var pb = $("#progressbar").data("kendoProgressBar");
        pb.enable();
      });
	</script>

#### Parameters

##### enable `Boolean`

The argument, which defines whether to enable/disable the **ProgressBar**. If no argument is passed, the widget will be enabled.

### value

Gets or sets the value of the **ProgressBar**. It accepts a number, a string or `false` as a parameter. Setting the value to `false` will set the state of the **ProgressBar** to indeterminate. If no parameter is passed, it returns the underlying value.


<div class="meta-api-description">
Configure, set, update, retrieve, or toggle the current progress state of a progress indicator by assigning numeric or string values to reflect completion percentage or progress levels, or switch the progress display into an indeterminate mode by using a specific signal such as false, enabling dynamic control over whether progress is shown as measured or ongoing without a fixed endpoint, supporting both reading and modifying the progress value to enable seamless integration with tasks that require progress tracking, status updates, or loading feedback in user interfaces.
</div>

#### Parameters

##### value `Number`

The value to be set.

#### Returns

`Number` the value of the widget.

#### Example - getting the current ProgressBar value

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    min: 10,
	    max: 20,
	    value: 15
	  });

	  $(function() {
		// The result can be seen in the browser console
		
	    var pb = $("#progressbar").data("kendoProgressBar");
        console.log("The current value is " + pb.value());
      });
	</script>

#### Example - setting the value of the ProgressBar

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    min: 10,
	    max: 20,
	    value: 15
	  });

	  $(function() {
	    var pb = $("#progressbar").data("kendoProgressBar");
        pb.value(20);
      });
	</script>

## Events

### change

Fired when the value of the **ProgressBar** has changed. If the progress animation is enabled, the event will be fired after the animation has completed (does not applies to chunk **ProgressBar**).


<div class="meta-api-description">
Detect or respond to updates in progress indicators by listening for value change events that trigger when progress values update, including after animation sequences finish when animations are enabled; control reactions to progress bar value shifts, track progress updates in UI components, manage event handling for progress changes, and configure listeners to capture progress adjustments and completed animation states, while noting that some progress bar types may emit events differently or immediately upon value modifications.
</div>

#### Event Data

##### e.value `Number`

The current value of the **ProgressBar**.

#### Example - subscribe to the "change" event during initialization

    <button id="set">Set Value to 50</button>
    <div id="progressbar"></div>
    <script>
      $("#progressbar").kendoProgressBar({
        change: function(e) {
          kendo.alert("Value is " + e.value);
        }
      });

      $("#set").on("click", () => {
        $("#progressbar").data("kendoProgressBar").value(50);
      });
    </script>

#### Example - subscribe to the "change" event after initialization

	<button id="set">Set Value to 50</button>
	<div id="progressbar"></div>
	<script>
	  function onChange(e) {
		kendo.alert("Value is " + e.value);
	  }

	  $("#progressbar").kendoProgressBar();

	  var progressbar = $("#progressbar").data("kendoProgressBar");
	  progressbar.bind("change", onChange);

	  $("#set").on("click", () => {
        $("#progressbar").data("kendoProgressBar").value(50);
      });
	</script>

### complete

Fired when the value of the **ProgressBar** reaches the maximum value.

> **Important** The event is not fired during the initialization of the widget, even when the initial value is equal to the maximum value.


<div class="meta-api-description">
Detect or listen for when a progress indicator or loading bar finishes reaching its maximum or completion point, enabling the triggering of follow-up actions like updating user interfaces, starting new tasks, executing callbacks, firing events upon completion, handling the end of a progress operation, responding to a progress bar reaching 100%, recognizing when a loading sequence or process completes, and initiating any dependent processes or logging once the progress reaches its final value; this detection excludes initial states where the progress starts at or is set to maximum.
</div>

#### Event Data

##### e.value `Number`

The current value of the **ProgressBar**.

#### Example - subscribe to the "complete" event during initialization

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    complete: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
	      console.log("Value is " + e.value);
	    }
	  });
	</script>

#### Example - subscribe to the "complete" event after initialization

	<div id="progressbar"></div>
	<script>
	  function onComplete(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
	    console.log("Value is " + e.value);
	  }

	  $("#progressbar").kendoProgressBar();

	  var progressbar = $("#progressbar").data("kendoProgressBar");
	  progressbar.bind("complete", onComplete);
	</script>

