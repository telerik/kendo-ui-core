---
title: Overview
page_title: Overview | TreeView PHP Class
description: "Get started with the TreeView PHP class in Kendo UI."
slug: overview_treeview_uiforphp
position: 1
---

# TreeView PHP Class Overview

The Kendo UI TreeView for PHP is a server-side wrapper for the [Kendo UI TreeView](/api/javascript/ui/treeview) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TreeView.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [TreeView](/api/php/Kendo/UI/TreeView), configure its [items](/api/php/Kendo/UI/TreeView#addItem).

###### Example

        <?php
        $treeview = new \Kendo\UI\TreeView('treeview');

        $root = new \Kendo\UI\TreeViewItem('Root');
        $root->expanded(true);

        $child = new \Kendo\UI\TreeViewItem('Child');
        $root->addItem($child);

        $treeview->addItem($root);
        ?>

**Step 3** Output the TreeView by echoing the result of the `render` method.

###### Example

        <?php
        echo $treeview->render();
        ?>

## Event Handling

You can subscribe to all TreeView [events](/api/javascript/ui/treeview#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $treeview = new \Kendo\UI\TreeView('treeview');

        // The 'treeview_collapse' JavaScript function will handle the 'treeview_collapse' event of the treeview
        $treeview->collapse('treeview_collapse');

        echo $treeview->render();
        ?>
        <script>
        function treeview_collapse() {
            // Handle the collapse event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to provide inline JavaScript code.

###### Example

        <?php
        $treeview = new \Kendo\UI\TreeView('treeview');

        // Provide inline JavaScript code that will handle the 'collapse' event of the treeview
        $treeview->collapse('function() { /* Handle the collapse event */ }');

        echo $treeview->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You can reference the client-side Kendo UI TreeView instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TreeView API](/api/javascript/ui/treeview#methods) to control its behavior.

###### Example

        <?php
        $treeview = new \Kendo\UI\TreeView('treeview');
        echo $treeview->render();
        ?>
        <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the treeview
            var treeview = $("#treeview").data("kendoTreeView")
        });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the TreeView:

* [Local Binding of the TreeView PHP Class]({% slug localbinding_treeview_uiforphp %})
* [Remote Binding of the TreeView PHP Class]({% slug remotebinding_treeview_uiforphp %})
* [Overview of the Kendo UI TreeView Widget]({% slug overview_kendoui_treeview_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
