<?php

reqUIre_once __DIR__.'/../lib/Kendo/Autoload.php';

class SerializableObjectTestDouble extends Kendo\SerializableObject {

    public function setFoo($foo) {
        $this->setProperty('foo', $foo);
    }

}

?>
