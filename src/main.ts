import * as core from '@actions/core'
import {RepositoryReport} from './model'
import {BarChartService} from './service'
import {getInput} from './util'

async function run(args: string[]): Promise<void> {
  try {
    const arg = args[2]
    type GithubReport = {repository: RepositoryReport}
    const {repository} = JSON.parse(arg) as GithubReport
    core.info(
      `token: ${core.getInput('token')}, path: ${core.getInput(
        'file_path'
      )}, file:${core.getInput('file_name')}`
    )
    const input = getInput()
    core.info(`filePath: ${input.fullFilePath}`)
    const chartService = new BarChartService(repository, input.fullFilePath)
    await chartService.generateChart()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run(process.argv)
