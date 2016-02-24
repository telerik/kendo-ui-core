---
title: Overview
page_title: Overview | ListView JSP Tag
description: "Get started with the ListView JSP tag in Kendo UI."
slug: overview_listview_uiforjsp
position: 1
---

# LsitView JSP Tag Overview

The ListView JSP tag is a server-side wrapper for the [Kendo UI ListView](/api/javascript/ui/listview) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Grid for binding to data passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the **Products** table to the View.

###### Example

        @RequestMapping(value = "/index", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("products", product.getList());

            return "web/listview/index";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound ListView.

###### Example

        <kendo:listView name="listView" template="template" pageable="true">
			<kendo:dataSource pageSize="12" data="${products}">		
			</kendo:dataSource>		
		</kendo:listView>

**Step 5** Add the ListView item template.

###### Example

		<script type="text/x-kendo-tmpl" id="template">
			<div class="product">
		        <img src="../../resources/web/foods/#=productId#.jpg" alt="#=productName# image" />
		        <h3>#=productName#</h3>
		    	<p>#=kendo.toString(unitPrice, "c")#</p>
			</div>
		</script>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI ListView](/api/javascript/ui/listview#events) by the handler name.

###### Example

	<kendo:listView name="listView" template="template" pageable="true"
		dataBound="listView_dataBound" change="listView_change">
			<kendo:dataSource pageSize="12" data="${products}">		
			</kendo:dataSource>		
	</kendo:listView>

    <script>
    function listView_dataBound() {
        //Handle the dataBound event
    }

    function listView_change() {
        //Handle the change event
    }
    </script>

## Reference

### Existing Instances

You are able to reference an existing ListView instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [ListView API](/api/javascript/ui/listview#methods) to control its behavior.

###### Example

    //Put this after your Kendo ListView tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the grid is used to get its client-side instance
        var listview = $("#listView").data("kendoListView");
    });
    </script>

## See Also

Other articles on Telerik UI for JSP and on the ListView:

* [Editing of the ListView]({% slug editing_listview_uiforjsp %})
* [Ajax Binding of the ListView]({% slug ajaxbinding_listview_uiforjsp %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
