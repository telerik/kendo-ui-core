<?php

namespace Kendo\UI;

class TreeListEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The editing mode to use. The supported editing modes are "inline" and "popup".
    * @param string $value
    * @return \Kendo\UI\TreeListEditable
    */
    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

    /**
    * Sets the template option of the TreeListEditable.
    * The template which renders popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\TreeListEditable
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the TreeListEditable.
    * The template which renders popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The template content.
    * @return \Kendo\UI\TreeListEditable
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Configures the Kendo UI Window instance, which is used when the TreeLsit edit mode is "popup". The configuration is optional.For more information, please refer to the Window configuration API.
    * @param  $value
    * @return \Kendo\UI\TreeListEditable
    */
    public function window($value) {
        return $this->setProperty('window', $value);
    }

//<< Properties
}

?>
