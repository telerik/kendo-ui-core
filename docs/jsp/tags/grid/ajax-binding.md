---
title: Ajax Binding
page_title: Ajax Binding | Grid JSP Tag
description: "Get started with the Ajax binding of the Grid JSP tag in Kendo UI."
slug: ajaxbinding_grid_uiforjsp
position: 3
---

# Ajax Binding

## Getting Started

When configured for Ajax binding, the Kendo UI Grid for JSP makes Ajax requests when doing paging, sorting, filtering, or grouping.

### Configuration

To configure the Kendo UI Grid for Ajax binding, follow the steps below (using the Spring MVC framework).

**Step 1** Add a new action method which will return data to populate the Grid.

###### Example

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public DataSourceResult read() {

        }

**Step 2** Add a new parameter which will be populated with the current Grid request information&mdash;page, sort, group, and filter.

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
                //.
            }
        }

**Step 4** In the view, configure the Grid to use the action method created in the previous steps.

###### Example

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


The JSON response of the action method contains a single page of data only. The Grid is bound to that data.

### Client Data Processing

In the configuration that enables client data processing during Ajax binding, Kendo UI Grid for JSP requests data from the server every time the user changes the page, filters the Grid, sorts, or groups. This behavior can be changed by setting the DataSource server operation options to `false`.

###### Example

       <kendo:dataSource pageSize="10" **serverPaging="false" serverSorting="false" serverFiltering="false" serverGrouping="false"**>
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-read url="${transportReadUrl}"/>
           </kendo:dataSource-transport>
       </kendo:dataSource>

## See Also

Other articles on Telerik UI for JSP and on the Grid:

* [Overview of the Grid JSP Tag]({% slug overview_grid_uiforjsp %})
* [Batch Editing of the Grid]({% slug batchediting_grid_uiforjsp %})
* [Ajax Editing of the Grid]({% slug ajaxediting_grid_uiforjsp %})
* [Overview of the Kendo UI Grid Widget]({% slug overview_kendoui_grid_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
