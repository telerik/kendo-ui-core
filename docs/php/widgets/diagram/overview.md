---
title: Overview
page_title: How to use Diagram PHP class | Kendo UI documentation
description: User Guide for server-side wrapper for Kendo UI Diagram for PHP.
---

# Diagram

The Diagram for PHP is a server-side wrapper for the [Kendo UI Diagram](/api/dataviz/diagram) widget.

## Getting Started

You can populate a Kendo Diagram for PHP with [remote binding](/php/widgets/chart/remote-binding). The Diagram makes AJAX requests and is bound to JSON result

Here is how to configure the Kendo Diagram with ajax binding:

1. Follow the steps from the [introduction](/php/introduction) - include the autoloader, JavaScript and CSS files.

1. Create a data source and configure it:

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

1. Create a diagram and set its data source.

        $layout = new \Kendo\Dataviz\UI\DiagramLayout();
        $layout->type('layered');

        $diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
        $diagram->dataSource($dataSource)
                ->layout($layout);

1. Output the diagram by echo-ing the result of the render method.

        echo $diagram->render();

## Accessing an Existing Diagram

You can reference an existing diagram instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/dataviz/diagram#methods) to control its behavior.

### Accessing an existing Diagram instance

        // Put this after your Kendo Diagram for PHP
        <script>
            $(function() {
                // Notice that the name of the diagram is used to get its client-side instance
                var diagram = $("#diagram").data("kendoDiagram");
                diagram.layout();
            });
        </script>

## Handling Kendo UI Diagram events

You can subscribe to all [events](/api/dataviz/diagram#events) exposed by Kendo UI Diagram:

### Example - subscribing by specifying JavaScript function name

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

### Example - providing inline JavaScript code

        <?php
        $diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
        $diagram->dataSource($dataSource)
                ->layout($layout);

        // Provide inline JavaScript code that will handle the 'dataBound' event of the diagram
        $diagram->dataBound('function() { /* Handle the dataBound event */ }');

        echo $diagram->render();
        ?>

