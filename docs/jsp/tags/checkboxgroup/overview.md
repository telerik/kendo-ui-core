---
title: Overview
page_title: Overview | CheckBoxGroup JSP Tag
description: "How to configure and use the CheckBoxGroup JSP tag in Kendo UI."
slug: overview_checkboxgroup_uiforjsp
---

# CheckBoxGroup JSP Tag Overview

The CheckBoxGroup JSP tag is a server-side wrapper for the [Kendo UI CheckBoxGroup](https://demos.telerik.com/kendo-ui/checkboxgroup/index) widget.

The CheckBoxGroup allows to to style and provide checkbox functionality to list elements, set name on the checkboxes, set the position of the labels, attributes and custom css classes.

## Getting Started

Make sure you are familiar with some of the fundamental [Kendo UI widget concepts]({% slug getting_started_installation_kendoui %}) and
that the [Kendo UI Java wrappers]({% slug overview_uiforjsp %}) are set up correctly.

### Initialization

The example below demonstrates how to initialize the CheckBoxGroup by using the default `checkboxgroup` tag.


	<kendo:checkboxgroup name="checkboxgroup" >
			<kendo:checkboxgroup-items>
				<kendo:checkboxgroup-item value="one" label="Female" />
				<kendo:checkboxgroup-item value="two" label="Male" />
			</kendo:checkboxgroup-items>
	</kendo:checkboxgroup>

## Features

### Enable and Disable CheckBoxGroup

You can configure the CheckBoxGroup to be initially disabled by using its `enable` property. The CheckBoxGroup can also be disabled or enabled at any time with JavaScript by using the `enable()` method with a Boolean argument. For more information on the [`enable`](/api/javascript/ui/checkboxgroup#methods-enable) method of the CheckBoxGroup, refer to the [CheckBoxGroup API](/api/javascript/ui/checkboxgroup).

The following example demonstrates how to enable and disable the CheckBoxGroup.


	<kendo:checkboxgroup name="checkboxgroup" enabled="true">
		<kendo:checkboxgroup-items>
			<kendo:checkboxgroup-item enabled="false" label="<strong>Female</strong>" />
			<kendo:checkboxgroup-item value="two" label="Male" />
			<kendo:checkboxgroup-item value="three" label="N/A" />
		</kendo:checkboxgroup-items>
	</kendo:checkboxgroup>

### Labels

The example below demonstrates how to configure `label` and `labelPosition` to the CheckBoxGroup.

    <kendo:checkboxgroup name="checkboxgroup" labelPosition="before" >
		<kendo:checkboxgroup-items>
			<kendo:checkboxgroup-item value="one" label="Female" />
			<kendo:checkboxgroup-item value="two" label="Male" />
		</kendo:checkboxgroup-items>
    </kendo:checkboxgroup>

## Layout

The CheckBoxGroup widget supports two types of [`layout`](/api/javascript/ui/checkboxgroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the checkboxgroup layout:

    <kendo:checkboxgroup name="checkboxgroup" layout="horizontal" >
		<kendo:checkboxgroup-items>
			<kendo:checkboxgroup-item value="one" label="Female" />
			<kendo:checkboxgroup-item value="two" label="Male" />
		</kendo:checkboxgroup-items>
    </kendo:checkboxgroup>


## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI CheckBoxGroup](/api/web/checkboxgroup#events) by the handler name.


    <kendo:checkboxgroup name="checkboxgroup" change="onChange" focus="onFocus" select="onSelect" >
		<kendo:checkboxgroup-items>
			<kendo:checkboxgroup-item value="one" label="Phone (SMS)>" />
			<kendo:checkboxgroup-item value="two" label="E-mail" />
			<kendo:checkboxgroup-item value="three" label="None" />
		</kendo:checkboxgroup-items>
	</kendo:checkboxgroup>

    <script>
        function onChange() {
            //Handle the change event
        }

        function onFocus() {
             //Handle the focus event
        }

        function onSelect() {
             //Handle the select event
        }
    </script>

## Reference

### Existing Instances

To reference to an existing CheckBoxGroup instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textarea) to control its behavior.

The following example demonstrates how to access an existing CheckBoxGroup instance.

    //Put this after your Kendo CheckBoxGroup tag declaration
    <script>
        $(function() {
            // Notice that the Name() of the checkboxgroup is used to get its client-side instance
            var checkboxgroup = $("#checkboxgroup").data("kendoCheckBoxGroup");
        });
    </script>

## See Also

* [Overview of the Kendo UI CheckBoxGroup Widget]({% slug overview_kendoui_checkboxgroup_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/checkboxgroup)
