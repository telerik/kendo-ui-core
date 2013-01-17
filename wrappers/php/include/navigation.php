<?php

    function read_navigation($filename) {
        $navigation = json_decode(file_get_contents($filename), true);

        unset($navigation['Framework']);

        unset($navigation['Sample Dashboards']);

        return $navigation;
    }

    function example_url($example) {
        return str_replace('html', 'php', $example['url']);
    }

    function example_exists($example) {
        return file_exists(example_url($example));
    }

    function include_in_navigation($item) {
        if (!array_key_exists('packages', $item)) {
            return true;
        }

        $packages = $item['packages'];

        $invert = false;
        $match = false;

        foreach ($packages as $packageName) {
            $name = $packageName;

            if ($name[0] == '!') {
                $invert = true;
                $name = substr($name, 1);
            }

            if ($name == 'php') {
                $match = true;
            }
        }

        $result = (!$invert && $match) || ($invert && !$match);


        return $result;
    }

    $categories = read_navigation($jsonFilename);

    foreach($categories as $category => $subcategory) {
?>
        <h1><?= $category ?></h1>
        <ul>
<?php
            foreach($subcategory as $widget) {
                if (include_in_navigation($widget)) {
?>
            <li>
                <h2><?= $widget['text'] ?></h2>
                <ul>
<?php
                    foreach($widget['items'] as $example) {
                        if (include_in_navigation($example) && example_exists($example)) {
?>
                    <li><a href="<?= example_url($example) ?>"><?= $example['text'] ?></a></li>
<?php
                        }
                    }
?>
                </ul>
            </li>
<?php
                }
            }
?>
        </ul>
<?php
    }
?>
