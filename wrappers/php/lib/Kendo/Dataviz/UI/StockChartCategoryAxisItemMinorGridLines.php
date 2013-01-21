<?php

namespace Kendo\Dataviz\UI;

class StockChartCategoryAxisItemMinorGridLines extends \Kendo\SerializableObject {
//>> Properties

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setDashType($value) {
        $this->setProperty('dashType', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function setWidth($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
