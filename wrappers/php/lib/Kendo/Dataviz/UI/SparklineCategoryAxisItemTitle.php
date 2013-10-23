<?php

namespace Kendo\Dataviz\UI;

class SparklineCategoryAxisItemTitle extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the title. Any valid CSS color string will work here, including
hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the title.
    * @param \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitleBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The text color of the title. Any valid CSS color string will work here, including hex and rgb.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

    /**
    * The font style of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function font($value) {
        return $this->setProperty('font', $value);
    }

    /**
    * The margin of the title.
    * @param float| $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function margin($value) {
        return $this->setProperty('margin', $value);
    }

    /**
    * The position of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * The rotation angle of the title.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function rotation($value) {
        return $this->setProperty('rotation', $value);
    }

    /**
    * The text of the title.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The visibility of the title.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineCategoryAxisItemTitle
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
