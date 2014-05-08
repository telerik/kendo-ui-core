<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$india = new \Kendo\Dataviz\UI\ChartSeriesItem();
$india->name('India')
      ->data(array(3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855));

$world = new \Kendo\Dataviz\UI\ChartSeriesItem();
$world->name('World')
      ->data(array(1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array('format' => '{0}%'))
          ->line(array('visible' => false))
          ->axisCrossingValue(0);

$labelsPadding = new \Kendo\Dataviz\UI\ChartCategoryAxisItemLabelsPadding();   
$labelsPadding->top(80);
  
$categoryAxisLabels = new \Kendo\Dataviz\UI\ChartCategoryAxisItemLabels();
$categoryAxisLabels->padding($labelsPadding);          
          
$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011))
             ->line(array('visible' => false))
             ->labels($categoryAxisLabels);

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('{0}%')
        ->template('#= series.name #: #= value #');

$errorBars = new \Kendo\Dataviz\UI\ChartSeriesItemErrorBars();
$errorBars -> value('percentage(20)');        
        
$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Gross domestic product growth and percentage error'))
      ->legend(array('visible' => false))
      ->addSeriesItem($india, $world)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->tooltip($tooltip)
      ->seriesDefaults(array('type' => 'line', 'errorBars' => $errorBars));

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
