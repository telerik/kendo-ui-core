package com.kendoui.spring.controllers.upload;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller("upload-home-controller")
@RequestMapping(value="/web/upload/")
public class HomeController {
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.GET)
    public String index() {
        return "web/upload/index";
    }
    
    @RequestMapping(value = {"/", "/index"}, method = RequestMethod.POST)
    public String save(@RequestParam List<MultipartFile> files, Model model) {
        model.addAttribute("files", files);
        
        return "web/upload/results";
    }
}