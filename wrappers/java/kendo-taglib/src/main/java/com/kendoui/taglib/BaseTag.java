package com.kendoui.taglib;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.jsp.tagext.BodyTagSupport;

import com.kendoui.taglib.json.Serializable;

@SuppressWarnings("serial")
public abstract class BaseTag extends BodyTagSupport implements Serializable {

    private Map<String,Object> json;

    public BaseTag() {
        json = new HashMap<String,Object>();
    }

    public void setProperty(String key, Object value) {
        json.put(key, value);
    }

    @Override
    public Map<String,Object> properties() {
        return json;
    }
}
