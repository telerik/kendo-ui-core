<?php

namespace Kendo\Dataviz\UI;

class ChartLegendLabels extends \Kendo\SerializableObject {
//>> Properties

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function font($value) {
        return $this->setProperty('font', $value);
    }

    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
