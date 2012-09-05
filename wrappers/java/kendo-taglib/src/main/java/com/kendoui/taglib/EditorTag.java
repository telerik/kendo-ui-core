package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class EditorTag extends WidgetTag {
    public EditorTag() {
        super("Editor");
    }

    //>> Attributes

    public boolean getEncoded() {
        return (boolean)getProperty("encoded");
    }

    public void setEncoded(boolean encoded) {
        setProperty("encoded", encoded);
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public String getExecute() {
        return ((Function)getProperty("execute")).getBody();
    }

    public void setExecute(String execute) {
        setProperty("execute", new Function(execute));
    }

    public String getError() {
        return ((Function)getProperty("error")).getBody();
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public String getPaste() {
        return ((Function)getProperty("paste")).getBody();
    }

    public void setPaste(String paste) {
        setProperty("paste", new Function(paste));
    }

    //<< Attributes
}