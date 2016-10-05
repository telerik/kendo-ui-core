---
title: ProgressBar
page_title: Configuration, fields, methods and events of Kendo UI ProgressBar
description: How to configure and control Kendo UI ProgressBar widget
---

# kendo.ui.ProgressBar

Represents the Kendo UI ProgressBar widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object`

Configures the progress animation. Currently only the duration of the animation could be set.

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

#### Example - specify the duration of the progress animation

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    animation: {
	      duration: 800  
	    }
	  });  
	</script>	

### chunkCount `Number` *(default: 5)*

Specifies the number of chunks.

> **Important** This property is applicable only when the type of the **ProgressBar** is set to **chunk**.

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

#### Example - disable the widget on initialization.

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    enable: false
	  });  
	</script>

### max `Number` *(default: 100)*

The maximum value of the **ProgressBar**.

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

#### Example - specify vertical orientation for the ProgressBar

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    orientation: "vertical"
	  });  
	</script>

### reverse `Boolean` *(default: false)*

Specifies if the progress direction will be reversed.

#### Example - specify reversed progress direction

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    reverse: true
	  });  
	</script>

### showStatus `Boolean` *(default: true)*

Specifies if the progress status will be shown.

#### Example - hide the status of the ProgressBar

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    showStatus: false
	  });  
	</script>

### type `String` *(default: "value")*

Specifies the type of the **ProgressBar**. The supported types are **value**, **percent** and **chunk**.

> **Important** The **chunk** progress type is not supported in Internet Explorer 7.

#### Example - set the type of the ProgressBar

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    type: "percent"
	  });  
	</script>	

### value `Number`

The underlying value of the **ProgressBar**. It should be a number or `false`. Setting the value to `false` will set the state of the ProgressBar to indeterminate.

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
	    var pb = $("#progressbar").data("kendoProgressBar");
        alert("The current value is " + pb.value());
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

#### Event Data

##### e.value `Number`

The current value of the **ProgressBar**.

#### Example - subscribe to the "change" event during initialization

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    change: function(e) {
	      console.log("Value is " + e.value);
	    }
	  });
	</script>

#### Example - subscribe to the "change" event after initialization

	<div id="progressbar"></div>
	<script>
	  function onChange(e) {
	    console.log("Value is " + e.value);
	  }

	  $("#progressbar").kendoProgressBar();

	  var progressbar = $("#progressbar").data("kendoProgressBar");
	  progressbar.bind("change", onChange);
	</script>

### complete

Fired when the value of the **ProgressBar** reaches the maximum value.

> **Important** The event is not fired during the initialization of the widget, even when the initial value is equal to the maximum value.

#### Event Data

##### e.value `Number`

The current value of the **ProgressBar**.

#### Example - subscribe to the "complete" event during initialization

	<div id="progressbar"></div>
	<script>
	  $("#progressbar").kendoProgressBar({
	    complete: function(e) {
	      console.log("Value is " + e.value);
	    }
	  });
	</script>

#### Example - subscribe to the "complete" event after initialization

	<div id="progressbar"></div>
	<script>
	  function onComplete(e) {
	    console.log("Value is " + e.value);
	  }

	  $("#progressbar").kendoProgressBar();

	  var progressbar = $("#progressbar").data("kendoProgressBar");
	  progressbar.bind("complete", onComplete);
	</script>

