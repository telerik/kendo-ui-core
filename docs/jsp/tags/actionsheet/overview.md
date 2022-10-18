---
title: Overview
page_title: Overview - ActionSheet JSP Tag 
description: "Get started with the ActionSheet JSP tag in Kendo UI."
slug: overview_actionsheet_uiforjsp
position: 1
---

# ActionSheet JSP Tag Overview

The Kendo UI ActionSheet JSP tag is a server-side wrapper for the [Kendo UI ActionSheet](https://demos.telerik.com/kendo-ui/actionsheet/index) widget.

The Kendo UI ActionSheet is a dialog that displays a set of options for the user to choose from. It appears on top of the app's content, and the user must manually dismiss it before resuming the interaction with the app.

## Getting Started

### Configuration

The ActionSheet provides a set of [default API configuration options](/api/php/Kendo/UI/actionsheet) that can be set during its initialization. Follow the steps below to configure the Kendo UI ActionSheet JSP tag:

**Step 1** Make sure you followed all the steps in the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method to render the view:

        @RequestMapping(value = {"index"}, method = RequestMethod.GET)
        public String index() {

            return "web/actionsheet/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page:

        <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add the `actionsheet` tag and configure the component:

        <kendo:actionSheet name="actionsheet" title="Select item">
                <kendo:actionSheet-items>
                	<kendo:actionSheet-item text="Edit Item" iconClass="k-icon k-i-edit"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Add to Favorites" iconClass="k-icon k-i-heart"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Cancel" iconClass="k-icon k-i-cancel" group="bottom"></kendo:actionSheet-item>
                </kendo:actionSheet-items>
        </kendo:actionSheet>

## Items

The Kendo UI ActionSheet's items configuration allows you to set specific attributes of the ActionSheet items. You can set their:

- text
- icon
- group (items can be segregated in two groups - top and bottom.)
- description 
- click event handler name

For the full set, refer to the [API reference](api/javascript/ui/actionsheet/configuration/items). 

        <kendo:actionSheet name="actionsheet" title="Select item">
                <kendo:actionSheet-items>
                	<kendo:actionSheet-item text="Edit Item" iconClass="k-icon k-i-edit" description="Select to enter edit mode." click="onClick"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Add to Favorites" iconClass="k-icon k-i-heart" click="onClick"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Cancel" iconClass="k-icon k-i-cancel" group="bottom" click="onClick"></kendo:actionSheet-item>
                </kendo:actionSheet-items>
        </kendo:actionSheet>

        <script>
    	        function onClick(e) {
        	        e.preventDefault();
        	        var actionsheet = $("#actionsheet").data("kendoActionSheet");
        	        actionsheet.close();
    	        }
        </script>

## Event Handling

### Subscribe to Events

You can subscribe to the [events exposed by Kendo UI ActionSheet](/api/javascript/ui/actionsheet#events) by the handler name.

        <kendo:actionSheet name="actionsheet" title="Select item" open="onOpen" close="onClose">
                <kendo:actionSheet-items>
                        <kendo:actionSheet-item text="Edit Item" iconClass="k-icon k-i-edit" click="onClick"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Add to Favorites" iconClass="k-icon k-i-heart" click="onClick"></kendo:actionSheet-item>
                	 <kendo:actionSheet-item text="Upload New" iconClass="k-icon k-i-upload" click="onClick"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Cancel" iconClass="k-icon k-i-cancel" group="bottom" click="onClick"></kendo:actionSheet-item>
                </kendo:actionSheet-items>
        </kendo:actionSheet>
        <script>
	    function onOpen(e) {
	       // handle the ActionSheet open event
	    }

            function onClose(e) {
	       // handle the ActionSheet close event
	    }
      
        </script>
## Reference

### Existing Instances

You are able to reference an existing ActionSheet instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [ActionSheet API](/api/javascript/ui/actionsheet#methods) to control its behavior.

        <kendo:actionSheet name="actionsheet" title="Select item" open="onOpen" close="onClose">
                <kendo:actionSheet-items>
                        <kendo:actionSheet-item text="Edit Item" iconClass="k-icon k-i-edit" click="onClick"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Add to Favorites" iconClass="k-icon k-i-heart" click="onClick"></kendo:actionSheet-item>
                	 <kendo:actionSheet-item text="Upload New" iconClass="k-icon k-i-upload" click="onClick"></kendo:actionSheet-item>
                	<kendo:actionSheet-item text="Cancel" iconClass="k-icon k-i-cancel" group="bottom" click="onClick"></kendo:actionSheet-item>
                </kendo:actionSheet-items>
        </kendo:actionSheet>
    
    // Put this after your Kendo ActionSheet tag declaration
    <script>
        $(function() {
                // Notice that the name of the ActionSheet is used to get its client-side instance
                var actionSheet = $("#actionsheet").data("kendoActionSheet");
        });
    </script>

## See Also

* [Telerik UI for JSP API Reference Folder](/api/jsp/actionsheet)
