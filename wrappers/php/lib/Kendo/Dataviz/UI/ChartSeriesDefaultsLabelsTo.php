<?php

namespace Kendo\Dataviz\UI;

class ChartSeriesDefaultsLabelsTo extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the to labels. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the to labels.
    * @param \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsToBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the to labels. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the to labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The format of the to labels. Uses kendo.format.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * The margin of the to labels. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsToMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the to labels. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsToPadding|array $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Sets the template option of the ChartSeriesDefaultsLabelsTo.
    * The template which renders the chart series to label.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ChartSeriesDefaultsLabelsTo.
    * The template which renders the chart series to label.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * If set to true the chart will display the series to labels. By default chart series to labels are not displayed.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartSeriesDefaultsLabelsTo
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
