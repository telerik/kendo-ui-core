<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_wind_data();

    echo json_encode($result);

    exit;
}

require_once '../include/header.php';

$frequency = new \Kendo\Dataviz\UI\ChartSeriesItem();
$frequency->type('radarColumn')
          ->stack(true)
          ->field('frequency');

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->field('dirText');

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->visible(false);

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'grouped-data.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();
$dataSource->transport($transport)
           ->addGroupItem(array('field' => 'category'))
           ->addSortItem(array('field' => 'dir', 'dir' => 'asc'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Wind Rose'))
      ->legend(array(
        'position' => 'right',
        'labels' => array('template' => '#= (series.data[0] || {}).categoryText # m/s')))
      ->dataSource($dataSource)
      ->seriesColors(array(
        '#1b79e4', '#3b6ad3', '#5d5ac2',
        '#8348ae', '#a23a9d', '#c42a8c', '#e51a7a'))
      ->addSeriesItem($frequency)
      ->addCategoryAxisItem($categoryAxis)
      ->addValueAxisItem($valueAxis)
      ->tooltip(array(
          'template' => '#= category # (#= dataItem.categoryText # m/s) #= value #%',
          'visible' => true));

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
