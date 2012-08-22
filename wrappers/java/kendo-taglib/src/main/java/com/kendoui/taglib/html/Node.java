package com.kendoui.taglib.html;

import java.io.IOException;
import java.io.Writer;

public interface Node {
   public void write(Writer out) throws IOException;
}
