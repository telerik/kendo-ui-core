<?php

namespace Kendo\Dataviz\UI;

class DiagramEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the shape resizing.
    * @param boolean|\Kendo\Dataviz\UI\DiagramEditableResize|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditable
    */
    public function resize($value) {
        return $this->setProperty('resize', $value);
    }

    /**
    * Specifyes the rotate style.
    * @param boolean|\Kendo\Dataviz\UI\DiagramEditableRotate|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditable
    */
    public function rotate($value) {
        return $this->setProperty('rotate', $value);
    }

    /**
    * Specifyes the select style.
    * @param boolean|\Kendo\Dataviz\UI\DiagramEditableSelect|array $value
    * @return \Kendo\Dataviz\UI\DiagramEditable
    */
    public function select($value) {
        return $this->setProperty('select', $value);
    }

//<< Properties
}

?>
