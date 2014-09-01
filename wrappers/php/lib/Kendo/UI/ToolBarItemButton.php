<?php

namespace Kendo\UI;

class ToolBarItemButton extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the HTML attributes of a ButtonGroup's button.
    * @param  $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function attributes($value) {
        return $this->setProperty('attributes', $value);
    }

    /**
    * Sets the click option of the ToolBarItemButton.
    * Specifies the click event handler of the button. Applicable only for the children of a ButtonGroup.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function click($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('click', $value);
    }

    /**
    * Specifies whether the button is initially enabled or disabled.
    * @param boolean $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function enable($value) {
        return $this->setProperty('enable', $value);
    }

    /**
    * Assigns the button to a group. Applicable only for the children of a ButtonGroup that has togglable true.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function group($value) {
        return $this->setProperty('group', $value);
    }

    /**
    * Sets icon for the menu button. The icon should be one of the existing in the Kendo UI theme sprite.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function icon($value) {
        return $this->setProperty('icon', $value);
    }

    /**
    * Specifies the ID of the button.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function id($value) {
        return $this->setProperty('id', $value);
    }

    /**
    * If set, the ToolBar will render an image with the specified URL in the button.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Specifies if the toggle button is initially selected. Applicable only for the children of a ButtonGroup that has togglable true.
    * @param boolean $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    /**
    * Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    /**
    * Sets the toggle option of the ToolBarItemButton.
    * Specifies the toggle event handler of the button. Applicable only for the children of a ButtonGroup.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function toggle($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('toggle', $value);
    }

    /**
    * Specifies if the button is togglable, e.g. has a selected and unselected state. Applicable only for the children of a ButtonGroup.
    * @param boolean $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function togglable($value) {
        return $this->setProperty('togglable', $value);
    }

    /**
    * Specifies the text of the menu button.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Specifies the url of the button to navigate to.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function url($value) {
        return $this->setProperty('url', $value);
    }

    /**
    * Specifies where the text of the menu button will be displayed. Applicable only for the buttons of a ButtonGroup.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function showText($value) {
        return $this->setProperty('showText', $value);
    }

    /**
    * Specifies where the icon of the button will be displayed. Applicable only for the children of a ButtonGroup.
    * @param string $value
    * @return \Kendo\UI\ToolBarItemButton
    */
    public function showIcon($value) {
        return $this->setProperty('showIcon', $value);
    }

//<< Properties
}

?>
