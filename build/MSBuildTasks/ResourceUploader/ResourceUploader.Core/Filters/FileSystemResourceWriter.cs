using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ResourceUploader.Core
{
    public class FileSystemResourceWriter : IResourceFilter
    {
        private IFileSystem _fileSystem;
        private string _basePath;

        public FileSystemResourceWriter(IFileSystem fileSystem, string basePath)
        {
            _fileSystem = fileSystem;
            _basePath = basePath;
        }

        public IResource Filter(IResource source)
        {
            var path = Path.Combine(_basePath, source.RelativePath);
            using (var outputStream = _fileSystem.OpenWrite(path))
            {
                source.ContentStream.CopyTo(outputStream);
            }

            return null;
        }
    }
}
