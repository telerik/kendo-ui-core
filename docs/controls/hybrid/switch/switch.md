---
title: Overview
page_title: Overview | Hybrid UI Switch
description: "Display two exclusive choices with the hybrid mobile Kendo UI Switch widget, check and uncheck, and tailor on and off its labels."
slug: overview_hybridswitch
position: 1
---

# Switch Overview

The [Hybrid UI Switch widget](http://demos.telerik.com/kendo-ui/m/index#switch/mobile) is used to display two exclusive choices.

When initialized, it shows the currently selected value. Users are able to slide the control to reveal the second value. The mobile Switch can be created from an `input` element of type `checkbox`.

## Getting Started

The mobile Kendo UI Application automatically initializes a mobile Switch for every element with the `role` data-attribute set to `switch` and present in the views/layouts markup. Alternatively, the Switch can be initialized using jQuery plugin syntax in the containing mobile View `init` event handler.

### Initialize from Markup

The example below demonstrates how to initialize a Hybrid UI Switch based on a data-role attribute.

###### Example

    <input type="checkbox" data-role="switch" />

### Initialize Using jQuery

The example below demonstrates how to initialize a Hybrid UI Switch by using jQuery plugin syntax.

###### Example

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoMobileSwitch();
    </script>

## Features

### Checking and Unchecking

The checked state of the mobile Switch depends on the [`checked` configuration option](/api/mobile/switch#checked) or the `checked` attribute of the widget element.

The example below demonstrates how to initialize the Hybrid UI Switch from a checked `input`.

###### Example

    <input type="checkbox" id="switch" checked="checked" />

    <script>
        var switchInstance = $("#switch").kendoMobileSwitch();
    </script>

The example below demonstrates how to initialize a checked Hybrid UI Switch using jQuery plugin syntax.

###### Example

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoMobileSwitch({ checked: true });
    </script>

### Label Texts

The example below demonstrates how to customize the on/off labels of a Hybrid UI Switch.

###### Example

    <input type="checkbox" id="switch" />

    <script>
        var switchInstance = $("#switch").kendoMobileSwitch({ onLabel: "YES", offLabel: "NO" });
    </script>

## See Also

Other articles and how-to examples on the Hybrid UI components and on the Switch:

* [Hybrid UI Switch JavaScript API Reference](/api/javascript/mobile/ui/switch)
* [Overview of the Hybrid UI Components]({% slug overview_hybridkendoui %})
* [How to Create Fixed Content Areas with Scroller]({% slug howto_createfixedcontentarea_hybridui %})
* [How to Create Relative Content Size Using Flexboxes]({% slug howto_createrelative_contentsize_usingflexboxes_hybridui %})
* [How to Select Value from Another View]({% slug howto_selectvaluefrom_anotherview_hybridui %})
* [How to Set Initial View Prior to Initialization in AngularJS]({% slug howto_setinitiaviewpriortoinitialization_angular_hybridui %})
