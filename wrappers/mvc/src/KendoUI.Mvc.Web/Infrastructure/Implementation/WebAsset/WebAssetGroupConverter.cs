// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Script.Serialization;
    using Telerik.Web.Mvc.Extensions;

    internal class WebAssetGroupConverter : JavaScriptConverter
    {
        private const string DirectoriesKey = "d";
        private const string ContentTypeKey = "ct";
        private const string VersionKey = "v";
        private const string CacheDurationKey = "cd";
        private const string CompressKey = "c";
        private const string PathKey = "p";
        private const string FilesKey = "f";
        private const string NameKey = "n";
        private const string OrderKey = "o";

        public override object Deserialize(IDictionary<string, object> dictionary, Type type, JavaScriptSerializer serializer)
        {
            var group = new WebAssetGroup("", false);

            SetIfPresent<bool>(dictionary, CompressKey, compress => group.Compress = compress);
            SetIfPresent<float>(dictionary, CacheDurationKey, cacheDuration => group.CacheDurationInDays = cacheDuration);
            SetIfPresent<string>(dictionary, VersionKey, version => group.Version = version);
            SetIfPresent<string>(dictionary, ContentTypeKey, contentType => group.ContentType = contentType);
            SetIfPresent<IEnumerable<IDictionary<string, object>>>(dictionary, DirectoriesKey, directories =>
            {
                var orderedFiles = directories.SelectMany(directory =>
                {
                    var path = serializer.ConvertToType<string>(directory[PathKey]);
                    var files = serializer.ConvertToType<IEnumerable<IDictionary<string, object>>>(directory[FilesKey]);
                    return files.Select(file => new
                    {
                        Source = "~/" + path + "/" + serializer.ConvertToType<string>(file[NameKey]),
                        Order = serializer.ConvertToType<int>(file[OrderKey])
                    });
                });

                orderedFiles.OrderBy(file => file.Order)
                            .Select(file => new WebAsset(file.Source))
                            .Each(group.Items.Add);
            });

            return group;
        }

        public override IDictionary<string, object> Serialize(object obj, JavaScriptSerializer serializer)
        {
            var group = (WebAssetGroup)obj;

            var result = new Dictionary<string, object>();

            var directories = group.Items
                .GroupBy(GetDirectoryName, StringComparer.OrdinalIgnoreCase)
                .Select(grouping => DirectoryToDictionary(grouping, group.Items));

            result[DirectoriesKey] = directories;
            result[ContentTypeKey] = group.ContentType;
            result[VersionKey] = group.Version;
            result[CacheDurationKey] = group.CacheDurationInDays;
            result[CompressKey] = group.Compress;

            return result;
        }

        public override IEnumerable<Type> SupportedTypes
        {
            get
            {
                return new[] { typeof(WebAssetGroup) };
            }
        }

        private string GetDirectoryName(WebAsset asset)
        {
            return asset.Source.Substring(2, asset.Source.LastIndexOf("/") - 2);
        }

        private IDictionary<string, object> DirectoryToDictionary(IGrouping<string, WebAsset> grouping, IList<WebAsset> assets)
        {
            return new Dictionary<string, object> { { PathKey, grouping.Key }, { FilesKey, grouping.Select(asset => FileToDictionary(asset, assets.IndexOf(asset))) } };
        }

        private IDictionary<string, object> FileToDictionary(WebAsset asset, int order)
        {
            return new Dictionary<string, object> { { NameKey, asset.FileName }, { OrderKey, order } };
        }

        private static void SetIfPresent<T>(IDictionary<string, object> dictionary, string key, Action<T> setter)
        {
            if (dictionary.ContainsKey(key))
            {
                var serializer = new JavaScriptSerializer();

                setter(serializer.ConvertToType<T>(dictionary[key]));
            }
        }
    }
}
