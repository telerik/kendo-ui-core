<?php

namespace Kendo\UI;

class MenuItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the text displayed by the item
    * @param string $value
    * @returns \Kendo\UI\MenuItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Specifies the URL of the image displayed by the item
    * @param string $value
    * @returns \Kendo\UI\MenuItem
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Specifies the class name for the sprite image displayed by the item
    * @param string $value
    * @returns \Kendo\UI\MenuItem
    */
    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    /**
    * Specifies whether the item is initially enabled
    * @param boolean $value
    * @returns \Kendo\UI\MenuItem
    */
    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    /**
    * Specifies whether the item is initially selected
    * @param boolean $value
    * @returns \Kendo\UI\MenuItem
    */
    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    /**
    * Sets the HTML content of the MenuItem.
    * @param string $value
    * @returns \Kendo\UI\MenuItems    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Starts output bufferring. Any following markup will be set as the content of the MenuItem.
    */
    public function startContent() {
        ob_start();
    }

    /**
    * Stops output bufferring and sets the preceding markup as the content of the MenuItem.
    */
    public function endContent() {
        $this->content(ob_get_clean());
    }
    /**
    * Adds \Kendo\UI\MenuItem.
    * @param \Kendo\UI\MenuItem $value
    * @returns \Kendo\UI\Menu    */
    public function addItem(\Kendo\UI\MenuItem $value) {
        return $this->add('items', $value);
    }
//<< Properties
}

?>
