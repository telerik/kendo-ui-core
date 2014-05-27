<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$andrew = new \Kendo\Dataviz\UI\ChartSeriesItem();
$andrew->name('Andrew Dodsworth')
       ->data(array(10, 3, 3, 10, 2, 10));

$margaret = new \Kendo\Dataviz\UI\ChartSeriesItem();
$margaret->name('Margaret Peacock')
       ->data(array(9, 7, 7, 9, 6, 7));

$nancy = new \Kendo\Dataviz\UI\ChartSeriesItem();
$nancy->name('Nancy Callahan')
       ->data(array(4, 10, 10, 5, 5, 4));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(
                "Experience", "Communication", "Friendliness",
                "Subject knowledge", "Presentation", "Education"))
             ->majorGridLines(array('visible' => false));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->labels(array('format' => '{0}%'))
          ->line(array('visible' => false));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Employment candidate review'))
      ->legend(array('position' => 'bottom'))
      ->seriesDefaults(array('type' => 'radarArea'))
      ->addSeriesItem($andrew, $margaret, $nancy)
      ->addCategoryAxisItem($categoryAxis)
      ->addValueAxisItem($valueAxis);

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
