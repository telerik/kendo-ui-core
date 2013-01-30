
package com.kendoui.taglib;


import com.kendoui.taglib.colorpicker.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ColorPickerTag extends WidgetTag /* interfaces *//* interfaces */ {

    public ColorPickerTag() {
        super("ColorPicker");
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
        return "colorPicker";
    }

    public void setTileSize(com.kendoui.taglib.colorpicker.TileSizeTag value) {
        setProperty("tileSize", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getButtons() {
        return (boolean)getProperty("buttons");
    }

    public void setButtons(boolean value) {
        setProperty("buttons", value);
    }

    public float getColumns() {
        return (float)getProperty("columns");
    }

    public void setColumns(float value) {
        setProperty("columns", value);
    }

    public Object getMessages() {
        return (Object)getProperty("messages");
    }

    public void setMessages(Object value) {
        setProperty("messages", value);
    }

    public boolean getOpacity() {
        return (boolean)getProperty("opacity");
    }

    public void setOpacity(boolean value) {
        setProperty("opacity", value);
    }

    public String getPalette() {
        return (String)getProperty("palette");
    }

    public void setPalette(String value) {
        setProperty("palette", value);
    }

    public boolean getPreview() {
        return (boolean)getProperty("preview");
    }

    public void setPreview(boolean value) {
        setProperty("preview", value);
    }

    public float getTileSize() {
        return (float)getProperty("tileSize");
    }

    public void setTileSize(float value) {
        setProperty("tileSize", value);
    }

    public String getToolIcon() {
        return (String)getProperty("toolIcon");
    }

    public void setToolIcon(String value) {
        setProperty("toolIcon", value);
    }

    public String getValue() {
        return (String)getProperty("value");
    }

    public void setValue(String value) {
        setProperty("value", value);
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

    public String getClose() {
        Function property = ((Function)getProperty("close"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClose(String value) {
        setProperty("close", new Function(value));
    }

    public String getOpen() {
        Function property = ((Function)getProperty("open"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOpen(String value) {
        setProperty("open", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes

}
