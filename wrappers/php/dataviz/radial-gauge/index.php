<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/chart_data.php';

require_once '../../include/header.php';
$gauge = new \Kendo\Dataviz\UI\RadialGauge('gauge');
$gauge->pointer(array('value' => 65))
      ->scale(array('minorUnit' => 5, 'startAngle' => -30, 'endAngle' => 210, 'max' => 180));

echo $gauge->render();
?>
<input id='gauge-value' value='65' />
<script>
    $(document).ready(function() {
        function updateValue() {
            $("#gauge").data("kendoRadialGauge").value($("#gauge-value").val());
        }

        $("#gauge-value").change(updateValue);
    });
</script>
<?php require_once '../../include/footer.php'; ?>
