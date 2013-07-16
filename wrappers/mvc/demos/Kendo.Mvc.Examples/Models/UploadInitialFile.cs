using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples.Models
{
    public class UploadInitialFile
    {
        public string Name { get; set; }
        public long Size { get; set; }
        public string Extension { get; set; }

        public UploadInitialFile(string name, long size, string extension)
        {
            this.Name = name;
            this.Size = size;
            this.Extension = extension;
        }
    }
}