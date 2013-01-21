<?php

namespace Kendo\UI;

class EditorImagebrowser extends \Kendo\SerializableObject {
//>> Properties

    public function fileTypes($value) {
        $this->setProperty('fileTypes', $value);

        return $this;
    }

    public function path($value) {
        $this->setProperty('path', $value);

        return $this;
    }

    public function transport(\Kendo\UI\EditorImagebrowserTransport $value) {
        $this->setProperty('transport', $value);

        return $this;
    }

    public function schema(\Kendo\UI\EditorImagebrowserSchema $value) {
        $this->setProperty('schema', $value);

        return $this;
    }

    public function messages(\Kendo\UI\EditorImagebrowserMessages $value) {
        $this->setProperty('messages', $value);

        return $this;
    }

//<< Properties
}

?>
