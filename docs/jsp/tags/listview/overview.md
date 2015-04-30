---
title: Overview
---

# LsitView

The ListView tag is a server-side wrapper for the [Kendo UI ListView](/api/web/listview) widget.

## Getting Started

Here is how to configure the Kendo ListView for binding to a data passed as model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the Products table to the View:

        @RequestMapping(value = "/index", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("products", product.getList());
    
            return "web/listview/index";
        }

3.  Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a server bound listview:

        <kendo:listView name="listView" template="template" pageable="true">
			<kendo:dataSource pageSize="12" data="${products}">		
			</kendo:dataSource>		
		</kendo:listView>

5.	Add listview item template

		<script type="text/x-kendo-tmpl" id="template">
			<div class="product">
		        <img src="../../resources/web/foods/#=productId#.jpg" alt="#=productName# image" />
		        <h3>#=productName#</h3>
		    	<p>#=kendo.toString(unitPrice, "c")#</p>
			</div>
		</script>

## Accessing an Existing ListView

You can reference an existing ListView instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/listview#methods) to control its behavior.

### Accessing an existing ListView instance

    //Put this after your Kendo ListView tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the grid is used to get its client-side instance
        var listview = $("#listView").data("kendoListView");
    });
    </script>


## Handling Kendo UI ListView events

You can subscribe to all [events](/api/web/listview#events) exposed by Kendo UI listview:


### Subscribe by handler name

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
