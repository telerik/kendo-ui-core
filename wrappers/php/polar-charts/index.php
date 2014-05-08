<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$polar1 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$polar1->data(array(
            array(0, 0), array(15, 2), array(30, 4),
            array(45, 6), array(60, 8), array(75, 10),
            array(90, 12), array(105, 14), array(120, 16),
            array(135, 18), array(150, 20), array(165, 22),
            array(180, 24), array(195, 26), array(210, 28),
            array(225, 30), array(240, 32), array(255, 34),
            array(270, 36), array(285, 38), array(300, 40),
            array(315, 42), array(330, 44), array(345, 46),
            array(360, 48), array(15, 50), array(30, 52),
            array(45, 54), array(60, 56), array(75, 58), array(90, 60)));
            
$polar2 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$polar2->data(array(
            array(0, 0), array(15, 1), array(30, 2),
            array(45, 3), array(60, 4), array(75, 5),
            array(90, 6), array(105, 7), array(120, 8),
            array(135, 9), array(150, 10), array(165, 11),
            array(180, 12), array(195, 13), array(210, 14),
            array(225, 15), array(240, 16), array(255, 17),
            array(270, 18), array(285, 19), array(300, 20),
            array(315, 21), array(330, 22), array(345, 23),
            array(360, 24), array(15, 25), array(30, 26),
            array(45, 27), array(60, 28), array(75, 29), array(90, 30)));

$polar3 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$polar3->data(array(
            array(0, 0), array(15, 3), array(30, 6),
            array(45, 9), array(60, 12), array(75, 15),
            array(90, 18), array(105, 21), array(120, 24),
            array(135, 27), array(150, 30), array(165, 33),
            array(180, 36), array(195, 39), array(210, 42),
            array(225, 45), array(240, 48), array(255, 51),
            array(270, 54), array(285, 57), array(300, 60),
            array(315, 63), array(330, 66), array(345, 69),
            array(360, 72), array(15, 75), array(30, 78),
            array(45, 81), array(60, 84), array(75, 87), array(90, 90)));            

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Polar plot'))
      ->addSeriesItem($polar1, $polar2, $polar3)
      ->seriesDefaults(array('type' => 'polarLine', 'style' => 'smooth'));;

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
