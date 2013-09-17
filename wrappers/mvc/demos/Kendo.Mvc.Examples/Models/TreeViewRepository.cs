using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Models
{
    public static class TreeViewRepository
    {
        private static List<TreeViewItemViewModel> projectData;

        static TreeViewRepository()
        {            
            projectData = new List<TreeViewItemViewModel>();
            projectData.Add(new TreeViewItemViewModel
                {
                    id = "1",
                    text = "My Documents",
                    expanded = true,
                    hasChildren = true,
                    spriteCssClass = "rootfolder",
                    items = new List<TreeViewItemViewModel>
                       {
                           new TreeViewItemViewModel
                           {
                                id = "2",
                                text = "Kendo UI Project",
                                expanded  = true,
                                spriteCssClass = "folder",
                                hasChildren = true,
                                items = new List<TreeViewItemViewModel>
                                {
                                    new TreeViewItemViewModel
                                    {
                                            id = "3",
                                            text ="about.html",
                                            spriteCssClass = "html"                                               
                                    },
                                    new TreeViewItemViewModel
                                    {
                                            id = "4",
                                            text ="index.html",
                                            spriteCssClass = "html"                                               
                                    },
                                    new TreeViewItemViewModel
                                    {
                                            id = "5",
                                            text ="logo.png",
                                            spriteCssClass = "image"                                               
                                    }
                                }
                           },
                           new TreeViewItemViewModel
                           {
                                id = "6",
                                text = "New Web Site",
                                expanded  = true,
                                spriteCssClass = "folder",
                                hasChildren = true,
                                items = new List<TreeViewItemViewModel>
                                {
                                    new TreeViewItemViewModel
                                    {
                                            id = "7",
                                            text ="mockup.jpg",
                                            spriteCssClass = "image"                                               
                                    },
                                    new TreeViewItemViewModel
                                    {
                                            id = "8",
                                            text ="Research.pdf",
                                            spriteCssClass = "pdf"                                               
                                    }
                                }
                           },
                           new TreeViewItemViewModel
                           {
                                id = "9",
                                text = "Reports",
                                expanded  = true,
                                spriteCssClass = "folder",
                                hasChildren = true,
                                items = new List<TreeViewItemViewModel>
                                {
                                    new TreeViewItemViewModel
                                    {
                                            id = "10",
                                            text ="February.pdf",
                                            spriteCssClass = "pdf"                                               
                                    },
                                    new TreeViewItemViewModel
                                    {
                                            id = "11",
                                            text ="March.pdf",
                                            spriteCssClass = "pdf"                                               
                                    },
                                        new TreeViewItemViewModel
                                    {
                                            id = "12",
                                            text ="April.pdf",
                                            spriteCssClass = "pdf"                                               
                                    }
                                }
                           }
                       }
                });

        }

        public static List<TreeViewItemViewModel> GetProjectData()
        {
            return projectData;
        }

        public static IEnumerable<TreeViewItemViewModel> GetChildren(string id)
        {            
            Queue<TreeViewItemViewModel> items = new Queue<TreeViewItemViewModel>(projectData);
           
            while (items.Count > 0)
            {
                var current = items.Dequeue();
                if (current.id == id)
                {
                    return current.items.Select(o => new TreeViewItemViewModel
                        {
                            id = o.id,
                            text = o.text,
                            expanded = o.expanded,
                            hasChildren = o.hasChildren,
                            imageUrl = o.imageUrl,
                            spriteCssClass = o.spriteCssClass
                        });
                }

                if (current.hasChildren)
                {
                    foreach (var item in current.items)
                    {
                        items.Enqueue(item);
                    }
                }
            }

            return new List<TreeViewItemViewModel>();
        }
    }           
}