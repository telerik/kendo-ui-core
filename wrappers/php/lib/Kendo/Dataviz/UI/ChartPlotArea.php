<?php

namespace Kendo\Dataviz\UI;

class ChartPlotArea extends \Kendo\SerializableObject {
//>> Properties

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setOpacity($value) {
        $this->setProperty('opacity', $value);

        return $this;
    }

    public function setBorder(\Kendo\Dataviz\UI\ChartPlotAreaBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setMargin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

//<< Properties
}

?>
