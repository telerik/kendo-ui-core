<?php

class SerializableObjectTestDouble extends \Kendo\SerializableObject {
    protected $ignore = array('bar');

    public function setFoo($foo) {
        $this->setProperty('foo', $foo);
    }

    public function setBar($bar) {
        $this->setProperty('bar', $bar);
    }
}

?>
