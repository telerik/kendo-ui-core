<?php

namespace Kendo\Dataviz\UI;

class ChartLegendLabels extends \Kendo\SerializableObject {
//>> Properties

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setFont($value) {
        $this->setProperty('font', $value);

        return $this;
    }

    public function setTemplate($value) {
        $this->setProperty('template', $value);

        return $this;
    }

//<< Properties
}

?>
