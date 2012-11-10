using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Build.Utilities;
using ResourceUploader.Core;
using System.IO;
using System.Threading.Tasks;

namespace ResourceUploader.MSBuildTasks
{
    public class PrepareSkins : PrepareResources
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

            Parallel.ForEach(Reader.GetResources(), resource =>
            {
                using (resource)
                {
                    Parallel.ForEach(new[] { pipeline, gzipPipeline }, p => p.Process(resource));
                }
            });

            return true;
        }
    }
}
