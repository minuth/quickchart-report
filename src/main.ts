import * as core from '@actions/core'
import {RepositoryReport} from './model'
import {BarChartService} from './service'
import {getInput} from './util'
import fs from 'fs'

async function run(args: string[]): Promise<void> {
  try {
    const arg = args[2]
    type GithubReport = {repository: RepositoryReport}
    const {repository} = JSON.parse(arg) as GithubReport
    const input = getInput()
    if (
      input.filePath &&
      input.filePath !== '.' &&
      !fs.existsSync(input.filePath)
    ) {
      fs.mkdirSync(input.filePath)
    }

    const chartService = new BarChartService(repository, input.fullFilePath)
    await chartService.generateChart()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run(process.argv)
