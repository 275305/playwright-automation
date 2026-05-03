pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
        timeout(time: 30, unit: 'MINUTES') //  Global timeout (no infinite stuck)
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
                bat 'rmdir /s /q allure-results || echo no allure folder'
                bat 'rmdir /s /q test-results || echo no test-results folder'
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
                echo "Browsers already installed. Skipping download to avoid slowness/stuck."
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
                    echo "No Allure results found"
                }

                def passed = 0
                def failed = 0
                def skipped = 0

                if (allureExists) {
                    def files = findFiles(glob: 'allure-results/*.json')

                    files.each { file ->
                        def content = readFile(file.path)

                        if (content.contains('"status":"passed"')) passed++
                        if (content.contains('"status":"failed"')) failed++
                        if (content.contains('"status":"skipped"')) skipped++
                    }
                }

                def total = passed + failed + skipped

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
                    <img src="https://quickchart.io/chart?c={
                    type:'pie',
                    data:{
                    labels:['Passed','Failed','Skipped'],
                    datasets:[{
                    data:[${passed},${failed},${skipped}],
                    backgroundColor:['green','red','orange']
                    }]
                    }
                    }" width="300"/>

                    </body>
                    </html>
                    """
                )
            }
        }

        //  KEEP ONLY ONE FAILURE BLOCK (clean)
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