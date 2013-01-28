<?php

namespace Kendo\Dataviz\UI;

class RadialGaugeScaleLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the labels.
Any valid CSS color string will work here, including hex and rgb
    * @param string $value
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\RadialGaugeScaleLabelsBorder $value
    */
    public function border(\Kendo\Dataviz\UI\RadialGaugeScaleLabelsBorder $value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels.
Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    */
    public function color($value) {
        return $this->setProperty('color', $value);
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
    * The labels positions.
    * @param string $value
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The label template.
Template variables:
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
