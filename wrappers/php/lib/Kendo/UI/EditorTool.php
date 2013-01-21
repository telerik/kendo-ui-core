<?php

namespace Kendo\UI;

class EditorTool extends \Kendo\SerializableObject {
//>> Properties

    public function name($value) {
        $this->setProperty('name', $value);

        return $this;
    }

    public function tooltip($value) {
        $this->setProperty('tooltip', $value);

        return $this;
    }

    public function exec($value) {
        $this->setProperty('exec', new \Kendo\JavaScriptFunction($value));

        return $this;
    }

//<< Properties
}

?>
