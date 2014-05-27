package com.kendoui.spring.controllers.upload;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("upload-rtl-controller")
@RequestMapping(value="/upload/")
public class RightToLeftSupportController {
    
    @RequestMapping(value = "/right-to-left-support", method = RequestMethod.GET)
    public String index() {
        return "upload/right-to-left-support";
    }
}
