
package com.kendoui.taglib;



import com.kendoui.taglib.editor.*;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class EditorTag extends WidgetTag /* interfaces *//* interfaces */ {

    public EditorTag() {
        super("Editor");
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
        return "editor";
    }

    public void setImagebrowser(ImagebrowserTag value) {
        setProperty("imagebrowser", value);
    }

    public void setChange(ChangeFunctionTag value) {
        setEvent("change", value.getBody());
    }

    public void setExecute(ExecuteFunctionTag value) {
        setEvent("execute", value.getBody());
    }

    public void setKeydown(KeydownFunctionTag value) {
        setEvent("keydown", value.getBody());
    }

    public void setKeyup(KeyupFunctionTag value) {
        setEvent("keyup", value.getBody());
    }

    public void setPaste(PasteFunctionTag value) {
        setEvent("paste", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public boolean getEncoded() {
        return (boolean)getProperty("encoded");
    }

    public void setEncoded(boolean value) {
        setProperty("encoded", value);
    }

    public Object getMessages() {
        return (Object)getProperty("messages");
    }

    public void setMessages(Object value) {
        setProperty("messages", value);
    }

    public Object getStylesheets() {
        return (Object)getProperty("stylesheets");
    }

    public void setStylesheets(Object value) {
        setProperty("stylesheets", value);
    }

    public Object getTools() {
        return (Object)getProperty("tools");
    }

    public void setTools(Object value) {
        setProperty("tools", value);
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

    public String getExecute() {
        Function property = ((Function)getProperty("execute"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setExecute(String value) {
        setProperty("execute", new Function(value));
    }

    public String getKeydown() {
        Function property = ((Function)getProperty("keydown"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setKeydown(String value) {
        setProperty("keydown", new Function(value));
    }

    public String getKeyup() {
        Function property = ((Function)getProperty("keyup"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setKeyup(String value) {
        setProperty("keyup", new Function(value));
    }

    public String getPaste() {
        Function property = ((Function)getProperty("paste"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPaste(String value) {
        setProperty("paste", new Function(value));
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
