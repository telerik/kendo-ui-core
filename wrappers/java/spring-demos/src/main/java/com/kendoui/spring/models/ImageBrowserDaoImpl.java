package com.kendoui.spring.models;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.xml.ws.http.HTTPException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Component
public class ImageBrowserDaoImpl implements ImageBrowserDao {
        
    private @Autowired ResourceLoader loader;
    private @Autowired ServletContext context;    
    private @Autowired ContentInitializerDao contentInitializer;
    private final String ContentPath = "/resources/shared/imagebrowser/";
    private final String SourceFolder = "/resources/shared/images/photos";
    
    @PostConstruct
    void Init() {          
        contentInitializer.Initialize(new File(context.getRealPath(SourceFolder)), new File(context.getRealPath(ContentPath)));
    } 
    
    private String NormalizePath(String path){
        return new File(ContentPath, path).getPath();
    }
    
    private Boolean CanAccess(String path){                
        try {
            return new File(ContentPath, path).getCanonicalPath().startsWith(new File(ContentPath).getCanonicalPath());
        } catch (IOException e) {            
        }
        return false;
    }
    
    @Override
    public List<ImageBrowserEntry> getList(String path) {
        
        if (!CanAccess(path)){
            throw new HTTPException(401);
        }
            
        List<ImageBrowserEntry> result = new ArrayList<ImageBrowserEntry>();
        
        try {
            File folder = loader.getResource(NormalizePath(path)).getFile();
            
            for (final File fileEntry : folder.listFiles(new FileFilter() {                
                @Override
                public boolean accept(File pathname) {
                    // TODO Auto-generated method stub
                    return pathname.isDirectory() || pathname.getName().matches(".*((png)|(gif)|(jpg)|(jpeg))$");
                }
                })) {
                
                ImageBrowserEntry entry = new ImageBrowserEntry();
                
                if (fileEntry.isDirectory()) {
                    entry.setType("d");
                } else {
                    entry.setType("f");
                    entry.setSize(fileEntry.length());
                }
                entry.setName(fileEntry.getName());                
                result.add(entry);
            }
        } catch (IOException e) {            
        }
        return result;
    }
    
    public ImageBrowserEntry saveFile(final MultipartFile file, String path) throws IllegalStateException, IOException {
        if (!CanAccess(path)){
            throw new HTTPException(401);
        }
        
        file.transferTo(new File(context.getRealPath(""), new File(NormalizePath(path), file.getOriginalFilename()).getPath()));        
        
        return new ImageBrowserEntry() {{
            setSize(file.getSize());
            setName(file.getOriginalFilename());            
        }};        
    }
    
    private String getExtension(File file){
        String name = file.getName();        
        return name.substring(name.lastIndexOf('.') + 1);
    }
    
    @Override
    public byte[] getThumbnail(String path) {
        if (!CanAccess(path)){
            throw new HTTPException(401);
        }
        
        try {
            File file = loader.getResource(NormalizePath(path)).getFile();
            ByteArrayOutputStream stream = new ByteArrayOutputStream();
            try {                
                ImageIO.write(scaleImage(ImageIO.read(file), 80), getExtension(file), stream);
                return stream.toByteArray();
            } finally {
                stream.close();
            }            
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
    
    private BufferedImage scaleImage(final BufferedImage bufferedImage, final int size) {
            final double boundSize = size;
            final int origWidth = bufferedImage.getWidth();
            final int origHeight = bufferedImage.getHeight();

            double scale;

            if (origHeight > origWidth) {
                scale = boundSize / origHeight;
            }
            else {
                scale = boundSize / origWidth;
            }
            
            if (scale > 1.0)
                return (null);

            final int scaledWidth = (int) (scale * origWidth);
            final int scaledHeight = (int) (scale * origHeight);

            final Image scaledImage =
                bufferedImage.getScaledInstance(scaledWidth, scaledHeight,
                    Image.SCALE_SMOOTH);

            final BufferedImage scaledBI = new BufferedImage(scaledWidth, scaledHeight, BufferedImage.TYPE_INT_RGB);
            
            final Graphics2D g = scaledBI.createGraphics();
            
            try {            
                g.drawImage(scaledImage, 0, 0, null);                
            } finally {
                g.dispose();
            }

            return scaledBI;
        }

    @Override
    public void destroy(String path, ImageBrowserEntry entry) throws IOException {
        if (!CanAccess(path)){
            throw new HTTPException(401);
        }        
        
        File file = new File(context.getRealPath(""), new File(NormalizePath(path), entry.getName()).getPath());
        if (file.isDirectory()) {            
            deleteRecursive(file);            
        }        
        file.delete();
    }

    private void deleteRecursive(File directory) {
        for (File file : directory.listFiles()) {
            if (file.isDirectory()) {
                deleteRecursive(file);              
            } 
            file.delete();
        }
    }
    
    @Override
    public void create(String path, ImageBrowserEntry entry) throws IOException {
        if (!CanAccess(path)){
            throw new HTTPException(401);
        }
        
        new File(context.getRealPath(""), new File(NormalizePath(path), entry.getName()).getPath()).mkdir();        
        
    }
}