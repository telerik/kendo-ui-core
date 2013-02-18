<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('area')
       ->aggregate('avg')
       ->data(array(30, 50, 45, 40, 35, 40, 42, 40, 35, 43, 38, 30, 48, 50, 55, 35, 30));

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(
                 new DateTime('2011/12/20', new DateTimeZone('UTC')),
                 new DateTime('2011/12/21', new DateTimeZone('UTC')),
                 new DateTime('2011/12/22', new DateTimeZone('UTC')),
                 new DateTime('2011/12/23', new DateTimeZone('UTC')),
                 new DateTime('2011/12/24', new DateTimeZone('UTC')),
                 new DateTime('2011/12/25', new DateTimeZone('UTC')),
                 new DateTime('2011/12/26', new DateTimeZone('UTC')),
                 new DateTime('2011/12/27', new DateTimeZone('UTC')),
                 new DateTime('2011/12/28', new DateTimeZone('UTC')),
                 new DateTime('2011/12/29', new DateTimeZone('UTC')),
                 new DateTime('2011/12/30', new DateTimeZone('UTC')),
                 new DateTime('2011/12/31', new DateTimeZone('UTC')),
                 new DateTime('2012/01/01', new DateTimeZone('UTC')),
                 new DateTime('2012/01/02', new DateTimeZone('UTC')),
                 new DateTime('2012/01/03', new DateTimeZone('UTC')),
                 new DateTime('2012/01/04', new DateTimeZone('UTC')),
                 new DateTime('2012/01/05', new DateTimeZone('UTC'))
             ))
             ->baseUnit("weeks");


$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->addSeriesItem($series)
      ->addCategoryAxisItem($categoryAxis);

echo $chart->render();
?>
<div class="configuration-horizontal">
    <div class="config-section">
        <span class="configHead">Base date unit</span>
        <ul class="options">
            <li>
                <input id="baseUnitAuto" name="baseUnit"
                        type="radio" value="" autocomplete="off" />
                <label for="baseUnitAuto">Automatic (default)</label>
            </li>
            <li>
                <input id="baseUnitYears" name="baseUnit"
                        type="radio" value="years" autocomplete="off" />
                <label for="baseUnitYears">Years</label>
            </li>
            <li>
                <input id="baseUnitMonths" name="baseUnit"
                        type="radio" value="months" autocomplete="off" />
                <label for="baseUnitMonths">Months</label>
            </li>
            <li>
                <input id="baseUnitWeeks" name="baseUnit"
                        type="radio" value="weeks" checked="checked" autocomplete="off" />
                <label for="baseUnitWeeks">Weeks</label>
            </li>
            <li>
                <input id="baseUnitDays" name="baseUnit"
                        type="radio" value="days" autocomplete="off" />
                <label for="baseUnitDays">Days</label>
            </li>
        </ul>
    </div>
    <div class="config-section">
        <span class="configHead">Aggregate function</span>
        <ul class="options">
            <li>
                <input id="aggregateMax" name="aggregate"
                        type="radio" value="max" autocomplete="off" />
                <label for="aggregateMax">Max (default)</label>
            </li>
            <li>
                <input id="aggregateMin" name="aggregate"
                        type="radio" value="min" autocomplete="off" />
                <label for="aggregateMin">Min</label>
            </li>
            <li>
                <input id="aggregateSum" name="aggregate"
                        type="radio" value="sum" autocomplete="off" />
                <label for="aggregateSum">Sum</label>
            </li>
            <li>
                <input id="aggregateAvg" name="aggregate"
                        type="radio" value="avg" checked="checked" autocomplete="off" />
                <label for="aggregateAvg">Avg</label>
            </li>
            <li>
                <input id="aggregateCount" name="aggregate"
                        type="radio" value="count" autocomplete="off" />
                <label for="aggregateCount">Count</label>
            </li>
        </ul>
        <p>Custom aggregate functions are supported.</p>
    </div>
</div>
<script>
$(function() {
    $(".configuration-horizontal").bind("change", refresh);

    function refresh() {
        var chart = $("#chart").data("kendoChart"),
            series = chart.options.series,
            categoryAxis = chart.options.categoryAxis,
            baseUnitInputs = $("input:radio[name=baseUnit]"),
            aggregateInputs = $("input:radio[name=aggregate]");

        for (var i = 0, length = series.length; i < length; i++) {
            series[i].aggregate = aggregateInputs.filter(":checked").val();
        }

        categoryAxis.baseUnit = baseUnitInputs.filter(":checked").val();

        chart.refresh();
    }
});
</script>
<?php require_once '../../include/footer.php'; ?>
