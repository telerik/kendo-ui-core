<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<div class="chart-wrapper">
    <table id="weather" class="weather">
        <thead>
            <tr>
                <th class="month">MONTH</th>
                <th>MAX TEMP &deg;C</th>
                <th>WIND SPEED KM/H</th>
                <th>RAINFALL MM</th>
            </tr>
        </thead>
        <tbody>
<?php
$months = array("January", "February", "March", "April", "May", "June");
for ($i = 0; $i < count($months); $i++) {
    $monthNumber = $i + 1;

    $transport = new \Kendo\Data\DataSourceTransport();
    $transport->read(array(
        'url' => "_weather.php?station=SOFIA&year=2012&month=$monthNumber",
        'type' => 'POST',
        'dataType' => 'json'
    ));

    $dataSource = new \Kendo\Data\DataSource();
    $dataSource->transport($transport);
?>
        <tr>
            <td class="month"><?php echo $months[$i] ?></td>
            <td>
<?php
    $tmaxSeries = new \Kendo\Dataviz\UI\SparklineSeriesItem();
    $tmaxSeries->type('column')
        ->field('TMax')
        ->color('#ff0000')
        ->negativeColor('#0099ff');

    $tmax = new \Kendo\Dataviz\UI\Sparkline("sparkline-tmax-$i");

    $tmax->dataSource($dataSource)
         ->addSeriesItem($tmaxSeries);

    echo $tmax->render();
?>
            </td>
            <td>
<?php
    $wndSeries = new \Kendo\Dataviz\UI\SparklineSeriesItem();
    $wndSeries->field('Wind')
        ->color('#5b8f00');

    $wnd = new \Kendo\Dataviz\UI\Sparkline("sparkline-wnd-$i");

    $wnd->dataSource($dataSource)
         ->addSeriesItem($wndSeries);

    echo $wnd->render();
?>
            </td>
            <td>
<?php
    $rainSeries = new \Kendo\Dataviz\UI\SparklineSeriesItem();
    $rainSeries->type('area')
        ->field('Rain')
        ->color('#0099ff');

    $rain = new \Kendo\Dataviz\UI\Sparkline("sparkline-rain-$i");

    $rain->dataSource($dataSource)
         ->addSeriesItem($rainSeries);

    echo $rain->render();
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
        height: 370px;
    }
    .chart-wrapper .k-chart {
        width: auto;
        height: auto;
    }
    .weather {
        border-collapse: collapse;
        line-height: 50px;
    }
    .weather td, .weather th {
        padding: 0;
        width: 200px;
        text-align: center;
    }
    .weather .month, .weather .month {
        width: 80px;
        text-align: right;
        padding-right: 20px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
