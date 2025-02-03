import { Dispatch, SetStateAction } from "react";

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setState: Dispatch<SetStateAction<any>>) => {
    const { name, value } = e.currentTarget;

    setState((prevState: any) => ({
        ...prevState,
        [name]: value,
    }));
}

export { handleInputChange };