<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('waterfall')
       ->data(array(180, -60, -20, 10, 30))
       ->labels(array('visible' => true));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array('In stock', 'Damaged', 'Reserved', 'In transit', 'Refurbished'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->addSeriesItem($series)
      ->title(array('text' => 'Inventory'))
      ->legend(array('visible' => false))
      ->addCategoryAxisItem($categoryAxis)
      ->axisDefaults(array('majorGridLines' => array('visible' => false)));

echo $chart->render();

require_once '../include/footer.php';
?>
