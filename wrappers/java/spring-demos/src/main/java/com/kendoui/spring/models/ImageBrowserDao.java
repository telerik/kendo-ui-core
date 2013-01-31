package com.kendoui.spring.models;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface ImageBrowserDao {
    public List<ImageBrowserEntry> getList(String path);

    public byte[] getThumbnail(String path);   
    
    public void destroy(String path, ImageBrowserEntry entry) throws IOException;
    
    public void create(String path, ImageBrowserEntry entry) throws IOException;
    
    public ImageBrowserEntry saveFile(MultipartFile file, String path) throws IllegalStateException, IOException;
}
