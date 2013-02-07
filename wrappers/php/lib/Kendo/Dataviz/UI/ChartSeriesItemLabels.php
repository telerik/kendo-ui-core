<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the alignment of the labels.** Available for donut and pie series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

    /**
    * The background color of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemLabelsBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The distance of the labels.** Available for donut and pie series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function distance($value) {
        return $this->setProperty('distance', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the labels.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Defines the position of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemLabels.
    * The label template. Template variables:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemLabels.
    * The label template. Template variables:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The visibility of the labels.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabels
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
