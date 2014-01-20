<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

<div class="demo-section">
    <h3>E-mail</h3>
     <?php
        $qrMail = new \Kendo\Dataviz\UI\QRCode('qrMail');
        $qrMail->value("mailto:clientservice@telerik.com")
            ->size(120)
            ->color("#e15613")
            ->background("transparent");

        echo $qrMail->render();
     ?>
</div>
<div class="demo-section">
    <h3>URL</h3>
    <?php
        $qrUrlBorder =  new \Kendo\Dataviz\UI\QRCodeBorder();
        $qrUrlBorder->color("#000000")
            ->width(5);

        $qrUrl = new \Kendo\Dataviz\UI\QRCode('qrUrl');
        $qrUrl->value("http://demos.telerik.com/kendo-ui/dataviz/overview/index.html")
            ->size(120)
            ->errorCorrection("M")
            ->border($qrUrlBorder);

        echo $qrUrl->render();
    ?>
</div>
<div class="demo-section">
    <h3>Telephone</h3>
    <?php
        $qrTelephoneBorder =  new \Kendo\Dataviz\UI\QRCodeBorder();
        $qrTelephoneBorder->color("#67a814")
            ->width(5);

        $qrTelephone = new \Kendo\Dataviz\UI\QRCode('qrTelephone');
        $qrTelephone->value("tel:+1-888-365-2779")
            ->size(120)
            ->errorCorrection("Q")
            ->color("#67a814")
            ->border($qrTelephoneBorder);

        echo $qrTelephone->render();
    ?>
</div>
<div class="demo-section">
    <h3>Geo Location</h3>
    <?php
        $qrGeoLocation = new \Kendo\Dataviz\UI\QRCode('qrGeoLocation');
        $qrGeoLocation->value("geo:42.65049,23.37925,100")
            ->errorCorrection("H")
            ->size(120)
            ->color("#166a83");

        echo $qrGeoLocation->render();
    ?>
</div>

<style scoped>
    .demo-section {
        display: inline-block;
        margin: 17px;
    }
    .k-qrcode {
        display:inline-block;
        margin: 10px 0 0;
        border: none;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
