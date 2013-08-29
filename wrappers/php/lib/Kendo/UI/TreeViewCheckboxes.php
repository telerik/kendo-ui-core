<?php

namespace Kendo\UI;

class TreeViewCheckboxes extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Sets the name attribute of the checkbox inputs. That name will be posted to the server.
    * @param string $value
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function name($value) {
        return $this->setProperty('name', $value);
    }

    /**
    * Indicates whether checkboxes of child items should get checked when the checkbox of a parent item is checked. This
also enables tri-state checkboxes with an indeterminate state.
    * @param boolean $value
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function checkChildren($value) {
        return $this->setProperty('checkChildren', $value);
    }

    /**
    * Sets the template option of the TreeViewCheckboxes.
    * The template which renders the checkboxes. Can be used to allow posting of
additional information along the treeview checkboxes.The fields which can be used in the template are:
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the TreeViewCheckboxes.
    * The template which renders the checkboxes. Can be used to allow posting of
additional information along the treeview checkboxes.The fields which can be used in the template are:
    * @param string $value The template content.
    * @return \Kendo\UI\TreeViewCheckboxes
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

//<< Properties
}

?>
