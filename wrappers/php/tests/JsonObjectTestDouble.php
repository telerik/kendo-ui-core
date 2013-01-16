<?php

require_once 'lib/kendo/Autoload.php';

class JsonObjectTestDouble extends kendo\JsonObject {

    public function setFoo($foo) {
        $this->setProperty('foo', $foo);
    }

}

?>
