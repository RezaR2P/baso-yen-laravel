import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Category = { id: number; name: string };

type Product = {
    id: number;
    name: string;
    slug: string;
    category_id: number | null;
    description: string | null;
    price: string | null;
    image_url: string | null;
    is_featured: boolean;
    is_active: boolean;
    category: Category | null;
};

type FormData = {
    name: string;
    slug: string;
    category_id: string;
    description: string;
    price: string;
    is_featured: boolean;
    is_active: boolean;
    image: File | null;
};

const emptyForm: FormData = {
    name: "",
    slug: "",
    category_id: "",
    description: "",
    price: "",
    is_featured: false,
    is_active: true,
    image: null,
};

const fieldClass =
    "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

const rupiah = (value: string | null) =>
    value === null
        ? "-"
        : new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
          }).format(Number(value));

export default function ProductsIndex({
    products,
    categories,
}: {
    products: Product[];
    categories: Category[];
}) {
    const [editing, setEditing] = useState<Product | null>(null);
    const [fileKey, setFileKey] = useState(0); // untuk mengosongkan input file
    const form = useForm<FormData>(emptyForm);

    const reset = () => {
        setEditing(null);
        setFileKey((k) => k + 1);
        form.reset();
        form.clearErrors();
    };

    const startEdit = (p: Product) => {
        setEditing(p);
        setFileKey((k) => k + 1);
        form.setData({
            name: p.name,
            slug: p.slug,
            category_id: p.category_id ? String(p.category_id) : "",
            description: p.description ?? "",
            price: p.price ?? "",
            is_featured: p.is_featured,
            is_active: p.is_active,
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
            // PHP tidak membaca file dari request PUT, jadi dikirim POST + _method=put.
            form.transform((data) => ({ ...data, _method: "put" }));
            form.post(`/admin/products/${editing.id}`, options);
        } else {
            form.transform((data) => data);
            form.post("/admin/products", options);
        }
    };

    const remove = (p: Product) => {
        if (confirm(`Hapus produk "${p.name}"?`)) {
            router.delete(`/admin/products/${p.id}`, { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Kelola Produk" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Kelola Produk</h1>
                    <p className="text-muted-foreground">
                        Tambah, ubah, atau hapus produk beserta fotonya.
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
                                            Nama
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Kategori
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Harga
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
                                    {products.map((p) => (
                                        <tr
                                            key={p.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="p-3">
                                                {p.image_url ? (
                                                    <img
                                                        src={p.image_url}
                                                        alt={p.name}
                                                        className="size-12 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="size-12 rounded-md bg-muted" />
                                                )}
                                            </td>
                                            <td className="p-3 font-medium">
                                                {p.name}
                                            </td>
                                            <td className="p-3 text-muted-foreground">
                                                {p.category?.name ?? "-"}
                                            </td>
                                            <td className="p-3">
                                                {rupiah(p.price)}
                                            </td>
                                            <td className="p-3">
                                                <Badge
                                                    variant={
                                                        p.is_active
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {p.is_active
                                                        ? "Aktif"
                                                        : "Draft"}
                                                </Badge>
                                            </td>
                                            <td className="p-3">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            startEdit(p)
                                                        }
                                                    >
                                                        Ubah
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            remove(p)
                                                        }
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="p-6 text-center text-muted-foreground"
                                            >
                                                Belum ada produk.
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
                                {editing ? "Ubah Produk" : "Tambah Produk"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={submit}
                                className="flex flex-col gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama produk</Label>
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
                                    <Input
                                        id="slug"
                                        value={form.data.slug}
                                        onChange={(e) =>
                                            form.setData("slug", e.target.value)
                                        }
                                    />
                                    <InputError message={form.errors.slug} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">
                                        Kategori
                                    </Label>
                                    <select
                                        id="category_id"
                                        className={fieldClass}
                                        value={form.data.category_id}
                                        onChange={(e) =>
                                            form.setData(
                                                "category_id",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">Tanpa kategori</option>
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={form.errors.category_id}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="price">Harga (Rp)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        value={form.data.price}
                                        onChange={(e) =>
                                            form.setData(
                                                "price",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.price} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Deskripsi
                                    </Label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className={fieldClass}
                                        value={form.data.description}
                                        onChange={(e) =>
                                            form.setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={form.errors.description}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">
                                        Foto produk (maks. 2 MB)
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
                                    Tampilkan di website (Aktif)
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={form.data.is_featured}
                                        onChange={(e) =>
                                            form.setData(
                                                "is_featured",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    Produk unggulan
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

ProductsIndex.layout = {
    breadcrumbs: [{ title: "Kelola Produk", href: "/admin/products" }],
};
