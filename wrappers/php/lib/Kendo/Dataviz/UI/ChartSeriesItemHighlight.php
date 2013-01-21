<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder $value) {
        return $this->setProperty('border', $value);
    }

    public function color($value) {
        return $this->setProperty('color', $value);
    }

    public function line(\Kendo\Dataviz\UI\ChartSeriesItemHighlightLine $value) {
        return $this->setProperty('line', $value);
    }

    public function opacity($value) {
        return $this->setProperty('opacity', $value);
    }

//<< Properties
}

?>
