<?php

namespace Kendo;

class JavaScriptFunction {
    private $name;

    function __construct($name) {
        $this->name = $name;
    }

    public function name() {
        return $this->name;
    }
}
?>
