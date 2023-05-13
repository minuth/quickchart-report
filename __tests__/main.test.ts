import {expect, test} from '@jest/globals'
import {BarChartService} from '../src/service'
import {Input, RepositoryReport} from '../src/model'
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

test('test input with good input', () => {
  const input = new Input('123456', './report', 'chart-report-test.png')
  expect(input.token).toEqual('123456')
  expect(input.filePath).toEqual('./report')
  expect(input.fileName).toEqual('chart-report-test.png')
  expect(input.fullFilePath).toEqual('./report/chart-report-test.png')
})

test('test input with bad input', () => {
  const input = new Input('123456', './report/', 'chart-report')
  expect(input.token).toEqual('123456')
  expect(input.filePath).toEqual('./report')
  expect(input.fileName).toEqual('chart-report.png')
  expect(input.fullFilePath).toEqual('./report/chart-report.png')
})

test('test input with default input', () => {
  const input = new Input('123456', '.', 'chart-report.png')
  expect(input.token).toEqual('123456')
  expect(input.filePath).toEqual('.')
  expect(input.fileName).toEqual('chart-report.png')
  expect(input.fullFilePath).toEqual('./chart-report.png')
})
