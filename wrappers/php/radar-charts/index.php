<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$mv2007 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$mv2007->name('Market value as of 2007')
       ->data(array(116, 165, 215, 75, 100, 49, 80, 116, 108, 90, 67, 76, 91, 255, 120));

$mv2009 = new \Kendo\Dataviz\UI\ChartSeriesItem();
$mv2009->name('Market value as of 2009')
       ->data(array(64, 85, 97, 27, 16, 26, 35, 32, 26, 17, 10, 7, 19, 5));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(
                    "Santander", "JP Morgan", "HSBC", "Credit Suisse",
                    "Goldman Sachs", "Morgan Stanley", "Societe Generale", "UBS",
                    "BNP Paribas", "Unicredit", "Credit Agricole", "Deutsche Bank",
                    "Barclays", "Citigroup", "RBS"));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->labels(array('format' => '${0}'));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('${0} bln');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Market Value of Major Banks'))
      ->legend(array('position' => 'bottom'))
      ->seriesDefaults(array('type' => 'radarLine', 'style' => 'smooth'))
      ->addSeriesItem($mv2007, $mv2009)
      ->addCategoryAxisItem($categoryAxis)
      ->addValueAxisItem($valueAxis)
      ->tooltip($tooltip);

echo $chart->render();
?>
<?php require_once '../include/footer.php'; ?>
