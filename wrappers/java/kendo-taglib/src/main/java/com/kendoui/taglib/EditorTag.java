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

    public Function getSelect() {
        return (Function)getProperty("select");
    }

    public void setSelect(String select) {
        setProperty("select", new Function(select));
    }

    public Function getChange() {
        return (Function)getProperty("change");
    }

    public void setChange(String change) {
        setProperty("change", new Function(change));
    }

    public Function getExecute() {
        return (Function)getProperty("execute");
    }

    public void setExecute(String execute) {
        setProperty("execute", new Function(execute));
    }

    public Function getError() {
        return (Function)getProperty("error");
    }

    public void setError(String error) {
        setProperty("error", new Function(error));
    }

    public Function getPaste() {
        return (Function)getProperty("paste");
    }

    public void setPaste(String paste) {
        setProperty("paste", new Function(paste));
    }

    //<< Attributes
}