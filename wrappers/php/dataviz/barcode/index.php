<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>
 <div class="demo-section">    
    <?php
        $ean8 = new \Kendo\Dataviz\UI\Barcode('ean8');
        $ean8->value("1234567");
        $ean8->type("ean8");
        echo $ean8->render();             
                
	$code128 = new \Kendo\Dataviz\UI\Barcode('code128');
        $code128->value("Hello world!");
        $code128->type("code128");
        echo $code128->render();  

	$postnet = new \Kendo\Dataviz\UI\Barcode('postnet');
	$postnet->value("23494");
	$postnet->type("postnet");
	echo $postnet->render();
    ?>
</div>

<?php require_once '../../include/footer.php'; ?>
