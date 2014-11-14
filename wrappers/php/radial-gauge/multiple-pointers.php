<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

require_once '../include/header.php';

$gauge = new \Kendo\Dataviz\UI\RadialGauge('gauge');

$pointer0 = new \Kendo\Dataviz\UI\RadialGaugePointerItem('pointer0');
$pointer0->value(10)->color("#c20000");
$pointer0cap = new \Kendo\Dataviz\UI\RadialGaugePointerItemCap('pointer0cap');
$pointer0cap->size(0.15);
$pointer0->cap($pointer0cap);

$pointer1 = new \Kendo\Dataviz\UI\RadialGaugePointerItem('pointer1');
$pointer1->value(70)->color("#ff7a00");
$pointer1cap = new \Kendo\Dataviz\UI\RadialGaugePointerItemCap('pointer1cap');
$pointer1cap->size(0.1);
$pointer1->cap($pointer1cap);

$pointer2 = new \Kendo\Dataviz\UI\RadialGaugePointerItem('pointer2');
$pointer2->value(140)->color("#ffc700");

$gauge->pointer(array($pointer0, $pointer1, $pointer2))
      ->scale(array('minorUnit' => 5, 'startAngle' => -30, 'endAngle' => 210, 'max' => 180));

function createSlider($name, $value){
    $slider = new \Kendo\UI\Slider($name);
    $slider->min(0)
       	   ->max(180)
       	   ->value($value)
       	   ->showButtons(false)
       	   ->attr('class', 'slider')
       	   ->change('updateValue');

    return $slider;
}

?>

<div id="gauge-container">
    <?php
    	echo $gauge->render();
    ?>
</div>

<div class="box">
    <div class="box-col">
        <h4>Red pointer value</h4>
        <?= createSlider('gauge-value0', 10)->render() ?>
        <h4 style="margin-top: 30px;">Get all pointer values</h4>
        <button id="getValues" class="k-button">Get all</button>
    </div>
    <div class="box-col">
        <h4>Orange pointer value</h4>
        <?= createSlider('gauge-value1', 70)->render() ?>
                
        <h4 style="margin-top: 30px;">Set all pointer values</h4>
        <input id="newValues" class="k-textbox" value="100, 10, 80" style="width: 110px;" />
        <button id="setValues" class="k-button">Set all</button>
    </div>
    <div class="box-col">
        <h4>Yellow pointer value</h4>
        <?= createSlider('gauge-value2', 140)->render() ?>
    </div>
</div>

<script>
	function updateValue(){
		var id = this.element.attr("id");
        var pointerIndex = id.substr(id.length - 1);
        var gauge = $("#gauge").data("kendoRadialGauge");
        gauge.pointers[pointerIndex].value(this.value());
	}

	$("#getValues").click(function () {
        alert("All values: " + $("#gauge").data("kendoRadialGauge").allValues().join(", "));
    });

    $("#setValues").click(function () {
        var values = $("#newValues").val().split(",");

        values = $.map(values, function (val) {
            return parseInt(val);
        });

        $("#gauge").data("kendoRadialGauge").allValues(values);
    });
</script>

<style scoped>
    #gauge-container {
        background: transparent url("../content/dataviz/gauge/gauge-container.png") no-repeat 50% 50%;
        width: 404px;
        height: 404px;
        text-align: center;
        margin: 0 auto 30px auto;
    }

    #gauge {
        width: 330px;
        height: 330px;
        margin: 0 auto 0;
    }

    .slider {
    	width: 220px;
    }
</style>

<?php require_once '../include/footer.php'; ?>