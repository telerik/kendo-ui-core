package com.kendoui.taglib;

import com.kendoui.taglib.html.Div;
import com.kendoui.taglib.html.Element;

@SuppressWarnings("serial")
public class BaseTagTestDouble extends BaseTag {

    public BaseTagTestDouble() {
        super("Foo");
    }

    public Object getFoo() {
        return this.json.get("foo");
    }

    public void setFoo(String foo) {
        this.json.put("foo", foo);
    }

    @Override
    protected Element<?> createElement() {
        return new Div();
    }

}
