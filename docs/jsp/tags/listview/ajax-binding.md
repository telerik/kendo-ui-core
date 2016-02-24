---
title: Ajax Binding
page_title: Ajax Binding | ListView JSP Tag
description: "Get started with the Ajax binding of the ListView JSP tag in Kendo UI."
slug: ajaxbinding_listview_uiforjsp
position: 3
---

# Ajax Binding

## Getting Started

When configured for Ajax binding, the Kendo UI ListView for JSP makes Ajax requests when doing paging.

### Configuration

To configure the Kendo UI ListView for Ajax binding, follow the steps below (using the Spring MVC framework).

**Step 1** Add a new action method which will return data to populate the ListView.

###### Example

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public DataSourceResult read() {

        }

**Step 2** Add a new parameter which will be populated with the current ListView request information&mdash;page, sort, group, and filter.

###### Example

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public  DataSourceResult read(@RequestBody DataSourceRequest request) {

        }

**Step 3** Use the request information to process the data and return the result as JSON.

###### Example

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

            return product.getList(request);
        }

The result format in this case is similar to the signature, demonstrated in the example below.

###### Example

        public class DataSourceResult {
            public long getTotal() {
                //..
            }

            public void setTotal(long total) {
                //..
            }

            public List<?> getData() {
                //..
            }

            public void setData(List<?> data) {
                //..
            }

            public Map<String, Object> getAggregates() {
                //..
            }

            public void setAggregates(Map<String, Object> aggregates) {
                //..
            }
        }

**Step 4** In the view, configure the ListView to use the action method created in the previous steps.

###### Example

        <kendo:listView name="listView" template="template" pageable="true">
			<kendo:dataSource pageSize="12" serverPaging="true">
				<kendo:dataSource-transport>
					<kendo:dataSource-transport-read url="${transportReadUrl}" contentType="application/json" type="POST"/>
				</kendo:dataSource-transport>
				<kendo:dataSource-schema data="data" total="total"></kendo:dataSource-schema>
			</kendo:dataSource>		
		</kendo:listView>

		<script type="text/x-kendo-tmpl" id="template">
			<div class="product">
		        <img src="../../resources/web/foods/#=productId#.jpg" alt="#=productName# image" />
		        <h3>#=productName#</h3>
		    	<p>#=kendo.toString(unitPrice, "c")#</p>
			</div>
		</script>

The JSON response of the action method contains a single page of data only. The ListView is bound to that data.

### Client Data Processing

In the configuration that enables client data processing during Ajax binding, Kendo UI ListView for JSP requests data from the server every time the user changes the page, filters, sorts, or groups. This behavior can be changed by setting the DataSource server operation options to `false`.

###### Example

       <kendo:dataSource pageSize="10" serverPaging="false" serverSorting="false" serverFiltering="false" serverGrouping="false">
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-read url="${transportReadUrl}"/>
           </kendo:dataSource-transport>
       </kendo:dataSource>

## See Also

Other articles on Telerik UI for JSP and on the ListView:

* [Overview of the ListView JSP Tag]({% slug overview_listview_uiforjsp %})
* [Editing of the ListView]({% slug editing_listview_uiforjsp %})
* [Overview of the Kendo UI ListView Widget]({% slug overview_kendoui_listview_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
