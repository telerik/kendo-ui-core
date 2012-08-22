package com.kendoui.taglib.html;

import java.io.IOException;
import java.io.Writer;

public class Text implements Node {
    private String nodeValue;

    @Override
    public void write(Writer out) throws IOException {
        out.write(nodeValue);
    }

    public Text value(String value) {
        nodeValue = Text.escapeHtml(value);

        return this;
    }

    public static String escapeHtml(String html) {
        return html.replaceAll("&", "&amp;")
                   .replaceAll("<", "&lt;")
                   .replaceAll(">", "&gt;");

    }
}
