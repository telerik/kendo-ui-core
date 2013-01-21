<?php

namespace Kendo\UI;

class EditorImagebrowser extends \Kendo\SerializableObject {
//>> Properties

    public function fileTypes($value) {
        return $this->setProperty('fileTypes', $value);
    }

    public function path($value) {
        return $this->setProperty('path', $value);
    }

    public function transport(\Kendo\UI\EditorImagebrowserTransport $value) {
        return $this->setProperty('transport', $value);
    }

    public function schema(\Kendo\UI\EditorImagebrowserSchema $value) {
        return $this->setProperty('schema', $value);
    }

    public function messages(\Kendo\UI\EditorImagebrowserMessages $value) {
        return $this->setProperty('messages', $value);
    }

//<< Properties
}

?>
