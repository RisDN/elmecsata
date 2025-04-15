export const BottomGradient = () => {
    return (
        <>
            <span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition duration-150 group-hover/btn:opacity-100' />
            <span className='absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 blur-sm transition duration-100 group-hover/btn:opacity-100' />
        </>
    );
};
