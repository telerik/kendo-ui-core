package com.kendoui.taglib.html;

import java.io.IOException;
import java.io.Writer;

public class Empty extends Element<Empty> {

	public Empty() {
		super("", false);
	}

	@Override
	public void write(Writer out) throws IOException {
	    //do renders empty content
	}
}
