---
title: Overview
page_title: Overview | TreeView JSP Tag
description: "Get started with the TreeView JSP tag in Kendo UI."
slug: overview_treeview_uiforjsp
position: 1
---

# TreeView JSP Tag Overview

The TreeView JSP tag is a server-side wrapper for the [Kendo UI TreeView](/api/javascript/ui/treeview) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeView for binding to data, passed as a model attribute in Spring MVC.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method and pass the **Category** list to the View.

###### Example

        @RequestMapping(value = "/local-data", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("categories", categories.getList());

            return "web/treeview/local-data";
        }

**Step3** Add the Kendo UI `taglib` mapping to the page.

###### Example

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

**Step 4** Add a server-bound treeview.

###### Example

        <kendo:treeView name="categoriesTreeView">
            <kendo:dataSource data="${categories}" />
        </kendo:treeView>

## Event Handling

### Subscribe to Events

You can subscribe to all [events exposed by Kendo UI TreeView](/api/javascript/ui/treeview#events) by the handler name.

###### Example

      <kendo:treeView name="categoriesTreeView" select="category_select">
          <kendo:dataSource data="${categories}" />
      </kendo:treeView>

      <script>
          function category_select) {
              // Handle the select event
          }
      </script>

## Reference

### Existing Instances

You are able to reference an existing TreeView instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, you are able to use the [TreeView API](/api/javascript/ui/treeview#methods) to control its behavior.

###### Example

      // Put this after your Kendo UI TreeView tag declaration
      <script>
      $(function() {
          // Notice that the name attribute of the treeview is used to get its client-side instance
          var treeview = $("#categoriesTreeView").data("kendoTreeView");
      });
      </script>

## See Also

Other articles on Telerik UI for JSP and on the TreeView:

* [Overview of the Kendo UI TreeView Widget]({% slug overview_kendoui_treeview_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
* [Telerik UI for JSP Tags Folder]({% slug overview_autocomplete_uiforjsp %})
