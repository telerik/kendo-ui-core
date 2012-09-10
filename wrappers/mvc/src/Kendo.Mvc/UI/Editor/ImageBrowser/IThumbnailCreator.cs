using System.IO;

namespace Kendo.Mvc.UI
{
    public interface IThumbnailCreator
    {
        byte[] Create(Stream source, ImageSize desiredSize, string contentType);
    }
}
