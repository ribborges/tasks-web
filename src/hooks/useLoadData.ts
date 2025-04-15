import { useCallback, useEffect, useState } from "react";

import { useCategoryStore, useTaskStore, useUserStore } from "@/lib/store";
import { fetchCategories } from "@/actions/category.actions";
import { fetchTasks } from "@/actions/task.actions";

export default function useLoadData() {
    const [dataLoading, setDataLoading] = useState(true);
    const { user } = useUserStore();
    const { setCategories } = useCategoryStore();
    const { setTasks } = useTaskStore();

    const loadData = useCallback(async () => {
        if (user) {
            const categories = await fetchCategories(user?.id);

            if (Array.isArray(categories)) {
                setCategories(categories);
            } else {
                setCategories([]);
            }

            const tasks = await fetchTasks(user?.id);

            if (Array.isArray(tasks)) {
                setTasks(tasks);
            } else {
                setTasks([]);
            }

            setDataLoading(false);
        }
    }, [user, fetchCategories, fetchTasks, setTasks, setCategories]);

    useEffect(() => {
        loadData();
    }, [user]);

    return { dataLoading };
}