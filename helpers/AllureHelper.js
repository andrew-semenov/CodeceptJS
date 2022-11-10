const Helper = require('@codeceptjs/helper');
const fs = require('fs');
const ja = require('json-assert')
const assert = require('assert');

class AllureHelper extends Helper {
    async _finishTest2(suite) {
        const I = this.helpers.REST;
    
        // If project is not exist, create it
        const {data} = await I.sendGetRequest(`${this.config.url}/projects/${this.config.projectId}`)
        if (data.meta_data.message == `project_id '${this.config.projectId}' not found`) {
            const urlSendReport = `${this.config.url}/projects`;
            const projectCreated = await I.sendPostRequest(urlSendReport, {"id": this.config.projectId})
            const expected = {
                "data": {
                    "id": this.config.projectId
                },
                "meta_data": {
                    "message": "Project successfully created"
                }
            }
    
            const result = ja.isEqual(expected, projectCreated.data)
            assert.ok(result, `Check that allure contains the ${this.config.projectId} project`)
        }
    
        // GET /clean-results - Clean Allure results
        await I.sendGetRequest(`${this.config.url}/clean-results?project_id=${this.config.projectId}`)
    
        // Collect files from Output directory
        const results = fs.readdirSync(this.config.outputDir).map(file => {
            let content = fs.readFileSync(this.config.outputDir + '/' + file, {encoding: 'base64'})
            return {
                "file_name": file,
                "content_base64": content
            }
        })
    
        // POST /send-results - Send results files
        const urlSendReport = `${this.config.url}/send-results?project_id=${this.config.projectId}`;
        const reportSent = await I.sendPostRequest(urlSendReport, {results})
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log(urlSendReport)
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log(reportSent)
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        await assert.equal(reportSent.status, 200);
        await assert.equal(reportSent.statusText, 'OK');
    
        // GET /generate-report - Generate new report
        const urlGenerateReport = `${this.config.url}/generate-report?project_id=${this.config.projectId}`;
        const reportGenerated = await I.sendGetRequest(urlGenerateReport);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log(urlGenerateReport)
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        console.log(reportGenerated)
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        await assert.equal(reportGenerated.status, 200);
        await assert.equal(reportGenerated.statusText, 'OK');
    }
}

module.exports = AllureHelper;