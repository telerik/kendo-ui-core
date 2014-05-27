<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_antenna_gain();

    echo json_encode($result);

    exit;
}

require_once '../include/header.php';

$gain = new \Kendo\Dataviz\UI\ChartSeriesItem();
$gain->type('polarLine')
      ->xField('azimuth')
      ->yField('gain');

$xAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();
$xAxis->majorUnit(30);

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'remote-data-binding.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();
$dataSource->transport($transport);

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Antenna Gain (dB)'))
      ->dataSource($dataSource)
      ->addSeriesItem($gain)
      ->addXAxisItem($xAxis);

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
