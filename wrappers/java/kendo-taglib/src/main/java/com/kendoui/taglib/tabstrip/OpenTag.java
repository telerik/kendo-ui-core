
package com.kendoui.taglib.tabstrip;

import com.kendoui.taglib.BaseTag;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class OpenTag extends BaseTag /* interfaces *//* interfaces */ {

    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        Open parent = (Open)findParentWithClass(Open.class);

        parent.setOpen(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public int getDuration() {
        return (int)getProperty("duration");
    }

    public void setDuration(int value) {
        setProperty("duration", value);
    }

    public String getEffects() {
        return (String)getProperty("effects");
    }

    public void setEffects(String value) {
        setProperty("effects", value);
    }

    public boolean getShow() {
        return (boolean)getProperty("show");
    }

    public void setShow(boolean value) {
        setProperty("show", value);
    }

//<< Attributes

}
