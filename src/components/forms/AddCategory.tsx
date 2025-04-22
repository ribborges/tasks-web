'use client';

import { useActionState, useEffect, useState } from "react";
import { Collection, Palette } from "react-bootstrap-icons";

import { Spinner } from "@/components/Loading";
import { Button, Input } from "@/components/Input";
import { handleInputChange } from "@/utils/handleInputChange";
import { useCategoryStore } from "@/lib/store";
import { CategoryData } from "@/interfaces/category";
import { newCategory } from "@/actions/category.actions";
import Validation from "../Validation";

export default function AddCategory() {
    const { addCategory } = useCategoryStore();

    const [state, action, pending] = useActionState(newCategory, undefined);

    const [categoryData, setCategoryData] = useState<CategoryData>({
        name: '',
        color: '#999999',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setCategoryData);

    useEffect(() => {
        if (state?.id) {
            addCategory(state);
            setCategoryData({
                name: '',
                color: '#999999',
            });
        }
    }, [state]);

    return (
        <div className="flex flex-col flex-1 w-full">
            <form action={action} className="flex flex-1 flex-col gap-2 px-4">
                <Input
                    id="name"
                    value={categoryData?.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    label="Name"
                    icon={<Collection />}
                />
                <Validation error={state?.errors?.name} />
                <Input
                    id="color"
                    value={categoryData?.color}
                    onChange={handleChange}
                    type="color"
                    name="color"
                    label="Color"
                    icon={<Palette />}
                />
                <Validation error={state?.errors?.color} />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={pending}
                    >
                        {pending ? <Spinner size={24} /> : "Add Category"}
                    </Button>
                </div>
            </form>
        </div>
    );
}