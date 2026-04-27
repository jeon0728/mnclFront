export class ReportUtil {

  static getReportUrl ( params: CallReportParams ) {
    const { ozUrl, rptFile, odiName, paramCount, aParamArgs, Zoom, Toolbar, export_div, fn } = params
    const sUrl = ozUrl + '/GSABIS_OzReport_html.jsp'
      + '?ozrName=' + rptFile
      + '&odiName=' + odiName
      + '&paramCount=' + paramCount
      + '&toolbar=' + Toolbar
      + '&Zoom=' + Zoom
      + '&aParam=' + aParamArgs

    if( typeof fn === 'function' ) {
      fn( sUrl )
    }

    return sUrl
  }

  static callReport( url: string ) {
    window.open( url, '_blank' )
  }
}

export type CallReportParams = {
  ozUrl?: string
  rptFile?: string
  odiName?: string
  paramCount?: string
  aParamArgs?: string[]
  Zoom?: string
  Toolbar?: string
  export_div?: string
  fn?: ( url: string ) => void
}