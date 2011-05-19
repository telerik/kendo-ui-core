using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Linq;
using System.Web.Mvc;
using System.Xml.Linq;
using System.Collections;

namespace UploadPhotoToFlickr.Controllers
{
    public class HomeController : Controller
    {
        private string apiKey;
        private string secret;

        [HttpPost]
        public ActionResult Save(IEnumerable<HttpPostedFileBase> photo, string api_key, string secret, string auth_token)
        {
            this.apiKey = api_key;
            this.secret = secret;
            
            return Json(UploadPhotos(photo, auth_token), "text/plain");
        }

        private IEnumerable UploadPhotos(IEnumerable<HttpPostedFileBase> photo, string auth_token)
        {
            foreach (var file in photo)
            {
                string response = UploadData(file.InputStream, file.FileName, new Dictionary<string, string> {
                    {"api_key", apiKey},
                    {"auth_token", auth_token}
                });

                XElement rsp = XElement.Parse(response);
                XElement photoIdElement = rsp.Element("photoid");

                var stat = rsp.Attribute("stat").Value;
                var photoId = string.Empty;
                if (photoIdElement != null)
                {
                    photoId = photoIdElement.Value;
                } 
                
                yield return new { stat = stat, photoid = photoId };
            }
        }

        private string UploadData(Stream imageStream, string fileName, Dictionary<string, string> parameters)
        {
            string boundary = "FLICKR_MIME_" + DateTime.Now.ToString("yyyyMMddhhmmss", System.Globalization.DateTimeFormatInfo.InvariantInfo);

            byte[] dataBuffer = CreateUploadData(imageStream, fileName, parameters, boundary);
            HttpWebRequest req = (HttpWebRequest)HttpWebRequest.Create("http://api.flickr.com/services/upload/");
            
            req.Method = "POST";
            req.Timeout = 100000;
            req.ContentType = "multipart/form-data; boundary=" + boundary;

            req.ContentLength = dataBuffer.Length;

            using (Stream resStream = req.GetRequestStream())
            {
                int j = 1;
                int uploadBit = Math.Max(dataBuffer.Length / 100, 50 * 1024);
                int uploadSoFar = 0;

                for (int i = 0; i < dataBuffer.Length; i = i + uploadBit)
                {
                    int toUpload = Math.Min(uploadBit, dataBuffer.Length - i);
                    uploadSoFar += toUpload;

                    resStream.Write(dataBuffer, i, toUpload);
                }
            }

            HttpWebResponse res = (HttpWebResponse)req.GetResponse();
            using (StreamReader sr = new StreamReader(res.GetResponseStream()))
            {
                return sr.ReadToEnd();
            }
        }

        private byte[] CreateUploadData(Stream imageStream, string fileName, Dictionary<string, string> parameters, string boundary)
        {
            string[] keys = new string[parameters.Keys.Count];
            parameters.Keys.CopyTo(keys, 0);
            Array.Sort(keys);

            StringBuilder hashStringBuilder = new StringBuilder(secret, 2 * 1024);
            StringBuilder contentStringBuilder = new StringBuilder();

            foreach (string key in parameters.Keys)
            {
                hashStringBuilder.Append(key);
                hashStringBuilder.Append(parameters[key]);
                contentStringBuilder.Append("--" + boundary + "\r\n");
                contentStringBuilder.Append("Content-Disposition: form-data; name=\"" + key + "\"\r\n");
                contentStringBuilder.Append("\r\n");
                contentStringBuilder.Append(parameters[key] + "\r\n");
            }

            contentStringBuilder.Append("--" + boundary + "\r\n");
            contentStringBuilder.Append("Content-Disposition: form-data; name=\"api_sig\"\r\n");
            contentStringBuilder.Append("\r\n");
            contentStringBuilder.Append(MD5Hash(hashStringBuilder.ToString()) + "\r\n");

            // Photo
            contentStringBuilder.Append("--" + boundary + "\r\n");
            contentStringBuilder.Append("Content-Disposition: form-data; name=\"photo\"; filename=\"" + fileName + "\"\r\n");
            contentStringBuilder.Append("Content-Type: image/jpeg\r\n");
            contentStringBuilder.Append("\r\n");

            UTF8Encoding encoding = new UTF8Encoding();

            byte[] postContents = encoding.GetBytes(contentStringBuilder.ToString());

            byte[] photoContents = ConvertNonSeekableStreamToByteArray(imageStream);

            byte[] postFooter = encoding.GetBytes("\r\n--" + boundary + "--\r\n");

            byte[] dataBuffer = new byte[postContents.Length + photoContents.Length + postFooter.Length];

            Buffer.BlockCopy(postContents, 0, dataBuffer, 0, postContents.Length);
            Buffer.BlockCopy(photoContents, 0, dataBuffer, postContents.Length, photoContents.Length);
            Buffer.BlockCopy(postFooter, 0, dataBuffer, postContents.Length + photoContents.Length, postFooter.Length);

            return dataBuffer;
        }

        private byte[] ConvertNonSeekableStreamToByteArray(Stream nonSeekableStream)
        {
            MemoryStream ms = new MemoryStream();
            byte[] buffer = new byte[1024];
            int bytes;
            while ((bytes = nonSeekableStream.Read(buffer, 0, buffer.Length)) > 0)
            {
                ms.Write(buffer, 0, bytes);
            }
            byte[] output = ms.ToArray();
            return output;
        }

        public static string MD5Hash(string data)
        {
            var csp = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(data);
            byte[] hashedBytes = csp.ComputeHash(bytes, 0, bytes.Length);
            return BitConverter.ToString(hashedBytes).Replace("-", String.Empty).ToLower(System.Globalization.CultureInfo.InvariantCulture);
        }
    }
}
