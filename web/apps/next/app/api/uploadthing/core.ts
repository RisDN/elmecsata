import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: '8MB', maxFileCount: 1, minFileCount: 1 } }).onUploadComplete(
        async ({ metadata, file }) => {
            console.log('Upload completed. Filekey: ', file.ufsUrl);
        }
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
