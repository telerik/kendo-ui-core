<?php

spl_autoload_register(function($class) {
    if (strpos($class, 'kendo') == 0) {
        $path = str_replace('kendo', '', $class);

        $path = __DIR__.str_replace('\\', '/', $path).'.php';

        require_once $path;
    }
});

?>
