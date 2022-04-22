exports.testFunction = async (req, res) => {
  try {
    const { id, name, lastName, hey } = req.body;
    // console.log("Request: ", req.body);

    let message = "!Ok";
    let results = testConvertXmlToJson();

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