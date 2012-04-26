function Changelog() {
    this.groupedIssues = {};
}

Changelog.prototype = {
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

        if (labels.indexOf("Deleted") >= 0) {
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
    }
};

if (module) {
    module.exports = Changelog;
}
