<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$slider = new \Kendo\UI\Slider('slider');
$slider->attr('class', 'temperature')
       ->change('sliderOnChange')
       ->slide('sliderOnSlide')
       ->min(0)
       ->max(30)
       ->smallStep(1)
       ->largeStep(10)
       ->value(18);

$rangeslider = new \Kendo\UI\RangeSlider('rangeslider');
$rangeslider->attr('class', 'humidity')
            ->change('rangeSliderOnChange')
            ->slide('rangeSliderOnSlide')
            ->min(0)
            ->max(10)
            ->smallStep(1)
            ->largeStep(2)
            ->tickPlacement('both');
?>
<div id="climateCtrl">
    <?= $slider->render() ?>
    <?= $rangeslider->render() ?>
</div>
<div class="console"></div>
<script>
    function sliderOnSlide(e) {
        kendoConsole.log("Slide :: new slide value is: " + e.value);
    }

    function sliderOnChange(e) {
        kendoConsole.log("Change :: new value is: " + e.value);
    }

    function rangeSliderOnSlide(e) {
        kendoConsole.log("Slide :: new slide value is: " + e.value.toString().replace(",", " - "));
    }

    function rangeSliderOnChange(e) {
        kendoConsole.log("Change :: new value is: " + e.value.toString().replace(",", " - "));
    }
</script>
<style>
    #climateCtrl {
        width: 245px;
        height: 167px;
        margin: 30px auto;
        padding: 102px 0 0 156px;
        background: url('../../content/web/slider/climateController.png') transparent no-repeat 0 0;
    }
    .humidity {
        margin: 67px 0 0 15px;
        width: 170px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
