<?php

namespace Kendo\Dataviz\UI;

class StockChartNavigatorHint extends \kendo\SerializableObject {
//>> Properties

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

    public function setFormat($value) {
        $this->setProperty('format', $value);

        return $this;
    }

//<< Properties
}

?>
