<?php

namespace Kendo\Dataviz\UI;

class StockChartLegendLabels extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function font($value) {
        $this->setProperty('font', $value);

        return $this;
    }

    public function template($value) {
        $this->setProperty('template', $value);

        return $this;
    }

//<< Properties
}

?>
