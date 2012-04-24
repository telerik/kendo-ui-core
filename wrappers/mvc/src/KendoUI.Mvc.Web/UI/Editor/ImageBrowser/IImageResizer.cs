namespace KendoUI.Mvc.UI
{
    public interface IImageResizer
    {
        ImageSize Resize(ImageSize originalSize, ImageSize targetSize);
    }
}