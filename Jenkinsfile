pipeline {
    agent any

    parameters {
        string(name: 'TAG', defaultValue: '@smoke', description: 'Run tests by tag')
    }

    environment {
        PLAYWRIGHT_BROWSERS_PATH = 'C:\\playwright-browsers'
    }

    tools {
        nodejs 'NodeJS'
    }

    stages {

        // REMOVE CHECKOUT STAGE

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