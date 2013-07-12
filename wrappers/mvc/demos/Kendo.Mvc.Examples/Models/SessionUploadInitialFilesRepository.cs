namespace Kendo.Mvc.Examples.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web;

    public static class SessionUploadInitialFilesRepository
    {
        public static IList<UploadInitialFile> GetAllInitialFiles()
        {
            IList<UploadInitialFile> initialFiles = (IList<UploadInitialFile>)HttpContext.Current.Session["InitialFiles"];
            
            if (initialFiles == null)
            {
                initialFiles = new List<UploadInitialFile>();
                HttpContext.Current.Session["InitialFiles"] = initialFiles;
            }
            
            return initialFiles;
        }

        public static void Add(UploadInitialFile file)
        {
            GetAllInitialFiles().Add(file);
        }

        public static void Remove(string fileName)
        {
            var initialFiles = GetAllInitialFiles();
            var fileToRemove = initialFiles.FirstOrDefault(f => f.Name == fileName);

            initialFiles.Remove(fileToRemove);
        }
    }
}