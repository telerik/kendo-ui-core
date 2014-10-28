<?php

namespace Kendo\Dataviz\UI;

class DiagramEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the shapeTemplate option of the DiagramEditable.
    * Specifies the shape editor template.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\DiagramEditable
    */
    public function shapeTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('shapeTemplate', $value);
    }

    /**
    * Sets the shapeTemplate option of the DiagramEditable.
    * Specifies the shape editor template.
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\DiagramEditable
    */
    public function shapeTemplate($value) {
        return $this->setProperty('shapeTemplate', $value);
    }

    /**
    * Sets the connectionTemplate option of the DiagramEditable.
    * Specifies the connection editor template.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\DiagramEditable
    */
    public function connectionTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('connectionTemplate', $value);
    }

    /**
    * Sets the connectionTemplate option of the DiagramEditable.
    * Specifies the connection editor template.
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\DiagramEditable
    */
    public function connectionTemplate($value) {
        return $this->setProperty('connectionTemplate', $value);
    }

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

//<< Properties
}

?>
