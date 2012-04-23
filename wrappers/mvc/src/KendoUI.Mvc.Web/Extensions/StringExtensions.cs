// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
{
    using System;
    using System.Globalization;
    using System.IO;
    using System.IO.Compression;
    using System.Text;
    using System.Text.RegularExpressions;
    using Telerik.Web.Mvc.Infrastructure;

    /// <summary>
    /// Contains the extension methods of <see cref="string"/>.
    /// </summary>
    public static class StringExtensions
    {
        private static readonly Regex NameExpression = new Regex("([A-Z]+(?=$|[A-Z][a-z])|[A-Z]?[a-z]+)", RegexOptions.Compiled);

        /// <summary>
        /// Replaces the format item in a specified System.String with the text equivalent of the value of a corresponding System.Object instance in a specified array.
        /// </summary>
        /// <param name="instance">A string to format.</param>
        /// <param name="args">An System.Object array containing zero or more objects to format.</param>
        /// <returns>A copy of format in which the format items have been replaced by the System.String equivalent of the corresponding instances of System.Object in args.</returns>
        public static string FormatWith(this string instance, params object[] args)
        {
            return string.Format(CultureInfo.CurrentCulture, instance, args);
        }

        public static bool HasValue(this string value)
        {
            return !string.IsNullOrEmpty(value);
        }

        /// <summary>
        /// Determines whether this instance and another specified System.String object have the same value.
        /// </summary>
        /// <param name="instance">The string to check equality.</param>
        /// <param name="comparing">The comparing with string.</param>
        /// <returns>
        /// <c>true</c> if the value of the comparing parameter is the same as this string; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsCaseSensitiveEqual(this string instance, string comparing)
        {
            return string.CompareOrdinal(instance, comparing) == 0;
        }

        /// <summary>
        /// Determines whether this instance and another specified System.String object have the same value.
        /// </summary>
        /// <param name="instance">The string to check equality.</param>
        /// <param name="comparing">The comparing with string.</param>
        /// <returns>
        /// <c>true</c> if the value of the comparing parameter is the same as this string; otherwise, <c>false</c>.
        /// </returns>
        public static bool IsCaseInsensitiveEqual(this string instance, string comparing)
        {
            return string.Compare(instance, comparing, StringComparison.OrdinalIgnoreCase) == 0;
        }

        /// <summary>
        /// Compresses the specified instance.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <returns></returns>
        public static string Compress(this string instance)
        {
            Guard.IsNotNullOrEmpty(instance, "instance");

            byte[] binary = Encoding.UTF8.GetBytes(instance);
            byte[] compressed;

            using (MemoryStream ms = new MemoryStream())
            {
                using (GZipStream zip = new GZipStream(ms, CompressionMode.Compress))
                {
                    zip.Write(binary, 0, binary.Length);
                }

                compressed = ms.ToArray();
            }

            byte[] compressedWithLength = new byte[compressed.Length + 4];

            Buffer.BlockCopy(compressed, 0, compressedWithLength, 4, compressed.Length);
            Buffer.BlockCopy(BitConverter.GetBytes(binary.Length), 0, compressedWithLength, 0, 4);

            return Convert.ToBase64String(compressedWithLength);
        }

        /// <summary>
        /// Decompresses the specified instance.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <returns></returns>
        public static string Decompress(this string instance)
        {
            Guard.IsNotNullOrEmpty(instance, "instance");

            var compressed = Decode(instance);
            
            if (compressed.Length < 4)
            {
                return string.Empty;
            }

            using (var stream = new MemoryStream())
            {
                var length = BitConverter.ToInt32(compressed, 0);
                stream.Write(compressed, 4, compressed.Length - 4);

                var binary = new byte[length];

                stream.Seek(0, SeekOrigin.Begin);

                using (var zip = new GZipStream(stream, CompressionMode.Decompress))
                {
                    try
                    {
                        zip.Read(binary, 0, binary.Length);
                        
                        return Encoding.UTF8.GetString(binary);
                    }
                    catch (InvalidDataException)
                    {
                        return string.Empty;
                    }
                }
            }
        }

        private static byte[] Decode(string value)
        {
            try
            {
                return Convert.FromBase64String(value);
            }
            catch (FormatException)
            {
                return new byte[0];
            }
        }

        public static string ToCamelCase(this string instance)
        {
            Guard.IsNotNullOrEmpty(instance, "instance");

            return instance[0].ToString().ToLowerInvariant() + instance.Substring(1);
        }

        public static string AsTitle(this string value)
        {
            if (value == null)
            {
                return string.Empty;
            }

            int lastIndex = value.LastIndexOf(".", StringComparison.Ordinal);

            if (lastIndex > -1)
            {
                value = value.Substring(lastIndex + 1);
            }

            return value.SplitPascalCase();
        }

        public static T ToEnum<T>(this string value, T defaultValue)
        {
            if (!value.HasValue())
            {
                return defaultValue;
            }

            try
            {
                return (T)Enum.Parse(typeof(T), value, true);
            }
            catch (ArgumentException)
            {
                return defaultValue;
            }
        }

        public static string SplitPascalCase(this string value)
        {
            return NameExpression.Replace(value, " $1").Trim();
        }
    }
}