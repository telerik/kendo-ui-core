namespace Kendo.Mvc.Infrastructure
{
    using System.Web.Routing;

    public interface IUrlAuthorization
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1054:UriParametersShouldNotBeStrings", MessageId = "1#", Justification = "Url might not be a valid uri.")]
        bool IsAccessibleToUser(RequestContext requestContext, string url);
    }
}