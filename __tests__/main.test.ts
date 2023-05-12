import {expect, test} from '@jest/globals'
import {BarChartService} from '../src/service'
import {RepositoryReport} from '../src/model'
import fs from 'fs'

test('test generate chart', async () => {
  const report: RepositoryReport = {
    openIssues: {totalCount: 100},
    closedIssues: {totalCount: 60},
    openPullRequest: {totalCount: 40},
    closedPullRequest: {totalCount: 130},
    mergedPullRequest: {totalCount: 50},
    collaborators: {totalCount: 23},
    forks: {totalCount: 110},
    stargazers: {totalCount: 50}
  }
  const testChartFilePath = './test-chart-report.png'
  await new BarChartService(report, testChartFilePath).generateChart()
  const isFileExist = fs.existsSync(testChartFilePath)
  expect(isFileExist).toBe(true)
  if (isFileExist) {
    fs.unlinkSync(testChartFilePath)
  }
})
