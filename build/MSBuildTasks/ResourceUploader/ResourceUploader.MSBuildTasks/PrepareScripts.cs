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
    public class PrepareScripts : PrepareResources
    {
        protected override string[] SupportedExtensions
        {
            get { return new[] { ".js" }; }
        }

        public override bool Execute()
        {
            var typeResolver = new TypeResolver();
            var appendScriptsLoaded = new AppendScriptsLoaded();            
            
            var pipeline = new ResourcePipeline(
                typeResolver,
                appendScriptsLoaded,
                UncompressedWriter);

            var gzipPipeline = new ResourcePipeline(
                typeResolver,
                appendScriptsLoaded,
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
