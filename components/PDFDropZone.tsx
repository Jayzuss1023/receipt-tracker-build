"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useSchematicEntitlement } from "@schematichq/schematic-react";

function PDFDropZone() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [usUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const router = useRouter();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    value: isFeatureEnabled,
    featureUsageExceeded,
    featureUsage,
    featureAllocation,
  } = useSchematicEntitlement("scans");

  // Set up sensors for drag detection
  const sensors = useSensors(useSensor(PointerSensor));

  const handleUpload = useCallback(async (files: FileList | File[]) => {
    if (!user) {
      alert("Please sign in to upload files!");

      const fileArray = Array.from(files);
      const pdfFiles = fileArray.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf"),
      );

      if (pdfFiles.length === 0) {
        alert("Please drop only PDF files");
        return;
      }

      setIsUploading(true);

      try {
        // Upload files
        const newUploadedFiles: string[] = [];

        for (const file of pdfFiles) {
          // Create a FormData object to use with the server action
          const formData = new FormData();
          formData.append("file", file);

          //   Call the server action to handle the upload
          const result = await uploadPDF(formData);
          if (!result.success) {
            throw new Error(result.error);
          }

          newUploadedFiles.push(file.name);
        }

        setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);

        // Clear uploaded files after 5 seconds
        setTimeout(() => {
          setUploadedFiles([]);
        }, 5000);

        router.push("/receipts");
      } catch (error) {
        console.error("Upload failed: ", error);
        alert(`
                Upload failed: ${error instanceof Error ? error.message : "Error Unknown"}
            `);
      } finally {
        setIsUploading(false);
      }
    }
  }, []);

  //   Handle file drop via native browser events for better PDF support.
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingOver(false);

      if (!user) {
        alert("Please sign-in to upload filed!");
        return;
      }

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleUpload(e.dataTransfer.files);
      }
    },
    [user, handleUpload],
  );

  //   const canUpload = isUserSignedIn && isFeatureEnabled;

  const canUpload = true;

  return (
    <DndContext sensors={sensors}>
      <div className="w-full max-w-md mx-auto">
        <div
          onDragOver={canUpload ? handleDragOver : undefined}
          onDragLeave={canUpload ? handleDragLeave : undefined}
          onDrop={canUpload ? handleDrop : (e) => e.preventDefault()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDraggingOver ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${!canUpload ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          abd
        </div>
      </div>
    </DndContext>
  );
}

export default PDFDropZone;
