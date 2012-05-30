namespace Kendo.Mvc.Infrastructure
{
    using System;
    using System.Collections.Generic;

    public class FluentDictionary
    {
        private readonly IDictionary<string, object> dictionary;

        internal FluentDictionary(IDictionary<string,object> dictionary)
        {
            this.dictionary = dictionary;
        }

        public static FluentDictionary For(IDictionary<string, object> dictionary)
        {
            return new FluentDictionary(dictionary);
        }

        public FluentDictionary Add<T>(string key, T value)
        {
            dictionary[key] = value;
            return this;
        }

        public FluentDictionary Add<T>(string key, T value, T defaultValue)
            where T : IComparable
        {
            if (value != null && value.CompareTo(defaultValue) != 0)
            {
                dictionary[key] = value;
            }

            return this;
        }

        public FluentDictionary Add<T>(string key, T value, Func<bool> condition)
        {
            if (condition())
            {
                dictionary[key] = value;
            }

            return this;
        }
    }
}
