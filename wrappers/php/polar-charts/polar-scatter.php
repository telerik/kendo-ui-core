<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$ft3 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$ft3->data(array(
           array(150, 3), array(150, 3.1), array(152, 3.2),
           array(152, 3.1), array(151, 3.2), array(153, 3.3),
           array(149, 3)
       ));

$ft7 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$ft7->data(array(
           array(270, 5), array(250, 7), array(259, 4),
           array(270, 7), array(265, 5), array(250, 7),
           array(263, 8), array(261, 5)
       ));

$yAxis = new \Kendo\Dataviz\UI\ChartYAxisItem();
$yAxis->max(10);

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Buck spread'))
      ->legend(array('position' => 'bottom'))
      ->seriesDefaults(array('type' => 'polarScatter'))
      ->addSeriesItem($ft3, $ft7)
      ->addYAxisItem($yAxis);

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
