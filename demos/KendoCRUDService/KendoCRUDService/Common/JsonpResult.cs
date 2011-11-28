using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Web.Script.Serialization;

namespace KendoCRUDService.Common
{
    public class JsonpResult : JsonResult
    {
        public JsonpResult(string callbackName)
        {
            CallbackName = callbackName;
        }

        public JsonpResult() : this("jsoncallback")
        {
        }

        public string CallbackName { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            var request = context.HttpContext.Request;
            var response = context.HttpContext.Response;

            string jsoncallback = ((context.RouteData.Values[CallbackName] as string) ?? request[CallbackName]) ?? CallbackName;

            if (!string.IsNullOrEmpty(jsoncallback))
            {
                if (string.IsNullOrEmpty(base.ContentType))
                {
                    base.ContentType = "application/x-javascript";
                }
                response.Write(string.Format("{0}(", jsoncallback));
            }

            base.ExecuteResult(context);

            if (!string.IsNullOrEmpty(jsoncallback))
            {
                response.Write(")");
            }
        }
    }

    public static class ControllerExtensions
    {
        public static JsonpResult Jsonp(this Controller controller, object data, string callbackName = "callback")
        {
            return new JsonpResult(callbackName)
            {
                Data = data,
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
        }

        public static T DeserializeObject<T>(this Controller controller, string key) where T : class
        {
            var value = controller.HttpContext.Request.QueryString.Get(key);
            if (string.IsNullOrEmpty(value))
            {
                return null;
            }
            JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
            return javaScriptSerializer.Deserialize<T>(value);            
        }
    }
   
}