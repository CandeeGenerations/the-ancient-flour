"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { TagDialog } from "@/components/admin/tags/tag-dialog";
import { TagsTable } from "@/components/admin/tags/tags-table";
import { Tag } from "@/lib/types";

export default function AdminTags() {
  const [open, setOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setOpen(true);
  };

  const handleClose = () => {
    setEditingTag(null);
    setOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tags</h2>
          <p className="text-muted-foreground">
            Manage your product tags
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      </div>

      <TagsTable onEdit={handleEdit} />
      
      <TagDialog
        open={open}
        onOpenChange={setOpen}
        tag={editingTag}
        onClose={handleClose}
      />
    </div>
  );
}