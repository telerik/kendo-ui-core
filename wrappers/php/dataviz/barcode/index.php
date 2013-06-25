<?php
require_once '../../lib/Kendo/Autoload.php';
require_once '../../include/header.php';
?>

     <?php
    $manchego = new \Kendo\Dataviz\UI\Barcode('manchego');
        $manchego->value("2346722");
        $manchego->width("200");
        $manchego->height("100");
        $manchego->type("ean8");            
                
	$mascarpone = new \Kendo\Dataviz\UI\Barcode('mascarpone');
        $mascarpone->value("Mascarpone");
        $mascarpone->type("code128");
        $mascarpone->width("200");
        $mascarpone->height("100"); 

	$gudbrands = new \Kendo\Dataviz\UI\Barcode('gudbrands');
        $gudbrands->value("CHEESE");
        $gudbrands->type("code39");
        $gudbrands->width("200");
        $gudbrands->height("100"); 
    ?>

    <ul id="dairy">
        <li>
            <img src="../../content/web/foods/200/12.jpg" alt="Queso Manchego La Pastora" />
            <?php echo $manchego->render(); ?>
        </li>
        <li>
            <img src="../../content/web/foods/200/32.jpg" alt="Mascarpone Fabioli" />
            <?php echo $mascarpone->render(); ?>
        </li>
        <li>
            <img src="../../content/web/foods/200/72.jpg" alt="Gudbrandsdalsost" />
            <?php echo $gudbrands->render(); ?>
        </li>
    </ul>
        
    <style scoped>
        #dairy {
            margin: 0;
            padding: 30px 25px;
            list-style-type: none;
        }
        #dairy li {
            display: inline-block;
            padding: 10px;
            margin: 6px;
            background-color: #fff;
            
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        #dairy li p, #dairy li img {
            margin: 0;
            padding: 0;
        }
        #dairy li img {
            margin-bottom: 10px;
        }
    </style>

<?php require_once '../../include/footer.php'; ?>
