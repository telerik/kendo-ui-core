<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
 <div class="demo-section">
    <?php
        $qrMail = new \Kendo\Dataviz\UI\QRCode('qrMail');
        $qrMail->value("mailto:clientservice@kendoui.com")
            ->size(100);
               
        echo $qrMail->render();
                
        $qrUrlBorder =  new \Kendo\Dataviz\UI\QRCodeBorder();
        $qrUrlBorder->color("#d11717")
            ->width(5);
        
        $qrUrl = new \Kendo\Dataviz\UI\QRCode('qrUrl');
        $qrUrl->value("http://demos.kendoui.com/dataviz/overview/index.html")
            ->size(130)
            ->errorCorrectionLevel("M")
            ->border($qrUrlBorder);
               
        echo $qrUrl->render();
        
        $qrTelephoneBorder =  new \Kendo\Dataviz\UI\QRCodeBorder();
        $qrTelephoneBorder->color("#FF321C")
            ->width(5);
        
        $qrTelephone = new \Kendo\Dataviz\UI\QRCode('qrTelephone');
        $qrTelephone->value("tel:+1-888-365-2779")
            ->size(170)
            ->errorCorrectionLevel("Q")
            ->darkModuleColor("#FF321C")
            ->border($qrTelephoneBorder);
               
        echo $qrTelephone->render();

        $qrGeoLocation = new \Kendo\Dataviz\UI\QRCode('qrGeoLocation');
        $qrGeoLocation->value("geo:42.65049,23.37925,100")
            ->errorCorrectionLevel("H")
            ->size(190)
            ->background("#ACD608");
               
        echo $qrGeoLocation->render();        
        
    ?>
</div>

<style scoped>
    .k-qrcode {
        display:inline-block;
        margin: 10px;                    
    }               
</style>
<?php require_once '../../include/footer.php'; ?>