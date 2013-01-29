<?php

class SerializableObjectTestDouble extends \Kendo\SerializableObject {
    protected $ignore = array('bar');

    public function addFoo($foo) {
        return $this->add('foo', func_get_args());
    }

    public function setFoo($foo) {
        $this->setProperty('foo', $foo);
    }

    public function setBar($bar) {
        $this->setProperty('bar', $bar);
    }
}

?>
