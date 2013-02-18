<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_screen_resolution();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->field('share')
       ->categoryField('resolution')
       ->visibleInLegendField('visibleInLegend')
       ->padding(10);

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'remote-data.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->addSortItem(array('field' => 'order', 'dir' => 'asc'))
           ->addGroupItem(array('field' => 'year'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('text' => '1024x768 screen resolution trends'))
      ->dataSource($dataSource)
      ->addSeriesItem($series)
      ->legend(array('position' => 'top'))
      ->tooltip(array('visible' => true, 'template' => '#= dataItem.resolution #: #= value #% (#= dataItem.year #)'))
      ->seriesDefaults(array('type' => 'donut', 'startAngle' => 270));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
