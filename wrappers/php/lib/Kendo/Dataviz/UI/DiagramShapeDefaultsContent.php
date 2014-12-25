<?php

namespace Kendo\Dataviz\UI;

class DiagramShapeDefaultsContent extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The alignment of the text inside the shape.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function align($value) {
        return $this->setProperty('align', $value);
    }

    /**
    * The color of the shape content text.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function color($value) {
        return $this->setProperty('color', $value);
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
    * Sets the template option of the DiagramShapeDefaultsContent.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the DiagramShapeDefaultsContent.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The text displayed in the shape.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramShapeDefaultsContent
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
