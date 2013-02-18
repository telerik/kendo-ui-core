<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

$series2008 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series2008->name('January 2008')
           ->data(array(
               array(16.4, 5.4), array(21.7, 2), array(25.4, 3), array(19, 2), array(10.9, 1), array(13.6, 3.2), array(10.9, 7.4), array(10.9, 0), array(10.9, 8.2), array(16.4, 0), array(16.4, 1.8), array(13.6, 0.3), array(13.6, 0), array(29.9, 0), array(27.1, 2.3), array(16.4, 0), array(13.6, 3.7), array(10.9, 5.2), array(16.4, 6.5), array(10.9, 0), array(24.5, 7.1), array(10.9, 0), array(8.1, 4.7), array(19, 0), array(21.7, 1.8), array(27.1, 0), array(24.5, 0), array(27.1, 0), array(29.9, 1.5), array(27.1, 0.8), array(22.1, 2)
           ));

$series2009 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series2009->name('January 2009')
           ->data(array(
                array(6.4, 13.4), array(1.7, 11), array(5.4, 8), array(9, 17), array(1.9, 4), array(3.6, 12.2), array(1.9, 14.4), array(1.9, 9), array(1.9, 13.2), array(1.4, 7), array(6.4, 8.8), array(3.6, 4.3), array(1.6, 10), array(9.9, 2), array(7.1, 15), array(1.4, 0), array(3.6, 13.7), array(1.9, 15.2), array(6.4, 16.5), array(0.9, 10), array(4.5, 17.1), array(10.9, 10), array(0.1, 14.7), array(9, 10), array(2.7, 11.8), array(2.1, 10), array(2.5, 10), array(27.1, 10), array(2.9, 11.5), array(7.1, 10.8), array(2.1, 12)
           ));

$series2010 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series2010->name('January 2010')
           ->data(array(
               array(21.7, 3), array(13.6, 3.5), array(13.6, 3), array(29.9, 3), array(21.7, 20), array(19, 2), array(10.9, 3), array(28, 4), array(27.1, 0.3), array(16.4, 4), array(13.6, 0), array(19, 5), array(16.4, 3), array(24.5, 3), array(32.6, 3), array(27.1, 4), array(13.6, 6), array(13.6, 8), array(13.6, 5), array(10.9, 4), array(16.4, 0), array(32.6, 10.3), array(21.7, 20.8), array(24.5, 0.8), array(16.4, 0), array(21.7, 6.9), array(13.6, 7.7), array(16.4, 0), array(8.1, 0), array(16.4, 0), array(16.4, 0)
           ));

$xAxis = new \Kendo\Dataviz\UI\ChartXAxisItem();
$xAxis->max(35)
      ->title(array('text' => 'Wind Speed [km/h]'))
      ->crosshair(array(
          'visible' => true,
          'tooltip' => array(
              'visible' => true,
              'format' => 'n1'
          )
      ));

$yAxis = new \Kendo\Dataviz\UI\ChartYAxisItem();
$yAxis->min(-5)
      ->max(25)
      ->title(array('text' => 'Rainfall [mm]'))
      ->axisCrossingValue(-5)
      ->crosshair(array(
          'visible' => true,
          'tooltip' => array(
              'visible' => true,
              'format' => 'n1'
          )
      ));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Rainfall - Wind Speed'))
      ->legend(array('position' => 'bottom'))
      ->seriesDefaults(array('type' => 'scatter'))
      ->addXAxisItem($xAxis)
      ->addYAxisItem($yAxis)
      ->addSeriesItem($series2008, $series2009, $series2010);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
