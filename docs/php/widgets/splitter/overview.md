---
title: Overview
page_title: Overview | Splitter PHP Class
description: "Get started with the Splitter PHP class in Kendo UI."
slug: overview_splitter_uiforphp
position: 1
---

# Splitter PHP Class Overview

The Kendo UI Splitter for PHP is a server-side wrapper for the [Kendo UI Splitter](/api/javascript/ui/splitter) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Splitter for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Add a [Splitter](/api/php/Kendo/UI/Splitter).

###### Example

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

**Step 3** Output the Splitter by echoing the result of the `render` method.

###### Example

        <?php
        echo $splitter->render();
        ?>

## Event Handling

You can subscribe to all Splitter [events](/api/javascript/ui/splitter#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

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

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $splitter = new \Kendo\UI\Splitter('splitter');

        // Provide inline JavaScript code that will handle the 'dataBound' event of the splitter
        $splitter->resize('function() { /* Handle the resize event */ }');

        echo $splitter->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Splitter instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Splitter API](/api/javascript/ui/splitter#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI Splitter for PHP declaration
        <script>
        $(function() {
            // Notice that the Name() of the splitter is used to get its client-side instance
            var splitter = $("#splitter").data("kendoSplitter");
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the Splitter:

* [Overview of the Kendo UI Splitter Widget]({% slug overview_kendoui_splitter_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
