using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ResourceUploader.Core
{
    public class FileSystemResourceReader : IResourceReader
    {
        private IFileSystem _fileSystem;
        private string _basePath;
        private IEnumerable<string> _filterExtensions;

        public FileSystemResourceReader(IFileSystem fileSystem, string basePath, ICollection<string> filterExtensions)
        {
            _fileSystem = fileSystem;
            _basePath = basePath;
            _filterExtensions = from fileExtension in filterExtensions select fileExtension.ToLowerInvariant();
        }

        public IList<IResource> GetResources()
        {
            var allFiles = _fileSystem.FindFiles(_basePath);
            var filteredFiles = allFiles.Where(match => _filterExtensions.Contains(Path.GetExtension(match.Name.ToLowerInvariant())));
            var allResources = new List<IResource>();
            foreach (IFileInfo file in filteredFiles)
            {
                allResources.Add(new StaticResource(file, GetRelativePath(_basePath, file.Name)));
            }

            return allResources;
        }

        static string NormalizeFilepath(string filepath)
        {
            string result = Path.GetFullPath(filepath);

            result = result.TrimEnd(new[] { '\\', '/' });

            return result;
        }

        static string GetRelativePath(string rootPath, string fullPath)
        {
            rootPath = NormalizeFilepath(rootPath);
            fullPath = NormalizeFilepath(fullPath);

            if (!fullPath.StartsWith(rootPath))
                throw new Exception("Could not find rootPath in fullPath when calculating relative path.");

            return fullPath.Substring(rootPath.Length).TrimStart(new [] { '\\', '/' });
        }
    }
}
