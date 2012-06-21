function Changelog() {
    this.groupedIssues = {};
}

Changelog.prototype = {
    milestone: function(year, quarter, servicePack) {
        var result = year + ".Q" + quarter;

        if (servicePack) {
            result += ".SP";

            if (servicePack == "next") {
                result += ".";
            }

            result += servicePack;
        }

        return result;
    },

    filterMilestones: function(milestones, version) {
        var targets = [
                this.milestone(version.year, version.release, version.servicePack)
            ],
            release, year;

        if (!version.servicePack) {
            release = version.release - 1;
            year = version.year;

            if (release === 0) {
                year--;
                release = 3;
            }

            targets.splice(0, 0, this.milestone(year, release, "next"));
        }
        return milestones.filter(function(milestone) {
            return (targets.indexOf(milestone.title) >= 0);
        });
    },

    filterLabels: function(labels, prefix) {
        var result = [],
            regex = new RegExp("^" + prefix + ":\\s", "i");

        labels
            .filter(function(label) {
                return regex.test(label);
            })
            .forEach(function(item) {
                result.push(item.substring(3));
            });

        return result;
    },

    groupToSuite: function(suite, widgets, type, title) {
        var groupedIssues = this.groupedIssues;

        if (!groupedIssues[suite]) {
            groupedIssues[suite] = {};
        }

        if (widgets.length) {
            widgets.forEach(function(widget) {
                if (!groupedIssues[suite][widget]) {
                    groupedIssues[suite][widget] = { bugs: [], features: [] };
                }

                groupedIssues[suite][widget][type].push(title);
            });
        } else {
            if (!groupedIssues[suite][type]) {
                groupedIssues[suite][type] = [];
            }

            groupedIssues[suite][type].push(title);
        }
    },

    groupIssue: function(issue) {
        var labels = issue.labels.map(function(label) { return label.name; }),
            suites = this.filterLabels(labels, "s"),
            type = labels.indexOf("Bug") >= 0 ? "bugs" : "features";

        if (labels.indexOf("Deleted") >= 0 || labels.indexOf("Documentation") >= 0 || labels.indexOf("Internal") >= 0) {
            return;
        }

        if (suites.length) {
            suites.forEach(function(suite) {
                this.groupToSuite(suite, this.filterLabels(labels, "w"), type, issue.title);
            }, this);
        } else {
            this.groupToSuite("Core", this.filterLabels(labels, "f"), type, issue.title);
        }
    },

    groupIssues: function(issues) {
        issues.forEach(this.groupIssue.bind(this));

        return this.groupedIssues;
    }
};

if (module) {
    module.exports = Changelog;
}
