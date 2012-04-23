// (c) Copyright 2002-2011 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    public class FitImageResizer : IImageResizer
    {
        public ImageSize Resize(ImageSize originalSize, ImageSize targetSize)
        {
            var aspectRatio = (float)originalSize.Width / (float)originalSize.Height;
            var width = targetSize.Width;
            var height = targetSize.Height;

            if (originalSize.Width > targetSize.Width || originalSize.Height > targetSize.Height)
            {
                if (aspectRatio > 1)
                {
                    height = (int)(targetSize.Height / aspectRatio);
                }
                else
                {
                    width = (int)(targetSize.Width * aspectRatio);
                }
            }
            else
            {
                width = originalSize.Width;
                height = originalSize.Height;
            }

            return new ImageSize
                       {
                           Width = Math.Max(width, 1),
                           Height = Math.Max(height, 1)
                       };
        }
    }
}