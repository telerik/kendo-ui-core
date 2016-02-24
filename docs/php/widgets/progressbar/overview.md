---
title: Overview
page_title: Overview | ProgressBar PHP Class
description: "Get started with the ProgressBar PHP class in Kendo UI."
slug: overview_progressbar_uiforphp
position: 1
---

# ProgressBar PHP Class Overview

The Kendo UI ProgressBar for PHP is a server-side wrapper for the [Kendo UI ProgressBar](/api/javascript/ui/progressbar) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI ProgressBar for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [ProgressBar](/api/javascript/ui/editor).

###### Example

  	<?php
		  $pb = new \Kendo\UI\ProgressBar('progressBar');
		  $pb->type('percent');
		 ?>

**Step 3** Output the ProgressBar by echoing the result of the render method.

###### Example

 	<?php
	    echo $pb->render();
	   ?>

## Event Handling

You can subscribe to all ProgressBar [events](/api/javascript/ui/progressbar#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

		<?php
	      $pb = new \Kendo\UI\ProgressBar('progressBar');

	      // The 'progressbar_change' JavaScript function will handle the 'change' event of the ProgressBar
	      $pb->change('progressbar_change');

	      echo $pb->render();
	    ?>
	    <script>
	      function progressbar_change() {
	        // Handle the change event
	      }
	    </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

		<?php
	      $pb = new \Kendo\UI\ProgressBar('progressBar');

	      // Provide inline JavaScript code that will handle the 'change' event of the ProgressBar
	      $pb->change('function() { /* Handle the change event */ }');

	      echo $pb->render();
	    ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing ProgressBar instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Editor API](/api/javascript/ui/progressbar#methods) to control its behavior.

###### Example

			<?php
		      $pb = new \Kendo\UI\ProgressBar('progressBar');
		      echo $pb->render();
		    ?>
		    <script>
		      $(function() {
		        // The constructor parameter is used as the 'id' HTML attribute of the ProgressBar
		        var progressbar = $("#progressBar").data("kendoProgressBar");
		      });
  	    </script>

## See Also

Other articles on Telerik UI for PHP and on the ProgressBar:

* [Overview of the Kendo UI ProgressBar Widget]({% slug overview_kendoui_progressbar_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
