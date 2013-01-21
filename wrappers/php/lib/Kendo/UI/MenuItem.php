<?php

namespace Kendo\UI;

class MenuItem extends \Kendo\SerializableObject {
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

//<< Properties
}

?>
