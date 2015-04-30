---
title: Ajax Binding
---

# Ajax Binding

## Getting started

When configured for ajax binding the Kendo ListView for JSP will make ajax requests when doing paging.

To configure the Kendo ListView for ajax binding follow these steps (using Spring MVC framework):

1.  Add a new action method which will return data to populate the listview:

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public DataSourceResult read() {

        }
2.  Add a new parameter which will be populated with current listview request information - page, sort, group and filter.

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public  DataSourceResult read(@RequestBody DataSourceRequest request) {

        }
3.  Use the request information to proccess the data and return the result as JSON.

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

            return product.getList(request);
        }

    *The result format in this case have similar to the following signiture:

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

5.  In the view configure the listview to use the action method created in the previous steps:

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


The JSON response of the action method will contain only a single page of data. The listview will be bound to that data.

## Enable Client Data Processing during Ajax Binding

In this configuration, Kendo ListView for JSP will request data from the server every time the user changes the page, filters the grid, sorts or groups. This behavior can be changed by DataSource server operaion options to false:

       <kendo:dataSource pageSize="10" **serverPaging="false" serverSorting="false" serverFiltering="false" serverGrouping="false"**>
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-read url="${transportReadUrl}"/>
           </kendo:dataSource-transport>
       </kendo:dataSource>
