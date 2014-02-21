<?php

namespace Kendo\UI;

class GridEditable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * If set to true the grid will display a confirmation dialog when the user clicks the "destroy" command button.Can be set to a string which will be used as the confirmation text.Can be set to a function which will be called, passing the model instance, to return the confirmation text.
    * @param boolean|string|\Kendo\JavaScriptFunction $value
    * @return \Kendo\UI\GridEditable
    */
    public function confirmation($value) {
        return $this->setProperty('confirmation', $value);
    }

    /**
    * If confirmation is enabled the grid will display a confirmation dialog when the user clicks the "destroy" command button.
If the grid is in mobile mode this text will be used for the cancel button.
    * @param string $value
    * @return \Kendo\UI\GridEditable
    */
    public function cancelDelete($value) {
        return $this->setProperty('cancelDelete', $value);
    }

    /**
    * If confirmation is enabled the grid will display a confirmation dialog when the user clicks the "destroy" command button.
If the grid is in mobile mode this text will be used for the confirm button.
    * @param string $value
    * @return \Kendo\UI\GridEditable
    */
    public function confirmDelete($value) {
        return $this->setProperty('confirmDelete', $value);
    }

    /**
    * The position at which new data items are inserted in the grid. Must be set to either "top" or "bottom". By default new data items are inserted at the top.
    * @param string $value
    * @return \Kendo\UI\GridEditable
    */
    public function createAt($value) {
        return $this->setProperty('createAt', $value);
    }

    /**
    * If set to true the user can delete data items from the grid by clicking the "destroy" command button. Deleting is enabled by default.
    * @param boolean $value
    * @return \Kendo\UI\GridEditable
    */
    public function destroy($value) {
        return $this->setProperty('destroy', $value);
    }

    /**
    * The editing mode to use. The supported editing modes are "incell", "inline" and "popup".
    * @param string $value
    * @return \Kendo\UI\GridEditable
    */
    public function mode($value) {
        return $this->setProperty('mode', $value);
    }

    /**
    * Sets the template option of the GridEditable.
    * The template which renders popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\GridEditable
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the GridEditable.
    * The template which renders popup editor.The template should contain elements whose name HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use MVVM bindings in order to bind HTML elements to data item fields.
    * @param string $value The template content.
    * @return \Kendo\UI\GridEditable
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * If set to true the user can edit data items when editing is enabled.
    * @param boolean $value
    * @return \Kendo\UI\GridEditable
    */
    public function update($value) {
        return $this->setProperty('update', $value);
    }

    /**
    * Configures the Kendo UI Window instance, which is used when the Grid edit mode is "popup". The configuration is optional.For more information, please refer to the Window configuration API.
    * @param  $value
    * @return \Kendo\UI\GridEditable
    */
    public function window($value) {
        return $this->setProperty('window', $value);
    }

//<< Properties
}

?>
