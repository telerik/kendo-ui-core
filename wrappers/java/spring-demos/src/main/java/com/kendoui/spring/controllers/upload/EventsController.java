package com.kendoui.spring.controllers.upload;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller("upload-events-controller")
@RequestMapping(value="/upload/")
public class EventsController {
    
    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public String index() {
        return "upload/events";
    }
    
    @RequestMapping(value = "/events/save", method = RequestMethod.POST)
    public @ResponseBody String save(@RequestParam List<MultipartFile> files) {
        // Save the files
        // for (MultipartFile file : files) {
        // }
        
        // Return an empty string to signify success
        return "";
    }
    
    @RequestMapping(value = "/events/remove", method = RequestMethod.POST)
    public @ResponseBody String remove(@RequestParam String[] fileNames) {
        // Remove the files
        // for (String fileName : fileNames) {
        // }
        // Return an empty string to signify success
        return "";
    }
}