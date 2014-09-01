<?php

namespace Kendo\UI;

class ToolBarItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the HTML attributes of a ToolBar button.
    * @param  $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function attributes($value) {
        return $this->setProperty('attributes', $value);
    }

    /**
    * Adds ToolBarItemButton to the ToolBarItem.
    * @param \Kendo\UI\ToolBarItemButton|array,... $value one or more ToolBarItemButton to add.
    * @return \Kendo\UI\ToolBarItem
    */
    public function addButton($value) {
        return $this->add('buttons', func_get_args());
    }

    /**
    * Sets the click option of the ToolBarItem.
    * Specifies the click event handler of the button. Applicable only for commands of type button and splitButton.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBarItem
    */
    public function click($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('click', $value);
    }

    /**
    * Specifies whether the control is initially enabled or disabled. Default value is "true".
    * @param boolean $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Assigns the button to a group. Applicable only for buttons with togglable: true.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function group($value) {
        return $this->setProperty('group', $value);
    }

    /**
    * Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * Specifies the ID of the button.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    /**
    * If set, the ToolBar will render an image with the specified URL in the button.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Adds ToolBarItemMenuButton to the ToolBarItem.
    * @param \Kendo\UI\ToolBarItemMenuButton|array,... $value one or more ToolBarItemMenuButton to add.
    * @return \Kendo\UI\ToolBarItem
    */
    public function addMenuButton($value) {
        return $this->add('menuButtons', func_get_args());
    }

    /**
    * Sets the overflowTemplate option of the ToolBarItem.
    * Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\ToolBarItem
    */
    public function overflowTemplateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('overflowTemplate', $value);
    }

    /**
    * Sets the overflowTemplate option of the ToolBarItem.
    * Specifies what element will be added in the command overflow popup. Applicable only for items that have a template.
    * @param string $value The template content.
    * @return \Kendo\UI\ToolBarItem
    */
    public function overflowTemplate($value) {
        return $this->setProperty('overflowTemplate', $value);
    }

    /**
    * Specifies whether the button is primary. Primary buttons receive different styling.
    * @param boolean $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function primary($value) {
        return $this->setProperty('primary', $value);
    }

    /**
    * Specifies if the toggle button is initially selected. Applicable only for buttons with togglable: true.
    * @param boolean $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    /**
    * Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    /**
    * Sets the template option of the ToolBarItem.
    * Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.
    * @param string $value The id of the element which represents the kendo template.
    * @return \Kendo\UI\ToolBarItem
    */
    public function templateId($value) {
        $value = new \Kendo\Template($value);

        return $this->setProperty('template', $value);
    }

    /**
    * Sets the template option of the ToolBarItem.
    * Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.
    * @param string $value The template content.
    * @return \Kendo\UI\ToolBarItem
    */
    public function template($value) {
        return $this->setProperty('template', $value);
    }

    /**
    * Sets the text of the button.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Specifies if the button is togglable, e.g. has a selected and unselected state.
    * @param boolean $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function togglable($value) {
        return $this->setProperty('togglable', $value);
    }

    /**
    * Sets the toggle option of the ToolBarItem.
    * Specifies the toggle event handler of the button. Applicable only for commands of type button and togglable: true.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBarItem
    */
    public function toggle($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('toggle', $value);
    }

    /**
    * Specifies the url to navigate to.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

    /**
    * Specifies the type of the item.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function type($value) {
        return $this->setProperty('type', $value);
    }

    /**
    * Specifies where the text will be displayed.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function showText($value) {
        return $this->setProperty('showText', $value);
    }

    /**
    * Specifies where the icon will be displayed.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function showIcon($value) {
        return $this->setProperty('showIcon', $value);
    }

    /**
    * Specifies how the button behaves when the ToolBar is resized.
    * @param string $value
    * @return \Kendo\UI\ToolBarItem
    */
    public function overflow($value) {
        return $this->setProperty('overflow', $value);
    }

//<< Properties
}

?>
