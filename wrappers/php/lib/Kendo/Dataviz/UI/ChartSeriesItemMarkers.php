<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemMarkers extends \Kendo\SerializableObject {
//>> Properties

    public function background($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function border(\Kendo\Dataviz\UI\ChartSeriesItemMarkersBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function size($value) {
        $this->setProperty('size', $value);

        return $this;
    }

    public function type($value) {
        $this->setProperty('type', $value);

        return $this;
    }

    public function visible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
