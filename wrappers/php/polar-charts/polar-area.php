<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$polar = new \Kendo\Dataviz\UI\ChartSeriesItem();
$polar->type('polarArea')
      ->data(array(
          array(10, 10), array(30, 20), array(50, 30),
          array(70, 20), array(90, 10), array(90, 0),
          array(230, 10), array(235, 20), array(240, 30),
          array(245, 20), array(250, 10)
      ));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Polar area'))
      ->legend(array('position' => 'bottom'))
      ->addSeriesItem($polar);

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
