<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';
require_once '../include/header.php';

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data(chart_sun_position());

$position = new \Kendo\Dataviz\UI\ChartSeriesItem();
$position->type('polarLine')
         ->xField('azimuth')
         ->yField('altitude')
         ->labels(array(
             'template' => '#= dataItem.time.substring(0,2) #h',
             'position' => 'below',
             'visible' => true
         ));

$xAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();
$xAxis->startAngle(-90)
      ->majorUnit(30);

$yAxis = new \Kendo\Dataviz\UI\ChartYAxisItem();
$yAxis->labels(array('visible' => false));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Sun position at equinox'))
      ->dataSource($dataSource)
      ->addSeriesItem($position)
      ->addXAxisItem($xAxis)
      ->addYAxisItem($yAxis);

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
