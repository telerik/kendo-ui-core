package com.kendoui.spring.controllers.editor;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.kendoui.spring.models.ImageBrowserDao;
import com.kendoui.spring.models.ImageBrowserEntry;

@Controller("editor-imagebrowser-controller")
@RequestMapping(value="/editor/")
public class ImageBrowserController {
    
    @Autowired 
    private ImageBrowserDao imageBrowser;
    
    @RequestMapping(value = {"/imagebrowser"}, method = RequestMethod.GET)
    public String index() {       
        return "editor/imagebrowser";
    }    
    
    @RequestMapping(value = {"/imagebrowser/read"}, method = RequestMethod.POST)
    public @ResponseBody List<ImageBrowserEntry> read(String path) {        
        return imageBrowser.getList(path);
    }   
    
    @RequestMapping(value = {"/imagebrowser/thumbnail"}, method = RequestMethod.GET)
    public @ResponseBody byte[] thumbnail(String path) throws IOException {
        return imageBrowser.getThumbnail(path);
    } 
    
    @RequestMapping(value = "/imagebrowser/upload", method = RequestMethod.POST)
    public @ResponseBody ImageBrowserEntry upload(@RequestParam MultipartFile file, @RequestParam String path) throws IllegalStateException, IOException {
        if (file != null) {
            return imageBrowser.saveFile(file, path);
        }        
        return null;
    }
    
    @RequestMapping(value = "/imagebrowser/create", method = RequestMethod.POST)
    public @ResponseBody ImageBrowserEntry create(@RequestParam final String name, @RequestParam final String type, @RequestParam String path) throws IOException {
        ImageBrowserEntry entry = new ImageBrowserEntry() {{ 
            setName(name); 
            setType(type);
        }};
        
        imageBrowser.create(path, entry);        
        return entry;
    }
    
    @RequestMapping(value = "/imagebrowser/destroy", method = RequestMethod.POST)
    public @ResponseBody ImageBrowserEntry destroy(@RequestParam final String name, @RequestParam final String type, @RequestParam String path) throws IOException {                
        ImageBrowserEntry entry = new ImageBrowserEntry() {{ 
            setName(name); 
            setType(type);
        }};
        
        imageBrowser.destroy(path, entry);        
        return entry;
    }
}