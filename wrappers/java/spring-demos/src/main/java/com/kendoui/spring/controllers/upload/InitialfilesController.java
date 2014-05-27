package com.kendoui.spring.controllers.upload;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import com.kendoui.spring.models.UploadInitialFile;


@Controller("upload-initialfiles-controller")
@RequestMapping(value="/upload/")
@SessionAttributes({"initialFiles"})
public class InitialfilesController {
    
    @ModelAttribute("initialFiles")
    public List<UploadInitialFile> setInitialFiles(){
        List<UploadInitialFile> initialFiles = new ArrayList<UploadInitialFile>();
        return initialFiles;
    }
    
    @RequestMapping(value = "/initialfiles", method = RequestMethod.GET)
    public String index(@ModelAttribute("initialFiles") ArrayList<UploadInitialFile> initialFiles, Model model){

        model.addAttribute("initialFiles", initialFiles);
        
        return "upload/initialfiles";
    }
    
    @RequestMapping(value = "/initialfiles/saveAndPersist", method = RequestMethod.POST)
    public @ResponseBody String saveAndPersist(@RequestParam List<MultipartFile> files, Model model,
            @ModelAttribute("initialFiles") ArrayList<UploadInitialFile> initialFiles) {
        //Persist files
        for (MultipartFile file : files) {         
            UploadInitialFile currentFile = new UploadInitialFile(
                    file.getOriginalFilename(),
                    file.getSize(),
                    getFileExtension(file.getOriginalFilename()));
            
            initialFiles.add(currentFile);
        }
        model.addAttribute("initialFiles", initialFiles);
        
        // Save the files
        // for (MultipartFile file : files) {
        // }
        
        // Return an empty string to signify success
        return "";
    }
    
    @RequestMapping(value = "/initialfiles/removeAndPersist", method = RequestMethod.POST)
    public @ResponseBody String removeAndPersist(@RequestParam String[] fileNames, Model model,
            @ModelAttribute("initialFiles") ArrayList<UploadInitialFile> initialFiles) {
        //Persist files
        for (String fileName : fileNames) {
            for(UploadInitialFile file : initialFiles) {
                if (fileName.equals(file.getName())) {
                    initialFiles.remove(file);
                    break;
                }
            }
        }
        model.addAttribute("initialFiles", initialFiles);
        
        // Remove the files
        // for (String fileName : fileNames) {
        // }
        // Return an empty string to signify success
        return "";
    }
    
    private String getFileExtension(String fileName) {
        String extension = "";
        int lastDot = fileName.lastIndexOf('.');
        if (lastDot > 0) {
            extension = fileName.substring(lastDot + 1);
        }
        return extension;
    }
}
