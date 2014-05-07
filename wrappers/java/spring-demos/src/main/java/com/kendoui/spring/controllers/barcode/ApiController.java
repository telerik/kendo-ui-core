package com.kendoui.spring.controllers.barcode;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("dataviz-barcode-api-controller")
@RequestMapping(value="/barcode/")
public class ApiController {
    @RequestMapping(value = "api", method = RequestMethod.GET)
    public String index() {
        
        return "/barcode/api";
    }
}
