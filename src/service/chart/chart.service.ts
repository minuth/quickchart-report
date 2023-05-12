import axios from 'axios'

export interface IChartService {
  generateChart(): Promise<void>
}

export abstract class BaseChartService {
  private BASE_URL = 'https://quickchart.io/chart'

  protected async downloadChart(chartData: string): Promise<Buffer> {
    const response = await axios.post(
      this.BASE_URL,
      {
        chart: chartData,
        backgroundColor: 'transparent',
        width: 500,
        height: 300,
        format: 'png'
      },
      {responseType: 'arraybuffer'}
    )

    return Buffer.from(response.data)
  }
}
