---
title: Overview
page_title: Code and examples how to use Kendo UI Splitter for PHP | Kendo UI documentation
description: Easy to follow steps to explore the capabilities of Splitter class for Kendo UI Splitter for PHP.
---

# Splitter

Kendo Splitter for PHP is a server-side wrapper for the [Kendo UI Splitter](/api/web/splitter) widget.

## Getting Started

Here is how to configure a simple Kendo Splitter:

1.  Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.
1.  Add a simple splitter:
    
		<?php
		// create inner splitter
		$inner = new \Kendo\UI\Splitter('horizontal');
		$inner->attr("style", "height: 100%; width: 100%;");
		
		$leftPane = new \Kendo\UI\SplitterPane();
		$leftPane->attr("id", "left-pane")
		     ->collapsible(true)
		     ->size(220)
		     ->startContent();
		?>

		<div class="pane-content">
			<h3>Inner splitter / left pane</h3>
			<p>Resizable and collapsible.</p>
		</div>

		<?php
		$leftPane->endContent();
		$inner->addPane($leftPane);
		
		$centerPane = new \Kendo\UI\SplitterPane();
		$centerPane->attr("id", "center-pane")
		     ->collapsible(false)
		     ->startContent();
		?>

		<div class="pane-content">
			<h3>Inner splitter / center pane</h3>
			<p>Resizable only.</p>
		</div>

		<?php
		$centerPane->endContent();
		$inner->addPane($centerPane);
		
		$rightPane = new \Kendo\UI\SplitterPane();
		$rightPane->attr("id", "center-pane")
		     ->collapsible(true)
		     ->size(220)
		     ->startContent();
		?>

		<div class="pane-content">
			<h3>Inner splitter / right pane</h3>
			<p>Resizable and collapsible.</p>
		</div>

		<?php
		$rightPane->endContent();
		$inner->addPane($rightPane);					
		
		$topPane = new \Kendo\UI\SplitterPane();
		$topPane->attr("id", "top-pane")
		    ->collapsible(false)
		    ->content($inner->render());
		
		$middlePane = new \Kendo\UI\SplitterPane();
		$middlePane->attr("id", "middle-pane")
		       ->collapsible(false)
		       ->size(100)
		       ->startContent();
		?>

		<div class="pane-content">
			<h3>Outer splitter / middle pane</h3>
			<p>Resizable only.</p>
		</div>

		<?php
		$middlePane->endContent();
		
		$bottomPane = new \Kendo\UI\SplitterPane();
		$bottomPane->attr("id", "bottom-pane")
		       ->collapsible(false)
		       ->resizable(false)
		       ->size(100)
		       ->startContent();
		?>

		<div class="pane-content">
			<h3>Outer splitter / bottom pane</h3>
			<p>Non-resizable and non-collapsible.</p>
		</div>

		<?php
		$bottomPane->endContent();
		
		// create outer splitter
		$splitter = new \Kendo\UI\Splitter('splitter');
		$splitter->orientation("vertical");
		$splitter->addPane($topPane, $middlePane, $bottomPane);
		?>

1. Output the splitter by echo-ing the result of the [render](/api/wrappers/php/Kendo/UI/Widget#render) method.

        <?php
        echo $splitter->render();
        ?>

## Accessing an Existing Splitter

You can reference an existing Splitter instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/splitter#methods) to control its behavior.


### Accessing an existing Splitter instance

    //Put this after your Kendo Splitter for PHP declaration
    <script>
    $(function() {
        // Notice that the Name() of the splitter is used to get its client-side instance
        var splitter = $("#splitter").data("kendoSplitter");
    });
    </script>


## Handling Kendo UI Splitter events

You can subscribe to all [events](/api/web/splitter#events) exposed by Kendo UI Splitter:


### Example - subscribing by specifying JavaScript function name

    <?php
    $splitter = new \Kendo\UI\Splitter('splitter');

    // The 'resize_dataBound' JavaScript function will handle the 'dataBound' event of the splitter
    $splitter->resize('splitter_resize');

    echo $splitter->render();
    ?>
    <script>
    function splitter_resize() {
        // Handle the resize event
    }
    </script>

### Example - providing inline JavaScript code

    <?php
    $splitter = new \Kendo\UI\Splitter('splitter');

    // Provide inline JavaScript code that will handle the 'dataBound' event of the splitter
    $splitter->resize('function() { /* Handle the resize event */ }');

    echo $splitter->render();
    ?>

