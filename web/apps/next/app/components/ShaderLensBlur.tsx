'use client';

import ShaderLensBlur from '@/lib/ui/shader-lens-blur';

function ShaderLensBlurDemo() {
    return (
        <div className='absolute inset-0 z-10 hidden h-screen w-screen touch-none bg-white dark:brightness-50 dark:bg-black sm:block'>
            <ShaderLensBlur />
        </div>
    );
}

export default ShaderLensBlurDemo;
