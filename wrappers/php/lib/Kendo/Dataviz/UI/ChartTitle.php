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
    * The background color of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the title.
    * @param \Kendo\Dataviz\UI\ChartTitleBorder|array $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function border($value) {
        return $this->setProperty('border', $value);
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
    * The margin of the title.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The padding of the title.
    * @param float| $value
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
    * The title of the chart. You can also set the text directly for a title with default options.
    * @param string $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The visibility of the title.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\ChartTitle
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
