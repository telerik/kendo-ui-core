<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
    <span class="configHead">Animation Settings</span>
    <ul class="options">
        <li>
            <input id="toggle" name="animation" type="radio" /> <label for="toggle">toggle animation</label>
        </li>
        <li>
            <input id="slide" name="animation" type="radio" checked="checked" /> <label for="slide">slide animation</label>
        </li>
        <li>
            <input id="expand" name="animation" type="radio" checked="checked" /> <label for="expand">expand animation</label>
        </li>
        <li>
            <input id="opacity" type="checkbox" checked="checked" /> <label for="opacity">animate opacity</label>
        </li>
        <li>
            <input id="delay" name="animation" type="text" value="100" class="k-textbox" /> <label for="delay">open/close delay</label>
        </li>
    </ul>
</div>

<?php
    $menu = new \Kendo\UI\Menu('menu');

    $menu->attr('style', 'margin-right: 220px');

    $furniture = new \Kendo\UI\MenuItem('Furniture');
    $furniture->addItem(
        new \Kendo\UI\MenuItem('Tables & Chairs'),
        new \Kendo\UI\MenuItem('Sofas'),
        new \Kendo\UI\MenuItem('Occasional Furniture'),
        new \Kendo\UI\MenuItem('Childerns Furniture'),
        new \Kendo\UI\MenuItem('Beds')
    );

    $decor = new \Kendo\UI\MenuItem('Decor');
    $decor->addItem(
        new \Kendo\UI\MenuItem('Bed Linen'),
        new \Kendo\UI\MenuItem('Throws'),
        new \Kendo\UI\MenuItem('Curtains & Blinds'),
        new \Kendo\UI\MenuItem('Rugs'),
        new \Kendo\UI\MenuItem('Carpets')
    );

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

    $menu->addItem($furniture, $decor, $storage, $lights);

    echo $menu->render();
?>

<script>
    $(document).ready(function() {
        var original = $("#menu").clone(true);

        original.find(".k-state-active").removeClass("k-state-active");

        $(".configuration input").change( function() {
            var menu = $("#menu"),
                clone = original.clone(true);

            menu.data("kendoMenu").close($("#menu .k-link"));

            menu.replaceWith(clone);

            initMenu();
        });
        var getEffects = function () {
            return (($("#expand")[0].checked ? "expand:vertical " : "") +
                    ($("#slide")[0].checked ? "slideIn:down " : "") +
                    ($("#opacity")[0].checked ? "fadeIn" : "")) || false;
        };

        var initMenu = function () {
            $("#menu").kendoMenu({
                animation: { open: { effects: getEffects() } },
                hoverDelay: $("#delay")[0].value
            });
        };
    });
</script>

<style scoped>
    .configuration .k-textbox
    {
        margin-top: -3px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>

