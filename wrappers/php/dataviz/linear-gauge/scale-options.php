<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

require_once '../../include/header.php';
$gauge = new \Kendo\Dataviz\UI\LinearGauge('gauge');
$gauge->pointer(array('value' => 65, 'shape' => 'arrow'))
      ->scale(array('majorUnit' => 20, 'minorUnit' => 5, 'max' => 180, 'ranges' =>
      array(
          array('from' => 80, 'to' => 120, 'color' => '#ffc700'),
          array('from' => 120, 'to' => 150, 'color' => '#ff7a00'),
          array('from' => 150, 'to' => 180, 'color' => '#c20000'),
      )));

echo $gauge->render();
?>
<div class="configuration k-widget k-header" style="width:170px;">
    <span class="configHead">Configuration</span>
    <span class="configTitle">Gauge scale should...</span>
    <ul class="options">
        <li>
            <input id="vertical" checked="checked" type="checkbox" autocomplete="off">
            <label for="vertical">... be vertical</label>
        </li>

        <li>
            <input id="labels" checked="checked" type="checkbox" autocomplete="off">
            <label for="labels">... show labels</label>
        </li>

        <li>
            <input id="ranges" checked="checked" type="checkbox" autocomplete="off">
            <label for="ranges">... show ranges</label>
        </li>
    </ul>
</div>
<script>
$(document).ready(function() {
    window.configuredRanges = $("#gauge").data("kendoLinearGauge").options.scale.ranges;
    $(".configuration").bind("change", refresh);

    function refresh() {
        var gauge = $("#gauge").data("kendoLinearGauge"),
            showLabels = $("#labels").prop("checked"),
            showRanges = $("#ranges").prop("checked"),
            isVertical = $("#vertical").prop("checked"),
            positionInputs = $("input[name='labels-position']"),
            options = gauge.options;

        options.transitions = false;
        options.scale.labels.visible = showLabels;
        options.scale.vertical = isVertical;
        options.scale.ranges = showRanges ? window.configuredRanges : [];

        $("#gauge-container").toggleClass("horizontal", !isVertical);

        gauge.redraw();
    }
});
</script>
<?php require_once '../../include/footer.php'; ?>
