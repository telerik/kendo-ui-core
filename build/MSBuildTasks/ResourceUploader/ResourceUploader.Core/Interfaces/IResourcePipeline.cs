namespace ResourceUploader.Core
{
    public interface IResourcePipeline
    {
        void Process(IResource resource);
    }
}
