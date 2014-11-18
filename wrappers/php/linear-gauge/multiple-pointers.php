<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/chart_data.php';

require_once '../include/header.php';

$gauge = new \Kendo\Dataviz\UI\LinearGauge('gauge');

$pointer0 = new \Kendo\Dataviz\UI\LinearGaugePointerItem('pointer0');
$pointer0->value(10)->color("#c20000")->shape("arrow");

$pointer1 = new \Kendo\Dataviz\UI\LinearGaugePointerItem('pointer1');
$pointer1->value(70)->color("#ff7a00")->margin(10);

$pointer2 = new \Kendo\Dataviz\UI\LinearGaugePointerItem('pointer2');
$pointer2->value(140)->color("#ffc700");

$gauge->pointer(array($pointer0, $pointer1, $pointer2))
      ->scale(array('minorUnit' => 5, 'min' => 0, 'max' => 180, 'vertical' => true));

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
        var gauge = $("#gauge").data("kendoLinearGauge");
        gauge.pointers[pointerIndex].value(this.value());
  }

  $("#getValues").click(function () {
        alert("All values: " + $("#gauge").data("kendoLinearGauge").allValues().join(", "));
    });

    $("#setValues").click(function () {
        var values = $("#newValues").val().split(",");

        values = $.map(values, function (val) {
            return parseInt(val);
        });

        $("#gauge").data("kendoLinearGauge").allValues(values);
    });
</script>

<style scoped>
    #gauge-container {
        text-align: center;
        margin: 0 auto;
        background: transparent url("../content/dataviz/gauge/linear-gauge-container.png") no-repeat 50% 50%;
        padding: 18px;
        width: 300px;
        height: 300px;
    }

    #gauge {
        height: 300px;
        display: inline-block;
        zoom: 1;
    }
</style>

<?php require_once '../include/footer.php'; ?>