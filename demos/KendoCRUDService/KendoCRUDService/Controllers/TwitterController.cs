using System.Configuration;
using System.Web.Mvc;
using TweetSharp;

namespace KendoCRUDService.Controllers
{
    public class TwitterController : Controller
    {
        //
        // GET: /Twitter/
        public ActionResult Search(string q, long? since_id, long? max_id, int? count, int? page, string callback)
        {
            string data = "{}";
            string contentType = "application/json";

            if (!string.IsNullOrWhiteSpace(q))
            {
                var service = new TwitterService(GetAppSetting("ConsumerKey"), GetAppSetting("ConsumerSecret"));
                service.AuthenticateWith(GetAppSetting("AccessToken"), GetAppSetting("AccessTokenSecret"));

                var result = service.Search(new SearchOptions
                {
                    Q = q,
                    Count = count ?? 15,
                    MaxId = max_id ?? 0,
                    SinceId = since_id ?? 0
                });

                if (result != null)
                {
                    data = result.RawSource;
                }
            }

            if (!string.IsNullOrWhiteSpace(callback))
            {
                data = string.Format("{0}({1})", callback, data);
                contentType = "application/javascript";
            }

            return new ContentResult
            {
                Content = data,
                ContentType = contentType
            };
        }

        private string GetAppSetting(string key)
        {
            return ConfigurationManager.AppSettings[key].ToString();
        }
    }
}
