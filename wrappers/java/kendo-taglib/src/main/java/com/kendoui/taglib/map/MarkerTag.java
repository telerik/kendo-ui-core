
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

    public void setTooltip(com.kendoui.taglib.map.MarkerTooltipTag value) {
        setProperty("tooltip", value);
    }

    public java.lang.Object getLocation() {
        return (java.lang.Object)getProperty("location");
    }

    public void setLocation(java.lang.Object value) {
        setProperty("location", value);
    }

    public java.lang.String getShape() {
        return (java.lang.String)getProperty("shape");
    }

    public void setShape(java.lang.String value) {
        setProperty("shape", value);
    }

//<< Attributes

}
