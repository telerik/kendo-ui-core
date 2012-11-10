using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ResourceUploader.Core
{
    public class ResourcePipeline : IResourcePipeline
    {
        protected IList<IResourceFilter> Filters { get; set; }

        public ResourcePipeline(params IResourceFilter[] filters)
        {
            if (filters.Length == 0)
                throw new InvalidOperationException("Pipeline contains no filters.");

            Filters = new List<IResourceFilter>(filters);
        }

        public void Process(IResource resource)
        {
            var processedResource = resource;
            foreach (var filter in Filters)
            {
                processedResource = filter.Filter(processedResource);

                if (processedResource == null)
                    return;
            }
        }
    }
}
