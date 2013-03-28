using System.Configuration;
using System.Web.Mvc;
using Twitterizer;

namespace KendoCRUDService.Controllers
{
    public class TwitterController : Controller
    {
        //
        // GET: /Twitter/
        public ActionResult Search(string q, decimal? since_id, decimal? max_id, int? count, int? page, string callback)
        {
            string data = "{}";
            string contentType = "application/json";

            if (!string.IsNullOrWhiteSpace(q))
            {
                OAuthTokens tokens = new OAuthTokens();
                tokens.ConsumerKey = ConfigurationManager.AppSettings["ConsumerKey"].ToString();
                tokens.ConsumerSecret = ConfigurationManager.AppSettings["ConsumerSecret"].ToString();

                TwitterResponse<Twitterizer.TwitterSearchResultCollection> searchResult = TwitterSearch.Search(tokens, q, new SearchOptions
                {
                    MaxId = max_id ?? 0,
                    SinceId = since_id ?? 0,
                    NumberPerPage = count ?? 15,
                    PageNumber = page ?? 1
                });

                data = searchResult.Content;
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
    }
}
