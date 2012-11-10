using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ResourceUploader.Core
{
    public interface IFileSystem
    {
        IEnumerable<IFileInfo> FindFiles(string basePath);
        Stream OpenWrite(string path);
    }
}
