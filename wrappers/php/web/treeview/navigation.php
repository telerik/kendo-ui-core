<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="demo-section">
<?php
    $treeview = new \Kendo\UI\TreeView('treeview');

    $treeview->attr('tabindex', '1')
             ->attr('accesskey', 'w');

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

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider">Alt</span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            highlights previous item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            collapses the item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            highlights next item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            expands the item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            highlights first item in the list
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            highlights last item in the list
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            selects highlighted item
        </span>
    </li>
</ul>


<script>
    $(document).ready(function() {
        $("#treeview").kendoTreeView();

        //focus the widget
        $(document).on("keydown.examples", function(e) {
            if (e.altKey && e.keyCode === 87 /* w */) {
                $("#treeview").data("kendoTreeView").wrapper.focus();
            }
        });
    });
</script>

<style scoped>
    .demo-section {
        width: 200px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
