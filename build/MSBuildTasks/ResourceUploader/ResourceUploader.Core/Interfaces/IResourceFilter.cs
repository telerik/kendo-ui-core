namespace ResourceUploader.Core
{
    public interface IResourceFilter
    {
        IResource Filter(IResource source);
    }
}
