<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$slider = new \Kendo\UI\Slider('slider');

$slider->increaseButtonTitle('Right')
       ->decreaseButtonTitle('Left')
       ->min(-10)
       ->max(10)
       ->value(0)
       ->smallStep(2)
       ->largeStep(1);

function eqSlider($index, $value) {
    $eqSlider = new \Kendo\UI\Slider("eqSlider$index");

    $eqSlider->attr('class', 'eqSlider')
             ->orientation('vertical')
             ->min(-20)
             ->max(20)
             ->smallStep(1)
             ->largeStep(20)
             ->value($value)
             ->showButtons(false);

    return $eqSlider;
}

?>
<div id="wrapper">
    <?= $slider->render() ?>
    <div id="equalizer">
        <?= eqSlider(1, 10)->render() ?>
        <?= eqSlider(2, 5)->render() ?>
        <?= eqSlider(3, 0)->render() ?>
        <?= eqSlider(4, 10)->render() ?>
        <?= eqSlider(5, 15)->render() ?>
    </div>
</div>

<style>
    #wrapper {
        width: 300px;
        height: 255px;
        padding: 45px 0 0 0;
        margin: 0 auto;
        background: url('../../content/web/slider/eqBack.png') no-repeat 0 0;
        text-align: center;
    }
    #equalizer {
        margin-top: 75px;
        padding-right: 15px;
    }
    .balSlider {
        width: 240px;
    }
    .balSlider .k-slider-selection {
        width: 240px;
        display: none;
    }
    .eqSlider {
        display: inline-block;
        zoom: 1;
        margin: 0 12px;
        height: 122px;
    }

    *+html .eqSlider {display:inline;}

</style>
<?php require_once '../../include/footer.php'; ?>
