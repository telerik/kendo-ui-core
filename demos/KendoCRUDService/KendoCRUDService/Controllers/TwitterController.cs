using KendoCRUDService.Common;
using System.Configuration;
using System.IO;
using System.Text;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Twitterizer;

namespace KendoCRUDService.Controllers
{
    public class TwitterController : Controller
    {
        //
        // GET: /Twitter/
        public ActionResult Search(string q, decimal? since_id, decimal? max_id, int? count, string callback)
        {
            string data = "{}";

            if (!string.IsNullOrWhiteSpace(q))
            {
                OAuthTokens tokens = new OAuthTokens();
                tokens.ConsumerKey = ConfigurationManager.AppSettings["ConsumerKey"].ToString();
                tokens.ConsumerSecret = ConfigurationManager.AppSettings["ConsumerSecret"].ToString();

                TwitterResponse<Twitterizer.TwitterSearchResultCollection> searchResult = TwitterSearch.Search(tokens, q, new SearchOptions
                {
                    MaxId = max_id ?? 0,
                    SinceId = since_id ?? 0,
                    NumberPerPage = count ?? 15
                });

                data = searchResult.Content;
            }

            return new ContentResult
            {
                Content = string.IsNullOrWhiteSpace(callback) ? data : string.Format("{0}({1})", callback, data),
                ContentType = "application/json"
            };
        }
    }
}
