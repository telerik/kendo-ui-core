<?php

namespace Kendo\Dataviz\UI;

class ChartLegend extends \Kendo\SerializableObject {
//>> Properties

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setBorder(\Kendo\Dataviz\UI\ChartLegendBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setLabels(\Kendo\Dataviz\UI\ChartLegendLabels $value) {
        $this->setProperty('labels', $value);

        return $this;
    }

    public function setMargin($value) {
        $this->setProperty('margin', $value);

        return $this;
    }

    public function setOffsetX($value) {
        $this->setProperty('offsetX', $value);

        return $this;
    }

    public function setOffsetY($value) {
        $this->setProperty('offsetY', $value);

        return $this;
    }

    public function setPadding($value) {
        $this->setProperty('padding', $value);

        return $this;
    }

    public function setPosition($value) {
        $this->setProperty('position', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
