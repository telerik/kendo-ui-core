<?php

namespace Kendo\Dataviz\UI;

class SparklineSeriesItemLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the alignment of the labels.** Available for pie series. **
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

    /**
    * The background color of the labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the labels.
    * @param \Kendo\Dataviz\UI\SparklineSeriesItemLabelsBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The distance of the labels.** Available for pie series. **
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function distance($value) {
        return $this->setProperty('distance', $value);
    }

    /**
    * The font style of the labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the labels.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the labels.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Defines the position of the labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * Sets the template option of the SparklineSeriesItemLabels.
    * The template which renders the chart series label.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the SparklineSeriesItemLabels.
    * The template which renders the chart series label.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The visibility of the labels.
    * @param boolean|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\SparklineSeriesItemLabels
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
