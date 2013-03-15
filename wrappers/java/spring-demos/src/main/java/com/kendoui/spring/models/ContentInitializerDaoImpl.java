package com.kendoui.spring.models;

import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.springframework.stereotype.Component;

@Component
public class ContentInitializerDaoImpl implements ContentInitializerDao {    
    private final int BufferSize = 4096;

    @Override
    public void Initialize(File source, File destination) {
        if (!destination.exists()) {
            destination.mkdir();
            CopyFolder(source, destination);
        }        
    }
        
    private void CopyFolder(File source, File destination){
        if(source.isDirectory()){
            if(!destination.exists()){               
                destination.mkdir();
            }
            
            for (final File file : source.listFiles(new FileFilter() {                
                @Override
                public boolean accept(File pathname) {
                    // TODO Auto-generated method stub
                    return pathname.isDirectory() || pathname.getName().matches(".*((png)|(gif)|(jpg)|(jpeg))$");
                }
                })) {
                CopyFolder(file, new File(destination, file.getName()));                   
            }           
        }
        else{
            CopyFile(source, destination); 
        }        
    }
    
    private void CopyFile(File source, File destination){
        InputStream input;
        OutputStream output;
        try {
            input = new FileInputStream(source);
            output  = new FileOutputStream(destination);              
            try{
                byte[] buffer = new byte[BufferSize];

                int length;
                while ((length = input.read(buffer)) > 0){
                    output.write(buffer, 0, length);
                }
            }
            catch(IOException e){            
            }
            finally{
                input.close();
                output.close();
            }
        } catch (FileNotFoundException e) {
        } 
        catch(IOException e){            
        }
    }   
    
}
