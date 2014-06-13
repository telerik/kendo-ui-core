<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';
require_once '../include/header.php';

$cashFlowData = array(
    array('period' => 'Beginning\nBalance', 'amount' => 50000),
    array('period' => 'Jan', 'amount' => 17000),
    array('period' => 'Feb', 'amount' => 14000),
    array('period' => 'Mar', 'amount' => -12000),
    array('period' => 'Q1', 'summary' => 'runningTotal'),
    array('period' => 'Apr', 'amount' => -22000),
    array('period' => 'May', 'amount' => -18000),
    array('period' => 'Jun', 'amount' => 10000),
    array('period' => 'Q2', 'summary' => 'runningTotal'),
    array('period' => 'Ending\nBalance', 'summary' => 'total')
);

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data($cashFlowData);

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('waterfall')
       ->field('amount')
       ->categoryField('period')
       ->summaryField('summary')
       ->color(new \Kendo\JavaScriptFunction('pointColor'))
       ->labels(array('visible' => true, 'format' => 'C0', 'position' => 'insideEnd'));

$valueAxis = new \Kendo\Dataviz\UI\ChartValueAxisItem();
$valueAxis->labels(array('format' => 'C0'));

$chart = new \Kendo\Dataviz\UI\Chart('chart');
$chart->title(array('text' => 'Cash flow'))
      ->dataSource($dataSource)
      ->legend(array('visible' => false))
      ->addSeriesItem($series)
      ->addValueAxisItem($valueAxis);

echo $chart->render();

require_once '../include/footer.php';
?>
<script>
    function pointColor(point) {
        var summary = point.dataItem.summary;
        if (summary) {
            return summary == "total" ? "#555" : "gray";
        }

        if (point.value > 0) {
            return "green";
        } else {
            return "red";
        }
    }
</script>
