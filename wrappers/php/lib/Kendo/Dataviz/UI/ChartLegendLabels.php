<?php

namespace Kendo\Dataviz\UI;

class ChartLegendLabels extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text color of the labels. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the labels.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The margin of the labels. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartLegendLabelsMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the labels. A numeric value will set all paddings.
    * @param float|\Kendo\Dataviz\UI\ChartLegendLabelsPadding|array $value
    * @return \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * Sets the template option of the ChartLegendLabels.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ChartLegendLabels.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\ChartLegendLabels
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
