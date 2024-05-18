
//custom hook that handles the form
import { ChangeEvent, useState } from 'react';

const useForm = (initialValues: Record<string, any>) : [values : Record<string, any>, handleChange: (event: ChangeEvent<HTMLInputElement>) => void] => {
    //storing initial values of the form
    const [values, setValues] = useState<Record<string, any>>(initialValues);

    //function that handles the change in the form

    function handleChange(event: ChangeEvent<HTMLInputElement>) {

        //destruct the event.target object
        // event.target.files?.[0]
        const { name, value, type, checked, files} = event.target

        //checked and unchecked for check box

        setValues((prevFormData : Record<string, any>) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : type==="file" ? files?.[0] : value
            }
        })
    }

    //returning an array that contains an object and the funtion that changes the value

    return [values,handleChange]
}

export default useForm;