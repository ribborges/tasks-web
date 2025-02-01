'use client';

import { useState } from "react";
import { Collection, Palette } from "react-bootstrap-icons";

import Loading from "@/components/Loading";
import { Button, Input } from "@/components/Input";
import handleInputChange from "@/utils/handleInputChange";
import { useCategoryStore, useUserStore } from "@/lib/store";
import { CategoryData } from "@/interfaces/category";
import { CreateCategory } from "@/services/category.service";

export default function AddCategory() {
    const { user } = useUserStore();
    const { addCategory } = useCategoryStore();
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState<CategoryData>({
        name: '',
        color: '#999999',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, setCategoryData);

    const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (user?.id) {
            await CreateCategory(categoryData)
                .then((res) => {
                    if (!res) {
                        console.error('Error creating category: no response');
                        return;
                    }

                    if (res?.status !== 201) {
                        console.error(`${res.status}: ${res.data}`);
                        return;
                    }

                    addCategory(res.data);
                    setIsLoading(false);
                    setCategoryData({
                        name: '',
                        color: '#999999',
                    });
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation: ', error);
                });
        }

        setIsLoading(false);
    }

    return (
        <>
            {isLoading ? <div className="absolute z-[2]"><Loading /></div> : <></>}
            <div className="relative flex flex-col">
                <form className="flex flex-col gap-2">
                    <Input
                        id="name"
                        value={categoryData?.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        label="Name"
                        icon={<Collection />}
                    />
                    <Input
                        id="color"
                        value={categoryData?.color}
                        onChange={handleChange}
                        type="color"
                        name="color"
                        label="Color"
                        icon={<Palette />}
                    />
                    <div className="flex justify-end">
                        <Button disabled={
                            !categoryData.name ||
                            !categoryData.color
                        } type="button" onClick={handleSubmit}>
                            Add Category
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}