---
title: Ajax Binding
page_title: Ajax Binding - ComboBox JSP Tag
description: "Get started with the Ajax binding of the ComboBox JSP tag in Kendo UI."
slug: ajaxbinding_combobox_uiforjsp
position: 2
---

# Ajax Binding

## Getting Started

When configured for Ajax binding, the Kendo UI ComboBox for JSP makes Ajax requests when doing filtering.

### Configuration

To configure the Kendo UI ComboBox for Ajax binding, follow the steps below (using the Spring MVC framework).

**Step 1** Add a new action method which will return data to populate the ComboBox.



        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read() {

        }

**Step 2** Add a new parameter, which is to be populated with the current ComboBox request information&mdash;filter.



        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

        }

**Step 3** Use the request information to process the data and return the result as JSON.



        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody DataSourceResult read(@RequestBody DataSourceRequest request) {

            return product.getList(request);
        }

The result format in this case is similar to the signature, demonstrated in the example below.




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

**Step 4** In the view, configure the ComboBox to use the action method created in the previous steps.



        <c:url value="/web/combobox/remote-data/read" var="readUrl" />

        <kendo:combobox name="productComboBox" dataTextField="productName" dataValueField="productId" filter="contains">
            <kendo:dataSource serverFiltering="true">
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
                <kendo:dataSource-schema data="data" total="total">
                </kendo:dataSource-schema>
            </kendo:dataSource>
        </kendo:comboBox>

### Client Data Processing

In the configuration that enables client data processing during Ajax binding, Kendo UI ComboBox for JSP requests data from the server every time the user types in the widget. This behavior can be changed by setting the DataSource server operation options to `false`.



       <kendo:dataSource serverFiltering="false">
           <kendo:dataSource-transport>
               <kendo:dataSource-transport-read url="${readUrl}"/>
           </kendo:dataSource-transport>
       </kendo:dataSource>

## See Also

* [Overview of the ComboBox JSP Tag]({% slug overview_combobox_uiforjsp %})
* [Overview of the ComboBox Widget]({% slug overview_kendoui_combobox_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
