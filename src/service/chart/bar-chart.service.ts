import {writeFileSync} from 'fs'
import {RepositoryReport} from '../../model'
import {QuickChartService, IChartService} from './chart.service'

export class BarChartService
  extends QuickChartService
  implements IChartService
{
  constructor(
    private report: RepositoryReport,
    private saveChartFilePath: string
  ) {
    super()
  }

  async generateChart(): Promise<void> {
    const {
      openIssues,
      closedIssues,
      openPullRequest,
      closedPullRequest,
      mergedPullRequest,
      stargazers,
      forks,
      collaborators
    } = this.report

    const charData = {
      type: 'bar',
      data: {
        datasets: [
          {label: 'Open issues', data: [openIssues?.totalCount || 0]},
          {label: 'Closed issues', data: [closedIssues?.totalCount || 0]},
          {
            label: 'Open pull requests',
            data: [openPullRequest?.totalCount || 0]
          },
          {
            label: 'Closed pull requests',
            data: [closedPullRequest?.totalCount || 0]
          },
          {
            label: 'Merged pull requests',
            data: [mergedPullRequest?.totalCount || 0]
          },
          {label: 'Forks', data: [forks?.totalCount || 0]},
          {label: 'Collaborators', data: [collaborators?.totalCount || 0]},
          {label: 'Stargazers', data: [stargazers?.totalCount || 0]}
        ]
      },
      options: {
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            color: '#fff',
            backgroundColor: 'rgba(34, 139, 34, 0.6)',
            borderColor: 'rgba(34, 139, 34, 1.0)',
            borderWidth: 1,
            borderRadius: 5
          }
        }
      }
    }
    const chartBuffer = await this.downloadChart(JSON.stringify(charData))
    writeFileSync(this.saveChartFilePath, chartBuffer)
  }
}
