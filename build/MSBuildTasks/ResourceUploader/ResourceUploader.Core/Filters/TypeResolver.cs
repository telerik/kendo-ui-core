using System.Collections.Generic;
using System.IO;

namespace ResourceUploader.Core
{
	public class TypeResolver : IResourceFilter
	{
		private static readonly Dictionary<string, MimeType> MimeTypes = new Dictionary<string, MimeType>
		{
			{ ".js", MimeType.JavaScript },
			{ ".css", MimeType.StyleSheet },
			{ ".png", MimeType.ImagePng },
			{ ".gif", MimeType.ImageGif },
			{ ".jpeg", MimeType.ImageJpeg },
			{ ".jpg", MimeType.ImageJpeg },
			{ ".ico", MimeType.ImageIco },
			{ ".cur", MimeType.ImageCur },
            { ".ttf", MimeType.Font },
            { ".woff", MimeType.Font }
		};

		public IResource Filter(IResource source)
		{
			var resourceExt = Path.GetExtension(source.Name).ToLower();

			if (MimeTypes.ContainsKey(resourceExt))
			{
				return new DynamicResource(source.ContentStream, source) { Type = MimeTypes[resourceExt] };
			}

			// Drops unknown resources from the pipeline
			return null;
		}
	}
}
