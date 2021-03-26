---
title: Overview
page_title: Overview 
description: "Get started with the Breadcrumb JSP tag in Kendo UI."
slug: overview_breadcrumb_uiforjsp
position: 1
---

# Breadcrumb JSP Tag Overview

The Breadcrumb JSP tag is a server-side wrapper for the [Kendo UI Breadcrumb](/api/javascript/ui/breadcrumb) widget.

## Getting Started

### Configuration

The Breadcrumb provides a set of default API configuration options that can be set during its initialization. Follow the steps below to configure the Kendo UI Breadcrumb for JSP:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/Breadcrumb/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page:

        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add the `breadcrumb` tag and configure the component:

        <kendo:breadcrumb name="breadcrumb">
			<kendo:breadcrumb-items>
				<kendo:breadcrumb-item type="rootitem" href="https://demos.telerik.com/jsp-ui/" text="All Components" showText="true" icon="home" showIcon="true"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/breadcrumb" text="Breadcrumb" showText="true"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/index" text="Basic Usage" showText="true"></kendo:breadcrumb-item>
			</kendo:breadcrumb-items>
		</kendo:breadcrumb>

## Navigational

The [`navigational`](/api/javascript/ui/breadcrumb/configuration/navigational) configuration determines whether automatic navigation will be enabled. The default value is false. When set to true, the url will be added to the `href` attribute of the Breadcrumb items.

       <kendo:breadcrumb name="breadcrumb" bindToLocation="true" navigational="true"></kendo:breadcrumb>

The [`bindToLocation`](/api/javascript/ui/breadcrumb/configuration/bindtolocation) configuration sets the value ot the widget to the current url ( the location object). In addition, that url will be added to the `href` attribute of the Breadcrumb items through the `navigational` configuration.

## Icons

The Breadcrumb allows to configure the icons of the items and the delimiters.

### Root Icon

The root icon is the first icon and is rendered as a `home` icon. It can be changed through the [`items.icon`](/api/javascript/ui/breadcrumb/configuration/items) configuration. It is also clickable and it will reset the value of the component.

### Item Icon

The icons rendered for each element after the root icon. It is also clickable and can be configured through the [`items.icon`](/api/javascript/ui/breadcrumb/configuration/items).

### Delimiter Icon

The icons that separate the items of the Breadcrumb. 

The example below demonstrates how you can alter the different icons.

        <kendo:breadcrumb name="breadcrumb" delimiterIcon="line">
			<kendo:breadcrumb-items>
				<kendo:breadcrumb-item type="rootitem" href="https://demos.telerik.com/jsp-ui/" text="All Components" showText="true" icon="globe"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/breadcrumb" text="Breadcrumb" showText="true" icon="gear" showIcon="true"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/icons" text="Icons" showText="true" icon= "cloud" showIcon="true"></kendo:breadcrumb-item>
			</kendo:breadcrumb-items>
		</kendo:breadcrumb>

## Editing

You can edit the path set through the Breadcrumb widget if the [`editable`](/api/javascript/ui/breadcrumb/configuration/editable) configuration is enabled. When you click in an empty area of the component or on the current page, the Breadcrumb will enter into editing mode. That will also happen when you `enter` press if the Breadcrumb is focused.

Editing mode shows an input field containing the current value of the widget. Users are allowed to type a new path.

The below example demonstrates how to enable editing of the Breadcrumb.

        <kendo:breadcrumb name="breadcrumb" editable="true">
			<kendo:breadcrumb-items>
				<kendo:breadcrumb-item type= "rootitem" href= "https://demos.telerik.com/jsp-ui/" text= "All Components" showText="true" icon="home"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/breadcrumb" text="Breadcrumb" showText="true"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href= "/editing" text= "Editing" showText="true" icon= "edit" showIcon="true"></kendo:breadcrumb-item>
			</kendo:breadcrumb-items>
		</kendo:breadcrumb>

## Event Handling

### Subscribe to Events

You can subscribe to the [events exposed by Kendo UI Breadcrumb](/api/javascript/ui/breadcrumb#events) by the handler name.

    <kendo:breadcrumb name="breadcrumb" editable="true" click="onClick" change="onChange">
			<kendo:breadcrumb-items>
				<kendo:breadcrumb-item type= "rootitem" href= "https://demos.telerik.com/jsp-ui/" text= "All Components" showText="true" icon="home"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/breadcrumb" text="Breadcrumb" showText="true"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href= "/events" text= "Events" showText="true"></kendo:breadcrumb-item>
			</kendo:breadcrumb-items>
		</kendo:breadcrumb>
    <script>
	    function onClick(e) {
	        kendoConsole.log("Clicked. :: target: " + e.item.text + ". Type :: " + e.item.type);
	    }

	    function onChange(e) {
	        kendoConsole.log("Changed. New Value :: " + e.value);
	    }
    </script>
## Reference

### Existing Instances

You are able to reference an existing Breadcrumb instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [Breadcrumb API](/api/javascript/ui/breadcrumb#methods) to control its behavior.

    <kendo:breadcrumb name="breadcrumb">
			<kendo:breadcrumb-items>
				<kendo:breadcrumb-item type="rootitem" href="https://demos.telerik.com/jsp-ui/" text="All Components" showText="true" icon="home" showIcon="true"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/breadcrumb" text="Breadcrumb" showText="true"></kendo:breadcrumb-item>
				<kendo:breadcrumb-item type="item" href="/index" text="Basic Usage" showText="true"></kendo:breadcrumb-item>
			</kendo:breadcrumb-items>
		</kendo:breadcrumb>
    
    // Put this after your Kendo Breadcrumb tag declaration
    <script>
    $(function() {
        // Notice that the Name() of the Breadcrumb is used to get its client-side instance
        var breadcrumb = $("#breadcrumb").data("kendoBreadcrumb");
    });
    </script>

## See Also

* [Telerik UI for JSP API Reference Folder](/api/jsp/breadcrumb)
