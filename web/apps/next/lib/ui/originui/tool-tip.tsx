import { Button } from '../button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../tooltip';

interface TinyToolTipProps {
    children: React.ReactNode;
    content: React.ReactNode;
}

export default function TinyToolTip({ children, content }: TinyToolTipProps) {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent className='z-50 bg-black px-2 py-1 text-xs'>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
