import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Article = {
    id: number;
    title: string;
    slug: string;
    category: string | null;
    summary: string | null;
    content: string;
    image_url: string | null;
    is_active: boolean;
    published_at: string | null;
};

type FormData = {
    title: string;
    slug: string;
    category: string;
    summary: string;
    content: string;
    is_active: boolean;
    image: File | null;
};

const emptyForm: FormData = {
    title: "",
    slug: "",
    category: "",
    summary: "",
    content: "",
    is_active: true,
    image: null,
};

const fieldClass =
    "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

const formatDate = (value: string | null) =>
    value
        ? new Date(value).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric",
          })
        : "Belum terbit";

export default function ArticlesIndex({
    articles,
    categories,
}: {
    articles: Article[];
    categories: string[];
}) {
    const [editing, setEditing] = useState<Article | null>(null);
    const [fileKey, setFileKey] = useState(0);
    const form = useForm<FormData>(emptyForm);

    const reset = () => {
        setEditing(null);
        setFileKey((k) => k + 1);
        form.reset();
        form.clearErrors();
    };

    const startEdit = (a: Article) => {
        setEditing(a);
        setFileKey((k) => k + 1);
        form.setData({
            title: a.title,
            slug: a.slug,
            category: a.category ?? "",
            summary: a.summary ?? "",
            content: a.content,
            is_active: a.is_active,
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
            form.post(`/admin/articles/${editing.id}`, options);
        } else {
            form.transform((data) => data);
            form.post("/admin/articles", options);
        }
    };

    const remove = (a: Article) => {
        if (confirm(`Hapus artikel "${a.title}"?`)) {
            router.delete(`/admin/articles/${a.id}`, { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Kelola Artikel" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Kelola Artikel</h1>
                    <p className="text-muted-foreground">
                        Tulis, ubah, atau hapus artikel beserta foto sampulnya.
                    </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    <Card className="xl:col-span-2">
                        <CardContent className="overflow-x-auto pt-6">
                            <table className="w-full min-w-[560px] text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="p-3 font-semibold">
                                            Sampul
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Judul
                                        </th>
                                        <th className="p-3 font-semibold">
                                            Kategori · Terbit
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
                                    {articles.map((a) => (
                                        <tr
                                            key={a.id}
                                            className="border-b last:border-0"
                                        >
                                            <td className="p-3">
                                                {a.image_url ? (
                                                    <img
                                                        src={a.image_url}
                                                        alt={a.title}
                                                        className="size-12 rounded-md object-cover"
                                                    />
                                                ) : (
                                                    <div className="size-12 rounded-md bg-muted" />
                                                )}
                                            </td>
                                            <td className="p-3 font-medium">
                                                {a.title}
                                            </td>
                                            <td className="p-3 text-muted-foreground">
                                                {a.category ?? "-"} ·{" "}
                                                {formatDate(a.published_at)}
                                            </td>
                                            <td className="p-3">
                                                <Badge
                                                    variant={
                                                        a.is_active
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                >
                                                    {a.is_active
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
                                                            startEdit(a)
                                                        }
                                                    >
                                                        Ubah
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            remove(a)
                                                        }
                                                    >
                                                        Hapus
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {articles.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="p-6 text-center text-muted-foreground"
                                            >
                                                Belum ada artikel.
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
                                {editing ? "Ubah Artikel" : "Tulis Artikel"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={submit}
                                className="flex flex-col gap-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Judul artikel</Label>
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

                                <div className="grid gap-2">
                                    <Label htmlFor="category">
                                        Kategori artikel
                                    </Label>
                                    <select
                                        id="category"
                                        className={fieldClass}
                                        value={form.data.category}
                                        onChange={(e) =>
                                            form.setData(
                                                "category",
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <option value="">Tanpa kategori</option>
                                        {categories.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={form.errors.category}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="summary">Ringkasan</Label>
                                    <textarea
                                        id="summary"
                                        rows={3}
                                        className={fieldClass}
                                        value={form.data.summary}
                                        onChange={(e) =>
                                            form.setData(
                                                "summary",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.summary} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="content">Isi artikel</Label>
                                    <textarea
                                        id="content"
                                        rows={12}
                                        className={fieldClass}
                                        value={form.data.content}
                                        onChange={(e) =>
                                            form.setData(
                                                "content",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError message={form.errors.content} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image">
                                        Foto sampul (maks. 2 MB)
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

ArticlesIndex.layout = {
    breadcrumbs: [{ title: "Kelola Artikel", href: "/admin/articles" }],
};
