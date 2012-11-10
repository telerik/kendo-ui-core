using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace ResourceUploader.Core
{
    public class DynamicResource : IResource
    {
        private Stream _contentStream;

        public DynamicResource(Stream contentStream, IResource originalResource)
        {
            _contentStream = contentStream;
            Name = originalResource.Name;
            RelativePath = originalResource.RelativePath;
            Type = originalResource.Type;
        }

        public string Name
        {
            get;
            set;
        }

        public string RelativePath
        {
            get;
            set;
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
