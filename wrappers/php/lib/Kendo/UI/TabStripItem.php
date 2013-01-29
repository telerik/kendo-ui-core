<?php

namespace Kendo\UI;

class TabStripItem extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the text displayed by the item
    * @param string $value
    * @returns \Kendo\UI\TabStripItem
    */
    public function text($value) {
        return $this->setProperty('text', $value);
    }

    /**
    * Specifies the URL of the image displayed by the item
    * @param string $value
    * @returns \Kendo\UI\TabStripItem
    */
    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    /**
    * Specifies the class name for the sprite image displayed by the item
    * @param string $value
    * @returns \Kendo\UI\TabStripItem
    */
    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    /**
    * Specifies whether the item is initially enabled
    * @param boolean $value
    * @returns \Kendo\UI\TabStripItem
    */
    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    /**
    * Specifies whether the item is initially selected
    * @param boolean $value
    * @returns \Kendo\UI\TabStripItem
    */
    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    /**
    * Specifies the url from which the item content will be loaded
    * @param string $value
    * @returns \Kendo\UI\TabStripItem
    */
    public function contentUrl($value) {
        return $this->setProperty('contentUrl', $value);
    }

    /**
    * Sets the HTML content of the TabStripItem.
    * @param string $value
    * @returns \Kendo\UI\TabStripItems    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Starts output bufferring. Any following markup will be set as the content of the TabStripItem.
    */
    public function startContent() {
        ob_start();
    }

    /**
    * Stops output bufferring and sets the preceding markup as the content of the TabStripItem.
    */
    public function endContent() {
        $this->content(ob_get_clean());
    }
//<< Properties
}

?>
