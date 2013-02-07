<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div id="megaStore">
<?php
    $menu = new \Kendo\UI\Menu('menu');

    $products = new \Kendo\UI\MenuItem('Products');

    $furniture = new \Kendo\UI\MenuItem('Furniture');
    $furniture->addItem(
        new \Kendo\UI\MenuItem('Tables & Chairs'),
        new \Kendo\UI\MenuItem('Sofas'),
        new \Kendo\UI\MenuItem('Occasional Furniture'),
        new \Kendo\UI\MenuItem('Childerns Furniture'),
        new \Kendo\UI\MenuItem('Beds')
    );
    $products->addItem($furniture);

    $decor = new \Kendo\UI\MenuItem('Decor');
    $decor->addItem(
        new \Kendo\UI\MenuItem('Bed Linen'),
        new \Kendo\UI\MenuItem('Throws'),
        new \Kendo\UI\MenuItem('Curtains & Blinds'),
        new \Kendo\UI\MenuItem('Rugs'),
        new \Kendo\UI\MenuItem('Carpets')
    );
    $products->addItem($decor);

    $storage = new \Kendo\UI\MenuItem('Storage');
    $storage->addItem(
        new \Kendo\UI\MenuItem('Wall Shelving'),
        new \Kendo\UI\MenuItem('Kids Storage'),
        new \Kendo\UI\MenuItem('Baskets'),
        new \Kendo\UI\MenuItem('Multimedia Storage'),
        new \Kendo\UI\MenuItem('Floor Shelving'),
        new \Kendo\UI\MenuItem('Toilet Roll Holders'),
        new \Kendo\UI\MenuItem('Storage Jars'),
        new \Kendo\UI\MenuItem('Drawers'),
        new \Kendo\UI\MenuItem('Boxes')
    );
    $products->addItem($storage);

    $lights = new \Kendo\UI\MenuItem('Lights');
    $lights->addItem(
        new \Kendo\UI\MenuItem('Ceiling'),
        new \Kendo\UI\MenuItem('Table'),
        new \Kendo\UI\MenuItem('Floor'),
        new \Kendo\UI\MenuItem('Shades'),
        new \Kendo\UI\MenuItem('Wall Lights'),
        new \Kendo\UI\MenuItem('Spotlights'),
        new \Kendo\UI\MenuItem('Push Light'),
        new \Kendo\UI\MenuItem('String Lights')
    );
    $products->addItem($lights);

    $menu->addItem($products);

    $stores = new \Kendo\UI\MenuItem('Stores');
    $stores->startContent();
?>
    <div id="template" style="padding: 10px;">
        <h2>Around the Globe</h2>
        <ol>
            <li>United States</li>
            <li>Europe</li>
            <li>Canada</li>
            <li>Australia</li>
        </ol>
        <img src="../../content/web/menu/map.png" alt="Stores Around the Globe" />
        <button class="k-button">See full list</button>
    </div>
<?php
    $stores->endContent();

    $menu->addItem($stores);

    $menu->addItem(
        new \Kendo\UI\MenuItem('Blog'),
        new \Kendo\UI\MenuItem('Company'),
        new \Kendo\UI\MenuItem('Events')
    );

    $news = new \Kendo\UI\MenuItem('News');
    $news->enabled(false);
    $menu->addItem($news);

    echo $menu->render();
?>
</div>

<style scoped>
    #megaStore {
        width: 600px;
        margin: 30px auto;
        padding-top: 120px;
        background: url('../../content/web/menu/header.jpg') no-repeat 0 0;
    }
    #menu h2 {
        font-size: 1em;
        text-transform: uppercase;
        padding: 5px 10px;
    }
    #template img {
        margin: 5px 20px 0 0;
        float: left;
    }
    #template {
        width: 380px;
    }
    #template ol {
        float: left;
        margin: 0 0 0 30px;
        padding: 10px 10px 0 10px;
    }
    #template:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    #template .k-button {
        float: left;
        clear: left;
        margin: 5px 0 5px 12px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

