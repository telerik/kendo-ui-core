package com.kendoui.spring.controllers.upload;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("upload-api-controller")
@RequestMapping(value="/upload/")
public class ApiController {
    
    @RequestMapping(value = "/api", method = RequestMethod.GET)
    public String index() {
        return "upload/api";
    }
}