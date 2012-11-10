using LitS3;
using Microsoft.Build.Utilities;
using ResourceUploader.AmazonS3;
using ResourceUploader.Core;

namespace ResourceUploader.MSBuildTasks
{
    public abstract class UploadTask : Task
    {
        public string SourcePath { get; set; }
        public string AccessKeyID { get; set; }
        public string SecretAccessKey { get; set; }
        public string BucketName { get; set; }

        public string ProductName { get; set; }
        public string Version { get; set; }
        public string CompressedPathSuffix { get; set; }

        protected abstract string[] SupportedExtensions { get; }

        private string CompressedDestinationPath
        {
            get
            {
                return string.Format("{0}{1}/{2}", ProductName, CompressedPathSuffix, Version);
            }
        }

        private string UncompressedDestinationPath
        {
            get
            {
                return string.Format("{0}/{1}", ProductName, Version);
            }
        }

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

        private IResourceFilter _compressedWriter;
        protected IResourceFilter CompressedWriter
        {
            get
            {
                if (_compressedWriter == null)
                {
                    _compressedWriter = CreateAmazonS3RetryFilter(
                        new AmazonS3ResourceWriter(AccessKeyID, SecretAccessKey, BucketName, CompressedDestinationPath));
                }

                return _compressedWriter;
            }
        }

        private IResourceFilter _uncompressedWriter;
        protected IResourceFilter UncompressedWriter
        {
            get
            {
                if (_uncompressedWriter == null)
                {
                    _uncompressedWriter = CreateAmazonS3RetryFilter(
                        new AmazonS3ResourceWriter(AccessKeyID, SecretAccessKey, BucketName, UncompressedDestinationPath));
                }

                return _uncompressedWriter;
            }
        }

        private IResourceFilter CreateAmazonS3RetryFilter(IResourceFilter filterToRetry)
        {
            return new RetryFilter(filterToRetry, new[] { typeof(S3Exception) });
        }
    }
}
