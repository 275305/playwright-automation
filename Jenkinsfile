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

            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]

            //  ALWAYS EMAIL (pass + fail)
            emailext(
                subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                <h3>Build Report</h3>
                <b>Status:</b> ${currentBuild.currentResult} <br>
                <b>Job:</b> ${env.JOB_NAME} <br>
                <b>Build:</b> ${env.BUILD_NUMBER} <br>
                <b>URL:</b> ${env.BUILD_URL} <br>
                <b>Allure Report:</b> ${env.BUILD_URL}allure <br>
                """,
                to: 'pradeepmatrix2@gmail.com'
            )
        }

        failure {
            // Extra alert for failure (optional but useful)
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