pipeline {
    agent any

    parameters {
        string(name: 'TAG', defaultValue: '@smoke', description: 'Run tests by tag')
        string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch to run')
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
                    def branchName = params.BRANCH.replaceFirst('origin/', '')

                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${branchName}"]],
                        userRemoteConfigs: [[
                            url: 'https://github.com/275305/playwright-automation.git'
                        ]]
                    ])
                }
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
                bat "npx playwright test --grep \"${params.TAG}\""
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
    }
}