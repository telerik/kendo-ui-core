<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemLine extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function dashType($value) {
        $this->setProperty('dashType', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function width($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
