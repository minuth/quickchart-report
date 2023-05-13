import * as core from '@actions/core'
import {Input} from '../model'

export function getInput(): Input {
  const token = core.getInput('token')
  const filePath = core.getInput('file_path')
  const fileName = core.getInput('file_name')

  return new Input(token, filePath, fileName)
}
