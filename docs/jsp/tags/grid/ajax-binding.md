---
title: Ajax Binding
---

# Ajax Binding

## Getting started

When configured for ajax binding the Kendo Grid for JSP will make ajax requests when doing paging, sorting, filtering or grouping.

To configure the Kendo Grid for ajax binding follow these steps (using Spring MVC framework):

1.  Add a new action method which will return data to populate the grid:

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public DataSourceResult read() {

        }
2.  Add a new parameter which will be populated with current grid request information - page, sort, group and filter.

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
                //.
            }
        }

5.  In the view configure the grid to use the action method created in the previous steps:

        <kendo:grid name="grid" pageable="true" sortable="true" filterable="true" groupable="true">
            <kendo:grid-columns>
                <kendo:grid-column title="Product Name" field="productName" />
                <kendo:grid-column title="Unit Price" field="unitPrice" format="{0:c}" />
                <kendo:grid-column title="Units In Stock" field="unitsInStock" />
            </kendo:grid-columns>
            <kendo:dataSource pageSize="10" serverPaging="true" serverSorting="true" serverFiltering="true" serverGrouping="true">
                <kendo:dataSource-transport>
                    <kendo:dataSource-transport-read url="${transportReadUrl}" type="POST"  contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total" groups="data">
                        <kendo:dataSource-schema-model>
                            <kendo:dataSource-schema-model-fields>
                                <kendo:dataSource-schema-model-field name="productName" type="string" />
                                <kendo:dataSource-schema-model-field name="unitPrice" type="number" />
                                <kendo:dataSource-schema-model-field name="unitsInStock" type="number" />
                            </kendo:dataSource-schema-model-fields>
                        </kendo:dataSource-schema-model>
                    </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:grid>


The JSON response of the action method will contain only a single page of data. The grid will be bound to that data.

## Enable Client Data Processing during Ajax Binding

In this configuration, Kendo Grid for JSP will request data from the server every time the user changes the page, filters the grid, sorts or groups. This behavior
can be changed by DataSource server operaion options to false:

       <kendo:dataSource pageSize="10" **serverPaging="false" serverSorting="false" serverFiltering="false" serverGrouping="false"**>
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-read url="${transportReadUrl}"/>
           </kendo:dataSource-transport>
       </kendo:dataSource>
