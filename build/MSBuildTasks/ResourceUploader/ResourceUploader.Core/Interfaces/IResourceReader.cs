using System.Collections.Generic;

namespace ResourceUploader.Core
{
    public interface IResourceReader
    {
        IList<IResource> GetResources();
    }
}
