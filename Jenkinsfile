pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timeout(time: 30, unit: 'MINUTES') //  Global timeout(no infinite stuck)
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
                retry(2) {  //  retry added
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
        }
        stage('Clean Workspace') {
            steps {
                bat '''
        if exist allure-results rmdir /s /q allure-results
        if exist test-results rmdir /s /q test-results
        '''
            }
        }

        stage('Install Dependencies') {
            steps {
                retry(2) {
                    bat 'npm install'
                }
            }
        }

        //  SAFE: No browser install (pre-installed approach)
        stage('Install Browsers') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            options {
                timeout(time: 20, unit: 'MINUTES') //  prevent hanging tests
            }
            steps {
                retry(1) {  //  retry flaky execution
                    bat 'npx playwright test --list'
                    bat "npx playwright test --grep \"${params.TAG}\""
                }
            }
        }
    }

    post {
        always {
            script {
                //  Avoid failure if folder missing
                def allureExists = fileExists('allure-results')

                if (allureExists) {
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                } else {
                    echo 'No Allure results found'
                }
                def summaryFile = 'allure-report/widgets/summary.json'

                def passed = 0
                def failed = 0
                def skipped = 0
                def total = 0

                if (fileExists(summaryFile)) {
                    def summary = readJSON file: summaryFile

                    passed = summary.statistic.passed
                    failed = summary.statistic.failed
                    skipped = summary.statistic.skipped
                    total = summary.statistic.total
                  } else {
                    echo 'Summary file not found'
                 }
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

                    <h3>Test Summary</h3>

                    <div style="font-size:16px; line-height:1.8;">
                    <b>Total:</b> <span style="font-weight:bold;">${total}</span><br>

                    <b style="color:green;">Passed:</b>
                    <span style="font-weight:bold; font-size:18px; color:green;">${passed}</span><br>

                    <b style="color:red;">Failed:</b>
                    <span style="font-weight:bold; font-size:18px; color:red;">${failed}</span><br>

                    <b style="color:orange;">Skipped:</b>
                    <span style="font-weight:bold; font-size:18px; color:orange;">${skipped}</span><br>
                    </div>

                    <br>

                    <h3>Pie Chart</h3>
                 <img src="https://quickchart.io/chart?c=%7Btype%3A'pie'%2Cdata%3A%7Blabels%3A%5B'Passed'%2C'Failed'%2C'Skipped'%5D%2Cdatasets%3A%5B%7Bdata%3A%5B${passed}%2C${failed}%2C${skipped}%5D%2CbackgroundColor%3A%5B'green'%2C'red'%2C'orange'%5D%7D%5D%7D%7D" width="300"/>

                    </body>
                    </html>
                    """
                )
            }
        }
    }
}
