
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.MapTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MarkerDefaultsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MapTag parent = (MapTag)findParentWithClass(MapTag.class);


        parent.setMarkerDefaults(this);

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
        return "map-markerDefaults";
    }

    public java.lang.String getColor() {
        return (java.lang.String)getProperty("color");
    }

    public void setColor(java.lang.String value) {
        setProperty("color", value);
    }

    public java.lang.String getShape() {
        return (java.lang.String)getProperty("shape");
    }

    public void setShape(java.lang.String value) {
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
