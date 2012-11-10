using ResourceUploader.Core;
using System;
using System.Threading.Tasks;

namespace ResourceUploader.MSBuildTasks
{
    public class UploadSkins : UploadTask
    {
        protected override string[] SupportedExtensions
        {
            get { return new[] { ".css", ".gif", ".png", ".jpeg", ".jpg", ".ico", ".cur" }; }
        }

        public override bool Execute()
        {
            var typeResolver = new TypeResolver();

            var pipeline = new ResourcePipeline(
                typeResolver,
                UncompressedWriter);

            var gzipPipeline = new ResourcePipeline(
                typeResolver,
                new GZipCompressor(),
                CompressedWriter);

            var resources = Reader.GetResources();
            Log.LogMessage("Uploading skins ({0} files)", resources.Count);
            var start = DateTime.Now;

            Parallel.ForEach(resources, resource =>
            {
                using (resource)
                {
                    Log.LogMessage("\t{0}", resource.RelativePath);
                    Parallel.ForEach(new[] { pipeline, gzipPipeline }, p => p.Process(resource));
                }
            });

            Log.LogMessage("Uploading scripts complete. Took {0}\n", DateTime.Now - start);

            return true;
        }
    }
}
