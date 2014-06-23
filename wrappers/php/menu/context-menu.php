<?php

require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    require_once '../include/menu_data.php';

    echo json_encode(user_data());

    exit;
}

require_once '../include/header.php';

?>

    <div class="box">
        <h4>Orientation Settings</h4>
        <ul class="options">
            <li>
                <label for="orientation">orientation</label>
                <select id="orientation" name="orientation">
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                </select>
            </li>
        </ul>
        <br />
        <a class="k-button" id="apply" href="#" style="width: 80px;">Apply</a>
    </div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="../content/shared/images/employees/#= FromID #.png" alt="#: From #" />

            <h3>#:Title#</h3>
            <p class="date">#:Date#</p>
            <p>#:From#</p>
        </div>
    </script>

    <div class="demo-section k-header">
        <h4>WebMail</h4>
<?php

    $transport = new \Kendo\Data\DataSourceTransport();

    $read = new \Kendo\Data\DataSourceTransportRead();

    $read->url('context-menu.php')
         ->contentType('application/json')
         ->type('POST');

    $transport->read($read)
              ->parameterMap('function(data) {
                return kendo.stringify(data); }');

    $model = new \Kendo\Data\DataSourceSchemaModel();

    $mailIDField = new \Kendo\Data\DataSourceSchemaModelField('MailID');
    $mailIDField->type('number');

    $fromIDField = new \Kendo\Data\DataSourceSchemaModelField('FromID');
    $fromIDField->type('number');

    $fromField = new \Kendo\Data\DataSourceSchemaModelField('From');
    $fromField->type('string');

    $dateField = new \Kendo\Data\DataSourceSchemaModelField('Date');
    $dateField->type('string');

    $titleField = new \Kendo\Data\DataSourceSchemaModelField('Title');
    $titleField->type('string');

    $model->addField($mailIDField)
          ->addField($fromIDField)
          ->addField($fromField)
          ->addField($dateField)
          ->addField($titleField);

    $schema = new \Kendo\Data\DataSourceSchema();
    $schema->data('data')
           ->model($model);

    $dataSource = new \Kendo\Data\DataSource();

    $dataSource->transport($transport)
               ->schema($schema)
               ->pageSize(5);

    $listview = new \Kendo\UI\ListView('listview-context-menu');
    $listview->dataSource($dataSource)
             ->templateId('template')
             ->pageable(false);

    echo $listview->render();
?>
    </div>

<?php
    $contextMenu = new \Kendo\UI\ContextMenu('menu');

    $first = new \Kendo\UI\ContextMenuItem("Reply");
    $first->imageUrl("../content/web/toolbar/reply.png");
    $first->addItem(
        array("text" => "Reply to Sender", "imageUrl" => "../content/web/toolbar/reply.png"),
        array("text" => "Reply to All", "imageUrl" => "../content/web/toolbar/reply.png")
    );

    $second = new \Kendo\UI\ContextMenuItem("Forward");
    $second->imageUrl("../content/web/toolbar/forward.png");

    $third = new \Kendo\UI\ContextMenuItem("Mark as");
    $third->addItem(
        array("text" => "Unread"),
        array("text" => "Important"),
        array("text" => "Read")
    );

    $fourth = new \Kendo\UI\ContextMenuItem("Label as");
    $fourth->addItem(
        array("text" => "None"),
        array("text" => "Important", "imageUrl" => "../content/web/toolbar/important.png"),
        array("text" => "Work", "imageUrl" => "../content/web/toolbar/todo.png"),
        array("text" => "Personal", "imageUrl" => "../content/web/toolbar/done.png"),
        array("text" => "New Label")
    );

    $open = new \Kendo\UI\ContextMenuAnimationOpen();
    $open->effects("fade:in")
         ->duration(500);

    $animation = new \Kendo\UI\ContextMenuAnimation();
    $animation->open($open);

    $contextMenu->dataSource(array(
                    $first, $second, $third, $fourth
                ))
                ->target('#listview-context-menu')
                ->orientation("horizontal")
                ->filter(".product")
                ->animation($animation);

    echo $contextMenu->render();
?>

<script>
    $(document).ready(function() {
        $("#orientation").kendoDropDownList();

        var menu = $("#menu"),
            original = menu.clone(true);

        original.find(".k-state-active").removeClass("k-state-active");

        $("#apply").click(function (e) {
            e.preventDefault();
            var clone = original.clone(true);

            menu.getKendoContextMenu().destroy();
            clone.appendTo("#example");

            initMenu();
        });

        var initMenu = function () {
            var orientation = $("#orientation").data("kendoDropDownList").value();

            menu = $("#menu").kendoContextMenu({
                orientation: orientation,
                target: "#listview-context-menu",
                filter: ".product",
                animation: {
                    open: { effects: "fadeIn" },
                    duration: 500
                },
                select: function(e) {
                    // Do something on select
                }
            });
        };
    });
</script>

<style scoped>
    .demo-section {
            width: 860px;
        }
    #listview-context-menu {
        padding: 0;
        margin-bottom: -1px;
        min-height: 300px;
    }
    .product {
        position: relative;
        height: 62px;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid rgba(128,128,128,.3);
    }
    .product img {
        width: 40px;
        height: 40px;
        border-radius: 40px;
        margin: 10px;
        border: 1px solid #000;
        float: left;
    }
    .product h3 {
        margin: 0;
        padding: 15px 5px 1px 0;
        overflow: hidden;
        line-height: 1em;
        font-size: 1.1em;
        font-weight: bold;
    }
    .product p {
        font-size: .9em;
    }
    .product .date {
        float: right;
        margin: -8px 15px 0 0;
    }
    .k-listview:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
</style>

<?php
    require_once '../include/footer.php';
?>
