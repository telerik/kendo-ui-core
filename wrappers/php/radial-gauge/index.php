<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

require_once '../include/header.php';
$gauge = new \Kendo\Dataviz\UI\RadialGauge('gauge');
$gauge->pointer(array('value' => 65))
      ->scale(array('minorUnit' => 5, 'startAngle' => -30, 'endAngle' => 210, 'max' => 180));

$slider = new \Kendo\UI\Slider('gauge-value');
$slider->min(0)
       ->max(180)
       ->value(65)
       ->showButtons(false)
       ->change('updateValue');
?>

<div id="gauge-container">
<?php
	echo $gauge->render();
	echo $slider->render();
?>
</div>

<script>
    function updateValue() {
        $("#gauge").data("kendoRadialGauge").value($("#gauge-value").val());
    }

</script>

<style scoped>
	#gauge-container {
        background: transparent url("../content/dataviz/gauge/gauge-container-partial.png") no-repeat 50% 50%;
        width: 386px;
        height: 386px;
        text-align: center;
        margin: 0 auto 30px auto;
    }

    #gauge {
        width: 350px;
        height: 300px;
        margin: 0 auto;
    }

    #gauge-container .k-slider {
        margin-top: -11px;
        width: 140px;
    }
</style>

<?php require_once '../include/footer.php'; ?>
