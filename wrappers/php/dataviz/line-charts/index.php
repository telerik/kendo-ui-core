<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$india = new \Kendo\Dataviz\UI\ChartSeriesItem();
$india->name('India')
      ->data(array(3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855));

$world = new \Kendo\Dataviz\UI\ChartSeriesItem();
$world->name('World')
      ->data(array(1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727));

$russia = new \Kendo\Dataviz\UI\ChartSeriesItem();
$russia->name('World')
       ->data(array(4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3));

$haiti = new \Kendo\Dataviz\UI\ChartSeriesItem();
$haiti->name('Haiti')
      ->data(array(-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array('format' => '{0}%'))
          ->line(array('visible' => false))
          ->axisCrossingValue(-10);

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011))
             ->majorGridLines(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('{0}%')
        ->template('#= series.name #: #= value #');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Gross domestic product growth /GDP annual %/'))
      ->legend(array('position' => 'bottom'))
      ->addSeriesItem($india, $world, $russia, $haiti)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->tooltip($tooltip)
      ->seriesDefaults(array('type' => 'line'));

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
