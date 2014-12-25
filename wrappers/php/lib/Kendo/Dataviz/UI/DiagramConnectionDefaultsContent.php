<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaultsContent extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the template option of the DiagramConnectionDefaultsContent.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaultsContent
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the DiagramConnectionDefaultsContent.
    * The template which renders the labels.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaultsContent
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * The static text displayed on the connection.
    * @param string $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaultsContent
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

//<< Properties
}

?>
