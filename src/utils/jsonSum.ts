type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject {
    [key: string]: JSONValue;
}
type JSONArray = JSONValue[];

function recursiveReducer(sum: number, item: JSONValue): number {
    return sum + sumNumbersInJson(item);
}

export function sumNumbersInJson(json: JSONValue): number {
    if (typeof json === "number") {
        return json;
    }

    if (Array.isArray(json)) {
        return json.reduce(recursiveReducer, 0);
    }

    if (json && typeof json === "object") {
        return Object.values(json).reduce(recursiveReducer, 0);
    }

    if (typeof json === "string" && !isNaN(parseInt(json, 10))) {
        return parseInt(json, 10);
    }

    return 0;
}
