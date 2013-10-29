
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MarkerTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag

        MarkersTag parent = (MarkersTag)findParentWithClass(MarkersTag.class);

        parent.addMarker(this);

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
        return "map-marker";
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.Object getPosition() {
        return (java.lang.Object)getProperty("position");
    }

    public void setPosition(java.lang.Object value) {
        setProperty("position", value);
    }

    public java.lang.Object getShape() {
        return (java.lang.Object)getProperty("shape");
    }

    public void setShape(java.lang.Object value) {
        setProperty("shape", value);
    }

    public float getSize() {
        return (float)getProperty("size");
    }

    public void setSize(float value) {
        setProperty("size", value);
    }

//<< Attributes

}
