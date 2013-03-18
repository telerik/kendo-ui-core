package com.kendoui.spring.controllers.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-api-selection-controller")
@RequestMapping(value="/dataviz/api/")
public class SelectionController {
    @RequestMapping(value = "/selection", method = RequestMethod.GET)
    public String index() {       
        return "/dataviz/api/selection";
    }
}
