
package com.kendoui.taglib.diagram;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ShapeContentTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ShapeTag parent = (ShapeTag)findParentWithClass(ShapeTag.class);


        parent.setContent(this);

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
        return "diagram-shape-content";
    }

    public java.lang.String getAlign() {
        return (java.lang.String)getProperty("align");
    }

    public void setAlign(java.lang.String value) {
        setProperty("align", value);
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getFontFamily() {
        return (java.lang.String)getProperty("fontFamily");
    }

    public void setFontFamily(java.lang.String value) {
        setProperty("fontFamily", value);
    }

    public float getFontSize() {
        return (float)getProperty("fontSize");
    }

    public void setFontSize(float value) {
        setProperty("fontSize", value);
    }

    public java.lang.String getText() {
        return (java.lang.String)getProperty("text");
    }

    public void setText(java.lang.String value) {
        setProperty("text", value);
    }

//<< Attributes

}
