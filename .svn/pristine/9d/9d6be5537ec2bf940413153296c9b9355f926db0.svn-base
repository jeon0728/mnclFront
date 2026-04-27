class FormBuilder {
  private tupleList: any[] = []

  appendJson ( name: string, json: Record<string, any> ): this {
    this.tupleList.push( [ name, convertJsonBlob( json ) ] )
    return this
  }

  append ( name: string, file: File ): this {
    this.tupleList.push( [ name, file ] )
    return this
  }

  appendFile ( name: string, file: File ): this {
    this.tupleList.push( [ name, file ] )
    return this
  }

  appendFiles ( name: string, files: File[] ): this {
    files.forEach( file => this.appendFile( name, file ) )
    return this
  }

  build (): FormData {
    const form = new FormData()
    this.tupleList.forEach( tuple => form.append( tuple[ 0 ], tuple[ 1 ] ) )
    return form
  }

  static create (): FormBuilder {
    return new FormBuilder()
  }
}

function convertJsonBlob ( value: Record<string, object> ): Blob {
  return new Blob( [ JSON.stringify( value ) ], {
    type: 'application/json'
  } )
}

export default FormBuilder
