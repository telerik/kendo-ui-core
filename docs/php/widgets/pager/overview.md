---
title: Overview
page_title: Overview | Pager PHP Class
description: "Get started with the Pager PHP class in Kendo UI."
slug: overview_pager_uiforphp
---

# Pager PHP Class Overview

The Kendo UI Pager for PHP is a server-side wrapper for the [Kendo UI Pager](/api/javascript/ui/pager) widget.

The Kendo UI Pager widget enables splitting a set of data into pages with flexible and intuitive UI. The user interface of the Pager is useful for paging data-bound components that have a data source and do not have a built-in UI for paging such as the ListView or scenarios that require  paging options&mdash;for example, Kendo Templates with a data source.

 You can customize the page number templates or use an input for navigation to a specific page, toggle the visibility of previous and next buttons, include a pagesize dropdown and alter the information messages. The pager API also offers the ability to localize its messages.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Pager for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Pager](/api/php/Kendo/UI/Pager).


        $pager = new \Kendo\UI\Pager('pager');
        $pager->dataSourceId("datasource1");

**Step 3** Add the data source and call its `read()` method:


        <script>
            var datasource1 = new kendo.data.DataSource({
                data: [
                    { productName: "Tea", category: "Beverages" },
                    { productName: "Coffee", category: "Beverages" },
                    { productName: "Ham", category: "Food" },
                    { productName: "Bread", category: "Food" }
                ],
                pageSize: 2
            });

            $(document).ready(function () {
                datasource1.read();
            });
        </script>

**Step 4** Output the Pager by echoing the result of the `render` method.

       <?php echo $pager->render(); ?>
        
## Pager Settings and Types

The Pager has two types:

- `numeric`
- `input`

The Pager is `numeric` by default. To configure the number of buttons that will be shown in a numeric pager, use the `buttonCount` property. To configure the pager to accept only use input, set the `numeric` property to `false` and the `input` property to `true`.

## Responsive

The Kendo UI Pager is responsive by default. To disable the responsive behavior and have all of its elements visible at all times set the `responsive` property to `false`. 

The Pager widget determines which internal elements to render based on its width. When the Pager width is greater than or equal to 600 pixels, all elements are visible:

When the Pager width is greater than or equal to 600 pixels, all elements are visible:

![A Pager widget at over 600px resolution](../../../images/pager-responsive/over600.png)

When the Pager width is greater than 480 and less than 600 pixels, the label showing the current paging information is hidden:

![A Pager widget between 480 and 600px resolution](../../../images/pager-responsive/480_600.png)

When the Pager width is greater than 360 and less than 480 pixels, the current page is represented by a native `<select/>` element. The `pageSizes` dropdown and the label showing the current paging information are hidden.

![A Pager widget between 360 and 480px resolution](../../../images/pager-responsive/360_480.png)

When the Pager width is less than 360 pixels, the current page is represented by a native `<select/>` element. The `pageSizes` dropdown and the label showing the current paging information are hidden.

![A Pager widget under 360 pixels](../../../images/pager-responsive/under360.png)

## Templates

The Kendo UI Pager features templates for its page number links.

To change the look of the currently selected page number, use the `selectTemplate` or `selectTemplateId` option.

To change the look of the non-selected page number links, use the `linkTemplate` or the `linkTemplateId` option.

## Messages

The Pager provides options for defining the tooltips for its page and navigation links, information text and labels.

To localize the messages, set the desired strings in the `PagerMessages` class.

## Event Handling

You can subscribe to all Pager [events](/api/javascript/ui/pager#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.


    $pager = new \Kendo\UI\Pager('pager');
    $pager->change("onChange");

    <script>
        function onChange(e) {
            console.log("pager change event");
        };
    </script>

## Reference

### Client-Side Instances

You are able to reference an existing Pager instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [Pager API](/api/javascript/ui/pager#methods) to control its behavior.


        $pager = new \Kendo\UI\Pager('pager');

        <script>
            $(function() {
                // The constructor parameter is used as the 'id' HTML attribute of the pager
                var pager = $("#pager").data("kendoPager");
            });
        </script>

## See Also

* [Overview of the Kendo UI Pager Widget]({% slug overview_kendoui_pager_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/Pager)
