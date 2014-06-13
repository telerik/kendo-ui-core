<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = array(
        array('name' => 'List', 'value' => 100),
        array('name' => 'List\nDiscount', 'value' => -5),
        array('name' => 'Invoice', 'summary' => 'total'),
        array('name' => 'Invoice\nDiscount', 'value' => -6),
        array('name' => 'Rebates', 'value' => -3),
        array('name' => 'Errors', 'value' => -1.1),
        array('name' => 'Pocket\nPrice', 'summary' => 'total'),
        array('name' => 'Cost', 'value' => -57.1),
        array('name' => 'Handling', 'value' => -0.5),
        array('name' => 'Pocket\nMargin', 'summary' => 'total')
    );

    echo json_encode($result);

    exit;
}

require_once '../include/header.php';

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'remote-data-binding.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();
$dataSource->transport($transport);

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('waterfall')
       ->field('value')
       ->categoryField('name')
       ->summaryField('summary')
       ->color(new \Kendo\JavaScriptFunction('pointColor'))
       ->labels(array('visible' => true, 'format' => 'C', 'position' => 'outsideEnd'));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->labels(array('format' => 'C'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => '"Pocket price" waterfall'))
      ->dataSource($dataSource)
      ->legend(array('visible' => false))
      ->addSeriesItem($series)
      ->addValueAxisItem($valueAxis);

echo $chart->render();

require_once '../include/footer.php';
?>
<script>
    function pointColor(point) {
        var summary = point.dataItem.summary;
        if (summary) {
            return summary == "total" ? "#555" : "gray";
        }

        if (point.value > 0) {
            return "green";
        } else {
            return "red";
        }
    }
</script>
