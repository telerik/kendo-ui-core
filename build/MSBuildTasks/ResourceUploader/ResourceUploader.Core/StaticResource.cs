using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ResourceUploader.Core
{
    public class StaticResource : IResource
    {
        private IFileInfo _file;
        private Stream _contentStream;

        public StaticResource(IFileInfo file, string relativePath)
        {
            _file = file;
            RelativePath = relativePath;
        }

        public string Name
        {
            get
            {
                return _file.Name;
            }
        }

        public string RelativePath
        {
            get;
            private set;
        }

        public MimeType Type
        {
            get;
            set;
        }

        public ContentEncoding Encoding
        {
            get;
            set;
        }

        public Stream ContentStream
        {
            get
            {
                if (_contentStream == null)
                    _contentStream = _file.OpenRead();

                return _contentStream;
            }
        }

        public void Dispose()
        {
            if (_contentStream != null)
                _contentStream.Dispose();
        }
    }
}
