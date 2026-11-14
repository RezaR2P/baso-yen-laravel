<?php

namespace App\Http\Controllers\Admin\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait HandlesImages
{
  protected function saveImage(UploadedFile $file, string $folder): string
  {
    return '/storage/' . $file->store($folder, 'public');
  }

  protected function deleteImage(?string $url): void
  {
    // Hanya hapus file yang diunggah lewat admin, bukan foto di public/.
    if ($url && str_starts_with($url, '/storage/')) {
      Storage::disk('public')->delete(Str::after($url, '/storage/'));
    }
  }
}
