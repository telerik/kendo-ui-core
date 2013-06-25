<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$polar = new \Kendo\Dataviz\UI\ChartSeriesItem();
$polar->type('polarLine')
       ->data(array(
            array(10, 10), array(20, 20), array(30, 30),
            array(40, 40), array(60, 50), array(80, 60),
            array(100, 70), array(140, 80), array(180, 90),
            array(240, 100)));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Polar plot'))
      ->addSeriesItem($polar);

echo $chart->render();
?>
<?php require_once '../../include/footer.php'; ?>
