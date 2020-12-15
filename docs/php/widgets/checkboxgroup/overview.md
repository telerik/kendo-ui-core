---
title: Overview
page_title: Overview | CheckBoxGroup PHP Class
description: "How to configure and use the CheckBoxGroup PHP tag in Kendo UI."
slug: overview_checkboxgroup_uiforphp
---

# CheckBoxGroup PHP Tag Overview

The CheckBoxGroup allows to style and provide checkbox functionality to list elements, set the position of the labels, attributes and custom css classes. Below are listed the steps for you to follow when configuring the Kendo UI CheckBoxGroup for PHP.

### The Basics

Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

### Initialization

The example below demonstrates how to initialize the CheckBoxGroup by using the default `checkboxgroup` tag.


		$checkboxgroup = new \Kendo\UI\CheckBoxGroup('checkboxgroup');

        $checkboxgroup->value("one");

        $checkboxFirst = new \Kendo\UI\CheckBoxGroupItem();
        $checkboxFirst->label("Agree")
            ->value("one");

        $checkboxgroup->addItem($checkboxFirst);
        $checkboxgroup->addItem("Disagree");

        echo $checkboxgroup->render();

## Features

### Enable and Disable CheckBoxGroup

You can configure the CheckBoxGroup to be initially disabled by using its `enable` property. The CheckBoxGroup can also be disabled or enabled at any time with JavaScript by using the `enable()` method with a Boolean argument. For more information on the [`enable`](/api/javascript/ui/checkboxgroup#methods-enable) method of the CheckBoxGroup, refer to the [CheckBoxGroup API](/api/javascript/ui/checkboxgroup).

The following example demonstrates how to enable and disable the CheckBoxGroup.


		$checkboxgroup = new \Kendo\UI\CheckBoxGroup('checkboxgroup');

        $checkboxgroup->value("Agree")
            ->enabled(false);

        $checkboxgroup->addItem("Agree");
        $checkboxgroup->addItem("Disagree");

        echo $checkboxgroup->render();

### Labels

The example below demonstrates how to configure `label` and `labelPosition` to the CheckBoxGroup.

    	$checkboxgroup = new \Kendo\UI\CheckBoxGroup('checkboxgroup');

        $checkboxgroup->labelPosition("before")
            ->value("one");

        $radioFirst = new \Kendo\UI\CheckBoxGroupItem();
        $radioFirst->label("Female")
            ->value("one");

		$radioSecond = new \Kendo\UI\CheckBoxGroupItem();
		$radioSecond->label("Male")
            ->value("two");

        $checkboxgroup->addItem($radioFirst);
        $checkboxgroup->addItem($radioSecond);

        echo $checkboxgroup->render();

## Layout

The CheckBoxGroup widget supports two types of [`layout`](/api/javascript/ui/checkboxgroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the CheckBoxGroup layout:

     	$checkboxgroup = new \Kendo\UI\CheckBoxGroup('checkboxgroup');

        $checkboxgroup->->value("Agree")
            ->layout("horizontal");

        $checkboxgroup->addItem("Agree");
        $checkboxgroup->addItem("Disagree");

        echo $checkboxgroup->render();


## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI CheckBoxGroup](/api/web/checkboxgroup#events) by the handler name.


    <?php
     	$checkboxgroup = new \Kendo\UI\CheckBoxGroup('checkboxgroup');

        $checkboxgroup->value("one");

        $checkboxFirst = new \Kendo\UI\CheckBoxGroupItem();
        $checkboxFirst->label("Female")
            ->value("one");

		$checkboxSecond = new \Kendo\UI\CheckBoxGroupItem();
		$checkboxSecond->label("Male")
            ->value("two");

        $checkboxgroup->addItem($checkboxFirst);
        $checkboxgroup->addItem($checkboxSecond);

        $checkboxgroup->focus("onFocus")
            ->select("onSelect")
            ->change("onChange");

        echo $checkboxgroup->render();
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

To reference to an existing CheckBoxGroup instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/checkboxgroup) to control its behavior.

The following example demonstrates how to access an existing CheckBoxGroup instance.

    //Put this after your Kendo CheckBoxGroup tag declaration
    <script>
        $(function() {
            // Notice that the Name() of the CheckBoxGroup is used to get its client-side instance
            var checkboxgroup = $("#checkboxgroup").data("kendoCheckBoxGroup");
        });
    </script>

## See Also

* [Overview of the Kendo UI CheckBoxGroup Widget]({% slug overview_kendoui_checkboxgroup_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
