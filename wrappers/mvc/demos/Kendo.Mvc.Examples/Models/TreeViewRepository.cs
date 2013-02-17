using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Models
{
    public static class TreeViewRepository
    {
        private static List<ClientTreeViewItemModel> projectData;

        static TreeViewRepository()
        {            
            projectData = new List<ClientTreeViewItemModel>();
            projectData.Add(new ClientTreeViewItemModel
                {
                    id = "1",
                    text = "My Documents",
                    expanded = true,
                    hasChildren = true,
                    spriteCssClass = "rootfolder",
                    items = new List<ClientTreeViewItemModel>
                       {
                           new ClientTreeViewItemModel
                           {
                                id = "2",
                                text = "Kendo UI Project",
                                expanded  = true,
                                spriteCssClass = "folder",
                                hasChildren = true,
                                items = new List<ClientTreeViewItemModel>
                                {
                                    new ClientTreeViewItemModel
                                    {
                                            id = "3",
                                            text ="about.html",
                                            spriteCssClass = "html"                                               
                                    },
                                    new ClientTreeViewItemModel
                                    {
                                            id = "4",
                                            text ="index.html",
                                            spriteCssClass = "html"                                               
                                    },
                                    new ClientTreeViewItemModel
                                    {
                                            id = "5",
                                            text ="logo.png",
                                            spriteCssClass = "image"                                               
                                    }
                                }
                           },
                           new ClientTreeViewItemModel
                           {
                                id = "6",
                                text = "New Web Site",
                                expanded  = true,
                                spriteCssClass = "folder",
                                hasChildren = true,
                                items = new List<ClientTreeViewItemModel>
                                {
                                    new ClientTreeViewItemModel
                                    {
                                            id = "7",
                                            text ="mockup.jpg",
                                            spriteCssClass = "image"                                               
                                    },
                                    new ClientTreeViewItemModel
                                    {
                                            id = "8",
                                            text ="Research.pdf",
                                            spriteCssClass = "pdf"                                               
                                    }
                                }
                           },
                           new ClientTreeViewItemModel
                           {
                                id = "9",
                                text = "Reports",
                                expanded  = true,
                                spriteCssClass = "folder",
                                hasChildren = true,
                                items = new List<ClientTreeViewItemModel>
                                {
                                    new ClientTreeViewItemModel
                                    {
                                            id = "10",
                                            text ="February.pdf",
                                            spriteCssClass = "pdf"                                               
                                    },
                                    new ClientTreeViewItemModel
                                    {
                                            id = "11",
                                            text ="March.pdf",
                                            spriteCssClass = "pdf"                                               
                                    },
                                        new ClientTreeViewItemModel
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

        public static List<ClientTreeViewItemModel> GetProjectData()
        {
            return projectData;
        }

        public static IEnumerable<ClientTreeViewItemModel> GetChildren(string id)
        {            
            Queue<ClientTreeViewItemModel> items = new Queue<ClientTreeViewItemModel>(projectData);
           
            while (items.Count > 0)
            {
                var current = items.Dequeue();
                if (current.id == id)
                {
                    return current.items.Select(o => new ClientTreeViewItemModel
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

            return new List<ClientTreeViewItemModel>();
        }
    }           
}