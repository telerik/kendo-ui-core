---
title: Overview
page_title: Overview | RadioGroup PHP Class
description: "How to configure and use the RadioGroup PHP tag in Kendo UI."
slug: overview_radiogroup_uiforphp
---

# RadioGroup PHP Tag Overview

The RadioGroup allows to change selection on radio buttons, set name on the radio buttons, set the position of the labels, attributes and custom css classes. Below are listed the steps for you to follow when configuring the Kendo UI RadioGroup for PHP.

### The Basics

Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

### Initialization

The example below demonstrates how to initialize the RadioGroup by using the default `radiogroup` tag.


		$radiogroup = new \Kendo\UI\RadioGroup('radiogroup');

        $radiogroup->value("one");

        $radioFirst = new \Kendo\UI\RadioGroupItem();
        $radioFirst->label("Agree")
            ->value("one");			
		
        $radiogroup->addItem($radioFirst);
        $radiogroup->addItem("Disagree");

        echo $radiogroup->render();

## Features

### Enable and Disable RadioGroup

You can configure the RadioGroup to be initially disabled by using its `enable` property. The RadioGroup can also be disabled or enabled at any time with JavaScript by using the `enable()` method with a Boolean argument. For more information on the [`enable`](/api/javascript/ui/radiogroup#methods-enable) method of the RadioGroup, refer to the [RadioGroup API](/api/javascript/ui/radiogroup).

The following example demonstrates how to enable and disable the RadioGroup.


		$radiogroup = new \Kendo\UI\RadioGroup('radiogroup');

        $radiogroup->value("Agree")
            ->enabled(false);        		
		
        $radiogroup->addItem("Agree");
        $radiogroup->addItem("Disagree");

        echo $radiogroup->render();

### Labels

The example below demonstrates how to configure `label` and `labelPosition` to the RadioGroup.

    	$radiogroup = new \Kendo\UI\RadioGroup('radiogroup');

        $radiogroup->labelPosition("before")
            ->value("one");

        $radioFirst = new \Kendo\UI\RadioGroupItem();
        $radioFirst->label("Female")
            ->value("one");
			
		$radioSecond = new \Kendo\UI\RadioGroupItem();
		$radioSecond->label("Male")
            ->value("two");

        $radiogroup->addItem($radioFirst);
        $radiogroup->addItem($radioSecond);
        
        echo $radiogroup->render();

## Layout

The RadioGroup widget supports two types of [`layout`](/api/javascript/ui/radiogroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the RadioGroup layout:

     	$radiogroup = new \Kendo\UI\RadioGroup('radiogroup');

        $radiogroup->->value("Agree")
            ->layout("horizontal");        		
		
        $radiogroup->addItem("Agree");
        $radiogroup->addItem("Disagree");

        echo $radiogroup->render();


## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI RadioGroup](/api/web/radiogroup#events) by the handler name.


    <?php
     	$radiogroup = new \Kendo\UI\RadioGroup('radiogroup');

        $radiogroup->value("one");

        $radioFirst = new \Kendo\UI\RadioGroupItem();
        $radioFirst->label("Female")
            ->value("one");
			
		$radioSecond = new \Kendo\UI\RadioGroupItem();
		$radioSecond->label("Male")
            ->value("two");

        $radiogroup->addItem($radioFirst);
        $radiogroup->addItem($radioSecond);

        $radiogroup->focus("onFocus")
            ->select("onSelect")
            ->change("onChange");

        echo $radiogroup->render();
	?>
	<script>
    	function onChange(e) {
			// handle the change event
    	}

    	function onFocus(e) {
    	    // handle the focus event
    	}

    	function onSelect(e) {
    	    // handle the select event
    	}
    </script>
</script>

## Reference

### Existing Instances

To reference to an existing RadioGroup instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/radiogroup) to control its behavior.

The following example demonstrates how to access an existing RadioGroup instance.

    //Put this after your Kendo RadioGroup tag declaration
    <script>
        $(function() {
            // Notice that the Name() of the RadioGroup is used to get its client-side instance
            var radiogroup = $("#radiogroup").data("kendoRadioGroup");
        });
    </script>

## See Also

* [Overview of the Kendo UI RadioGroup Widget]({% slug overview_kendoui_radiogroup_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
