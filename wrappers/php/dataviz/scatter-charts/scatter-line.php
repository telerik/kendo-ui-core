<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

$series08c = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series08c->name('0.8C')
          ->data(array(
            array(10, 10), array(15, 20), array(20, 25), array(32, 40), array(43, 50), array(55, 60), array(60, 70), array(70, 80), array(90, 100)
          ));

$series16c = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series16c->name('1.6C')
          ->data(array(
            array(10, 40), array(17, 50), array(18, 70), array(35, 90), array(47, 95), array(60, 100)
          ));

$series31c = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series31c->name('1.6C')
          ->data(array(
              array(10, 70), array(13, 90), array(25, 100)
          ));

$xAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();
$xAxis->max(90)
      ->labels(array('format' => '{0}m'))
      ->title(array('text' => 'Time'));

$yAxis = new \Kendo\Dataviz\UI\ChartYAxisItem();
$yAxis->max(100)
      ->labels(array('format' => '{0}%'))
      ->title(array('text' => 'Charge'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Charge current vs. charge time'))
      ->legend(array('visible' => true))
      ->seriesDefaults(array('type' => 'scatterLine'))
      ->addXAxisItem($xAxis)
      ->addYAxisItem($yAxis)
      ->addSeriesItem($series08c, $series16c, $series31c)
      ->tooltip(array('visible' => true, 'format' => '{1}% in {0} minutes'));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
