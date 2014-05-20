<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';
require_once '../include/header.php';

$proteins = new \Kendo\Dataviz\UI\ChartSeriesItem();
$proteins->name('Proteins')
         ->type('radarColumn')
         ->field('score');

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->field('abbr');

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->visible(false);

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data(chart_protein_data());

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Protein quality, Apple raw'))
      ->dataSource($dataSource)
      ->addSeriesItem($proteins)
      ->addCategoryAxisItem($categoryAxis)
      ->addValueAxisItem($valueAxis)
      ->tooltip(array('visible' => true))
      ->legend(array('visible' => false));

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
