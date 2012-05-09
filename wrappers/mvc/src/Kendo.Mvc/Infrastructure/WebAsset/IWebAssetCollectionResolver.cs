namespace Kendo.Mvc.Infrastructure
{
    using System.Collections.Generic;
    using Kendo.Mvc;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.UI;

    public interface IWebAssetCollectionResolver
    {
        IEnumerable<string> Resolve(ResolverContext resolverContext, WebAssetCollection assets);
    }
}
