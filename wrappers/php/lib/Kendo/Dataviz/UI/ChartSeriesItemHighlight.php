<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemHighlight extends \Kendo\SerializableObject {
//>> Properties

    public function setBorder(\Kendo\Dataviz\UI\ChartSeriesItemHighlightBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setLine(\Kendo\Dataviz\UI\ChartSeriesItemHighlightLine $value) {
        $this->setProperty('line', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

//<< Properties
}

?>
