<?php

namespace Kendo\Dataviz\UI;

class SparklineValueAxisItemNotesIcon extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The background color of the notes icon.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesIcon
    */
    public function background($value) {
        return $this->setProperty('background', $value);
    }

    /**
    * The border of the icon.
    * @param \Kendo\Dataviz\UI\SparklineValueAxisItemNotesIconBorder|array $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesIcon
    */
    public function border($value) {
        return $this->setProperty('border', $value);
    }

    /**
    * The size of the icon.
    * @param float $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesIcon
    */
    public function size($value) {
        return $this->setProperty('size', $value);
    }

    /**
    * The icon shape.The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
    * @param string $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesIcon
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * The icon visibility.
    * @param boolean $value
    * @return \Kendo\Dataviz\UI\SparklineValueAxisItemNotesIcon
    */
    public function visible($value) {
        return $this->setProperty('visible', $value);
    }

//<< Properties
}

?>
