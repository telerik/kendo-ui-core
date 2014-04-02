<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeContent extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text displayed in the shape.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeContent
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The alignment of the text inside the shape.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeContent
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

//<< Properties
}

?>
