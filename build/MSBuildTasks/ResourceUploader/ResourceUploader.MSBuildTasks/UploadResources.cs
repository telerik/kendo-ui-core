using System;
using System.Collections.Generic;
using LitS3;
using Microsoft.Build.Utilities;
using ResourceUploader.AmazonS3;
using ResourceUploader.Core;

namespace ResourceUploader.MSBuildTasks
{
    public class UploadResources : Task
    {
        public string SourcePath { get; set; }
        public string DestinationPath { get; set; }
        public string AccessKeyID { get; set; }
        public string SecretAccessKey { get; set; }
        public string BucketName { get; set; }
        public bool Compress { get; set; }

        private static FileSystem _fileSystem = new FileSystem();

        private FileSystemResourceReader _reader;
        protected FileSystemResourceReader Reader
        {
            get
            {
                if (_reader == null)
                {
                    _reader = new FileSystemResourceReader(_fileSystem, SourcePath, SupportedExtensions);
                }

                return _reader;
            }
        }

        private IResourceFilter _writer;
        protected IResourceFilter Writer
        {
            get
            {
                if (_writer == null)
                {
                    _writer = new RetryFilter(
                        new AmazonS3ResourceWriter(AccessKeyID, SecretAccessKey, BucketName, DestinationPath),
                        new[] { typeof(S3Exception) }
                    );
                }

                return _writer;
            }
        }

        protected string[] SupportedExtensions
        {
            get { return new[] { ".js", ".css", ".gif", ".png", ".jpeg", ".jpg", ".ico", ".cur", ".ttf", ".woff" }; }
        }

        public override bool Execute()
        {
            var filters = new List<IResourceFilter>();
            filters.Add(new TypeResolver());

            if (Compress)
            {
                filters.Add(new GZipCompressor());
            }

            filters.Add(Writer);

            var pipeline = new ResourcePipeline(filters.ToArray());

            var resources = Reader.GetResources();
            Log.LogMessage("Uploading web resources to S3 (bucket = {0}, compress = {1})", BucketName, Compress);
            var start = DateTime.Now;

            System.Threading.Tasks.Parallel.ForEach(resources, resource =>
            {
                using (resource)
                {
                    Log.LogMessage("\t{0}/{1}", DestinationPath, resource.RelativePath.Replace("\\", "/"));
                    pipeline.Process(resource);
                }
            });

            Log.LogMessage("Uploading resources complete. Took {0} for {1} files\n", DateTime.Now - start, resources.Count);

            return true;
        }
    }
}
