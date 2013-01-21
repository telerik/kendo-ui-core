<?php

namespace Kendo\UI;

class PanelBarItem extends \Kendo\SerializableObject {
//>> Properties

    public function text($value) {
        $this->setProperty('text', $value);

        return $this;
    }

    public function imageUrl($value) {
        $this->setProperty('imageUrl', $value);

        return $this;
    }

    public function spriteCssClass($value) {
        $this->setProperty('spriteCssClass', $value);

        return $this;
    }

    public function enabled($value) {
        $this->setProperty('enabled', $value);

        return $this;
    }

    public function selected($value) {
        $this->setProperty('selected', $value);

        return $this;
    }

    public function expanded($value) {
        $this->setProperty('expanded', $value);

        return $this;
    }

    public function contentUrl($value) {
        $this->setProperty('contentUrl', $value);

        return $this;
    }

//<< Properties
}

?>
