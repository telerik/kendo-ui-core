// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using Telerik.Web.Mvc.Extensions;

    public static class AnimationExtensions
    {
        public static void Serialize(this IClientSideObjectWriter objectWriter, string propertyName, IEffectContainer effects)
        {
            var effectSerialization = new List<string>();

            var propertyAnimations = new List<PropertyAnimation>();

            effects.Container.Each(e =>
            {
                if (e is PropertyAnimation)
                {
                    propertyAnimations.Add(e as PropertyAnimation);
                }
                else
                {
                    effectSerialization.Add(e.Serialize());
                }
            });

            if (propertyAnimations.Count > 0)
            {
                propertyAnimations.Each(e => effects.Container.Remove(e));

                var animatedProperties = new List<string>();

                propertyAnimations.Each(e =>
                    animatedProperties.Add(
                        e.AnimationType.ToString().ToLower(CultureInfo.InvariantCulture)));

                effectSerialization.Add(
                    String.Format("{{name:'property',properties:['{0}']}}",
                        String.Join("','", animatedProperties.ToArray())));
            }

            objectWriter.Append("{0}:{{list:[{1}],openDuration:{2},closeDuration:{3}}}".FormatWith(propertyName, 
                                                                                   String.Join(",", effectSerialization.ToArray()), 
                                                                                   effects.OpenDuration, effects.CloseDuration));
        }
    }
}
