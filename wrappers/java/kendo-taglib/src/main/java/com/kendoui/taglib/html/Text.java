package com.kendoui.taglib.html;

import java.io.IOException;
import java.io.Writer;

public class Text implements Node {
    private String value;

    public Text() {
        value = "";
    }
    
    public Text(String value) {
        value(value);
    }
    
    @Override
    public void write(Writer out) throws IOException {
        if (value != null) {
            out.write(value);
        }
    }

    public Text value(String value) {
        if (value != null) {
            this.value = Text.escapeHtml(value);
        }

        return this;
    }

    public static String escapeHtml(String html) {
        return html.replaceAll("&", "&amp;")
                   .replaceAll("<", "&lt;")
                   .replaceAll(">", "&gt;");

    }
}
