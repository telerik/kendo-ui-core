<?php
require_once '../../lib/Kendo/Autoload.php';

require_once '../../include/header.php';

$total = new \Kendo\Dataviz\UI\ChartSeriesItem();
$total->name('Total Visits')
      ->data(array(56000, 63000, 74000, 91000, 117000, 138000));

$unique = new \Kendo\Dataviz\UI\ChartSeriesItem();
$unique->name('Unique visitors')
       ->data(array(52000, 34000, 23000, 48000, 67000, 83000));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->line(array('visible' => false));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'))
             ->majorGridLines(array('visible' => false));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->template('#= series.name #: #= value #');

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->addSeriesItem($total, $unique)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->legend(array('position' => 'bottom'))
      ->seriesDefaults(array('type' => 'column'))
      ->chartArea(array('background' => 'transparent'))
      ->title(array('text' => 'Site Visitors Stats /thousands/'))
      ->tooltip($tooltip);

echo $chart->render();
?>
<div class="configuration-horizontal">
    <div class="config-section">
        <span class="configHead">Gap</span>
        <ul class="options">
            <li>
                <input id="gap" type="number" value="1.5" step="0.1" style="width: 60px;" />
                <button id="getGap" class="k-button">Set gap</button
            </li>
        </ul>
    </div>
    <div class="config-section">
        <span class="configHead">Spacing</span>
        <ul class="options">
            <li>
                <input id="spacing" type="number" value="0.4" step="0.1" style="width: 60px;" />
                <button id="getSpacing" class="k-button">Set spacing</button>
            </li>
        </ul>
    </div>
</div>
<script>
$(document).ready(function () {
    var chart = $("#chart").data("kendoChart"),
        firstSeries = chart.options.series;

    $("#getGap").click(function () {
        firstSeries[0].gap = parseFloat($("#gap").val(), 10);
        chart.redraw();
    });

    $("#getSpacing").click(function () {
        firstSeries[0].spacing = parseFloat($("#spacing").val(), 10);
        chart.redraw();
    });

    $("#gap").kendoNumericTextBox();
    $("#spacing").kendoNumericTextBox();
});
</script>
<?php require_once '../../include/footer.php'; ?>
