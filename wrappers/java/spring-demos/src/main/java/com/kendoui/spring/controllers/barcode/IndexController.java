package com.kendoui.spring.controllers.barcode;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-barcode-home-controller")
@RequestMapping(value="/dataviz/barcode/")
public class IndexController {
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        
        return "/dataviz/barcode/index";
    }
}