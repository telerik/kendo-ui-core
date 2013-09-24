package com.kendoui.taglib.html;

public class GenericElement extends Element<GenericElement> {

    public GenericElement(String tagName) {
        this(tagName, false);
    }

    public GenericElement(String tagName, boolean selfClosing) {
        super(tagName, selfClosing);
    }

}
