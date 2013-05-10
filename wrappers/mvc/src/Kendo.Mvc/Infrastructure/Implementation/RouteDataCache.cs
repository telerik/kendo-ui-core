namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Web;
    using System.Web.Routing;

    public class RouteDataCache : IRouteDataCache
    {
        private readonly ICache cache;

        public RouteDataCache(ICache cache)
        {
            this.cache = cache;
        }

        public RouteData GetRouteData(string key, string url)
        {
            return cache.Get(key, () => RouteDataFactory(url));
        }

        private RouteData RouteDataFactory(string url)
        {
            return RouteTable.Routes.GetRouteData(new InternalHttpContextBase(url));
        }
    }

    internal class InternalHttpContextBase : HttpContextBase
    {
        private readonly HttpRequestBase mockHttpRequestBase;

        public InternalHttpContextBase(string appRelativeUrl)
        {
            this.mockHttpRequestBase = new InternalHttpRequestBase(appRelativeUrl);
        }

        public override HttpRequestBase Request
        {
            get
            {
                return mockHttpRequestBase;
            }
        }
    }

    internal class InternalHttpRequestBase : HttpRequestBase
    {
        private readonly string appCurrentUrl;

        public override string HttpMethod
        {
            get
            {
                return "GET";
            }
        }

        public InternalHttpRequestBase(string appCurrentUrl)
        {
            this.appCurrentUrl = appCurrentUrl;
        }
       
        public override string AppRelativeCurrentExecutionFilePath
        {
            get { return MakeCurrentUrlRelative(appCurrentUrl); }
        }

        public override string CurrentExecutionFilePath
        {
            get { return appCurrentUrl; }
        }

        #region  proxy current HttpRequest
        public override string[] AcceptTypes
        {
            get { return HttpContext.Current.Request.AcceptTypes; }
        }

        public override string ApplicationPath
        {
            get { return HttpContext.Current.Request.ApplicationPath; }
        }

        public override string AnonymousID
        {
            get { return HttpContext.Current.Request.AnonymousID; }
        }

        public override bool IsAuthenticated
        {
            get { return HttpContext.Current.Request.IsAuthenticated; }
        }

        public override bool IsLocal
        {
            get { return HttpContext.Current.Request.IsLocal; }
        }

        public override bool IsSecureConnection
        {
            get { return HttpContext.Current.Request.IsSecureConnection; }
        }

        public override System.Security.Principal.WindowsIdentity LogonUserIdentity
        {
            get { return HttpContext.Current.Request.LogonUserIdentity; }
        }

        public override string Path
        {
            get { return HttpContext.Current.Request.Path; }
        }

        public override string PathInfo
        {
            get { return HttpContext.Current.Request.PathInfo; }
        }

        public override string PhysicalApplicationPath
        {
            get { return HttpContext.Current.Request.PhysicalApplicationPath; }
        }

        public override string PhysicalPath
        {
            get { return HttpContext.Current.Request.PhysicalPath; }
        }

        public override string RawUrl
        {
            get { return HttpContext.Current.Request.RawUrl; }
        }

        public override string UserHostAddress
        {
            get { return HttpContext.Current.Request.UserHostAddress; }
        }

        public override string UserHostName
        {
            get { return HttpContext.Current.Request.UserHostName; }
        }

        public override System.Collections.Specialized.NameValueCollection QueryString
        {
            get { return new System.Collections.Specialized.NameValueCollection(); }
        }
        #endregion

        private string MakeCurrentUrlRelative(string appCurrentUrl)
        {
            string result = string.Empty;
            int appVirtualPathLength = HttpRuntime.AppDomainAppVirtualPath.Length;
            
            if (appVirtualPathLength == 1)
            {
                result = appCurrentUrl;
            }
            else
            {
                result = appCurrentUrl.Substring(appVirtualPathLength);
            }

            if (!result.StartsWith("/"))
            {
                result = "/" + result;
            }

            return "~" + result;
        }
    }
}
