namespace KendoUI.Mvc.Infrastructure
{
    using System.Collections.Generic;
    
    public interface IWebAssetResolver
    {
        IEnumerable<string> Resolve(ResolverContext resolverContext);
    }
}
