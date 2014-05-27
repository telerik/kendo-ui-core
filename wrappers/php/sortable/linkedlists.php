<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$sortableListA = new \Kendo\UI\Sortable('#sortable-listA'); // select the container for the Sortable
$sortableListA->connectWith('#sortable-listB')
    ->cursor('url(\'../content/web/sortable/grabbing.cur\'), default')
    ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));

echo $sortableListA->render();

$sortableListB = new \Kendo\UI\Sortable('#sortable-listB'); // select the container for the Sortable
$sortableListB->cursor('url(\'../content/web/sortable/grabbing.cur\'), default')
    ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));

echo $sortableListB->render();

$sortableListC = new \Kendo\UI\Sortable('#sortable-listC'); // select the container for the Sortable
$sortableListC->connectWith('#sortable-listD')
    ->cursor('url(\'../content/web/sortable/grabbing.cur\'), default')
    ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));

echo $sortableListC->render();

$sortableListD = new \Kendo\UI\Sortable('#sortable-listD'); // select the container for the Sortable
$sortableListD->connectWith('#sortable-listC')
    ->cursor('url(\'../content/web/sortable/grabbing.cur\'), default')
    ->placeholder(new \Kendo\JavaScriptFunction('placeholder'));

echo $sortableListD->render();

?>

    <div class="demo-section one-way">
        <div class="list-wrapper">
            <ul id="sortable-listA">
                <li class="list-item">Apples</li>
                <li class="list-item">Grapefruits</li>
                <li class="list-item">Bananas</li>
            </ul>

            <ul id="sortable-listB">
                <li class="list-item">Cranberries</li>
                <li class="list-item">Pineapples</li>
                <li class="list-item">Strawberries</li>
            </ul>
        </div>
    </div>

    <div class="demo-section two-way">
        <div class="list-wrapper">
            <ul id="sortable-listC" style="min-height: 110px;">
                <li class="list-item">Cherries</li>
                <li class="list-item">Pears</li>
                <li class="list-item">Plums</li>
            </ul>

            <ul id="sortable-listD" style="min-height: 110px;">
                <li class="list-item">Apricots</li>
                <li class="list-item">Grapes</li>
                <li class="list-item">Lemons</li>
            </ul>
        </div>
    </div>

    <script>
        function placeholder(element) {
            return $("<li class='list-item' id='placeholder'>Drop Here!</li>");
        }
    </script>

    <style>
        #example {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .demo-section {
            padding: 50px 70px;
        }
        .one-way {
            background: url('../content/web/sortable/one-way.png') no-repeat 50% 50%;
        }
        .two-way {
            background: url('../content/web/sortable/two-way.png') no-repeat 50% 50%;
        }
        .list-wrapper {
            overflow: hidden;
        }

        #sortable-listA, #sortable-listB, #sortable-listC, #sortable-listD {
            width: 210px;
            min-height: 40px;
            margin: 0;
            padding: 0;
            border: 1px solid #dddddd;
            border-radius: 4px;
        }

        #sortable-listA, #sortable-listC {
            float: left;
        }

        #sortable-listB, #sortable-listD {
            float: right;
        }

        .list-item {
            list-style-type: none;
            width: 200px;
            margin: 5px;
            line-height: 30px;
            text-align: center;
            background-color: #222222;
            color: #ffffff;
            border-radius: 3px;
            cursor: url('../content/web/sortable/grab.cur'), default;
        }

        #sortable-listA .list-item {
            background-color: #54b8fa;
            color: #000000;
        }

        #sortable-listB .list-item {
            background-color: #ff879e;
            color: #000000;
        }

        #sortable-listC .list-item {
            background-color: #66cc66;
            color: #000000;
        }

        #sortable-listD .list-item {
            background-color: #ffcc33;
            color: #000000;
        }

        #placeholder.list-item {
            background-color: #ffffff;
            color: #777;
        }
    </style>
<?php require_once '../include/footer.php'; ?>
