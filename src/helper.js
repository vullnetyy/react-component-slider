export function booleanDisplayStyle(bool, displayType = 'block'){
    return {display: bool && displayType|| 'none'};
}