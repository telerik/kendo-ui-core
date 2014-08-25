<?php

namespace Kendo\Dataviz\UI;

class ChartTitle extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The alignment of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

    /**
    * The background color of the title. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the series.
    * @param \Kendo\Dataviz\UI\ChartTitleBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the title. Accepts a valid CSS color string, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The margin of the title. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartTitleMargin|array $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the title. A numeric value will set all margins.
    * @param float|\Kendo\Dataviz\UI\ChartTitlePadding|array $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function padding($value) {
        return $this->setProperty('padding', $value);
    }

    /**
    * The position of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The text of the chart title. You can also set the text directly for a title with default options.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * If set to true the chart will display the title. By default the title is not displayed.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
