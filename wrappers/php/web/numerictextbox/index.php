<?php
require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$numeric = new \Kendo\UI\NumericTextBox('numeric');
$numeric->value(17)
        ->min(0)
        ->max(100)
        ->step(1);

$currency = new \Kendo\UI\NumericTextBox('currency');
$currency->format('c')
         ->value(30)
         ->min(0)
         ->max(100)
         ->decimals(3);

$percentage = new \Kendo\UI\NumericTextBox('percentage');
$percentage->format('p0')
           ->value(0.05)
           ->min(0)
           ->max(0.1)
           ->step(0.01);

$custom = new \Kendo\UI\NumericTextBox('custom');
$custom->format('#.00 kg')
       ->value(2);

?>
<div id="add-product">
    <div>
        <?= $currency->render() ?>
    </div>
    <div style="margin-top: 7px;">
        <?= $percentage->render() ?>
    </div>
    <div style="margin-top: 7px;">
        <?= $custom->render() ?>
    </div>
    <div style="margin-top: 7px;">
        <?= $numeric->render() ?>
    </div>
</div>
<style scoped>
    #add-product {
        height: 181px;
        width: 252px;
        margin: 30px auto;
        padding: 64px 0 0 143px;
        background: url('../../content/web/numerictextbox/addProduct.png') transparent no-repeat 0 0;
    }
</style>
<?php require_once '../../include/footer.php'; ?>
