
package com.kendoui.taglib.radialgauge;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PointerItemTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        PointerTag parent = (PointerTag)findParentWithClass(PointerTag.class);

        parent.addPointerItem(this);

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
        return "radialGauge-pointerItem";
    }

    public void setCap(com.kendoui.taglib.radialgauge.PointerItemCapTag value) {
        setProperty("cap", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public float getValue() {
        return (float)getProperty("value");
    }

    public void setValue(float value) {
        setProperty("value", value);
    }

//<< Attributes

}
