using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ResourceUploader.Core
{
    public interface IFileInfo
    {
        string Name { get; }
        Stream OpenRead();
    }
}
