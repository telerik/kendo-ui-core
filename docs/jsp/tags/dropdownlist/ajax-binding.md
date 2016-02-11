---
title: Ajax Binding
page_title: Ajax Binding | DropDownList JSP Tag
description: "Get started with the Ajax binding of the DropDownList JSP tag in Kendo UI."
slug: ajaxbinding_dropdownlist_uiforjsp
position: 2
---

# Ajax Binding

## Getting Started

When configured for Ajax binding, the Kendo UI DropDownList for JSP makes an Ajax request to bind the widget.

### Configuration

To configure the Kendo UI DropDownList for Ajax binding, follow the steps below (using the Spring MVC framework).

**Step 1** Add a new action method which will return data to populate the DropDownList.

###### Example

        @Autowired
        private ProductDao product;

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody List<?> DataSourceResult read() {

        }

**Step 2** Return the result as JSON.

###### Example

        @RequestMapping(value = "/remote-data/read", method = RequestMethod.POST)
        public @ResponseBody List<?> DataSourceResult read() {

            return product.getList();
        }

**Step 3** In the view, configure the DropDownList to use the action method created in the previous steps.

###### Example

        <c:url value="/web/dropdownlist/remote-data/read" var="readUrl" />

        <kendo:dropdownlist name="productDropDownList" dataTextField="productName" dataValueField="productId">
            <kendo:dataSource>
                <kendo:dataSource-transport>
                   <kendo:dataSource-transport-read url="${readUrl}" type="POST" contentType="application/json"/>
                </kendo:dataSource-transport>
            </kendo:dataSource>
        </kendo:dropdownlist>

## See Also

Other articles on Telerik UI for JSP and on the DropDownList:

* [Overview of the DropDownList JSP Tag]({% slug overview_dropdownlist_uiforjsp %})
* [Overview of the DropDownList Widget]({% slug ajaxbinding_dropdownlist_uiforjsp %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
