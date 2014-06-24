
package com.kendoui.taglib;


import com.kendoui.taglib.toolbar.*;


import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ToolBarTag extends WidgetWithItemsTag /* interfaces */implements Items/* interfaces */ {

    public ToolBarTag() {
        super("ToolBar");
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
        return "toolBar";
    }

    public void setItems(ItemsTag value) {

        items = value.items();

    }

    public void setClick(ClickFunctionTag value) {
        setEvent("click", value.getBody());
    }

    public void setClose(CloseFunctionTag value) {
        setEvent("close", value.getBody());
    }

    public void setOpen(OpenFunctionTag value) {
        setEvent("open", value.getBody());
    }

    public void setOverflowClose(OverflowCloseFunctionTag value) {
        setEvent("overflowClose", value.getBody());
    }

    public void setOverflowOpen(OverflowOpenFunctionTag value) {
        setEvent("overflowOpen", value.getBody());
    }

    public void setToggle(ToggleFunctionTag value) {
        setEvent("toggle", value.getBody());
    }

    public boolean getResizable() {
        return (boolean)getProperty("resizable");
    }

    public void setResizable(boolean value) {
        setProperty("resizable", value);
    }

    public String getClick() {
        Function property = ((Function)getProperty("click"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClick(String value) {
        setProperty("click", new Function(value));
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

    public String getOverflowClose() {
        Function property = ((Function)getProperty("overflowClose"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOverflowClose(String value) {
        setProperty("overflowClose", new Function(value));
    }

    public String getOverflowOpen() {
        Function property = ((Function)getProperty("overflowOpen"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setOverflowOpen(String value) {
        setProperty("overflowOpen", new Function(value));
    }

    public String getToggle() {
        Function property = ((Function)getProperty("toggle"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setToggle(String value) {
        setProperty("toggle", new Function(value));
    }

//<< Attributes

}
