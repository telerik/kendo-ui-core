<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
    <span class="configHead">Animation Settings</span>
    <ul class="options">
        <li>
            <input id="toggle" name="animation" type="radio" />
            <label for="toggle">toggle animation</label>
        </li>
        <li>
            <input id="expand" name="animation" type="radio" checked="checked" />
            <label for="expand">expand animation</label>
        </li>
        <li>
            <input id="opacity" type="checkbox" checked="checked" />
            <label for="opacity">animate opacity</label>
        </li>
    </ul>
</div>

<div class="demo-section">
<?php
    $treeview = new \Kendo\UI\TreeView('treeview');

    $treeview->attr('style', 'width: 200px;');

    $furniture = new \Kendo\UI\TreeViewItem('Furniture');
    $furniture->addItem(
        new \Kendo\UI\TreeViewItem('Tables & Chairs'),
        new \Kendo\UI\TreeViewItem('Sofas'),
        new \Kendo\UI\TreeViewItem('Occasional Furniture'),
        new \Kendo\UI\TreeViewItem('Childerns Furniture'),
        new \Kendo\UI\TreeViewItem('Beds')
    );

    $decor = new \Kendo\UI\TreeViewItem('Decor');
    $decor->expanded(true);
    $decor->addItem(
        new \Kendo\UI\TreeViewItem('Bed Linen'),
        new \Kendo\UI\TreeViewItem('Throws'),
        new \Kendo\UI\TreeViewItem('Curtains & Blinds'),
        new \Kendo\UI\TreeViewItem('Rugs'),
        new \Kendo\UI\TreeViewItem('Carpets')
    );

    $storage = new \Kendo\UI\TreeViewItem('Storage');
    $storage->addItem(
        new \Kendo\UI\TreeViewItem('Wall Shelving'),
        new \Kendo\UI\TreeViewItem('Kids Storage'),
        new \Kendo\UI\TreeViewItem('Baskets'),
        new \Kendo\UI\TreeViewItem('Multimedia Storage'),
        new \Kendo\UI\TreeViewItem('Floor Shelving'),
        new \Kendo\UI\TreeViewItem('Toilet Roll Holders'),
        new \Kendo\UI\TreeViewItem('Storage Jars'),
        new \Kendo\UI\TreeViewItem('Drawers'),
        new \Kendo\UI\TreeViewItem('Boxes')
    );

    $treeview->addItem($furniture, $decor, $storage);

    echo $treeview->render();
?>
</div>

<script>
    $(document).ready(function() {
        var original = $("#treeview").clone(true);

        $(".configuration input").change( function() {
            var treeView = $("#treeview"),
                clone = original.clone(true);

            treeView.parent().empty().remove();
            $(".demo-section").append(clone);

            initTreeView();
        });

        var initTreeView = function () {
            $("#treeview").width(200)
                .kendoTreeView({
                    animation: {
                        expand: {
                            effects: getEffects()
                        }
                    }
                });
        };

        var getEffects = function () {
            return (($("#expand")[0].checked ? "expand:vertical " : "") +
                    ($("#opacity")[0].checked ? "fadeIn" : "")) || false;
        };
    });
</script>

<style scoped>
    .demo-section {
        width: 200px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
