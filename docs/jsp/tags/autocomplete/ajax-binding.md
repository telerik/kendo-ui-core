---
title: Ajax Binding
---

# Ajax Binding

## Getting started

When configured for ajax binding the Kendo AutoComplete for JSP will make ajax requests when doing filtering.

To configure the Kendo AutoComplete for ajax binding follow these steps (using Spring MVC framework):

1.  Add a new action method which will return data to populate the autocomplete:

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read() {

        }

2.  Add a new parameter which will be populated with current autocomplete request information - filter.

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

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
                //.
            }
        }

5.  In the view configure the autocomplete to use the action method created in the previous steps:
        <c:url value="/web/autocomplete/remote-data/read" var="readUrl" />

        <kendo:autoComplete name="products" dataTextField="productName">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:autoComplete>

## Enable Client Data Processing during Ajax Binding

In this configuration, Kendo AutoComplete for JSP will request data from the server every time the user types in the widget. This behavior
can be changed by DataSource server operaion options to false:

       <kendo:dataSource serverFiltering="false">
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-read url="${readUrl}"/>
           </kendo:dataSource-transport>
       </kendo:dataSource>
