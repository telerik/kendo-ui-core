package com.kendoui.taglib;

import com.kendoui.taglib.json.Function;

@SuppressWarnings("serial")
public class EditorTag extends WidgetTag /* interfaces *//* interfaces */ {
    public EditorTag() {
        super("Editor");
    }

    //>> Attributes

    public boolean getEncoded() {
        return (boolean)getProperty("encoded");
    }

    public void setEncoded(boolean value) {
        setProperty("encoded", value);
    }

    public String getChange() {
        return ((Function)getProperty("change")).getBody();
    }

    public void setChange(String value) {
        setProperty("change", new Function(value));
    }

    public String getExecute() {
        return ((Function)getProperty("execute")).getBody();
    }

    public void setExecute(String value) {
        setProperty("execute", new Function(value));
    }

    public String getKeydown() {
        return ((Function)getProperty("keydown")).getBody();
    }

    public void setKeydown(String value) {
        setProperty("keydown", new Function(value));
    }

    public String getKeyup() {
        return ((Function)getProperty("keyup")).getBody();
    }

    public void setKeyup(String value) {
        setProperty("keyup", new Function(value));
    }

    public String getPaste() {
        return ((Function)getProperty("paste")).getBody();
    }

    public void setPaste(String value) {
        setProperty("paste", new Function(value));
    }

    public String getSelect() {
        return ((Function)getProperty("select")).getBody();
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

//<< Attributes
}