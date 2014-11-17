
package com.kendoui.taglib.radialgauge;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PointerItemCapTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PointerItemTag parent = (PointerItemTag)findParentWithClass(PointerItemTag.class);


        parent.setCap(this);

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
        return "radialGauge-pointerItem-cap";
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public float getSize() {
        return (float)getProperty("size");
    }

    public void setSize(float value) {
        setProperty("size", value);
    }

//<< Attributes

}
