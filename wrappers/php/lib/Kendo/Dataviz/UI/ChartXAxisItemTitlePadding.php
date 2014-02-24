<?php

namespace Kendo\Dataviz\UI;

class ChartXAxisItemTitlePadding extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The bottom padding of the title.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemTitlePadding
    */
    public function bottom($value) {
        return $this->setProperty('bottom', $value);
    }

    /**
    * The left padding of the title.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemTitlePadding
    */
    public function left($value) {
        return $this->setProperty('left', $value);
    }

    /**
    * The right padding of the title.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemTitlePadding
    */
    public function right($value) {
        return $this->setProperty('right', $value);
    }

    /**
    * The top padding of the title.
    * @param float $value
    * @return \Kendo\Dataviz\UI\ChartXAxisItemTitlePadding
    */
    public function top($value) {
        return $this->setProperty('top', $value);
    }

//<< Properties
}

?>
