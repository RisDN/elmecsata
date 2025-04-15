'use client';
import { Messages } from '@/lib/localization/messages';
import { BottomGradient } from '@/lib/ui/bottom-gradient';
import BannerUploadButton from '@/lib/ui/originui/banner-upload-button';
import ImageUploadButton from '@/lib/ui/originui/image-upload-button';
import InputLimited from '@/lib/ui/originui/input-limited';
import PrivacySwitch, { PrivacyType } from '@/lib/ui/originui/privacy-switch';
import TextArea from '@/lib/ui/originui/text-area';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { useUploadThing } from '@/app/api/uploadthing/utils';

import LanguageSelect from '@/app/components/language-select';
import { ContinentData } from '@elmecsata/types';
import { QuizTag } from '@elmecsata/types';
import QuizTagSelector from '../../components/quiz-tag-selector';

interface CreateFormProps {
    continentData: ContinentData[];
    quizTags: QuizTag[];
}

const CreateForm = ({ continentData, quizTags }: CreateFormProps) => {
    const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
    const [isCreatingQuiz, setIsCreatingQuiz] = useState<boolean>(false);

    const [bannerFile, setBannerFile] = useState<File>();
    const [iconFile, setIconFile] = useState<File>();

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const [selectedLanguage, setSelectedLanguage] = useState<string>();
    const [privacy, setPrivacy] = useState<PrivacyType>('public');
    const [tags, setTags] = useState<QuizTag[]>(quizTags.slice(0, 2));

    const { startUpload } = useUploadThing('imageUploader', {
        onUploadError: (error) => {
            console.error(error);
            toast.error(Messages.QuizCreation_ErrorWhileCreatingQuiz);
            setIsUploadingImage(false);
        },
        onUploadBegin: () => {
            toast.loading(Messages.Image_UploadInProgress);
            setIsUploadingImage(true);
        },
        onClientUploadComplete: (result) => {
            toast.success(Messages.Image_UploadSuccess);
            setIsUploadingImage(false);
        },
    });

    const createQuiz = async () => {
        if (!nameRef.current?.value || !descriptionRef.current?.value) {
            toast.error(Messages.QuizCreation_PleaseFillAllFields);
            return;
        }

        if (bannerFile === undefined || iconFile === undefined) {
            toast.error(Messages.QuizCreation_UploadImages);
            return;
        }

        const iconUploadResult = await startUpload([iconFile]);
        const iconUrl = iconUploadResult && iconUploadResult[0]?.key;
        if (!iconUrl) {
            toast.error(Messages.QuizCreation_ErrorWhileCreatingQuiz);
            return;
        }
        const bannerUploadResult = await startUpload([bannerFile]);
        const bannerUrl = bannerUploadResult && bannerUploadResult[0]?.key;

        toast.remove();
        setIsCreatingQuiz(true);
        toast.loading(Messages.Loading);

        const response = await fetch('/api/quiz/create', {
            method: 'POST',
            body: JSON.stringify({
                name: nameRef.current?.value,
                description: descriptionRef.current?.value,
                icon: iconUrl,
                banner: bannerUrl,
                quizTags: tags,
                country: selectedLanguage,
                privacy,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        toast.remove();
        const data = await response.json();
        setIsCreatingQuiz(false);
        if (data.success) {
            toast.success(Messages.QuizCreation_SuccessfullQuizCreation);
            window.location.href = '/edit/' + data.id;
            return;
        }

        toast.error(data.message);
    };

    return (
        <div className='h-full border-collapse rounded-3xl border border-gray-500/10 bg-gray-500/5 pb-8 dark:bg-black/50 sm:!h-fit'>
            <div className='relative h-28 rounded-3xl'>
                <BannerUploadButton onUpload={setBannerFile} />
                <ImageUploadButton className='absolute left-8 top-16' onUpload={setIconFile} />
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
                                ref={nameRef}
                                className='w-full'
                            />
                        </div>
                    </div>
                    <TextArea
                        label='Quiz Leírása:'
                        maxLength={255}
                        ref={descriptionRef}
                        className='w-full'
                        hint='OPCIONÁLIS'
                    />
                    <QuizTagSelector setTags={setTags} quizTags={quizTags} label='Quiz Tagek:' />

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
                    />
                    <PrivacySwitch onChange={(value) => setPrivacy(value)} />
                </div>
                <button
                    onClick={createQuiz}
                    disabled={isUploadingImage || isCreatingQuiz}
                    className='group/btn relative mb-4 block h-10 w-full rounded-md bg-gradient-to-br from-black to-black font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] sm:mb-0'
                >
                    {isUploadingImage && 'Képek feltöltése...'}
                    {isCreatingQuiz && 'Kvíz létrehozása...'}
                    {!isUploadingImage && !isCreatingQuiz && 'Kvíz létrehozása'}
                    <BottomGradient />
                </button>
            </div>
        </div>
    );
};

export default CreateForm;
