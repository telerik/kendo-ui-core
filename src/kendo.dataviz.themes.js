(function () {

    // Imports ================================================================
    var kendo = window.kendo,
        dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend;

    // Constants ==============================================================
    var BLACK = "#000",
        SANS = "Arial,Helvetica,sans-serif",
        SANS11 = "11px " + SANS,
        SANS12 = "12px " + SANS,
        SANS16 = "16px " + SANS,
        WHITE = "#fff";

    // Chart themes ============================================================
    var chartBaseTheme = {
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
            axisDefaults: {
                labels: {
                    font: SANS12
                },
                title: {
                    font: SANS16,
                    margin: 5
                }
            },
            tooltip: {
                font: SANS12
            }
        };

    var chartThemes = {
        black: deepExtend({}, chartBaseTheme, {
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
                        color: "#3d3d3d",
                        border: {
                            width: 0.5,
                            opacity: 0.9,
                            color: BLACK
                        }
                    },
                    overlay: {
                        gradient: "sharpBevel"
                    }
                },
                line: {
                    markers: {
                        background: "#3d3d3d"
                    }
                },
                scatter: {
                    markers: {
                        background: "#3d3d3d"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#3d3d3d"
                    }
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                }
            },
            chartArea: {
                background: "#3d3d3d"
            },
            seriesColors: ["#0081da", "#3aafff", "#99c900", "#ffeb3d", "#b20753", "#ff4195"],
            categoryAxis: {
                majorGridLines: {
                    visible: true
                }
            },
            axisDefaults: {
                line: {
                    color: "#8e8e8e"
                },
                labels: {
                    color: WHITE
                },
                majorGridLines: {
                    color: "#545454"
                },
                minorGridLines: {
                    color: "#454545"
                },
                title: {
                    color: WHITE
                }
            },
            tooltip: {
                background: "#3d3d3d",
                color: WHITE,
                opacity: 0.8
            }
        }),

        "default": deepExtend({}, chartBaseTheme, {
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
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                }
            },
            seriesColors: ["#ff6800", "#a0a700", "#ff8d00", "#678900", "#ffb53c", "#396000"],
            categoryAxis: {
                majorGridLines: {
                    visible: true
                }
            },
            axisDefaults: {
                line: {
                    color: "#8e8e8e"
                },
                labels: {
                    color: "#232323"
                },
                minorGridLines: {
                    color: "#f0f0f0"
                },
                majorGridLines: {
                    color: "#dfdfdf"
                },
                title: {
                    color: "#232323"
                }
            },
            tooltip: {
                background: WHITE,
                color: BLACK,
                opacity: 0.8
            }
        }),

        blueopal: deepExtend({}, chartBaseTheme, {
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
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                }
            },
            seriesColors: ["#0069a5", "#0098ee", "#7bd2f6", "#ffb800", "#ff8517", "#e34a00"],
            categoryAxis: {
                majorGridLines: {
                    visible: true
                }
            },
            axisDefaults: {
                line: {
                    color: "#9aabb2"
                },
                labels: {
                    color: "#293135"
                },
                majorGridLines: {
                    color: "#c4d0d5"
                },
                minorGridLines: {
                    color: "#edf1f2"
                },
                title: {
                    color: "#293135"
                }
            },
            tooltip: {
                background: WHITE,
                color: BLACK,
                opacity: 0.8
            }
        }),

        silver: deepExtend({}, chartBaseTheme, {
            title: {
                color: "#4e5968"
            },
            legend: {
                labels: {
                    color: "#4e5968"
                }
            },
            seriesDefaults: {
                labels: {
                    color: "#293135",
                    background: "#eaeaec",
                    opacity: 0.5
                },
                line: {
                    markers: {
                        background: "#eaeaec"
                    }
                },
                scatter: {
                    markers: {
                        background: "#eaeaec"
                    }
                },
                scatterLine: {
                    markers: {
                        background: "#eaeaec"
                    }
                },
                pie: {
                    connectors: {
                        color: "#A6B1C0"
                    }
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                }
            },
            chartArea: {
                background: "#eaeaec"
            },
            seriesColors: ["#007bc3", "#76b800", "#ffae00", "#ef4c00", "#a419b7", "#430B62"],
            categoryAxis: {
                majorGridLines: {
                    visible: true
                }
            },
            axisDefaults: {
                line: {
                    color: "#a6b1c0"
                },
                labels: {
                    color: "#4e5968"
                },
                majorGridLines: {
                    color: "#dcdcdf"
                },
                minorGridLines: {
                    color: "#eeeeef"
                },
                title: {
                    color: "#4e5968"
                }
            },
            tooltip: {
                background: WHITE,
                color: "#4e5968",
                opacity: 0.8
            }
        }),

        metro: deepExtend({}, chartBaseTheme, {
            title: {
                color: "#777777"
            },
            legend: {
                labels: {
                    color: "#777777"
                }
            },
            seriesDefaults: {
                labels: {
                    color: BLACK
                },
                area: {
                    opacity: 0.4,
                    markers: {
                        visible: false,
                        size: 6
                    }
                }
            },
            seriesColors: ["#25a0da", "#309b46", "#8ebc00", "#ff6900", "#e61e26", "#d8e404", "#16aba9", "#7e51a1", "#313131", "#ed1691"],
            categoryAxis: {
                majorGridLines: {
                    visible: true
                }
            },
            axisDefaults: {
                line: {
                    color: "#c7c7c7"
                },
                labels: {
                    color: "#777777"
                },
                minorGridLines: {
                    color: "#c7c7c7"
                },
                majorGridLines: {
                    color: "#c7c7c7"
                },
                title: {
                    color: "#777777"
                }
            },
            tooltip: {
                background: WHITE,
                color: BLACK
            }
        })
    };


    // Gauge themes ===========================================================

    var gaugeBaseTheme = {
        scale: {
            labels: {
                font: SANS12
            }
        }
    };

    var gaugeThemes = {
        black: deepExtend({}, gaugeBaseTheme, {
            pointer: {
                color: "#0070e4"
            },
            scale: {
                rangePlaceholderColor: "#1d1d1d",

                labels: {
                    color: WHITE
                },
                minorTicks: {
                    color: WHITE
                },
                majorTicks: {
                    color: WHITE
                }
            }
        }),

        blueopal: deepExtend({}, gaugeBaseTheme, {
            pointer: {
                color: "#005c83"
            },
            scale: {
                rangePlaceholderColor: "#daecf4",

                labels: {
                    color: "#293135"
                },
                minorTicks: {
                    color: "#293135"
                },
                majorTicks: {
                    color: "#293135"
                }
            }
        }),

        "default": deepExtend({}, gaugeBaseTheme, {
            pointer: {
                color: "#ea7001"
            },
            scale: {
                rangePlaceholderColor: "#dedede",

                labels: {
                    color: "#2e2e2e"
                },
                minorTicks: {
                    color: "#2e2e2e"
                },
                majorTicks: {
                    color: "#2e2e2e"
                }
            }
        }),

        metro: deepExtend({}, gaugeBaseTheme, {
            pointer: {
                color: "#8ebc00"
            },
            scale: {
                rangePlaceholderColor: "#e6e6e6",

                labels: {
                    color: "#777"
                },
                minorTicks: {
                    color: "#777"
                },
                majorTicks: {
                    color: "#777"
                }
            }
        }),

        silver: deepExtend({}, gaugeBaseTheme, {
            pointer: {
                color: "#0879c0"
            },
            scale: {
                rangePlaceholderColor: "#f3f3f4",

                labels: {
                    color: "#515967"
                },
                minorTicks: {
                    color: "#515967"
                },
                majorTicks: {
                    color: "#515967"
                }
            }
        })
    };

    // Exports ================================================================
    deepExtend(dataviz.ui.themes, {
        chart: chartThemes,
        gauge: gaugeThemes
    });

})(jQuery);

