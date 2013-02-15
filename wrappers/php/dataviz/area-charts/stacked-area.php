<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<div class="chart-wrapper">
<?php

$chrome = new \Kendo\Dataviz\UI\ChartSeriesItem();
$chrome->name('Chrome')
       ->data(array(0, 0, 0, 0, 3.6, 9.8, 22.4, 34.6));

$firefox = new \Kendo\Dataviz\UI\ChartSeriesItem();
$firefox->name('Firefox')
        ->data(array(0, 23.6, 29.9, 36.3, 44.4, 46.4, 43.5, 37.7));

$ie = new \Kendo\Dataviz\UI\ChartSeriesItem();
$ie->name('Internet Explorer')
   ->data(array(76.2, 68.9, 60.6, 56.0, 46.0, 37.2, 27.5, 20.2));

$mozilla = new \Kendo\Dataviz\UI\ChartSeriesItem();
$mozilla->name('Mozilla')
        ->data(array(16.5, 2.8, 2.5, 1.2, 0, 0, 0, 0));

$opera = new \Kendo\Dataviz\UI\ChartSeriesItem();
$opera->name('Opera')
      ->data(array(1.6, 1.5, 1.5, 1.6, 2.4, 2.3, 2.2, 2.5));

$safari = new \Kendo\Dataviz\UI\ChartSeriesItem();
$safari->name('Safari')
       ->data(array(0, 0, 0, 1.8, 2.7, 3.6, 3.8, 4.2));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array('format' => '{0}%'))
          ->line(array('visible' => false))
          ->axisCrossingValue(-10)
          ->max(100);

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011))
             ->majorGridLines(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('{0}%')
        ->template('#= series.name #: #= value #');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Browser Usage Trends'))
      ->legend(array('position' => 'bottom'))
      ->addSeriesItem($chrome, $firefox, $ie, $mozilla, $opera, $safari)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->tooltip($tooltip)
      ->seriesDefaults(array('type' => 'area', 'stack' => true));

echo $chart->render();
?>
</div>
<style type="text/css">
    #chart {
        background: center no-repeat url('../../content/shared/styles/world-map.png');
    }
</style>
<?php require_once '../../include/footer.php'; ?>
