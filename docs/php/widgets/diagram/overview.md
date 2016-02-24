---
title: Overview
page_title: Overview | Diagram PHP Class
description: "Get started with the Diagram PHP class in Kendo UI."
slug: overview_diagram_uiforphp
position: 1
---

# Diagram PHP Class Overview

The Kendo UI Diagram for PHP is a server-side wrapper for the [Kendo UI Diagram](/api/javascript/dataviz/ui/diagram) widget.

## Getting Started

You can populate a Kendo UI Diagram for PHP with [remote binding]({% slug remotebinding_chart_uiforphp %}). The Diagram makes AJAX requests and is bound to JSON result.

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI Diagram for PHP with Ajax biniding.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Create a [Diagram](/api/javascript/dataviz/ui/diagram) and configure it.

###### Example

        // Specify the url of the PHP page which will act as the remote service
        $read = new \Kendo\Data\DataSourceTransportRead();
        $read->url('index.php')
              ->contentType('application/json')
              ->type('POST');

        $transport = new \Kendo\Data\DataSourceTransport();
        $transport->read($read);

        // Configure the model
        $model = new \Kendo\Data\HierarchicalDataSourceSchemaModel();
        $model->children("items");

        $schema = new \Kendo\Data\HierarchicalDataSourceSchema();
        $schema->model($model);

        // Configure data source
        $dataSource = new \Kendo\Data\HierarchicalDataSource();
        $dataSource->transport($transport)
                   ->schema($schema);

**Step 3** Create a Diagram and set its data source.

###### Example

        $layout = new \Kendo\Dataviz\UI\DiagramLayout();
        $layout->type('layered');

        $diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
        $diagram->dataSource($dataSource)
                ->layout($layout);

**Step 4** Output the Diagram by echoing the result of the `render` method.

###### Example

        echo $diagram->render();


## Event Handling

You can subscribe to all Diagram [events](/api/javascript/dataviz/ui/diagram#events).

### Specify Function Names

The example below demonstrates how to subscribe for events by specifying a JavaScript function name.

###### Example

        <?php
        $diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
        $diagram->dataSource($dataSource)
                ->layout($layout);

        // The 'diagram_dataBound' JavaScript function will handle the 'dataBound' event of the diagram
        $diagram->dataBound('diagram_dataBound');

        echo $diagram->render();
        ?>
        <script>
        function diagram_dataBound() {
            // Handle the dataBound event
        }
        </script>

### Provide Inline Code

The example below demonstrates how to subscribe to events by providing inline JavaScript code.

###### Example

        <?php
        $diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
        $diagram->dataSource($dataSource)
                ->layout($layout);

        // Provide inline JavaScript code that will handle the 'dataBound' event of the diagram
        $diagram->dataBound('function() { /* Handle the dataBound event */ }');

        echo $diagram->render();
        ?>

<!--*-->
## Reference

### Client-Side Instances

You are able to reference an existing Diagram instance via the [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [Diagram API](/api/javascript/dataviz/ui/diagram#methods) to control its behavior.

###### Example

        // Put this after your Kendo Diagram for PHP
        <script>
            $(function() {
                // Notice that the name of the diagram is used to get its client-side instance
                var diagram = $("#diagram").data("kendoDiagram");
                diagram.layout();
            });
        </script>

## See Also

Other articles on Telerik UI for PHP and on the Diagram:

* [Overview of the Kendo UI Diagram Widget]({% slug overview_kendoui_diagram_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
