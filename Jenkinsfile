pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    parameters {
        string(name: 'TAG', defaultValue: '@smoke', description: 'Run tests by tag')
        string(name: 'BRANCH', defaultValue: 'pradeep/playwright-setup', description: 'Git branch to run')
    }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\playwright-browsers'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout Code') {
            steps {
                script {
                    echo "Running on BRANCH: ${params.BRANCH}"
                }

                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${params.BRANCH}"]],
                    userRemoteConfigs: [[
                        url: 'https://github.com/275305/playwright-automation.git'
                    ]]
                ])
            }
        }

        stage('Clean Workspace') {
            steps {
                bat 'rmdir /s /q allure-results || echo no allure folder'
                bat 'rmdir /s /q test-results || echo no test-results folder'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                bat 'npx playwright install --force'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test --list'
                bat "npx playwright test --grep \"${params.TAG}\""
            }
        }
    }

    post {
        always {
            bat 'dir allure-results'

            //  Existing Allure (unchanged)
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]

            script {

                //  SAFE TEST COUNT
                def passed = 0
                def failed = 0
                def skipped = 0

                def files = findFiles(glob: 'allure-results/*.json')

                files.each { file ->
                    def content = readFile(file.path)

                    if (content.contains('"status":"passed"')) passed++
                    if (content.contains('"status":"failed"')) failed++
                    if (content.contains('"status":"skipped"')) skipped++
                }

                def total = passed + failed + skipped

                //  UPDATED EMAIL (ENHANCED BUT SAFE)
                emailext(
                    subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    mimeType: 'text/html',
                    to: 'pradeepmatrix2@gmail.com',

                    body: """
                    <html>
                    <body>

                    <h3>Build Report</h3>

                    <b>Status:</b> ${currentBuild.currentResult} <br>
                    <b>Job:</b> ${env.JOB_NAME} <br>
                    <b>Build:</b> ${env.BUILD_NUMBER} <br>
                    <b>URL:</b> ${env.BUILD_URL} <br>
                    <b>Allure Report:</b> ${env.BUILD_URL}allure <br>

                    <hr>

                    <h3> Test Summary</h3>
                    Total: ${total} <br>
                    Passed: ${passed} <br>
                    Failed: ${failed} <br>
                    Skipped: ${skipped} <br>

                    <br>

                    <h3> Pie Chart</h3>
                    <img src="https://quickchart.io/chart?c={
                        type:'pie',
                        data:{
                            labels:['Passed','Failed','Skipped'],
                            datasets:[{
                                data:[${passed},${failed},${skipped}]
                            }]
                        }
                    }" width="300"/>

                    </body>
                    </html>
                    """
                )
            }
        }

        // Existing failure email (UNCHANGED)
        failure {
            emailext(
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <h3 style="color:red;">Build Failed</h3>
                <b>Check Logs:</b> ${env.BUILD_URL}console <br>
                <b>Allure Report:</b> ${env.BUILD_URL}allure <br>
                """,
                to: 'pradeepmatrix2@gmail.com'
            )
        }
    }
}