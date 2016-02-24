---
title: Overview
page_title: Overview | TreeList JSP Tag
description: "Get started with the TreeList JSP tag in Kendo UI."
slug: overview_treelist_uiforjsp
position: 1
---

# TreeList JSP Tag Overview

The TreeList JSP tag is a server-side wrapper for the [Kendo UI TreeList](/api/javascript/ui/treelist) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeList.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.

###### Example

        @RequestMapping(value = "/local-data", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("products", product.getList());

            return "web/treelist/local-data";
        }

**Step 3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound TreeList.

###### Example

        <kendo:treeList name="employees" pageable="true">
            <kendo:treeList-columns>
                <kendo:treeList-column title="Product Name" field="productName" />
                <kendo:treeList-column title="Unit Price" field="unitPrice" format="{0:c}" />
                <kendo:treeList-column title="Units In Stock" field="unitsInStock" />
            </kendo:treeList-columns>
            <kendo:dataSource data="${products}" pageSize="10"/>
            <kendo:treeList-pageable input="true" numeric="false" />
        </kendo:treeList>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI TreeList](/api/javascript/ui/treelist#events) by the handler name.

###### Example

      <kendo:treeList name="employees" dataBound="employees_dataBound" change="employees_change">
          <kendo:dataSource data="${data}" pageSize="10"/>
      </kendo:treeList>

      <script>
      function employees_dataBound() {
          //Handle the dataBound event
      }

      function employees_change() {
          //Handle the change event
      }
      </script>

## Reference

### Existing Instances

You are able to reference an existing TreeList instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [TreeList API](/api/javascript/ui/treelist#methods) to control its behavior.

###### Example

      //Put this after your Kendo TreeList tag declaration
      <script>
      $(function() {
          // Notice that the name attribute of the treelist is used to get its client-side instance
          var treelist = $("#employees").data("kendoTreeList");
      });
      </script>

## See Also

Other articles on Telerik UI for JSP and on the TreeList:

* [Overview of the Kendo UI TreeList Widget]({% slug overview_kendoui_treelist_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
