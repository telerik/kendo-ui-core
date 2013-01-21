<?php

namespace Kendo\Dataviz\UI;

class StockChartValueAxisItemTitle extends \Kendo\SerializableObject {
//>> Properties

    public function setBackground($value) {
        $this->setProperty('background', $value);

        return $this;
    }

    public function setBorder(\Kendo\Dataviz\UI\StockChartValueAxisItemTitleBorder $value) {
        $this->setProperty('border', $value);

        return $this;
    }

    public function setColor($value) {
        $this->setProperty('color', $value);

        return $this;
    }

    public function setFont($value) {
        $this->setProperty('font', $value);

        return $this;
    }

    public function setMargin($value) {
        $this->setProperty('margin', $value);

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

    public function setRotation($value) {
        $this->setProperty('rotation', $value);

        return $this;
    }

    public function setText($value) {
        $this->setProperty('text', $value);

        return $this;
    }

    public function setVisible($value) {
        $this->setProperty('visible', $value);

        return $this;
    }

//<< Properties
}

?>
