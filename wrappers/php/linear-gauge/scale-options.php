<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

require_once '../include/header.php';
$gauge = new \Kendo\Dataviz\UI\LinearGauge('gauge');
$gauge->pointer(array('value' => 65, 'shape' => 'arrow'))
      ->scale(array('majorUnit' => 20, 'minorUnit' => 5, 'max' => 180, 'ranges' =>
      array(
          array('from' => 80, 'to' => 120, 'color' => '#ffc700'),
          array('from' => 120, 'to' => 150, 'color' => '#ff7a00'),
          array('from' => 150, 'to' => 180, 'color' => '#c20000'),
      )));

?>

<div id="gauge-container">
    <?php
        echo $gauge->render();
    ?>
</div>

<div class="box">
    <h4>Gauge scale should...</h4>
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
    $(".box").bind("change", refresh);

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

<style scoped>
    #gauge-container {
        text-align: center;
        margin-left: 30px;
        background: transparent url("../content/dataviz/gauge/linear-gauge-container.png") no-repeat 50% 50%;
        padding: 18px;
        width: 300px;
        height: 300px;
        margin: 0 auto;
    }

    #gauge-container.horizontal {
        background-image: url("../content/dataviz/gauge/linear-gauge-container-h.png");
    }

    #gauge {
        width: 100%;
        height: 100%;
        margin: 0 auto 0;
    }
</style>
<?php require_once '../include/footer.php'; ?>
