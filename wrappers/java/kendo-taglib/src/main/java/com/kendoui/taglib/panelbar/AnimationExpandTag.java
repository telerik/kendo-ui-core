
package com.kendoui.taglib.panelbar;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationExpandTag extends  BaseTag  /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        AnimationTag parent = (AnimationTag)findParentWithClass(AnimationTag.class);


        parent.setExpand(this);

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

    public static String tagName() {
        return "panelBar-animation-expand";
    }

    public float getDuration() {
        return (float)getProperty("duration");
    }

    public void setDuration(float value) {
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
