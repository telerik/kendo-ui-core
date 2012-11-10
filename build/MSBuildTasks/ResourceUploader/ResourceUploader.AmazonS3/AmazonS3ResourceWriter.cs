using System;
using LitS3;
using ResourceUploader.Core;
using System.Collections.Generic;

namespace ResourceUploader.AmazonS3
{
	public class AmazonS3ResourceWriter : IResourceFilter
	{
		private const string CacheControlHeader = "public, max-age=31536000";
		private const string GZipContentEncodingHeader = "gzip";
		private static readonly DateTime ExpirationDate = DateTime.Now.AddYears(10);
		private static readonly Dictionary<MimeType, string> MimeTypeStrings = new Dictionary<MimeType, string>
		{
			{ MimeType.JavaScript, "application/x-javascript" },
			{ MimeType.StyleSheet, "text/css" },
			{ MimeType.ImagePng, "image/png" },
			{ MimeType.ImageGif, "image/gif" },
			{ MimeType.ImageJpeg, "image/jpeg" },
			{ MimeType.ImageIco, "image/vnd.microsoft.icon" },
			{ MimeType.ImageCur, "application/octet-stream" },
            { MimeType.Font, "application/octet-stream" }
		};

		private string AccessKeyID { get; set; }
		private string SecretAccessKey { get; set; }
		private string BucketName { get; set; }
		private string RemotePath { get; set; }

		public AmazonS3ResourceWriter(string accessKeyID, string secretAccessKey, string bucketName, string remotePath)
		{
			AccessKeyID = accessKeyID;
			SecretAccessKey = secretAccessKey;
			BucketName = bucketName;
			RemotePath = remotePath;
		}

		public IResource Filter(IResource source)
		{
			var relativeUrl = source.RelativePath.Replace('\\', '/');
			var key = string.Format("{0}/{1}", RemotePath, relativeUrl);

			var service = new S3Service
			{
				AccessKeyID = AccessKeyID,
				SecretAccessKey = SecretAccessKey,
				UseSsl = true
			};

			var request = new AddObjectRequest(service, BucketName, key)
			{
				ContentLength = source.ContentStream.Length,
				CannedAcl = CannedAcl.PublicRead,
				CacheControl = CacheControlHeader,
				ContentType = MimeTypeStrings[source.Type],
				Expires = ExpirationDate
			};

			if (source.Encoding == ContentEncoding.GZip)
				request.ContentEncoding = GZipContentEncodingHeader;

			request.PerformWithRequestStream(responseStream =>
			{
				source.ContentStream.CopyTo(responseStream);
				responseStream.Flush();
			});

			return null;
		}
	}
}
