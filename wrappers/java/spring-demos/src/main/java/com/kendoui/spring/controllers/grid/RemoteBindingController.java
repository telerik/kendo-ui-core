package com.kendoui.spring.controllers.grid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("grid-remote-binding-controller")
@RequestMapping(value="/web/grid/")
public class RemoteBindingController {
    @RequestMapping(value = "/remote-data", method = RequestMethod.GET)
    public String index() {
        return "web/grid/remote-data";
    }
}