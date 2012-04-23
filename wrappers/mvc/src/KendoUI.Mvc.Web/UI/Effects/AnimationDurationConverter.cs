// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

using System.Collections.Generic;
using System.Globalization;

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Helper class to convert jQuery Animation Duration.
    /// </summary>
    public static class AnimationDurationConverter
    {
        private static readonly IDictionary<int, string> durationMap = BuildMap();

        /// <summary>
        /// Converts specified duration in jQuery equivalent value.
        /// </summary>
        /// <param name="duration">The duration.</param>
        /// <returns></returns>
        public static string ToString(int duration)
        {
            return durationMap.ContainsKey(duration) ? durationMap[duration] : duration.ToString(CultureInfo.InvariantCulture);
        }

        private static IDictionary<int, string> BuildMap()
        {
            var map = new Dictionary<int, string>
                          {
                              {
                                  (int) AnimationDuration.Fast, "'fast'"
                                  },
                              {
                                  (int) AnimationDuration.Normal, "'normal'"
                                  },
                              {
                                  (int) AnimationDuration.Slow, "'slow'"
                                  }
                          };

            return map;
        }
    }
}