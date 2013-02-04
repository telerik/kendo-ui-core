<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="treeview-back">
<h3>TreeView with images</h3>
<?php
    $treeview = new \Kendo\UI\TreeView('treeview-images');

    // helper function that creates TreeViewItem with imageUrl
    function ImageTreeViewItem($text, $imageUrl) {
        $item = new \Kendo\UI\TreeViewItem($text);
        $item->imageUrl($imageUrl);
        return $item;
    }

    $inbox = ImageTreeViewItem('Inbox', '../../content/web/treeview/mail.png');
    $inbox->addItem(
        ImageTreeViewItem('Read Mail', '../../content/web/treeview/readmail.png')
    );

    $drafts = ImageTreeViewItem('Drafts', '../../content/web/treeview/edit.png');

    $search = ImageTreeViewItem('Search Folders', '../../content/web/treeview/search.png');
    $search->expanded(true);
    $search->addItem(
        ImageTreeViewItem('Categorized Mail', '../../content/web/treeview/search.png'),
        ImageTreeViewItem('Large Mail', '../../content/web/treeview/search.png'),
        ImageTreeViewItem('Unread Mail', '../../content/web/treeview/search.png')
    );

    $settings = ImageTreeViewItem('Settings', '../../content/web/treeview/settings.png');

    $dataSource = new \Kendo\Data\HierarchicalDataSource();

    // add root-level nodes as datasource data
    $dataSource->data(array($inbox, $drafts, $search, $settings));

    $treeview->dataSource($dataSource);

    echo $treeview->render();
?>
</div>

<div class="treeview-back">
<h3>TreeView with sprites</h3>
<?php
    $treeview = new \Kendo\UI\TreeView('treeview-sprites');

    // helper function that creates TreeViewItem with spriteCssClass
    function TreeViewItem($text, $spriteCssClass) {
        $item = new \Kendo\UI\TreeViewItem($text);
        $item->spriteCssClass($spriteCssClass);
        return $item;
    }

    $documents = TreeViewItem('My Documents', 'rootfolder');
    $documents->expanded(true);

    $kendoproject = TreeViewItem('Kendo UI Project', 'folder');
    $kendoproject->expanded(true);
    $kendoproject->addItem(TreeViewItem('about.html', 'html'))
                 ->addItem(TreeViewItem('index.html', 'html'))
                 ->addItem(TreeViewItem('logo.png', 'image'));

    $newsite = TreeViewItem('New Web Site', 'folder');
    $newsite->expanded(true);
    $newsite->addItem(TreeViewItem('mockup.jpg', 'image'))
            ->addItem(TreeViewItem('Research.pdf', 'pdf'));


    $reports = TreeViewItem('Reports', 'folder');
    $reports->expanded(true);
    $reports->addItem(TreeViewItem('February.pdf', 'pdf'))
            ->addItem(TreeViewItem('March.pdf', 'pdf'))
            ->addItem(TreeViewItem('April.pdf', 'pdf'));

    $documents->addItem($kendoproject, $newsite, $reports);

    $dataSource = new \Kendo\Data\HierarchicalDataSource();

    $dataSource->data(array($documents));

    $treeview->dataSource($dataSource);

    echo $treeview->render();
?>
</div>

<style scoped>
    #treeview-sprites .k-sprite {
        background-image: url("../../content/web/treeview/coloricons-sprite.png");
    }

    .rootfolder { background-position: 0 0; }
    .folder { background-position: 0 -16px; }
    .pdf { background-position: 0 -32px; }
    .html { background-position: 0 -48px; }
    .image { background-position: 0 -64px; }

    .treeview-back
    {
        float: left;
        width: 200px;
        margin: 30px;
        padding: 20px;
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
        box-shadow: 0 1px 2px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.07);
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
    }
    .treeview-back h3
    {
        margin: 0 0 10px 0;
        padding: 0;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
