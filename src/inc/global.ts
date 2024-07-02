const production: boolean = false
const appName: string = '201_file'

//development constants
const appPort: string = '1234'
const apiPort: string = '80'
interface Environment {
  baseUrl: string,
  apiUrl: string,
  appUrl: string,
}

const productionEnv : Environment = {
  appUrl: `https://live.adamson.edu.ph`,
  baseUrl: `https://live.adamson.edu.ph/${appName}`,
  apiUrl: `https://live.adamson.edu.ph/${appName}/api`
}

const developmentEnv: Environment = {
  appUrl: `http://127.0.0.1/AdULMS2/V4/`,
  baseUrl: `http://127.0.0.1:${appPort}/${appName}`,
  apiUrl: `http://127.0.0.1:${apiPort}/${appName}/api`
}
export const global = {
  appUrl: production ? productionEnv.appUrl : developmentEnv.appUrl,
  appName: appName,
  baseUrl: production ? productionEnv.baseUrl : developmentEnv.baseUrl,
  apiUrl: production ? productionEnv.apiUrl : developmentEnv.apiUrl
}

export const multiEntryForm = [
  "school_info",
  "employment_info",
  "board_info"
]
