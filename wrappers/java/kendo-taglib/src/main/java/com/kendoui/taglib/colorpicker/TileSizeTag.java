
package com.kendoui.taglib.colorpicker;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.ColorPickerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class TileSizeTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ColorPickerTag parent = (ColorPickerTag)findParentWithClass(ColorPickerTag.class);


        parent.setTileSize(this);

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
        return "colorPicker-tileSize";
    }

    public float getHeight() {
        return (float)getProperty("height");
    }

    public void setHeight(float value) {
        setProperty("height", value);
    }

    public float getWidth() {
        return (float)getProperty("width");
    }

    public void setWidth(float value) {
        setProperty("width", value);
    }

//<< Attributes

}
