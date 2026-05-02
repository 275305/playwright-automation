post {
    always {
        bat 'dir allure-results'
        bat 'dir test-results'

        // Allure Report
        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]

        script {

            // -------------------------------
            // 1. TEST COUNT + FAILED TESTS
            // -------------------------------
            def total = 0
            def passed = 0
            def failed = 0
            def skipped = 0
            def failedTests = []

            def files = findFiles(glob: 'allure-results/*.json')

            files.each { file ->
                def content = readFile(file.path)

                if (content.contains('"status":"passed"')) passed++
                if (content.contains('"status":"failed"')) {
                    failed++
                    def nameMatch = content =~ /"name":"(.*?)"/
                    if (nameMatch) {
                        failedTests << nameMatch[0][1]
                    }
                }
                if (content.contains('"status":"skipped"')) skipped++

                total++
            }

            // -------------------------------
            // 2. TREND (LAST 5 BUILDS)
            // -------------------------------
            def trendLabels = []
            def trendData = []

            def builds = currentBuild.rawBuild.getParent().getBuilds().limit(5)

            builds.each { b ->
                trendLabels << "#${b.number}"
                trendData << (b.getResult()?.toString() == "SUCCESS" ? 1 : 0)
            }

            // -------------------------------
            // 3. MULTIPLE SCREENSHOTS INLINE
            // -------------------------------
            def screenshots = findFiles(glob: 'test-results/**/*.png')
            def imageHtml = ""
            def attachmentsList = []

            screenshots.take(3).eachWithIndex { file, i ->
                def cid = "img${i}"
                imageHtml += "<img src='cid:${cid}' width='400'/><br><br>"
                attachmentsList << [fileName: file.path, cid: cid]
            }

            // -------------------------------
            // 4. MAIN EMAIL (ONLY ONE EMAIL)
            // -------------------------------
            emailext(
                subject: "${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                to: 'pradeepmatrix2@gmail.com',

                body: """
                <html>
                <body style="font-family:Arial;">

                <h2 style="color:${currentBuild.currentResult == 'SUCCESS' ? 'green' : 'red'};">
                    Build ${currentBuild.currentResult}
                </h2>

                <b>Job:</b> ${env.JOB_NAME} <br>
                <b>Build:</b> ${env.BUILD_NUMBER} <br>
                <b>URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a> <br>
                <b>Allure:</b> <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a>

                <hr>

                <h3>Test Summary</h3>
                <table border="1" cellpadding="8">
                    <tr>
                        <th>Total</th>
                        <th style="color:green;">Passed</th>
                        <th style="color:red;">Failed</th>
                        <th style="color:orange;">Skipped</th>
                    </tr>
                    <tr>
                        <td>${total}</td>
                        <td>${passed}</td>
                        <td>${failed}</td>
                        <td>${skipped}</td>
                    </tr>
                </table>

                <br>

                <h3>Pie Chart</h3>
                <img src="https://quickchart.io/chart?c={
                    type:'pie',
                    data:{
                        labels:['Passed','Failed','Skipped'],
                        datasets:[{data:[${passed},${failed},${skipped}]}]
                    }
                }" width="350"/>

                <br>

                <h3>Last 5 Builds Trend</h3>
                <img src="https://quickchart.io/chart?c={
                    type:'bar',
                    data:{
                        labels:${trendLabels},
                        datasets:[{
                            label:'Success=1 Fail=0',
                            data:${trendData}
                        }]
                    }
                }" width="400"/>

                <br>

                <h3>Failed Tests</h3>
                <ul>
                    ${failedTests.collect { "<li>${it}</li>" }.join("")}
                </ul>

                <br>

                <h3>📸 Screenshots Preview</h3>
                ${imageHtml}

                </body>
                </html>
                """,

                attachmentsPattern: 'test-results/**/*.png, test-results/**/*.webm',
                attachments: attachmentsList
            )
        }
    }
}