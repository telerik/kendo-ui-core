<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaultsContent extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The text displayed in the shape.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * The alignment of the text inside the shape.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

//<< Properties
}

?>
