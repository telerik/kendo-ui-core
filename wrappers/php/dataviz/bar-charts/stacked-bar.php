<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$gold = new \Kendo\Dataviz\UI\ChartSeriesItem();
$gold->name('Gold Medals')
     ->data(array(40, 32, 34, 36, 45, 33, 34, 83, 36, 37, 44, 37, 35, 36, 46))
     ->color('#f3ac32');

$silver = new \Kendo\Dataviz\UI\ChartSeriesItem();
$silver->name('Silver Medals')
       ->data(array(19, 25, 21, 26, 28, 31, 35, 60, 31, 34, 32, 24, 40, 38, 29))
       ->color('#b8b8b8');

$bronze = new \Kendo\Dataviz\UI\ChartSeriesItem();
$bronze->name('Bronze Medals')
       ->data(array(17, 17, 16, 28, 34, 30, 25, 30, 27, 37, 25, 33, 26, 36, 29))
       ->color('#bb6e36');

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->max(180)
          ->line(array('visible' => false))
          ->majorGridLines(array('visible' => true));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(1952, 1956, 1960, 1964, 1968, 1972, 1976, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012))
             ->majorGridLines(array('visible' => false));


$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->template('#= series.name #: #= value #');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Olympic Medals won by USA'))
      ->legend(array('visible' => false))
      ->addSeriesItem($gold, $silver, $bronze)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->tooltip($tooltip)
      ->seriesDefaults(array('type' => 'bar', 'stack' => true));

echo $chart->render();
?>

<?php require_once '../../include/footer.php'; ?>
