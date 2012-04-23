

namespace KendoUI.Mvc.UI
{
    using System.IO;

    public interface IThumbnailCreator
    {
        byte[] Create(Stream source, ImageSize desiredSize, string contentType);
    }
}