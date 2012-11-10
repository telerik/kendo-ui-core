using System.IO;

namespace ResourceUploader.Core
{
    public class File : IFileInfo
    {
        private FileInfo _info;
        
        public string Name 
        { 
            get { return _info.FullName; }
        }

        public File(FileInfo info)
        {
            _info = info;
        }

        public Stream OpenRead()
        {
            return _info.OpenRead();
        }
    }
}
