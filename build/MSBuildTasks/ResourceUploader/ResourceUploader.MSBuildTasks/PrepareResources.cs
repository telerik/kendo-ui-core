using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using ResourceUploader.Core;
using Microsoft.Build.Utilities;

namespace ResourceUploader.MSBuildTasks
{
    public abstract class PrepareResources : Task
    {
        public string SourcePath { get; set; }
        public string DestinationPath { get; set; }

        public string ProductName { get; set; }
        public string Version { get; set; }
        public string CompressedPathSuffix { get; set; }

        protected abstract string[] SupportedExtensions { get; }

        private string CompressedDestinationPath
        {
            get
            {
                return Path.Combine(DestinationPath, ProductName + CompressedPathSuffix, Version);
            }
        }

        private string UncompressedDestinationPath
        {
            get
            {
                return Path.Combine(DestinationPath, ProductName, Version);
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

        private FileSystemResourceWriter _compressedWriter;
        protected FileSystemResourceWriter CompressedWriter
        {
            get
            {
                if (_compressedWriter == null)
                {
                    _compressedWriter = new FileSystemResourceWriter(_fileSystem, CompressedDestinationPath);
                }

                return _compressedWriter;
            }
        }

        private FileSystemResourceWriter _uncompressedWriter;
        protected FileSystemResourceWriter UncompressedWriter
        {
            get
            {
                if (_uncompressedWriter == null)
                {
                    _uncompressedWriter = new FileSystemResourceWriter(_fileSystem, UncompressedDestinationPath);
                }

                return _uncompressedWriter;
            }
        }
    }
}
