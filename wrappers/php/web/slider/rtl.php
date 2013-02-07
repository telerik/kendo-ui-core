<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$slider = new \Kendo\UI\Slider('slider');
$slider->min(0)
       ->max(30)
       ->smallStep(1)
       ->largeStep(10)
       ->value(18);

$rangeslider = new \Kendo\UI\RangeSlider('rangeslider');
$rangeslider->min(0)
            ->max(10)
            ->smallStep(1)
            ->largeStep(2)
            ->tickPlacement('both');
?>
<div class="k-rtl">
    <?= $slider->render() ?>
    <br/><br/><br/>
    <?= $rangeslider->render() ?>
</div>
<?php require_once '../../include/footer.php'; ?>
