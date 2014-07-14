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

    /**
    * The font family of the shape content text.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function fontFamily($value) {
        return $this->setProperty('fontFamily', $value);
    }

    /**
    * The font size of the shape content text.
    * @param float $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function fontSize($value) {
        return $this->setProperty('fontSize', $value);
    }

    /**
    * The color of the shape content text.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function color($value) {
        return $this->setProperty('color', $value);
    }

//<< Properties
}

?>
