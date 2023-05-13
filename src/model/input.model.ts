export class Input {
  constructor(
    private _token: string,
    private _filePath: string,
    private _fileName: string
  ) {}

  get token(): string {
    return this._token
  }

  get filePath(): string {
    if (this._filePath) {
      this._filePath = this._filePath.trim()
      if (this._filePath.endsWith('/')) {
        return this._filePath.substring(0, this._filePath.length - 1)
      }
      return this._filePath
    }
    return '.'
  }

  get fileName(): string {
    if (this._fileName) {
      this._fileName = this._fileName.trim()
      if (!this._fileName.endsWith('.png')) {
        const indexOfExtension = this._fileName.lastIndexOf('.')
        if (indexOfExtension < 0) {
          return this._fileName.concat('.png')
        }
        const fileNameNoExtension = this._fileName.substring(
          0,
          indexOfExtension
        )
        return fileNameNoExtension.concat('.png')
      }
      return this._fileName
    }
    return 'chart-report.png'
  }

  get fullFilePath(): string {
    return `${this.filePath}/${this.fileName}`
  }
}
