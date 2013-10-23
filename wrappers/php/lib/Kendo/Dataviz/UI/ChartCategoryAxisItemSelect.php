<?php

namespace Kendo\Dataviz\UI;

class ChartCategoryAxisItemSelect extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The lower boundary of the selected range.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemSelect
    */
    public function from($value) {
        return $this->setProperty('from', $value);
    }

    /**
    * The maximum value which the user can select.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemSelect
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * The minimum value which the user can select.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemSelect
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The mouse wheel configuration of the selection.
    * @param \Kendo\Dataviz\UI\ChartCategoryAxisItemSelectMousewheel|array $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemSelect
    */
    public function mousewheel($value) {
        return $this->setProperty('mousewheel', $value);
    }

    /**
    * The upper boundary of the selected range.
    * @param  $value
    * @return \Kendo\Dataviz\UI\ChartCategoryAxisItemSelect
    */
    public function to($value) {
        return $this->setProperty('to', $value);
    }

//<< Properties
}

?>
