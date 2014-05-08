<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$signal = new \Kendo\Dataviz\UI\ChartSeriesItem();
$signal->type('area')
       ->data(array(20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19, 1, 20, 2, 18, 5, 12, 7, 10, 8))
	   ->line(array('style' => 'smooth'));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->title(array('text' => 'time'))
             ->majorGridLines(array('visible' => false))
             ->majorTicks(array('visible' => false));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->max(22)
		  ->title(array('text' => 'voltage'))
          ->majorGridLines(array('visible' => false))
          ->visible(false);

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'A digital signal'))
      ->legend(array('visible' => false))
      ->addSeriesItem($signal)
      ->addCategoryAxisItem($categoryAxis)
      ->addValueAxisItem($valueAxis);

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
