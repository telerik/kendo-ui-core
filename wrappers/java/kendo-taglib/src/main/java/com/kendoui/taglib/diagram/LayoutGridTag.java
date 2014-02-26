
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class LayoutGridTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        LayoutTag parent = (LayoutTag)findParentWithClass(LayoutTag.class);


        parent.setGrid(this);

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
        return "diagram-layout-grid";
    }

    public float getComponentSpacingX() {
        return (float)getProperty("componentSpacingX");
    }

    public void setComponentSpacingX(float value) {
        setProperty("componentSpacingX", value);
    }

    public float getComponentSpacingY() {
        return (float)getProperty("componentSpacingY");
    }

    public void setComponentSpacingY(float value) {
        setProperty("componentSpacingY", value);
    }

    public float getOffsetX() {
        return (float)getProperty("offsetX");
    }

    public void setOffsetX(float value) {
        setProperty("offsetX", value);
    }

    public float getOffsetY() {
        return (float)getProperty("offsetY");
    }

    public void setOffsetY(float value) {
        setProperty("offsetY", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
