<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="k-rtl demo-section">
<?php
    $treeview = new \Kendo\UI\TreeView('treeview');

    // helper function that creates TreeViewItem with spriteCssClass
    function TreeViewItem($text, $spriteCssClass) {
        $item = new \Kendo\UI\TreeViewItem($text);
        $item->spriteCssClass($spriteCssClass);
        return $item;
    }

    $site = TreeViewItem('My Web Site', 'folder');

    $images = TreeViewItem('images', 'folder');
    $images->expanded(true);
    $images->addItem(TreeViewItem('logo.png', 'image'))
           ->addItem(TreeViewItem('body-back.png', 'image'))
           ->addItem(TreeViewItem('my-photo.jpg', 'image'));

    $pdfs = TreeViewItem('pdf', 'folder');
    $pdfs->expanded(true);
    $pdfs->addItem(TreeViewItem('brochure.pdf', 'pdf'))
         ->addItem(TreeViewItem('prices.pdf', 'pdf'));

    $resources = TreeViewItem('resources', 'folder');
    $resources->expanded(true);
    $resources->addItem($pdfs)
              ->addItem(TreeViewItem('zip', 'folder'));


    $site->expanded(true);
    $site->addItem($images)
         ->addItem($resources)
         ->addItem(TreeViewItem('about.html', 'html'))
         ->addItem(TreeViewItem('contacts.html', 'html'))
         ->addItem(TreeViewItem('index.html', 'html'))
         ->addItem(TreeViewItem('portfolio.html', 'html'));

    $treeview->addItem($site);

    echo $treeview->render();
?>
</div>

<style scoped>
    .demo-section {
        width: 200px;
    }

    #treeview .k-sprite {
        background-image: url("../../content/web/treeview/coloricons-sprite.png");
    }

    .rootfolder { background-position: 0 0; }
    .folder { background-position: 0 -16px; }
    .pdf { background-position: 0 -32px; }
    .html { background-position: 0 -48px; }
    .image { background-position: 0 -64px; }

</style>

<?php require_once '../../include/footer.php'; ?>
