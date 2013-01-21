<?php

namespace Kendo\UI;

class EditorTool extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        return $this->setProperty('name', $value);
    }

    public function tooltip($value) {
        return $this->setProperty('tooltip', $value);
    }

    public function exec($value) {
        return $this->setProperty('exec', new \Kendo\JavaScriptFunction($value));
    }

//<< Properties
}

?>
