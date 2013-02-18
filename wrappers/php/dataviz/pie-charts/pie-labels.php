<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';

$series = new \Kendo\Dataviz\UI\ChartSeriesItem();
$series->type('pie')
       ->data(array(
            array('category' => 'Football', 'value' => 35),
            array('category' => 'Basketball', 'value' => 25),
            array('category' => 'Volleyball', 'value' => 20),
            array('category' => 'Rugby', 'value' => 10),
            array('category' => 'Tennis', 'value' => 10)
       ));

$chart = new \Kendo\Dataviz\UI\Chart('chart');

$chart->title(array('text' => 'What is you favourite sport?'))
      ->addSeriesItem($series)
      ->legend(array('position' => 'top'))
      ->tooltip(array('visible' => true, 'template' => "#= category # - #= kendo.format('{0:P}', percentage) #"))
      ->seriesDefaults(array(
          'labels' => array(
              'template' => "#= category # - #= kendo.format('{0:P}', percentage)#",
              'position' => 'outsideEnd',
              'visible' => true,
              'background' => 'transparent'
          )
      ));

echo $chart->render();
?>
<div class="configuration-horizontal">
    <div class="config-section">
        <span class="configHead">Labels Configuration</span>
        <ul class="options">
            <li>
                <input id="labels" checked="checked" type="checkbox" autocomplete="off" />
                <label for="labels">Show labels</label>
            </li>
            <li>
                <input id="alignCircle" name="alignType" type="radio"
                       value="circle" checked="checked" autocomplete="off" />
                <label for="alignCircle">Aligned in circle</label>
            </li>
            <li>
                <input id="alignColumn" name="alignType" type="radio"
                       value="column" autocomplete="off" />
                <label for="alignColumn">Aligned in columns</label>
            </li>
        </ul>
    </div>
</div>
<script>
$(document).ready(function() {
    $(".configuration-horizontal").bind("change", refresh);
});

function refresh() {
    var chart = $("#chart").data("kendoChart"),
        pieSeries = chart.options.series[0],
        labels = $("#labels").prop("checked"),
        alignInputs = $("input[name='alignType']"),
        alignLabels = alignInputs.filter(":checked").val();

    chart.options.transitions = false;
    pieSeries.labels.visible = labels;
    pieSeries.labels.align = alignLabels;

    alignInputs.attr("disabled", !labels);

    chart.refresh();
}
</script>
<?php require_once '../../include/footer.php'; ?>
