<?php

namespace Kendo\UI;

class TreeViewItem extends \Kendo\SerializableObject {
//>> Properties

    public function text($value) {
        return $this->setProperty('text', $value);
    }

    public function imageUrl($value) {
        return $this->setProperty('imageUrl', $value);
    }

    public function spriteCssClass($value) {
        return $this->setProperty('spriteCssClass', $value);
    }

    public function enabled($value) {
        return $this->setProperty('enabled', $value);
    }

    public function selected($value) {
        return $this->setProperty('selected', $value);
    }

    public function expanded($value) {
        return $this->setProperty('expanded', $value);
    }

    public function content($value) {
        return $this->setProperty('content', $value);
    }

    public function startContent() {
        ob_start();
    }

    public function endContent() {
        $this->content(ob_get_clean());
    }
    public function addItem(\Kendo\UI\TreeViewItem $item) {
        return $this->add('items', $item);
    }
//<< Properties
}

?>
