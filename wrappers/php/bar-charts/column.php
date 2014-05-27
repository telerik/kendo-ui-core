<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$india = new \Kendo\Dataviz\UI\ChartSeriesItem();
$india->name('India')
      ->data(array(3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855));

$russia = new \Kendo\Dataviz\UI\ChartSeriesItem();
$russia->name('Russian Federation')
       ->data(array(4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3));

$germany = new \Kendo\Dataviz\UI\ChartSeriesItem();
$germany->name('Germany')
        ->data(array(0.010, -0.375, 1.161, 0.684, 3.7, 3.269, 1.083, -5.127, 3.690, 2.995));

$world = new \Kendo\Dataviz\UI\ChartSeriesItem();
$world->name('World')
      ->data(array(1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727));

$cateogrySeriesAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$cateogrySeriesAxis->name("series-axis")
             ->line(array('visible' => false));

$categoryLabelsAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryLabelsAxis->name("series-labels")
             ->categories(array(2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->labels(array('format' => '{0}%'))
          ->line(array('visible' => false))
          // Push the series-labels axis all the way down the value axis
          ->axisCrossingValue(array(0, -PHP_INT_MAX));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('{0}%')
        ->template('#= series.name #: #= value #');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Gross domestic product growth /GDP annual %/'))
      ->legend(array('position' => 'top'))
      ->addSeriesItem($india, $russia, $germany, $world)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($cateogrySeriesAxis)
      ->addCategoryAxisItem($categoryLabelsAxis)
      ->tooltip($tooltip)
      ->chartArea(array('background' => 'transparent'))
      ->seriesDefaults(array('type' => 'column'));

echo $chart->render();
?>

<style type="text/css">
    #chart {
        background: center no-repeat url('../content/shared/styles/world-map.png');
    }
</style>

<?php require_once '../include/footer.php'; ?>
