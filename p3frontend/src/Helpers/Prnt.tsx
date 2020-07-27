/*
	shorthand print function that logs things to the console

	debug:boolean	true to print stuff. false to not print
	text:string		the text to print
	dataJson?:any	a possible JSON to print aswell
*/
export function prnt(debug: boolean, text: string, dataJson?: any) {
  if (debug) {
    if (dataJson) {
      try {
        console.log(`${text} ${JSON.stringify(dataJson)}`);
        //console.log(text)
        //console.log(dataJson)
      } catch (e) {
        console.log(`prnt() catch(e) ${e.message}`);
      }
    } else console.log(text);
  }
}
