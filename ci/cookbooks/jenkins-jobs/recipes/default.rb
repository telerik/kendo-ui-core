JENKINS_URL = 'http://localhost:8080/'

remote_file "/tmp/jenkins-cli.jar" do
    source "#{JENKINS_URL}jnlpJars/jenkins-cli.jar"
    action :create_if_missing
end

def jenkins_job(name)
    cookbook_file "#{name}.xml" do
        source "#{name}.xml"
    end

    bash "setup #{name} jenkins job" do
        code %Q{
            sleep 10;
            java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' create-job #{name} < #{name}.xml;
            if [[ ! $? -eq 0 ]]

            then
                java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' update-job #{name} < #{name}.xml;
            fi

            # java -jar /tmp/jenkins-cli.jar -s '#{JENKINS_URL}' restart;
        }
    end
end

jenkins_job "CI"
jenkins_job "production-bundles"

