<?php

namespace kendo\ui;

class EditorImagebrowser extends \kendo\SerializableObject {
//>> Properties

    public function setFileTypes($value) {
        $this->setProperty('fileTypes', $value);

        return $this;
    }

    public function setPath($value) {
        $this->setProperty('path', $value);

        return $this;
    }

    public function setTransport(\kendo\ui\EditorImagebrowserTransport $value) {
        $this->setProperty('transport', $value);

        return $this;
    }

    public function setSchema(\kendo\ui\EditorImagebrowserSchema $value) {
        $this->setProperty('schema', $value);

        return $this;
    }

    public function setMessages(\kendo\ui\EditorImagebrowserMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

//<< Properties
}

?>
