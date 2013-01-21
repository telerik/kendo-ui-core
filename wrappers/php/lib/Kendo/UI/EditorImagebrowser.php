<?php

namespace Kendo\UI;

class EditorImagebrowser extends \Kendo\SerializableObject {
//>> Properties

    public function setFileTypes($value) {
        $this->setProperty('fileTypes', $value);

        return $this;
    }

    public function setPath($value) {
        $this->setProperty('path', $value);

        return $this;
    }

    public function setTransport(\Kendo\UI\EditorImagebrowserTransport $value) {
        $this->setProperty('transport', $value);

        return $this;
    }

    public function setSchema(\Kendo\UI\EditorImagebrowserSchema $value) {
        $this->setProperty('schema', $value);

        return $this;
    }

    public function setMessages(\Kendo\UI\EditorImagebrowserMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

//<< Properties
}

?>
