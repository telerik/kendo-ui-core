JENKINS_URL = 'http://localhost:8080/build/'

remote_file "/tmp/jenkins-cli.jar" do
    source "#{JENKINS_URL}jnlpJars/jenkins-cli.jar"
    action :create_if_missing
end

remote_directory '/tmp/jenkins-jobs' do
    source 'jobs'
end

bash "Update jenkins jobs" do
    code %Q{
        sleep 10;
        cd /tmp/jenkins-jobs
        for job in *.xml; do
            name=${job%.*}
            java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' create-job $name < $job;
            if [[ ! $? -eq 0 ]]
            then
                java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' update-job $name < $job;
            fi
        done

        java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' restart;
    }
end

[ "", "/staging", "/production", "/functional-tests/custom-sites", "/download-builder-staging" ].each do |dir|
    directory "/var/www#{dir}" do
        owner "jenkins"
        group "jenkins"
    end
end

[ "", "/Stable", "/Production", "/WinJS" ].each do |dir|
    directory "/kendo-builds#{dir}" do
        owner "jenkins"
        group "jenkins"
    end
end
