<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';
require_once '../../include/header.php';

ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(-1);
?>

<div class="chart-wrapper">
    <table id="stats" class="stats">
        <thead>
            <tr>
                <th class="year">Year</th>
                <th class="hourly">Compensation costs</th>
                <th class="change">Annual change %</th>
                <th class="direct">Direct Pay</th>
                <th class="benefits">Benefit components</th>
            </tr>
        </thead>
        <tbody>
<?php
$data = sparkline_compensation_data();
for ($i = 0; $i < count($data); $i++) {
    $row = $data[$i];
?>
        <tr>
            <td class="year"><?php echo $row['year'] ?></td>
            <td class="hourly">
<?php
    $valueAxis = new \Kendo\Dataviz\UI\SparklineValueAxisItem();
    $valueAxis->max(50);

    $sparkline = new \Kendo\Dataviz\UI\Sparkline("bar-hourly-$i");

    $sparkline->type('bar')
         ->renderAs('canvas')
         ->data($row['hourly'])
         ->addValueAxisItem($valueAxis)
         ->attr('style', 'width: 130px');

    echo $sparkline->render();
?>
            </td>
            <td class="change">
<?php
    $series = new \Kendo\Dataviz\UI\SparklineSeriesItem();
    $series->type('bar')
           ->data(array($row['change']))
           ->negativeColor('#808080');

    $valueAxis = new \Kendo\Dataviz\UI\SparklineValueAxisItem();
    $valueAxis->min(-40);
    $valueAxis->max(40);

    $categoryAxis = new \Kendo\Dataviz\UI\SparklineCategoryAxisItem();
    $categoryAxis->visible(true);
    $categoryAxis->majorTicks(array('visible' => false));

    $chartArea = new \Kendo\Dataviz\UI\SparklineChartArea();
    $chartArea->background('transparent');

    $sparkline = new \Kendo\Dataviz\UI\Sparkline("bar-change-$i");

    $sparkline
         ->renderAs('canvas')
         ->addSeriesItem($series)
         ->addValueAxisItem($valueAxis)
         ->addCategoryAxisItem($categoryAxis)
         ->chartArea($chartArea)
         ->attr('style', 'width: 130px');

    echo $sparkline->render();
?>
            </td>
            <td class="direct">
<?php
    $valueAxis = new \Kendo\Dataviz\UI\SparklineValueAxisItem();
    $valueAxis->max(50);

    $sparkline = new \Kendo\Dataviz\UI\Sparkline("bar-direct-$i");

    $sparkline->type('bar')
         ->renderAs('canvas')
         ->data($row['direct'])
         ->addValueAxisItem($valueAxis)
         ->attr('style', 'width: 130px');

    echo $sparkline->render();
?>
            </td>
            <td class="benefits">
<?php
    $dataSource = new \Kendo\Data\DataSource();
    $dataSource->data($row['benefits'])
               ->addGroupItem(array('field' => 'type'));

    $series = new \Kendo\Dataviz\UI\SparklineSeriesItem();
    $series->type('bar')
           ->field('value');

    $valueAxis = new \Kendo\Dataviz\UI\SparklineValueAxisItem();
    $valueAxis->max(10);

    $sparkline = new \Kendo\Dataviz\UI\Sparkline("bar-benefits-$i");

    $sparkline
         ->renderAs('canvas')
         ->dataSource($dataSource)
         ->addSeriesItem($series)
         ->addValueAxisItem($valueAxis)
         ->attr('style', 'width: 130px');

    echo $sparkline->render();
?>
            </td>
        </tr>
<?php
}
?>
        </tbody>
    </table>
</div>

<style scoped>
    .chart-wrapper {
        padding: 10px 0;
        height: 450px;
    }
    .stats {
        border-collapse: collapse;
        line-height: 2em;
        width: 100%;
        border: 0;
        border-top: 1px solid rgba(128,128,128,.3);
        border-bottom: 1px solid rgba(128,128,128,.3);
    }
    .stats td, .stats th {
        padding: 0 10px;
    }
    .stats th {
        border-bottom: 1px solid rgba(128,128,128,.3);
        text-align: left;
    }
    .stats tr.rows {
        -moz-transition: background .6s;
        -webkit-transition: background .6s;
        transition: background .6s;
    }
    .stats tr.rows:hover {
        -moz-transition: background-color .3s;
        -webkit-transition: background-color .3s;
        transition: background-color .3s;
        background-color: rgba(128,128,128,.2);
    }
    .year {
        width: 40px;
    }
    .stats th.change, .change {
        text-align: center;
        background-color: rgba(128,128,128,.1);
    }
    .title {
        margin: 5px 0 15px;
        text-align: center;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
