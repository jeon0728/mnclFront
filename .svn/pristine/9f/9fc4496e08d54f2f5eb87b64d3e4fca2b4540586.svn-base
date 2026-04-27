class PatternLexer {
  private text: string
  private index: number
  private tokens: Record<string, any>[]

  lex ( text: string ) {
    this.text = text
    this.index = 0
    this.tokens = []
    while ( this.index < this.text.length ) {
      const ch = this.text.charAt( this.index )
      if ( ch === '#' ) {
        this.readIdent()
      } else if ( ch !== '#' ) {
        this.readString()
      } else {
        this.index++
      }
    }
    return this.tokens
  }

  peek ( i: number ) {
    const num = i || 1
    return ( this.index + num < this.text.length ) ? this.text.charAt( this.index + num ) : false
  }

  readIdent () {
    const start = this.index
    while ( this.index < this.text.length ) {
      const ch = this.text.charAt( this.index )
      if ( ch === '#' ) {
        if ( this.peek( 1 ) === '?' ) {
          this.tokens.push( {
            index: start,
            text: ch,
            identifier: true,
            nonexistence: true
          } )
          this.index++
        } else {
          this.tokens.push( {
            index: start,
            text: ch,
            identifier: true
          } )
        }
        this.index++
      } else {
        break
      }
    }
  }

  readString () {
    const start = this.index
    let string = ''
    while ( this.index < this.text.length ) {
      const ch = this.text.charAt( this.index )
      if ( ch !== '#' ) {
        string += ch
        this.index++
      } else {
        break
      }
    }
    this.tokens.push( {
      index: start,
      text: string,
      constant: true
    } )
  }
}

class PatternParser {
  private lexer: PatternLexer
  private body: { input: string, output: string }
  private text: string
  private tokens: Record<string, any>[]

  constructor ( lexer: PatternLexer ) {
    this.lexer = lexer
  }

  compile () {
    return ( function ( input, output ) {
      const pattern = new RegExp( input )
      return function replacePattern ( text ) {
        if ( text.match( pattern ) ) {
          return text.replace( pattern, output )
        }
        return ''
      }
    } )( this.body.input, this.body.output )
  }

  parse ( text: string ) {
    this.text = text
    this.tokens = this.lexer.lex( text )
    this.body = this.program()
    return this
  }

  program () {
    let inputPattern = ''
    let outputPattern = ''
    let identifierIndex = 1
    while ( this.tokens.length > 0 ) {
      const token = this.consume()
      if ( token.constant ) {
        outputPattern += token.text
      } else if ( token.identifier ) {
        inputPattern += token.nonexistence ? '(.?)' : '(.)'
        outputPattern += '$' + identifierIndex++
      } else {
        // throw new Error()
      }
    }
    return {
      input: '^' + inputPattern + '$',
      output: outputPattern
    }
  }

  consume () {
    return this.tokens.shift()
  }
}

export {
  PatternLexer,
  PatternParser
}
