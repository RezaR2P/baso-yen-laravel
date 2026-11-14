import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import type { FormEvent } from "react";
import InputError from "@/components/input-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Contact = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    reply: string | null;
    replied_at: string | null;
    created_at: string;
};

type Filter = "semua" | "baru" | "dibalas";

const fieldClass =
    "w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

const formatDate = (value: string) =>
    new Date(value).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

export default function ContactsIndex({ contacts }: { contacts: Contact[] }) {
    const [filter, setFilter] = useState<Filter>("semua");
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const form = useForm({ reply: "" });

    const visible = contacts.filter((c) =>
        filter === "semua"
            ? true
            : filter === "baru"
              ? !c.replied_at
              : !!c.replied_at,
    );
    const selected = contacts.find((c) => c.id === selectedId) ?? null;

    const select = (c: Contact) => {
        setSelectedId(c.id);
        form.setData("reply", "");
        form.clearErrors();
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!selected) return;
        form.post(`/admin/contacts/${selected.id}/reply`, {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const remove = (c: Contact) => {
        if (confirm(`Hapus pesan dari "${c.name}"?`)) {
            router.delete(`/admin/contacts/${c.id}`, {
                preserveScroll: true,
                onSuccess: () => setSelectedId(null),
            });
        }
    };

    const tabs: { key: Filter; label: string }[] = [
        { key: "semua", label: "Semua" },
        { key: "baru", label: "Baru" },
        { key: "dibalas", label: "Dibalas" },
    ];

    return (
        <>
            <Head title="Pesan Masuk" />
            <div className="flex flex-col gap-6 p-4">
                <div>
                    <h1 className="text-2xl font-bold">Pesan Masuk</h1>
                    <p className="text-muted-foreground">
                        Baca pesan dari formulir Kontak dan balas langsung dari
                        sini.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <Card className="h-fit">
                        <CardContent className="flex flex-col gap-3 pt-6">
                            <div className="flex flex-wrap gap-2">
                                {tabs.map((t) => (
                                    <Button
                                        key={t.key}
                                        size="sm"
                                        variant={
                                            filter === t.key
                                                ? "default"
                                                : "outline"
                                        }
                                        onClick={() => setFilter(t.key)}
                                    >
                                        {t.label}
                                    </Button>
                                ))}
                            </div>

                            {visible.map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => select(c)}
                                    className={`flex flex-col gap-1 rounded-lg border p-3 text-left ${selectedId === c.id ? "border-primary bg-muted" : ""}`}
                                >
                                    <span className="flex items-center justify-between gap-2">
                                        <span className="font-semibold">
                                            {c.name}
                                        </span>
                                        <Badge
                                            variant={
                                                c.replied_at
                                                    ? "secondary"
                                                    : "default"
                                            }
                                        >
                                            {c.replied_at ? "Dibalas" : "Baru"}
                                        </Badge>
                                    </span>
                                    <span className="text-sm font-medium">
                                        {c.subject}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {formatDate(c.created_at)}
                                    </span>
                                </button>
                            ))}
                            {visible.length === 0 && (
                                <p className="p-4 text-center text-sm text-muted-foreground">
                                    Tidak ada pesan.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardContent className="flex flex-col gap-5 pt-6">
                            {!selected ? (
                                <p className="p-6 text-center text-muted-foreground">
                                    Pilih pesan di sebelah kiri untuk
                                    membacanya.
                                </p>
                            ) : (
                                <>
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <h2 className="text-xl font-bold">
                                                {selected.subject}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                Dari {selected.name} ·{" "}
                                                {selected.email}
                                                {selected.phone
                                                    ? ` · ${selected.phone}`
                                                    : ""}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDate(
                                                    selected.created_at,
                                                )}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={
                                                selected.replied_at
                                                    ? "secondary"
                                                    : "default"
                                            }
                                        >
                                            {selected.replied_at
                                                ? "Dibalas"
                                                : "Baru"}
                                        </Badge>
                                    </div>

                                    <div className="whitespace-pre-wrap rounded-lg border bg-muted/40 p-4 text-sm">
                                        {selected.message}
                                    </div>

                                    {selected.reply && selected.replied_at && (
                                        <div className="rounded-lg border border-primary/30 p-4 text-sm">
                                            <p className="mb-1 text-xs text-muted-foreground">
                                                Balasan terkirim ·{" "}
                                                {formatDate(
                                                    selected.replied_at,
                                                )}
                                            </p>
                                            <p className="whitespace-pre-wrap">
                                                {selected.reply}
                                            </p>
                                        </div>
                                    )}

                                    <form
                                        onSubmit={submit}
                                        className="flex flex-col gap-3"
                                    >
                                        <label
                                            htmlFor="reply"
                                            className="font-semibold"
                                        >
                                            {selected.replied_at
                                                ? "Kirim balasan lagi"
                                                : "Balas pesan"}
                                        </label>
                                        <textarea
                                            id="reply"
                                            rows={6}
                                            className={fieldClass}
                                            value={form.data.reply}
                                            onChange={(e) =>
                                                form.setData(
                                                    "reply",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={form.errors.reply}
                                        />
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                type="submit"
                                                disabled={form.processing}
                                            >
                                                Kirim Balasan
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                onClick={() => remove(selected)}
                                            >
                                                Hapus Pesan
                                            </Button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

ContactsIndex.layout = {
    breadcrumbs: [{ title: "Pesan Masuk", href: "/admin/contacts" }],
};
