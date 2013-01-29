<?php

namespace Kendo;

class JavaScriptFunction {
    private $value;

    function __construct($value) {
        $this->value = $value;
    }

    public function value() {
        return $this->value;
    }
}
?>
