using System;
using System.IO;

namespace ResourceUploader.Core
{
    public interface IResource : IDisposable
    {
        string Name { get; }
        string RelativePath { get; }
        MimeType Type { get; }
        ContentEncoding Encoding { get; }

        Stream ContentStream { get; }
    }
}
