<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = chart_spain_electricity_production();

    echo json_encode($result);

    exit;
}

require_once '../../include/header.php';

$nuclear = new \Kendo\Dataviz\UI\ChartSeriesItem();
$nuclear->field('nuclear')
        ->name('Nuclear');

$hydro = new \Kendo\Dataviz\UI\ChartSeriesItem();
$hydro->field('hydro')
      ->name('Hydro');

$wind = new \Kendo\Dataviz\UI\ChartSeriesItem();
$wind->field('wind')
     ->name('Wind');

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();

$valueAxis->labels(array('format' => 'N0'))
          ->line(array('visible' => false))
          ->majorUnit(10000);

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();

$categoryAxis->field('year')
             ->labels(array('rotation' => -90));

$tooltip = new \Kendo\Dataviz\UI\ChartTooltip();
$tooltip->visible(true)
        ->format('N0');

$transport = new \Kendo\Data\DataSourceTransport();
$transport->read(array('url' => 'events.php', 'type' => 'POST', 'dataType' => 'json'));

$dataSource = new \Kendo\Data\DataSource();

$dataSource->transport($transport)
           ->addSortItem(array('field' => 'year', 'dir' => 'asc'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Spain electricity production (GWh)'))
      ->dataSource($dataSource)
      ->legend(array('position' => 'top'))
      ->addSeriesItem($nuclear, $hydro, $wind)
      ->addValueAxisItem($valueAxis)
      ->addCategoryAxisItem($categoryAxis)
      ->seriesDefaults(array('type' => 'column'))
      ->tooltip($tooltip)
      ->seriesClick('onSeriesClick')
      ->seriesHover('onSeriesHover')
      ->dataBound('onDataBound')
      ->axisLabelClick('onAxisLabelClick')
      ->plotAreaClick('onPlotAreaClick')
      ->dragStart('onDragStart')
      ->drag('onDrag')
      ->dragEnd('onDragEnd')
      ->zoomStart('onZoomStart')
      ->zoom('onZoom')
      ->zoomEnd('onZoomEnd');

echo $chart->render();
?>
<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<script>
function onSeriesClick(e) {
    kendoConsole.log(kendo.format("Series click :: {0} ({1}): {2}",
        e.series.name, e.category, e.value));
}

function onSeriesHover(e) {
    kendoConsole.log(kendo.format("Series hover :: {0} ({1}): {2}",
        e.series.name, e.category, e.value));
}

function onDataBound(e) {
    kendoConsole.log("Data bound");
}

function onAxisLabelClick(e) {
    kendoConsole.log(kendo.format("Axis label click :: {0} axis : {1}",
        e.axis.type, e.text));
}

function onPlotAreaClick(e) {
    kendoConsole.log(kendo.format("Plot area click :: {0} : {1:N0}",
        e.category, e.value
    ));
}

function onDragStart(e) {
    kendoConsole.log("Drag start");
}

function onDrag(e) {
    kendoConsole.log("Drag");
}

function onDragEnd(e) {
    kendoConsole.log("Drag end");
}

function onZoomStart(e) {
    kendoConsole.log("Zoom start");
}

function onZoom(e) {
    kendoConsole.log(kendo.format("Zoom :: {0}", e.delta));

    // Prevent scrolling
    e.originalEvent.preventDefault();
}

function onZoomEnd(e) {
    kendoConsole.log("Zoom end");
}
</script>
<?php require_once '../../include/footer.php'; ?>
