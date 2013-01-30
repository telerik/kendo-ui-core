
package com.kendoui.taglib;



import com.kendoui.taglib.colorpalette.ChangeFunctionTag;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColorPaletteTag extends WidgetTag /* interfaces *//* interfaces */ {

    public ColorPaletteTag() {
        super("ColorPalette");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "colorPalette";
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public float getColumns() {
        return (float)getProperty("columns");
    }

    public void setColumns(float value) {
        setProperty("columns", value);
    }

    public Object getPalette() {
        return (Object)getProperty("palette");
    }

    public void setPalette(Object value) {
        setProperty("palette", value);
    }

    public float getTileSize() {
        return (float)getProperty("tileSize");
    }

    public void setTileSize(float value) {
        setProperty("tileSize", value);
    }

    public String getChange() {
        Function property = ((Function)getProperty("change"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

//<< Attributes

}
