<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';
require_once '../include/header.php';

$requestData = array(
    array('caption' => 'DNS Lookup', 'elapsed' => 20),
    array('caption' => 'Connecting', 'elapsed' => 122),
    array('caption' => 'Sending', 'elapsed' => 30),
    array('caption' => 'Waiting', 'elapsed' => 421),
    array('caption' => 'Receiving', 'elapsed' => 357),
    array('caption' => 'Total', 'summary' => 'total')
);

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data($requestData);

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('horizontalWaterfall')
       ->field('elapsed')
       ->categoryField('caption')
       ->summaryField('summary')
       ->color(new \Kendo\JavaScriptFunction('pointColor'));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->labels(array('format' => '{0} ms'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Request latency breakdown'))
      ->dataSource($dataSource)
      ->legend(array('visible' => false))
      ->addSeriesItem($series)
      ->axisDefaults(array('majorGridLines' => array('visible' => false)))
      ->addValueAxisItem($valueAxis);

echo $chart->render();

require_once '../include/footer.php';
?>
<script>
    var palette = [
        "#95c3cd", "#abc75b", "#c6816f", "#968cb2", "#c0c0c0", "#2ba6ff"
    ];

    function pointColor(point) {
        return palette[point.index % palette.length];
    }
</script>
