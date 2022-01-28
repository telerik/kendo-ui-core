---
title: Overview
page_title: Overview | ButtonGroup JSP Tag
description: "Get started with the ButtonGroup JSP tag in Kendo UI."
slug: overview_buttongroup_uiforjsp
position: 1
---

# ButtonGroup JSP Tag Overview

The ButtonGroup JSP tag is a server-side wrapper for the [Kendo UI ButtonGroup](/api/javascript/ui/buttongroup) widget.

## Getting Started

Make sure you are familiar with some of the fundamental [Kendo UI widget concepts]({% slug getting_started_installation_kendoui %}) and
that the [Kendo UI Java wrappers]({% slug overview_uiforjsp %}) are set up correctly.

### The Basics

The ButtonGroup widget groups a series of buttons together on a single line.

### Initialization

The example below demonstrates how to initialize the ButtonGroup by using the default `buttongroup` tag.



    <kendo:buttonGroup name="select-period">
    	<kendo:buttonGroup-items>
	    	<kendo:buttonGroup-item text="Month">
	    	</kendo:buttonGroup-item>
	    	<kendo:buttonGroup-item text="Quarter">
	    	</kendo:buttonGroup-item>
	    	<kendo:buttonGroup-item text="Year">
	    	</kendo:buttonGroup-item>
    	</kendo:buttonGroup-items>
    </kendo:buttonGroup>

## Features

### Enable and Disable ButtonGroup

You can configure the ButtonGroup to be initially disabled by using its `enable` property. The ButtonGroup can also be disabled or enabled at any time with JavaScript by using the `enable()` method with a Boolean argument. For more information on the [`enable`](/api/javascript/ui/buttongroup#methods-enable) method of the ButtonGroup, refer to the [ButtonGroup API](/api/javascript/ui/buttongroup).

The following example demonstrates how to enable and disable the ButtonGroup.



    <kendo:buttonGroup name="select-period" enable="false">
    	<kendo:buttonGroup-items>
	    	<kendo:buttonGroup-item text="Month">
	    	</kendo:buttonGroup-item>
	    	<kendo:buttonGroup-item text="Quarter">
	    	</kendo:buttonGroup-item>
	    	<kendo:buttonGroup-item text="Year">
	    	</kendo:buttonGroup-item>
    	</kendo:buttonGroup-items>
    </kendo:buttonGroup>

### Index

To configure the initially selected index of the ButtonGroup, use its `index` property. An index can also be selected over the `select()` method with an Integer argument. For more information on the [`select`](/api/javascript/ui/buttongroup#methods-select) method of the ButtonGroup, refer to the [ButtonGroup API](/api/javascript/ui/buttongroup).

The following example demonstrates how to select a button by its index.

    <kendo:buttonGroup name="align" selection="single" index="0">
        <kendo:buttonGroup-items>
            <kendo:buttonGroup-item icon="align-left">
            </kendo:buttonGroup-item>
            <kendo:buttonGroup-item icon="align-center">
            </kendo:buttonGroup-item>
            <kendo:buttonGroup-item icon="align-right">
            </kendo:buttonGroup-item>
        </kendo:buttonGroup-items>
    </kendo:buttonGroup>

## Reference

### Existing Instance

To reference an existing ButtonGroup instance, refer to the [introductory article on the ButtonGroup]({% slug overview_kendoui_buttongroup_widget %}#reference).

## See Also

* [Overview of the Kendo UI ButtonGroup Widget]({% slug overview_kendoui_buttongroup_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
