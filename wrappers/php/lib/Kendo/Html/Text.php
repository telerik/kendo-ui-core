<?php

namespace Kendo\Html;

class Text implements Node {
    private $value;

    function __construct($value) {
        $this->value = $value;
    }

    public function render() {
        return $this->value;
    }
}

?>
