'use client';
import { Messages } from '@/lib/localization/messages';
import { Alert, AlertDescription } from '@/lib/ui/alert';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/card';
import { Checkbox } from '@/lib/ui/checkbox';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/lib/ui/drawer';
import { Input } from '@/lib/ui/input';
import { Label } from '@/lib/ui/label';
import ShinyButton from '@/lib/ui/magicui/shiny-button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/lib/ui/tooltip';
import { cn } from '@/lib/utils';
import {
    closestCenter,
    DndContext,
    type DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Question, QuestionType, Quiz } from '@elmecsata/types';
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { isEqual } from 'lodash';
import {
    AlertCircle,
    BookOpenCheckIcon,
    BookTypeIcon,
    ChartGanttIcon,
    CopyPlus,
    FileStackIcon,
    HelpCircle,
    ListIcon,
    Plus,
    SaveOffIcon,
    Shuffle,
    Trash2,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import QuestionTypeSelector from './question-type-selector';
import ShapeIcon, { answerShapes } from './shape-icons';
import { SortableBox } from './sortable-box';

interface QuestionEditorProps {
    quiz: Quiz;
}

export const QuestionEditor = ({ quiz }: QuestionEditorProps) => {
    const [boxes, setBoxes] = useState<Question[]>(quiz.questions);
    const [selectedBox, setSelectedBox] = useState<Question | null>(quiz.questions[0] || null);
    const [isChanged, setIsChanged] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isEqual(boxes, quiz.questions)) {
            setIsChanged(false);
            return;
        }
        setIsSaved(false);
        setIsChanged(true);
    }, [boxes, quiz.questions]);

    useEffect(() => {
        if (isChanged && !isSaved) {
            toast.error('Nem mentett változtatások!', {
                duration: Infinity,
                position: 'bottom-center',
                icon: <SaveOffIcon />,
            });
        }

        if (!isChanged) {
            toast.remove();
        }
    }, [isChanged, isSaved]);

    const save = async () => {
        toast.remove();
        toast.loading(Messages.Loading);
        setIsSaving(true);
        const response = await fetch('/api/quiz/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quizId: quiz.id,
                questions: boxes,
            }),
        });

        const data = await response.json();
        toast.remove();
        setIsSaving(false);
        if (!data.success) {
            toast.error(data.message);
            return;
        }
        quiz.questions = boxes;
        setIsSaved(true);
        setTimeout(() => {
            toast.success(data.message);
        }, 100);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const getBoxTypeIcon = (type: QuestionType) => {
        switch (type) {
            case 'quiz':
                return <FileStackIcon className='size-4' />;
            case 'true-false':
                return <BookOpenCheckIcon className='size-4' />;
            case 'poll':
                return <ChartGanttIcon className='size-4' />;
            case 'slide':
                return <BookTypeIcon className='size-4' />;
            default:
                return 'Q';
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setBoxes((boxes) => {
                const oldIndex = boxes.findIndex((box) => box.id === active.id);
                const newIndex = boxes.findIndex((box) => box.id === over.id);
                return arrayMove(boxes, oldIndex, newIndex);
            });
        }
    };

    const addBox = (type: QuestionType) => {
        const newId = (boxes.length + 1).toString();
        let newBox: Question;

        switch (type) {
            case 'true-false':
                newBox = {
                    id: newId,
                    title: `Igaz hamis`,
                    type: 'true-false',
                    answers: [
                        { id: uuidv4(), text: 'Igaz', isCorrect: false },
                        { id: uuidv4(), text: 'Hamis', isCorrect: false },
                    ],
                    duration: 15,
                };
                break;
            case 'poll':
                newBox = {
                    id: newId,
                    title: `Szavazás`,
                    type: 'poll',
                    answers: [
                        { id: uuidv4(), text: 'Opció 1', isCorrect: true },
                        { id: uuidv4(), text: 'Opció 2', isCorrect: true },
                        { id: uuidv4(), text: 'Opció 3', isCorrect: true },
                        { id: uuidv4(), text: 'Opció 4', isCorrect: true },
                    ],
                    duration: 15,
                };
                break;
            case 'slide':
                newBox = {
                    id: newId,
                    title: `Új szöveges slide`,
                    type: 'slide',
                    content: `Add meg a slide tartalmát...`,
                    answers: [],
                    duration: 15,
                };
                break;
            case 'multiple-choice':
            default:
                newBox = {
                    id: newId,
                    title: `Feleletválasztós`,
                    type: 'quiz',
                    answers: [
                        { id: uuidv4(), text: '', isCorrect: false },
                        { id: uuidv4(), text: '', isCorrect: false },
                        { id: uuidv4(), text: '', isCorrect: false },
                        { id: uuidv4(), text: '', isCorrect: false },
                    ],
                    duration: 15,
                };
        }

        setBoxes([...boxes, newBox]);
    };

    const removeBox = (id: string) => {
        setBoxes((prevBoxes) => {
            const newBoxes = prevBoxes.filter((box) => box.id !== id);
            if (selectedBox?.id === id) {
                const index = prevBoxes.findIndex((box) => box.id === id);
                setSelectedBox(index > 0 ? prevBoxes[index - 1] : null);
            }
            return newBoxes;
        });
    };

    const copyBox = (id: string) => {
        const box = boxes.find((box) => box.id === id);
        if (box) {
            const newId = (boxes.length + 1).toString();
            const newBox = {
                id: newId,
                content: box.content,
                title: box.title,
                type: box.type,
                answers: box.answers,
                duration: box.duration,
            };
            setBoxes([...boxes, newBox]);
        }
    };

    const updateBoxTitle = (title: string) => {
        if (selectedBox) {
            setBoxes(boxes.map((box) => (box.id === selectedBox.id ? { ...box, title } : box)));
            setSelectedBox({ ...selectedBox, title });
        }
    };

    const handleAnswerChange = (id: string, text: string) => {
        if (selectedBox) {
            const newAnswers = selectedBox.answers.map((answer) => (answer.id === id ? { ...answer, text } : answer));
            setSelectedBox({ ...selectedBox, answers: newAnswers });
            setBoxes(boxes.map((box) => (box.id === selectedBox.id ? { ...box, answers: newAnswers } : box)));
        }
    };

    const handleDurationChange = (action: 'increment' | 'decrease') => {
        if (selectedBox) {
            let duration = selectedBox.duration;

            if (action === 'increment') {
                duration += 1;

                if (duration >= 30) {
                    duration = 30;
                }
            } else {
                duration -= 1;

                if (duration <= 5) {
                    duration = 5;
                }
            }

            setSelectedBox({ ...selectedBox, duration: duration });
            setBoxes(boxes.map((box) => (box.id === selectedBox.id ? { ...box, duration: duration } : box)));
        }
    };

    const handleCorrectChange = (id: string, checked: boolean) => {
        if (selectedBox) {
            const newAnswers = selectedBox.answers.map((answer) =>
                answer.id === id ? { ...answer, isCorrect: checked } : answer
            );
            setSelectedBox({ ...selectedBox, answers: newAnswers });
            setBoxes(boxes.map((box) => (box.id === selectedBox.id ? { ...box, answers: newAnswers } : box)));

            if (selectedBox.type !== 'poll' && !newAnswers.some((answer) => answer.isCorrect)) {
                setError('Válassz ki legalább egy helyes választ!');
            } else {
                setError('');
            }
        }
    };

    const addAnswer = () => {
        if (selectedBox) {
            if (selectedBox.answers.length >= 6) {
                setError('Maximum 6 válasz adható meg');
                return;
            }
            const newId = uuidv4();
            const newAnswers = [...selectedBox.answers, { id: newId, text: '', isCorrect: false }];
            setSelectedBox({ ...selectedBox, answers: newAnswers });
            setBoxes(boxes.map((box) => (box.id === selectedBox.id ? { ...box, answers: newAnswers } : box)));
        }
    };

    const removeAnswer = (id: string) => {
        if (selectedBox) {
            if (selectedBox.type === 'true-false') {
                setError('Nem távolíthatsz el választ az igaz-hamis típusú kérdésekből!');
                return;
            }

            if (selectedBox.answers.length <= 2) {
                setError('Minimum 2 válasz szükséges!');
                return;
            }
            const newAnswers = selectedBox.answers.filter((answer) => answer.id !== id);
            setSelectedBox({ ...selectedBox, answers: newAnswers });
            setBoxes(boxes.map((box) => (box.id === selectedBox.id ? { ...box, answers: newAnswers } : box)));

            if (selectedBox.type !== 'poll' && !newAnswers.some((answer) => answer.isCorrect)) {
                setError('Válassz ki legalább egy helyes választ!');
            }
        }
    };

    const shuffleQuestions = () => {
        const shuffled = [...boxes].sort(() => Math.random() - 0.5);
        setBoxes(shuffled);
    };

    const shuffleAnswers = () => {
        if (selectedBox) {
            const shuffled = [...selectedBox.answers].sort(() => Math.random() - 0.5);
            setSelectedBox({ ...selectedBox, answers: shuffled });
            setBoxes(boxes.map((box) => (box.id === selectedBox.id ? { ...box, answers: shuffled } : box)));
        }
    };

    return (
        <TooltipProvider>
            <div className="flex h-full flex-col md:flex-row">
                {/* Mobile drawer trigger */}
                <div className="md:hidden flex justify-between items-center mb-4 px-2">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-200 hover:bg-transparent/5 hover:shadow-md">
                                <ListIcon className="h-4 w-4" />
                                Kérdések ({boxes.length})
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader className="text-left">
                                <DrawerTitle>Kérdések</DrawerTitle>
                                <DrawerDescription>
                                    Válassz egy kérdést a szerkesztéshez vagy adj hozzá újat
                                </DrawerDescription>
                            </DrawerHeader>
                            <div className="px-4 pb-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 align-middle">
                                            <h2 className="truncate text-xs font-semibold sm:text-lg">Kérdések</h2>
                                            {isChanged && !isSaved && (
                                                <ShinyButton
                                                    text={isSaving ? "Mentés..." : "Mentés"}
                                                    onClick={() => save()}
                                                    disabled={isSaved}
                                                    className="h-min w-min bg-primary/15 font-bold text-black dark:bg-primary/30"
                                                />
                                            )}
                                        </div>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={shuffleQuestions} className="h-8 w-8">
                                                    <Shuffle className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-black/70 backdrop-blur-sm">Sorrend összekeverése</TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <DndContext
                                        sensors={sensors}
                                        collisionDetection={closestCenter}
                                        onDragEnd={handleDragEnd}
                                        modifiers={[restrictToVerticalAxis]}
                                    >
                                        <SortableContext items={boxes.map((box) => box.id)} strategy={verticalListSortingStrategy}>
                                            <div className="sm:scrollbar-small relative max-h-[calc(100vh-16rem)] space-y-2 overflow-y-auto pr-2">
                                                <AnimatePresence>
                                                    {boxes.map((box) => (
                                                        <motion.div
                                                            key={box.id}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -20 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <div className="group relative">
                                                                <SortableBox id={box.id}>
                                                                    <div
                                                                        className={cn(
                                                                            "flex h-32 gap-2 overflow-x-hidden rounded-lg border bg-neutral-500/5 p-2 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md dark:bg-black",
                                                                            selectedBox?.id === box.id && "border-primary/80 bg-primary/5",
                                                                        )}
                                                                        onClick={() => {
                                                                            setSelectedBox(box);

                                                                            const drawer = document.querySelector('[data-state="open"]');
                                                                            if (drawer) {
                                                                                const closeButton = drawer.querySelector('button[data-state="closed"]');
                                                                                if (closeButton) {
                                                                                    (closeButton as HTMLButtonElement).click();
                                                                                }
                                                                            }
                                                                        }}
                                                                    >
                                                                        <div className="flex min-w-5 flex-col justify-around gap-8">
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-5 w-5 flex-shrink-0 text-black/30 hover:bg-transparent hover:text-red-500 dark:text-white/30 dark:hover:text-red-800"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    removeBox(box.id);
                                                                                }}
                                                                            >
                                                                                <Trash2 className="size-4" />
                                                                            </Button>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-5 w-5 flex-shrink-0 text-black/30 hover:bg-transparent hover:text-black/70 dark:text-white/30 dark:hover:text-white"
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    copyBox(box.id);
                                                                                }}
                                                                            >
                                                                                <CopyPlus className="size-4" />
                                                                            </Button>
                                                                        </div>
                                                                        <div className="flex !size-full flex-col truncate rounded-lg bg-neutral-500/10 p-1 text-lg">
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="h-fit w-full truncate text-center text-lg font-semibold">{box.title}</p>
                                                                                <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-xs">
                                                                                    {getBoxTypeIcon(box.type)}
                                                                                </span>
                                                                            </div>
                                                                            <div className="grid h-full gap-1 pt-4 grid-cols-2">
                                                                                <AnimatePresence mode="popLayout">
                                                                                    {box.answers.map((answer, index) => (
                                                                                        <motion.div
                                                                                            key={answer.id}
                                                                                            layout
                                                                                            initial={{ scale: 0.8, opacity: 0 }}
                                                                                            animate={{ scale: 1, opacity: 1 }}
                                                                                            exit={{ scale: 0.8, opacity: 0 }}
                                                                                            transition={{
                                                                                                type: "spring",
                                                                                                duration: 0.5,
                                                                                            }}
                                                                                            className={`relative flex items-center gap-1 rounded-md border p-1 ${answerShapes[index % 6].color} group border-neutral-500/10 transition-colors`}
                                                                                        >
                                                                                            <div className="absolute right-0 top-0 size-full rounded-md bg-transparent/5 dark:bg-transparent/90"></div>
                                                                                            {answer.isCorrect && box.type !== "poll" && (
                                                                                                <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary"></div>
                                                                                            )}
                                                                                        </motion.div>
                                                                                    ))}
                                                                                </AnimatePresence>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </SortableBox>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </SortableContext>

                                        <div className="mb-4 w-full">
                                            <Button
                                                onClick={() => {
                                                    setIsModalOpen(true);

                                                    const drawer = document.querySelector('[data-state="open"]');
                                                    if (drawer) {
                                                        const closeButton = drawer.querySelector('button[data-state="closed"]');
                                                        if (closeButton) {
                                                            (closeButton as HTMLButtonElement).click();
                                                        }
                                                    }
                                                }}
                                                className="flex w-full items-center gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-200 hover:bg-transparent/5 hover:shadow-md"
                                            >
                                                <Plus className="h-4 w-4" />
                                                <span>Új kérdés hozzáadása</span>
                                            </Button>
                                        </div>
                                    </DndContext>
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    {isChanged && !isSaved && (
                        <ShinyButton
                            text={isSaving ? "Mentés..." : "Mentés"}
                            onClick={() => save()}
                            disabled={isSaved}
                            className="h-min w-min bg-primary/15 font-bold text-black dark:bg-primary/30"
                        />
                    )}
                </div>

                {/* Questions sidebar - hidden by default on mobile */}
                <div className={`md:block w-full md:w-1/4 md:border-r md:pr-4 hidden`}>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2 align-middle'>
                                <h2 className='truncate text-xs font-semibold sm:text-lg'>Kérdések</h2>
                                <div className="hidden md:block">
                                    {isChanged && !isSaved && (
                                        <ShinyButton
                                            text={isSaving ? "Mentés..." : "Mentés"}
                                            onClick={() => save()}
                                            disabled={isSaved}
                                            className="h-min w-min bg-primary/15 font-bold text-black dark:bg-primary/30"
                                        />
                                    )}
                                </div>
                            </div>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant='ghost' size='icon' onClick={shuffleQuestions} className='h-8 w-8'>
                                        <Shuffle className='h-4 w-4' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className='bg-black/70 backdrop-blur-sm'>
                                    Sorrend összekeverése
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                            modifiers={[restrictToVerticalAxis]}
                        >
                            <SortableContext items={boxes.map((box) => box.id)} strategy={verticalListSortingStrategy}>
                                <div className="scrollbar-small relative max-h-[calc(100vh-16rem)] md:max-h-[calc(100vh-16rem)] space-y-2 overflow-y-auto sm:pr-2">
                                    <AnimatePresence>
                                        {boxes.map((box) => (
                                            <motion.div
                                                key={box.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className='group relative'>
                                                    <SortableBox id={box.id}>
                                                        <div
                                                            className={cn(
                                                                'flex h-32 gap-2 overflow-x-hidden rounded-lg border bg-neutral-500/5 p-2 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md dark:bg-black w-full',
                                                                selectedBox?.id === box.id &&
                                                                'border-primary/80 bg-primary/5'
                                                            )}
                                                            onClick={() => {
                                                                setSelectedBox(box);

                                                            }}
                                                        >
                                                            <div className='flex min-w-5 flex-col justify-around gap-8'>
                                                                <Button
                                                                    variant='ghost'
                                                                    size='icon'
                                                                    className='h-5 w-5 flex-shrink-0 text-black/30 hover:bg-transparent hover:text-red-500 dark:text-white/30 dark:hover:text-red-800'
                                                                    onClick={() => removeBox(box.id)}
                                                                >
                                                                    <Trash2 className='size-4' />
                                                                </Button>
                                                                <Button
                                                                    variant='ghost'
                                                                    size='icon'
                                                                    className='h-5 w-5 flex-shrink-0 text-black/30 hover:bg-transparent hover:text-black/70 dark:text-white/30 dark:hover:text-white'
                                                                    onClick={() => copyBox(box.id)}
                                                                >
                                                                    <CopyPlus className='size-4' />
                                                                </Button>
                                                            </div>
                                                            <div className='flex !size-full flex-col truncate rounded-lg bg-neutral-500/10 p-1 text-lg'>
                                                                <div className='flex items-center justify-between'>
                                                                    <p className='h-fit w-full truncate text-center text-lg font-semibold'>
                                                                        {box.title}
                                                                    </p>
                                                                    <span className='rounded-full bg-primary/20 px-1.5 py-0.5 text-xs'>
                                                                        {getBoxTypeIcon(box.type)}
                                                                    </span>
                                                                </div>
                                                                <div className='grid h-full grid-cols-2 gap-1 pt-4'>
                                                                    <AnimatePresence mode='popLayout'>
                                                                        {box.answers.map((answer, index) => (
                                                                            <motion.div
                                                                                key={answer.id}
                                                                                layout
                                                                                initial={{ scale: 0.8, opacity: 0 }}
                                                                                animate={{ scale: 1, opacity: 1 }}
                                                                                exit={{ scale: 0.8, opacity: 0 }}
                                                                                transition={{
                                                                                    type: 'spring',
                                                                                    duration: 0.5,
                                                                                }}
                                                                                className={`relative flex items-center gap-1 rounded-md border p-1 ${answerShapes[index % 6].color} group border-neutral-500/10 transition-colors`}
                                                                            >
                                                                                <div className='absolute right-0 top-0 size-full rounded-md bg-transparent/5 dark:bg-transparent/90'></div>
                                                                                {answer.isCorrect &&
                                                                                    box.type !== 'poll' && (
                                                                                        <div className='absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary'></div>
                                                                                    )}
                                                                            </motion.div>
                                                                        ))}
                                                                    </AnimatePresence>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SortableBox>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </SortableContext>

                            <div className="w-full flex items-center justify-center">
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className='flex w-full max-w-sm items-center gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-200 hover:bg-transparent/5 hover:shadow-md sm:hidden'
                                >
                                    <Plus className='h-4 w-4' />
                                    <span>Új kérdés hozzáadása</span>
                                </Button>
                            </div>

                            <QuestionTypeSelector
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                onSelectType={addBox}
                            />
                        </DndContext>
                    </div>
                </div>
                <Card className='mx-auto w-full border-none bg-neutral-500/5 shadow-none dark:bg-transparent/30'>
                    <CardHeader>
                        <div className='flex w-full items-center justify-between'>
                            <CardTitle>Kérdés szerkesztő</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className='scrollbar-small max-h-[calc(100vh-16rem)] space-y-6 overflow-y-auto'>
                        {selectedBox ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className='space-y-2'>
                                    <div className='flex items-center justify-between'>
                                        <Label htmlFor='question'>Kérdés</Label>
                                        <span className='rounded-full bg-primary/20 px-2 py-1 text-xs'>
                                            {selectedBox.type === 'quiz'
                                                ? 'Quiz'
                                                : selectedBox.type === 'true-false'
                                                    ? 'Igaz/Hamis'
                                                    : selectedBox.type === 'poll'
                                                        ? 'Szavazás'
                                                        : 'Infó Slide'}
                                        </span>
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='rounded-l-md bg-primary/20 p-2'>
                                            <HelpCircle className='h-5 w-5 text-primary' />
                                        </div>
                                        <Input
                                            id='question'
                                            value={selectedBox.title}
                                            onChange={(e) => updateBoxTitle(e.target.value)}
                                            placeholder='Írd be kérdésed'
                                            className='w-full rounded-l-none bg-white focus-visible:ring-primary/50 dark:bg-card'
                                        />
                                    </div>
                                </div>
                                <div className='my-5 mt-3 space-y-2'>
                                    <Label htmlFor='duration'>Időtartam</Label>
                                    <div className='flex items-center'>
                                        <div
                                            className='cursor-pointer rounded-l-md bg-primary/20 p-2'
                                            onClick={() => handleDurationChange('decrease')}
                                        >
                                            <MinusCircledIcon className='h-5 w-5 text-primary' />
                                        </div>

                                        <div className='w-[5%] rounded-none bg-white text-center ring-primary/50 dark:bg-card mx-4'>
                                            {selectedBox.duration}
                                        </div>

                                        <div
                                            className='cursor-pointer rounded-r-md bg-primary/20 p-2'
                                            onClick={() => handleDurationChange('increment')}
                                        >
                                            <PlusCircledIcon className='h-5 w-5 text-primary' />
                                        </div>
                                    </div>
                                </div>
                                {selectedBox.type !== 'slide' && (
                                    <div className='mt-6 space-y-4'>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                            <Label>Válasz lehetőségek:</Label>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedBox.type !== 'true-false' && (
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Button
                                                                variant='ghost'
                                                                size='sm'
                                                                onClick={shuffleAnswers}
                                                                className='flex items-center gap-2'
                                                            >
                                                                <Shuffle className='h-4 w-4' />
                                                                <span className="hidden sm:inline">Válaszok összekeverés</span>
                                                                <span className="sm:hidden">Keverés</span>
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className='bg-black/70 backdrop-blur-sm'>
                                                            Összekeverheted a válaszokat egy teljesen random sorrendbe.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                                {selectedBox.type !== 'true-false' && (
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={addAnswer}
                                                        className='flex items-center gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-200 hover:bg-primary/30 hover:shadow-md'
                                                    >
                                                        <Plus className='h-4 w-4' />
                                                        <span className="hidden sm:inline">Válaszlehetőség hozzáadása</span>
                                                        <span className="sm:hidden">Új válasz</span>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <AnimatePresence mode='popLayout'>
                                                {selectedBox.answers.map((answer, index) => (
                                                    <motion.div
                                                        key={answer.id}
                                                        layout
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.8, opacity: 0 }}
                                                        transition={{ type: 'spring', duration: 0.5 }}
                                                        className='group relative flex flex-col gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-neutral-300/5 dark:hover:bg-neutral-800/10'
                                                    >
                                                        {selectedBox.type !== 'true-false' && (
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => removeAnswer(answer.id)}
                                                                className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100'
                                                                type='button'
                                                            >
                                                                <X className='h-4 w-4' />
                                                            </motion.button>
                                                        )}
                                                        <div className='flex items-center gap-2'>
                                                            <div className='flex-shrink-0'>
                                                                <ShapeIcon
                                                                    shape={answerShapes[index % 6].shape}
                                                                    color={answerShapes[index % 6].color}
                                                                />
                                                            </div>
                                                            <Input
                                                                value={answer.text}
                                                                onChange={(e) =>
                                                                    handleAnswerChange(answer.id, e.target.value)
                                                                }
                                                                placeholder='Írd be a válaszlehetőséget'
                                                                className='w-full focus-visible:ring-primary/50'
                                                                disabled={selectedBox.type === 'true-false'}
                                                            />
                                                        </div>
                                                        {selectedBox.type !== 'poll' && (
                                                            <div className='flex items-center gap-2'>
                                                                <Checkbox
                                                                    id={`correct-${answer.id}`}
                                                                    checked={answer.isCorrect}
                                                                    onCheckedChange={(checked) =>
                                                                        handleCorrectChange(
                                                                            answer.id,
                                                                            checked as boolean
                                                                        )
                                                                    }
                                                                />
                                                                <Label
                                                                    htmlFor={`correct-${answer.id}`}
                                                                    className='text-xs text-muted-foreground'
                                                                >
                                                                    Helyes válasz-e?
                                                                </Label>
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                )}

                                {selectedBox.type === 'slide' && (
                                    <div className='mt-6 space-y-2'>
                                        <Label htmlFor='content'>Tartalom</Label>
                                        <textarea
                                            id='content'
                                            value={selectedBox.content}
                                            onChange={(e) => {
                                                const newContent = e.target.value;
                                                setSelectedBox({ ...selectedBox, content: newContent });
                                                setBoxes(
                                                    boxes.map((box) =>
                                                        box.id === selectedBox.id
                                                            ? { ...box, content: newContent }
                                                            : box
                                                    )
                                                );
                                            }}
                                            placeholder='Írd be a slide tartalmát'
                                            className='h-40 w-full rounded-md border bg-white p-2 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-card'
                                        />
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className='rounded-lg border border-dashed p-8 text-center text-muted-foreground'
                            >
                                {boxes.length > 0 ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <p>Válassz ki egy kérdést a szerkesztéshez</p>
                                        <Drawer>
                                            <DrawerTrigger asChild>
                                                <Button variant="outline" className="md:hidden">
                                                    <ListIcon className="mr-2 h-4 w-4" />
                                                    Kérdések megjelenítése
                                                </Button>
                                            </DrawerTrigger>
                                            <DrawerContent>
                                                <DrawerHeader className="text-left">
                                                    <DrawerTitle>Kérdések</DrawerTitle>
                                                    <DrawerDescription>
                                                        Válassz egy kérdést a szerkesztéshez vagy adj hozzá újat
                                                    </DrawerDescription>
                                                </DrawerHeader>
                                                <div className="px-4 pb-4">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2 align-middle">
                                                                <h2 className="truncate text-xs font-semibold sm:text-lg">Kérdések</h2>
                                                                {isChanged && !isSaved && (
                                                                    <ShinyButton
                                                                        text={isSaving ? "Mentés..." : "Mentés"}
                                                                        onClick={() => save()}
                                                                        disabled={isSaved}
                                                                        className="h-min w-min bg-primary/15 font-bold text-black dark:bg-primary/30"
                                                                    />
                                                                )}
                                                            </div>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <Button variant="ghost" size="icon" onClick={shuffleQuestions} className="h-8 w-8">
                                                                        <Shuffle className="h-4 w-4" />
                                                                    </Button>
                                                                </TooltipTrigger>
                                                                <TooltipContent className="bg-black/70 backdrop-blur-sm">Sorrend összekeverése</TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                        <DndContext
                                                            sensors={sensors}
                                                            collisionDetection={closestCenter}
                                                            onDragEnd={handleDragEnd}
                                                            modifiers={[restrictToVerticalAxis]}
                                                        >
                                                            <SortableContext items={boxes.map((box) => box.id)} strategy={verticalListSortingStrategy}>
                                                                <div className="scrollbar-small relative max-h-[calc(100vh-16rem)] space-y-2 overflow-y-auto pr-2">
                                                                    <AnimatePresence>
                                                                        {boxes.map((box) => (
                                                                            <motion.div
                                                                                key={box.id}
                                                                                initial={{ opacity: 0, y: 20 }}
                                                                                animate={{ opacity: 1, y: 0 }}
                                                                                exit={{ opacity: 0, y: -20 }}
                                                                                transition={{ duration: 0.2 }}
                                                                            >
                                                                                <div className="group relative">
                                                                                    <SortableBox id={box.id}>
                                                                                        <div
                                                                                            className={cn(
                                                                                                "flex h-32 gap-2 overflow-x-hidden rounded-lg border bg-neutral-500/5 p-2 text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md dark:bg-black",
                                                                                                selectedBox === box.id && "border-red-500/80 bg-primary/5",
                                                                                            )}
                                                                                            onClick={() => {
                                                                                                setSelectedBox(box);

                                                                                                const drawer = document.querySelector('[data-state="open"]');
                                                                                                if (drawer) {
                                                                                                    const closeButton = drawer.querySelector('button[data-state="closed"]');
                                                                                                    if (closeButton) {
                                                                                                        (closeButton as HTMLButtonElement).click();
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <div className="flex min-w-5 flex-col justify-around gap-8">
                                                                                                <Button
                                                                                                    variant="ghost"
                                                                                                    size="icon"
                                                                                                    className="h-5 w-5 flex-shrink-0 text-black/30 hover:bg-transparent hover:text-red-500 dark:text-white/30 dark:hover:text-red-800"
                                                                                                    onClick={(e) => {
                                                                                                        e.stopPropagation();
                                                                                                        removeBox(box.id);
                                                                                                    }}
                                                                                                >
                                                                                                    <Trash2 className="size-4" />
                                                                                                </Button>
                                                                                                <Button
                                                                                                    variant="ghost"
                                                                                                    size="icon"
                                                                                                    className="h-5 w-5 flex-shrink-0 text-black/30 hover:bg-transparent hover:text-black/70 dark:text-white/30 dark:hover:text-white"
                                                                                                    onClick={(e) => {
                                                                                                        e.stopPropagation();
                                                                                                        copyBox(box.id);
                                                                                                    }}
                                                                                                >
                                                                                                    <CopyPlus className="size-4" />
                                                                                                </Button>
                                                                                            </div>
                                                                                            <div className="flex !size-full flex-col truncate rounded-lg bg-neutral-500/10 p-1 text-lg">
                                                                                                <div className="flex items-center justify-between">
                                                                                                    <p className="h-fit w-full truncate text-center text-lg font-semibold">{box.title}</p>
                                                                                                    <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-xs">
                                                                                                        {getBoxTypeIcon(box.type)}
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="grid h-full grid-cols-2 gap-1 pt-4">
                                                                                                    <AnimatePresence mode="popLayout">
                                                                                                        {box.answers.map((answer, index) => (
                                                                                                            <motion.div
                                                                                                                key={answer.id}
                                                                                                                layout
                                                                                                                initial={{ scale: 0.8, opacity: 0 }}
                                                                                                                animate={{ scale: 1, opacity: 1 }}
                                                                                                                exit={{ scale: 0.8, opacity: 0 }}
                                                                                                                transition={{
                                                                                                                    type: "spring",
                                                                                                                    duration: 0.5,
                                                                                                                }}
                                                                                                                className={`relative flex items-center gap-1 rounded-md border p-1 ${answerShapes[index % 6].color} group border-neutral-500/10 transition-colors`}
                                                                                                            >
                                                                                                                <div className="absolute right-0 top-0 size-full rounded-md bg-transparent/5 dark:bg-transparent/90"></div>
                                                                                                                {answer.isCorrect && box.type !== "poll" && (
                                                                                                                    <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary"></div>
                                                                                                                )}
                                                                                                            </motion.div>
                                                                                                        ))}
                                                                                                    </AnimatePresence>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </SortableBox>
                                                                                </div>
                                                                            </motion.div>
                                                                        ))}
                                                                    </AnimatePresence>
                                                                </div>
                                                            </SortableContext>

                                                            <div className="mb-4 w-full">
                                                                <Button
                                                                    onClick={() => {
                                                                        setIsModalOpen(true);

                                                                        const drawer = document.querySelector('[data-state="open"]');
                                                                        if (drawer) {
                                                                            const closeButton = drawer.querySelector('button[data-state="closed"]');
                                                                            if (closeButton) {
                                                                                (closeButton as HTMLButtonElement).click();
                                                                            }
                                                                        }
                                                                    }}
                                                                    className="flex w-full items-center gap-2 rounded-lg border bg-card p-2 text-card-foreground shadow-sm transition-all duration-200 hover:bg-transparent/5 hover:shadow-md"
                                                                >
                                                                    <Plus className="h-4 w-4" />
                                                                    <span>Új kérdés hozzáadása</span>
                                                                </Button>
                                                            </div>
                                                        </DndContext>
                                                    </div>
                                                </div>
                                            </DrawerContent>
                                        </Drawer>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        <p>Még nincsenek kérdések. Adj hozzá egyet a kezdéshez!</p>
                                        <Button onClick={() => setIsModalOpen(true)}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Új kérdés hozzáadása
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Alert variant='destructive'>
                                        <AlertCircle className='h-4 w-4' />
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    );
};
