<?php

namespace Kendo\Dataviz\UI;

class ChartChartAreaBorder extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function dashType($value) {
        return $this->setProperty('dashType', $value);
    }

    public function width($value) {
        return $this->setProperty('width', $value);
    }

//<< Properties
}

?>
