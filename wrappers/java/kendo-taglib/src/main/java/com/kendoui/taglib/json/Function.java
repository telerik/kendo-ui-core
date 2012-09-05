package com.kendoui.taglib.json;

import java.io.IOException;
import java.io.Writer;

public class Function {
    private String body;

    public Function(String body) {
        this.body = body;
    }

    public void write(Writer out) throws IOException {
        out.append(body);
    }
    
    public String getBody() {
        return body;
    }
}
