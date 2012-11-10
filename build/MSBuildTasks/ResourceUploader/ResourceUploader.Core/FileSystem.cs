using System.IO;
using System.Collections.Generic;

namespace ResourceUploader.Core
{
    public class FileSystem : IFileSystem
    {
        public IEnumerable<IFileInfo> FindFiles(string basePath)
        {
            foreach (var fileName in Directory.GetFiles(basePath, "*.*", SearchOption.AllDirectories))
            {
                yield return new File(new FileInfo(fileName));
            }
        }

        public Stream OpenWrite(string path)
        {
            var root = Path.GetDirectoryName(path);
            if (!Directory.Exists(root))
            {
                Directory.CreateDirectory(root);
            }

            return System.IO.File.OpenWrite(path);
        }
    }
}
