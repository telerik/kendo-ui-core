
package com.kendoui.taglib.map;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.MapTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ControlsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MapTag parent = (MapTag)findParentWithClass(MapTag.class);


        parent.setControls(this);

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
        return "map-controls";
    }

    public void setNavigator(com.kendoui.taglib.map.ControlsNavigatorTag value) {
        setProperty("navigator", value);
    }

    public void setZoom(com.kendoui.taglib.map.ControlsZoomTag value) {
        setProperty("zoom", value);
    }

    public boolean getNavigator() {
        return (boolean)getProperty("navigator");
    }

    public void setNavigator(boolean value) {
        setProperty("navigator", value);
    }

    public boolean getZoom() {
        return (boolean)getProperty("zoom");
    }

    public void setZoom(boolean value) {
        setProperty("zoom", value);
    }

//<< Attributes

}
