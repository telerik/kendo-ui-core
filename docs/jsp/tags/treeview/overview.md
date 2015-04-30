---
title: Overview
---

# TreeView

The TreeView tag is a server-side wrapper for the [Kendo UI TreeView](/api/web/treeview) widget.

## Getting Started

Here is how to bind the Kendo TreeView to data passed as a model attribute in Spring MVC:

1.  Make sure you have followed all the steps from the [Introduction](/jsp/introduction) help topic.

2.  Create a new action method and pass the Category list to the View:

        @RequestMapping(value = "/local-data", method = RequestMethod.GET)
        public String index(Locale locale, Model model) {
            model.addAttribute("categories", categories.getList());

            return "web/treeview/local-data";
        }

3.  Add kendo taglib mapping to the page

        <%@taglib prefix="kendo" uri="http://www.kendoui.com/jsp/tags"%>

4.  Add a server bound treeview:

        <kendo:treeView name="categoriesTreeView">
            <kendo:dataSource data="${categories}" />
        </kendo:treeView>

## Accessing an Existing TreeView

You can reference an existing TreeView instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/treeview#methods) to control its behavior.

### Accessing an existing TreeView instance

    // Put this after your Kendo TreeView tag declaration
    <script>
    $(function() {
        // Notice that the name attribute of the treeview is used to get its client-side instance
        var treeview = $("#categoriesTreeView").data("kendoTreeView");
    });
    </script>


## Handling Kendo UI TreeView events

You can subscribe to all [events](/api/web/treeview#events) exposed by Kendo UI TreeView:


### Subscribe by handler name

    <kendo:treeView name="categoriesTreeView" select="category_select">
        <kendo:dataSource data="${categories}" />
    </kendo:treeView>

    <script>
        function category_select) {
            // Handle the select event
        }
    </script>

