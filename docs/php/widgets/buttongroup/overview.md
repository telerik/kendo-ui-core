---
title: Overview
page_title: Overview | ButtonGroup PHP Class
description: "Get started with the ButtonGroup PHP class in Kendo UI."
slug: overview_buttongroup_uiforphp
position: 1
---

# ButtonGroup PHP Class Overview

The Kendo UI ButtonGroup for PHP is a server-side wrapper for the [Kendo UI ButtonGroup](/api/javascript/ui/buttongroup) widget.

## Getting Started

Make sure you are familiar with some of the fundamental [Kendo UI widget concepts]({% slug initialize_widgets_using_jquery_plugins_installation %}) and that the [Kendo UI PHP wrappers]({% slug overview_uiforphp %}) are setup correctly.

### The Basics

The ButtonGroup widget groups a series of buttons together on a single line.

### Initialization

The example below demonstrates how to initialize the ButtonGroup by using the default `buttongroup` tag.

###### Example

    $buttonGroup = new \Kendo\UI\ButtonGroup('select-period');
    $month = new \Kendo\UI\ButtonGroupItem();
    $month->text("Month");
    $quarter = new \Kendo\UI\ButtonGroupItem();
    $quarter->text("Quarter");
    $year = new \Kendo\UI\ButtonGroupItem();
    $year->text("Year");

    $buttonGroup->addItem($month, $quarter, $year);

    echo $buttonGroup->render();

## Features

### Enable and Disable ButtonGroup

You can configure the ButtonGroup to be initially disabled by using its `enable` property. The ButtonGroup can also be disabled or enabled at any time with JavaScript by using the `enable()` method with a Boolean argument. For more information on the [`enable`](/api/javascript/ui/buttongroup#methods-enable) method of the ButtonGroup, refer to the [ButtonGroup API](/api/javascript/ui/buttongroup).

The following example demonstrates how to enable and disable the ButtonGroup.

###### Example

    $disabledButtonGroup = new \Kendo\UI\ButtonGroup('disabledButton');
    $disabledButtonGroup->attr('type', 'buttongroup')
               ->enable(false)
               ->content('Disabled buttongroup');

    echo $disabledButtonGroup->render();

### Index

The initially selected index of the ButtonGroup can be configured by using its `index` property. An index can also be selected over the `select()` method with an Integer argument. For more information on the [`select`](/api/javascript/ui/buttongroup#methods-select) method of the ButtonGroup, refer to the [ButtonGroup API](/api/javascript/ui/buttongroup).

The following example demonstrates how to select a button by its index.

    $buttonGroup = new \Kendo\UI\ButtonGroup('select-period');
    $month = new \Kendo\UI\ButtonGroupItem();
    $month->text("Month");
    $quarter = new \Kendo\UI\ButtonGroupItem();
    $quarter->text("Quarter");
    $year = new \Kendo\UI\ButtonGroupItem();
    $year->text("Year");

    $buttonGroup->addItem($month, $quarter, $year);
    $buttonGroup->select(0);

    echo $buttonGroup->render();

## Reference

### Existing Instances

To reference an existing ButtonGroup instance, refer to the [introductory article on the ButtonGroup]({% slug overview_kendoui_buttongroup_widget %}#reference).

## See Also

* [Overview of the Kendo UI ButtonGroup Widget]({% slug overview_kendoui_buttongroup_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
