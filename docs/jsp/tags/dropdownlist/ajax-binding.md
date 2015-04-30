---
title: Ajax Binding
---

# Ajax Binding

## Getting started

When configured for ajax binding the Kendo DropDownList for JSP will make ajax request to bind the widget.

To configure the Kendo DropDownList for ajax binding follow these steps (using Spring MVC framework):

1.  Add a new action method which will return data to populate the dropdownlist:

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody List<?> DataSourceResult read() {

        }

3. Return the result as JSON.

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody List<?> DataSourceResult read() {

            return product.getList();
        }

5.  In the view configure the dropdownlist to use the action method created in the previous steps:
        <c:url value="/web/dropdownlist/remote-data/read" var="readUrl" />

        <kendo:dropdownlist name="productDropDownList" dataTextField="productName" dataValueField="productId">
            <kendo:dataSource>
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
            </kendo:dataSource>
        </kendo:dropdownlist>
