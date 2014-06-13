<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$weather = new \Kendo\Dataviz\UI\ChartSeriesItem();
$weather->data(array
  (
   array(5, 11), array(5, 13), array(7, 15), array(10, 19), array(13, 23), array(17, 28),
   array(20, 30), array(20, 30), array(17, 26), array(13, 22), array(9, 16), array(6, 13)
  ));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array("Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->template("Avg Min Temp : #= value.from # °C <br> Avg Max Temp : #= value.to # °C");

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->addSeriesItem($weather)
	  ->addCategoryAxisItem($categoryAxis)
	  ->seriesDefaults(array('type' => 'rangeColumn'))
	  ->title(array('text' => 'Average Weather Conditions'))
	  ->tooltip($tooltip);

echo $chart->render();
?>

<?php require_once '../include/footer.php'; ?>