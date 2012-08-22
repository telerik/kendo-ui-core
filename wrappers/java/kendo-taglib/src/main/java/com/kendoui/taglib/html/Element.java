package com.kendoui.taglib.html;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import java.util.ArrayList;
import java.util.List;

public abstract class Element<T extends Element<T>> implements Node {
    private String tagName;
    private boolean selfClosing;
    private List<Node> children;
    private String innerHtml;

    protected Element(String tagName) {
        this(tagName, false);
    }

    protected Element(String tagName, boolean selfClosing) {
        this.children = new ArrayList<Node>();
        this.innerHtml = "";
        this.tagName = tagName;
        this.selfClosing = selfClosing;
    }

    @SuppressWarnings("unchecked")
    public T append(Node child) {
        children.add(child);

        return (T)this;
    }

    public T text(String text) {
        return html(Text.escapeHtml(text));
    }

    @SuppressWarnings("unchecked")
    public T html(String html) {
        innerHtml = html;

        children.clear();

        return (T)this;
    }

    public void write(Writer out) throws IOException {
        out.append("<")
           .append(tagName);

        if (selfClosing) {
            out.append(" />");
        } else {
            out.append(">");

            writeContent(out);

            out.append("</")
               .append(tagName)
               .append(">");
        }
    }

    private void writeContent(Writer out) throws IOException {
        if (!innerHtml.isEmpty()) {
            out.write(innerHtml);
        }

        for (Node child : children) {
            child.write(out);
        }
    }

    public String outerHtml() throws IOException {
        StringWriter out = new StringWriter();

        write(out);

        return out.toString();
    }
}
