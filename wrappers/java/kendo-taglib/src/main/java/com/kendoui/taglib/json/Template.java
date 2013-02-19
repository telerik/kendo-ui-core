package com.kendoui.taglib.json;

import java.io.IOException;
import java.io.Writer;

public class Template extends Function {
    
    public Template(String body) {
        super(body);
    }

    public void write(Writer out) throws IOException {
        out.append("kendo.template($('#" + getBody()  + "').html())");
    }
}
