export const spy = (statement:string, value: any) => {
    console.log({[statement]: value});
    return value;
}