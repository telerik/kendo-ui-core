require 'github_api'
require 'singleton'
require 'erb'

CHANGELOG_TEMPLATE = ERB.new(File.read(File.join(File.dirname(__FILE__), 'changelog.html.erb')), 0, '%<>')
CHANGELOG_XML_TEMPLATE = ERB.new(File.read(File.join(File.dirname(__FILE__), 'changelog.xml.erb')), 0, '%<>')

class Issue
    attr_reader :suites, :components, :internal, :framework, :bug, :new_component
    attr_accessor :title
    def initialize(issue)
        @title = issue.title
        @labels = issue.labels.map {|l| l.name }

        @internal = @labels.join(" ") =~ /Documentation|Internal|Deleted|Invalid|Won't Fix/
        @bug = @labels.include? "Bug"
        @new_component = @labels.include? "New widget"

        @suites = filtered_labels :s

        @suites.push "components" if @suites.length == 0

        @components = filtered_labels(:w) | filtered_labels(:f) | filtered_labels(:c)
    end

    def filtered_labels(prefix)
        @labels.grep(/#{prefix}:/i) { |l| l.split(":")[1].strip }
    end

    def framework_construct?
        @labels.join(" ") =~ /\b(View|Application|Popup|FX)\b/
    end
end

class Component
    attr_reader :bugs, :features
    def initialize
        @features = []
        @bugs = []
    end

    def add(issue)
        if issue.bug
            @bugs.push issue
        else
            @features.push issue
        end
    end
end

class Suite
    attr_reader :bugs, :features, :title, :key, :new_components
    attr_accessor :components
    def initialize(title, key)
        @title = title
        @key = key
        @features = []
        @bugs = []
        @new_components = []
        @components = {}
    end

    def add(issue)
        if issue.new_component
            @new_components.push issue
        elsif issue.components.length == 0 || issue.framework_construct?
            if issue.bug
                @bugs.push issue
            else
                @features.push issue
            end
        elsif issue.components
            issue.components.each do |component_name|
                (@components[component_name] ||= Component.new).add(issue)
            end
        end
    end
end

class ChangeLog
    include Singleton
    attr_reader :suites

    def initialize
        @suites = [
            Suite.new("Components", "components"),
            Suite.new("Wrappers (ASP.NET MVC)", "aspnetmvc"),
            Suite.new("Wrappers (Java)", "java"),
            Suite.new("Wrappers (PHP)", "php")
        ]

        @milestones = {}

        fetch_issues
    end

    def fetch_issues
        closed_issues.map { |issue| Issue.new(issue) }.each do |issue|
            next if issue.internal
            issue.suites.each do |suite_name|
                find_suite(suite_name).add(issue)
            end
        end
        suites.each do |suite|
            suite.components = Hash[suite.components.sort]
        end
    end

    def render_changelog(template, suite_names, exclude)
        exclude ||= []
        suites = @suites.select { |suite| suite_names.include? suite.key }
        template.result(binding)
    end

    private

    def find_suite(key)
        @suites.find { |s| s.title == key } || @suites[0]
    end

    def api_for(repo_name)
        Github.new :oauth_token => "88b65b5ddb933dcff847eb9b148449283b22e3f2", :user => "telerik", :repo => repo_name
    end

    def private_repo
        @private_repo ||= api_for "kendo"
    end

    def public_repo
        @public_repo ||= api_for "kendo-ui-core"
    end

    def issues_from(milestones)
        milestones.map { |milestone| milestone_issues(milestone) }.flatten
    end

    def closed_issues
        issues_from(current_milestones(public_repo)) + issues_from(current_milestones(private_repo))
    end

    def current_milestones(repo)
        milestones_for(repo).select { |milestone| current_milestone_names.include? milestone.title }
    end

    def milestone_issues(milestone)
        page = 1
        issues = []

        begin
            issues_page = page_issues(milestone, page)
            issues += issues_page
            page += 1
        end while issues_page.length == 100

        issues
    end

    def repo_by(milestone)
        milestone.url =~ /kendo-ui-core/ ? public_repo : private_repo
    end

    def page_issues(milestone, page)
        repo_type = milestone.url =~ /kendo-ui-core/ ? 'public' : 'private'
        repo = repo_by(milestone)

        $stderr.puts "Fetching issues from #{repo.repo} repo, #{milestone.title} (#{milestone.number}), page #{page}..." if VERBOSE

        repo.issues.list_repo nil, nil,
            :state => "closed",
            :milestone => milestone.number,
            :per_page => 100,
            :page => page
    end

    def milestones_for(repo)
        repo_milestones = repo.issues.milestones

        @milestones[repo] ||=
            repo_milestones.list(nil, nil, :state => "open") +
            repo_milestones.list(nil, nil, :state => "closed")
    end

    def current_milestone_names
       names = [self.class.milestone_name(VERSION_YEAR, VERSION_Q, VERSION_SERVICE_PACK)]

       if (!VERSION_SERVICE_PACK)
            q = VERSION_Q - 1;
            year = VERSION_YEAR

            if (q === 0)
                year -= 1
                q = 3;
            end

            names.unshift self.class.milestone_name(year, q, "next")
       end

       names
    end

    class << self
        def milestone_name(year, quarter, service_pack)
            service_pack = "." + service_pack if service_pack == "next"
            "#{year}.Q#{quarter}#{".SP#{service_pack}" if service_pack}"
        end
    end
end

class WriteChangeLogTask < Rake::FileTask
    attr_accessor :suites, :exclude

    def template(name)
        return CHANGELOG_XML_TEMPLATE if name =~ /.xml$/

        CHANGELOG_TEMPLATE
    end

    def execute(args)
        File.open(name, 'w') { |file| file.write(contents(template(name))) }
    end

    def contents(render_template)
        @contents ||= ChangeLog.instance.render_changelog(render_template, suites, exclude)
    end

    def needed?
        !File.exist?(name) || File.read(name).strip != contents(template(name)).strip
    end
end

def write_changelog(path, suites, exclude = [])
    task = WriteChangeLogTask.define_task(path)
    task.suites = suites
    task.exclude = exclude
end
