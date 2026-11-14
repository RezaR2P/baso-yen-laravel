import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Category = {
    id: number;
    name: string;
    slug: string;
    products_count: number;
};

export default function CategoriesIndex({
    categories,
}: {
    categories: Category[];
}) {
    // Kategori yang sedang diubah. null artinya mode "tambah baru".
    const [editing, setEditing] = useState<Category | null>(null);

    // Data formulir + status kirim + pesan error dari validasi Laravel.
    const form = useForm({ name: "", slug: "" });

    const reset = () => {
        setEditing(null);
        form.reset();
        form.clearErrors();
    };

    const startEdit = (category: Category) => {
        setEditing(category);
        form.setData({ name: category.name, slug: category.slug });
        form.clearErrors();
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const options = { preserveScroll: truimport { LayoutGrid, Tags } from 'lucide-react';e, onSuccess: reset };

        if (editing) {
            form.put(`/admin/categories/${editing.id}`, options);
        } else {
            form.post("/admin/categories", options);
        }
    };

    const remove = (category: Category) => {
        if (confirm(`Hapus kategori "${category.name}"?`)) {
            router.delete(`/admin/categories/${category.id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title="Kelola Kategori" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Kelola Kategori</h1>
                    <p className="text-muted-foreground">
                        Atur kategori yang dipakai untuk mengelompokkan produk.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Tabel daftar kategori */}
                    <Card className="lg:col-span-2">
                        <CardContent className="overflow-x-auto pt-6">
                            <table className="w-full min-w-[420px] text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="p-3 font-semibold">
                                            Nama
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Slug
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Produk
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category) => (
                                        <tr
                                            key={category.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="p-3 font-medium">
                                                {category.name}
                                            </td>
                                            <td className="p-3 text-muted-foreground">
                                                {category.slug}
                                            </td>
                                            <td className="p-3">
                                                {category.products_count}
                                            </td>
                                            <td className="flex gap-2 p-3">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() =>
                                                        startEdit(category)
                                                    }
                                                >
                                                    Ubah
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() =>
                                                        remove(category)
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {categories.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="p-6 text-center text-muted-foreground"
                                            >
                                                Belum ada kategori.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>

                    {/* Formulir tambah / ubah */}
                    <Card className="h-fit">
                        <CardHeader>import { LayoutGrid, Tags } from 'lucide-react';
                            <CardTitle>
                                {editing ? "Ubah Kategori" : "Tambah Kategori"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={submit}
                                className="flex flex-col gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama kategori</Label>
                                    <Input
                                        id="name"
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData("name", e.target.value)
                                        }
                                    />
                                    <InputError message={form.errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="slug">
                                        Slug (kosongkan untuk otomatis)
                                    </Label>
                                    <Inputimport { LayoutGrid, Tags } from 'lucide-react';
                                        id="slug"
                                        value={form.data.slug}
                                        onChange={(e) =>
                                            import { LayoutGrid, Tags } from 'lucide-react';form.setData("slug", e.target.value)
                                        }
                                    />
                                    <InputErimport { LayoutGrid, Tags } from 'lucide-react';ror message={form.errors.slug} />
                                </div>
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

CategoriesIndex.layout = {
    breadcrumbs: [{ title: "Kelola Kategori", href: "/admin/categories" }],
};
