<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesItemLabelsFrom extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the from labels. Accepts a valid CSS color string, including hex and rgb.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the from labels.
    * @param \Kendo\Dataviz\UI\ChartSeriesItemLabelsFromBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the from labels. Accepts a valid CSS color string, including hex and rgb.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the from labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the from labels. Uses kendo.format.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the from labels. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartSeriesItemLabelsFromMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the from labels. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartSeriesItemLabelsFromPadding|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The position of the from labels.
    * @param string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemLabelsFrom.
    * The template which renders the chart series from label.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ChartSeriesItemLabelsFrom.
    * The template which renders the chart series from label.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * If set to true the chart will display the series from labels. By default chart series from labels are not displayed.
    * @param boolean|\Kendo\JavaScriptFunction $value
    * @return \Kendo\Dataviz\UI\ChartSeriesItemLabelsFrom
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
