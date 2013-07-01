<?php

namespace Kendo;

class Template extends JavaScriptFunction {
    private $value;

    function __construct($value) {
        $this->value = $value;
    }

    public function value() {
        return "kendo.template($('\\#".$this->value."').html())";
    }
}
?>
