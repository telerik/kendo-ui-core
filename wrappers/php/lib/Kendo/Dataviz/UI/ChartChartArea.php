<?php

namespace Kendo\Dataviz\UI;

class ChartChartArea extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\ChartChartAreaBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function height($value) {
        $this->setProperty('height', $value);

        return $this;
    }

    public function margin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function width($value) {
        $this->setProperty('width', $value);

        return $this;
    }

//<< Properties
}

?>
