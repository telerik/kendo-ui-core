<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/header.php';

$gold = new \Kendo\Dataviz\UI\ChartSeriesItem();
$gold->name('Gold Medals')
     ->data(array(40, 32, 34, 36, 45, 33, 34, 83, 36, 37, 44, 37, 35, 36, 46))
     ->color('#f3ac32');

$silver = new \Kendo\Dataviz\UI\ChartSeriesItem();
$silver->name('Silver Medals')
       ->data(array(19, 25, 21, 26, 28, 31, 35, 60, 31, 34, 32, 24, 40, 38, 29))
       ->color('#b8b8b8');

$bronze = new \Kendo\Dataviz\UI\ChartSeriesItem();
$bronze->name('Bronze Medals')
       ->data(array(17, 17, 16, 28, 34, 30, 25, 30, 27, 37, 25, 33, 26, 36, 29))
       ->color('#bb6e36');

$categoryAxis = new \Kendo\Dataviz\UI\ChartCategoryAxisItem();
$categoryAxis->categories(array(1952, 1956, 1960, 1964, 1968, 1972, 1976, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012))
             ->select(array('from' => 2, 'to' => 5))
             ->majorGridLines(array('visible' => false));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Olympic Medals won by USA'))
      ->legend(array('visible' => false))
      ->addSeriesItem($gold, $silver, $bronze)
      ->addCategoryAxisItem($categoryAxis)
      ->selectStart('onSelectStart')
      ->select('onSelect')
      ->selectEnd('onSelectEnd');

echo $chart->render();
?>
<div class="configuration-horizontal">
    <span class="configHead">Mousewheel</span>
    <div class="config-section">
        <ul class="options">
            <li>
                <input id="reverse" type="checkbox" />
                <label for="reverse">Reverse</label>
            </li>
        </ul>
    </div>
    <div class="config-section">
        <ul class="options">
            <li>
                <label for="zoom">Zoom direction</label>
                <select id="zoom">
                    <option value="both">Both</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </li>
        </ul>
    </div>
</div>
<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<script>
    function formatRange(e) {
        var categories = e.axis.categories;

        return kendo.format("{0} - {1} ({2} - {3})",
            e.from, e.to,
            categories[e.from],
            // The last category included in the selection is at (to - 1)
            categories[e.to - 1]
        );
    }

    function onSelectStart(e) {
        kendoConsole.log(kendo.format("Select start :: {0}", formatRange(e)));
    }

    function onSelect(e) {
        kendoConsole.log(kendo.format("Select :: {0}", formatRange(e)));
    }

    function onSelectEnd(e) {
        kendoConsole.log(kendo.format("Select end :: {0}", formatRange(e)));
    }

    function setOptions() {
        var chart = $("#chart").data("kendoChart");

        $.extend(true /* deep */, chart.options, {
            categoryAxis: {
                select: {
                    mousewheel: {
                        reverse: $("#reverse").prop("checked"),
                        zoom: $("#zoom").val()
                    }
                }
            }
        });

        chart.refresh();
    }

    $("#reverse, #zoom").click(setOptions);
</script>
<style>
    .k-chart {
        height: 250px;
    }
</style>
<?php require_once '../include/footer.php'; ?>
