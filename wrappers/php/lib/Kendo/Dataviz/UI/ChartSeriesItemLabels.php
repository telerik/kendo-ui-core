<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the alignment of the labels.** Available for donut and pie series. **
    * @param string $value
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

    /**
    * The background color of the labels.
    * @param string $value
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemLabelsBorder $value
    */
    public function border(\Kendo\Dataviz\UI\ChartSeriesItemLabelsBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The distance of the labels.** Available for donut and pie series. **
    * @param float $value
    */
    public function distance($value) {
        return $this->setProperty('distance', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels.
    * @param string $value
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels.
    * @param float|Object $value
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the labels.
    * @param float|Object $value
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Defines the position of the labels.
    * @param string $value
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The label template. Template variables:
    * @param string|\kendo\JavaScriptFunction $value
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The visibility of the labels.
    * @param boolean $value
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
