exports.testFunction = async (req, res) => {
  try {
    const { id, name, lastName, hey } = req.body;
    // console.log("Request: ", req.body);

    let message = "!Ok";
    let results = testConvertXmlToJson();
    testCosumingSOAPservice();
    // let results = {
    //     id: 1,
    //     name: "Jose",
    //     lastName: "Maldonado"
    // };
    // Send the response
    res
      .status(200)
      .json({
        message: message,
        error: false,
        code: res.statusCode,
        results: results
      });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server error",
      code: res.statusCode,
      error: true
    });
  }
};

const testConvertXmlToJson = () => {
  let xmlParser = require('xml2json');
  let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
                    <PeopleList>
                      <People>
                        <name>
                            Jose
                        </name>
                        <lastName>
                            Pozo
                        </lastName>
                      </People>
                      <People>
                        <name>
                            Juan
                        </name>
                        <lastName>
                            Perez
                        </lastName>
                      </People>
                    </PeopleList>`;

  let jsonString = xmlParser.toJson(xmlString, {
    object: true,
    sanitize: false,
    trim: true,
    arrayNotation: false
  })
  console.log('JSON output', jsonString);
  return jsonString;
}

const testCosumingSOAPservice = () => {
  var soap = require('soap');
  var args = {};

  soap.createClientAsync(process.env.WSDL_URL, { overridePromiseSuffix: 'Promise' }).then((client) => {
    //TODO: Test #1
    client.Cargar_Provincias(args, (err, result) => {
      console.log("err: ", err);
      //console.log("result: ", result);
      console.log("Data: ", result.Cargar_ProvinciasResult.ResultadoDT.diffgram.DocumentElement.Data);
    });

    //TODO: Test #2
    //client.Cargar_Municipios({ pProvinciaID: '27' }, (err, result, rawResponse, soapHeader, rawRequest) => {
      // result is a javascript object
      // rawResponse is the raw xml response string
      // soapHeader is the response soap header as a javascript object
      // rawRequest is the raw xml request string
      //console.log("err: ", err);
      //console.log("result: ", result);
      //console.log("rawResponse: ",rawResponse);
      //console.log("rawRequest: ",rawRequest);

      //console.log("Data: ", result.Cargar_MunicipiosResult.ResultadoDT.diffgram.DocumentElement.Data);
    //})
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log("error: ", err);
  });
}