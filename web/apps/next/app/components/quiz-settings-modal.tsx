'use client';

import { useId, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/lib/ui/dialog';
import { PrivacyType, Quiz } from '@elmecsata/types';
import BannerUploadButton from '@/lib/ui/originui/banner-upload-button';
import ImageUploadButton from '@/lib/ui/originui/image-upload-button';
import InputLimited from '@/lib/ui/originui/input-limited';
import TextArea from '@/lib/ui/originui/text-area';
import PrivacySwitch from '@/lib/ui/originui/privacy-switch';
import { BottomGradient } from '@/lib/ui/bottom-gradient';
import { getImageUrl } from '@/lib/utils';
import { useUploadThing } from '../api/uploadthing/utils';
import { Messages } from '@/lib/localization/messages';
import toast from 'react-hot-toast';

interface QuizEditModalProps {
    children?: React.ReactNode;
    quiz: Quiz;
}

export default function QuizEditModal({ children, quiz }: QuizEditModalProps) {
    const id = useId();

    const maxLength = 180;

    const [quizName, setQuizName] = useState<string>(quiz.name);
    const [quizDescription, setQuizDescription] = useState<string>(quiz.description);

    const [bannerFile, setBannerFile] = useState<File>();
    const [iconFile, setIconFile] = useState<File>();
    const [selectedLanguage, setSelectedLanguage] = useState<number>(quiz.country);
    const [privacy, setPrivacy] = useState<PrivacyType>('public');

    const { startUpload } = useUploadThing('imageUploader', {
        onUploadError: (error) => {
            toast.error(Messages.QuizEdit_Fail);
        },
        onUploadBegin: () => {
            toast.loading(Messages.Image_UploadInProgress);
        },
        onClientUploadComplete: (result) => {
            toast.success(Messages.Image_UploadSuccess);
        },
    });

    const updateQuiz = async () => {
        if (!quiz.name || quiz.name === '') {
            toast.error(Messages.QuizEdit_NameRequired);
            return;
        }

        toast.loading(Messages.Loading);
        const bannerUrl = bannerFile ? (await startUpload([bannerFile]))?.[0]?.key : quiz.banner;
        const iconUrl = iconFile ? (await startUpload([iconFile]))?.[0]?.key : quiz.icon;

        const response = await fetch('/api/quiz/edit-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: quiz.id,
                name: quizName,
                description: quizDescription,
                banner: bannerUrl,
                icon: iconUrl,
                country: selectedLanguage,
                privacy,
            }),
        });

        const data = await response.json();

        toast.remove();

        if (data.success) {
            toast.success(Messages.QuizEdit_Success);
            return;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='flex flex-col gap-0 overflow-y-visible border-none bg-transparent p-0 sm:max-w-lg [&>button:last-child]:top-3.5'>
                <DialogHeader className='sr-only'>
                    <DialogTitle>Quiz szerkesztése</DialogTitle>
                </DialogHeader>
                <div className='h-full border-collapse rounded-3xl border border-gray-500/10 bg-white pb-8 dark:bg-black sm:!h-fit'>
                    <div className='relative h-28 rounded-3xl'>
                        <BannerUploadButton defaultImage={getImageUrl(quiz.banner)} onUpload={setBannerFile} />
                        <ImageUploadButton
                            defaultImage={getImageUrl(quiz.icon)}
                            onUpload={setIconFile}
                            className='absolute left-8 top-16'
                        />
                    </div>
                    <div className='mt-16 space-y-8 px-8 sm:mt-0'>
                        <div className='ml-auto mt-5 space-y-6'>
                            <div className='flex w-full justify-end'>
                                <div className='w-full sm:w-[70%]'>
                                    <InputLimited
                                        label='Quiz Neve:'
                                        maxLength={30}
                                        important
                                        type='text'
                                        className='w-full'
                                        defaultValue={quiz.name}
                                        onChange={(e) => setQuizName(e.currentTarget.value)}
                                    />
                                </div>
                            </div>
                            <TextArea
                                label='Quiz Leírása:'
                                maxLength={255}
                                className='w-full'
                                hint='OPCIONÁLIS'
                                defaultValue={quiz.description}
                                onChange={(e) => setQuizDescription(e.currentTarget.value)}
                            />
                            {/* <QuizTagSelector setTags={setTags} quizTags={quizTags} label='Quiz Tagek:' />

                            <LanguageSelect
                                onChange={(language) => setSelectedLanguage(language)}
                                data={continentData}
                                defaultCountry={{
                                    id: 1,
                                    country: 'Magyar',
                                    country_code: 'HU',
                                    continent: {
                                        id: 1,
                                        name: 'Európa',
                                    },
                                }}
                                label='Quiz Nyelve:'
                            /> */}
                            <PrivacySwitch
                                defaultPrivacy={quiz.isPrivate ? 'private' : 'public'}
                                onChange={(value) => setPrivacy(value)}
                            />
                        </div>
                        <button
                            onClick={() => updateQuiz()}
                            className='group/btn relative mb-4 block h-10 w-full rounded-md bg-gradient-to-br from-black to-black font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] sm:mb-0'
                        >
                            Mentés
                            <BottomGradient />
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
