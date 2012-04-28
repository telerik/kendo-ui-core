namespace KendoUI.Mvc.Infrastructure
{
    using System.Collections.Generic;
    using KendoUI.Mvc;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI;

    public interface IWebAssetCollectionResolver
    {
        IEnumerable<string> Resolve(ResolverContext resolverContext, WebAssetCollection assets);
    }
}
