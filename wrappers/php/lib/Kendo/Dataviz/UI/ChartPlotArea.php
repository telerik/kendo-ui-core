<?php

namespace Kendo\Dataviz\UI;

class ChartPlotArea extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\ChartPlotAreaBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function margin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

//<< Properties
}

?>
