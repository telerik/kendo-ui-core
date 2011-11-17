(function () {

    // Imports ================================================================
    var kendo = window.kendo,
        Chart = kendo.ui.Chart,
        deepExtend = Chart.deepExtend;

    // Constants ==============================================================
    var BLACK = "#000",
        SANS = "Arial,Helvetica,sans-serif",
        SANS11 = "11px " + SANS,
        SANS12 = "12px " + SANS,
        SANS16 = "16px " + SANS,
        WHITE = "#fff";

    // Kendo themes ===========================================================
    var baseTheme = {
            title: {
                font: SANS16
            },
            legend: {
                labels: {
                    font: SANS12
                }
            },
            seriesDefaults: {
                labels: {
                    font: SANS11
                }
            },
            categoryAxis: {
                labels: {
                    font: SANS12
                }
            },
            valueAxis: {
                labels: {
                    font: SANS12
                }
            },
            tooltip: {
                font: SANS12
            }
        };

    var themes = { };

    themes.black = deepExtend({}, baseTheme, {
        title: {
            color: WHITE
        },
        legend: {
            labels: {
                color: WHITE
            }
        },
        seriesDefaults: {
            labels: {
                color: WHITE
            },
            pie: {
                highlight: {
                    opacity: 0.6,
                    color: "#393939",
                    border: {
                        width: 0.5,
                        opacity: 0.9,
                        color: "#000"
                    }
                },
                overlay: {
                    gradient: "sharpBevel"
                }
            },
            line: {
                markers: {
                    background: "#393939"
                }
            },
            scatter: {
                markers: {
                    background: "#393939"
                }
            },
            scatterLine: {
                markers: {
                    background: "#393939"
                }
            }
        },
        chartArea: {
            background: "#393939"
        },
        seriesColors: ["#0081da", "#3aafff", "#99c900", "#ffeb3d", "#b20753", "#ff4195"],
        categoryAxis: {
            line: {
                color: "#808184"
            },
            labels: {
                color: WHITE
            },
            majorGridLines: {
                visible: true
            }
        },
        valueAxis: {
            line: {
                color: "#808184"
            },
            labels: {
                color: WHITE
            },
            majorGridLines: {
                color: "#58595b"
            }
        },
        tooltip: {
            background: "#393939",
            color: WHITE,
            opacity: 0.8
        }
    });

    themes.hakama = deepExtend({}, baseTheme, {
        title: {
            color: "#8e8e8e"
        },
        legend: {
            labels: {
                color: "#232323"
            }
        },
        seriesDefaults: {
            labels: {
                color: BLACK,
                background: WHITE,
                opacity: 0.5
            }
        },
        seriesColors: ["#ff5400", "#ff8b24", "#ffc066", "#9da600", "#688900", "#3e6100"],
        categoryAxis: {
            line: {
                color: "#8e8e8e"
            },
            labels: {
                color: "#232323"
            }
        },
        valueAxis: {
            line: {
                color: "#8e8e8e"
            },
            labels: {
                color: "#232323"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK,
            opacity: 0.8
        }
    });

    themes.blueopal = deepExtend({}, baseTheme, {
        title: {
            color: "#293135"
        },
        legend: {
            labels: {
                color: "#293135"
            }
        },
        seriesDefaults: {
            labels: {
                color: BLACK,
                background: WHITE,
                opacity: 0.5
            }
        },
        seriesColors: ["#0069a5", "#0098ee", "#7bd2f6", "#ffb800", "#ff8517", "#e34a00"],
        categoryAxis: {
            line: {
                color: "#9aabb2"
            },
            labels: {
                color: "#293135"
            },
            majorGridLines: {
                color: "#c4d0d5",
                visible: true
            }
        },
        valueAxis: {
            line: {
                color: "#9aabb2"
            },
            labels: {
                color: "#293135"
            },
            majorGridLines: {
                color: "#c4d0d5"
            }
        },
        tooltip: {
            background: WHITE,
            color: BLACK,
            opacity: 0.8
        }
    });

    // Exports ================================================================
    Chart.themes = themes;
    Chart.prototype.options.theme = "hakama";

})(jQuery);

