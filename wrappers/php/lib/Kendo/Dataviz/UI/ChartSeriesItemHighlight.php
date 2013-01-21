<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    public function border(\Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function color($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function line(\Kendo\Dataviz\UI\ChartSeriesItemHighlightLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function opacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

//<< Properties
}

?>
