type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject { [key: string]: JSONValue }
type JSONArray = JSONValue[];

export function sumNumbersInJson(json: JSONValue): number {
  if (typeof json === 'number') {
    return json;
  }

  if (Array.isArray(json)) {
    return json.reduce((sum: number, item) => sum + sumNumbersInJson(item), 0);
  }

  if (json && typeof json === 'object') {
    return Object.values(json).reduce((sum: number, value) => sum + sumNumbersInJson(value), 0);
  }

  return 0;
}
