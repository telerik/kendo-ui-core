<?php

require_once __DIR__.'/../lib/kendo/Autoload.php';

class SerializableObjectTestDouble extends kendo\SerializableObject {

    public function setFoo($foo) {
        $this->setProperty('foo', $foo);
    }

}

?>
