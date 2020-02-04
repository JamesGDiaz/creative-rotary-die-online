var dictionary = new Map([
  ["quoteNumber", "~0"],
  ["customer", "~1"],
  ["dateReceived", "~2"],
  ["state", "~3"],
  ["machine", "~4"],
  ["teeth", "~5"],
  ["gearPitch", "~6"],
  ["clientKey", "~7"],
  ["type", "~8"],
  ["sizeAcross", "~9"],
  ["sizeAround", "~A"],
  ["gapAcross", "~B"],
  ["gapAround", "~C"],
  ["cavAcross", "~D"],
  ["cavAround", "~E"],
  ["cornerRadius", "~F"],
  ["material", "~G"],
  ["price", "~H"]
]);

export function fromSchemaToId(jsondata: string) {
  dictionary.forEach((value, key) => {
    jsondata = jsondata.toString().replace(`"${key}"`, `${value}`);
  });
  console.debug(jsondata);
  return jsondata;
}
export function fromIdToSchema(jsondata: string) {
  dictionary.forEach((value, key) => {
    jsondata = jsondata.toString().replace(`${value}`, `"${key}"`);
  });
  console.debug(jsondata);
  return jsondata;
}
