---
title: Overview
page_title: How to use the ProgressBar PHP class, server-side wrapper for Kendo UI ProgressBar widget
description: Learn how to create Kendo UI ProgressBar for PHP, handle Kendo UI ProgressBar Events, access an existing ProgressBar.
---

# ProgressBar

The Kendo ProgressBar for PHP is a server-side wrapper for the [Kendo UI ProgressBar](/api/web/progressbar) widget.

## Getting Started

Here is how to configure a simple Kendo ProgressBar:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
2. Create a [ProgressBar](/api/wrappers/php/Kendo/UI/ProgressBar).

		<?php
		  $pb = new \Kendo\UI\ProgressBar('progressBar');
		  $pb->type('percent');
		?>

3. Output the ProgressBar by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

		<?php
          echo $pb->render();
        ?>

## Getting Client-side Reference

You can reference the client-side Kendo ProgressBar instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/progressbar#methods) to control its behavior.

### Example

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

## Handling Events

You can subscribe to all ProgressBar [events](/api/web/progressbar#events).

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

	<?php
      $pb = new \Kendo\UI\ProgressBar('progressBar');

      // Provide inline JavaScript code that will handle the 'change' event of the ProgressBar
      $pb->change('function() { /* Handle the change event */ }');

      echo $pb->render();
    ?>
