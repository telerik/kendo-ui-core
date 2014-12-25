<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionContent extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the template option of the DiagramConnectionContent.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\DiagramConnectionContent
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the DiagramConnectionContent.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\DiagramConnectionContent
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The text displayed for the connection.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionContent
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
