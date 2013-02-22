<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<div class="chart-wrapper">
    <div class="climate">
        <h1>
            Climate control history
        </h1>
        <table class="history">
            <tr>
                <td class="item">Pressure</td>
                <td class="spark">
<?php
$pressLog = new \Kendo\Dataviz\UI\Sparkline('press-log', array(
    936, 968, 1025, 999, 998, 1014, 1017, 1010, 1010, 1007,
    1004, 988, 990, 988, 987, 995, 946, 954, 991, 984,
    974, 956, 986, 936, 955, 1021, 1013, 1005, 958, 953,
    952, 940, 937, 980, 966, 965, 928, 916, 910, 980
));

echo $pressLog->render();
?>
                </td>
                <td class="value">980<span>mb</span></td>
            </tr>
            <tr>
                <td class="item">Temperature</td>
                <td class="spark">
<?php
$tempLogTooltip = new \Kendo\Dataviz\UI\SparklineTooltip();
$tempLogTooltip->format('{0} &deg;C');

$tempLog = new \Kendo\Dataviz\UI\Sparkline('temp-log');

$tempLog->type('bar')
        ->data(array(
            16, 17, 18, 19, 20, 21, 21, 22, 23, 22,
            20, 18, 17, 17, 16, 16, 17, 18, 19, 20,
            21, 22, 23, 25, 24, 24, 22, 22, 23, 22,
            22, 21, 16, 15, 15, 16, 19, 20, 20, 21
        ))
        ->tooltip($tempLogTooltip);

echo $tempLog->render();
?>
                </td>
                <td class="value">21<span>&deg;C</span></td>
            </tr>
            <tr>
                <td class="item">Humidity</td>
                <td class="spark">
<?php
$humLogTooltip = new \Kendo\Dataviz\UI\SparklineTooltip();
$humLogTooltip->format('{0} %');

$humLog = new \Kendo\Dataviz\UI\Sparkline('hum-log');

$humLog->type('area')
        ->data(array(
            71, 70, 69, 68, 65, 60, 55, 55, 50, 52,
            73, 72, 72, 71, 68, 63, 57, 58, 53, 55,
            63, 59, 61, 64, 58, 53, 48, 48, 45, 45,
            63, 64, 63, 67, 58, 56, 53, 59, 51, 54
        ))
        ->tooltip($humLogTooltip);

echo $humLog->render();
?>
                </td>
                <td class="value">32<span>%</span></td>
            </tr>
        </table>
    </div>
    <div class="temperature">
        <h1>
            Temperature control
        </h1>
        <div class="stats">
<?php
$lowRange = new \Kendo\Dataviz\UI\SparklineValueAxisItemPlotBand();
$lowRange->from(0)
         ->to(15)
         ->color("#787878")
         ->opacity(0.15);

$medRange = new \Kendo\Dataviz\UI\SparklineValueAxisItemPlotBand();
$medRange->from(15)
         ->to(22)
         ->color("#787878")
         ->opacity(0.3);

$hiRange = new \Kendo\Dataviz\UI\SparklineValueAxisItemPlotBand();
$hiRange->from(22)
         ->to(30)
         ->color("#787878")
         ->opacity(0.15);

$tempRangeAxis = new \Kendo\Dataviz\UI\SparklineValueAxisItem();
$tempRangeAxis->min(0)
              ->max(30)
              ->addPlotBand($lowRange)
              ->addPlotBand($medRange)
              ->addPlotBand($hiRange);

$tempRange = new \Kendo\Dataviz\UI\Sparkline('temp-range');
$tempRange->type('bullet')
          ->data(array(21, 23))
          ->addValueAxisItem($tempRangeAxis);

echo $tempRange->render();
?>
        </div>
    </div>
    <div class="conditioner">
        <h1>
            Conditioner working time
        </h1>
        <ul class="pie-list stats">
            <li>MON
<?php
$statsMon = new \Kendo\Dataviz\UI\Sparkline('stats-mon');
$statsMon->type('pie')
          ->data(array(14, 10));

echo $statsMon->render();
?>
            </li>
            <li>TUE
<?php
$statsTue = new \Kendo\Dataviz\UI\Sparkline('stats-tue');
$statsTue->type('pie')
          ->data(array(8, 16));

echo $statsTue->render();
?>
            </li>
            <li>WED
<?php
$statsWed = new \Kendo\Dataviz\UI\Sparkline('stats-wed');
$statsWed->type('pie')
          ->data(array(8, 16));

echo $statsWed->render();
?>
            </li>
            <li>THU
<?php
$statsThu = new \Kendo\Dataviz\UI\Sparkline('stats-thu');
$statsThu->type('pie')
          ->data(array(12, 12));

echo $statsThu->render();
?>
            </li>
            <li>FRI
<?php
$statsFri = new \Kendo\Dataviz\UI\Sparkline('stats-fri');
$statsFri->type('pie')
          ->data(array(6, 18));

echo $statsFri->render();
?>
            </li>
            <li>SAT
<?php
$statsSat = new \Kendo\Dataviz\UI\Sparkline('stats-sat');
$statsSat->type('pie')
          ->data(array(1, 23));

echo $statsSat->render();
?>
            </li>
            <li>SUN
<?php
$statsSun = new \Kendo\Dataviz\UI\Sparkline('stats-sun');
$statsSun->type('pie')
          ->data(array(5, 19));

echo $statsSun->render();
?>
            </li>
        </ul>
    </div>
</div>

<style scoped>
    .chart-wrapper {
        width: 460px;
        height: 100%;
        margin: 0 auto 30px auto;
        padding: 0 0 30px 0;
        font-weight: bold;
        text-transform: uppercase;
    }
    .climate, .temperature, .conditioner {
        margin: 0 30px;
        padding: 30px 0 0 0;
    }
    h1 {
        margin-bottom: 20px;
        font-size: 1.2em;
    }
    .history {
        border-collapse: collapse;
        width: 100%;
    }
    .history td {
        padding: 0;
    }
    .history td.item {
        text-align: right;
        line-height: normal;
        vertical-align: bottom;
    }
    .history td.spark {
        text-align: center;
        line-height: 50px;
        padding: 0 5px;
    }
    .history td.value {
        font-size: 2em;
        font-weight: normal;
        line-height: normal;
        vertical-align: bottom;
    }
    .history td.value span {
        font-size: .5em;
        vertical-align: top;
    }
    .stats {
        text-align: center;
    }
    .pie-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    .pie-list li {
        display: inline-block;
        width: 54px;
    }
    #stats-mon,
    #stats-tue,
    #stats-wed,
    #stats-thu,
    #stats-fri,
    #stats-sat,
    #stats-sun {
        display: block;
        width: 54px;
        line-height: 50px;
    }
    #temp-range {
        width: 400px;
        line-height: 50px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
