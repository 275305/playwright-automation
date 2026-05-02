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
        }
    }
}