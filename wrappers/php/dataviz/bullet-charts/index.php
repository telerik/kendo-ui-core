<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$mmHg = new \Kendo\Dataviz\UI\ChartSeriesItem();
$mmHg->data(array(array(750, 762.5)));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->min(715)
          ->max(795)
          ->majorGridLines(array('visible' => false))
          ->majorTicks(array('visible' => false))
          ->plotBands(array(
            array('from' => 715, 'to' => 752, 'color' => '#ccc', 'opacity' => 0.6),
            array('from' => 752, 'to' => 772, 'color' => '#ccc', 'opacity' => 0.3)
          ));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->majorGridLines(array('visible' => false))
             ->majorTicks(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->shared(true)
        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

$chart-mmHg = new \Kendo\Dataviz\UI\Chart('chart-mmHg');
$chart-mmHg->addSeriesItem($mmHg)
           ->addValueAxisItem($valueAxis)
           ->addCategoryAxisItem($categoryAxis)
           ->legend(array('visible' => false))
           ->chartArea(array('margin' => array('left' => 0)))
           ->seriesDefaults(array('type' => 'bullet'))
           ->tooltip($tooltip);

$hPa = new \Kendo\Dataviz\UI\ChartSeriesItem();
$hPa->data(array(array(1001, 1017)));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->min(955)
          ->max(1055)
          ->majorGridLines(array('visible' => false))
          ->majorTicks(array('visible' => false))
          ->plotBands(array(
            array('from' => 955, 'to' => 1002, 'color' => '#ccc', 'opacity' => 0.6),
            array('from' => 1002, 'to' => 1027, 'color' => '#ccc', 'opacity' => 0.3)
          ));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->majorGridLines(array('visible' => false))
             ->majorTicks(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->shared(true)
        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

$chart-hPa = new \Kendo\Dataviz\UI\Chart('chart-hPa');
$chart-hPa->addSeriesItem($hPa)
          ->addValueAxisItem($valueAxis)
          ->addCategoryAxisItem($categoryAxis)
          ->legend(array('visible' => false))
          ->chartArea(array('margin' => array('left' => 0)))
          ->seriesDefaults(array('type' => 'bullet'))
          ->tooltip($tooltip);

$hum = new \Kendo\Dataviz\UI\ChartSeriesItem();
$hum->data(array(array(45, 60)));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->min(0)
          ->max(100)
          ->majorGridLines(array('visible' => false))
          ->majorTicks(array('visible' => false))
          ->plotBands(array(
            array('from' => 0, 'to' => 33, 'color' => '#ccc', 'opacity' => 0.6),
            array('from' => 33, 'to' => 66, 'color' => '#ccc', 'opacity' => 0.3)
          ));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->majorGridLines(array('visible' => false))
             ->majorTicks(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->shared(true)
        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

$chart-hum = new \Kendo\Dataviz\UI\Chart('chart-hum');
$chart-hum->addSeriesItem($hum)
          ->addValueAxisItem($valueAxis)
          ->addCategoryAxisItem($categoryAxis)
          ->legend(array('visible' => false))
          ->chartArea(array('margin' => array('left' => 0)))
          ->seriesDefaults(array('type' => 'bullet'))
          ->tooltip($tooltip);

$temp = new \Kendo\Dataviz\UI\ChartSeriesItem();
$temp->data(array(array(25, 22)));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->min(0)
          ->max(30)
          ->majorGridLines(array('visible' => false))
          ->majorTicks(array('visible' => false))
          ->plotBands(array(
            array('from' => 0, 'to' => 10, 'color' => 'yellow', 'opacity' => 0.3),
            array('from' => 10, 'to' => 20, 'color' => 'orange', 'opacity' => 0.3),
            array('from' => 20, 'to' => 30, 'color' => 'red', 'opacity' => 0.3)
          ));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->majorGridLines(array('visible' => false))
             ->majorTicks(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->shared(true)
        ->template('Maximum: #= value.target # <br /> Average: #= value.current #');

$chart-temp = new \Kendo\Dataviz\UI\Chart('chart-temp');
$chart-temp->addSeriesItem($temp)
           ->addValueAxisItem($valueAxis)
           ->addCategoryAxisItem($categoryAxis)
           ->legend(array('visible' => false))
           ->chartArea(array('margin' => array('left' => 0)))
           ->seriesDefaults(array('type' => 'bullet'))
           ->tooltip($tooltip);
?>

<div class="chart-wrapper">
    <table class="history">
        <tr>
            <td class="item">mmHg</td>
            <td class="chart"><?= $chart-mmHg->render() ?></td>
        </tr>
        <tr>
            <td class="item">hPa</td>
            <td class="chart"><?= $chart-hPa->render() ?></td>
        </tr>
        <tr>
            <td class="item">hum</td>
            <td class="chart"><?= $chart-hum->render() ?></td>
        </tr>
        <tr>
            <td class="item">temp</td>
            <td class="chart"><?= $chart-temp->render() ?></td>
        </tr>
    </table>
</div>
<?php require_once '../../include/footer.php'; ?>
