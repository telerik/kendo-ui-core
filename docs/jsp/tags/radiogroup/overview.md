---
title: Overview
page_title: Overview | RadioGroup JSP Tag
description: "How to configure and use the RadioGroup JSP tag in Kendo UI."
slug: overview_radiogroup_uiforjsp
---

# RadioGroup JSP Tag Overview

The RadioGroup JSP tag is a server-side wrapper for the [Kendo UI RadioGroup](https://demos.telerik.com/kendo-ui/radiogroup/index) widget.

The RadioGroup allows to change selection on radio buttons, set name on the radio buttons, set the position of the labels, attributes and custom css classes. 

## Getting Started

Make sure you are familiar with some of the fundamental [Kendo UI widget concepts]({% slug getting_started_installation_kendoui %}) and
that the [Kendo UI Java wrappers]({% slug overview_uiforjsp %}) are set up correctly.

### Initialization

The example below demonstrates how to initialize the RadioGroup by using the default `radiogroup` tag.


	<kendo:radioGroup name="radiogroup" >
			<kendo:radioGroup-items>
				<kendo:radioGroup-item value="one" label="Female" />
				<kendo:radioGroup-item value="two" label="Male" />
			</kendo:radioGroup-items>
	</kendo:radioGroup>

## Features

### Enable and Disable RadioGroup

You can configure the RadioGroup to be initially disabled by using its `enable` property. The RadioGroup can also be disabled or enabled at any time with JavaScript by using the `enable()` method with a Boolean argument. For more information on the [`enable`](/api/javascript/ui/radiogroup#methods-enable) method of the RadioGroup, refer to the [RadioGroup API](/api/javascript/ui/radiogroup).

The following example demonstrates how to enable and disable the RadioGroup.


	<kendo:radioGroup name="radiogroup" enabled="true">
		<kendo:radioGroup-items>
			<kendo:radioGroup-item enabled="false" label="<strong>Female</strong>" />
			<kendo:radioGroup-item value="two" label="Male" />
			<kendo:radioGroup-item value="three" label="N/A" />
		</kendo:radioGroup-items>
	</kendo:radioGroup>

### Labels

The example below demonstrates how to configure `label` and `labelPosition` to the RadioGroup.

    <kendo:radioGroup name="radiogroup" labelPosition="before" >
		<kendo:radioGroup-items>
			<kendo:radioGroup-item value="one" label="Female" />
			<kendo:radioGroup-item value="two" label="Male" />
		</kendo:radioGroup-items>
    </kendo:radioGroup>

## Layout

The RadioGroup widget supports two types of [`layout`](/api/javascript/ui/radiogroup/configuration/layout) - "horizontal" and "vertical". By default the radio buttons are rendered vertically.

The following example shows how to set the RadioGroup layout:

    <kendo:radioGroup name="radiogroup" layout="horizontal" >
		<kendo:radioGroup-items>
			<kendo:radioGroup-item value="one" label="Female" />
			<kendo:radioGroup-item value="two" label="Male" />
		</kendo:radioGroup-items>
    </kendo:radioGroup>


## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI RadioGroup](/api/web/radiogroup#events) by the handler name.


    <kendo:radioGroup name="radiogroup" change="onChange" focus="onFocus" select="onSelect" >
		<kendo:radioGroup-items>
			<kendo:radioGroup-item value="one" encoded="false" label="<strong>Phone (SMS)</strong>" />
			<kendo:radioGroup-item value="two" label="E-mail" />
			<kendo:radioGroup-item enabled="false" value="three" label="None" />
		</kendo:radioGroup-items>
	</kendo:radioGroup>

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

To reference to an existing RadioGroup instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [API](/api/javascript/ui/textarea) to control its behavior.

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
* [Telerik UI for JSP API Reference Folder](/api/jsp/textarea)
