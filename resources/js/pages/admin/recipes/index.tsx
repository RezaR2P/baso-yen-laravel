import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Recipe = {
    id: number;
    title: string;
    slug: string;
    cook_time: number | null;
    servings: number | null;
    difficulty: string;
    ingredients: string;
    steps: string;
    image_url: string | null;
    is_active: boolean;
};

type FormData = {
    title: string;
    slug: string;
    cook_time: string;
    servings: string;
    difficulty: string;
    ingredients: string;
    steps: string;
    is_active: boolean;
    image: File | null;
};

const emptyForm: FormData = {
    title: "",
    slug: "",
    cook_time: "",
    servings: "",
    difficulty: "Mudah",
    ingredients: "",
    steps: "",
    is_active: true,
    image: null,
};

const fieldClass =
    "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

export default function RecipesIndex({ recipes }: { recipes: Recipe[] }) {
    const [editing, setEditing] = useState<Recipe | null>(null);
    const [fileKey, setFileKey] = useState(0);
    const form = useForm<FormData>(emptyForm);

    const reset = () => {
        setEditing(null);
        setFileKey((k) => k + 1);
        form.reset();
        form.clearErrors();
    };

    const startEdit = (r: Recipe) => {
        setEditing(r);
        setFileKey((k) => k + 1);
        form.setData({
            title: r.title,
            slug: r.slug,
            cook_time: r.cook_time ? String(r.cook_time) : "",
            servings: r.servings ? String(r.servings) : "",
            difficulty: r.difficulty,
            ingredients: r.ingredients,
            steps: r.steps,
            is_active: r.is_active,
            image: null,
        });
        form.clearErrors();
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: reset,
        };

        if (editing) {
            form.transform((data) => ({ ...data, _method: "put" }));
            form.post(`/admin/recipes/${editing.id}`, options);
        } else {
            form.transform((data) => data);
            form.post("/admin/recipes", options);
        }
    };

    const remove = (r: Recipe) => {
        if (confirm(`Hapus resep "${r.title}"?`)) {
            router.delete(`/admin/recipes/${r.id}`, { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Kelola Resep" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Kelola Resep</h1>
                    <p className="text-muted-foreground">
                        Tambah, ubah, atau hapus resep beserta bahan dan
                        langkahnya.
                    </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <CardContent className="overflow-x-auto pt-6">
                            <table className="w-full min-w-[560px] text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="p-3 font-semibold">
                                            Foto
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Judul
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Waktu · Porsi
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Status
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipes.map((r) => (
                                        <tr
                                            key={r.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="p-3">
                                                {r.image_url ? (
                                                    <img
                                                        src={r.image_url}
                                                        alt={r.title}
                                                        className="size-12 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="size-12 rounded-md bg-muted" />
                                                )}
                                            </td>
                                            <td className="p-3 font-medium">
                                                {r.title}
                                            </td>
                                            <td className="p-3 text-muted-foreground">
                                                {r.cook_time ?? "-"} menit ·{" "}
                                                {r.servings ?? "-"} porsi
                                            </td>
                                            <td className="p-3">
                                                <Badge
                                                    variant={
                                                        r.is_active
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {r.is_active
                                                        ? "Terbit"
                                                        : "Draft"}
                                                </Badge>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            startEdit(r)
                                                        }
                                                    >
                                                        Ubah
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            remove(r)
                                                        }
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {recipes.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="p-6 text-center text-muted-foreground"
                                            >
                                                Belum ada resep.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle>
                                {editing ? "Ubah Resep" : "Tambah Resep"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={submit}
                                className="flex flex-col gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Judul resep</Label>
                                    <Input
                                        id="title"
                                        value={form.data.title}
                                        onChange={(e) =>
                                            form.setData(
                                                "title",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.title} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="slug">
                                        Slug (kosongkan untuk otomatis)
                                    </Label>
                                    <Input
                                        id="slug"
                                        value={form.data.slug}
                                        onChange={(e) =>
                                            form.setData("slug", e.target.value)
                                        }
                                    />
                                    <InputError message={form.errors.slug} />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="grid gap-2">
                                        <Label htmlFor="cook_time">
                                            Waktu (menit)
                                        </Label>
                                        <Input
                                            id="cook_time"
                                            type="number"
                                            min="1"
                                            value={form.data.cook_time}
                                            onChange={(e) =>
                                                form.setData(
                                                    "cook_time",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={form.errors.cook_time}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="servings">Porsi</Label>
                                        <Input
                                            id="servings"
                                            type="number"
                                            min="1"
                                            value={form.data.servings}
                                            onChange={(e) =>
                                                form.setData(
                                                    "servings",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={form.errors.servings}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="difficulty">
                                        Tingkat kesulitan
                                    </Label>
                                    <select
                                        id="difficulty"
                                        className={fieldClass}
                                        value={form.data.difficulty}
                                        onChange={(e) =>
                                            form.setData(
                                                "difficulty",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option>Mudah</option>
                                        <option>Sedang</option>
                                        <option>Sulit</option>
                                    </select>
                                    <InputError
                                        message={form.errors.difficulty}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="ingredients">
                                        Bahan-bahan (satu per baris)
                                    </Label>
                                    <textarea
                                        id="ingredients"
                                        rows={5}
                                        className={fieldClass}
                                        value={form.data.ingredients}
                                        onChange={(e) =>
                                            form.setData(
                                                "ingredients",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.ingredients}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="steps">
                                        Langkah pembuatan (satu per baris)
                                    </Label>
                                    <textarea
                                        id="steps"
                                        rows={6}
                                        className={fieldClass}
                                        value={form.data.steps}
                                        onChange={(e) =>
                                            form.setData(
                                                "steps",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.steps} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">
                                        Foto hasil masakan (maks. 2 MB)
                                    </Label>
                                    <Input
                                        key={fileKey}
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            form.setData(
                                                "image",
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    {editing?.image_url && (
                                        <p className="text-xs text-muted-foreground">
                                            Kosongkan jika tidak ingin mengganti
                                            foto.
                                        </p>
                                    )}
                                    <InputError message={form.errors.image} />
                                </div>

                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.data.is_active}
                                        onChange={(e) =>
                                            form.setData(
                                                "is_active",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    Terbitkan di website
                                </label>

                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        disabled={form.processing}
                                    >
                                        Simpan
                                    </Button>
                                    {editing && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={reset}
                                        >
                                            Batal
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

RecipesIndex.layout = {
    breadcrumbs: [{ title: "Kelola Resep", href: "/admin/recipes" }],
};
